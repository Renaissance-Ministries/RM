#!/usr/bin/env node
/**
 * restore-protected-posts.js
 *
 * Specifically restores password-protected posts whose content was wiped.
 * These posts return empty content.rendered but their revisions have the real content.
 *
 * SAFETY: Only writes if the current raw content is <1000 chars AND the revision has >1000 chars.
 *
 * Usage:
 *   WP_USER=drthomas WP_APP_PASS="..." node scripts/restore-protected-posts.js --dry
 *   WP_USER=drthomas WP_APP_PASS="..." node scripts/restore-protected-posts.js
 */

const WP_BASE = 'https://renaissance-ministries.com/wp-json/wp/v2';
const WP_USER = process.env.WP_USER;
const WP_APP_PASS = process.env.WP_APP_PASS;
const DRY = process.argv.includes('--dry');
const AUTH = 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASS}`).toString('base64');
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function wpGet(ep) {
  const r = await fetch(`${WP_BASE}${ep}`, { headers: { Authorization: AUTH } });
  if (!r.ok) { if (r.status === 400) return null; throw new Error(`GET ${ep}: ${r.status}`); }
  return r.json();
}

async function wpPost(ep, body) {
  const r = await fetch(`${WP_BASE}${ep}`, {
    method: 'POST', headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`POST ${ep}: ${r.status}`);
  return r.json();
}

// The 57 known wiped post IDs
const WIPED_IDS = [
  4008, 3584, 3522, 3472, 3458, 3361, 3330, 3325, 3314, 3305, 3303, 3295, 3283, 3279, 3274,
  3267, 3214, 3263, 3257, 3211, 3248, 3246, 3195, 3179, 3166, 3163, 3103, 3089, 3068,
  2997, 2984, 2936, 2931, 2854, 2847, 2838, 2825, 2823, 2761, 2708, 2664, 2617, 2610,
  2591, 2590, 2580, 2572, 2569, 2533, 2526, 2502, 2454, 2468, 2462, 2417, 2361, 2342,
];

async function main() {
  console.log(`Restoring ${WIPED_IDS.length} password-protected posts\n`);

  let restored = 0, skipped = 0, failed = 0;

  for (const pid of WIPED_IDS) {
    // Get current raw content
    const post = await wpGet(`/posts/${pid}?context=edit`);
    if (!post) { console.log(`  ${pid}: NOT FOUND`); skipped++; continue; }

    const currentRawLen = (post.content.raw || '').length;

    // If current raw content is substantial, skip (already restored properly)
    if (currentRawLen > 1000) {
      console.log(`  ${post.slug}: already has ${currentRawLen} chars, SKIP`);
      skipped++;
      continue;
    }

    // Get revisions
    const revisions = await wpGet(`/posts/${pid}/revisions?per_page=10`);
    if (!revisions || revisions.length === 0) {
      console.log(`  ${post.slug}: no revisions, SKIP`);
      skipped++;
      continue;
    }

    // Find the best revision — the one with the most content
    // Revisions of protected posts still have content.rendered accessible
    let bestRev = null;
    let bestLen = 0;
    for (const rev of revisions) {
      const len = rev.content.rendered.length;
      if (len > bestLen) { bestLen = len; bestRev = rev; }
    }

    if (!bestRev || bestLen < 1000) {
      console.log(`  ${post.slug}: best revision only ${bestLen} chars, SKIP`);
      skipped++;
      continue;
    }

    // The revision content is HTML. Write it directly as the post content.
    const restoredContent = bestRev.content.rendered;

    console.log(`  ${post.slug} (${pid}): ${currentRawLen} -> ${restoredContent.length} chars (rev ${bestRev.id}, ${bestRev.date})`);

    if (!DRY) {
      try {
        await wpPost(`/posts/${pid}`, { content: restoredContent });
        console.log(`    RESTORED`);
        restored++;
        await sleep(1000); // extra cautious delay for big posts
      } catch (err) {
        console.log(`    FAILED: ${err.message}`);
        failed++;
      }
    } else {
      restored++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Restored: ${restored}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed: ${failed}`);
  if (DRY) console.log('(DRY RUN)');
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });

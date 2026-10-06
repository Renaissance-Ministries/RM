#!/usr/bin/env node
/**
 * restore-wiped-posts.js
 *
 * Finds all posts with empty/short content, checks their revision history,
 * and restores from the last revision that had real content.
 *
 * Usage:
 *   WP_USER=drthomas WP_APP_PASS="..." WP_BASE="https://..." node scripts/restore-wiped-posts.js
 *   Add --dry to preview without restoring
 */

const DELAY_MS = 500;
const sleep = ms => new Promise(r => setTimeout(r, ms));

const WP_BASE = process.env.WP_BASE;
const WP_USER = process.env.WP_USER;
const WP_APP_PASS = process.env.WP_APP_PASS;
const DRY = process.argv.includes('--dry');

if (!WP_BASE || !WP_USER || !WP_APP_PASS) {
  console.error('Set WP_BASE, WP_USER, WP_APP_PASS');
  process.exit(1);
}

const AUTH = 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASS}`).toString('base64');

// Parse hostname for --resolve
const url = new URL(WP_BASE);
const HOST = url.hostname;

async function wpGet(endpoint) {
  const res = await fetch(`${WP_BASE}${endpoint}`, {
    headers: { 'Authorization': AUTH },
  });
  if (!res.ok) {
    if (res.status === 400) return null;
    throw new Error(`GET ${endpoint}: ${res.status}`);
  }
  return res.json();
}

async function wpPost(endpoint, body) {
  const res = await fetch(`${WP_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Authorization': AUTH, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${endpoint}: ${res.status}`);
  return res.json();
}

async function main() {
  console.log(`Scanning ${WP_BASE} for wiped posts...\n`);

  // Collect all posts with short content
  const wiped = [];
  let page = 1;
  while (true) {
    const batch = await wpGet(`/posts?per_page=100&page=${page}&_fields=id,slug,content`);
    if (!batch || batch.length === 0) break;
    for (const p of batch) {
      // Content rendered might have wrapper tags, so check actual text length
      const textLen = p.content.rendered.replace(/<[^>]+>/g, '').trim().length;
      if (textLen < 100) {
        wiped.push({ id: p.id, slug: p.slug, currentLen: p.content.rendered.length });
      }
    }
    page++;
    await sleep(300);
  }

  console.log(`Found ${wiped.length} posts with little/no content\n`);

  let restored = 0, skipped = 0, failed = 0;

  for (const post of wiped) {
    // Get revisions
    const revisions = await wpGet(`/posts/${post.id}/revisions?per_page=10`);
    if (!revisions || revisions.length === 0) {
      console.log(`  SKIP ${post.slug} — no revisions`);
      skipped++;
      continue;
    }

    // Find the most recent revision with substantial content
    const goodRev = revisions.find(r => r.content.rendered.length > 500);
    if (!goodRev) {
      console.log(`  SKIP ${post.slug} — no revision with content >500 chars`);
      skipped++;
      continue;
    }

    // Clean the revision content (remove WP's <p> wrapping of HTML comments)
    let content = goodRev.content.rendered;
    content = content.replace(/^<p><!--/s, '<!--').replace(/--><\/p>/s, '-->');

    console.log(`  ${post.slug} (ID ${post.id}): ${post.currentLen} -> ${content.length} chars (from rev ${goodRev.id}, ${goodRev.date})`);

    if (!DRY) {
      try {
        await wpPost(`/posts/${post.id}`, { content });
        console.log(`    -> RESTORED`);
        restored++;
        await sleep(DELAY_MS);
      } catch (err) {
        console.log(`    -> FAILED: ${err.message}`);
        failed++;
      }
    } else {
      restored++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Wiped posts found: ${wiped.length}`);
  console.log(`Restored: ${restored}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed: ${failed}`);
  if (DRY) console.log('(DRY RUN — use without --dry to restore)');
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });

#!/usr/bin/env node
/**
 * wp-inject-frontmatter.js
 *
 * Connects to the WordPress REST API at renaissance-ministries.com,
 * reads each post's content, prepends YAML frontmatter as an HTML comment,
 * and updates the post via the API.
 *
 * Uses the same content.json analysis as inject-frontmatter.js for topic generation.
 *
 * Usage:
 *   node scripts/wp-inject-frontmatter.js                # dry run (preview first 3)
 *   node scripts/wp-inject-frontmatter.js --write         # update all posts on WP
 *   node scripts/wp-inject-frontmatter.js --write --test  # update just 1 post to verify
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const WP_BASE = 'https://renaissance-ministries.com/wp-json/wp/v2';
const WP_USER = process.env.WP_USER || '';
const WP_APP_PASS = process.env.WP_APP_PASS || '';
const AUTH_HEADER = 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASS}`).toString('base64');

const CONTENT_JSON = path.resolve(__dirname, '..', 'data', 'content.json');

// Rate limiting — be gentle with the server
const DELAY_MS = 500;
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// Category → module mapping (same as inject-frontmatter.js)
// ---------------------------------------------------------------------------

const CATEGORY_MODULE_MAP = {
  'apologetics':                        'CAP',
  'bible-verse-analysis':               'CAP',
  'christos-conspiracy-review':         'CCR',
  'christos-grammar':                   'CAP',
  'christos-historical-review':         'CHR',
  'christos-movie-reviews':             'CCR',
  'consciousness-physics-spirit':       'CPP',
  'important-essential-core-essays':    'CFE',
  'newsletter':                         'CNL',
  'physics-christianity-life':          'CPP',
  'politics':                           'CEA',
  'sermon-meeting-discussion-transcripts': 'CFE',
  'uncategorized':                      'CFE',
  'world-religions-theology-philosophy': 'CAP',
};

const CATEGORY_TYPE_MAP = {
  'sermon-meeting-discussion-transcripts': 'transcript',
  'newsletter':                            'newsletter',
  'christos-conspiracy-review':            'essay',
  'christos-movie-reviews':                'essay',
  'bible-verse-analysis':                  'essay',
  'important-essential-core-essays':       'essay',
};

// ---------------------------------------------------------------------------
// Topic taxonomy (same as inject-frontmatter.js)
// ---------------------------------------------------------------------------

const TOPIC_RULES = [
  ['atonement',             'atonement', 'atoning', 'propitiation', 'expiation'],
  ['salvation',             'salvation', 'saved', 'savior', 'soteriology', 'born again'],
  ['justification',         'justification', 'justified', 'imputation', 'imputed'],
  ['sanctification',        'sanctification', 'sanctified', 'sanctifying'],
  ['forgiveness',           'forgiveness', 'forgiven', 'forgiving'],
  ['repentance',            'repentance', 'repent', 'repented'],
  ['grace',                 'grace', 'unmerited favor'],
  ['lordship',              'lordship', 'jesus as lord', 'accept jesus', 'christ as lord', 'surrender of the will'],
  ['sinners_prayer',        "sinner's prayer", 'sinners prayer'],
  ['trinity',               'trinity', 'trinitarian', 'triune', 'godhead', 'father son holy spirit'],
  ['christology',           'christology', 'incarnation', 'two natures', 'hypostatic'],
  ['pneumatology',          'pneumatology', 'holy spirit', 'spirit of god', 'holy ghost'],
  ['theodicy',              'theodicy', 'problem of evil', 'why does god allow'],
  ['eschatology',           'eschatology', 'end times', 'revelation ', 'second coming', 'millennial', 'rapture', 'tribulation'],
  ['ecclesiology',          'ecclesiology', 'church government', 'church structure', 'body of christ'],
  ['kingdom_of_god',        'kingdom of god', 'kingdom of heaven', 'kingdom culture'],
  ['creation',              'creation', 'genesis 1', 'let there be light', 'six days'],
  ['covenant',              'covenant', 'old covenant', 'new covenant', 'abrahamic', 'mosaic'],
  ['judgment',              'judgment', 'judgment seat', 'white throne', 'final judgment', 'lake of fire', 'gehenna'],
  ['heaven_hell',           'heaven', 'hell', 'afterlife', 'eternal life', 'eternal punishment', 'ultimate reconciliation'],
  ['prayer',                'prayer', 'praying', 'intercession', 'supplication'],
  ['spiritual_warfare',     'spiritual warfare', 'demonic', 'stronghold', 'principalities', 'powers', 'satan', 'devil'],
  ['prophecy',              'prophecy', 'prophetic', 'prophet ', 'prophets '],
  ['miracles',              'miracle', 'supernatural', 'sign', 'wonder', 'healing'],
  ['discipleship',          'discipleship', 'disciple', 'following christ', 'spiritual growth'],
  ['marriage_family',       'marriage', 'family', 'husband', 'wife', 'parenting', 'divorce'],
  ['genesis',               'genesis', 'adam and eve', 'garden of eden', 'noah', 'babel', 'abraham'],
  ['psalms',                'psalm', 'psalms', 'psalmist', 'david'],
  ['paul',                  'paul', 'pauline', 'romans ', 'corinthians', 'galatians', 'ephesians'],
  ['apologetics',           'apologetics', 'apologist', 'defense of the faith'],
  ['epistemology',          'epistemology', 'epistemic', 'how do we know', 'certainty', 'inductive reasoning'],
  ['ontology',              'ontology', 'ontological', 'something from nothing', 'nature of being'],
  ['metaphysics',           'metaphysics', 'metaphysical', 'substance', 'first cause'],
  ['free_will',             'free will', 'free choice', 'determinism', 'predestination', 'sovereignty'],
  ['consciousness',         'consciousness', 'conscious point', 'self-aware', 'sentience', 'conscious being'],
  ['truth',                 'absolute truth', 'objective truth', 'relativism', 'postmodern'],
  ['natural_law',           'natural law', 'moral law', 'law of nature'],
  ['morality_ethics',       'morality', 'ethics', 'ethical', 'moral framework', 'right and wrong', 'virtue'],
  ['suffering',             'suffering', 'pain', 'affliction', 'trial'],
  ['conscious_point_physics', 'conscious point physics', 'cpp', 'conscious points'],
  ['grid_point_lattice',    'grid point lattice', 'gpl', 'lattice'],
  ['quantum_mechanics',     'quantum', 'wave function', 'superposition', 'entanglement'],
  ['relativity',            'relativity', 'einstein', 'spacetime', 'general relativity', 'special relativity'],
  ['electromagnetism',      'electromagnetic', 'electroweak', 'photon', 'electron', 'magnetic'],
  ['cosmology',             'cosmology', 'big bang', 'cosmic expansion', 'hubble', 'cosmological'],
  ['thermodynamics',        'entropy', 'thermodynamic', 'second law'],
  ['standard_model',        'standard model', 'quarks', 'leptons', 'bosons', 'higgs'],
  ['particle_physics',      'particle', 'hadron', 'muon', 'neutrino', 'proton', 'neutron'],
  ['constitutional_law',    'constitution', 'constitutional', 'bill of rights', 'amendment', 'founding fathers'],
  ['governance',            'governance', 'government', 'republic', 'democracy', 'tyranny', 'liberty'],
  ['economics',             'economics', 'economic', 'capitalism', 'socialism', 'free market', 'monetary'],
  ['culture_war',           'culture war', 'cultural', 'woke', 'progressive', 'conservative', 'liberal'],
  ['education',             'education', 'school', 'curriculum', 'homeschool', 'university'],
  ['media',                 'mainstream media', 'news media', 'journalism', 'propaganda', 'censorship', 'fake news'],
  ['healthcare',            'healthcare', 'medicine', 'medical', 'pharmaceutical', 'naturopathic'],
  ['mormonism',             'mormon', 'lds', 'joseph smith', 'book of mormon', 'latter-day', 'snuffer'],
  ['islam',                 'islam', 'muslim', 'quran', 'muhammad', 'sharia'],
  ['judaism',               'judaism', 'jewish', 'talmud', 'torah', 'rabbi'],
  ['hinduism',              'hinduism', 'hindu', 'vedic', 'karma', 'reincarnation'],
  ['buddhism',              'buddhism', 'buddhist', 'buddha', 'zen', 'dharma'],
  ['catholicism',           'catholic', 'pope', 'vatican', 'papal', 'magisterium'],
  ['protestantism',         'protestant', 'reformation', 'luther', 'calvin', 'reformed'],
  ['conspiracy',            'conspiracy', 'coverup', 'deep state', 'illuminati', 'secret society'],
  ['historical_analysis',   'historical', 'history '],
  ['film_review',           'film', 'movie', 'cinema', 'documentary'],
  ['immigration',           'immigration', 'immigrant', 'border', 'refugee'],
  ['war_peace',             'warfare', 'military', 'soldier', 'veteran', 'just war', 'armed conflict'],
  ['technology',            'technology', 'artificial intelligence', 'internet', 'social media'],
  ['founders_vision',       'founders vision', 'seed archive'],
  ['wisdom_database',       'wisdom database', 'kingdom wisdom'],
  ['sword_drill',           'sword drill', 'sword drills'],
  ['register_system',       'register 1', 'register 2', 'register 3', 'register 4', 'register system'],
  ['multi_tradition',       'multi-tradition', 'multi tradition', '11 traditions', 'worldview'],
  ['christos_framework',    'christos framework', 'christos ai', 'theological grammar'],
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function roughDecode(html) {
  return html
    .replace(/&#8211;/g, '\u2013')
    .replace(/&#8212;/g, '\u2014')
    .replace(/&#8216;/g, '\u2018')
    .replace(/&#8217;/g, '\u2019')
    .replace(/&#8220;/g, '\u201C')
    .replace(/&#8221;/g, '\u201D')
    .replace(/&#8230;/g, '...')
    .replace(/&hellip;/g, '...')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#\d+;/g, '');
}

function stripHtml(html) {
  return roughDecode(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function decodeTitle(title) {
  return roughDecode(title)
    .replace(/^\d{6}\s*[\u2013\u2014-]\s*/, '')
    .replace(/\s*[\u2013\u2014-]\s*Meeting\s*[\u2013\u2014-]\s*/i, ' \u2014 ')
    .trim();
}

function analyzeContent(content) {
  const text = stripHtml(content).toLowerCase();
  const scores = {};
  for (const [tag, ...triggers] of TOPIC_RULES) {
    let count = 0;
    for (const trigger of triggers) {
      const escaped = trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = trigger.length < 5
        ? new RegExp(`\\b${escaped}\\b`, 'gi')
        : new RegExp(escaped, 'gi');
      const matches = text.match(regex);
      if (matches) count += matches.length;
    }
    if (count >= 2) scores[tag] = count;
  }
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topN = sorted.slice(0, 8).map(([tag]) => tag);
  const strong = sorted.filter(([, count]) => count >= 3).map(([tag]) => tag);
  return [...new Set([...strong, ...topN])].slice(0, 12) || ['general'];
}

function inferModule(post) {
  const cats = (post.categories || []).map(c => c.slug);
  for (const cat of cats) {
    if (CATEGORY_MODULE_MAP[cat]) return CATEGORY_MODULE_MAP[cat];
  }
  return 'CFE';
}

function inferType(post) {
  const cats = (post.categories || []).map(c => c.slug);
  for (const cat of cats) {
    if (CATEGORY_TYPE_MAP[cat]) return CATEGORY_TYPE_MAP[cat];
  }
  const text = stripHtml(post.content || '').toLowerCase();
  if (text.includes('fellowship essay') || text.includes('christos fellowship')) return 'transcript';
  if (post.slug && post.slug.match(/meeting/)) return 'transcript';
  return 'essay';
}

function inferSecondaryModules(primaryModule, topics) {
  const modules = new Set();
  const cppTopics = ['conscious_point_physics', 'grid_point_lattice', 'quantum_mechanics',
    'relativity', 'electromagnetism', 'cosmology', 'thermodynamics', 'standard_model', 'particle_physics'];
  const ceaTopics = ['constitutional_law', 'governance', 'economics', 'culture_war', 'immigration'];
  const capTopics = ['mormonism', 'islam', 'judaism', 'hinduism', 'buddhism', 'apologetics'];

  if (primaryModule !== 'CPP' && topics.some(t => cppTopics.includes(t))) modules.add('CPP');
  if (primaryModule !== 'CEA' && topics.some(t => ceaTopics.includes(t))) modules.add('CEA');
  if (primaryModule !== 'CHR' && topics.includes('historical_analysis')) modules.add('CHR');
  if (primaryModule !== 'CCR' && topics.includes('conspiracy')) modules.add('CCR');
  if (primaryModule !== 'CAP' && topics.some(t => capTopics.includes(t))) modules.add('CAP');

  modules.delete(primaryModule);
  return [...modules];
}

function buildYamlComment(post) {
  const title = decodeTitle(post.title);
  const date = post.date.split('T')[0];
  const module = inferModule(post);
  const type = inferType(post);
  const topics = analyzeContent(post.content || '');
  const secondaryModules = inferSecondaryModules(module, topics);
  const sourceUrl = post.link || '';
  const catNames = (post.categories || []).map(c => roughDecode(c.name));

  let yaml = '---\n';
  yaml += `title: "${title.replace(/"/g, '\\"')}"\n`;
  yaml += `author: "Thomas Lee Abshier, ND"\n`;
  yaml += `date: ${date}\n`;
  yaml += `module: ${module}\n`;
  if (secondaryModules.length > 0) {
    yaml += `secondary_modules: [${secondaryModules.join(', ')}]\n`;
  }
  yaml += `topics: [${topics.join(', ')}]\n`;
  yaml += `status: ESTABLISHED\n`;
  yaml += `type: ${type}\n`;
  if (sourceUrl) yaml += `source_url: "${sourceUrl}"\n`;
  yaml += `wp_id: ${post.id}\n`;
  yaml += `wp_slug: "${post.slug}"\n`;
  if (catNames.length > 0) {
    yaml += `wp_categories: [${catNames.map(c => `"${c}"`).join(', ')}]\n`;
  }
  yaml += '---';

  return `<!--\n${yaml}\n-->\n`;
}

// ---------------------------------------------------------------------------
// WordPress API
// ---------------------------------------------------------------------------

async function wpGet(endpoint) {
  const res = await fetch(`${WP_BASE}${endpoint}`, {
    headers: { 'Authorization': AUTH_HEADER },
  });
  if (!res.ok) throw new Error(`GET ${endpoint}: ${res.status} ${res.statusText}`);
  return res.json();
}

async function wpUpdate(postId, content) {
  const res = await fetch(`${WP_BASE}/posts/${postId}`, {
    method: 'POST',
    headers: {
      'Authorization': AUTH_HEADER,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST /posts/${postId}: ${res.status} ${res.statusText}\n${text.slice(0, 200)}`);
  }
  return res.json();
}

async function getAllPosts() {
  const posts = [];
  let page = 1;
  while (true) {
    console.log(`  Fetching page ${page}...`);
    let batch;
    try {
      batch = await wpGet(`/posts?per_page=100&page=${page}&_fields=id,slug,title,date,content,link,categories`);
    } catch (err) {
      // WP returns 400 when page exceeds total — that means we're done
      if (err.message.includes('400')) break;
      throw err;
    }
    if (!batch || batch.length === 0) break;

    // Resolve category IDs to names/slugs
    // First collect all unique category IDs
    const allCatIds = new Set();
    for (const p of batch) {
      for (const cid of (p.categories || [])) allCatIds.add(cid);
    }

    // Fetch category details
    const catMap = {};
    if (allCatIds.size > 0) {
      const catIds = [...allCatIds].join(',');
      const cats = await wpGet(`/categories?include=${catIds}&per_page=100`);
      for (const c of cats) {
        catMap[c.id] = { id: c.id, slug: c.slug, name: c.name };
      }
    }

    // Normalize posts
    for (const p of batch) {
      posts.push({
        id: p.id,
        slug: p.slug,
        title: p.title.rendered,
        date: p.date,
        content: p.content.rendered,
        link: p.link,
        categories: (p.categories || []).map(cid => catMap[cid] || { id: cid, slug: 'uncategorized', name: 'Uncategorized' }),
      });
    }

    page++;
    await sleep(300);
  }
  return posts;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const doWrite = args.includes('--write');
  const testMode = args.includes('--test');

  console.log('Connecting to renaissance-ministries.com WordPress API...\n');

  // Test auth first
  try {
    const me = await fetch(`${WP_BASE}/users/me`, {
      headers: { 'Authorization': AUTH_HEADER },
    });
    if (!me.ok) {
      console.error(`Auth failed: ${me.status} ${me.statusText}`);
      process.exit(1);
    }
    const user = await me.json();
    console.log(`Authenticated as: ${user.name} (${user.slug})\n`);
  } catch (err) {
    console.error(`Connection failed: ${err.message}`);
    process.exit(1);
  }

  // Fetch all posts
  console.log('Fetching all posts...');
  const posts = await getAllPosts();
  console.log(`\nFound ${posts.length} posts\n`);

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  const limit = testMode ? 1 : posts.length;

  for (let i = 0; i < Math.min(limit, posts.length); i++) {
    const post = posts[i];
    const yamlComment = buildYamlComment(post);

    // Check if already has frontmatter
    if (post.content.startsWith('<!--\n---\n')) {
      console.log(`  SKIP (already tagged): ${post.slug}`);
      skipped++;
      continue;
    }

    const newContent = yamlComment + post.content;

    if (!doWrite) {
      // Dry run — show first 3
      if (i < 3) {
        console.log(`--- ${post.slug} (ID: ${post.id}) ---`);
        console.log(yamlComment.slice(0, 500));
        console.log(`  Content length: ${post.content.length} -> ${newContent.length}`);
        console.log();
      }
    } else {
      try {
        process.stdout.write(`  [${i + 1}/${limit}] ${post.slug}...`);
        await wpUpdate(post.id, newContent);
        console.log(' OK');
        updated++;
        await sleep(DELAY_MS);
      } catch (err) {
        console.log(` ERROR: ${err.message}`);
        errors++;
      }
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Total posts:  ${posts.length}`);
  if (doWrite) {
    console.log(`Updated:      ${updated}`);
    console.log(`Skipped:      ${skipped}`);
    console.log(`Errors:       ${errors}`);
  } else {
    console.log(`Already tagged: ${skipped}`);
    console.log(`\nDRY RUN \u2014 use --write to update WordPress`);
    if (!testMode) console.log(`Use --write --test to update just 1 post first`);
  }
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});

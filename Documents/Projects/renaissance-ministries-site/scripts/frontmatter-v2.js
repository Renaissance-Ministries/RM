#!/usr/bin/env node
/**
 * frontmatter-v2.js — Multi-level YAML frontmatter generator
 *
 * Reads content.json, analyzes each article with:
 *   - Domain classification (Level 1)
 *   - Topic tagging with ~300 terms (Level 2)
 *   - Scripture reference extraction (auto)
 *   - People/figure mentions (auto)
 *   - Thesis extraction from first substantive paragraph (auto)
 *
 * Outputs two formats:
 *   1. HTML comment block for WordPress/site injection
 *   2. Full .md stub for repo
 *
 * Usage:
 *   node scripts/frontmatter-v2.js                    # dry run (preview 5)
 *   node scripts/frontmatter-v2.js --report           # topic frequency report
 *   node scripts/frontmatter-v2.js --write            # inject into local HTML
 *   node scripts/frontmatter-v2.js --write --stubs    # also generate .md stubs
 *   node scripts/frontmatter-v2.js --wp               # update WordPress (needs WP_USER + WP_APP_PASS env vars)
 *   node scripts/frontmatter-v2.js --wp --test        # update 1 WP post to verify
 */

const fs = require('fs');
const path = require('path');

const SITE_ROOT = path.resolve(__dirname, '..');
const CONTENT_JSON = path.join(SITE_ROOT, 'data', 'content.json');
const ARTICLES_DIR = path.join(SITE_ROOT, 'dist', 'articles');
const STUBS_DIR = path.join(SITE_ROOT, 'repo-stubs-v2');

const DELAY_MS = 500;
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// WordPress category → module mapping
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
// LEVEL 1: Domain classification
// ---------------------------------------------------------------------------

const DOMAINS = {
  theology:   ['atonement', 'salvation', 'justification', 'sanctification', 'forgiveness',
               'repentance', 'grace', 'lordship', 'trinity', 'christology', 'pneumatology',
               'theodicy', 'eschatology', 'ecclesiology', 'kingdom_of_god', 'creation',
               'covenant', 'judgment', 'heaven_hell', 'prayer', 'worship', 'spiritual_warfare',
               'prophecy', 'miracles', 'discipleship', 'tithing', 'sinners_prayer',
               'baptism', 'communion', 'resurrection', 'incarnation', 'original_sin',
               'election_predestination', 'angels_demons', 'rapture_tribulation'],
  biblical_studies: ['genesis', 'exodus', 'psalms', 'proverbs_wisdom', 'isaiah', 'jeremiah',
               'ezekiel', 'daniel', 'gospels', 'acts', 'paul', 'revelation_book',
               'old_testament', 'new_testament', 'pentateuch', 'minor_prophets',
               'sermon_on_the_mount', 'parables', 'ten_commandments', 'beatitudes'],
  philosophy: ['apologetics', 'epistemology', 'ontology', 'metaphysics', 'free_will',
               'consciousness', 'truth', 'natural_law', 'morality_ethics', 'suffering',
               'meaning_of_life', 'nihilism', 'existentialism', 'stoicism', 'teleology',
               'dualism', 'materialism', 'idealism', 'pragmatism'],
  physics:    ['conscious_point_physics', 'grid_point_lattice', 'dark_matter', 'dark_energy',
               'quantum_mechanics', 'relativity', 'electromagnetism', 'cosmology',
               'thermodynamics', 'zitterbewegung', 'fine_structure', 'standard_model',
               'particle_physics', 'nuclear_physics', 'gravity', 'wave_theory',
               'dipole_sea', 'pair_production', 'quark_confinement', 'icosahedral_symmetry'],
  politics:   ['constitutional_law', 'governance', 'culture_war', 'immigration',
               'war_peace', 'race_relations', 'administrative_state', 'federalism',
               'separation_of_powers', 'electoral_system', 'foreign_policy',
               'surveillance_state', 'civil_liberties', 'second_amendment',
               'first_amendment', 'tenth_amendment', 'executive_power'],
  economics:  ['economics', 'capitalism', 'socialism', 'communism', 'federal_reserve',
               'inflation', 'taxation', 'tariffs', 'wealth_distribution', 'poverty',
               'welfare_state', 'free_market', 'gold_standard', 'fiat_currency',
               'national_debt', 'social_security', 'medicare_medicaid'],
  culture:    ['education', 'media', 'abortion', 'gender_sexuality', 'technology',
               'healthcare', 'marriage_family', 'film_review', 'art_beauty',
               'drug_policy', 'homelessness', 'prison_reform', 'environmentalism',
               'transhumanism', 'cancel_culture', 'dei_equity'],
  world_religions: ['mormonism', 'islam', 'judaism', 'hinduism', 'buddhism', 'new_age',
               'scientology', 'catholicism', 'protestantism', 'orthodox',
               'comparative_religion', 'interfaith', 'religious_persecution',
               'missionary_work', 'world_religions_overview'],
  history:    ['historical_analysis', 'conspiracy', 'american_founding', 'revolutionary_war',
               'civil_war_us', 'world_war_1', 'world_war_2', 'cold_war', 'napoleon',
               'roman_empire', 'reformation_history', 'great_awakening',
               'american_revolution', 'french_revolution', 'industrial_revolution'],
  framework:  ['founders_vision', 'wisdom_database', 'sword_drill', 'register_system',
               'multi_tradition', 'christos_framework', 'righteous_society',
               'christian_nation', 'kingdom_culture', 'revival_movement'],
};

// ---------------------------------------------------------------------------
// LEVEL 2: Expanded topic taxonomy (~300 terms)
// ---------------------------------------------------------------------------

const TOPIC_RULES = [
  // === SOTERIOLOGY / ATONEMENT ===
  ['atonement',             'atonement', 'atoning', 'propitiation', 'expiation', 'blood of christ', 'blood of the lamb'],
  ['salvation',             'salvation', 'saved', 'savior', 'soteriology', 'born again', 'new birth'],
  ['justification',         'justification', 'justified', 'imputation', 'imputed', 'declared righteous'],
  ['sanctification',        'sanctification', 'sanctified', 'sanctifying', 'holiness', 'set apart'],
  ['forgiveness',           'forgiveness', 'forgiven', 'forgiving', 'pardoned'],
  ['repentance',            'repentance', 'repent', 'repented', 'turning from sin', 'metanoia'],
  ['grace',                 'grace', 'unmerited favor', 'grace alone', 'sola gratia'],
  ['lordship',              'lordship', 'jesus as lord', 'accept jesus', 'christ as lord', 'surrender of the will', 'surrender of will'],
  ['sinners_prayer',        "sinner's prayer", 'sinners prayer'],
  ['original_sin',          'original sin', 'fall of man', 'fallen nature', 'total depravity', 'adamic nature'],
  ['resurrection',          'resurrection', 'risen', 'empty tomb', 'raised from the dead'],
  ['incarnation',           'incarnation', 'god became man', 'word became flesh', 'god in the flesh'],
  ['baptism',               'baptism', 'baptize', 'baptized', 'water baptism', 'immersion'],
  ['communion',             'communion', 'eucharist', 'lord\'s supper', 'breaking of bread', 'body and blood'],

  // === THEOLOGY PROPER ===
  ['trinity',               'trinity', 'trinitarian', 'triune', 'godhead', 'father son holy spirit', 'three persons'],
  ['christology',           'christology', 'two natures', 'hypostatic', 'fully god fully man', 'divine nature', 'human nature of christ'],
  ['pneumatology',          'pneumatology', 'holy spirit', 'spirit of god', 'holy ghost', 'gifts of the spirit', 'fruit of the spirit'],
  ['theodicy',              'theodicy', 'problem of evil', 'why does god allow', 'why suffering', 'evil and god'],
  ['eschatology',           'eschatology', 'end times', 'second coming', 'millennial', 'millennium'],
  ['rapture_tribulation',   'rapture', 'tribulation', 'pre-trib', 'post-trib', 'mid-trib', 'great tribulation', 'left behind'],
  ['ecclesiology',          'ecclesiology', 'church government', 'church structure', 'body of christ', 'church discipline', 'church planting'],
  ['kingdom_of_god',        'kingdom of god', 'kingdom of heaven', 'kingdom culture', 'kingdom citizen', 'kingdom principles'],
  ['creation',              'creation', 'genesis 1', 'let there be light', 'six days', 'young earth', 'old earth', 'intelligent design', 'creationism'],
  ['covenant',              'covenant', 'old covenant', 'new covenant', 'abrahamic', 'mosaic', 'davidic covenant', 'covenant theology'],
  ['judgment',              'judgment', 'judgment seat', 'white throne', 'final judgment', 'lake of fire', 'gehenna', 'sheep and goats'],
  ['heaven_hell',           'heaven', 'hell', 'afterlife', 'eternal life', 'eternal punishment', 'ultimate reconciliation', 'universalism', 'annihilationism', 'purgatory'],
  ['prayer',                'prayer', 'praying', 'intercession', 'supplication', 'lord\'s prayer'],
  ['worship',               'worship', 'praise', 'adoration', 'liturgy', 'hymn', 'psalm singing'],
  ['spiritual_warfare',     'spiritual warfare', 'demonic', 'stronghold', 'principalities', 'powers', 'satan', 'devil', 'exorcism', 'deliverance', 'armor of god'],
  ['angels_demons',         'archangel', 'cherubim', 'seraphim', 'fallen angel', 'lucifer', 'michael the archangel', 'angelic', 'demonic realm'],
  ['prophecy',              'prophecy', 'prophetic', 'prophet ', 'prophets ', 'fulfilled prophecy', 'prophetic word'],
  ['miracles',              'miracle', 'supernatural', 'sign', 'wonder', 'healing', 'miraculous', 'signs and wonders'],
  ['tithing',               'tithe', 'tithing', 'offering', 'stewardship', 'firstfruits', 'ten percent', '10%'],
  ['discipleship',          'discipleship', 'disciple', 'following christ', 'spiritual growth', 'spiritual maturity', 'walk with god'],
  ['marriage_family',       'marriage', 'family', 'husband', 'wife', 'parenting', 'divorce', 'biblical marriage', 'headship', 'submission'],
  ['election_predestination', 'predestination', 'predestined', 'the elect', 'calvinism vs arminianism', 'unconditional election'],

  // === BIBLICAL BOOKS / FIGURES ===
  ['genesis',               'genesis', 'adam and eve', 'garden of eden', 'noah', 'babel', 'abraham', 'isaac', 'jacob', 'joseph'],
  ['exodus',                'exodus', 'moses', 'pharaoh', 'red sea', 'ten commandments', 'sinai', 'tabernacle', 'golden calf'],
  ['psalms',                'psalm', 'psalms', 'psalmist', 'david'],
  ['proverbs_wisdom',       'proverbs', 'wisdom literature', 'ecclesiastes', 'song of solomon', 'wisdom of solomon'],
  ['isaiah',                'isaiah', 'suffering servant', 'isaiah 53'],
  ['jeremiah',              'jeremiah', 'lamentations', 'weeping prophet'],
  ['ezekiel',               'ezekiel', 'valley of dry bones', 'wheel within a wheel', 'ezekiel\'s temple'],
  ['daniel',                'daniel', 'nebuchadnezzar', 'lion\'s den', 'fiery furnace', 'daniel\'s vision', '70 weeks'],
  ['minor_prophets',        'hosea', 'joel', 'amos', 'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk', 'zephaniah', 'haggai', 'zechariah', 'malachi'],
  ['gospels',               'gospel of matthew', 'gospel of mark', 'gospel of luke', 'gospel of john', 'synoptic'],
  ['sermon_on_the_mount',   'sermon on the mount', 'beatitudes', 'blessed are', 'salt and light', 'turn the other cheek', 'love your enemies'],
  ['parables',              'parable', 'prodigal son', 'good samaritan', 'sower', 'mustard seed', 'talents', 'wise and foolish virgins'],
  ['acts',                  'acts of the apostles', 'pentecost', 'early church', 'apostolic'],
  ['paul',                  'paul', 'pauline', 'romans ', 'corinthians', 'galatians', 'ephesians', 'philippians', 'colossians', 'thessalonians', 'timothy', 'titus', 'philemon', 'hebrews'],
  ['revelation_book',       'book of revelation', 'revelation chapter', 'apocalypse', 'john of patmos', 'seven seals', 'seven churches', 'beast', 'mark of the beast', 'new jerusalem'],
  ['old_testament',         'old testament', 'hebrew bible', 'tanakh', 'leviticus', 'numbers', 'deuteronomy', 'joshua', 'judges', 'ruth', 'samuel', 'kings', 'chronicles', 'ezra', 'nehemiah'],
  ['new_testament',         'new testament', 'james', 'peter', 'jude'],

  // === APOLOGETICS / PHILOSOPHY ===
  ['apologetics',           'apologetics', 'apologist', 'defense of the faith', 'evidential', 'presuppositional'],
  ['epistemology',          'epistemology', 'epistemic', 'how do we know', 'certainty', 'inductive reasoning', 'deductive reasoning', 'empiricism', 'rationalism'],
  ['ontology',              'ontology', 'ontological', 'something from nothing', 'nature of being', 'existence of god', 'cosmological argument', 'teleological argument'],
  ['metaphysics',           'metaphysics', 'metaphysical', 'substance', 'first cause', 'prime mover', 'unmoved mover'],
  ['free_will',             'free will', 'free choice', 'determinism', 'predestination', 'sovereignty', 'compatibilism', 'libertarian free will'],
  ['consciousness',         'consciousness', 'conscious point', 'self-aware', 'sentience', 'conscious being', 'qualia', 'hard problem of consciousness'],
  ['truth',                 'absolute truth', 'objective truth', 'relativism', 'postmodern', 'correspondence theory', 'coherence theory'],
  ['natural_law',           'natural law', 'moral law', 'law of nature', 'natural rights', 'inalienable rights'],
  ['morality_ethics',       'morality', 'ethics', 'ethical', 'moral framework', 'right and wrong', 'virtue', 'virtue ethics', 'deontological', 'consequentialism'],
  ['suffering',             'suffering', 'pain', 'affliction', 'trial', 'theodicy of suffering'],
  ['meaning_of_life',       'meaning of life', 'purpose of life', 'why are we here', 'existential', 'nihilism'],
  ['stoicism',              'stoicism', 'stoic', 'marcus aurelius', 'seneca', 'epictetus'],
  ['teleology',             'teleology', 'teleological', 'final cause', 'telos', 'argument from design'],
  ['dualism',               'dualism', 'mind-body', 'soul and body', 'cartesian', 'substance dualism'],
  ['materialism',           'materialism', 'physicalism', 'reductionism', 'nothing but matter'],

  // === CONSCIOUS POINT PHYSICS ===
  ['conscious_point_physics', 'conscious point physics', 'cpp', 'conscious points', 'conscious point model'],
  ['grid_point_lattice',    'grid point lattice', 'gpl', 'lattice', 'grid point'],
  ['dark_matter',           'dark matter', 'dark matter problem', 'missing mass'],
  ['dark_energy',           'dark energy', 'cosmological constant', 'accelerating expansion'],
  ['quantum_mechanics',     'quantum', 'wave function', 'superposition', 'entanglement', 'uncertainty principle', 'wave-particle', 'dual slit', 'double slit'],
  ['relativity',            'relativity', 'einstein', 'spacetime', 'general relativity', 'special relativity', 'lorentz', 'time dilation', 'length contraction'],
  ['electromagnetism',      'electromagnetic', 'electroweak', 'photon', 'electron', 'magnetic', 'maxwell', 'coulomb', 'electric field', 'magnetic field'],
  ['cosmology',             'cosmology', 'big bang', 'cosmic expansion', 'hubble', 'cosmological', 'cosmic microwave background', 'redshift'],
  ['thermodynamics',        'entropy', 'thermodynamic', 'second law', 'heat death', 'energy conservation', 'first law'],
  ['zitterbewegung',        'zitterbewegung', 'zbw', 'trembling motion'],
  ['fine_structure',        'fine structure', 'alpha constant', '1/137', 'fine-structure'],
  ['standard_model',        'standard model', 'quarks', 'leptons', 'bosons', 'higgs', 'higgs boson', 'gluon', 'w boson', 'z boson'],
  ['particle_physics',      'particle physics', 'hadron', 'muon', 'neutrino', 'proton', 'neutron', 'meson', 'baryon', 'fermion'],
  ['nuclear_physics',       'nuclear', 'fission', 'fusion', 'radioactive', 'isotope', 'nuclear force', 'strong force', 'weak force'],
  ['gravity',               'gravity', 'gravitational', 'graviton', 'newton', 'newtonian', 'gravitational wave'],
  ['wave_theory',           'wave theory', 'standing wave', 'resonance', 'harmonic', 'frequency', 'wavelength', 'interference', 'destructive interference', 'constructive interference'],
  ['dipole_sea',            'dipole sea', 'dipole', 'dipole pair', 'virtual particle'],
  ['pair_production',       'pair production', 'matter from energy', 'matter-antimatter', 'positron'],
  ['quark_confinement',     'quark confinement', 'color charge', 'asymptotic freedom', 'confinement'],
  ['icosahedral_symmetry',  'icosahedral', 'icosahedron', '600-cell', '600 cell', 'polytope', 'platonic solid'],
  ['shroud_turin',          'shroud of turin', 'shroud', 'burial cloth'],

  // === POLITICS ===
  ['constitutional_law',    'constitution', 'constitutional', 'bill of rights', 'amendment', 'founding fathers', 'founders', 'framers'],
  ['governance',            'governance', 'government', 'republic', 'democracy', 'tyranny', 'liberty', 'limited government'],
  ['administrative_state',  'administrative state', 'bureaucracy', 'regulatory', 'cabinet', 'secretary of', 'federal agency', 'deep state'],
  ['federalism',            'federalism', 'states rights', 'state sovereignty', 'tenth amendment', '10th amendment', 'nullification'],
  ['separation_of_powers',  'separation of powers', 'checks and balances', 'three branches', 'executive branch', 'legislative branch', 'judicial branch'],
  ['first_amendment',       'first amendment', 'free speech', 'freedom of speech', 'freedom of religion', 'establishment clause', 'free exercise'],
  ['second_amendment',      'second amendment', 'right to bear arms', 'gun rights', 'gun control', 'militia'],
  ['foreign_policy',        'foreign policy', 'foreign relations', 'diplomacy', 'nation building', 'monroe doctrine', 'isolationism', 'interventionism'],
  ['surveillance_state',    'surveillance', 'patriot act', 'nsa', 'privacy', 'domestic spying', 'warrantless'],
  ['civil_liberties',       'civil liberties', 'civil rights', 'habeas corpus', 'due process', 'equal protection'],
  ['electoral_system',      'electoral', 'electoral college', 'popular vote', 'voting', 'election fraud', 'gerrymandering'],

  // === ECONOMICS ===
  ['capitalism',            'capitalism', 'capitalist', 'free enterprise', 'laissez-faire', 'profit motive', 'private property'],
  ['socialism',             'socialism', 'socialist', 'collective ownership', 'means of production', 'redistribution'],
  ['communism',             'communism', 'communist', 'marxism', 'marxist', 'marx', 'lenin', 'bolshevik', 'proletariat'],
  ['economics',             'economics', 'economic', 'economy', 'gdp', 'supply and demand', 'market forces'],
  ['federal_reserve',       'federal reserve', 'the fed', 'central bank', 'interest rate', 'monetary policy', 'quantitative easing'],
  ['inflation',             'inflation', 'hyperinflation', 'deflation', 'purchasing power', 'cost of living'],
  ['taxation',              'taxation', 'income tax', 'tax rate', 'tax policy', 'progressive tax', 'flat tax', 'fair tax', 'irs'],
  ['tariffs',               'tariff', 'tariffs', 'trade war', 'protectionism', 'free trade', 'trade agreement', 'trade deficit'],
  ['wealth_distribution',   'wealth distribution', 'wealth gap', 'income inequality', 'rich and poor', 'wealth transfer', 'class warfare'],
  ['poverty',               'poverty', 'poor', 'impoverished', 'destitute', 'underclass'],
  ['welfare_state',         'welfare', 'welfare state', 'food stamps', 'government assistance', 'safety net', 'entitlement', 'transfer payment'],
  ['gold_standard',         'gold standard', 'gold-backed', 'sound money', 'hard money', 'commodity money'],
  ['fiat_currency',         'fiat', 'fiat currency', 'fiat money', 'paper money', 'counterfeit money', 'money printing'],
  ['national_debt',         'national debt', 'federal debt', 'deficit', 'deficit spending', 'balanced budget', 'debt ceiling'],
  ['social_security',       'social security', 'retirement', 'pension', 'retirement fund', 'social security trust'],
  ['medicare_medicaid',     'medicare', 'medicaid', 'single payer', 'universal healthcare'],

  // === CULTURE ===
  ['education',             'education', 'school', 'curriculum', 'homeschool', 'university', 'public school', 'charter school', 'indoctrination'],
  ['media',                 'mainstream media', 'news media', 'journalism', 'propaganda', 'censorship', 'fake news', 'media bias', 'information warfare'],
  ['abortion',              'abortion', 'pro-life', 'pro-choice', 'roe v wade', 'unborn', 'sanctity of life', 'right to life'],
  ['gender_sexuality',      'gender', 'sexuality', 'homosexuality', 'transgender', 'lgbtq', 'male and female', 'gender ideology', 'sexual ethics', 'sexual morality'],
  ['immigration',           'immigration', 'immigrant', 'border', 'refugee', 'illegal immigration', 'deportation', 'asylum', 'border wall', 'open borders'],
  ['war_peace',             'warfare', 'military', 'soldier', 'veteran', 'just war', 'armed conflict', 'civil war', 'nuclear war', 'conscription'],
  ['race_relations',        'race', 'racial', 'racism', 'segregation', 'civil rights', 'racial justice', 'critical race theory', 'crt'],
  ['technology',            'technology', 'artificial intelligence', 'internet', 'social media', 'transhumanism', 'machine learning', 'robot', 'automation'],
  ['healthcare',            'healthcare', 'medicine', 'medical', 'pharmaceutical', 'naturopathic', 'holistic', 'natural medicine', 'vaccine'],
  ['drug_policy',           'drug', 'addiction', 'rehab', 'rehabilitation', 'substance abuse', 'opioid', 'psychedelic', 'legalization'],
  ['homelessness',          'homeless', 'homelessness', 'poorhouse', 'shelter', 'vagrancy'],
  ['environmentalism',      'environment', 'climate', 'climate change', 'global warming', 'carbon', 'fossil fuel', 'renewable energy', 'stewardship of earth'],
  ['art_beauty',            'art', 'beauty', 'aesthetic', 'creativity', 'artistic', 'performance'],
  ['cancel_culture',        'cancel culture', 'canceled', 'deplatform', 'political correctness', 'woke ideology'],
  ['dei_equity',            'diversity', 'equity', 'inclusion', 'dei', 'affirmative action', 'equal opportunity'],

  // === WORLD RELIGIONS ===
  ['mormonism',             'mormon', 'lds', 'joseph smith', 'book of mormon', 'latter-day', 'snuffer', 'brigham young', 'restoration movement', 'deseret'],
  ['islam',                 'islam', 'muslim', 'quran', 'muhammad', 'sharia', 'jihad', 'mosque', 'imam', 'caliphate', 'sunni', 'shia', 'allah', 'barbary'],
  ['judaism',               'judaism', 'jewish', 'talmud', 'torah', 'rabbi', 'synagogue', 'pharisee', 'sadducee', 'sanhedrin', 'zionism'],
  ['hinduism',              'hinduism', 'hindu', 'vedic', 'karma', 'reincarnation', 'brahman', 'atman', 'yoga'],
  ['buddhism',              'buddhism', 'buddhist', 'buddha', 'zen', 'dharma', 'meditation', 'nirvana', 'enlightenment', 'dalai lama'],
  ['new_age',               'new age', 'new-age', 'channeling', 'crystal', 'chakra', 'mysticism', 'occult', 'gnostic', 'gnosticism'],
  ['scientology',           'scientology', 'dianetics', 'hubbard', 'e-meter'],
  ['catholicism',           'catholic', 'pope', 'vatican', 'papal', 'magisterium', 'catechism', 'transubstantiation', 'penance', 'indulgence', 'catholic church'],
  ['protestantism',         'protestant', 'reformation', 'luther', 'calvin', 'reformed', 'sola scriptura', 'sola fide', 'evangelical', 'pentecostal', 'baptist', 'methodist', 'presbyterian'],
  ['orthodox',              'orthodox', 'eastern orthodox', 'coptic', 'byzantine', 'theosis'],
  ['comparative_religion',  'comparative religion', 'world religions', 'interfaith', 'ecumenism', 'religious pluralism', 'exclusivism', 'inclusivism'],
  ['missionary_work',       'missionary', 'missions', 'evangelism', 'evangelization', 'great commission', 'witnessing', 'proselytization'],

  // === HISTORY ===
  ['conspiracy',            'conspiracy', 'coverup', 'deep state', 'illuminati', 'secret society', 'cabal', 'shadow government', 'new world order'],
  ['historical_analysis',   'historical', 'history of', 'historian', 'historical context'],
  ['american_founding',     'founding fathers', 'declaration of independence', 'continental congress', 'constitutional convention', 'federalist papers'],
  ['revolutionary_war',     'revolutionary war', 'american revolution', 'independence', 'king george', 'colonial'],
  ['civil_war_us',          'civil war', 'secession', 'confederate', 'union', 'lincoln', 'slavery', 'emancipation', 'reconstruction'],
  ['world_war_2',           'world war ii', 'world war 2', 'ww2', 'wwii', 'nazi', 'holocaust', 'hitler', 'd-day', 'normandy', 'hiroshima', 'pearl harbor'],
  ['cold_war',              'cold war', 'soviet', 'ussr', 'iron curtain', 'communism vs capitalism', 'cuban missile'],
  ['napoleon',              'napoleon', 'napoleonic', 'waterloo', 'wellington', 'austerlitz', 'josephine'],
  ['great_awakening',       'great awakening', 'revival', 'whitefield', 'jonathan edwards', 'revivalism'],
  ['reformation_history',   'reformation', 'martin luther', '95 theses', 'counter-reformation', 'council of trent', 'diet of worms'],
  ['roman_empire',          'roman empire', 'rome', 'caesar', 'constantine', 'fall of rome', 'pax romana'],
  ['film_review',           'film', 'movie', 'cinema', 'documentary', 'screenplay'],

  // === THOMAS'S FRAMEWORK ===
  ['founders_vision',       'founders vision', 'seed archive', 'founding vision'],
  ['wisdom_database',       'wisdom database', 'kingdom wisdom', 'knowledge base'],
  ['sword_drill',           'sword drill', 'sword drills', 'biblical drill'],
  ['register_system',       'register 1', 'register 2', 'register 3', 'register 4', 'register system', 'speculative mechanism'],
  ['multi_tradition',       'multi-tradition', 'multi tradition', '11 traditions', 'worldview analysis'],
  ['christos_framework',    'christos framework', 'christos ai', 'theological grammar', 'christos seminar', 'christos commons'],
  ['righteous_society',     'righteous society', 'moral society', 'godly society', 'sanctified society'],
  ['christian_nation',      'christian nation', 'christian heritage', 'america as christian', 'godly nation'],
  ['kingdom_culture',       'kingdom culture', 'kingdom paradigm', 'kingdom economy', 'kingdom government'],
  ['revival_movement',      'revival', 'awakening', 'spiritual renewal', 'national revival', 'revivalist'],
  ['voluntary_charity',     'voluntary charity', 'charitable giving', 'voluntary giving', 'forced charity', 'compulsory charity'],
  ['character_formation',   'character formation', 'character development', 'changed heart', 'heart of flesh', 'heart of stone', 'transformed heart'],
  ['presidential_platform', 'presidential', 'campaign', 'platform', 'candidate', 'running for president', 'commander in chief'],
];

// ---------------------------------------------------------------------------
// Scripture reference extraction
// ---------------------------------------------------------------------------

const BIBLE_BOOKS = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings',
  '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther',
  'Job', 'Psalm', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon',
  'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel',
  'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum',
  'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
  'Matthew', 'Mark', 'Luke', 'John', 'Acts',
  'Romans', 'Corinthians', 'Galatians', 'Ephesians', 'Philippians',
  'Colossians', 'Thessalonians', 'Timothy', 'Titus', 'Philemon',
  'Hebrews', 'James', 'Peter', 'Jude', 'Revelation',
  // With numbers
  '1 Corinthians', '2 Corinthians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
];

function extractScripture(text) {
  const refs = new Set();
  for (const book of BIBLE_BOOKS) {
    const escaped = book.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match "Book chapter:verse" patterns
    const regex = new RegExp(`${escaped}\\s+(\\d+)[:\\.]?(\\d+)?(?:\\s*[-\\u2013\\u2014]\\s*\\d+)?`, 'gi');
    let m;
    while ((m = regex.exec(text)) !== null) {
      const chapter = m[1];
      const verse = m[2];
      const ref = verse ? `${book} ${chapter}:${verse}` : `${book} ${chapter}`;
      refs.add(ref);
    }
  }
  return [...refs].slice(0, 20); // cap at 20
}

// ---------------------------------------------------------------------------
// People/figure extraction
// ---------------------------------------------------------------------------

const PEOPLE_PATTERNS = [
  // Biblical figures (not already in topic tags)
  ['Jesus', /\bjesus\b/gi], ['Christ', /\bchrist\b/gi],
  ['God the Father', /\b(god the father|the father|heavenly father)\b/gi],
  ['Holy Spirit', /\bholy spirit\b/gi],
  ['Moses', /\bmoses\b/gi], ['Abraham', /\babraham\b/gi],
  ['David', /\bking david\b/gi], ['Solomon', /\bsolomon\b/gi],
  ['Elijah', /\belijah\b/gi], ['Isaiah', /\bisaiah\b/gi],
  ['Peter', /\b(simon peter|apostle peter)\b/gi],
  ['Paul', /\b(apostle paul|saint paul|paul the apostle)\b/gi],
  ['Mary', /\b(virgin mary|mary mother)\b/gi],

  // Historical / political figures
  ['George Washington', /\bwashington\b/gi],
  ['Thomas Jefferson', /\bjefferson\b/gi],
  ['Abraham Lincoln', /\blincoln\b/gi],
  ['Alexander Hamilton', /\bhamilton\b/gi],
  ['James Madison', /\bmadison\b/gi],
  ['Ronald Reagan', /\breagan\b/gi],
  ['Donald Trump', /\btrump\b/gi],
  ['Joe Biden', /\bbiden\b/gi],
  ['Barack Obama', /\bobama\b/gi],
  ['FDR', /\broosevelt\b/gi],
  ['Winston Churchill', /\bchurchill\b/gi],
  ['Napoleon', /\bnapoleon\b/gi],
  ['Hitler', /\bhitler\b/gi],
  ['Marx', /\bkarl marx\b/gi],
  ['Lenin', /\blenin\b/gi],

  // Philosophers / theologians
  ['C.S. Lewis', /\bc\.?\s*s\.?\s*lewis\b/gi],
  ['Thomas Aquinas', /\baquinas\b/gi],
  ['Augustine', /\baugustine\b/gi],
  ['Martin Luther', /\bmartin luther\b/gi],
  ['John Calvin', /\bcalvin\b/gi],
  ['Kierkegaard', /\bkierkegaard\b/gi],
  ['Nietzsche', /\bnietzsche\b/gi],
  ['Plato', /\bplato\b/gi],
  ['Aristotle', /\baristotle\b/gi],
  ['Kant', /\bkant\b/gi],
  ['Descartes', /\bdescartes\b/gi],
  ['Hegel', /\bhegel\b/gi],
  ['Thomas Hobbes', /\bhobbes\b/gi],

  // Scientists
  ['Einstein', /\beinstein\b/gi],
  ['Newton', /\bnewton\b/gi],
  ['Heisenberg', /\bheisenberg\b/gi],
  ['Max Planck', /\bplanck\b/gi],
  ['Bohr', /\bbohr\b/gi],
  ['Feynman', /\bfeynman\b/gi],
  ['Dirac', /\bdirac\b/gi],
  ['Schrodinger', /\bschr[oö]dinger\b/gi],

  // Contemporary / referenced by Thomas
  ['Jordan Peterson', /\bpeterson\b/gi],
  ['Elon Musk', /\belon musk\b/gi],
  ['RFK Jr', /\brfk\b/gi],
  ['Denver Snuffer', /\bsnuffer\b/gi],
  ['Joseph Smith', /\bjoseph smith\b/gi],
  ['Brigham Young', /\bbrigham young\b/gi],
  ['Michael Shermer', /\bshermer\b/gi],
  ['Dalai Lama', /\bdalai lama\b/gi],
  ['Fr. Ripperger', /\bripperger\b/gi],

  // Thomas's fellowship members
  ['Charlie', /\bcharlie\b/gi],
  ['Susan', /\bsusan\b/gi],
  ['Michael', /\bmichael\b/gi],
  ['Margo', /\bmargo\b/gi],
];

function extractPeople(text) {
  const found = [];
  for (const [name, regex] of PEOPLE_PATTERNS) {
    if (regex.test(text)) {
      found.push(name);
    }
    regex.lastIndex = 0; // reset for global regex
  }
  return [...new Set(found)].slice(0, 15);
}

// ---------------------------------------------------------------------------
// Thesis extraction — first substantive paragraph
// ---------------------------------------------------------------------------

function extractThesis(htmlContent, title) {
  // Strip HTML, split into paragraphs
  const text = htmlContent
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#\d+;/g, '')
    .replace(/&\w+;/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const paragraphs = text.split(/\n\n+/).map(p => p.trim()).filter(p => p.length > 80);

  // Skip paragraphs that are just metadata (date, author, title echo)
  for (const p of paragraphs) {
    const lower = p.toLowerCase();
    // Skip if it's mostly the title repeated
    if (lower.includes(title.toLowerCase().slice(0, 30))) continue;
    // Skip if it starts with date patterns
    if (/^\d{6}\s/.test(p)) continue;
    // Skip if it's a YAML block that leaked
    if (p.startsWith('title:') || p.startsWith('author:') || p.startsWith('---')) continue;
    // Skip if it's just a scripture reference
    if (p.length < 120 && /^\d?\s?\w+\s+\d+:\d+/.test(p)) continue;
    // Skip very short paragraphs
    if (p.length < 100) continue;
    // Skip metadata-like lines (Christos Fellowship Essay, date lines, Present: lists)
    if (/^(christos|fellowship|essay|present:|occasion\.|register \d)/i.test(lower)) continue;
    if (/^\w+ \d+,? \d{4}/.test(p)) continue;
    // Skip subtitles / taglines (short + no periods)
    if (p.length < 150 && !p.includes('. ')) continue;

    // Found it — truncate to ~200 chars at a sentence boundary
    let thesis = p;
    if (thesis.length > 250) {
      const sentenceEnd = thesis.indexOf('. ', 100);
      if (sentenceEnd > 0 && sentenceEnd < 300) {
        thesis = thesis.slice(0, sentenceEnd + 1);
      } else {
        thesis = thesis.slice(0, 250).replace(/\s+\S*$/, '') + '...';
      }
    }
    return thesis;
  }

  return null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function roughDecode(html) {
  return html
    .replace(/&#8211;/g, '\u2013').replace(/&#8212;/g, '\u2014')
    .replace(/&#8216;/g, "'").replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '...').replace(/&hellip;/g, '...')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/&#\d+;/g, '');
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

// ---------------------------------------------------------------------------
// Content analysis
// ---------------------------------------------------------------------------

function analyzeTopics(content) {
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
  const topN = sorted.slice(0, 10).map(([tag]) => tag);
  const strong = sorted.filter(([, c]) => c >= 3).map(([tag]) => tag);
  return [...new Set([...strong, ...topN])].slice(0, 15) || ['general'];
}

function classifyDomains(topics) {
  const domainScores = {};
  for (const [domain, members] of Object.entries(DOMAINS)) {
    const overlap = topics.filter(t => members.includes(t)).length;
    if (overlap > 0) domainScores[domain] = overlap;
  }
  return Object.entries(domainScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([d]) => d);
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
  const cppTopics = ['conscious_point_physics', 'grid_point_lattice', 'dark_matter', 'dark_energy',
    'quantum_mechanics', 'relativity', 'electromagnetism', 'cosmology', 'thermodynamics',
    'zitterbewegung', 'fine_structure', 'standard_model', 'particle_physics', 'nuclear_physics',
    'gravity', 'wave_theory', 'dipole_sea', 'pair_production', 'quark_confinement', 'icosahedral_symmetry'];
  const ceaTopics = ['constitutional_law', 'governance', 'economics', 'culture_war', 'immigration',
    'capitalism', 'socialism', 'communism', 'federal_reserve', 'inflation', 'taxation', 'tariffs',
    'welfare_state', 'administrative_state', 'foreign_policy'];
  const capTopics = ['mormonism', 'islam', 'judaism', 'hinduism', 'buddhism', 'apologetics',
    'comparative_religion', 'missionary_work', 'catholicism', 'protestantism'];
  const chrTopics = ['historical_analysis', 'american_founding', 'revolutionary_war', 'civil_war_us',
    'world_war_2', 'cold_war', 'napoleon', 'great_awakening', 'reformation_history', 'roman_empire'];

  if (primaryModule !== 'CPP' && topics.some(t => cppTopics.includes(t))) modules.add('CPP');
  if (primaryModule !== 'CEA' && topics.some(t => ceaTopics.includes(t))) modules.add('CEA');
  if (primaryModule !== 'CAP' && topics.some(t => capTopics.includes(t))) modules.add('CAP');
  if (primaryModule !== 'CHR' && topics.some(t => chrTopics.includes(t))) modules.add('CHR');
  if (primaryModule !== 'CCR' && topics.includes('conspiracy')) modules.add('CCR');

  modules.delete(primaryModule);
  return [...modules];
}

// ---------------------------------------------------------------------------
// YAML generation — multi-level
// ---------------------------------------------------------------------------

function generateYaml(post) {
  const title = decodeTitle(post.title);
  const date = post.date.split('T')[0];
  const module = inferModule(post);
  const type = inferType(post);
  const content = post.content || '';
  const plainText = stripHtml(content);

  const topics = analyzeTopics(content);
  const domains = classifyDomains(topics);
  const secondaryModules = inferSecondaryModules(module, topics);
  const scripture = extractScripture(plainText);
  const people = extractPeople(plainText);
  const thesis = extractThesis(content, title);
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
  yaml += `domains: [${domains.join(', ')}]\n`;
  yaml += `topics: [${topics.join(', ')}]\n`;
  if (scripture.length > 0) {
    yaml += `scripture: [${scripture.map(s => `"${s}"`).join(', ')}]\n`;
  }
  if (people.length > 0) {
    yaml += `mentions: [${people.map(p => `"${p}"`).join(', ')}]\n`;
  }
  if (thesis) {
    yaml += `thesis: "${thesis.replace(/"/g, '\\"')}"\n`;
  }
  yaml += `status: ESTABLISHED\n`;
  yaml += `type: ${type}\n`;
  if (sourceUrl) yaml += `source_url: "${sourceUrl}"\n`;
  yaml += `wp_id: ${post.id}\n`;
  yaml += `wp_slug: "${post.slug}"\n`;
  if (catNames.length > 0) {
    yaml += `wp_categories: [${catNames.map(c => `"${c}"`).join(', ')}]\n`;
  }
  yaml += '---';

  return { yaml, title, date, module, secondaryModules, domains, topics, scripture, people, thesis, type, sourceUrl };
}

// ---------------------------------------------------------------------------
// Output functions
// ---------------------------------------------------------------------------

function injectIntoHtml(htmlContent, yamlBlock) {
  const comment = `<!--\n${yamlBlock}\n-->\n`;
  const existingPattern = /^<!--\n---\n[\s\S]*?---\n-->\n/;
  if (existingPattern.test(htmlContent)) {
    return htmlContent.replace(existingPattern, comment);
  }
  return comment + htmlContent;
}

function generateMdStub(meta) {
  let md = `${meta.yaml}\n\n`;
  md += `# ${meta.title}\n\n`;
  if (meta.thesis) md += `> ${meta.thesis}\n\n`;
  md += `*Sourced from [${meta.sourceUrl ? 'renaissance-ministries.com' : 'website'}](${meta.sourceUrl}).*\n`;
  return md;
}

function findHtmlFile(slug) {
  const exact = path.join(ARTICLES_DIR, `${slug}.html`);
  if (fs.existsSync(exact)) return exact;
  const withoutDate = slug.replace(/^\d{6}-/, '');
  const alt = path.join(ARTICLES_DIR, `${withoutDate}.html`);
  if (fs.existsSync(alt)) return alt;
  if (fs.existsSync(ARTICLES_DIR)) {
    const files = fs.readdirSync(ARTICLES_DIR);
    const match = files.find(f => f.includes(slug) || slug.includes(f.replace('.html', '')));
    if (match) return path.join(ARTICLES_DIR, match);
  }
  return null;
}

// ---------------------------------------------------------------------------
// WordPress API (reused from wp-inject-frontmatter.js)
// ---------------------------------------------------------------------------

async function wpFetch(baseUrl, endpoint, options = {}) {
  const user = process.env.WP_USER;
  const pass = process.env.WP_APP_PASS;
  if (!user || !pass) throw new Error('Set WP_USER and WP_APP_PASS environment variables');
  const auth = 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64');
  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: { 'Authorization': auth, 'Content-Type': 'application/json', ...options.headers },
  });
  if (!res.ok) {
    if (res.status === 400) return null; // pagination end
    throw new Error(`${options.method || 'GET'} ${endpoint}: ${res.status}`);
  }
  return res.json();
}

async function getAllWpPosts(baseUrl) {
  const posts = [];
  let page = 1;
  while (true) {
    process.stdout.write(`  page ${page}...`);
    const batch = await wpFetch(baseUrl, `/posts?per_page=100&page=${page}&_fields=id,slug,title,date,content,link,categories`);
    if (!batch || batch.length === 0) break;
    const allCatIds = new Set();
    for (const p of batch) for (const cid of (p.categories || [])) allCatIds.add(cid);
    const catMap = {};
    if (allCatIds.size > 0) {
      const cats = await wpFetch(baseUrl, `/categories?include=${[...allCatIds].join(',')}&per_page=100`);
      if (cats) for (const c of cats) catMap[c.id] = { id: c.id, slug: c.slug, name: c.name };
    }
    for (const p of batch) {
      posts.push({
        id: p.id, slug: p.slug, title: p.title.rendered, date: p.date,
        content: p.content.rendered, link: p.link,
        categories: (p.categories || []).map(cid => catMap[cid] || { id: cid, slug: 'uncategorized', name: 'Uncategorized' }),
      });
    }
    page++;
    await sleep(300);
  }
  console.log(` ${posts.length} posts`);
  return posts;
}

// ---------------------------------------------------------------------------
// Report generation
// ---------------------------------------------------------------------------

function generateReport(allMeta) {
  const topicCounts = {}, domainCounts = {}, scriptureCounts = {}, peopleCounts = {};
  for (const m of allMeta) {
    for (const d of m.domains) domainCounts[d] = (domainCounts[d] || 0) + 1;
    for (const t of m.topics) topicCounts[t] = (topicCounts[t] || 0) + 1;
    for (const s of m.scripture) scriptureCounts[s] = (scriptureCounts[s] || 0) + 1;
    for (const p of m.people) peopleCounts[p] = (peopleCounts[p] || 0) + 1;
  }
  let r = `# Frontmatter V2 Report\n\n**Articles:** ${allMeta.length}\n**Date:** ${new Date().toISOString().split('T')[0]}\n\n`;
  r += '## Domain Distribution\n\n| Domain | Count |\n|--------|-------|\n';
  for (const [d, c] of Object.entries(domainCounts).sort((a, b) => b[1] - a[1])) r += `| ${d} | ${c} |\n`;
  r += '\n## Top 50 Topics\n\n| Topic | Articles |\n|-------|----------|\n';
  for (const [t, c] of Object.entries(topicCounts).sort((a, b) => b[1] - a[1]).slice(0, 50)) r += `| ${t} | ${c} |\n`;
  r += '\n## Top 30 Scripture References\n\n| Reference | Articles |\n|-----------|----------|\n';
  for (const [s, c] of Object.entries(scriptureCounts).sort((a, b) => b[1] - a[1]).slice(0, 30)) r += `| ${s} | ${c} |\n`;
  r += '\n## People Mentioned\n\n| Person | Articles |\n|--------|----------|\n';
  for (const [p, c] of Object.entries(peopleCounts).sort((a, b) => b[1] - a[1])) r += `| ${p} | ${c} |\n`;
  return r;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const doWrite = args.includes('--write');
  const doStubs = args.includes('--stubs');
  const doReport = args.includes('--report');
  const doWp = args.includes('--wp');
  const testMode = args.includes('--test');

  let posts;

  if (doWp) {
    // WordPress mode — fetch from API
    const baseUrl = process.env.WP_BASE || 'https://renaissance-ministries.com/wp-json/wp/v2';
    console.log(`Fetching from WordPress: ${baseUrl}`);
    const me = await wpFetch(baseUrl, '/users/me');
    console.log(`Authenticated as: ${me.name}\n`);
    posts = await getAllWpPosts(baseUrl);
  } else {
    // Local mode — use content.json
    if (!fs.existsSync(CONTENT_JSON)) { console.error(`ERROR: ${CONTENT_JSON} not found`); process.exit(1); }
    const data = JSON.parse(fs.readFileSync(CONTENT_JSON, 'utf8'));
    posts = [...(data.posts || []), ...(data.pages || [])].filter(p => p.content && p.content.trim());
    console.log(`Loaded ${posts.length} items from content.json\n`);
  }

  const allMeta = [];
  let injected = 0, wpUpdated = 0, skipped = 0;
  const limit = testMode ? (doWp ? 1 : 5) : posts.length;

  for (let i = 0; i < Math.min(limit, posts.length); i++) {
    const post = posts[i];
    const { yaml, ...meta } = generateYaml(post);
    allMeta.push(meta);

    // Dry run preview
    if (!doWrite && !doWp && !doReport && i < 5) {
      console.log(`--- ${post.slug} ---`);
      console.log(yaml);
      console.log();
    }

    // Local HTML injection
    if (doWrite) {
      const htmlPath = findHtmlFile(post.slug);
      if (htmlPath) {
        const html = fs.readFileSync(htmlPath, 'utf8');
        fs.writeFileSync(htmlPath, injectIntoHtml(html, yaml), 'utf8');
        injected++;
      }
    }

    // Repo stubs
    if (doWrite && doStubs) {
      if (!fs.existsSync(STUBS_DIR)) fs.mkdirSync(STUBS_DIR, { recursive: true });
      fs.writeFileSync(path.join(STUBS_DIR, `${post.slug}.md`), generateMdStub({ ...meta, yaml }), 'utf8');
    }

    // WordPress update
    if (doWp) {
      const comment = `<!--\n${yaml}\n-->\n`;
      // Check if already has v2 frontmatter (has 'domains:' field)
      if (post.content.includes('domains:')) {
        skipped++;
        continue;
      }
      // Safely remove old frontmatter if present
      // The WP API returns content.rendered which may wrap comments in <p> tags
      let content = post.content;

      // Strip frontmatter comment block — look for the YAML delimiters specifically
      // Match: optional <p> tag, then <!-- ... --- ... --- ... -->, optional </p>
      const fmPattern = /^(?:<p>)?<!--\s*\n?---[\s\S]*?---\s*\n?-->\s*(?:<\/p>\s*)?/;
      const match = content.match(fmPattern);
      if (match) {
        // Safety check: if the matched portion is >80% of total content, DON'T strip
        // This means the whole post was likely inside the comment — preserve it
        if (match[0].length < content.length * 0.8) {
          content = content.slice(match[0].length);
        } else {
          console.log(' SAFETY: frontmatter block is >80% of content, skipping strip');
        }
      }

      content = comment + content;

      try {
        const baseUrl = process.env.WP_BASE || 'https://renaissance-ministries.com/wp-json/wp/v2';
        process.stdout.write(`  [${i + 1}/${limit}] ${post.slug}...`);
        await wpFetch(baseUrl, `/posts/${post.id}`, {
          method: 'POST',
          body: JSON.stringify({ content }),
        });
        console.log(' OK');
        wpUpdated++;
        await sleep(DELAY_MS);
      } catch (err) {
        console.log(` ERROR: ${err.message}`);
      }
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Total: ${allMeta.length}`);
  if (doWrite) console.log(`HTML injected: ${injected}`);
  if (doWp) console.log(`WP updated: ${wpUpdated} | Skipped: ${skipped}`);
  if (!doWrite && !doWp && !doReport) console.log('DRY RUN \u2014 use --write, --wp, or --report');

  if (doReport) {
    const report = generateReport(allMeta);
    const reportPath = path.join(SITE_ROOT, 'frontmatter-v2-report.md');
    fs.writeFileSync(reportPath, report, 'utf8');
    console.log(`Report: ${reportPath}`);
  }
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });

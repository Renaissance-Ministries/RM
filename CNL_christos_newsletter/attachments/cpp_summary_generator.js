const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, LevelFormat, ShadingType, convertInchesToTwip
} = require('docx');

const P = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text, size: 22, font: 'Georgia', italics: opts.i || false, bold: opts.b || false })],
  spacing: { after: 160, line: 276 },
  alignment: opts.align || AlignmentType.JUSTIFIED,
  ...(opts.extra || {})
});

const H = (text, level) => new Paragraph({
  heading: level,
  children: [new TextRun({ text, font: 'Georgia' })],
  spacing: { before: 240, after: 120 }
});

const bullet = (text) => new Paragraph({
  children: [new TextRun({ text, size: 22, font: 'Georgia' })],
  numbering: { reference: 'bullets', level: 0 },
  spacing: { after: 100, line: 276 }
});

const cell = (text, w, opts = {}) => new TableCell({
  width: { size: w, type: WidthType.DXA },
  shading: opts.shade ? { type: ShadingType.CLEAR, fill: 'EFEAE3' } : undefined,
  margins: { top: 60, bottom: 60, left: 100, right: 100 },
  children: [new Paragraph({
    children: [new TextRun({ text, size: 20, font: 'Georgia', bold: opts.b || false })],
    spacing: { after: 0 }
  })]
});

const resultsRows = [
  ['Result', 'CPP prediction', 'Measured value', 'Agreement'],
  ['Koide charged-lepton ratio', '2/3 exactly', '0.666661', 'within 11 parts per million'],
  ['Weinberg (electroweak mixing) angle', '3/(8\u03C6) = 0.2318', '0.2312', '0.24%'],
  ['Muon mass', '105.47 MeV', '105.66 MeV', '0.18%'],
  ['Tau mass', '1,774.1 MeV', '1,776.9 MeV', '0.15%'],
  ['Heavy quark masses (s, c, b, t)', 'one geometric formula', 'PDG values', 'about 2% (all four)'],
  ['Proton magnetic moment', '2.789 \u03BC\u2099', '2.793 \u03BC\u2099', '0.1%'],
  ['Nuclear alpha-chain bindings (\u00B9\u00B2C \u2192 \u2075\u2076Ni)', 'twelve nuclei, one formula', 'AME 2020 tables', 'RMS 0.80%'],
  ['\u2078\u2074Mo, \u2078\u2078Ru bindings (predicted before measurement)', '698.92 / 729.56 MeV', '699.27 / 730.10 MeV (2025)', '0.05% / 0.07%'],
  ['Neutrino sector (8 parameters)', 'from the one calibration', 'oscillation data', '7 of 8 at zero parameters'],
  ['CMB spectral index (early universe)', 'n\u209B \u2248 0.9649', '0.9649 (Planck)', 'zero-parameter match'],
];

const table = new Table({
  columnWidths: [3200, 2400, 2400, 2360],
  width: { size: 10360, type: WidthType.DXA },
  rows: resultsRows.map((r, i) => new TableRow({
    children: r.map((t, j) => cell(t, [3200, 2400, 2400, 2360][j], { b: i === 0, shade: i === 0 }))
  }))
});

const doc = new Document({
  numbering: {
    config: [{
      reference: 'bullets',
      levels: [{ level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: convertInchesToTwip(0.3), hanging: convertInchesToTwip(0.15) } } } }]
    }]
  },
  styles: {
    default: {
      heading1: { run: { size: 30, bold: true, color: '3B2F2F', font: 'Georgia' } },
      heading2: { run: { size: 25, bold: true, color: '3B2F2F', font: 'Georgia' } },
    }
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } } },
    children: [
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
        children: [new TextRun({ text: 'Conscious Point Physics', size: 40, bold: true, font: 'Georgia', color: '3B2F2F' })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
        children: [new TextRun({ text: 'A Summary for Readers of Renaissance Ministries', size: 26, italics: true, font: 'Georgia' })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 280 },
        children: [new TextRun({ text: 'Thomas Lee Abshier, ND \u00B7 Hyperphysics Institute \u00B7 August 2026', size: 20, font: 'Georgia', color: '666666' })] }),

      H('Why a Physics Summary Accompanies These Essays', HeadingLevel.HEADING_1),
      P('The essays of Renaissance Ministries move freely between the Bible and physics, and a reader meeting them for the first time deserves to know why. The reason is a communication problem as old as the modern age: the believer and the scientist are working from two sheets of graph paper ruled to different scales, with no legend to convert one to the other. Science has become the culture\u2019s de facto priesthood \u2014 consulted on origins, ends, and the nature of the person \u2014 and the Christian has been made to feel that he lacks grounds to speak. Conscious Point Physics (CPP) is my forty-year attempt to draw the missing legend: a single framework in which the claims of Scripture and the measurements of the laboratory describe the same creation. It does not prove God, and it is not Scripture. It is a bridge \u2014 stepping stones across a wide river \u2014 offered so that the stumbling block of the modern mind may become a pebble.'),

      H('The Central Thesis', HeadingLevel.HEADING_1),
      P('The framework begins where John begins: In the beginning was the Word, and the Word was with God, and the Word was God. All things were made by him (John 1:1\u20133). The Father declared the Son into existence; the Son declared the physical universe. CPP asks the engineering question reverently: how? Its answer is that the Son populated space with Conscious Points \u2014 unimaginably many identical points of divine awareness, each obeying a small set of rules, each perceiving its neighbors, computing its response, and moving, in every successive Moment of time. The universe, on this account, is not dead stuff that happens to be watched by God; it is the ongoing, moment-by-moment computation of the mind of God. In him we live, and move, and have our being (Acts 17:28); by him all things consist (Colossians 1:17).'),

      H('The Postulates in Plain Language', HeadingLevel.HEADING_1),
      bullet('Two kinds of Conscious Points \u2014 electric-type and quark-type, each in positive and negative polarity \u2014 are the only material primitives. Most are bound in pairs, filling all of space with a \u201CDipole Sea\u201D: the invisible medium that carries light and stores energy.'),
      bullet('Space itself has a structure: a lattice whose geometry is the 600-cell \u2014 a highly symmetric four-dimensional figure known to mathematics for over a century. The startling discovery of this programme is that the constants of particle physics fall out of that one geometric object.'),
      bullet('Time proceeds in Moments. In each Moment, every Conscious Point performs one cycle \u2014 Perceive, Compute, Displace \u2014 and the sum of those cycles is everything that happens.'),
      bullet('The forces are not separate inventions. Light is a wave of polarization in the Dipole Sea; magnetism is the Sea\u2019s twist around moving charge; gravity is the gradient of stress that mass induces in space; the weak interactions are temporary assemblies of the Sea; only the strong force is native to the quark-type points. What physics calls \u201Claws\u201D are the faithfulness of the Points to their instructions.'),

      H('What the Framework Achieves', HeadingLevel.HEADING_1),
      P('A theory earns a hearing by what it predicts, and here CPP makes an unusual claim: from nine axioms and essentially one measured input \u2014 the mass of the electron \u2014 with zero adjustable shape parameters, it currently derives 108 zero-parameter correspondences with experiment, secured by 67 proved theorems. A representative sample:'),
      table,
      new Paragraph({ children: [new TextRun({ text: '', size: 8 })], spacing: { after: 80 } }),
      P('Three of the nuclear predictions above were published before the nuclei were first measured, and the 2025 measurements landed within 0.05\u20130.13% \u2014 the kind of test that separates a framework from a curve-fit. Active fronts include the dark-matter candidate (a specific lattice structure whose properties are under formal adjudication), the unification paper drawing all sectors together, and the cosmology of the early universe. Every result is versioned, reviewed by a multi-AI adversarial panel, and archived publicly; the framework is deliberately falsifiable, and its open problems are published alongside its successes.'),

      H('What It Means for Faith', HeadingLevel.HEADING_1),
      P('If the universe is the computation of a Mind, then the physical order and the moral order are not two subjects but two descriptions of one substrate \u2014 and the deepest claims of the Gospel acquire a natural home. The essays on this site develop that connection as a chain of twelve premises resting on the nine axioms: why a creation made for freely chosen love must veil its Creator; why sin is not only a legal fact but a disorder in the fabric of being; and why the death and resurrection of the Son \u2014 the One in whom the creation subsists \u2014 could constitute the payment, the cancellation, and the open channel by which a person is cleansed today by an event two thousand years past. None of that mechanism is elaborated in Scripture; it is offered as hypothesis, consistent with Scripture, labeled as such.'),

      H('What It Is Not', HeadingLevel.HEADING_1),
      P('This framework is support, not substitute. It is one man\u2019s argument, useful exactly insofar as it sends people to the Bible more able to believe it, and to be laid down the moment it competes with the Book it serves. The test for it is the test for every teacher: does it point at Christ? He must increase, but I must decrease (John 3:30). And the search itself is commended to us: It is the glory of God to conceal a thing: but the honour of kings is to search out a matter (Proverbs 25:2).'),

      H('Learn More', HeadingLevel.HEADING_1),
      bullet('Essays and fellowship: renaissance-ministries.com'),
      bullet('The physics programme: hyperphysics.com and theoryofabsolutes.com'),
      bullet('Papers, code, and full audit trail: github.com/Hyperphysics-Institute/CPP'),
      bullet('Archived publications: OSF, DOI 10.17605/OSF.IO/JXE8D'),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 220 },
        children: [new TextRun({ text: 'Of one heart to make Christ King \u2014 1 Chronicles 12:38', size: 21, italics: true, font: 'Georgia', color: '3B2F2F' })] }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => { fs.writeFileSync('/home/claude/work/CPP_Summary_for_Renaissance_Ministries.docx', buf); console.log('written', buf.length); });

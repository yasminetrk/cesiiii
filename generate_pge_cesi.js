/**
 * ============================================================
 *  GÉNÉRATEUR DE FICHE DE DÉFINITION D'INTENTION - PGE CESI
 *  Script professionnel pour Cursor AI
 *  Auteur  : [Votre Nom]
 *  Version : 1.0
 * ============================================================
 *
 * INSTRUCTIONS :
 *  1. Installer : npm install docx
 *  2. Exécuter  : node generate_pge_cesi.js
 *  3. Le fichier Word sera créé dans le dossier courant
 */

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  Header,
  Footer,
  AlignmentType,
  BorderStyle,
  WidthType,
  ShadingType,
  VerticalAlign,
  PageNumberElement,
  TabStopType,
  TabStopPosition,
  UnderlineType,
} = require("docx");
const fs = require("fs");
const path = require("path");

// ============================================================
//  DONNÉES DU DOCUMENT — Modifiez cette section uniquement
// ============================================================
const DATA = {
  // --- En-tête / Identité ---
  nom: "BENKHEDDA",
  prenom: "Mohamed Amine",
  promotion: "ING1 – 2025/2026",
  date: "22/01/2026",
  ville: "Alger",
  ecole: "CESI École d'Ingénieurs",

  // --- Titre du projet ---
  titreProjet: "Chatbot d'orientation universitaire basé sur l'IA",

  // --- Section 1 : Objectifs ---
  objectifs:
    "L'objectif est de concevoir et développer un chatbot interactif basé sur l'intelligence " +
    "artificielle pour accompagner les lycéens dans leur orientation post-bac. Ce projet s'inscrit " +
    "dans une démarche d'ingénierie sociale visant à vulgariser les parcours universitaires et à " +
    "faciliter l'accès à l'information sur les spécialités de la faculté. Il s'agit d'un engagement " +
    "individuel visant à utiliser mes compétences techniques pour répondre à une problématique " +
    "d'accessibilité éducative.",

  // --- Section 2 : Intérêts & motivation ---
  motivation:
    "Je souhaite mettre en pratique mes connaissances en programmation et en logique algorithmique " +
    "pour résoudre un problème concret : l'indécision des jeunes face à leur avenir. Ma motivation " +
    "réside dans la volonté de créer un pont technologique entre le lycée et l'enseignement supérieur, " +
    "tout en démontrant l'utilité sociale de l'ingénieur informatique. Ce projet me permet d'allier " +
    "passion pour le développement et impact citoyen.",

  // --- Section 3 : Contribution à la société ---
  contribution:
    "Ce projet contribuera à réduire l'inégalité d'accès à l'information en offrant un conseiller " +
    "d'orientation numérique disponible 24h/24. En aidant les lycéens à mieux choisir leur spécialité, " +
    "je participe à la lutte contre l'échec scolaire et le décrochage universitaire. Enfin, je valorise " +
    "les filières scientifiques et techniques auprès des générations futures pour le développement du pays.",

  // --- Section 4 : Étapes ---
  etapes: [
    {
      titre: "Analyse des besoins",
      description: "Recueil des informations sur les spécialités et critères d'admission.",
    },
    {
      titre: "Conception technique",
      description: "Élaboration de l'arborescence de décision et choix de la plateforme de développement.",
    },
    {
      titre: "Développement",
      description: "Programmation du chatbot et intégration des données.",
    },
    {
      titre: "Validation",
      description: "Tests utilisateurs et ajustements pour garantir la pertinence des conseils.",
    },
  ],

  // --- Section 5 : Compétences ---
  competencesTechniques:
    "Maîtrise de la logique de programmation appliquée à l'IA et gestion de projet informatique.",
  competencesSociales: [
    "Sociales : Capacité à identifier et répondre aux besoins d'un public spécifique (lycéens).",
    "Éthiques : Réflexion sur la responsabilité de l'ingénieur dans la transmission de données fiables " +
      "et l'impact de l'automatisation.",
  ],

  // --- Section 6 : Indicateurs de réussite ---
  indicateurs: [
    "Le chatbot répond correctement à 90 % des questions posées lors des tests.",
    "Au moins 20 lycéens testeurs expriment une satisfaction positive.",
    "Documentation technique complète remise à la fin du projet.",
  ],

  // --- Signature ---
  dateFin: "22 janvier 2026",
};

// ============================================================
//  PALETTE DE COULEURS CESI
// ============================================================
const COLORS = {
  primary: "1B3A6B", // Bleu marine CESI foncé
  accent: "2D72D2", // Bleu accent CESI
  lightBg: "EEF3FB", // Fond clair pour sections
  headerBg: "1B3A6B", // Fond en-tête
  tableBg: "D6E4F7", // Fond tableau en-tête
  white: "FFFFFF",
  text: "1A1A1A",
  subtle: "5A6475",
  separator: "2D72D2",
};

// ============================================================
//  HELPERS — Fonctions utilitaires
// ============================================================

/** Crée un séparateur horizontal bleu élégant */
function separator() {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 12, color: COLORS.separator, space: 6 },
    },
    children: [],
  });
}

/** Espace vide */
function spacer(before = 80, after = 80) {
  return new Paragraph({ spacing: { before, after }, children: [] });
}

/** Paragraphe de corps de texte standard */
function bodyParagraph(text, options = {}) {
  return new Paragraph({
    spacing: { before: 60, after: 120, line: 280, lineRule: "auto" },
    alignment: AlignmentType.JUSTIFIED,
    ...options,
    children: [
      new TextRun({
        text,
        font: "Calibri",
        size: 22, // 11pt
        color: COLORS.text,
        ...options.run,
      }),
    ],
  });
}

/** Titre de section avec barre latérale colorée */
function sectionTitle(text) {
  return new Paragraph({
    spacing: { before: 240, after: 100 },
    border: {
      left: { style: BorderStyle.THICK, size: 24, color: COLORS.accent, space: 8 },
    },
    children: [
      new TextRun({
        text: text.toUpperCase(),
        font: "Calibri",
        size: 24, // 12pt
        bold: true,
        color: COLORS.primary,
        characterSpacing: 20,
      }),
    ],
  });
}

/** Élément de liste numérotée avec titre en gras + description */
function numberedStep(index, titre, description) {
  return new Paragraph({
    spacing: { before: 60, after: 80, line: 270, lineRule: "auto" },
    children: [
      new TextRun({ text: `${index}.  `, font: "Calibri", size: 22, bold: true, color: COLORS.accent }),
      new TextRun({ text: `${titre} : `, font: "Calibri", size: 22, bold: true, color: COLORS.primary }),
      new TextRun({ text: description, font: "Calibri", size: 22, color: COLORS.text }),
    ],
  });
}

/** Élément de liste à puce (sans unicode bullet "•") */
function bulletItem(text, indent = 720) {
  return new Paragraph({
    spacing: { before: 40, after: 40, line: 270, lineRule: "auto" },
    children: [
      new TextRun({ text: "▸  ", font: "Calibri", size: 22, color: COLORS.accent, bold: true }),
      new TextRun({ text, font: "Calibri", size: 22, color: COLORS.text }),
    ],
    indent: { left: indent },
  });
}

/** Crée une cellule de tableau standard */
function makeCell(paragraphs, options = {}) {
  return new TableCell({
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
    },
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    verticalAlign: VerticalAlign.CENTER,
    shading: options.shading || undefined,
    width: options.width,
    children: paragraphs,
  });
}

// ============================================================
//  EN-TÊTE DU DOCUMENT
// ============================================================
function buildHeader() {
  return new Header({
    children: [
      new Paragraph({
        spacing: { after: 80 },
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 6, color: COLORS.accent, space: 4 },
        },
        children: [
          new TextRun({
            text: "CESI École d'Ingénieurs",
            font: "Calibri",
            size: 18,
            bold: true,
            color: COLORS.primary,
          }),
          new TextRun({ text: "\t" }),
          new TextRun({
            text: "Fiche de Définition d'Intention – PGE",
            font: "Calibri",
            size: 16,
            italics: true,
            color: COLORS.subtle,
          }),
        ],
      }),
    ],
  });
}

// ============================================================
//  PIED DE PAGE
// ============================================================
function buildFooter() {
  return new Footer({
    children: [
      new Paragraph({
        spacing: { before: 60 },
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        border: {
          top: { style: BorderStyle.SINGLE, size: 6, color: COLORS.accent, space: 4 },
        },
        children: [
          new TextRun({
            text: `${DATA.nom} ${DATA.prenom} – ${DATA.promotion}`,
            font: "Calibri",
            size: 16,
            color: COLORS.subtle,
          }),
          new TextRun({ text: "\t" }),
          new TextRun({ text: "Page ", font: "Calibri", size: 16, color: COLORS.subtle }),
          new PageNumberElement(),
        ],
      }),
    ],
  });
}

// ============================================================
//  TABLEAU DE DONNÉES PERSONNELLES (en-tête du document)
// ============================================================
function buildInfoTable() {
  const labelRun = (text) => new TextRun({ text, font: "Calibri", size: 20, bold: true, color: COLORS.white });
  const valueRun = (text) => new TextRun({ text, font: "Calibri", size: 20, color: COLORS.text });

  const labelShading = { fill: COLORS.primary, type: ShadingType.CLEAR };
  const valueShading = { fill: COLORS.lightBg, type: ShadingType.CLEAR };

  const row = (label, value) =>
    new TableRow({
      children: [
        makeCell([new Paragraph({ alignment: AlignmentType.CENTER, children: [labelRun(label)] })], {
          shading: labelShading,
          width: { size: 2800, type: WidthType.DXA },
        }),
        makeCell([new Paragraph({ children: [valueRun(value)] })], {
          shading: valueShading,
          width: { size: 6200, type: WidthType.DXA },
        }),
      ],
    });

  return new Table({
    width: { size: 9000, type: WidthType.DXA },
    columnWidths: [2800, 6200],
    rows: [
      row("Nom & Prénom", `${DATA.prenom} ${DATA.nom}`),
      row("Promotion", DATA.promotion),
      row("Date", DATA.date),
      row("Ville", DATA.ville),
    ],
  });
}

// ============================================================
//  TABLEAU DES INDICATEURS DE RÉUSSITE
// ============================================================
function buildIndicatorsTable() {
  const headerShading = { fill: COLORS.tableBg, type: ShadingType.CLEAR };

  const headerRow = new TableRow({
    children: [
      makeCell(
        [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "#", font: "Calibri", size: 20, bold: true, color: COLORS.primary })],
          }),
        ],
        { shading: headerShading, width: { size: 800, type: WidthType.DXA } }
      ),
      makeCell(
        [
          new Paragraph({
            children: [
              new TextRun({ text: "Indicateur de réussite", font: "Calibri", size: 20, bold: true, color: COLORS.primary }),
            ],
          }),
        ],
        { shading: headerShading, width: { size: 8200, type: WidthType.DXA } }
      ),
    ],
  });

  const rows = DATA.indicateurs.map((ind, i) =>
    new TableRow({
      children: [
        makeCell(
          [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: String(i + 1), font: "Calibri", size: 20, bold: true, color: COLORS.accent })],
            }),
          ],
          { width: { size: 800, type: WidthType.DXA } }
        ),
        makeCell(
          [new Paragraph({ children: [new TextRun({ text: ind, font: "Calibri", size: 20, color: COLORS.text })] })],
          { width: { size: 8200, type: WidthType.DXA } }
        ),
      ],
    })
  );

  return new Table({
    width: { size: 9000, type: WidthType.DXA },
    columnWidths: [800, 8200],
    rows: [headerRow, ...rows],
  });
}

// ============================================================
//  PAGE DE GARDE (séparée)
// ============================================================
function buildCoverPage() {
  return [
    spacer(0, 220),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
      children: [
        new TextRun({
          text: "CESI",
          font: "Calibri",
          size: 72,
          bold: true,
          color: COLORS.primary,
          characterSpacing: 60,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 280 },
      children: [
        new TextRun({
          text: "École d'Ingénieurs",
          font: "Calibri",
          size: 28,
          italics: true,
          color: COLORS.accent,
        }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 120 },
      border: { bottom: { style: BorderStyle.DOUBLE, size: 10, color: COLORS.accent, space: 6 } },
      children: [],
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 40 },
      children: [
        new TextRun({
          text: "FICHE DE DÉFINITION D'INTENTION",
          font: "Calibri",
          size: 40,
          bold: true,
          color: COLORS.primary,
          characterSpacing: 30,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 140 },
      children: [new TextRun({ text: "Projet de Groupe Encadré — PGE", font: "Calibri", size: 26, color: COLORS.subtle, italics: true })],
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 200 },
      shading: { fill: COLORS.lightBg, type: ShadingType.CLEAR },
      children: [
        new TextRun({
          text: `« ${DATA.titreProjet} »`,
          font: "Calibri",
          size: 30,
          bold: true,
          italics: true,
          color: COLORS.primary,
        }),
      ],
    }),

    spacer(600, 600),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 30 },
      children: [new TextRun({ text: `${DATA.prenom} ${DATA.nom}`, font: "Calibri", size: 26, bold: true, color: COLORS.primary })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 20 },
      children: [new TextRun({ text: DATA.promotion, font: "Calibri", size: 22, color: COLORS.subtle })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 20 },
      children: [new TextRun({ text: `${DATA.ville} — ${DATA.date}`, font: "Calibri", size: 22, color: COLORS.subtle })],
    }),
  ];
}

// ============================================================
//  TITRE PRINCIPAL (page d'entrée du contenu)
// ============================================================
function buildTitleBlock() {
  return [
    spacer(0, 200),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
      children: [
        new TextRun({
          text: "FICHE DE DÉFINITION D'INTENTION",
          font: "Calibri",
          size: 38,
          bold: true,
          color: COLORS.primary,
          characterSpacing: 40,
        }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0 },
      children: [
        new TextRun({
          text: "Projet de Groupe Encadré — PGE",
          font: "Calibri",
          size: 24,
          italics: true,
          color: COLORS.accent,
        }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 120 },
      border: {
        bottom: { style: BorderStyle.DOUBLE, size: 6, color: COLORS.accent, space: 6 },
      },
      children: [],
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 100, after: 60 },
      shading: { fill: COLORS.lightBg, type: ShadingType.CLEAR },
      children: [
        new TextRun({
          text: `« ${DATA.titreProjet} »`,
          font: "Calibri",
          size: 28,
          bold: true,
          italics: true,
          color: COLORS.primary,
        }),
      ],
    }),

    spacer(120, 120),
    buildInfoTable(),
    spacer(200, 0),
  ];
}

// ============================================================
//  CORPS DU DOCUMENT
// ============================================================
function buildBody() {
  const children = [];

  children.push(sectionTitle("1. Objectifs et nature de l'engagement"));
  children.push(bodyParagraph(DATA.objectifs));
  children.push(separator());

  children.push(sectionTitle("2. Intérêts et motivation"));
  children.push(bodyParagraph(DATA.motivation));
  children.push(separator());

  children.push(sectionTitle("3. Contributions souhaitées à la société"));
  children.push(bodyParagraph(DATA.contribution));
  children.push(separator());

  children.push(sectionTitle("4. Étapes prévues, moyens et responsabilités"));
  spacer(60, 40);

  DATA.etapes.forEach((etape, i) => {
    children.push(numberedStep(i + 1, etape.titre, etape.description));
  });
  children.push(separator());

  children.push(sectionTitle("5. Compétences que vous pensez acquérir"));
  children.push(
    new Paragraph({
      spacing: { before: 80, after: 60 },
      children: [
        new TextRun({ text: "Techniques : ", font: "Calibri", size: 22, bold: true, color: COLORS.primary }),
        new TextRun({ text: DATA.competencesTechniques, font: "Calibri", size: 22, color: COLORS.text }),
      ],
    })
  );
  DATA.competencesSociales.forEach((item) => {
    children.push(bulletItem(item));
  });
  children.push(separator());

  children.push(sectionTitle("6. Indicateurs de réussite"));
  children.push(spacer(80, 80));
  children.push(buildIndicatorsTable());
  children.push(separator());

  children.push(spacer(200, 0));
  children.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({
          text: `Fait à ${DATA.ville}, le ${DATA.dateFin}`,
          font: "Calibri",
          size: 20,
          italics: true,
          color: COLORS.subtle,
        }),
      ],
    })
  );
  children.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 0, after: 0 },
      children: [
        new TextRun({
          text: `${DATA.prenom} ${DATA.nom}`,
          font: "Calibri",
          size: 22,
          bold: true,
          color: COLORS.primary,
          underline: { type: UnderlineType.SINGLE },
        }),
      ],
    })
  );

  return children;
}

// ============================================================
//  ASSEMBLAGE ET GÉNÉRATION DU FICHIER
// ============================================================
async function generate() {
  console.log("⏳  Génération du document en cours...");

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 22, color: COLORS.text },
          paragraph: { spacing: { line: 276, lineRule: "auto" } },
        },
      },
    },

    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 }, // A4
            margin: { top: 1134, right: 1134, bottom: 1134, left: 1418 },
          },
        },
        headers: { default: buildHeader() },
        footers: { default: buildFooter() },
        children: [
          ...buildCoverPage(),
          new Paragraph({ children: [], pageBreakBefore: true }),
          ...buildTitleBlock(),
          ...buildBody(),
        ],
      },
    ],
  });

  const outputPath = path.join(__dirname, "PGE_Fiche_Definition_Intention.docx");
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);

  console.log("✅  Document généré avec succès !");
  console.log(`📄  Fichier : ${outputPath}`);
}

generate().catch((err) => {
  console.error("❌  Erreur :", err);
  process.exit(1);
});


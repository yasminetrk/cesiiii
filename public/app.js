const STORAGE_KEY = "cesi-orientation-v2";
const FILIERES_COUNT = 15;
const COUNTER_TARGET = 2847;

const SUGGESTED = [
  "Quels sont les débouchés en Algérie ?",
  "Combien gagne un ingénieur informatique ?",
  "Comment utiliser PROGRES pour m’inscrire ?",
  "Quelles bourses existent (Algérie et France) ?",
  "Comment créer mon entreprise après le bac ?",
  "Quelles écoles d’ingénieurs viser ?",
  "Comment améliorer mon anglais gratuitement ?",
  "Quelle est la différence entre Licence et Master ?",
];

/** Liens officiels et reconnus (vérifier régulièrement les URL). */
const RESOURCES = [
  { label: "PROGRES — inscriptions universitaires", hint: "MESRS", url: "https://progres.mesrs.dz/webetu/" },
  { label: "MESRS — Enseignement supérieur", hint: "Ministère", url: "https://www.mesrs.dz/" },
  { label: "Ministère de l’Éducation — Bac & scolarité", hint: "Éducation nationale", url: "https://www.education.gov.dz/" },
  { label: "USTHB", hint: "Université Alger", url: "https://www.usthb.dz/" },
  { label: "ESI Alger", hint: "École supérieure d’informatique", url: "https://www.esi.dz/" },
  { label: "ENP Constantine", hint: "École nationale polytechnique", url: "https://www.enp-constantine.dz/" },
  { label: "ENSTP", hint: "École travaux publics", url: "https://www.enstp.edu.dz/" },
  { label: "Campus France — Algérie", hint: "Études en France", url: "https://dz.campusfrance.org/" },
  { label: "ONOU — Office national œuvres universitaires", hint: "Logement & accompagnement", url: "https://www.onou.dz/" },
  { label: "ANEM — Emploi & formation", hint: "Agence nationale", url: "https://www.anem.dz/" },
];

const CALENDRIER_2025_2026 = [
  { date: "Juin 2025", titre: "Session du Baccalauréat", desc: "Épreuves nationales : consulter education.gov.dz pour calendrier officiel et centres." },
  { date: "Juil. 2025", titre: "Publication des résultats du Bac", desc: "Consultation via les canaux du ministère et ton établissement." },
  { date: "Août 2025", titre: "Ouverture préinscriptions PROGRES", desc: "Création de compte, choix d’établissements et filières selon les modalités MESRS." },
  { date: "Sept. 2025", titre: "Inscriptions administratives", desc: "Finalisation des dossiers à l’université ou l’école retenue." },
  { date: "Sept.–Oct. 2025", titre: "Rentrée universitaire", desc: "Cours, réunions d’accueil et adaptation L1/L2 selon établissement." },
  { date: "Oct.–Nov. 2025", titre: "Concours & sélections (certaines écoles)", desc: "Vérifier les dates sur les sites des écoles (ESI, ENP, etc.)." },
  { date: "Janv. 2026", titre: "Semestre 2 — examens partiels", desc: "Préparer relevés et projets pour dossiers de transfert ou stages." },
  { date: "Mai–Juin 2026", titre: "Examens finaux & rattrapages", desc: "Validation des crédits LMD selon règlement intérieur." },
  { date: "Juin 2026", titre: "Bac 2026 (cohorte suivante)", desc: "Si tu es en terminale : suivi des annonces officielles Bac." },
  { date: "Été 2026", titre: "Stages & préparation Master / écoles", desc: "Candidatures Master, concours, ou mobilité Campus France." },
];

const RESSOURCES_EXTRA = [
  { label: "Chaîne YouTube — orientation générale (recherche)", url: "https://www.youtube.com/results?search_query=orientation+universitaire+alg%C3%A9rie" },
  { label: "OpenClassrooms — cours gratuits (FR)", url: "https://openclassrooms.com/fr/" },
  { label: "France Éducation international — ressources langues", url: "https://www.france-education-international.fr/" },
  { label: "Livre gratuit — méthodologie universitaire (PDF recherche)", url: "https://www.cnrtl.fr/" },
];

const TAG_COLORS = ["#1B3A6B", "#00C896", "#0D2545", "#2D7DD2", "#E85D04", "#6B4EE6"];

function competencesTags(labels) {
  return (labels || []).map((label, i) => ({ label, color: TAG_COLORS[i % TAG_COLORS.length] }));
}

const GLOSSARY = [
  { term: "LMD", def: "Licence (3 ans), Master (2 ans), Doctorat (3 ans). Le système standard en Algérie pour harmoniser les diplômes." },
  { term: "PROGRES", def: "Plateforme numérique du MESRS pour les inscriptions, choix de filières et bourses." },
  { term: "Crédit", def: "Unité de mesure de la charge de travail (30 par semestre, 180 pour la Licence)." },
  { term: "Compensation", def: "Calcul de la moyenne générale par semestre ou année. Si moyenne >= 10, le semestre est validé." },
  { term: "Dette", def: "Passage à l'année supérieure malgré l'échec dans certains modules (sous réserve de crédits suffisants)." },
  { term: "Transfert", def: "Possibilité de changer de filière ou d'université via une demande sur PROGRES." },
  { term: "Socle Commun", def: "Première année d'études regroupant plusieurs spécialités (ex: ST, MI, SNV)." },
  { term: "Rattrapage", def: "Session d'examen de seconde chance pour les modules non validés." },
  { term: "Unité d'Enseignement (UE)", def: "Groupe de matières (Fondamentale, Méthodologique, Transversale)." },
  { term: "Moyenne de Classement", def: "Calculée pour l'accès aux écoles d'élite ou le passage en Master." }
];

const SCHOOLS = [
  { name: "ESI Alger", type: "IT", loc: "DZ", wilaya: "Alger", site: "esi.dz", note: "L'élite de l'informatique en Algérie. Moyenne Bac très élevée." },
  { name: "ENP Alger (Polytech)", type: "Ingénierie", loc: "DZ", wilaya: "Alger", site: "enp.edu.dz", note: "Accès après CPGE + concours national." },
  { name: "USTHB Alger", type: "Multidisciplinaire", loc: "DZ", wilaya: "Alger", site: "usthb.dz", note: "Le plus grand campus d'Algérie (ST, MI, SNV, SM)." },
  { name: "EPAU Alger", type: "Architecture", loc: "DZ", wilaya: "Alger", site: "epau-alger.edu.dz", note: "École d'élite pour les futurs architectes." },
  { name: "ESI Sidi Bel Abbès", type: "IT", loc: "DZ", wilaya: "Sidi Bel Abbès", site: "esi-sba.dz", note: "Pôle d'excellence informatique à l'Ouest." },
  { name: "ENS Kouba", type: "Enseignement", loc: "DZ", wilaya: "Alger", site: "ens-kouba.dz", note: "Formation de professeurs de lycée en sciences." },
  { name: "ENS Constantine", type: "Enseignement", loc: "DZ", wilaya: "Constantine", site: "ens-constantine.dz", note: "Formation d'enseignants d'élite à l'Est." },
  { name: "HEC Alger", type: "Management", loc: "DZ", wilaya: "Tipaza", site: "hec.dz", note: "Hautes Études Commerciales (Kolea)." },
  { name: "ESC Alger", type: "Commerce", loc: "DZ", wilaya: "Tipaza", site: "esc.dz", note: "École Supérieure de Commerce (Kolea)." },
  { name: "ENSSMAL Alger", type: "Marine", loc: "DZ", wilaya: "Alger", site: "enssmal.dz", note: "Océanographie et sciences de la mer." },
  { name: "ENSSEA Kolea", type: "Statistiques", loc: "DZ", wilaya: "Tipaza", site: "enssea.dz", note: "Statistiques et économie appliquée." },
  { name: "ESIBA Alger", type: "Business", loc: "DZ", wilaya: "Alger", site: "esiba.dz", note: "École supérieure internationale des affaires." },
  { name: "Univ Oran 1 (Ahmed Ben Bella)", type: "Général", loc: "DZ", wilaya: "Oran", site: "univ-oran1.dz", note: "Pôle médical et scientifique majeur." },
  { name: "Univ Constantine 3", type: "Médecine", loc: "DZ", wilaya: "Constantine", site: "univ-constantine3.dz", note: "Pôle d'excellence en médecine et architecture." },
  { name: "Sorbonne Université", type: "International", loc: "FR", wilaya: "Paris", site: "sorbonne-universite.fr", note: "Accès via Campus France pour les meilleurs dossiers." },
  { name: "McGill University", type: "International", loc: "CA", wilaya: "Montréal", site: "mcgill.ca", note: "Le top du Canada pour les bacheliers algériens." }
];

const CHECKLIST = [
  { cat: "Administrative (Bac)", items: ["Relevé de notes original", "Certificat de réussite", "Photos d'identité (fond blanc)", "Fiche de vœux PROGRES"] },
  { cat: "Sociale (Bourse/Hébergement)", items: ["Fiche familiale", "Relevé des émoluments des parents", "Certificat de résidence", "Attestation de non-activité"] },
];

const STRESS_TIPS = [
  { title: "Sommeil de plomb", body: "Dormir au moins 7h. Le cerveau consolide la mémoire pendant la nuit. Pas d'écrans 30min avant." },
  { title: "Nutrition Cerveau", body: "Privilégiez les noix, le poisson et l'eau. Évitez les boissons trop sucrées ou trop de café." },
  { title: "Respiration 4-7-8", body: "Inspirez 4s, bloquez 7s, expirez 8s. À faire avant d'entrer en salle d'examen." },
];

const BAC_COEFFS = {
  "Sciences": { "Sciences": 6, "Maths": 5, "Physique": 5, "Arabe": 3, "Français": 2, "Anglais": 2, "Philo": 2, "Hist-Geo": 2, "Islamique": 2, "Sport": 1 },
  "Maths": { "Maths": 7, "Physique": 6, "Sciences": 2, "Arabe": 3, "Français": 2, "Anglais": 2, "Philo": 2, "Hist-Geo": 2, "Islamique": 2, "Sport": 1 },
  "Technique": { "Technologie": 6, "Maths": 6, "Physique": 5, "Arabe": 3, "Français": 2, "Anglais": 2, "Philo": 2, "Hist-Geo": 2, "Islamique": 2, "Sport": 1 },
  "Lettres": { "Arabe": 6, "Philo": 6, "Hist-Geo": 4, "Français": 3, "Anglais": 3, "Islamique": 2, "Maths": 2, "Sport": 1 }
};

const ORIENTATION_DATES = [
  { date: "7 - 11 Juin", task: "Épreuves du Baccalauréat 2026", cat: "Exam" },
  { date: "Fin Juin", task: "Annonce des résultats du Bac", cat: "Result" },
  { date: "Début Juillet", task: "Pré-inscriptions (Fiche de vœux)", cat: "Admin" },
  { date: "Mi-Juillet", task: "Résultats des affectations", cat: "Admin" },
  { date: "Fin Juillet", task: "Inscriptions définitives & Dossier Bourse", cat: "Final" }
];

const TESTIMONIALS = [
  { name: "Amine", school: "ESI Alger", text: "L'informatique c'est passionnant, mais préparez-vous à beaucoup de maths les deux premières années !" },
  { name: "Sarra", school: "Fac Médecine", text: "Le rythme est intense, mais sauver des vies en vaut la peine. Soyez rigoureux dès le début." },
  { name: "Karim", school: "Polytech Alger", text: "Le passage par les CPGE est difficile mais c'est la meilleure formation pour devenir ingénieur." }
];

const SUBJECT_LINKS = [
  { branch: "Sciences", year: "2024", link: "https://www.eddirasa.com/sujets-bac-2024/", title: "Sujets Bac Sciences 2024" },
  { branch: "Maths", year: "2024", link: "https://www.eddirasa.com/sujets-bac-2024/", title: "Sujets Bac Maths 2024" },
  { branch: "Technique", year: "2024", link: "https://www.eddirasa.com/sujets-bac-2024/", title: "Sujets Bac Technique 2024" },
  { branch: "Gestion", year: "2024", link: "https://www.eddirasa.com/sujets-bac-2024/", title: "Sujets Bac Gestion 2024" },
  { branch: "Lettres", year: "2024", link: "https://www.eddirasa.com/sujets-bac-2024/", title: "Sujets Bac Lettres 2024" },
  { branch: "Langues", year: "2024", link: "https://www.eddirasa.com/sujets-bac-2024/", title: "Sujets Bac Langues 2024" },
  { branch: "Toutes", year: "2023", link: "https://www.eddirasa.com/sujets-bac-2023/", title: "Annales Bac 2023 (Toutes séries)" },
  { branch: "Toutes", year: "2022", link: "https://www.eddirasa.com/sujets-bac-2022/", title: "Annales Bac 2022 (Toutes séries)" },
  { branch: "Toutes", year: "2021", link: "https://www.eddirasa.com/sujets-bac-2021/", title: "Annales Bac 2021 (Toutes séries)" },
  { branch: "Sujets", year: "BEM", link: "https://www.eddirasa.com/sujets-bem/", title: "Annales BEM (Toutes années)" }
];

const JOB_MARKET = [
  { sector: "Informatique & Digital", demand: 95, trend: "En forte hausse", careers: "Développeur, Data Scientist, Expert Cyber" },
  { sector: "Santé & Médical", demand: 90, trend: "Constant", careers: "Médecin, Infirmier, Technicien de labo" },
  { sector: "Énergies & Pétrole", demand: 85, trend: "Stable", careers: "Ingénieur forage, Géologue, HSE" },
  { sector: "Agriculture & Agroalimentaire", demand: 75, trend: "En croissance", careers: "Ingénieur agronome, Responsable qualité" },
  { sector: "Enseignement", demand: 70, trend: "Légère baisse", careers: "Professeur, Formateur spécialisé" },
  { sector: "BTP & Architecture", demand: 65, trend: "Stable", careers: "Conducteur de travaux, Architecte d'état" }
];

const RIASEC_QUESTIONS = [
  { q: "Aimes-tu travailler avec des outils ou des machines ?", type: "R" },
  { q: "Aimes-tu résoudre des problèmes mathématiques ou scientifiques ?", type: "I" },
  { q: "Aimes-tu dessiner, écrire ou créer des choses ?", type: "A" },
  { q: "Aimes-tu aider les autres ou enseigner ?", type: "S" },
  { q: "Aimes-tu diriger une équipe ou convaincre des gens ?", type: "E" },
  { q: "Aimes-tu organiser des fichiers ou suivre des règles ?", type: "C" },
];

function initCountdown() {
  // Date du Bac 2026 en Algérie (Officiel: 7 juin 2026)
  const target = new Date("2026-06-07T08:00:00").getTime();
  
  const update = () => {
    const now = new Date().getTime();
    const diff = target - now;
    
    if (diff <= 0) {
      if (el("cdDays")) el("cdDays").textContent = "00";
      if (el("cdHours")) el("cdHours").textContent = "00";
      if (el("cdMins")) el("cdMins").textContent = "00";
      return;
    }
    
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (el("cdDays")) el("cdDays").textContent = d.toString().padStart(2, '0');
    if (el("cdHours")) el("cdHours").textContent = h.toString().padStart(2, '0');
    if (el("cdMins")) el("cdMins").textContent = m.toString().padStart(2, '0');
  };
  
  update();
  setInterval(update, 1000); // Mise à jour chaque seconde pour un vrai chrono
}

const FAQ = [
  {
    q: "Comment fonctionne le système LMD en Algérie ?",
    a: "Le système Licence–Master–Doctorat (LMD) organise généralement la Licence sur 6 semestres (3 ans), le Master sur 4 semestres (2 ans) et le Doctorat au-delà. Les crédits s’accumulent par matière validée. Chaque université publie son règlement des études : consulte le site de ton établissement et le bureau pédagogique pour les équivalences et les parcours types.",
  },
  {
    q: "À quoi sert PROGRES et comment éviter les erreurs d’inscription ?",
    a: "PROGRES est le portail utilisé pour de nombreuses démarches d’inscription en enseignement supérieur en Algérie. Crée ton compte sur une connexion stable, vérifie ton identité et tes choix de filière avant validation, et garde des captures d’écran ou PDF de confirmation. En cas de blocage, contacte le service informatique ou le secrétariat de ton établissement cible plutôt que de multiplier les comptes.",
  },
  {
    q: "Existe-t-il des bourses ou aides pour étudier en Algérie ou à l’étranger ?",
    a: "En Algérie : renseigne-toi auprès de ton université (œuvres universitaires, dispositifs sociaux) et d’institutions comme l’ONOU pour le logement. Pour la France : renseigne-toi sur les bourses d’excellence (ex. BGF selon critères et années), Erasmus+ pour la mobilité, et les aides des établissements. Les critères changent : vérifie toujours Campus France et les sites officiels à jour.",
  },
  {
    q: "Puis-je changer de filière ou d’université après la première année ?",
    a: "Oui, souvent via transfert, réorientation ou passerelles, selon les places disponibles et tes résultats. Les filières proches (ex. informatique et réseaux) facilitent la transition. Prépare un dossier solide : relevés de notes, projet personnel, lettre de motivation et, si possible, recommandation. Anticipe les dates limites fixées par chaque établissement.",
  },
  {
    q: "Quelle est la différence entre Licence professionnelle et Licence fondamentale ?",
    a: "La Licence fondamentale insiste sur les bases disciplinaires et prépare souvent au Master recherche ou enseignement. La Licence professionnelle intègre davantage de stages, de mise en situation et vise l’insertion rapide. Le bon choix dépend de ton projet : longues études et expertise versus entrée plus tôt sur le marché du travail.",
  },
  {
    q: "Comment se préparer aux écoles d’ingénieurs ou aux concours ?",
    a: "Renforce mathématiques, physique et langues, entraîne-toi sur les annales si disponibles, et développe un dossier avec projets (clubs, olympiades, mini-projets). Participe aux journées portes ouvertes et contacte des étudiants actuels pour comprendre les attentes réelles plutôt que la rumeur.",
  },
  {
    q: "Les salaires affichés dans l’outil sont-ils garantis ?",
    a: "Non. Les fourchettes sont indicatives pour comparer des ordres de grandeur entre filières et entre l’Algérie et la France. Le salaire réel dépend du secteur, de la ville, de l’expérience, des langues et du réseau. Utilise ces chiffres pour t’orienter, puis valide avec des offres d’emploi récentes et des entretiens avec des professionnels.",
  },
];

// Filières : données indicatives 2025 (Algérie / France) — à croiser avec sources officielles.
const filieres = [
  {
    id: "info_ia",
    nom: "Informatique & Intelligence Artificielle",
    secteur: "Tech",
    description:
      "La filière informatique et IA forme aux systèmes d’information, au développement logiciel, aux données et aux modèles d’apprentissage automatique.\n" +
      "Tu apprends à analyser un besoin, concevoir une architecture, coder, tester et déployer des services numériques fiables.\n" +
      "Les projets concrets (applications web, APIs, scripts d’analyse) te préparent aux environnements professionnels agiles.\n" +
      "L’IA s’ajoute comme spécialisation : traitement de données, modèles prédictifs, bonnes pratiques d’éthique et de robustesse.\n" +
      "Le secteur recrute massivement : entreprises, startups, administrations et prestataires externalisent ou internalisent des équipes tech.\n" +
      "C’est une voie exigeante mais accessible avec de la régularité, de la curiosité et une pratique quotidienne du code.",
    metiers: [
      "Développeur web front-end",
      "Développeur web back-end",
      "Développeur mobile",
      "Ingénieur logiciel",
      "Data analyst",
      "Data engineer",
      "Ingénieur IA / ML",
      "Ingénieur DevOps",
      "Architecte logiciel",
      "Consultant technique",
      "Scrum master (profil tech)",
      "Chef de projet digital (profil technique)",
    ],
    salaire_algerie_debutant: "85 000 – 165 000 DZD / mois",
    salaire_algerie_senior: "220 000 – 480 000 DZD / mois",
    salaire_france_debutant: "36 000 – 46 000 € bruts / an",
    salaire_france_senior: "55 000 – 88 000 € bruts / an",
    duree_etudes: "3 ans (Licence) à 5 ans (Master ou école)",
    type_formation: "Licence LMD, Master, diplôme d’ingénieur, formations certifiantes",
    etablissements_algerie: [
      "USTHB — Faculté d’informatique",
      "ESI Alger — École supérieure d’informatique",
      "Université d’Alger 1 — informatique",
      "ENP Constantine — informatique (selon filière)",
      "Université de Constantine — informatique",
      "Université d’Oran 1 — informatique",
    ],
    competences_cles: ["Algorithmique", "Programmation (Python, JS…)", "Bases de données & SQL", "Cloud & DevOps (bases)", "IA & données", "Travail en équipe agile"],
    perspectives:
      "Demande forte 2025–2030 (digitalisation, IA, data). Les profils capables de livrer des produits fiables et sécurisés seront très recherchés.",
    difficultes:
      "Nécessite de pratiquer régulièrement (projets, exercices). Il faut accepter de chercher, tester, et apprendre en continu.",
    score_keywords: ["code", "dev", "programmation", "ia", "data", "web", "mobile", "algorithme", "python", "javascript"],
    couleur_badge: "#1B3A6B",
  },
  {
    id: "cyber",
    nom: "Cybersécurité",
    secteur: "Tech",
    description:
      "La cybersécurité vise à protéger les données, les réseaux et les applications contre les attaques, les erreurs humaines et les défaillances techniques.\n" +
      "Tu étudies les protocoles, la sécurisation des systèmes, l’analyse de malwares, la réponse à incident et la gouvernance des risques.\n" +
      "Les entreprises algériennes et internationales renforcent leurs équipes SOC, audit et conformité pour respecter les exigences clients et réglementaires.\n" +
      "Le métier demande rigueur, éthique (tests uniquement autorisés) et veille permanente face à l’évolution des menaces.\n" +
      "Les certifications (sans les substituer au diplôme) complètent souvent le parcours pour les postes techniques.\n" +
      "C’est une suite naturelle pour les profils réseaux, systèmes ou développement souhaitant se spécialiser.",
    metiers: [
      "Analyste SOC (Security Operations Center)",
      "Ingénieur sécurité réseau",
      "Ingénieur sécurité applicative",
      "Pentester éthique",
      "Auditeur sécurité (junior)",
      "RSSI adjoint",
      "Analyste forensic",
      "Consultant GRC",
      "Ingénieur IAM (identité & accès)",
      "Architecte sécurité (junior)",
      "Formateur cybersécurité",
      "Ingénieur cloud security (junior)",
    ],
    salaire_algerie_debutant: "95 000 – 185 000 DZD / mois",
    salaire_algerie_senior: "260 000 – 580 000 DZD / mois",
    salaire_france_debutant: "38 000 – 50 000 € bruts / an",
    salaire_france_senior: "58 000 – 95 000 € bruts / an",
    duree_etudes: "3 à 5 ans + spécialisation Master recommandée",
    type_formation: "Licence / Master réseaux & sécurité, école d’ingénieurs, certifications professionnelles",
    etablissements_algerie: [
      "USTHB — réseaux & télécoms / sécurité (selon parcours)",
      "ESI Alger — systèmes d’information",
      "Université de Béjaïa — informatique / réseaux",
      "ENP Constantine",
      "Université Constantine 2 — informatique",
      "Formations continues & bootcamps (en complément)",
    ],
    competences_cles: ["TCP/IP & firewall", "Linux & durcissement", "OWASP & sécurité applicative", "Analyse de logs SIEM", "Gestion des vulnérabilités", "Rédaction de rapports"],
    perspectives:
      "Croissance structurelle 2025–2030 (cloud, e-commerce, administrations). Les entreprises investissent davantage dans la sécurité et la conformité.",
    difficultes:
      "Courbe d’apprentissage exigeante. Importance de l’éthique, du cadre légal, et d’une veille continue.",
    score_keywords: ["cyber", "sécurité", "réseau", "linux", "pentest", "hacking", "soc", "forensic"],
    couleur_badge: "#00C896",
  },
  {
    id: "gc",
    nom: "Génie Civil",
    secteur: "Ingénierie",
    description:
      "Le génie civil couvre la conception, le calcul et la réalisation d’ouvrages : bâtiments, routes, ponts, ouvrages hydrauliques et aménagements urbains.\n" +
      "Tu maîtrises la mécanique des sols, le béton armé, les normes de sécurité et la planification de chantier.\n" +
      "Le métier mélange bureau d’études et terrain : coordination des corps de métier, respect des délais et des budgets publics ou privés.\n" +
      "Les enjeux 2025–2030 incluent la rénovation énergétique, la résilience aux intempéries et la modélisation BIM.\n" +
      "L’insertion dépend beaucoup des grands travaux publics, du logement et des partenariats avec bureaux d’études.\n" +
      "Profil idéal : rigueur, sens des responsabilités et intérêt pour le dessin technique et la physique appliquée.",
    metiers: [
      "Ingénieur études de prix",
      "Ingénieur travaux / conducteur de travaux",
      "Ingénieur structure (calcul)",
      "Ingénieur géotechnique (junior)",
      "Chef de chantier",
      "Métreur-vérificateur",
      "Technicien topographie",
      "Coordinateur sécurité chantier",
      "BIM manager / BIM coordinator",
      "Contrôleur technique (junior)",
      "Ingénieur travaux publics",
      "Project manager infrastructure",
    ],
    salaire_algerie_debutant: "75 000 – 145 000 DZD / mois",
    salaire_algerie_senior: "190 000 – 420 000 DZD / mois",
    salaire_france_debutant: "33 000 – 44 000 € bruts / an",
    salaire_france_senior: "48 000 – 82 000 € bruts / an",
    duree_etudes: "5 ans (ingénieur) ou Licence + Master (6 ans)",
    type_formation: "École d’ingénieurs (ENSTP, ENP…), Licence / Master génie civil",
    etablissements_algerie: [
      "ENSTP — École nationale des travaux publics",
      "ENP Constantine — génie civil",
      "USTHB — génie civil",
      "Université de Batna — génie civil",
      "Université d’Annaba — génie civil",
      "EPAU — urbanisme & aménagement (complément projet urbain)",
    ],
    competences_cles: ["RDM & béton armé", "Lecture de plans & DAO", "Planning & MS Project", "Normes & sécurité chantier", "Géotechnique (bases)", "BIM Revit / Civil 3D (recommandé)"],
    perspectives:
      "Marché stable 2025–2030 (infrastructures, logement). Les profils BIM et gestion de projet gagnent en valeur.",
    difficultes:
      "Responsabilités élevées sur la sécurité et les délais. Travail parfois exigeant (terrain, déplacements).",
    score_keywords: ["bâtiment", "chantier", "construction", "pont", "route", "structure", "béton", "bim"],
    couleur_badge: "#1B3A6B",
  },
  {
    id: "elec",
    nom: "Électronique & Systèmes embarqués",
    secteur: "Ingénierie",
    description:
      "Cette filière forme à la conception de cartes électroniques, de capteurs, d’actionneurs et de logiciels embarqués sur microcontrôleurs.\n" +
      "Tu travailles sur la chaîne complète : schéma, PCB, programmation bas niveau, tests et intégration dans un produit (IoT, automobile, industrie).\n" +
      "L’essor des objets connectés et de l’industrie 4.0 maintient une forte demande pour les profils électronique + logiciel.\n" +
      "Les compétences en C/C++, protocoles (UART, SPI, I2C) et outils de debug sont centrales.\n" +
      "Tu peux évoluer vers la R&D, l’automaticien ou l’ingénieur hardware dans des PME ou grands groupes.\n" +
      "La patience et la méthode en laboratoire sont aussi importantes que la théorie.",
    metiers: [
      "Ingénieur électronique analogique/numérique",
      "Ingénieur systèmes embarqués",
      "Ingénieur firmware",
      "Ingénieur IoT",
      "Automaticien industriel",
      "Ingénieur tests hardware",
      "Ingénieur qualité électronique",
      "Technicien CEM / compatibilité électromagnétique",
      "Ingénieur maintenance industrielle",
      "Ingénieur télécommunications (hardware)",
      "Chef de projet technique (hardware)",
      "Chercheur-développeur (laboratoire)",
    ],
    salaire_algerie_debutant: "82 000 – 158 000 DZD / mois",
    salaire_algerie_senior: "205 000 – 440 000 DZD / mois",
    salaire_france_debutant: "35 000 – 46 000 € bruts / an",
    salaire_france_senior: "52 000 – 86 000 € bruts / an",
    duree_etudes: "5 ans (ingénieur) ou Licence + Master électronique",
    type_formation: "École d’ingénieurs, Master automatique & électronique",
    etablissements_algerie: [
      "USTHB — électrotechnique / électronique",
      "ENP Constantine — électronique",
      "Université de Tizi-Ouzou — électronique",
      "Université de Sétif — électrotechnique",
      "Université d’Oran — électronique",
      "Centre de recherche & laboratoires universitaires (stages R&D)",
    ],
    competences_cles: ["Électronique de base", "C / C++ embarqué", "Microcontrôleurs (ARM, AVR…)", "Capteurs & instrumentation", "Oscilloscope & debug", "Conception PCB (bases)"],
    perspectives:
      "Bonne dynamique 2025–2030 (IoT, industrie 4.0, énergie). Les profils hybrides (électronique + logiciel) sont très recherchés.",
    difficultes:
      "Nécessite rigueur et pratique en laboratoire. Débogage parfois long et méthodique.",
    score_keywords: ["électronique", "embarqué", "iot", "capteur", "circuit", "arduino", "stm32", "robot"],
    couleur_badge: "#00C896",
  },
  {
    id: "mgmt",
    nom: "Management & Gestion de projet",
    secteur: "Business",
    description:
      "Le management et la gestion de projet préparent à piloter des équipes, des budgets et des livrables dans des délais contraints.\n" +
      "Tu apprends le cadrage, la planification, l’allocation des ressources, la gestion des risques et la communication aux parties prenantes.\n" +
      "Ces compétences sont transversales : tu peux travailler dans l’industrie, le numérique, la santé ou les services publics.\n" +
      "Les méthodes agiles (Scrum, Kanban) et classiques (cycle en V) coexistent selon les organisations.\n" +
      "Un atout majeur est de combiner management et compréhension technique (produit, données, qualité).\n" +
      "L’employabilité 2025–2030 reste forte pour les profils capables d’arbitrer et de fédérer.",
    metiers: [
      "Chef de projet",
      "PMO (Project Management Officer)",
      "Business analyst",
      "Consultant en organisation",
      "Chargé de planification & reporting",
      "Responsable qualité (junior)",
      "Product owner",
      "Responsable des opérations",
      "Chargé de mission (administration / entreprise)",
      "Ingénieur d’affaires (junior)",
      "Responsable supply chain (junior)",
      "Directeur de projet (après expérience)",
    ],
    salaire_algerie_debutant: "72 000 – 142 000 DZD / mois",
    salaire_algerie_senior: "185 000 – 460 000 DZD / mois",
    salaire_france_debutant: "32 000 – 42 000 € bruts / an",
    salaire_france_senior: "48 000 – 88 000 € bruts / an",
    duree_etudes: "3 ans (Licence) à 5 ans (Master management)",
    type_formation: "Licence économie-gestion, Master management, MBA (expérience), écoles de commerce",
    etablissements_algerie: [
      "Université d’Alger 3 — sciences économiques & management",
      "HEC Alger (classes préparatoires & grandes écoles partenaires)",
      "Université de Constantine — sciences de gestion",
      "Université de Annaba — économie & gestion",
      "Écoles privées reconnues — management & marketing",
      "Instituts de formation executive (certifications projet)",
    ],
    competences_cles: ["Planification & Gantt", "Gestion des risques", "Communication & négociation", "Analyse financière (bases)", "Méthodes Agile", "Leadership d’équipe"],
    perspectives:
      "Demande solide 2025–2030 (transformation digitale, gestion de programmes). Les profils qui comprennent aussi la technique ont un avantage.",
    difficultes:
      "Beaucoup d’interactions humaines (négociation, arbitrages). Exige clarté, diplomatie et discipline.",
    score_keywords: ["projet", "management", "organiser", "leadership", "business", "planning", "gestion"],
    couleur_badge: "#1B3A6B",
  },
  {
    id: "law",
    nom: "Droit",
    secteur: "Droit",
    description:
      "Les études de droit forment à l’interprétation des textes, à la construction d’arguments juridiques et à la rédaction de conclusions et contrats.\n" +
      "Tu peux te spécialiser en droit des affaires, droit public, droit social ou droit du numérique selon les Masters disponibles.\n" +
      "Le métier exige une grande précision, une culture générale solide et une capacité de synthèse sous pression.\n" +
      "Les débouchés incluent les cabinets, les entreprises, les administrations et les organisations internationales.\n" +
      "En Algérie comme ailleurs, la concurrence est forte : stages, langues et spécialisation font la différence.\n" +
      "C’est une voie longue mais gratifiante pour ceux qui aiment le raisonnement et la justice procédurale.",
    metiers: [
      "Juriste d’entreprise",
      "Assistant juridique",
      "Chargé de conformité (compliance)",
      "Conseiller juridique (secteur public ou privé)",
      "Rédacteur juridique / documentaliste juridique",
      "Magistrat (concours & formation magistrature)",
      "Avocat (Barreau, long parcours)",
      "Notaire (concours & stage notarial)",
      "Juriste RGPD / protection des données (spécialisation)",
      "Juriste fiscaliste (spécialisation)",
      "Médiateur / conciliateur (formation complémentaire)",
      "Enseignant-chercheur en droit (Doctorat)",
    ],
    salaire_algerie_debutant: "58 000 – 125 000 DZD / mois",
    salaire_algerie_senior: "155 000 – 420 000 DZD / mois",
    salaire_france_debutant: "28 000 – 38 000 € bruts / an",
    salaire_france_senior: "45 000 – 92 000 € bruts / an",
    duree_etudes: "4 ans (Licence) + 2 ans (Master) + spécialisations / concours",
    type_formation: "Licence droit LMD, Master, CRFPA (France), CAPA (avocat), écoles de magistrature",
    etablissements_algerie: [
      "Université d’Alger 1 — Faculté de droit",
      "Université de Constantine — droit",
      "Université d’Oran — droit",
      "Université de Annaba — droit",
      "Université de Tlemcen — droit",
      "Centre de recherche juridique & instituts de formation continue",
    ],
    competences_cles: ["Analyse de jurisprudence", "Rédaction juridique", "Argumentation orale & écrite", "Veille législative", "Recherche documentaire", "Éthique & déontologie"],
    perspectives:
      "Perspectives stables 2025–2030, avec croissance sur la conformité et le droit du numérique.",
    difficultes:
      "Volume de lecture important. Évaluation souvent basée sur la précision et la structure de la rédaction.",
    score_keywords: ["droit", "loi", "juridique", "contrat", "conformité", "justice"],
    couleur_badge: "#1B3A6B",
  },
  {
    id: "med",
    nom: "Médecine",
    secteur: "Santé",
    description:
      "La médecine forme aux sciences fondamentales, à la pathologie, à la clinique et à la relation de soin avec le patient.\n" +
      "Le parcours est long, sélectif et exige une discipline quotidienne (anatomie, biochimie, stages hospitaliers).\n" +
      "Après le diplôme, la spécialisation (résidanat en Algérie, internat en France) structure la carrière et les responsabilités.\n" +
      "Les besoins en santé restent importants jusqu’en 2030, avec des tensions selon les territoires et les spécialités.\n" +
      "L’éthique, le travail en équipe pluridisciplinaire et la gestion du stress sont au cœur du métier.\n" +
      "Si tu hésites, explore aussi les filières paramédicales ou de santé publique comme alternative valorisante.",
    metiers: [
      "Médecin généraliste",
      "Médecin urgentiste",
      "Pédiatre",
      "Gynécologue-obstétricien",
      "Cardiologue",
      "Neurologue",
      "Psychiatre",
      "Chirurgien (spécialités multiples)",
      "Anesthésiste-réanimateur",
      "Radiologue",
      "Médecin du travail",
      "Médecin légiste (parcours spécifique)",
    ],
    salaire_algerie_debutant: "90 000 – 160 000 DZD / mois (public, indicatif jeune praticien)",
    salaire_algerie_senior: "180 000 – 420 000 DZD / mois (selon spécialité & secteur)",
    salaire_france_debutant: "55 000 – 65 000 € bruts / an (interne, ordre de grandeur)",
    salaire_france_senior: "80 000 – 180 000 € bruts / an (praticien confirmé, très variable)",
    duree_etudes: "7 ans minimum + résidanat / spécialisation",
    type_formation: "Faculté de médecine, DES / DESC (France), résidanat (Algérie)",
    etablissements_algerie: [
      "Faculté de médecine d’Alger",
      "Faculté de médecine d’Oran",
      "Faculté de médecine de Constantine",
      "Faculté de médecine d’Annaba",
      "CHU — centres hospitalo-universitaires (stages)",
      "École paramédicale & instituts de formation santé (parcours voisins)",
    ],
    competences_cles: ["Sciences biomédicales", "Diagnostic & protocoles", "Relation patient", "Travail en équipe soignante", "Déontologie", "Gestion d’urgence"],
    perspectives:
      "Besoin constant 2025–2030. Les spécialisations et la mobilité influencent fortement les opportunités.",
    difficultes:
      "Très sélectif, charge de travail intense et longue durée d’études.",
    score_keywords: ["médecine", "santé", "hôpital", "patient", "biologie", "soigner"],
    couleur_badge: "#00C896",
  },
  {
    id: "commerce",
    nom: "Commerce & Marketing",
    secteur: "Business",
    description:
      "Le commerce et le marketing forment à comprendre les clients, positionner une offre et générer de la valeur sur des marchés concurrentiels.\n" +
      "Tu étudies la stratégie commerciale, la communication, la négociation, le marketing digital et l’analyse de données clients.\n" +
      "Les entreprises cherchent des profils capables de mesurer le ROI des campagnes et d’orchestrer canaux en ligne et hors ligne.\n" +
      "L’expérience terrain (stages, vente, association) accélère l’employabilité autant que le diplôme.\n" +
      "Entre 2025 et 2030, l’e-commerce B2B/B2C et le contenu de marque continueront de structurer les recrutements.\n" +
      "C’est une filière ouverte aux profils extravertis comme introvertis analytiques, à condition d’aimer les résultats chiffrés.",
    metiers: [
      "Commercial terrain / B2B",
      "Chargé des ventes indoor / télévente",
      "Chargé de marketing digital",
      "Chef de produit junior",
      "Category manager (junior)",
      "Responsable e-commerce",
      "Traffic manager / acquisition",
      "Community manager",
      "Business developer",
      "Chargé de relation client / CRM",
      "Analyste données marketing",
      "Directeur commercial (après expérience)",
    ],
    salaire_algerie_debutant: "55 000 – 130 000 DZD / mois",
    salaire_algerie_senior: "150 000 – 460 000 DZD / mois",
    salaire_france_debutant: "28 000 – 38 000 € bruts / an",
    salaire_france_senior: "42 000 – 78 000 € bruts / an",
    duree_etudes: "3 ans (Licence commerce) à 5 ans (Master marketing)",
    type_formation: "Licence économie-gestion, Master marketing, écoles de commerce",
    etablissements_algerie: [
      "Université d’Alger 3 — commerce & marketing",
      "Université de Béjaïa — sciences commerciales",
      "Université de Blida — économie & gestion",
      "École supérieure de commerce (établissements reconnus)",
      "Instituts de formation professionnelle — commerce",
      "Programmes doubles compétences avec le numérique (selon établissement)",
    ],
    competences_cles: ["Négociation & closing", "Marketing digital (SEO, SEA, social)", "Analyse & tableaux de bord", "CRM & fidélisation", "Storytelling de marque", "Gestion de projet commercial"],
    perspectives:
      "Bonne dynamique 2025–2030 (digital, e-commerce). Les profils data-driven (mesure, analytics) se démarquent.",
    difficultes:
      "Pression d’objectifs possible. Exige résilience et sens du relationnel.",
    score_keywords: ["commerce", "marketing", "vente", "business", "communication", "client", "e-commerce"],
    couleur_badge: "#1B3A6B",
  },
  {
    id: "design",
    nom: "Design (UX/UI) & Création numérique",
    secteur: "Créatif",
    description:
      "Le design UX/UI place l’utilisateur au centre : recherche, prototypage, tests et itérations pour des produits numériques utiles et agréables.\n" +
      "Tu maîtrises les grilles, la typographie, l’accessibilité et la cohérence visuelle (design system).\n" +
      "La collaboration avec les développeurs est quotidienne : Figma, documentation et handoff font partie du métier.\n" +
      "Les entreprises recrutent pour des applications mobiles, SaaS, e-commerce et services publics digitaux.\n" +
      "Un portfolio de projets réels compte souvent plus qu’un long discours pour décrocher un premier contrat.\n" +
      "La veille esthétique et la capacité à mesurer l’impact (conversion, satisfaction) te différencient à l’horizon 2030.",
    metiers: [
      "UX designer",
      "UI designer",
      "Product designer",
      "UX researcher",
      "Designer graphique digital",
      "Motion designer",
      "Webdesigner",
      "No-code designer (Webflow…)",
      "Design ops (junior)",
      "Brand designer",
      "Illustrateur numérique",
      "Directeur artistique (après expérience)",
    ],
    salaire_algerie_debutant: "58 000 – 135 000 DZD / mois",
    salaire_algerie_senior: "145 000 – 390 000 DZD / mois",
    salaire_france_debutant: "30 000 – 40 000 € bruts / an",
    salaire_france_senior: "45 000 – 75 000 € bruts / an",
    duree_etudes: "2 ans (BTS arts) à 5 ans (Master design numérique)",
    type_formation: "Écoles d’art & design, Licence arts, Master UX, autodidaxie + certification",
    etablissements_algerie: [
      "École supérieure des beaux-arts d’Alger",
      "Instituts des beaux-arts (Constantine, Oran…)",
      "Universités — arts & design numérique (selon filières)",
      "Formations privées certifiantes UX/UI",
      "Fab labs & incubateurs (projets portfolio)",
      "Partenariats CESI / écoles design (mobilité)",
    ],
    competences_cles: ["Recherche utilisateur", "Prototypage Figma", "Design system", "Accessibilité (bases)", "Tests utilisateurs", "Communication visuelle"],
    perspectives:
      "Très recherché 2025–2030 (produits digitaux). Les designers capables de collaborer avec les devs et de mesurer l’impact gagnent en valeur.",
    difficultes:
      "Nécessite un portfolio solide et une démarche itérative (accepter les retours).",
    score_keywords: ["design", "ux", "ui", "maquette", "figma", "créatif", "graphisme"],
    couleur_badge: "#00C896",
  },
  {
    id: "sh",
    nom: "Sciences humaines (Psycho, socio, éducation…)",
    secteur: "Social",
    description:
      "Les sciences humaines et sociales étudient les individus, les groupes et les institutions pour mieux comprendre les comportements et les enjeux collectifs.\n" +
      "Tu peux te diriger vers la psychologie, la sociologie, l’éducation, les ressources humaines ou la médiation.\n" +
      "Ces parcours préparent à l’écoute, à l’analyse qualitative et quantitative, et à la communication bienveillante.\n" +
      "Les besoins en accompagnement scolaire, santé mentale et cohésion sociale restent présents jusqu’en 2030.\n" +
      "Souvent, un Master spécialisé et des stages longs sont nécessaires pour l’emploi réglementé (psychologue, éducateur).\n" +
      "Si tu aimes écrire, enquêter et agir sur le terrain, cette voie offre de nombreuses passerelles.",
    metiers: [
      "Psychologue (Master + autorisation d’exercer)",
      "Conseiller d’orientation scolaire",
      "Chargé des ressources humaines",
      "Chargé de formation professionnelle",
      "Éducateur spécialisé (diplôme requis)",
      "Assistant social (concours / diplôme)",
      "Médiateur social / culturel",
      "Sociologue (études & expertise)",
      "Chargé de projet associatif",
      "Journaliste / chargé de communication (double compétence)",
      "Chercheur en sciences sociales (Doctorat)",
      "Consultant bien-être au travail (spécialisation)",
    ],
    salaire_algerie_debutant: "48 000 – 115 000 DZD / mois",
    salaire_algerie_senior: "115 000 – 310 000 DZD / mois",
    salaire_france_debutant: "24 000 – 34 000 € bruts / an",
    salaire_france_senior: "32 000 – 58 000 € bruts / an",
    duree_etudes: "3 ans (Licence) à 5 ans (Master) + diplômes réglementés",
    type_formation: "Licence psychologie / socio / éducation, Master, DESS métiers du social",
    etablissements_algerie: [
      "Université d’Alger 2 — psychologie & sciences humaines",
      "Université de Constantine — lettres & langues / sciences humaines",
      "Université de Oran — psychologie",
      "Institut national supérieur de travail social (selon filières)",
      "ENS — formations enseignement (concours)",
      "Centres de recherche en sciences sociales",
    ],
    competences_cles: ["Écoute active", "Méthodologie d’enquête", "Analyse critique", "Rédaction scientifique", "Éthique & confidentialité", "Animation de groupe"],
    perspectives:
      "Opportunités 2025–2030 liées à l’éducation, aux RH, à la santé mentale et au social. Les spécialisations et stages comptent beaucoup.",
    difficultes:
      "Nécessite persévérance, qualité rédactionnelle et expérience terrain (stages).",
    score_keywords: ["social", "humain", "psychologie", "éducation", "rh", "sociologie", "aider"],
    couleur_badge: "#1B3A6B",
  },
  {
    id: "agro",
    nom: "Agronomie & Environnement",
    secteur: "Sciences",
    description:
      "L’agronomie relie biologie des sols, cultures, élevage et gestion durable des ressources (eau, forêts, biodiversité).\n" +
      "Tu apprends à concevoir des systèmes de production plus résilients face au changement climatique.\n" +
      "Les filières agro-industrielles, l’export et la transformation alimentaire offrent des débouchés variés.\n" +
      "Le terrain (exploitations, stations expérimentales) complète les cours magistraux.\n" +
      "Les politiques publiques 2025–2030 mettent l’accent sur l’irrigation intelligente et la réduction du gaspillage.\n" +
      "C’est une voie pour les profils scientifiques soucieux d’impact environnemental et alimentaire.",
    metiers: [
      "Ingénieur agronome",
      "Ingénieur agroalimentaire",
      "Technico-commercial intrants agricoles",
      "Responsable exploitation agricole",
      "Chef de projet irrigation",
      "Contrôleur qualité & hygiène (HACCP)",
      "Chargé développement durable / RSE",
      "Conseiller en agriculture de précision",
      "Ingénieur environnement & eau",
      "Chercheur en biotechnologies végétales",
      "Responsable logistique produits frais",
      "Consultant coopératives agricoles",
    ],
    salaire_algerie_debutant: "62 000 – 128 000 DZD / mois",
    salaire_algerie_senior: "145 000 – 335 000 DZD / mois",
    salaire_france_debutant: "29 000 – 38 000 € bruts / an",
    salaire_france_senior: "40 000 – 68 000 € bruts / an",
    duree_etudes: "5 ans (ingénieur agronome) ou Licence + Master",
    type_formation: "Institut national agronomique, Master agrosciences",
    etablissements_algerie: [
      "INATAA — Institut national agronomique (Alger)",
      "Université de Blida — agronomie",
      "Université de Batna — sciences agronomiques",
      "Université de Chlef — biologie & environnement",
      "Centre de recherche agronomique (stations régionales)",
      "Écoles vétérinaires & filières agro-industrielles associées",
    ],
    competences_cles: ["Physiologie végétale", "Gestion de l’eau", "Sols & fertilisation", "Agroéconomie", "Qualité & normes", "Projets de terrain"],
    perspectives:
      "Fort enjeu 2025–2030 (eau, climat, productivité). Les profils orientés innovation et agro-industrie seront valorisés.",
    difficultes:
      "Travail parfois terrain, dépendance à la saisonnalité et aux contraintes climatiques.",
    score_keywords: ["agronomie", "agriculture", "environnement", "eau", "sol", "plante", "durable"],
    couleur_badge: "#00C896",
  },
  {
    id: "archi",
    nom: "Architecture",
    secteur: "Créatif",
    description:
      "L’architecture articule créativité, culture du bâti, contraintes techniques et réglementaires urbaines.\n" +
      "Tu apprends à concevoir des espaces habitables, à maîtriser la lumière, les matériaux et la performance énergétique.\n" +
      "Les outils numériques (CAO, BIM, rendu 3D) sont devenus incontournables pour collaborer avec ingénieurs et maîtres d’ouvrage.\n" +
      "Le marché dépend des cycles de construction publique/privée et des projets de réhabilitation.\n" +
      "Entre 2025 et 2030, la rénovation énergétique et la ville durable structureront une partie de l’emploi.\n" +
      "Un book de projets solide et des stages en agence sont essentiels pour débuter.",
    metiers: [
      "Architecte diplômé (inscription à l’ordre selon pays)",
      "Architecte d’intérieur",
      "Urbaniste (Master urbanisme)",
      "Dessinateur-projeteur",
      "BIM manager architecture",
      "Maquettiste 3D / visualisation",
      "Chef de projet conception",
      "Chargé d’études patrimoine",
      "Paysagiste (double compétence)",
      "Consultant accessibilité & normes",
      "Enseignant atelier de composition",
      "Photographe d’architecture (créatif)",
    ],
    salaire_algerie_debutant: "60 000 – 135 000 DZD / mois",
    salaire_algerie_senior: "155 000 – 400 000 DZD / mois",
    salaire_france_debutant: "28 000 – 36 000 € bruts / an (stagiaire architecte)",
    salaire_france_senior: "42 000 – 72 000 € bruts / an",
    duree_etudes: "5 ans minimum (diplôme d’architecte DPLG / HMONP selon système)",
    type_formation: "École d’architecture, Habilitation DPLG, HMONP",
    etablissements_algerie: [
      "EPAU — École polytechnique d’architecture et d’urbanisme (Alger)",
      "ENSTP — aménagement & travaux publics (complément urbain)",
      "Université — géographie & urbanisme (parcours voisins)",
      "Agences d’architecture partenaires (stages)",
      "Conservation du patrimoine (instituts régionaux)",
      "Concours nationaux & workshops internationaux",
    ],
    competences_cles: ["Composition & volumétrie", "Histoire de l’architecture", "Réglementation urbaine", "BIM & CAO", "Performance énergétique", "Maquette & communication"],
    perspectives:
      "Marché 2025–2030 lié à la construction et la rénovation. Les compétences BIM/3D et la durabilité renforcent l’employabilité.",
    difficultes:
      "Projets longs, retours multiples, et exigences techniques. Un portfolio solide est crucial.",
    score_keywords: ["architecture", "bâtiment", "dessin", "3d", "bim", "urbanisme", "conception"],
    couleur_badge: "#1B3A6B",
  },
  {
    id: "sport",
    nom: "Métiers du Sport & Éducation Physique",
    secteur: "Santé & Social",
    description:
      "Cette filière forme aux métiers de l’entraînement, de l’enseignement de l’EPS, de la gestion du sport et de la santé par l’activité physique.\n" +
      "Tu étudies l'anatomie, la physiologie, la psychologie du sport et les techniques d'animation.\n" +
      "En Algérie, les besoins sont croissants dans les clubs, les établissements scolaires et les centres de rééducation.\n" +
      "C'est un domaine idéal pour les passionnés de sport souhaitant allier pratique physique et encadrement professionnel.",
    metiers: [
      "Professeur d'EPS",
      "Entraîneur sportif spécialisé",
      "Préparateur physique",
      "Gestionnaire de structure sportive",
      "Éducateur sportif spécialisé",
      "Coach sportif personnel",
    ],
    salaire_algerie_debutant: "52 000 – 110 000 DZD / mois",
    salaire_algerie_senior: "120 000 – 280 000 DZD / mois",
    salaire_france_debutant: "22 000 – 32 000 € bruts / an",
    salaire_france_senior: "35 000 – 60 000 € bruts / an",
    duree_etudes: "3 ans (Licence) à 5 ans (Master STAPS)",
    type_formation: "Licence STAPS, Master entraînement, écoles spécialisées",
    etablissements_algerie: [
      "Instituts d’Éducation Physique et Sportive (IEPS)",
      "Université d'Alger 3 — IEPS Dély Ibrahim",
      "Université de Constantine 2 — IEPS",
      "Université d'Oran — IEPS",
    ],
    competences_cles: ["Pédagogie", "Anatomie/Physiologie", "Animation de groupe", "Secourisme", "Gestion d'événements", "Discipline"],
    perspectives:
      "Développement du sport professionnel et du bien-être 2025–2030. Opportunités dans le secteur public et privé.",
    difficultes:
      "Nécessite une excellente condition physique et une grande aptitude au contact humain.",
    score_keywords: ["sport", "physique", "entraînement", "coach", "santé", "eps"],
    couleur_badge: "#E85D04",
  },
  {
    id: "green_tech",
    nom: "Énergies Renouvelables & Développement Durable",
    secteur: "Ingénierie",
    description:
      "Cette filière est au cœur de la transition énergétique : solaire, éolien, biomasse et efficacité énergétique.\n" +
      "Tu apprends à concevoir, installer et maintenir des systèmes de production d'énergie propre.\n" +
      "L'Algérie, avec son fort potentiel solaire, investit massivement dans ce secteur pour les prochaines décennies.\n" +
      "Les ingénieurs et techniciens formés seront les piliers de l'économie verte de demain.",
    metiers: [
      "Ingénieur en énergie solaire / éolienne",
      "Chef de projet transition énergétique",
      "Chargé d’études environnementales",
      "Auditeur énergétique",
      "Technicien maintenance installations vertes",
      "Consultant RSE / Développement durable",
    ],
    salaire_algerie_debutant: "78 000 – 155 000 DZD / mois",
    salaire_algerie_senior: "210 000 – 450 000 DZD / mois",
    salaire_france_debutant: "35 000 – 45 000 € bruts / an",
    salaire_france_senior: "55 000 – 90 000 € bruts / an",
    duree_etudes: "3 ans (Licence) à 5 ans (Ingénieur)",
    type_formation: "Licence/Master Énergie, Ingénieur en énergies renouvelables",
    etablissements_algerie: [
      "USTHB — Énergies renouvelables",
      "Université de Tlemcen — Pôle d'excellence énergies vertes",
      "Université d'Adrar — Recherche en énergie solaire",
      "CDER — Centre de développement des énergies renouvelables",
    ],
    competences_cles: ["Thermodynamique", "Électricité PV", "Gestion de projet", "Normes environnementales", "Modélisation", "Efficacité énergétique"],
    perspectives:
      "Secteur stratégique 2025–2040 en Algérie. Forte demande pour les profils spécialisés dans le solaire et l'hydrogène vert.",
    difficultes:
      "Domaine en évolution technologique constante, nécessite une veille technique rigoureuse.",
    score_keywords: ["énergie", "solaire", "vert", "durable", "environnement", "éolien", "transition"],
    couleur_badge: "#00C896",
  },
  {
    id: "tourisme",
    nom: "Tourisme, Hôtellerie & Gastronomie",
    secteur: "Business & Service",
    description:
      "Le tourisme et l'hôtellerie forment aux métiers de l'accueil, de la gestion de structures touristiques et de l'art culinaire.\n" +
      "Tu apprends le management hôtelier, le marketing touristique, la gastronomie et les langues étrangères.\n" +
      "L'Algérie vise à redynamiser son secteur touristique, créant des opportunités dans le haut de gamme et le tourisme local.\n" +
      "C'est une filière de passionnés, basée sur l'excellence du service et l'ouverture culturelle.",
    metiers: [
      "Directeur d'hôtel",
      "Chef de cuisine / Gastronome",
      "Manager d'agence de voyage",
      "Guide touristique spécialisé",
      "Chef de projet événementiel",
      "Revenue manager (junior)",
    ],
    salaire_algerie_debutant: "50 000 – 120 000 DZD / mois",
    salaire_algerie_senior: "140 000 – 400 000 DZD / mois",
    salaire_france_debutant: "26 000 – 36 000 € bruts / an",
    salaire_france_senior: "45 000 – 85 000 € bruts / an",
    duree_etudes: "2 ans (BTS) à 5 ans (Master Management hôtelier)",
    type_formation: "BTS Hôtellerie, Licence/Master Tourisme, Écoles supérieures de tourisme",
    etablissements_algerie: [
      "ESHRA — École Supérieure d'Hôtellerie et de Restauration d'Alger",
      "ENST — École Nationale Supérieure du Tourisme",
      "Instituts nationaux de formation professionnelle (hôtellerie)",
    ],
    competences_cles: ["Langues étrangères", "Relation client", "Management d'équipe", "Gastronomie", "Vente & Marketing", "Organisation"],
    perspectives:
      "Potentiel de croissance important 2025–2030 avec les nouveaux projets d'aménagement touristique.",
    difficultes:
      "Horaires décalés et exigences élevées en termes de présentation et de service client.",
    score_keywords: ["tourisme", "hôtel", "cuisine", "voyage", "accueil", "client", "événement"],
    couleur_badge: "#2D7DD2",
  },
];

const state = {
  activeSection: "chat",
  theme: "light",
  lang: "fr",
  transcript: [],
  profile: {
    serie: "",
    moyenne: "",
    ville: "",
    interets: [],
    modeTravail: "",
    objectif: "",
  },
  wizardStep: 0,
  transcript: [],
  lastRecommendations: null,
  selectedFiliereId: null,
};

function el(id) {
  return document.getElementById(id);
}

function safeText(s) {
  return String(s ?? "").trim();
}

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      Object.assign(state, parsed);
      // harden shape
      state.profile = { ...state.profile, ...(parsed.profile || {}) };
      state.transcript = Array.isArray(parsed.transcript) ? parsed.transcript : [];
    }
  } catch {
    // ignore
  }
}

function saveState() {
  state.lang = currentLang;
  localStorage.setItem("cesi_orientation_state", JSON.stringify(state));
}

function setTheme(theme) {
  state.theme = theme === "dark" ? "dark" : "light";
  document.querySelector(".app")?.setAttribute("data-theme", state.theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", state.theme === "dark" ? "#080E1A" : "#F0EDE8");
  
  const btn = el("btnTheme");
  if (btn) btn.textContent = state.theme === "dark" ? "Mode clair" : "Mode sombre";
  
  saveState();
}

function initStats() {
  // Stats animation removed as per request
}

function showSection(sectionId) {
  const map = {
    chat: { view: "view-chat", label: "Conseiller IA" },
    results: { view: "view-results", label: "Mes résultats" },
    tools: { view: "view-tools", label: "Outils" },
    resources: { view: "view-resources", label: "Ressources" },
    faq: { view: "view-faq", label: "FAQ" },
  };
  const cfg = map[sectionId] || map.chat;
  state.activeSection = sectionId in map ? sectionId : "chat";
  saveState();

  document.querySelectorAll(".view").forEach((v) => {
    const on = v.id === cfg.view;
    v.hidden = !on;
    v.classList.toggle("is-visible", on);
  });

  document.querySelectorAll(".sideNavBtn, .topNavBtn").forEach((b) => {
    const on = b.getAttribute("data-section") === state.activeSection;
    b.classList.toggle("is-active", on);
    if (b.classList.contains("sideNavBtn")) {
      if (on) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    }
  });

  closeSidebarMobile();
}

function closeSidebarMobile() {
  el("sidebar")?.classList.remove("is-open");
  el("sidebarOverlay")?.classList.remove("is-open");
  el("sidebarOverlay")?.setAttribute("hidden", "");
}

function openSidebarMobile() {
  el("sidebar")?.classList.add("is-open");
  const ov = el("sidebarOverlay");
  ov?.classList.add("is-open");
  ov?.removeAttribute("hidden");
}

function animateCounterTo(target, durationMs) {
  const node = el("counter");
  if (!node) return;
  const start = performance.now();
  const from = 0;
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  function frame(now) {
    const t = Math.min(1, (now - start) / durationMs);
    const val = Math.round(from + (target - from) * ease(t));
    node.textContent = val.toLocaleString("fr-FR");
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function addMessage(role, title, htmlBody) {
  const chat = el("chat");
  const row = document.createElement("div");
  row.className = "msg";

  const avatar = document.createElement("div");
  avatar.className = `avatar ${role}`;
  if (role === "bot") avatar.textContent = "AI";
  else {
    const sName = el("studentName")?.textContent || "Moi";
    avatar.textContent = initialsFromName(sName);
  }

  const bubble = document.createElement("div");
  bubble.className = `bubble ${role}`;
  bubble.innerHTML = `<div class="meta">${escapeHtml(title)}</div><div>${htmlBody}</div>`;

  row.appendChild(avatar);
  row.appendChild(bubble);
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;

  state.transcript.push({
    at: new Date().toISOString(),
    role,
    title,
    bodyText: bubble.textContent || "",
  });
  saveState();
}

function initialsFromName(name) {
  const parts = safeText(name).split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] || "U";
  const b = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (a + b).toUpperCase();
}

function setTyping(on) {
  el("typingRow").hidden = !on;
  if (on) el("chat").scrollTop = el("chat").scrollHeight;
}

function renderChips() {
  const host = el("chips");
  host.innerHTML = "";
  for (const txt of SUGGESTED) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = txt;
    b.addEventListener("click", () => {
      el("freeInput").value = txt;
      handleFreeChat();
    });
    host.appendChild(b);
  }
}

function renderResourcesMini() {
  const host = el("resourcesMini");
  if (!host) return;
  host.innerHTML = "";
  RESOURCES.slice(0, 4).forEach((r) => {
    const a = document.createElement("a");
    a.className = "resLink";
    a.href = r.url;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.innerHTML = `<span>${escapeHtml(r.label)}</span><em>${escapeHtml(r.hint)}</em>`;
    host.appendChild(a);
  });
}

function renderResourcesFull() {
  const host = el("resourcesFull");
  if (!host) return;
  host.innerHTML = "";
  RESOURCES.forEach((r) => {
    const a = document.createElement("a");
    a.className = "resLink";
    a.href = r.url;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.innerHTML = `<span>${escapeHtml(r.label)}</span><em>${escapeHtml(r.hint)}</em>`;
    host.appendChild(a);
  });
}

function renderCalendar() {
  const host = el("calendar");
  if (!host) return;
  host.innerHTML = CALENDRIER_2025_2026.map(
    (ev) => `
    <div class="calItem">
      <div class="calDate">${escapeHtml(ev.date)}</div>
      <div class="calBody">
        <strong>${escapeHtml(ev.titre)}</strong>
        <div class="muted small">${escapeHtml(ev.desc)}</div>
      </div>
    </div>`
  ).join("");
}

function renderExtraResources() {
  const host = el("extraResources");
  if (!host) return;
  host.innerHTML = RESSOURCES_EXTRA.map(
    (x) =>
      `<li><a href="${escapeHtml(x.url)}" target="_blank" rel="noreferrer">${escapeHtml(x.label)}</a> — ressource en ligne à utiliser avec discernement.</li>`
  ).join("");
}

function renderFaq() {
  const host = el("faq");
  host.innerHTML = "";
  FAQ.forEach((item, idx) => {
    const box = document.createElement("div");
    box.className = "faqItem";
    box.setAttribute("data-open", "false");
    const bodyHtml = item.a.split("\n").map((line) => escapeHtml(line)).join("<br>");
    box.innerHTML = `
      <button class="faqBtn" type="button">
        <span>${escapeHtml(item.q)}</span>
        <span aria-hidden="true">▾</span>
      </button>
      <div class="faqBody">${bodyHtml}</div>
    `;
    box.querySelector(".faqBtn").addEventListener("click", () => {
      const open = box.getAttribute("data-open") === "true";
      box.setAttribute("data-open", open ? "false" : "true");
    });
    host.appendChild(box);
    if (idx === 0) box.setAttribute("data-open", "true");
  });
}

// Questionnaire 4 étapes
const STEPS = [
  {
    id: "profil",
    title: "Étape 1/4 — Profil lycéen",
    desc: "Donne quelques infos de contexte. Elles aident à adapter les conseils (sans te juger).",
    render: () => {
      const serie = state.profile.serie || "";
      const moyenne = state.profile.moyenne || "";
      const ville = state.profile.ville || "";
      return `
        <div class="fieldRow">
          <div>
            <div class="label">Série du bac</div>
            <select id="serie" class="select">
              ${optionHtml("", "Choisir…", serie)}
              ${optionHtml("sciences", "Sciences", serie)}
              ${optionHtml("math", "Mathématiques", serie)}
              ${optionHtml("technique", "Technique", serie)}
              ${optionHtml("lettres", "Lettres / Langues", serie)}
              ${optionHtml("gestion", "Gestion / Économie", serie)}
              ${optionHtml("autre", "Autre", serie)}
            </select>
          </div>
          <div>
            <div class="label">Moyenne (sur 20)</div>
            <input id="moyenne" class="text" inputmode="decimal" placeholder="ex: 14.5" value="${escapeHtml(moyenne)}" />
          </div>
        </div>
        <div style="margin-top:10px">
          <div class="label">Ville</div>
          <input id="ville" class="text" placeholder="ex: Alger, Oran…" value="${escapeHtml(ville)}" />
        </div>
      `;
    },
    collect: () => {
      state.profile.serie = safeText(el("serie").value);
      state.profile.moyenne = safeText(el("moyenne").value);
      state.profile.ville = safeText(el("ville").value);
    },
    validate: () => true,
  },
  {
    id: "interets",
    title: "Étape 2/4 — Centres d’intérêt",
    desc: "Choisis ce qui te ressemble le plus (plusieurs choix possibles).",
    render: () => {
      const items = [
        { id: "techno", name: "Technologie", hint: "applis, IA, code, data" },
        { id: "sciences", name: "Sciences", hint: "physique, bio, math, labo" },
        { id: "social", name: "Social", hint: "humain, éducation, santé, aide" },
        { id: "art", name: "Art & création", hint: "design, 3D, création visuelle" },
        { id: "business", name: "Business", hint: "commerce, gestion, stratégie" },
      ];
      const selected = new Set(state.profile.interets || []);
      return `
        <div class="choiceGrid">
          ${items
            .map(
              (x) => `
                <label class="choice">
                  <input type="checkbox" value="${escapeHtml(x.id)}" ${selected.has(x.id) ? "checked" : ""} />
                  <div>
                    <strong>${escapeHtml(x.name)}</strong>
                    <em>${escapeHtml(x.hint)}</em>
                  </div>
                </label>
              `
            )
            .join("")}
        </div>
      `;
    },
    collect: () => {
      const checked = Array.from(document.querySelectorAll('#wizard input[type="checkbox"]:checked')).map((n) => n.value);
      state.profile.interets = checked;
    },
    validate: () => true,
  },
  {
    id: "mode",
    title: "Étape 3/4 — Mode de travail",
    desc: "Comment tu te vois travailler au quotidien ?",
    render: () => {
      const v = state.profile.modeTravail || "";
      const options = [
        { id: "autonomie", name: "Autonomie", hint: "concentration, missions individuelles" },
        { id: "equipe", name: "Équipe", hint: "collaboration, échanges, co-création" },
        { id: "terrain", name: "Terrain", hint: "déplacements, concret, chantier/labo" },
        { id: "bureau", name: "Bureau", hint: "organisation, analyse, planification" },
      ];
      return `
        <div class="choiceGrid">
          ${options
            .map(
              (x) => `
                <label class="choice">
                  <input type="radio" name="modeTravail" value="${escapeHtml(x.id)}" ${v === x.id ? "checked" : ""} />
                  <div>
                    <strong>${escapeHtml(x.name)}</strong>
                    <em>${escapeHtml(x.hint)}</em>
                  </div>
                </label>
              `
            )
            .join("")}
        </div>
      `;
    },
    collect: () => {
      const pick = document.querySelector('#wizard input[name="modeTravail"]:checked');
      state.profile.modeTravail = pick ? pick.value : "";
    },
    validate: () => true,
  },
  {
    id: "objectif",
    title: "Étape 4/4 — Objectif",
    desc: "Quel est ton objectif principal pour les prochaines années ?",
    render: () => {
      const v = state.profile.objectif || "";
      const options = [
        { id: "rapide", name: "Métier rapidement", hint: "parcours efficace, insertion" },
        { id: "long", name: "Longues études", hint: "Master, spécialisation, expertise" },
        { id: "entreprendre", name: "Entrepreneuriat", hint: "créer un projet/activité" },
        { id: "international", name: "International", hint: "opportunités Algérie + France" },
      ];
      return `
        <div class="choiceGrid">
          ${options
            .map(
              (x) => `
                <label class="choice">
                  <input type="radio" name="objectif" value="${escapeHtml(x.id)}" ${v === x.id ? "checked" : ""} />
                  <div>
                    <strong>${escapeHtml(x.name)}</strong>
                    <em>${escapeHtml(x.hint)}</em>
                  </div>
                </label>
              `
            )
            .join("")}
        </div>
      `;
    },
    collect: () => {
      const pick = document.querySelector('#wizard input[name="objectif"]:checked');
      state.profile.objectif = pick ? pick.value : "";
    },
    validate: () => true,
  },
];

function optionHtml(value, label, current) {
  return `<option value="${escapeHtml(value)}" ${String(current) === String(value) ? "selected" : ""}>${escapeHtml(label)}</option>`;
}

function renderWizard() {
  const step = STEPS[state.wizardStep];
  el("wizard").innerHTML = step.render();
  el("panelDesc").textContent = step.desc;

  el("btnPrev").disabled = state.wizardStep === 0;
  el("btnNext").textContent = state.wizardStep === STEPS.length - 1 ? "Voir mes résultats" : "Continuer";

  const pct = Math.round(((state.wizardStep + 1) / STEPS.length) * 100);
  el("progressFill").style.width = `${pct}%`;
  el("progressText").textContent = `Étape ${state.wizardStep + 1}/${STEPS.length}`;
}

function computeScores() {
  const scores = Object.fromEntries(filieres.map((f) => [f.id, 0]));
  const serie = state.profile.serie;
  const moyenne = parseFloat(String(state.profile.moyenne).replace(",", "."));
  const interets = new Set(state.profile.interets || []);
  const mode = state.profile.modeTravail;
  const obj = state.profile.objectif;

  const add = (ids, w) => ids.forEach((id) => { if (scores[id] != null) scores[id] += w; });

  /* Centres d’intérêt (poids principal) */
  if (interets.has("techno")) add(["info_ia", "cyber", "elec"], 32);
  if (interets.has("sciences")) add(["med", "gc", "elec", "agro", "info_ia"], 22);
  if (interets.has("social")) add(["sh", "law", "med", "commerce"], 24);
  if (interets.has("art")) add(["design", "archi"], 30);
  if (interets.has("business")) add(["commerce", "mgmt", "law"], 26);

  /* Mode de travail */
  if (mode === "autonomie") add(["info_ia", "cyber", "design", "law", "elec"], 14);
  if (mode === "equipe") add(["mgmt", "commerce", "gc", "med", "sh"], 14);
  if (mode === "terrain") add(["gc", "agro", "elec", "archi", "med"], 16);
  if (mode === "bureau") add(["mgmt", "law", "info_ia", "commerce", "design"], 12);

  /* Objectif d’études / carrière */
  if (obj === "rapide") add(["commerce", "design", "info_ia", "cyber", "elec"], 12);
  if (obj === "long") add(["med", "law", "archi", "info_ia", "gc"], 14);
  if (obj === "entreprendre") add(["mgmt", "commerce", "info_ia", "design", "agro"], 16);
  if (obj === "international") add(["info_ia", "cyber", "mgmt", "med", "design"], 10);

  /* Série du bac */
  if (serie === "math" || serie === "sciences") add(["info_ia", "cyber", "gc", "elec", "med", "agro"], 10);
  if (serie === "technique") add(["elec", "gc", "info_ia", "cyber", "archi"], 12);
  if (serie === "lettres") add(["law", "sh", "commerce", "mgmt"], 10);
  if (serie === "gestion") add(["commerce", "mgmt", "law"], 12);
  if (serie === "autre") add(Object.keys(scores), 3);

  /* Moyenne : bonus modéré (jamais pénalisant) */
  if (Number.isFinite(moyenne)) {
    if (moyenne >= 16) add(["med", "law", "archi", "info_ia", "cyber"], 8);
    else if (moyenne >= 14) add(["info_ia", "gc", "law", "mgmt"], 5);
    else if (moyenne >= 11) add(Object.keys(scores), 4);
    else add(Object.keys(scores), 6);
  }

  return scores;
}

function rankTop3(scores) {
  const rows = Object.entries(scores)
    .map(([id, score]) => ({ id, score, filiere: filieres.find((f) => f.id === id) }))
    .sort((a, b) => b.score - a.score);

  const top = rows.slice(0, 3);
  const max = top[0]?.score || 1;
  const min = top[top.length - 1]?.score ?? 0;
  const span = Math.max(1, max - min);

  // Convertir en compatibilité (%) sans “100% automatique”
  return top.map((r) => {
    const pct = 72 + Math.round(((r.score - min) / span) * 26); // 72..98
    return { ...r, pct: Math.min(98, Math.max(65, pct)) };
  });
}

function renderTop3(recs) {
  const host = el("top3");
  host.innerHTML = "";
  recs.forEach((r, idx) => {
    const div = document.createElement("div");
    div.className = "rec";
    div.setAttribute("role", "button");
    div.tabIndex = 0;
    div.innerHTML = `
      <div class="recHead">
        <div>
          <div class="recName">${escapeHtml(r.filiere?.nom || "")}</div>
          <div class="recPct">${escapeHtml(String(r.pct))}% de compatibilité • Top ${idx + 1}</div>
        </div>
        <div class="badge" style="background:${escapeHtml(r.filiere?.couleur_badge || "#1B3A6B")}">${escapeHtml(r.filiere?.secteur || "")}</div>
      </div>
      <div class="bar" aria-hidden="true"><div class="recBarInner" data-target="${escapeHtml(String(r.pct))}" style="width:0%"></div></div>
    `;
    const open = () => {
      state.selectedFiliereId = r.id;
      saveState();
      renderDetails();
      showSection("results");
      addMessage("bot", "Détail filière", `Fiche ouverte : <span class="k">${escapeHtml(r.filiere?.nom || "")}</span>.`);
    };
    div.addEventListener("click", open);
    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
    host.appendChild(div);
  });

  requestAnimationFrame(() => {
    host.querySelectorAll(".recBarInner").forEach((bar) => {
      const t = Number(bar.getAttribute("data-target")) || 0;
      requestAnimationFrame(() => {
        bar.style.width = `${t}%`;
      });
    });
  });
}

function renderDetails() {
  const host = el("details");
  const id = state.selectedFiliereId || state.lastRecommendations?.[0]?.id;
  if (!id) {
    host.innerHTML = `<div class="cardDetail"><div class="muted">Complète le questionnaire pour afficher les fiches détaillées.</div></div>`;
    return;
  }
  const f = filieres.find((x) => x.id === id);
  if (!f) return;

  const tags = competencesTags(f.competences_cles)
    .map((t) => `<span class="skillTag" style="background:${escapeHtml(t.color)}">${escapeHtml(t.label)}</span>`)
    .join("");

  host.innerHTML = `
    <div class="cardDetail">
      <div class="detailTitle">
        <div>
          <h3>${escapeHtml(f.nom)}</h3>
          <div class="detailDesc muted">${escapeHtml(f.description)}</div>
        </div>
        <div class="badge" style="background:${escapeHtml(f.couleur_badge)}">${escapeHtml(f.secteur)}</div>
      </div>

      <div class="detailGrid">
        <div class="box">
          <div class="boxTitle">Métiers possibles</div>
          <ul class="list">${(f.metiers || []).map((m) => `<li>${escapeHtml(m)}</li>`).join("")}</ul>
        </div>
        <div class="box">
          <div class="boxTitle">Salaires indicatifs</div>
          <table class="salaryTable" aria-label="Comparatif salaires">
            <thead><tr><th>Région</th><th>Débutant</th><th>Expérimenté</th></tr></thead>
            <tbody>
              <tr><td>Algérie (DZD / mois)</td><td>${escapeHtml(f.salaire_algerie_debutant)}</td><td>${escapeHtml(f.salaire_algerie_senior)}</td></tr>
              <tr><td>France (€ bruts / an)</td><td>${escapeHtml(f.salaire_france_debutant)}</td><td>${escapeHtml(f.salaire_france_senior)}</td></tr>
            </tbody>
          </table>
          <p class="muted small" style="margin:10px 0 0">Fourchettes indicatives — varient selon employeur, ville et expérience.</p>
        </div>
        <div class="box">
          <div class="boxTitle">Formation</div>
          <p class="small"><strong>Durée :</strong> ${escapeHtml(f.duree_etudes)}</p>
          <p class="small"><strong>Type :</strong> ${escapeHtml(f.type_formation)}</p>
          <div class="boxTitle" style="margin-top:14px">Établissements en Algérie</div>
          <ul class="list">${(f.etablissements_algerie || []).map((e) => `<li>${escapeHtml(e)}</li>`).join("")}</ul>
        </div>
        <div class="box">
          <div class="boxTitle">Compétences clés</div>
          <div class="tagRow">${tags}</div>
          <div class="boxTitle" style="margin-top:16px">Perspectives 2025–2030</div>
          <p class="small muted">${escapeHtml(f.perspectives)}</p>
          <div class="boxTitle" style="margin-top:12px">Difficultés & points d’attention</div>
          <p class="small muted">${escapeHtml(f.difficultes)}</p>
        </div>
      </div>
    </div>
  `;
}

function updateStudentNameFromProfile() {
  const city = safeText(state.profile.ville);
  const node = el("studentName");
  if (!node) return;
  
  if (city) {
    node.textContent = `Mohamed Amine BENKHEDDA • ${city}`;
  } else {
    node.textContent = "Mohamed Amine BENKHEDDA";
  }
}

function handleNext() {
  const step = STEPS[state.wizardStep];
  step.collect();
  if (!step.validate()) return;

  if (state.wizardStep < STEPS.length - 1) {
    state.wizardStep += 1;
    saveState();
    renderWizard();
    return;
  }

  // Fin questionnaire → recommandations
  const scores = computeScores();
  const top3 = rankTop3(scores);
  state.lastRecommendations = top3.map((x) => ({ id: x.id, pct: x.pct }));
  state.selectedFiliereId = top3[0]?.id || null;
  saveState();

  updateStudentNameFromProfile();
  renderTop3(top3);
  renderDetails();

  addMessage(
    "bot",
    "Résultats",
    `Merci. Voici tes <span class="k">3 filières recommandées</span> avec une compatibilité indicative. Clique sur une carte pour ouvrir la fiche détaillée.`
  );
  showSection("results");
}

function handlePrev() {
  if (state.wizardStep === 0) return;
  STEPS[state.wizardStep].collect();
  state.wizardStep -= 1;
  saveState();
  renderWizard();
}

function buildContextSummary() {
  const p = state.profile;
  const parts = [];
  if (p.serie) parts.push(`Série: ${p.serie}`);
  if (p.moyenne) parts.push(`Moyenne: ${p.moyenne}/20`);
  if (p.ville) parts.push(`Ville: ${p.ville}`);
  if (Array.isArray(p.interets) && p.interets.length) parts.push(`Intérêts: ${p.interets.join(", ")}`);
  if (p.modeTravail) parts.push(`Mode: ${p.modeTravail}`);
  if (p.objectif) parts.push(`Objectif: ${p.objectif}`);
  return parts.join(" • ");
}

function bestFiliere() {
  const id = state.selectedFiliereId || state.lastRecommendations?.[0]?.id;
  return filieres.find((f) => f.id === id) || null;
}

function answerFreeQuestion(q) {
  const question = safeText(q).toLowerCase();
  const f = bestFiliere();
  const base = buildContextSummary();
  const prefix = base ? `Contexte: ${escapeHtml(base)}.<br><br>` : "";

  const salaryTarget =
    question.includes("informat") || question.includes("développeur") || question.includes("developpeur")
      ? filieres.find((x) => x.id === "info_ia")
      : f;

  if (question.includes("débou") || question.includes("metier") || question.includes("métier")) {
    if (f) {
      return (
        prefix +
        `Pour <span class="k">${escapeHtml(f.nom)}</span>, voici des exemples de métiers :` +
        `<ul class="list">${f.metiers.map((m) => `<li>${escapeHtml(m)}</li>`).join("")}</ul>` +
        `Essaie de contacter 2 professionnels sur LinkedIn pour valider si le quotidien te plaît.`
      );
    }
    return (
      prefix +
      "Termine d’abord le questionnaire pour verrouiller une filière. En attendant, explore les fiches « Ressources » et note ce qui t’attire : techno, sciences, social, art ou business."
    );
  }

  if (question.includes("salaire") || question.includes("gagne") || question.includes("combien")) {
    const target = salaryTarget || f;
    if (target) {
      return (
        prefix +
        `Tableau indicatif pour <span class="k">${escapeHtml(target.nom)}</span> :` +
        `<table class="salaryTable" style="margin-top:8px"><thead><tr><th>Région</th><th>Débutant</th><th>Expérimenté</th></tr></thead><tbody>` +
        `<tr><td>Algérie</td><td>${escapeHtml(target.salaire_algerie_debutant)}</td><td>${escapeHtml(target.salaire_algerie_senior)}</td></tr>` +
        `<tr><td>France</td><td>${escapeHtml(target.salaire_france_debutant)}</td><td>${escapeHtml(target.salaire_france_senior)}</td></tr>` +
        `</tbody></table><p class="small muted">Ces montants ne sont pas garantis : ils servent à comparer des ordres de grandeur.</p>`
      );
    }
    return prefix + "Fais le questionnaire ou choisis une filière dans « Mes résultats » pour afficher des fourchettes chiffrées.";
  }

  if (question.includes("lmd") || (question.includes("licence") && question.includes("master"))) {
    return (
      prefix +
      "<strong>Licence–Master–Doctorat (LMD)</strong> structure le supérieur : la Licence valide les fondamentaux (souvent 6 semestres), le Master approfondit une spécialité (4 semestres) et ouvre vers la recherche ou des postes plus ciblés.<br><br>" +
      "Les crédits (ECTS) attestent ta charge de travail : garde tes relevés et le descriptif des modules pour toute mobilité.<br><br>" +
      "En Algérie, l’inscription administrative et le suivi peuvent passer par <strong>PROGRES</strong> et les services de ton établissement : vérifie toujours les circulaires MESRS de l’année en cours."
    );
  }

  if (question.includes("progres")) {
    return (
      prefix +
      "<strong>Guide PROGRES (étapes types)</strong><br>" +
      "1) Accéder au portail officiel via le lien « PROGRES » dans la section Ressources.<br>" +
      "2) Créer ou récupérer ton compte avec une adresse e-mail active et un mot de passe robuste.<br>" +
      "3) Renseigner ton identité et tes résultats comme demandé (Bac, etc.).<br>" +
      "4) Choisir l’établissement et la filière dans les listes proposées pour la campagne en cours.<br>" +
      "5) Valider et conserver une preuve (PDF, capture) de chaque étape.<br>" +
      "6) En cas d’erreur, contacter le support informatique de ton université plutôt que de créer plusieurs comptes.<br><br>" +
      "Les écrans évoluent chaque année : si un libellé diffère, suis les instructions affichées à l’écran et les communiqués MESRS."
    );
  }

  if (question.includes("changer") && question.includes("fili")) {
    return (
      prefix +
      "<strong>Stratégie de réorientation</strong><br>" +
      "• Vise une filière <em>proche</em> pour maximiser les équivalences de crédits.<br>" +
      "• Maintiens une moyenne solide : c’est souvent le premier critère de sélection.<br>" +
      "• Documente ton nouveau projet : mini-projet, MOOC, association, stage d’observation.<br>" +
      "• Prépare un dossier : relevés, lettre de motivation, éventuellement recommandation.<br>" +
      "• Respecte le calendrier : les demandes de transfert ont des dates limites.<br><br>" +
      "Si tu me précises ta filière actuelle et ta cible, je te propose un plan sur un semestre."
    );
  }

  if (question.includes("bourse") || question.includes("bourses")) {
    return (
      prefix +
      "<strong>Algérie</strong> : renseigne-toi auprès du service des œuvres universitaires de ton établissement, de l’<strong>ONOU</strong> pour le logement, et des dispositifs locaux (wilaya, fondations).<br>" +
      "Pour l’<strong>entrepreneuriat jeune</strong>, l’<strong>ANSEJ</strong> et le <strong>CNAC</strong> sont des dispositifs connus : vérifie l’éligibilité et les dossiers sur leurs sites officiels.<br><br>" +
      "<strong>France</strong> : consulte <strong>Campus France Algérie</strong> pour les procédures études ; les bourses type <strong>BGF</strong> ou programmes <strong>Erasmus+</strong> dépendent de critères et d’années précises — lis les fiches à jour sur les sites officiels.<br><br>" +
      "Je ne peux pas garantir une attribution : par contre je te conseille de monter un dossier clair, des relevés traduits si besoin, et une lettre de motivation précise."
    );
  }

  if (question.includes("entrepreneur") || question.includes("entreprise") || question.includes("startup")) {
    return (
      prefix +
      "<strong>Entrepreneuriat en Algérie (pistes)</strong><br>" +
      "• <strong>ANSEJ</strong> : dispositifs d’aide à la création pour les jeunes (conditions d’âge et de diplôme à vérifier chaque année).<br>" +
      "• <strong>CNAC</strong> : soutien aux porteurs de projets (informe-toi sur les programmes ouverts).<br>" +
      "• Incubateurs et pépinières : universités, technopôles, concours étudiants.<br>" +
      "• Associe toujours une étude de marché simple et un plan financier même rudimentaire.<br><br>" +
      "Combine une compétence technique (numérique, agro, design) avec le management : c’est souvent plus robuste."
    );
  }

  if (question.includes("école") && question.includes("ingénieur")) {
    return (
      prefix +
      "<strong>Écoles d’ingénieurs — critères fréquents</strong><br>" +
      "• Résultats en maths / sciences et classement.<br>" +
      "• Concours ou admissions sur dossier selon l’établissement.<br>" +
      "• Projets, olympiades, stages, associations techniques.<br>" +
      "• Anglais technique et soft skills.<br><br>" +
      "<strong>Exemples d’établissements en Algérie</strong> (non exhaustif) : <strong>ENP</strong>, <strong>ENSTP</strong>, <strong>ESI</strong>, <strong>USTHB</strong> (parcours ingénieur selon filières), autres écoles nationales.<br>" +
      "Vérifie sur chaque site les filières précises, les quotas et le calendrier 2025–2026."
    );
  }

  if (question.includes("anglais")) {
    return (
      prefix +
      "<strong>Améliorer l’anglais gratuitement</strong><br>" +
      "• <strong>BBC Learning English</strong>, <strong>British Council</strong> (activités en ligne).<br>" +
      "• Chaînes YouTube pédagogiques (grammaire, prononciation).<br>" +
      "• Lire de la vulgarisation scientifique ou tech en anglais 20 minutes par jour.<br>" +
      "• Échange linguistique (clubs, Discord bien modérés).<br>" +
      "• Prépare le <strong>TOEIC</strong> ou <strong>IELTS</strong> si tu vises une mobilité : même un score modeste ouvre des portes."
    );
  }

  if (question.includes("grande école") || question.includes("grande ecole")) {
    return (
      prefix +
      "Pour une grande école, construis un <strong>triptyque</strong> : excellents résultats, dossier riche (projets, responsabilités), et maîtrise des langues.<br>" +
      "Renseigne-toi tôt sur les voies d’accès (concours, admissions parallèles, doubles diplômes).<br>" +
      "En parallèle, vise des écoles nationales algériennes reconnues : elles offrent souvent d’excellents débouchés régionaux."
    );
  }

  return (
    prefix +
    "Merci pour ta question. Pour avancer efficacement : va dans <strong>Mes résultats</strong> pour choisir une filière, puis demande-moi un point précis (salaires, métiers, études). " +
    "Si tu es bloqué, décris en une phrase ton intérêt principal et ta contrainte (temps, ville, budget) : je te proposerai une piste réaliste."
  );
}

function handleFreeChat() {
  const input = el("freeInput");
  const txt = safeText(input.value);
  if (!txt) return;
  input.value = "";

  addMessage("user", "Toi", escapeHtml(txt));
  setTyping(true);

  setTimeout(() => {
    const answer = answerFreeQuestion(txt);
    setTyping(false);
    addMessage("bot", "Chatbot", answer);
  }, 450);
}

function exportTranscript() {
  const txt =
    state.transcript
      .map((m) => {
        const who = m.role === "user" ? "UTILISATEUR" : "CHATBOT";
        return `[${m.at}] ${who} — ${m.title}\n${m.bodyText}\n`;
      })
      .join("\n") || "Aucune conversation à exporter.";
  el("exportText").value = txt;
  el("exportDialog").showModal();
}

function shareResults() {
  const shareData = {
    title: 'CESI — Chatbot d’orientation',
    text: 'Découvre ce chatbot d’orientation intelligent pour t’aider dans ton parcours universitaire !',
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData)
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Erreur lors du partage:', err);
        }
      });
  } else {
    navigator.clipboard.writeText(window.location.href)
      .then(() => addMessage("bot", "Partage", "Lien du site copié !"))
      .catch(() => addMessage("bot", "Partage", "Impossible de copier le lien."));
  }
}

function exportPdf() {
  const { jsPDF } = window.jspdf || {};
  if (!jsPDF) {
    addMessage("bot", "PDF", "Le module PDF n’est pas chargé. Recharge la page, puis réessaie.");
    return;
  }
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 44;
  let y = margin;

  const title = "Bilan d’orientation — Résumé (indicatif)";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(title, margin, y);
  y += 18;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const ctx = buildContextSummary() || "Contexte: non renseigné";
  const sName = el("studentName")?.textContent || "Mohamed Amine BENKHEDDA";
  y = writeParagraph(doc, `Étudiant: ${sName}`, margin, y + 10, 520);
  y = writeParagraph(doc, ctx, margin, y + 6, 520);

  const top = state.lastRecommendations || [];
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text("Top 3 filières", margin, y);
  y += 12;
  doc.setFont("helvetica", "normal");

  if (!top.length) {
    y = writeParagraph(doc, "Questionnaire incomplet: aucune recommandation disponible.", margin, y + 6, 520);
  } else {
    top.forEach((t, i) => {
      const f = filieres.find((ff) => ff.id === t.id);
      y = writeParagraph(doc, `${i + 1}. ${f?.nom || t.id} — ${t.pct}%`, margin, y + 6, 520);
    });
  }

  const focus = bestFiliere();
  if (focus) {
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Fiche rapide (filière principale)", margin, y);
    y += 12;
    doc.setFont("helvetica", "normal");
    y = writeParagraph(doc, focus.nom, margin, y + 6, 520);
    y = writeParagraph(doc, focus.description, margin, y + 6, 520);
    y = writeParagraph(doc, `Algérie: ${focus.salaire_algerie_debutant} (débutant) • ${focus.salaire_algerie_senior} (expérimenté)`, margin, y + 6, 520);
    y = writeParagraph(doc, `France: ${focus.salaire_france_debutant} (débutant) • ${focus.salaire_france_senior} (expérimenté)`, margin, y + 6, 520);
  }

  y += 10;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  writeParagraph(
    doc,
    "Note: ce document donne des indications générales. Pour un choix final, compare plusieurs sources, discute avec des étudiants/enseignants, et teste des mini-projets.",
    margin,
    y + 6,
    520
  );

  doc.save("bilan_orientation.pdf");
}

function writeParagraph(doc, text, x, y, width) {
  const lines = doc.splitTextToSize(text, width);
  doc.text(lines, x, y);
  return y + lines.length * 14;
}

function resetAll() {
  state.profile = { serie: "", moyenne: "", ville: "", interets: [], modeTravail: "", objectif: "" };
  state.wizardStep = 0;
  state.transcript = [];
  state.lastRecommendations = null;
  state.selectedFiliereId = null;
  state.activeSection = "chat";
  saveState();

  el("chat").innerHTML = "";
  renderWizard();
  renderTop3([]);
  renderDetails();
  showSection("chat");

  addMessage(
    "bot",
    "Bienvenue",
    "Je vais t’aider à choisir une filière de façon claire et bienveillante. Commence par le questionnaire à droite. Ensuite, tu pourras poser des questions libres."
  );
}

function renderTools(toolId = "bourse") {
  const content = el("tool-content");
  if (!content) return;
  content.innerHTML = "";

  document.querySelectorAll(".toolTabBtn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.getAttribute("data-tool") === toolId);
  });

  if (toolId === "bourse") {
    content.innerHTML = `
      <h3>Simulateur de Bourse ONOU</h3>
      <div class="simForm">
        <label>Distance domicile-université :
          <select id="simDistance">
            <option value="50">Moins de 50 km</option>
            <option value="100">Plus de 50 km</option>
          </select>
        </label>
        <label>Revenu mensuel des parents (DA) :
          <input type="number" id="simIncome" value="30000">
        </label>
        <button class="btn primary" onclick="calculateBourse()">Calculer</button>
      </div>
      <div id="bourseResult"></div>
    `;
  } else if (toolId === "glossary") {
    GLOSSARY.forEach((item) => {
      const card = document.createElement("div");
      card.className = "glossaryCard";
      card.innerHTML = `<strong>${item.term}</strong><p>${item.def}</p>`;
      content.appendChild(card);
    });
  } else if (toolId === "schools") {
    content.innerHTML = `
      <h3>Grandes Écoles & Universités</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
        <input type="text" id="schoolSearch" placeholder="Rechercher une école..." style="padding: 8px; border-radius: 6px; border: 1px solid var(--border); flex: 1; min-width: 200px;">
        <select id="schoolLocFilter" style="padding: 8px; border-radius: 6px; border: 1px solid var(--border);">
          <option value="ALL">Toutes les localisations</option>
          <option value="DZ">Algérie</option>
          <option value="FR">France</option>
          <option value="CA">Canada</option>
        </select>
      </div>
      <div id="schoolsList"></div>
    `;
    const input = el("schoolSearch");
    const select = el("schoolLocFilter");
    const refresh = () => renderSchoolsList(input.value, select.value);
    input.addEventListener("input", refresh);
    select.addEventListener("change", refresh);
    refresh();
  } else if (toolId === "checklist") {
    content.innerHTML = `<h3>Checklist de Rentrée</h3><p style="margin-bottom:20px; font-size:14px; color:var(--text-muted);">Voici les documents essentiels à préparer pour votre inscription.</p>`;
    CHECKLIST.forEach(cat => {
      const div = document.createElement("div");
      div.style.marginBottom = "20px";
      div.innerHTML = `<h4 style="margin-bottom:10px; color:var(--primary);">${cat.cat}</h4>
        <ul style="list-style:none; padding:0;">
          ${cat.items.map(it => `<li style="padding:8px 0; border-bottom:1px solid var(--border); display:flex; align-items:center; gap:10px;"><input type="checkbox"> ${it}</li>`).join("")}
        </ul>`;
      content.appendChild(div);
    });
  } else if (toolId === "zen") {
    content.innerHTML = `<h3>Objectif Serein</h3><p style="margin-bottom:20px; font-size:14px; color:var(--text-muted);">Conseils pour gérer le stress du Bac.</p>`;
    STRESS_TIPS.forEach(tip => {
      const card = document.createElement("div");
      card.className = "schoolCard";
      card.innerHTML = `<strong style="color:var(--primary); font-size:16px;">${tip.title}</strong><p style="margin-top:5px; font-size:14px;">${tip.body}</p>`;
      content.appendChild(card);
    });
  } else if (toolId === "simul") {
    content.innerHTML = `<h3>Simulateur de Moyenne Bac</h3>
      <div class="simForm">
        <label>Série du Bac : 
          <select id="bacStream" onchange="renderBacSubjects()">
            <option value="Sciences">Sciences Expérimentales</option>
            <option value="Maths">Mathématiques</option>
            <option value="Technique">Technique Mathématiques</option>
            <option value="Lettres">Lettres et Philosophie</option>
          </select>
        </label>
        <div id="bacSubjectsList" style="margin-top:15px;"></div>
        <button class="btn primary" style="margin-top:20px; width:100%;" onclick="calcBac()">Calculer ma moyenne estimée</button>
      </div>
      <div id="bacResult"></div>`;
    renderBacSubjects();
  } else if (toolId === "dates") {
    content.innerHTML = `<h3>Calendrier de l'Orientation</h3><div class="timeline" style="margin-top:20px;"></div>`;
    const tl = content.querySelector(".timeline");
    ORIENTATION_DATES.forEach(ev => {
      const item = document.createElement("div");
      item.style.padding = "15px";
      item.style.borderLeft = "3px solid var(--primary)";
      item.style.marginBottom = "15px";
      item.style.background = "var(--chat-bot-bg)";
      item.innerHTML = `<strong style="color:var(--primary);">${ev.date}</strong><p style="margin:5px 0 0 0;">${ev.task}</p>`;
      tl.appendChild(item);
    });
  } else if (toolId === "stories") {
    content.innerHTML = `<h3>Parcours & Témoignages</h3><div id="storiesList" style="margin-top:20px;"></div>`;
    TESTIMONIALS.forEach(t => {
      const card = document.createElement("div");
      card.className = "schoolCard";
      card.innerHTML = `<strong style="color:var(--primary);">${t.name} (${t.school})</strong><p style="margin-top:8px; font-style:italic;">"${t.text}"</p>`;
      content.querySelector("#storiesList").appendChild(card);
    });
  } else if (toolId === "exams") {
    content.innerHTML = `<h3>Sujets & Corrigés</h3><p style="font-size:13px; margin-bottom:15px;">Entraînez-vous avec les sujets officiels des années précédentes (Bac & BEM).</p>
    <div id="exams-grouped" class="examsGrid"></div>`;
    
    const host = content.querySelector("#exams-grouped");
    const years = [...new Set(SUBJECT_LINKS.map(s => s.year))].sort((a, b) => b.localeCompare(a));
    
    years.forEach(year => {
      const yearSection = document.createElement("div");
      yearSection.style.marginBottom = "25px";
      yearSection.innerHTML = `<h4 style="border-bottom: 2px solid var(--primary); padding-bottom: 5px; margin-bottom: 15px; color: var(--primary); display: flex; justify-content: space-between; align-items: center;">
        <span>Session ${year}</span>
        <small style="font-size: 11px; font-weight: 400; opacity: 0.7;">Annales officielles</small>
      </h4>
      <div class="examsSubGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px;"></div>`;
      
      const subGrid = yearSection.querySelector(".examsSubGrid");
      SUBJECT_LINKS.filter(s => s.year === year).forEach(s => {
        const card = document.createElement("div");
        card.className = "schoolCard";
        card.style.margin = "0";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.justifyContent = "space-between";
        card.innerHTML = `
          <div>
            <div style="font-size: 10px; font-weight: 700; color: var(--primary); text-transform: uppercase; margin-bottom: 4px;">${s.branch}</div>
            <strong style="font-size: 13px; display: block; line-height: 1.3;">${s.title}</strong>
          </div>
          <a href="${s.link}" target="_blank" class="btn ghost" style="font-size: 11px; margin-top: 10px; padding: 6px; text-align: center; border: 1px solid var(--border);">Télécharger</a>
        `;
        subGrid.appendChild(card);
      });
      host.appendChild(yearSection);
    });
  } else if (toolId === "market") {
    content.innerHTML = `<h3>Baromètre de l'Emploi en Algérie</h3><p style="font-size:13px; margin-bottom:20px;">Quels secteurs recrutent le plus pour 2024-2025 ?</p>`;
    JOB_MARKET.forEach(j => {
      const card = document.createElement("div");
      card.className = "schoolCard";
      card.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <strong style="color:var(--primary);">${j.sector}</strong>
        <span style="font-size:12px; font-weight:700;">${j.trend}</span>
      </div>
      <div style="height:8px; background:var(--border); border-radius:4px; overflow:hidden; margin-bottom:10px;">
        <div style="width:${j.demand}%; height:100%; background:var(--primary);"></div>
      </div>
      <p style="font-size:12px; opacity:0.8;"><strong>Débouchés :</strong> ${j.careers}</p>`;
      content.appendChild(card);
    });
  } else if (toolId === "planner") {
    content.innerHTML = `<h3>Planning de Révisions</h3>
      <p style="font-size:13px; margin-bottom:15px; color:var(--text-muted);">Cliquez sur une cellule pour la modifier. Votre planning est sauvegardé automatiquement.</p>
      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:15px; align-items:center;">
        <label style="font-size:13px; font-weight:600;">Série :
          <select id="planStream" style="padding:6px 10px; border-radius:6px; border:1px solid var(--border);">
            <option value="Sciences">Sciences Exp.</option>
            <option value="Maths">Maths</option>
            <option value="Technique">Technique</option>
            <option value="Lettres">Lettres</option>
          </select>
        </label>
        <button class="btn primary" style="padding:8px 16px;" onclick="generatePlan()">Générer</button>
        <button class="btn ghost" style="padding:8px 16px; border:1px solid var(--border);" onclick="clearPlanner()">Effacer tout</button>
      </div>
      <div id="plannerGrid" style="overflow-x:auto;"></div>
      <div id="plannerLegend" style="margin-top:12px;"></div>`;
    renderPlannerGrid();
  } else if (toolId === "budget") {
    content.innerHTML = `<h3>Simulateur de Budget Étudiant</h3>
      <p style="font-size:13px; margin-bottom:15px;">Estimez vos dépenses mensuelles moyennes.</p>
      <div class="simForm">
        <div style="margin-bottom:10px;">
          <label style="font-size:12px;">Repas (Resto U + Cafétéria) / mois</label>
          <input type="number" id="bgFood" value="1500" style="width:100%;">
        </div>
        <div style="margin-bottom:10px;">
          <label style="font-size:12px;">Transport (Abonnement) / mois</label>
          <input type="number" id="bgTrans" value="500" style="width:100%;">
        </div>
        <div style="margin-bottom:10px;">
          <label style="font-size:12px;">Fournitures & Internet / mois</label>
          <input type="number" id="bgMisc" value="2000" style="width:100%;">
        </div>
        <button class="btn primary" style="width:100%; margin-top:10px;" onclick="calcBudget()">Calculer mon budget</button>
      </div>
      <div id="budgetResult"></div>`;
  } else if (toolId === "riasec") {
    content.innerHTML = `
      <h3>Test RIASEC Rapide</h3>
      <div style="background: var(--chat-bot-bg); padding: 15px; border-radius: 8px; border: 1px solid var(--border); margin-bottom: 20px;">
        <p style="font-size: 14px; line-height: 1.5; color: var(--text-dark);">
          Le test <strong>RIASEC</strong> est un outil d'orientation international. Il définit 6 types de personnalités (Réaliste, Investigateur, Artistique, Social, Entreprenant, Conventionnel). 
          Faire ce test vous aide à trouver les filières et métiers qui correspondent le mieux à votre tempérament.
        </p>
      </div>
      <p style="margin-bottom: 20px; font-size: 14px; font-weight: 700; color: var(--primary);">Répondez aux questions ci-dessous :</p>
      <div id="riasec-quiz"></div>
      <button class="btn primary" style="margin-top: 20px;" onclick="calculateRiasec()">Voir mon profil dominant</button>
      <div id="riasec-result"></div>`;
    renderRiasecQuiz();
  }
}

window.renderBacSubjects = () => {
  const stream = el("bacStream").value;
  const coeffs = BAC_COEFFS[stream];
  const list = el("bacSubjectsList");
  if (!list) return;
  list.innerHTML = "";
  for (let s in coeffs) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = "space-between";
    row.style.alignItems = "center";
    row.style.marginBottom = "8px";
    row.innerHTML = `<span style="font-size:14px;">${s} (Coeff ${coeffs[s]})</span>
      <input type="number" class="bacNote" data-subject="${s}" data-coeff="${coeffs[s]}" value="10" min="0" max="20" style="width:60px; padding:4px; border-radius:4px; border:1px solid var(--border);">`;
    list.appendChild(row);
  }
};

window.calcBac = () => {
  const inputs = document.querySelectorAll(".bacNote");
  let totalPoints = 0;
  let totalCoeffs = 0;
  inputs.forEach(inp => {
    const note = parseFloat(inp.value) || 0;
    const coeff = parseInt(inp.dataset.coeff);
    totalPoints += (note * coeff);
    totalCoeffs += coeff;
  });
  const avg = (totalPoints / totalCoeffs).toFixed(2);
  const res = el("bacResult");
  res.innerHTML = `<div style="margin-top:20px; text-align:center; background: var(--surface-solid); border: 1px solid var(--border); border-radius: 12px; padding: 24px;">
    <p style="font-size:14px; margin-bottom:8px; color: var(--text-muted);">Moyenne estimée :</p>
    <strong style="font-size:36px; color:var(--primary); display:block; margin: 8px 0;">${avg} / 20</strong>
    <p style="font-size:13px; margin-top:12px; padding: 8px 16px; border-radius: 8px; background: ${avg >= 10 ? 'rgba(0,200,150,0.15)' : 'rgba(230,57,70,0.15)'}; color: ${avg >= 10 ? '#00C896' : '#e63946'}; font-weight: 600;">${avg >= 10 ? "Félicitations, vous seriez admis !" : "Continuez vos efforts pour atteindre la moyenne !"}</p>
  </div>`;
};

const PLANNER_KEY = "cesi-planner-data";
const PLANNER_TIMES = ["08:00-09:30", "09:30-10:00", "10:00-11:30", "11:30-12:00", "12:00-13:00", "13:00-14:30", "14:30-15:00", "15:00-16:30", "16:30-17:00", "17:00-18:30"];
const PLANNER_DAYS = ["Sam", "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven"];
const PLANNER_BREAK_SLOTS = [1, 3, 4, 8]; // indices of break rows (pause/déjeuner)

function loadPlannerData() {
  try { return JSON.parse(localStorage.getItem(PLANNER_KEY)) || {}; } catch { return {}; }
}

function savePlannerData(data) {
  localStorage.setItem(PLANNER_KEY, JSON.stringify(data));
}

window.renderPlannerGrid = function() {
  const grid = el("plannerGrid");
  const legend = el("plannerLegend");
  if (!grid) return;

  const data = loadPlannerData();
  const isBreak = (ri) => PLANNER_BREAK_SLOTS.includes(ri);

  let html = `<table style="width:100%; border-collapse:collapse; font-size:12px; min-width:700px;">
    <thead><tr>
      <th style="padding:8px 6px; background:var(--primary); color:#fff; border:1px solid rgba(255,255,255,0.2); font-size:11px; min-width:90px; position:sticky; left:0; z-index:2;">Horaire</th>`;
  PLANNER_DAYS.forEach(d => {
    html += `<th style="padding:8px 6px; background:var(--primary); color:#fff; border:1px solid rgba(255,255,255,0.2); font-size:12px; font-weight:700; text-align:center;">${d}</th>`;
  });
  html += `</tr></thead><tbody>`;

  PLANNER_TIMES.forEach((time, ri) => {
    const brk = isBreak(ri);
    const rowBg = brk ? "rgba(0,200,150,0.08)" : (ri % 2 === 0 ? "var(--chat-bot-bg)" : "var(--surface-solid)");
    const label = brk ? (ri === 4 ? "Déjeuner" : "Pause") : "";

    html += `<tr>
      <td style="padding:6px 8px; font-weight:600; font-family:monospace; background:${rowBg}; border:1px solid var(--border); white-space:nowrap; position:sticky; left:0; z-index:1; font-size:11px;">${time}${label ? `<br><span style="font-size:10px; color:#00C896; font-family:sans-serif;">${label}</span>` : ""}</td>`;

    PLANNER_DAYS.forEach((d, ci) => {
      const key = `${ri}-${ci}`;
      const val = data[key] || (brk ? (ri === 4 ? "Déjeuner" : "Pause") : "");
      const cellBg = brk ? "rgba(0,200,150,0.08)" : rowBg;

      html += `<td
        contenteditable="true"
        data-key="${key}"
        style="padding:6px 8px; border:1px solid var(--border); background:${cellBg}; text-align:center; min-width:80px; cursor:text; outline:none; transition: background 0.15s; font-size:12px;"
        onfocus="this.style.background='rgba(200,25,91,0.08)'; this.style.outline='2px solid var(--primary)';"
        onblur="this.style.background='${cellBg}'; this.style.outline='none'; savePlannerCell(this);"
      >${escapeHtml(val)}</td>`;
    });
    html += `</tr>`;
  });

  html += `</tbody></table>`;
  grid.innerHTML = html;

  if (legend) {
    legend.innerHTML = `<div style="display:flex; gap:12px; flex-wrap:wrap; font-size:11px; color:var(--text-muted); padding:8px; background:var(--chat-bot-bg); border-radius:8px; border:1px solid var(--border);">
      <span>Cliquez sur une cellule pour taper votre matière</span>
      <span style="color:var(--primary); font-weight:600;">Les modifications sont sauvegardées automatiquement</span>
    </div>`;
  }
};

window.savePlannerCell = function(cell) {
  const key = cell.dataset.key;
  const data = loadPlannerData();
  data[key] = cell.textContent.trim();
  savePlannerData(data);
};

window.generatePlan = function() {
  const stream = el("planStream")?.value || "Sciences";
  const coeffs = BAC_COEFFS[stream] || BAC_COEFFS["Sciences"];
  const subjects = Object.entries(coeffs).sort((a, b) => b[1] - a[1]).map(e => e[0]);
  const data = {};

  PLANNER_TIMES.forEach((_, ri) => {
    const brk = PLANNER_BREAK_SLOTS.includes(ri);
    PLANNER_DAYS.forEach((_, ci) => {
      const key = `${ri}-${ci}`;
      if (brk) {
        data[key] = ri === 4 ? "Déjeuner" : "Pause";
      } else {
        // Rotate subjects across days and slots
        const idx = (ri + ci) % subjects.length;
        data[key] = subjects[idx];
      }
    });
  });

  savePlannerData(data);
  renderPlannerGrid();
};

window.clearPlanner = function() {
  localStorage.removeItem(PLANNER_KEY);
  renderPlannerGrid();
};

window.calcBudget = () => {
  const food = parseFloat(el("bgFood").value) || 0;
  const trans = parseFloat(el("bgTrans").value) || 0;
  const misc = parseFloat(el("bgMisc").value) || 0;
  const total = food + trans + misc;
  const res = el("budgetResult");
  res.innerHTML = `<div class="simResult" style="margin-top:20px; text-align:center;">
    <p style="font-size:14px; margin-bottom:5px;">Total estimé par mois :</p>
    <strong style="font-size:24px; color:var(--primary);">${total.toLocaleString()} DZD</strong>
    <p style="font-size:11px; margin-top:10px; opacity:0.8;">Note: Le ticket de Resto U est à 1.20 DA, le reste du budget couvre les extras et le transport.</p>
  </div>`;
};

window.calculateBourse = () => {
  const inc = parseInt(el("simIncome").value);
  const dist = parseInt(el("simDistance").value);
  const res = el("bourseResult");
  if (inc < 45000) {
    res.innerHTML = `<div class="simResult">Éligibilité probable : <strong>OUI</strong><br><small>Vous pourriez recevoir environ 4050 DA / trimestre + accès au transport.</small></div>`;
  } else {
    res.innerHTML = `<div class="simResult">Éligibilité probable : <strong>À VÉRIFIER</strong><br><small>Vos revenus dépassent les plafonds automatiques, contactez l'ONOU.</small></div>`;
  }
};

let riasecScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
function renderSchoolsList(query = "", loc = "ALL") {
  const list = el("schoolsList");
  if (!list) return;
  list.innerHTML = "";
  
  const q = query.toLowerCase();
  const filtered = SCHOOLS.filter(s => {
    const matchLoc = (loc === "ALL" || s.loc === loc);
    const matchQuery = s.name.toLowerCase().includes(q) || s.type.toLowerCase().includes(q) || (s.wilaya && s.wilaya.toLowerCase().includes(q));
    return matchLoc && matchQuery;
  });

  if (filtered.length === 0) {
    list.innerHTML = "<p style='color: var(--text-muted);'>Aucun établissement ne correspond à votre recherche.</p>";
    return;
  }

  filtered.forEach((s) => {
    const card = document.createElement("div");
    card.className = "schoolCard";
    card.innerHTML = `<strong>${s.name}</strong> <span style="font-size: 11px; opacity: 0.7;">[${s.type}]</span><br>
      <span style="font-size: 12px; font-weight: 700; color: var(--primary);">${s.wilaya || s.loc}</span><br>
      <small>${s.note}</small><br>
      <a href="https://${s.site}" target="_blank">${s.site}</a>`;
    list.appendChild(card);
  });
}

const TRANSLATIONS = {
  fr: {
    title: "Chatbot d’orientation (Algérie)",
    subtitle: "Questionnaire intelligent • Recommandations • Fiches détaillées",
    nav_chat: "Conseiller IA",
    nav_results: "Mes résultats",
    nav_tools: "Outils",
    nav_resources: "Ressources",
    nav_faq: "FAQ",
    bac_countdown: "Baccalauréat 2026",
    lang_btn: "FR/AR/EN",
    stat_students: "300k+ diplômés / an",
    stat_schools: "100+ Établissements",
    stat_courses: "500+ Formations",
    tool_bourse: "Bourse",
    tool_glossary: "LMD",
    tool_schools: "Écoles",
    tool_checklist: "Documents",
    tool_zen: "Zen",
    tool_riasec: "Test RIASEC",
    tool_simul: "Moyenne Bac",
    tool_dates: "Dates",
    tool_stories: "Parcours",
    tool_exams: "Sujets",
    tool_market: "Emploi",
    q_title: "Questionnaire intelligent",
    q_sub: "Donne quelques infos de contexte. Elles aident à adapter les conseils (sans te juger).",
    q_moy: "Moyenne (sur 20)",
    q_serie: "Série du bac",
    q_ville: "Ville",
    q_btn_next: "Continuer",
    q_btn_prev: "Retour",
    chat_welcome_title: "BIENVENUE",
    chat_welcome_body: "Je vais t'aider à choisir une filière de façon claire et bienveillante. Commence par le questionnaire à gauche. Ensuite, tu pourras poser des questions libres.",
    chat_input_placeholder: "Pose une question (débouchés, salaires, LMD, PROGRES, bourses...)",
    chat_btn_send: "Envoyer",
  },
  ar: {
    title: "بوت التوجيه الجامعي (الجزائر)",
    subtitle: "استبيان ذكي • توصيات • بطاقات مفصلة",
    nav_chat: "مستشار الذكاء الاصطناعي",
    nav_results: "نتائجي",
    nav_tools: "الأدوات",
    nav_resources: "المصادر",
    nav_faq: "الأسئلة الشائعة",
    bac_countdown: "بكالوريا 2026",
    lang_btn: "العربية",
    stat_students: "+300 ألف خريج / سنة",
    stat_schools: "+100 مؤسسة",
    stat_courses: "+500 تخصص",
    tool_bourse: "المنحة",
    tool_glossary: "LMD",
    tool_schools: "المدارس",
    tool_checklist: "الوثائق",
    tool_zen: "Zen",
    tool_riasec: "الاختبار",
    tool_simul: "المعدل",
    tool_dates: "التواريخ",
    tool_stories: "تجارب",
    tool_exams: "الحوليات",
    tool_market: "الوظائف",
    q_title: "استبيان ذكي",
    q_sub: "أدخل بعض المعلومات لمساعدتنا في تقديم أفضل النصائح لك (بدون أحكام).",
    q_moy: "المعدل (من 20)",
    q_serie: "شعبة البكالوريا",
    q_ville: "المدينة",
    q_btn_next: "استمرار",
    q_btn_prev: "رجوع",
    chat_welcome_title: "أهلاً بك",
    chat_welcome_body: "سأساعدك في اختيار تخصصك الجامعي بوضوح ومودة. ابدأ بملء الاستبيan على اليسار، ثم يمكنك طرح أي سؤال تريد.",
    chat_input_placeholder: "اطرح سؤالاً (تخصصات، رواتب، منحة، تسجيلات...)",
    chat_btn_send: "إرسال",
  },
  en: {
    title: "Orientation Chatbot (Algeria)",
    subtitle: "Intelligent Quiz • Recommendations • Detailed Sheets",
    nav_chat: "AI Advisor",
    nav_results: "My Results",
    nav_tools: "Tools",
    nav_resources: "Resources",
    nav_faq: "FAQ",
    bac_countdown: "Baccalaureate 2026",
    lang_btn: "English",
    stat_students: "300k+ Graduates / Year",
    stat_schools: "100+ Institutions",
    stat_courses: "500+ Programs",
    tool_bourse: "Scholarship",
    tool_glossary: "LMD",
    tool_schools: "Schools",
    tool_checklist: "Documents",
    tool_zen: "Zen",
    tool_riasec: "RIASEC",
    tool_simul: "Bac GPA",
    tool_dates: "Dates",
    tool_stories: "Stories",
    tool_exams: "Subjects",
    tool_market: "Jobs",
    q_title: "Intelligent Questionnaire",
    q_sub: "Provide some context to help us adapt our advice to your profile.",
    q_moy: "GPA (out of 20)",
    q_serie: "High School Stream",
    q_ville: "City",
    q_btn_next: "Continue",
    q_btn_prev: "Back",
    chat_welcome_title: "WELCOME",
    chat_welcome_body: "I will help you choose your path clearly and kindly. Start with the questionnaire on the left, then feel free to ask any questions.",
    chat_input_placeholder: "Ask a question (career paths, salaries, scholarship, registration...)",
    chat_btn_send: "Send",
  }
};

function t(key) {
  return TRANSLATIONS[currentLang][key] || key;
}

let currentLang = "fr";

function updateUILanguage() {
  const tr = TRANSLATIONS[currentLang];
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  
  const btnLang = el("btnLang");
  if (btnLang) btnLang.textContent = tr.lang_btn;
  
  const topTitle = document.querySelector(".topbarTitle");
  if (topTitle) topTitle.textContent = tr.title;
  
  const topSub = document.querySelector(".topbarSub");
  if (topSub) topSub.textContent = tr.subtitle;
  
  const sideBtns = document.querySelectorAll(".sideNavBtn");
  if (sideBtns.length >= 5) {
    sideBtns[0].textContent = tr.nav_chat;
    sideBtns[1].textContent = tr.nav_results;
    sideBtns[2].textContent = tr.nav_resources;
    sideBtns[3].textContent = tr.nav_tools;
    sideBtns[4].textContent = tr.nav_faq;
  }

  const topBtns = document.querySelectorAll(".topNavBtn");
  if (topBtns.length >= 5) {
    topBtns[0].textContent = tr.nav_chat;
    topBtns[1].textContent = tr.nav_results;
    topBtns[2].textContent = tr.nav_tools;
    topBtns[3].textContent = tr.nav_resources;
    topBtns[4].textContent = tr.nav_faq;
  }

  // Questionnaire
  const qTitle = document.querySelector(".panelTitle");
  if (qTitle) qTitle.textContent = tr.q_title;
  
  const qSub = document.querySelector(".panelDesc");
  if (qSub) qSub.textContent = tr.q_sub;
  
  const labels = document.querySelectorAll(".wizard label");
  if (labels.length >= 3) {
    if (labels[0].childNodes[0]) labels[0].childNodes[0].textContent = tr.q_moy;
    if (labels[1].childNodes[0]) labels[1].childNodes[0].textContent = tr.q_serie;
    if (labels[2].childNodes[0]) labels[2].childNodes[0].textContent = tr.q_ville;
  }
  
  const btnNext = el("btnNext");
  if (btnNext) btnNext.textContent = tr.q_btn_next;
  
  const btnPrev = el("btnPrev");
  if (btnPrev) btnPrev.textContent = tr.q_btn_prev;

  // Chat
  const welcomeMsg = document.querySelector(".chatMessage--bot");
  if (welcomeMsg) {
    const strong = welcomeMsg.querySelector("strong");
    if (strong) strong.textContent = tr.chat_welcome_title;
    const div = welcomeMsg.querySelector("div");
    if (div) div.textContent = tr.chat_welcome_body;
  }
  
  const freeInput = el("freeInput");
  if (freeInput) freeInput.placeholder = tr.chat_input_placeholder;
  
  const btnSend = el("btnSend");
  if (btnSend) btnSend.textContent = tr.chat_btn_send;

  // Stats
  const statLabels = document.querySelectorAll(".statLabel");
  if (statLabels.length >= 3) {
    statLabels[0].textContent = tr.stat_students;
    statLabels[1].textContent = tr.stat_schools;
    statLabels[2].textContent = tr.stat_courses;
  }

  // Tool Tabs
  document.querySelectorAll(".toolTabBtn").forEach(btn => {
    const toolKey = "tool_" + btn.dataset.tool;
    if (tr[toolKey]) btn.textContent = tr[toolKey];
  });

  const cdLabel = document.querySelector(".sideSection--countdown .sideLabel");
  if (cdLabel) cdLabel.textContent = tr.bac_countdown;
  
  renderTools(state.activeTool || "bourse");
}

function toggleLanguage() {
  const langs = ["fr", "ar", "en"];
  let idx = langs.indexOf(currentLang);
  currentLang = langs[(idx + 1) % langs.length];
  updateUILanguage();
  saveState();
}

function renderRiasecQuiz() {
  const quiz = el("riasec-quiz");
  if (!quiz) return;
  quiz.innerHTML = "";
  RIASEC_QUESTIONS.forEach((q, i) => {
    const row = document.createElement("div");
    row.style.marginBottom = "18px";
    row.innerHTML = `<p style="margin-bottom: 8px; font-weight: 600;">${q.q}</p>
      <div style="display: flex; gap: 8px;">
        <button class="btn" onclick="scoreRiasec('${q.type}', 1, this)">OUI</button>
        <button class="btn" onclick="scoreRiasec('${q.type}', 0, this)">NON</button>
      </div>`;
    quiz.appendChild(row);
  });
}

window.scoreRiasec = (type, val, btn) => {
  riasecScores[type] = val;
  const parent = btn.parentElement;
  parent.querySelectorAll("button").forEach((b) => {
    b.style.background = "transparent";
    b.style.color = "var(--text-muted)";
    b.style.borderColor = "var(--border)";
  });
  btn.style.background = "var(--primary)";
  btn.style.color = "#fff";
  btn.style.borderColor = "var(--primary)";
};

window.calculateRiasec = () => {
  const labels = { R: "Réaliste", I: "Investigateur", A: "Artistique", S: "Social", E: "Entreprenant", C: "Conventionnel" };
  const desc = {
    R: "Vous aimez l'action, le concret et le travail en extérieur ou avec des outils.",
    I: "Vous avez soif de comprendre, d'analyser et de résoudre des problèmes complexes.",
    A: "Vous privilégiez l'expression personnelle, l'innovation et l'esthétique.",
    S: "Vous êtes tourné vers les autres, l'entraide, le conseil et l'enseignement.",
    E: "Vous aimez convaincre, diriger des projets et relever des défis ambitieux.",
    C: "Vous appréciez l'ordre, la précision, les données et les processus clairs."
  };
  const examples = {
    R: "Ingénierie (ST), Architecture, Travaux Publics, Agronomie.",
    I: "Médecine, Informatique (IA/Data), Recherche Scientifique, Physique.",
    A: "Architecture d'intérieur, Design, Communication, Arts et Culture.",
    S: "Enseignement (ENS), Psychologie, Médecine (Soin), Paramédical.",
    E: "Management, Commerce, Droit, Marketing, Entrepreneuriat.",
    C: "Comptabilité, Finance, Logistique, Administration, Informatique de gestion."
  };
  
  let maxType = "R";
  let maxScore = -1;
  for (let t in riasecScores) {
    if (riasecScores[t] > maxScore) {
      maxScore = riasecScores[t];
      maxType = t;
    }
  }

  const res = el("riasec-result");
  if (maxScore === 0) {
    res.innerHTML = `<div class="simResult" style="background: var(--text-muted);">Veuillez répondre à quelques questions pour voir un résultat.</div>`;
  } else {
    res.innerHTML = `
      <div class="simResult" style="text-align: left;">
        <p style="font-size: 14px; margin-bottom: 5px; opacity: 0.9;">Votre profil dominant :</p>
        <strong style="font-size: 20px; display: block; margin-bottom: 10px;">${labels[maxType]}</strong>
        <p style="margin-bottom: 15px;">${desc[maxType]}</p>
        <div style="background: rgba(255,255,255,0.15); padding: 10px; border-radius: 8px;">
          <p style="font-weight: 700; font-size: 12px; margin-bottom: 5px; text-transform: uppercase;">Filières recommandées :</p>
          <p style="font-size: 14px;">${examples[maxType]}</p>
        </div>
        <p style="font-size: 11px; margin-top: 15px; opacity: 0.8; font-style: italic;">Note : Ce test est un indicateur rapide. Un conseiller d'orientation peut vous aider à approfondir ce résultat.</p>
      </div>`;
  }
};

function init() {
  loadState();
  currentLang = state.lang || "fr";
  if (!["chat", "results", "tools", "resources", "faq"].includes(state.activeSection)) state.activeSection = "chat";

  setTheme(state.theme);
  updateUILanguage();
  initCountdown();

  renderResourcesMini();
  renderResourcesFull();
  renderCalendar();
  renderExtraResources();
  renderFaq();
  renderChips();
  renderTools();

  document.querySelectorAll(".sideNavBtn, .topNavBtn").forEach((btn) => {
    btn.addEventListener("click", () => showSection(btn.getAttribute("data-section") || "chat"));
  });

  document.querySelectorAll(".toolTabBtn").forEach((btn) => {
    btn.addEventListener("click", () => renderTools(btn.getAttribute("data-tool")));
  });

  el("btnMenu")?.addEventListener("click", openSidebarMobile);
  el("sidebarOverlay")?.addEventListener("click", closeSidebarMobile);

  el("btnNext")?.addEventListener("click", handleNext);
  el("btnPrev")?.addEventListener("click", handlePrev);

  el("btnSend")?.addEventListener("click", handleFreeChat);
  el("freeInput")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleFreeChat();
  });

  el("btnReset")?.addEventListener("click", resetAll);
  el("btnLang")?.addEventListener("click", toggleLanguage);
  el("btnTheme")?.addEventListener("click", () => setTheme(state.theme === "dark" ? "light" : "dark"));
  el("btnShare")?.addEventListener("click", shareResults);

  el("btnExport")?.addEventListener("click", exportTranscript);
  el("btnPdf")?.addEventListener("click", exportPdf);
  el("btnCloseDialog")?.addEventListener("click", () => el("exportDialog").close());
  el("btnCopy")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(el("exportText").value);
      el("btnCopy").textContent = "Copié";
      setTimeout(() => (el("btnCopy").textContent = "Copier"), 900);
    } catch {
      el("btnCopy").textContent = "Impossible";
      setTimeout(() => (el("btnCopy").textContent = "Copier"), 900);
    }
  });

  renderWizard();
  hydrateResultsFromStorage();

  if (state.transcript.length) {
    const old = [...state.transcript];
    state.transcript = [];
    el("chat").innerHTML = "";
    for (const m of old) {
      const role = m.role === "bot" ? "bot" : "user";
      addMessage(role, m.title, escapeHtml(m.bodyText));
    }
  } else if (!state.lastRecommendations?.length) {
    resetAll();
  } else {
    el("chat").innerHTML = "";
    addMessage(
      "bot",
      "Bienvenue",
      "Ta session a été retrouvée : ouvre <strong>Mes résultats</strong> pour voir ton top 3, ou refais le questionnaire avec <strong>Réinitialiser</strong>."
    );
  }

  showSection(state.activeSection);
}

init();


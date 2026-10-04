import { Salon, SponsoringPackage, GalleryItem, NewsArticle, FAQItem, Sponsor } from '../types';
import { IMAGES } from '../assets/images';

export const OFFICIAL_SPONSORS: Sponsor[] = [
  { id: 's1', name: 'Wafa', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80', tier: 'Gold', category: 'Gourmandise & Papeterie' },
  { id: 's2', name: 'Millotti Espresso', logo: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&q=80', tier: 'Silver', category: 'Café & Torréfaction' },
  { id: 's3', name: 'El Mordjene (CEBON)', logo: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80', tier: 'Official', category: 'Pâte à Tartiner Premium' },
  { id: 's4', name: 'Palmary', logo: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300&q=80', tier: 'Gold', category: 'Biscuiterie & Chocolaterie' },
  { id: 's5', name: 'Tartinella', logo: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&q=80', tier: 'Partner', category: 'Pâte à Tartiner Gourmet' },
  { id: 's6', name: 'Tartinado', logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80', tier: 'Partner', category: 'Confiserie Artisanale' },
  { id: 's7', name: 'Chihuahua!', logo: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=300&q=80', tier: 'Partner', category: 'Chocolat Enfants' },
  { id: 's8', name: 'Dziriya', logo: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=300&q=80', tier: 'Partner', category: 'Pâtisserie Traditionnelle' },
  { id: 's9', name: 'Falco', logo: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&q=80', tier: 'Partner', category: 'Biscuits & Douceurs' },
  { id: 's10', name: 'Bidelice', logo: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80', tier: 'Partner', category: 'Gourmandise Lactée' },
  { id: 's11', name: 'Chocodada', logo: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&q=80', tier: 'Partner', category: 'Chocolat d\'Exception' },
  { id: 's12', name: 'Chocolatti', logo: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300&q=80', tier: 'Partner', category: 'Master Chocolatier' },
  { id: 's13', name: 'Arabiana Coffee', logo: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&q=80', tier: 'Partner', category: 'Thé & Café du Monde' },
  { id: 's14', name: 'Dydo Sweet Treats', logo: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2319d?w=300&q=80', tier: 'Partner', category: 'Douceurs Sucre' },
  { id: 's15', name: 'Maffinoo', logo: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=300&q=80', tier: 'Partner', category: 'Muffins & Cupcakes' },
  { id: 's16', name: 'Bueno Food', logo: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&q=80', tier: 'Partner', category: 'Agroalimentaire & Snacking' },
];

export const SALONS_DATA: Salon[] = [
  {
    id: 'chocorium',
    name: 'CHOCORIUM',
    tagline: 'Salon International du Chocolat, du Café et de la Gourmandise',
    edition: '2ème Édition',
    date: 'Du 23 au 26 Septembre 2026',
    startDate: '2026-09-23T09:00:00Z',
    location: 'Alger, Algérie',
    pavilion: 'Pavillon Casbah',
    venue: 'Palais des Expositions SAFEX - Alger',
    accentColor: '#D4AF37', // Luxury Gold
    secondaryColor: '#3D2314', // Roasted Cacao
    themeClass: 'chocorium-theme',
    heroImage: IMAGES.chocorium2026Poster,
    description: 'Plongez dans un univers d\'arômes envoûtants, de créations chocolatées rares, d\'artisans pâtissiers de renom et d\'expériences gustatives inoubliables.',
    longDescription: 'Chocorium est le rendez-vous incontournable des professionnels du cacao, des chocolatiers d\'exception, des torréfacteurs de café et des amoureux de la haute gourmandise. Pour sa 2ème édition au Pavillon Casbah de la SAFEX, le salon réunit plus de 50 exposants majeurs, 300 marques internationales et plus de 10 000 visiteurs qualifiés.',
    stats: [
      { value: '+50', label: 'Exposants Nationaux & Internationaux' },
      { value: '+10 000', label: 'Visiteurs Attendus' },
      { value: '+300', label: 'Marques Présentes' },
      { value: '3 000 m²', label: 'd\'Exposition Immersive' }
    ],
    worlds: [
      {
        name: 'Chocolat & Cacao',
        description: 'Tablettes grand cru, pralines artisanales, fèves rares, chocolats d\'origine et matières premières d\'exception.',
        icon: 'Cookie',
        image: IMAGES.chocoriumPalmaryStand
      },
      {
        name: 'Artisans & Créateurs',
        description: 'Maîtres chocolatiers, pâtissiers d\'exception, démonstrations en direct et ateliers signatures par des grands chefs.',
        icon: 'ChefHat',
        image: IMAGES.chocoriumInauguration
      },
      {
        name: 'Café & Boissons Gourmandes',
        description: 'Sélection des meilleurs cafés du monde, thés parfumés, chocolats chauds onctueux et baristas d\'élite.',
        icon: 'Coffee',
        image: IMAGES.chocoriumMillottiCoffee
      },
      {
        name: 'Bonbons & Douceurs',
        description: 'Confiserie fine, mignardises, nougats traditionnels, biscuits d\'artisanat et créations sucrées innovantes.',
        icon: 'Candy',
        image: IMAGES.chocoriumTartinellaTasting
      }
    ],
    targetVisitors: [
      'Amateurs de chocolat, café et douceurs artisanales',
      'Familles & enfants en quête de moments gourmands et pédagogiques',
      'Professionnels : pâtissiers, chocolatiers, hôteliers, restaurateurs, acheteurs B2B',
      'Passionnés de café, baristas et spécialistes des boissons fines',
      'Entreprises à la recherche de coffrets cadeaux d\'affaires haut de gamme'
    ],
    sponsors: OFFICIAL_SPONSORS
  },
  {
    id: 'milktec',
    name: 'MILKTEC',
    tagline: 'Salon International du Lait et des Industries Laitières',
    edition: '1ère Édition',
    date: 'Du 23 au 26 Septembre 2026',
    startDate: '2026-09-23T09:00:00Z',
    location: 'Alger, Algérie',
    pavilion: 'Pavillon Casbah',
    venue: 'Palais des Expositions SAFEX - Alger',
    accentColor: '#00B4D8', // Glacier Cyan
    secondaryColor: '#0B192C', // Deep Midnight Blue
    themeClass: 'milktec-theme',
    heroImage: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1200&q=80',
    description: 'Du Terroir à la Technologie : la première plateforme B2B & B2C dédiée exclusivement à la filière laitière, la transformation industrielle et le packaging en Algérie.',
    longDescription: 'MILKTEC Algérie est le salon d\'excellence rassemblant l\'écosystème laitier complet. Organisé en synergie dans le même pavillon que CHOCORIUM, MILKTEC combine l\'authenticité du terroir algérien aux technologies industrielles de pointe : lignes de transformation, chaîne du froid, emballage et dérivés laitiers.',
    stats: [
      { value: '+50', label: 'Exposants Industriels' },
      { value: '+5 000', label: 'Décideurs & Professionnels' },
      { value: '3 000 m²', label: 'Surface d\'Exposition Technologique' },
      { value: '100%', label: 'Synergie B2B & B2C' }
    ],
    worlds: [
      {
        name: 'Produits Laitiers & Marques',
        description: 'Lait frais, fromages affinés du terroir, beurres, crèmes, yaourts et desserts lactés innovants.',
        icon: 'Milk',
        image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&q=80'
      },
      {
        name: 'Transformation & Industrie Laitière',
        description: 'Équipements industriels, cuves de pasteurisation, lignes d\'homogénéisation et solutions d\'automatisation.',
        icon: 'Factory',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80'
      },
      {
        name: 'Chaîne du Froid & Logistique',
        description: 'Chambres froides, camions frigo, capteurs de température IoT et gestion de chaîne logistique frigorifique.',
        icon: 'Snowflake',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80'
      },
      {
        name: 'Emballage & Conditionnement',
        description: 'Solutions d\'emballage écologiques, briques stériles, étiquetage haute précision et bouteilles technologiques.',
        icon: 'Package',
        image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&q=80'
      }
    ],
    targetVisitors: [
      'Industriels de la transformation laitière & agroalimentaire',
      'Artisans fromagers et coopératives agricoles',
      'Fournisseurs d\'équipements, emballages et solutions de stockage frigorifique',
      'Distributeurs, grandes surfaces, centrales d\'achat et acheteurs institutionnels',
      'Investisseurs et porteurs de projets dans la filière laitière en Algérie'
    ],
    sponsors: OFFICIAL_SPONSORS.filter(s => ['s1', 's2', 's3', 's4', 's10', 's16'].includes(s.id))
  },
  {
    id: 'clinica',
    name: 'CLINICA',
    tagline: 'Salon International de la Santé, du Matériel Médical et des Technologies de Soin',
    edition: 'Édition 2027 (À venir)',
    date: 'Printemps 2027',
    startDate: '2027-04-15T09:00:00Z',
    location: 'Alger, Algérie',
    pavilion: 'Palais des Expositions SAFEX',
    venue: 'SAFEX Exhibition Center',
    accentColor: '#00F5D4', // Emerald Medical Teal
    secondaryColor: '#0B1320', // Slate Night
    themeClass: 'clinica-theme',
    heroImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1200&q=80',
    description: 'La vitrine internationale des avancées médicales, des équipements de santé de pointe et de l\'innovation hospitalière en Afrique du Nord.',
    longDescription: 'Prochainement intégré à la plate-forme d\'expositions prestigieuses d\'EVENSIUM, CLINICA réunira les leaders mondiaux de la technologie médicale, du diagnostic biologique, de l\'imagerie médicale et de la gestion hospitalière.',
    stats: [
      { value: '+80', label: 'Leaders Médicaux' },
      { value: '+12 000', label: 'Professionnels de Santé' },
      { value: '25+', label: 'Pays Représentés' },
      { value: '30+', label: 'Conférences Scientifiques' }
    ],
    worlds: [
      {
        name: 'Équipements & Imagerie Médicale',
        description: 'Scanner, IRM, échographie haute définition, blocs opératoires intelligents.',
        icon: 'Activity',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80'
      },
      {
        name: 'Biologie & Laboratoire',
        description: 'Automates d\'analyse, réactifs, diagnostic moléculaire et dispositifs in vitro.',
        icon: 'Microscope',
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80'
      },
      {
        name: 'Dispositifs Médicaux & Consommables',
        description: 'Implants, matériel de chirurgie, mobilier médical et hygiène hospitalière.',
        icon: 'Stethoscope',
        image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80'
      },
      {
        name: 'E-Santé & Télémédecine',
        description: 'Logiciels hospitaliers, IA pour le diagnostic, télémédecine et santé connectée.',
        icon: 'Cpu',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
      }
    ],
    targetVisitors: [
      'Médecins spécialistes, chirurgiens et praticiens',
      'Directeurs d\'hôpitaux et cliniques privées',
      'Biologistes, pharmaciens et ingénieurs biomédicaux',
      'Ministères, organismes publics et investisseurs en santé'
    ],
    sponsors: []
  }
];

export const SPONSORING_PACKAGES: SponsoringPackage[] = [
  {
    id: 'pack_gourmand',
    title: 'Sponsor Gourmand — Premium',
    priceDZD: 3000000,
    formattedPrice: '3 000 000 DZD',
    badge: 'Partenaire Officiel du Salon',
    description: 'Le plus haut niveau d\'exposition et de visibilité exclusive sur l\'ensemble des canaux médias et dans l\'enceinte du pavillon.',
    highlight: true,
    features: [
      'Stand Premium de 30 m² idéalement situé à l\'entrée principale',
      'Présence renforcée sur affichage urbain, campagnes digitales, TV & radio',
      'Branding exclusif sur les signalétiques du salon & badges officiels',
      'Logo Gold sur le backdrop de presse et les cérémonies d\'inauguration',
      'Invitations VIP illimitées & opportunités de PR/Relations Publiques',
      'Post-event reportage vidéo dédié & interview du CEO'
    ]
  },
  {
    id: 'pack_kids',
    title: 'Sponsor Choco Kids — Univers Enfants',
    priceDZD: 2000000,
    formattedPrice: '2 000 000 DZD',
    badge: 'Naming d\'Espace Exclusif',
    description: 'Espace immersif entièrement aux couleurs de votre marque, dédié aux animations pour enfants et familles.',
    features: [
      'Naming officiel "Choco Kids by [Votre Marque]"',
      'Habillage intégral de l\'espace d\'ateliers créatifs & gourmands',
      'Présence d\'une mascotte personnalisée intégrée aux animations',
      'Sponsoring des cadeaux, toques de chef et tabliers enfants',
      'Forte visibilité émotionnelle et couverture sur les réseaux sociaux'
    ]
  },
  {
    id: 'pack_chocopack',
    title: 'Sponsor ChocoPack — Accueil & Sacs',
    priceDZD: 1000000,
    formattedPrice: '1 000 000 DZD (Pack Complet)',
    badge: 'Visibilité 100% Dès l\'Entrée',
    description: 'Branding de la zone d\'enregistrement, fourniture des sacs visiteurs et lanières de badges personnalisées.',
    features: [
      'Habillage de la zone d\'accueil et guichets d\'enregistrement',
      'Distribution de 10 000+ sacs visiteurs aux couleurs de votre marque',
      'Lanières/cordons de badges personnalisés portés par tous les visiteurs',
      'Option partielle disponible (700 000 DZD) selon votre besoin'
    ]
  },
  {
    id: 'pack_show',
    title: 'Sponsor Choco Show — Atelier Signature',
    priceDZD: 800000,
    formattedPrice: '800 000 DZD',
    badge: 'Mise en Avant Masterclass',
    description: 'Journée exclusive dédiée avec un chef de renom pour animer un atelier ou démonstration culinaire.',
    features: [
      'Espace masterclass entièrement habillé aux couleurs du sponsor',
      'Show culinaire diffusé sur écrans géants et live social media',
      'Dégustation directe des créations intégrant vos produits',
      'Mention systématique par l\'animateur sur la scène principale'
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Coupure Officielle du Ruban — Inauguration CHOCORIUM',
    salonId: 'chocorium',
    type: 'photo',
    url: IMAGES.chocoriumInauguration,
    thumbnail: IMAGES.chocoriumInauguration,
    category: 'Cérémonie',
    caption: 'Inauguration officielle du Salon International du Chocolat, Café & Gourmandise au Pavillon SAFEX avec le Master Chef et les dignitaires.'
  },
  {
    id: 'g2',
    title: 'Stand Palmary — Dégustation Gourmande & Animation',
    salonId: 'chocorium',
    type: 'photo',
    url: IMAGES.chocoriumPalmaryStand,
    thumbnail: IMAGES.chocoriumPalmaryStand,
    category: 'Exposants',
    caption: 'Distribution d\'échantillons de biscuits Palmary Gourmand et cookies par l\'hôtesse aux visiteurs du salon.'
  },
  {
    id: 'g3',
    title: 'Stand Millotti Espresso — Torréfaction & Barista Corner',
    salonId: 'chocorium',
    type: 'photo',
    url: IMAGES.chocoriumMillottiCoffee,
    thumbnail: IMAGES.chocoriumMillottiCoffee,
    category: 'Café & Barista',
    caption: 'Dégustation d\'espresso fraîchement extrait sur le bar à café de torréfaction Millotti.'
  },
  {
    id: 'g4',
    title: 'Stand Tartinella — Pâte à Tartiner Gourmet & Crêpes',
    salonId: 'chocorium',
    type: 'photo',
    url: IMAGES.chocoriumTartinellaTasting,
    thumbnail: IMAGES.chocoriumTartinellaTasting,
    category: 'Exposants',
    caption: 'Présentation de la gamme Tartinella au noisette gourmand et dégustation de crêpes fraîches au stand.'
  },
  {
    id: 'g5',
    title: 'Présentation des Technologies Laitières MILKTEC',
    salonId: 'milktec',
    type: 'photo',
    url: IMAGES.milktecHeroBg,
    thumbnail: IMAGES.milktecHeroBg,
    category: 'Technologie',
    caption: 'Équipements de pointe pour la transformation laitière B2B'
  },
  {
    id: 'g6',
    title: 'Ambiance Générale du Pavillon Casbah — Affluence Record',
    salonId: 'evensium',
    type: 'photo',
    url: IMAGES.evensiumHeroBg,
    thumbnail: IMAGES.evensiumHeroBg,
    category: 'Atmosphère',
    caption: 'Des milliers de visiteurs réunis pour l\'excellence événementielle'
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'n1',
    title: 'CHOCORIUM & MILKTEC 2026 : Le Pavillon Casbah SAFEX aux couleurs de l\'Innovation',
    summary: 'EVENSIUM annonce la tenue simultanée de ses deux salons phares du 23 au 26 septembre 2026 à Alger, offrant une synergie unique entre gourmandise et technologie laitière.',
    content: 'Du 23 au 26 septembre 2026, le Palais des Expositions d\'Alger (SAFEX) accueillera l\'événement agroalimentaire le plus attendu de l\'année. EVENSIUM réunit sous le Pavillon Casbah la 2ème édition de CHOCORIUM (Salon du Chocolat, Café et Gourmandise) et la 1ère édition de MILKTEC (Salon du Lait et des Industries Laitières). Plus de 100 exposants majeurs et 15 000 visiteurs sont attendus.',
    date: '18 Juillet 2026',
    category: 'Communiqué',
    image: IMAGES.chocoriumHeroBg,
    author: 'Direction Communication EVENSIUM',
    readTime: '3 min'
  },
  {
    id: 'n2',
    title: 'Sponsoring & Partenariats : Wafa, Millotti, Palmary et CEBON renouvellent leur confiance',
    summary: 'Les plus grands fleurons industriels et gourmands s\'associent à EVENSIUM pour garantir une visibilité d\'exception lors de la prochaine édition.',
    content: 'Les géants nationaux et internationaux de l\'industrie gourmande confirment leur engagement aux côtés d\'EVENSIUM. Wafa s\'impose comme Sponsor Gold, Millotti Espresso comme Sponsor Silver, accompagnés par Palmary, El Mordjene (CEBON), Tartinella et bien d\'autres marques emblématiques.',
    date: '05 Juillet 2026',
    category: 'Presse',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
    author: 'Rédaction EVENSIUM',
    readTime: '4 min'
  },
  {
    id: 'n3',
    title: 'Pourquoi l\'Algérie devient le pôle d\'attraction des salons professionnels en Afrique du Nord',
    summary: 'Analyse sur la dynamique du marché algérien, l\'émergence de nouveaux savoir-faire locaux et le rôle stratégique des salons organisés par EVENSIUM.',
    content: 'Avec un marché agroalimentaire en constante expansion et une volonté affirmée de valoriser le terroir tout en intégrant les technologies mondiales, l\'Algérie se positionne en leader régional. EVENSIUM impulse cette transformation à travers des plateformes d\'affaires et de visibilité internationales.',
    date: '22 Juin 2026',
    category: 'Innovation',
    image: IMAGES.evensiumHeroBg,
    author: 'Expertise Événementielle',
    readTime: '5 min'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Où se déroulent les salons CHOCORIUM et MILKTEC 2026 ?',
    answer: 'Les deux salons se déroulent simultanément au Palais des Expositions d\'Alger (SAFEX), sous le prestigieux Pavillon Casbah, du 23 au 26 septembre 2026.',
    category: 'Général'
  },
  {
    question: 'Comment puis-je réserver un stand pour mon entreprise ?',
    answer: 'Vous pouvez utiliser notre simulateur de stand en ligne dans la rubrique "Devenir Exposant" ou contacter notre équipe commerciale directement au +213(0) 559 46 07 37 / +213(0) 555 00 28 11 ou par email à ops@evensium.com.',
    category: 'Exposants'
  },
  {
    question: 'Quelles sont les formules de sponsoring disponibles pour CHOCORIUM ?',
    answer: 'Nous proposons 4 packs d\'exception : Sponsor Gourmand (Premium - 3 000 000 DZD), Sponsor Choco Kids (2 000 000 DZD), Sponsor ChocoPack (1 000 000 DZD), et Sponsor Choco Show (800 000 DZD).',
    category: 'Exposants'
  },
  {
    question: 'L\'accès aux salons est-il ouvert au grand public ?',
    answer: 'Oui ! CHOCORIUM et MILKTEC combinent une zone d\'affaires B2B dédiée aux professionnels et des espaces d\'animations, de dégustations et d\'ateliers accessibles au grand public et aux familles.',
    category: 'Visiteurs'
  },
  {
    question: 'Comment obtenir une accréditation presse ou média ?',
    answer: 'Les journalistes et créateurs de contenu peuvent soumettre une demande dans l\'espace Presse ou nous écrire directement à zineb.taibi@evensium.com.',
    category: 'Presse'
  }
];

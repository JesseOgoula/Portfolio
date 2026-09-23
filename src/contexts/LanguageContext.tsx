import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface Translations {
  [key: string]: {
    fr: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { fr: 'Accueil', en: 'Home' },
  'nav.work': { fr: 'Projets', en: 'Work' },
  'nav.services': { fr: 'Expertises', en: 'Services' },
  'nav.collaborations': { fr: 'Collaborations', en: 'Collaborations' },
  'nav.archive': { fr: 'Archives', en: 'Archive' },
  'nav.about': { fr: 'À propos', en: 'About' },
  'nav.portfolio': { fr: 'Réalisations', en: 'Portfolio' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  'nav.status': { fr: 'DISPONIBLE POUR PROJETS & MISSIONS', en: 'AVAILABLE FOR WORK & CONTRACTS' },
  
  // Hero Section
  'hero.bigTitle1': { fr: 'LE TRAVAIL QUI', en: 'WORK THAT' },
  'hero.bigTitle2': { fr: 'COMMENCE PAR', en: 'BEGINS WITH' },
  'hero.bigTitle3': { fr: 'LA STRATÉGIE.', en: 'STRATEGY.' },
  'hero.title': { fr: 'De l’idée au produit, du talent à l’expertise.', en: 'From idea to product, from talent to expertise.' },
  'hero.subtitle': {
    fr: "Entrepreneur du numérique, Product & Growth Manager et formateur engagé : je conçois des systèmes d'identité, des produits centrés utilisateurs et des stratégies de croissance à fort impact.",
    en: "Digital entrepreneur, Product & Growth Manager and committed trainer: I build user-centric digital environments, scalable products and high-impact growth strategies."
  },
  'hero.badge1': { fr: 'PRODUCT & GROWTH MANAGER', en: 'PRODUCT & GROWTH MANAGER' },
  'hero.badge2': { fr: 'FORMATEUR DIGITAL & IA', en: 'DIGITAL & AI TRAINER' },
  'hero.location': { fr: 'Libreville, Gabon • International', en: 'Libreville, Gabon • Worldwide' },
  'hero.cta': { fr: 'Réserver un call', en: 'Book a call' },
  'hero.ctaProjects': { fr: 'Explorer les travaux', en: 'Explore Work' },
  'hero.stats.projects': { fr: 'projets réalisés', en: 'completed projects' },
  'hero.stats.growth': { fr: 'croissance moyenne', en: 'average growth' },
  'hero.stats.students': { fr: 'talents formés', en: 'talents mentored' },
  'hero.download.cv': { fr: 'Télécharger CV', en: 'Download CV' },
  'hero.role': { fr: 'Product & Growth Manager / Formateur', en: 'Product & Growth Manager / Trainer' },

  // Manifestos
  'manifesto.1': {
    fr: "NOUS REJETONS LE SUPERFLU, CONSTRUISANT DES SYSTÈMES D'IDENTITÉ ET DES ENVIRONNEMENTS DIGITAUX ANCRÉS DANS UNE CLARTÉ RADICALE, L'IMPACT ET UN SAVOIR-FAIRE SANS CONCESSION.",
    en: "WE REJECT THE SUPERFLUOUS, BUILDING IDENTITY SYSTEMS AND DIGITAL ENVIRONMENTS GROUNDED IN EXTREME CLARITY, PURPOSE, AND UNCOMPROMISED CRAFT."
  },
  'manifesto.1.highlight': { fr: "ANCRÉS", en: "GROUNDED" },
  'manifesto.2': {
    fr: "UN TRAVAIL REMARQUABLE NAÎT DE BONNES QUESTIONS. LA STRATÉGIE OFFRE LA DIRECTION, LE DESIGN LUI DONNE FORME, ET LE RAFFINEMENT GARANTIT QUE CHAQUE DÉTAIL SERT LA VISION GLOBALE.",
    en: "GOOD WORK IS BUILT ON GOOD QUESTIONS. STRATEGY PROVIDES THE DIRECTION, DESIGN GIVES IT FORM, AND REFINEMENT ENSURES EVERY DETAIL SUPPORTS THE BIGGER PICTURE."
  },
  'manifesto.2.highlight': { fr: "GARANTIT", en: "ENSURES" },

  // Featured Project
  'featured.label': { fr: 'PROJET VEDETTE', en: 'FEATURED PROJECT' },
  'featured.viewCase': { fr: 'Consulter le projet', en: 'View Case Study' },
  'featured.live': { fr: 'Plateforme en ligne', en: 'Live Platform' },
  'featured.stack': { fr: 'STACK & MÉTHODOLOGIE', en: 'STACK & METHODOLOGY' },
  
  // Interactive Services
  'services.sectionTitle': { fr: 'SERVICES & EXPERTISES', en: 'SERVICES & CAPABILITIES' },
  'services.title': { fr: 'Mes Expertises', en: 'Capabilities' },
  'services.subtitle': { fr: 'Une approche stratégique, mesurée et orientée résultats pour transformer votre vision.', en: 'A strategic, measured and outcome-driven approach to scale your vision.' },
  'services.consulting.title': { fr: 'GROWTH STRATEGY & AUDIT', en: 'GROWTH STRATEGY & AUDIT' },
  'services.consulting.description': { fr: 'Stratégies de croissance multicanale, audit de performance et optimisation des conversions.', en: 'Multichannel growth strategies, performance audits and conversion optimization.' },
  'services.consulting.fullDescription': {
    fr: `Nous aidons les entreprises à accélérer leur croissance en combinant audit de performance, stratégie multicanale et recommandations concrètes. Après avoir analysé vos forces et vos opportunités, nous définissons les canaux et tactiques les plus efficaces, vous fournissons un coaching stratégique pour passer à l’action, optimisons vos processus pour maximiser les conversions, et mettons en place des tableaux de bord et analytics pour suivre vos résultats et ajuster la stratégie en continu. L’objectif : transformer vos données et vos idées en actions concrètes pour booster votre business.`,
    en: `We help companies accelerate their growth by combining performance audits, multichannel strategy, and concrete recommendations. After analyzing your strengths and opportunities, we define the most effective channels and tactics, provide strategic coaching to help you take action, optimize your processes to maximize conversions, and set up dashboards and analytics to track your results and adjust strategy continuously. The goal: turn your data and ideas into concrete actions to boost your business.`
  },
  'services.formation.title': { fr: 'FORMATION DIGITALE & IA', en: 'DIGITAL & AI TRAINING' },
  'services.formation.description': { fr: 'Pédagogie active certifiée OIF/Simplon en marketing digital, IA pour les professionnels et transformation.', en: 'Certified OIF/Simplon active pedagogy in digital marketing, AI for business and transformation.' },
  'services.formation.fullDescription': {
    fr: `Nous formons les professionnels à maîtriser le marketing digital et la transformation digitale à travers des modules pratiques et des cas concrets. Nos sessions couvrent le marketing digital (SEO, réseaux sociaux, acquisition), l’acculturation numérique (enjeux, vocabulaire, culture digitale), l’initiation à l’IA et aux outils no-code, tout en offrant un suivi personnalisé pour progresser à votre rythme. Grâce à des exercices pratiques et des mises en situation, vous repartez avec des compétences directement applicables pour améliorer vos projets et votre efficacité digitale.`,
    en: `We train professionals to master digital marketing and digital transformation through practical modules and real-world cases. Our sessions cover digital marketing (SEO, social media, acquisition), digital awareness (issues, vocabulary, digital culture), introduction to AI and no-code tools, all with personalized support to help you progress at your own pace. Thanks to practical exercises and real-life scenarios, you leave with directly applicable skills to improve your projects and digital efficiency.`
  },
  'services.cta.main': { fr: 'Explorer le service', en: 'Explore service' },
  'services.cta.all': { fr: 'Voir tous les services', en: 'View all services' },

  // Collaborations
  'collab.title': { fr: 'UNE SÉLECTION DE COLLABORATIONS RÉCENTES', en: 'A SELECTION OF RECENT COLLABORATIONS' },
  'collab.subtitle': { fr: 'Entreprises, institutions et startups accompagnées dans leur passage à l’échelle.', en: 'Enterprises, institutions, and startups empowered to scale.' },
  'collab.client': { fr: 'CLIENT / PROJET', en: 'CLIENT / PROJECT' },
  'collab.role': { fr: 'MISSION / SERVICES', en: 'SCOPE & ROLE' },
  'collab.year': { fr: 'ANNÉE', en: 'YEAR' },
  'collab.status': { fr: 'STATUT', en: 'STATUS' },

  // Archive
  'archive.title': { fr: 'ARCHIVES & TRAVAUX SÉLECTIONNÉS', en: 'SELECTED WORKS & ARCHIVE' },
  'archive.all': { fr: 'Tous', en: 'All' },
  'archive.product': { fr: 'Produit & IA', en: 'Product & AI' },
  'archive.growth': { fr: 'Growth & Audit', en: 'Growth & Audit' },
  'archive.training': { fr: 'Formation & EdTech', en: 'Training & EdTech' },
  'archive.web': { fr: 'Web & Plateformes', en: 'Web & Platforms' },

  // About Section
  'about.title': { fr: 'À propos', en: 'About Me' },
  'about.heading': { fr: "L'ESPRIT DERRIÈRE LE TRAVAIL", en: "THE MIND BEHIND THE CRAFT" },
  'about.subtitle': { fr: 'Parcours, vision et méthodologie', en: 'Journey, vision and methodology' },
  'about.description': {
    fr: `Product & Growth Manager / Formateur engagé, passionné par le numérique comme levier de croissance et d’autonomisation en Afrique.

Après plus de 7 ans en logistique, j’ai choisi en 2020 de me former à la conception de produits numériques et à l’accompagnement à la transformation digitale. Depuis, j’ai accompagné plus de 20 entreprises et porteurs de projets, en les aidant à créer des solutions centrées sur l’utilisateur, à optimiser leurs processus et à renforcer leur compétitivité.

En parallèle, je forme et encadre des dizaines de jeunes aux compétences clés du digital, notamment en tant que tuteur en marketing digital pour le programme D-CLIC de l’OIF, qui impacte des milliers d’apprenants francophones.

Mes expertises : Product Management, Growth Marketing, développement web, transformation digitale, intelligence artificielle, outils no-code et pédagogie active.

Ma mission : transformer vos idées en produits innovants et transmettre les compétences qui feront grandir vos équipes et vos projets.`,
    en: `I am a Product & Growth Manager and committed trainer, passionate about digital technology as a lever for growth and empowerment in Africa.

After more than 7 years in logistics, I chose in 2020 to specialize in digital product design and digital transformation support. Since then, I have supported more than 15 companies and project leaders, helping them create user-centered solutions, optimize their processes, and improve their competitiveness.

In parallel, I train and mentor dozens of young people each year in key digital skills, notably as a digital marketing tutor for the OIF D-CLIC program, which impacts thousands of French-speaking learners.

My expertise: Product Management, Growth Marketing, UX Design, digital transformation, no-code tools, and active pedagogy.

My mission: to turn your ideas into innovative products and to transmit the skills that will help your teams and projects grow.`
  },
  
  // Partners Section
  'partners.title': { fr: 'Ils me font confiance', en: 'They trust me' },
  'partners.subtitle': { fr: 'Des entreprises et organisations avec lesquelles j\'ai eu le plaisir de collaborer', en: 'Companies and organizations I have had the pleasure to work with' },
  'partners.collaboration': { fr: 'Et bien d\'autres encore...', en: 'And many more...' },
  
  // Certifications Section
  'certifications.title': { fr: 'Certifications & Distinctions', en: 'Certifications & Awards' },
  'certifications.professional': { fr: 'Certifications Professionnelles', en: 'Professional Certifications' },
  'certifications.achievements': { fr: 'Distinctions & Reconnaissances', en: 'Awards & Recognition' },
  'certifications.verify': { fr: 'Vérifier', en: 'Verify' },
  
  // Footer
  'footer.headline': { fr: 'CRÉONS QUELQUE CHOSE DE SIGNIFICATIF.', en: "LET'S CREATE SOMETHING MEANINGFUL." },
  'footer.subtitle': {
    fr: "Un produit à concevoir ? Une stratégie de croissance à déployer ? Ou des équipes à former ? Échangeons dès aujourd'hui.",
    en: "A product to design? A growth strategy to deploy? Or a team to upskill? Let's connect today."
  },
  'footer.description': {
    fr: "Product & Growth Manager / Formateur engagé, j'aide les entreprises et les talents à innover, se transformer et acquérir les compétences clés du digital.",
    en: "Product & Growth Manager / Committed Trainer, I help companies and talents innovate, transform, and acquire key digital skills."
  },
  'footer.services': { fr: 'Services', en: 'Services' },
  'footer.resources': { fr: 'Ressources', en: 'Resources' },
  'footer.contact': { fr: 'Contact', en: 'Contact' },
  'footer.rights': { fr: 'Tous droits réservés.', en: 'All rights reserved.' },
  'footer.legal': { fr: 'Mentions légales', en: 'Legal Notice' },
  'footer.privacy': { fr: 'Politique RGPD', en: 'Privacy Policy' },
  'footer.terms': { fr: 'Conditions d\'utilisation', en: 'Terms of Use' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

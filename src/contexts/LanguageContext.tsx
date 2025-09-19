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
  'nav.about': { fr: 'À propos', en: 'About' },
  'nav.portfolio': { fr: 'Réalisations', en: 'Portfolio' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  
  // Hero Section
  'hero.title': { fr: 'De l’idée au produit, du talent à l’expertise.', en: 'From idea to product, from talent to expertise.' },
  'hero.subtitle': {
    fr: "Entrepreneur du numérique, Product & Growth Manager et formateur engagé : je crée, j’accompagne et je forme pour que vos projets deviennent des réussites durables.",
    en: "Digital entrepreneur, Product & Growth Manager and committed trainer: I create, support, and train so your projects become lasting successes."
  },
  'hero.cta': { fr: 'Réserver un call', en: 'Book a call' },
  'hero.stats.projects': { fr: 'projets réalisés', en: 'completed projects' },
  'hero.stats.growth': { fr: 'croissance moyenne', en: 'average growth' },
  'hero.stats.students': { fr: 'apprenants', en: 'students mentored' },
  'hero.download.cv': { fr: 'Télécharger CV', en: 'Download CV' },
  'hero.role': { fr: 'Product & Growth Manager / Formateur', en: 'Product & Growth Manager / Trainer' },
  
  // About Section
  'about.title': { fr: 'À propos', en: 'About Me' },
  'about.subtitle': { fr: 'Mon parcours et ma vision', en: 'My journey and vision' },
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
  
  // Services Section
  'services.title': { fr: 'Mes Services', en: 'My Services' },
  'services.subtitle': { fr: 'Des solutions sur-mesure pour impulser votre croissance et co-créer votre succès numérique', en: 'Tailor-made solutions to boost your growth and co-create your digital success' },
  'services.consulting.title': { fr: 'Consulting Growth', en: 'Growth Consulting' },
  'services.consulting.description': { fr: 'Stratégies de croissance personnalisées pour accélérer votre développement business.', en: 'Personalized growth strategies to accelerate your business development.' },
  'services.consulting.fullDescription': {
    fr: `Nous aidons les entreprises à accélérer leur croissance en combinant audit de performance, stratégie multicanale et recommandations concrètes. Après avoir analysé vos forces et vos opportunités, nous définissons les canaux et tactiques les plus efficaces, vous fournissons un coaching stratégique pour passer à l’action, optimisons vos processus pour maximiser les conversions, et mettons en place des tableaux de bord et analytics pour suivre vos résultats et ajuster la stratégie en continu. L’objectif : transformer vos données et vos idées en actions concrètes pour booster votre business.`,
    en: `We help companies accelerate their growth by combining performance audits, multichannel strategy, and concrete recommendations. After analyzing your strengths and opportunities, we define the most effective channels and tactics, provide strategic coaching to help you take action, optimize your processes to maximize conversions, and set up dashboards and analytics to track your results and adjust strategy continuously. The goal: turn your data and ideas into concrete actions to boost your business.`
  },
  'services.formation.title': { fr: 'Formation', en: 'Training' },
  'services.formation.description': { fr: 'Formation en marketing numérique et transformation digitale.', en: 'OIF certified training in digital marketing and digital transformation.' },
  'services.formation.fullDescription': {
    fr: `Nous formons les professionnels à maîtriser le marketing digital et la transformation digitale à travers des modules pratiques et des cas concrets. Nos sessions couvrent le marketing digital (SEO, réseaux sociaux, acquisition), l’acculturation numérique (enjeux, vocabulaire, culture digitale), l’initiation à l’IA et aux outils no-code, tout en offrant un suivi personnalisé pour progresser à votre rythme. Grâce à des exercices pratiques et des mises en situation, vous repartez avec des compétences directement applicables pour améliorer vos projets et votre efficacité digitale.`,
    en: `We train professionals to master digital marketing and digital transformation through practical modules and real-world cases. Our sessions cover digital marketing (SEO, social media, acquisition), digital awareness (issues, vocabulary, digital culture), introduction to AI and no-code tools, all with personalized support to help you progress at your own pace. Thanks to practical exercises and real-life scenarios, you leave with directly applicable skills to improve your projects and digital efficiency.`
  },
  'services.cta.main': { fr: 'En savoir plus', en: 'Learn more' },
  'services.cta.all': { fr: 'Voir tous les services', en: 'View all services' },
  
  // Certifications Section
  'certifications.title': { fr: 'Certifications & Distinctions', en: 'Certifications & Awards' },
  'certifications.professional': { fr: 'Certifications Professionnelles', en: 'Professional Certifications' },
  'certifications.achievements': { fr: 'Distinctions & Reconnaissances', en: 'Awards & Recognition' },
  'certifications.verify': { fr: 'Vérifier', en: 'Verify' },
  
  // Footer
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

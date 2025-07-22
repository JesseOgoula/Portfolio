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
  'nav.services': { fr: 'Services', en: 'Services' },
  'nav.portfolio': { fr: 'Réalisations', en: 'Portfolio' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  
  // Hero Section
  'hero.title': { fr: 'Je transforme vos idées en produits qui croissent', en: 'I transform your ideas into growing products' },
  'hero.subtitle': { fr: 'Product & Growth Manager spécialisé dans l\'accompagnement des entreprises vers leur transformation digitale', en: 'Product & Growth Manager specialized in supporting companies through their digital transformation' },
  'hero.cta': { fr: 'Réserver un call', en: 'Book a call' },
  'hero.stats.projects': { fr: 'projets réalisés', en: 'completed projects' },
  'hero.stats.growth': { fr: 'croissance moyenne', en: 'average growth' },
  'hero.stats.students': { fr: 'apprenants', en: 'students mentored' },
  'hero.download.cv': { fr: 'Télécharger CV', en: 'Download CV' },
  
  // About Section
  'about.title': { fr: 'À propos', en: 'About Me' },
  'about.subtitle': { fr: 'Mon parcours et ma vision', en: 'My journey and vision' },
  'about.description': { 
    fr: 'Je suis Adirigno Ogoula Jesse Daïse, Product & Growth Manager et Coach formateur certifié, avec un parcours marqué par une transition réussie de la logistique vers le numérique. Depuis 2020, j\'accompagne des entreprises et des apprenants dans la transformation digitale, le développement de produits innovants et la mise en place de stratégies marketing performantes. Fort de plus de 20 projets réalisés, d\'une expérience en tutorat pour l\'OIF (programme D-CLIC) et de plus de 100 jeunes formés au marketing digital via École 241, je crois en un numérique inclusif, axé sur les compétences, l\'impact et l\'autonomie. Ma vision : allier technologie, pédagogie active et culture du résultat pour former et faire croître des talents prêts à relever les défis de demain.',
    en: 'I am Adirigno Ogoula Jesse Daïse, a certified Product & Growth Manager and Training Coach, with a journey marked by a successful transition from logistics to digital. Since 2020, I have been supporting companies and learners in digital transformation, innovative product development, and implementing effective marketing strategies. With over 20 completed projects, tutoring experience for OIF (D-CLIC program), and more than 100 young people trained in digital marketing through École 241, I believe in inclusive digital technology focused on skills, impact, and autonomy. My vision: combining technology, active pedagogy, and results-driven culture to train and grow talents ready to meet tomorrow\'s challenges.'
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
  'services.coaching.title': { fr: 'Coaching Product', en: 'Product Coaching' },
  'services.coaching.description': { fr: 'Accompagnement individuel pour développer vos compétences en Product Management.', en: 'Individual support to develop your Product Management skills.' },
  'services.formation.title': { fr: 'Formation', en: 'Training' },
  'services.formation.description': { fr: 'Formation en marketing numérique et transformation digitale.', en: 'OIF certified training in digital marketing and digital transformation.' },
  'services.cta.main': { fr: 'En savoir plus', en: 'Learn more' },
  'services.cta.all': { fr: 'Voir tous les services', en: 'View all services' },
  
  // Certifications Section
  'certifications.title': { fr: 'Certifications & Distinctions', en: 'Certifications & Awards' },
  'certifications.professional': { fr: 'Certifications Professionnelles', en: 'Professional Certifications' },
  'certifications.achievements': { fr: 'Distinctions & Reconnaissances', en: 'Awards & Recognition' },
  'certifications.verify': { fr: 'Vérifier', en: 'Verify' },
  
  // Footer
  'footer.description': { fr: 'Product & Growth Manager spécialisé dans l\'accompagnement des entreprises vers leur transformation digitale.', en: 'Product & Growth Manager specialized in supporting companies through their digital transformation.' },
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

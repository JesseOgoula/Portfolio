import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceItem {
  id: string;
  name: { fr: string; en: string };
  num: string;
  count: { fr: string; en: string };
  leftPreview: {
    title: string;
    caption: { fr: string; en: string };
    image: string;
  };
  rightPreview: {
    title: string;
    caption: { fr: string; en: string };
    image: string;
  };
}

const services: ServiceItem[] = [
  {
    id: 'growth-strategy',
    name: {
      fr: 'STRATÉGIE DE CROISSANCE & AUDIT',
      en: 'GROWTH STRATEGY & AUDIT',
    },
    num: '01',
    count: { fr: '20+ CLIENTS', en: '20+ CLIENTS' },
    leftPreview: {
      title: 'ACQUISITION MULTICANALE',
      caption: { fr: '+35% DE TRAFIC ACQUIS EN MOYENNE', en: '+35% AVG TRAFFIC GROWTH' },
      image: '/banners/AFRICAKARD.png',
    },
    rightPreview: {
      title: 'TUNNEL DE CONVERSION',
      caption: { fr: 'OPTIMISATION DES PARCOURS CLIENTS', en: 'CHECKOUT FUNNEL OPTIMIZATION' },
      image: '/banners/Ecole241.jpg',
    },
  },
  {
    id: 'product-management',
    name: {
      fr: 'DIRECTION PRODUIT & EXPÉRIENCE UX',
      en: 'PRODUCT MANAGEMENT & UX',
    },
    num: '02',
    count: { fr: '08 SYSTÈMES', en: '08 SYSTEMS' },
    leftPreview: {
      title: 'SIKAAPP FINTECH ENGINE',
      caption: { fr: 'ANALYSE PRÉDICTIVE DES FLUX FINANCIERS', en: 'AI FINANCIAL PARSING' },
      image: '/Sikaapp.jpeg',
    },
    rightPreview: {
      title: 'AFRICAKARD ROADMAP',
      caption: { fr: 'EXPANSION RÉGIONALE DU CATALOGUE', en: 'REGIONAL DIGITAL DISTRIBUTION' },
      image: '/banners/AFRICAKARD.png',
    },
  },
  {
    id: 'ai-automation',
    name: {
      fr: 'IA & AUTOMATISATION',
      en: 'AI & AUTOMATION',
    },
    num: '03',
    count: { fr: '15+ WORKFLOWS', en: '15+ WORKFLOWS' },
    leftPreview: {
      title: 'AGENTS & WORKFLOWS IA',
      caption: { fr: 'AUTOMATISATION DE PROCESSUS MÉTIER & LLM', en: 'LLM INTEGRATION & SMART AGENTS' },
      image: '/Sikaapp.jpeg',
    },
    rightPreview: {
      title: 'INFRASTRUCTURE INTELLIGENTE',
      caption: { fr: 'PIPELINES D’AUTOMATISATION & IA GÉNÉRATIVE', en: 'GENERATIVE AI & SMART PIPELINES' },
      image: '/banners/AFRICAKARD.png',
    },
  },
  {
    id: 'digital-ai-training',
    name: {
      fr: 'PÉDAGOGIE ACTIVE & FORMATION IA',
      en: 'DIGITAL & AI TRAINING',
    },
    num: '04',
    count: { fr: '200+ TALENTS', en: '200+ TALENTS' },
    leftPreview: {
      title: 'PÉDAGOGIE ACTIVE SIMPLON',
      caption: { fr: 'MÉTHODOLOGIES NUMÉRIQUES CERTIFIÉES', en: 'CERTIFIED AFRICA 2024' },
      image: '/banners/Ecole241.jpg',
    },
    rightPreview: {
      title: 'PROGRAMME D-CLIC OIF',
      caption: { fr: 'TUTORAT DE PROMOTIONS & MARKETING', en: 'MENTORSHIP & KEY SKILLS' },
      image: '/banners/DECLIC.jpg',
    },
  },
  {
    id: 'web-architecture',
    name: {
      fr: 'CONCEPTION WEB & PORTAILS',
      en: 'WEB ARCHITECTURE & PLATFORMS',
    },
    num: '05',
    count: { fr: '12 PORTAILS', en: '12 PLATFORMS' },
    leftPreview: {
      title: 'PORTAIL FÉDÉRAL FGTT',
      caption: { fr: 'CENTRALISATION DES TOURNOIS EN DIRECT', en: 'NATIONAL ATHLETES & DRAWS' },
      image: '/banners/fgtt.png',
    },
    rightPreview: {
      title: 'CODESCHOOL LMS',
      caption: { fr: 'PLATEFORME D’APPRENTISSAGE EN LIGNE', en: 'ONLINE LEARNING CURRICULUM' },
      image: '/code school.jpg',
    },
  },
  {
    id: 'brand-art-direction',
    name: {
      fr: 'DESIGN SYSTEMS & IDENTITÉ DE MARQUE',
      en: 'ART DIRECTION & DESIGN SYSTEM',
    },
    num: '06',
    count: { fr: '15 IDENTITÉS', en: '15 IDENTITIES' },
    leftPreview: {
      title: 'BIBLIOTHÈQUE DE COMPOSANTS',
      caption: { fr: 'ARCHITECTURE ATOMIQUE & TOKENS UI', en: 'UI COMPONENT ARCHITECTURE' },
      image: '/services_collab_ui_1788974527398.jpg',
    },
    rightPreview: {
      title: 'NORMES ÉDITORIALES',
      caption: { fr: 'DIRECTION ARTISTIQUE ET CHARTE DE MARQUE', en: 'RIGOROUS EDITORIAL SYSTEMS' },
      image: '/Sikaapp.jpeg',
    },
  },
];

const ServicesCategories = () => {
  const { language } = useLanguage();
  const [activeService, setActiveService] = useState<number>(1); // Default to Product Management

  const current = services[activeService];

  return (
    <section
      id="services"
      className="relative bg-[#050505] text-[#F4F4F4] py-24 sm:py-32 lg:py-40 overflow-hidden hairline-b select-none"
    >
      {/* Background Micro Header */}
      <div className="w-full px-4 sm:px-8 lg:px-16 mb-12 sm:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 hairline-b gap-4">
          <div>
            <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.25em] text-[#B5B5B5] uppercase mb-2">
              <span className="w-1.5 h-1.5 bg-[#F4F4F4]" />
              <span>
                {language === 'fr'
                  ? '// 04 — DOMAINES D’INTERVENTION & EXPERTISES'
                  : '// 04 — CAPABILITIES & CORE DISCIPLINES'}
              </span>
            </div>
            <h2 className="font-sans font-extrabold uppercase text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#F4F4F4]">
              {language === 'fr' ? 'CATÉGORIES DE PROJETS / EXPERTISES' : 'PROJECT CATEGORIES / SERVICES'}
            </h2>
          </div>
          <div className="font-mono text-[10px] tracking-widest text-[#3A3A3A] uppercase">
            {language === 'fr' ? '[ SURVOLER POUR INSPECTER ]' : '[ HOVER TO INSPECT ARTIFACTS ]'}
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* LEFT: Dynamic Floating Preview Card */}
          <div className="lg:col-span-3 hidden lg:flex flex-col justify-center">
            <div
              key={`left-${activeService}`}
              data-cursor="project"
              className="bg-[#0B0B0B] border border-[#1a1a1a] p-3 shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center justify-between font-mono text-[8px] tracking-[0.2em] text-[#B5B5B5] uppercase mb-2">
                <span>PREVIEW // A</span>
                <span>{current.num}</span>
              </div>
              <div className="relative aspect-[4/3] bg-[#151515] overflow-hidden border border-[#222]">
                <img
                  src={current.leftPreview.image}
                  alt={current.leftPreview.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.includes('AFRICAKARD') && !target.src.includes('africakard.png')) {
                      target.src = '/africakard.png';
                    } else if (target.src.includes('Ecole241') && !target.src.includes('ecole241.jpg')) {
                      target.src = '/ecole241.jpg';
                    } else if (target.src.includes('DECLIC') && !target.src.includes('declic.jpg')) {
                      target.src = '/declic.jpg';
                    }
                  }}
                  className="w-full h-full object-cover filter grayscale contrast-125 hover:contrast-150 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="font-mono text-[9px] font-bold text-[#F4F4F4] block truncate">
                    {current.leftPreview.title}
                  </span>
                  <span className="font-mono text-[7px] text-[#B5B5B5] block uppercase tracking-wider">
                    {current.leftPreview.caption[language]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER: Monumental Service Typography Stack */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="border-t border-[#1a1a1a]">
              {services.map((srv, idx) => {
                const isActive = activeService === idx;
                return (
                  <div
                    key={srv.id}
                    onMouseEnter={() => setActiveService(idx)}
                    onClick={() => setActiveService(idx)}
                    className={`relative transition-all duration-200 cursor-pointer border-b border-[#1a1a1a] group ${
                      isActive
                        ? 'bg-[#F4F4F4] text-[#050505]'
                        : 'bg-transparent text-[#F4F4F4] hover:bg-[#0B0B0B]'
                    }`}
                  >
                    <div className="px-4 sm:px-6 py-5 sm:py-6 flex items-center justify-between">
                      {/* Left Number & Bullet */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span
                          className={`font-mono text-xs tracking-widest ${
                            isActive ? 'text-[#050505] font-bold' : 'text-[#3A3A3A] group-hover:text-[#B5B5B5]'
                          }`}
                        >
                          // {srv.num}
                        </span>
                        <h3
                          className={`font-sans font-black text-lg sm:text-xl md:text-2xl lg:text-[1.85rem] tracking-tight uppercase transition-transform duration-200 ${
                            isActive ? 'translate-x-1' : ''
                          }`}
                        >
                          {srv.name[language]}
                        </h3>
                      </div>

                      {/* Right Indicator Arrow */}
                      <div className="flex items-center gap-4">
                        <span
                          className={`font-mono text-sm transition-transform duration-200 ${
                            isActive ? 'translate-x-1 font-bold' : 'text-[#3A3A3A]'
                          }`}
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Dynamic Floating Preview Card */}
          <div className="lg:col-span-3 hidden lg:flex flex-col justify-center">
            <div
              key={`right-${activeService}`}
              data-cursor="project"
              className="bg-[#0B0B0B] border border-[#1a1a1a] p-3 shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center justify-between font-mono text-[8px] tracking-[0.2em] text-[#B5B5B5] uppercase mb-2">
                <span>PREVIEW // B</span>
                <span>ARCHIVE</span>
              </div>
              <div className="relative aspect-[4/3] bg-[#151515] overflow-hidden border border-[#222]">
                <img
                  src={current.rightPreview.image}
                  alt={current.rightPreview.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.includes('AFRICAKARD') && !target.src.includes('africakard.png')) {
                      target.src = '/africakard.png';
                    } else if (target.src.includes('Ecole241') && !target.src.includes('ecole241.jpg')) {
                      target.src = '/ecole241.jpg';
                    } else if (target.src.includes('DECLIC') && !target.src.includes('declic.jpg')) {
                      target.src = '/declic.jpg';
                    }
                  }}
                  className="w-full h-full object-cover filter grayscale contrast-125 hover:contrast-150 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="font-mono text-[9px] font-bold text-[#F4F4F4] block truncate">
                    {current.rightPreview.title}
                  </span>
                  <span className="font-mono text-[7px] text-[#B5B5B5] block uppercase tracking-wider">
                    {current.rightPreview.caption[language]}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesCategories;

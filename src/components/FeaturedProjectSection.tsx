import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LocalizedProject {
  id: string;
  num: string;
  title: string;
  client: string;
  role: { fr: string; en: string };
  year: string;
  disciplines: { fr: string[]; en: string[] };
  scope: { fr: string; en: string };
  description: { fr: string; en: string };
  image: string;
  link: string;
  metrics: { label: { fr: string; en: string }; value: string }[];
}

const projects: LocalizedProject[] = [
  {
    id: 'sikaapp',
    num: '01',
    title: 'SIKAAPP',
    client: 'IBOGA LAB',
    role: {
      fr: 'PRODUCT STRATEGIST & LEAD UX',
      en: 'PRODUCT STRATEGIST & LEAD UX',
    },
    year: '2024 — 2026',
    disciplines: {
      fr: ['ALGORITHMES PRÉDICTIFS', 'EXPÉRIENCE MOBILE', 'FINTECH AFRICAINE', 'DESIGN SYSTEM'],
      en: ['PERSONAL FINTECH', 'AI / ML PARSING', 'DESIGN SYSTEM', 'MOBILE UX'],
    },
    scope: {
      fr: 'CONCEPTION PRODUIT DE BOUT EN BOUT & MODÉLISATION DES FLUX BUDGÉTAIRES',
      en: 'MOBILE PLATFORM & PREDICTIVE MACHINE LEARNING BUDGETING ENGINE',
    },
    description: {
      fr: 'Conception d’une fintech mobile nouvelle génération qui libère l’utilisateur de la saisie manuelle. Par l’analyse algorithmique des flux et SMS financiers, SikaApp modélise en temps réel les trajectoires d’épargne au sein d’une interface d’une clarté absolue.',
      en: 'Pioneering financial intelligence platform leveraging automated SMS parsing, real-time ML budget forecasting, and high-clarity UX for modern African consumers.',
    },
    image: '/Sikaapp.jpeg',
    link: '#',
    metrics: [
      { label: { fr: 'PRÉCISION ALGO', en: 'AI ACCURACY' }, value: '98.4%' },
      { label: { fr: 'TEMPS ÉCONOMISÉ', en: 'TIME SAVED / MO' }, value: '4.5 HRS' },
      { label: { fr: 'AUTOMATISATION', en: 'AUTOMATION' }, value: '100%' },
    ],
  },
  {
    id: 'africakard',
    num: '02',
    title: 'AFRICAKARD',
    client: 'AFRICAKARD',
    role: {
      fr: 'PRODUCT MANAGER',
      en: 'PRODUCT MANAGER',
    },
    year: '2023 — 2024',
    disciplines: {
      fr: ['TUNNEL D’ACHAT', 'ACQUISITION & SOCIAL ADS', 'ARCHITECTURE DE MARQUE', 'E-COMMERCE'],
      en: ['E-COMMERCE & CHECKOUT', 'GROWTH & SOCIAL ADS', 'BRAND ARCHITECTURE'],
    },
    scope: {
      fr: 'REFONTE DU TUNNEL DE CONVERSION & EXPANSION DES OFFRES DIGITALES',
      en: 'DIGITAL CARD ISSUANCE & REGIONAL ENTERTAINMENT DISTRIBUTION',
    },
    description: {
      fr: 'Infrastructure e-commerce dédiée à la distribution instantanée de cartes cadeaux et abonnements numériques en Afrique. Restructuration complète de la roadmap produit, fluidification du checkout et campagnes d’acquisition ayant généré +15% de CA mensuel.',
      en: 'Digital voucher platform delivering instant prepaid access and subscription distribution across Central Africa, driving +15% monthly revenue surge and funnel optimization.',
    },
    image: '/banners/AFRICAKARD.png',
    link: '#',
    metrics: [
      { label: { fr: 'HAUSSE MENSUELLE', en: 'REVENUE SURGE' }, value: '+15%' },
      { label: { fr: 'EFFICIENCE ADS', en: 'SOCIAL ADS' }, value: '+40%' },
      { label: { fr: 'ÉQUIPE CRÉATIVE', en: 'CREATIVE TEAM' }, value: '4 EXPERTS' },
    ],
  },
  {
    id: 'ecole241',
    num: '03',
    title: 'ÉCOLE 241',
    client: 'OGOOUÉ LABS / SIMPLON',
    role: {
      fr: 'COACH FORMATEUR EN PÉDAGOGIE ACTIVE',
      en: 'ACTIVE PEDAGOGY COACH & TRAINER',
    },
    year: '2022 — 2024',
    disciplines: {
      fr: ['MARKETING DIGITAL & SEO', 'MÉTHODOLOGIE SIMPLON', 'IA GÉNÉRATIVE', 'ATELIERS IMMERSIFS'],
      en: ['DIGITAL MARKETING', 'SIMPLON ACTIVE PEDAGOGY', 'AI FOR MANAGERS', 'HANDS-ON WORKSHOPS'],
    },
    scope: {
      fr: 'INGÉNIERIE PÉDAGOGIQUE & TRANSMISSION DE COMPÉTENCES NUMÉRIQUES AUX APPRENANTS',
      en: 'ACTIVE PEDAGOGY & DIGITAL SKILLS TRANSMISSION FOR LEARNERS',
    },
    description: {
      fr: 'Pôle d’excellence numérique propulsé par Ogooué Labs. Encadrement intensif de 2 promotions et plus de 20 apprenants sur la stratégie digitale, le community management, le SEO et l’intégration pratique de l’IA. Déploiement d’une pédagogie active orientée employabilité immédiate.',
      en: 'Pioneering digital training academy powered by Ogooué Labs. Mentoring 2 cohorts and over 20 learners in digital strategy, SEO, active pedagogy, and professional employability.',
    },
    image: '/banners/Ecole241.jpg',
    link: '#',
    metrics: [
      { label: { fr: 'PROMOTIONS', en: 'COHORTS' }, value: '2 PROMOS' },
      { label: { fr: 'APPRENANTS FORMÉS', en: 'LEARNERS TRAINED' }, value: '+20' },
      { label: { fr: 'SATISFACTION', en: 'SATISFACTION' }, value: '96%' },
    ],
  },
  {
    id: 'dclic',
    num: '04',
    title: 'D-CLIC // OIF',
    client: 'ORGANISATION INTERNATIONALE DE LA FRANCOPHONIE (OIF)',
    role: {
      fr: 'TUTEUR DIGITAL & COACH RÉFÉRENT',
      en: 'LEAD DIGITAL TRAINER & MENTOR',
    },
    year: '2023 — 2024',
    disciplines: {
      fr: ['TUTORAT DE PROMOTIONS', 'MARKETING DIGITAL', 'PÉDAGOGIE ACTIVE', 'INSERTION PROFESSIONNELLE'],
      en: ['COHORT MENTORSHIP', 'DIGITAL MARKETING', 'ACTIVE PEDAGOGY', 'YOUTH EMPLOYABILITY'],
    },
    scope: {
      fr: 'TUTORAT PÉDAGOGIQUE & DÉVELOPPEMENT DES COMPÉTENCES NUMÉRIQUES DES JEUNES',
      en: 'MENTORSHIP & DIGITAL SKILLS ACCELERATION PROGRAMME',
    },
    description: {
      fr: 'Programme panafricain phare de l’OIF visant à doter la jeunesse des compétences numériques professionnalisantes. Tutorat et coaching intensif des apprenants en marketing digital, stratégie de contenu et outils collaboratifs avec une approche par projets concrets.',
      en: 'Flagship pan-African digital program by OIF empowering young talents with professional digital and marketing skills through active, project-based mentorship.',
    },
    image: '/banners/DECLIC.jpg',
    link: '#',
    metrics: [
      { label: { fr: 'APPRENANTS COACHÉS', en: 'LEARNERS COACHED' }, value: '50+' },
      { label: { fr: 'PROMOTIONS D-CLIC', en: 'D-CLIC COHORTS' }, value: '03' },
      { label: { fr: 'TAUX D’ASSIDUITÉ', en: 'ATTENDANCE RATE' }, value: '98%' },
    ],
  },
];

const FeaturedProjectSection = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const current = projects[activeIndex];

  return (
    <section
      id="featured"
      className="relative bg-[#050505] text-[#F4F4F4] pt-20 pb-28 sm:pt-28 sm:pb-36 overflow-hidden hairline-b select-none"
    >
      {/* Top Section Header with Index Tabs */}
      <div className="w-full px-4 sm:px-8 lg:px-16 mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 hairline-b">
          <div>
            <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.25em] text-[#B5B5B5] uppercase mb-2">
              <span className="w-1.5 h-1.5 bg-[#F4F4F4]" />
              <span>
                {language === 'fr'
                  ? '// 03 — CAS D’ÉTUDE SÉLECTIONNÉ'
                  : '// 03 — CURATED CASE STUDY'}
              </span>
            </div>
            <h2 className="font-sans font-extrabold uppercase text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#F4F4F4]">
              {language === 'fr' ? 'PROJET VEDETTE' : 'FEATURED PROJECT'}
            </h2>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center space-x-1 sm:space-x-2 border border-[#222] bg-[#0B0B0B] p-1">
            {projects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors duration-150 ${
                  activeIndex === idx
                    ? 'bg-[#F4F4F4] text-[#050505] font-bold'
                    : 'text-[#B5B5B5] hover:text-white hover:bg-[#151515]'
                }`}
              >
                [{proj.num}] {proj.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Asymmetrical Layout */}
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT: Technical Dossier */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#0B0B0B] border border-[#1a1a1a] p-6 sm:p-10 relative">
            
            {/* Top Studio Crosshairs */}
            <div className="absolute top-2 left-2 font-mono text-[9px] text-[#3A3A3A]">+</div>
            <div className="absolute top-2 right-2 font-mono text-[9px] text-[#3A3A3A]">+</div>
            <div className="absolute bottom-2 left-2 font-mono text-[9px] text-[#3A3A3A]">+</div>
            <div className="absolute bottom-2 right-2 font-mono text-[9px] text-[#3A3A3A]">+</div>

            <div>
              {/* Micro Status Bar */}
              <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-[#B5B5B5] uppercase pb-4 hairline-b mb-6">
                <span>{language === 'fr' ? 'DOSSIER' : 'CASE DOSSIER'} // {current.num}</span>
                <span className="text-[#F4F4F4]">{current.year}</span>
              </div>

              {/* Title & Client */}
              <h3 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-[-0.03em] text-[#F4F4F4] mb-3">
                {current.title}
              </h3>
              <p className="font-mono text-[11px] tracking-[0.15em] text-[#B5B5B5] uppercase mb-6">
                CLIENT: {current.client} / ROLE: {current.role[language]}
              </p>

              {/* Description */}
              <p className="font-sans text-sm sm:text-base text-[#B5B5B5] leading-relaxed font-light mb-8">
                {current.description[language]}
              </p>

              {/* Scope & Disciplines List */}
              <div className="space-y-4 pt-6 hairline-t mb-8">
                <div>
                  <span className="block font-mono text-[8px] tracking-[0.25em] text-[#3A3A3A] uppercase mb-1">
                    {language === 'fr' ? 'PÉRIMÈTRE D’INTERVENTION' : 'SCOPE OF ENGAGEMENT'}
                  </span>
                  <span className="font-mono text-[10px] tracking-wider text-[#F4F4F4] uppercase">
                    {current.scope[language]}
                  </span>
                </div>

                <div>
                  <span className="block font-mono text-[8px] tracking-[0.25em] text-[#3A3A3A] uppercase mb-2">
                    {language === 'fr' ? 'DISCIPLINES APPLIQUÉES' : 'DISCIPLINES APPLIED'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {current.disciplines[language].map((d, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-[#151515] border border-[#262626] font-mono text-[9px] tracking-wider text-[#B5B5B5] uppercase"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="pt-6 hairline-t grid grid-cols-3 gap-4">
              {current.metrics.map((m, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-sans font-extrabold text-xl sm:text-2xl text-[#F4F4F4] tracking-tight">
                    {m.value}
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.2em] text-[#3A3A3A] uppercase mt-0.5">
                    {m.label[language]}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT: High-Impact Monochromatic Artwork Viewport */}
          <div
            className="lg:col-span-7 relative bg-[#0B0B0B] border border-[#1a1a1a] p-4 sm:p-6 flex flex-col justify-between group overflow-hidden"
            data-cursor="project"
          >
            {/* Viewport Micro Header */}
            <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-[#B5B5B5] uppercase pb-3 mb-4 hairline-b">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#F4F4F4]" />
                <span>CANVAS 01 // HIGH FIDELITY ARTIFACT</span>
              </div>
              <span className="text-[#3A3A3A]">[ LIVE PREVIEW ]</span>
            </div>

            {/* Main Visual Frame */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#151515] overflow-hidden border border-[#222]">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover filter grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:contrast-150 transition-all duration-700 ease-out"
              />

              {/* Monochromatic Dark Film Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Studio Viewfinder Marks */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#F4F4F4] pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#F4F4F4] pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#F4F4F4] pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#F4F4F4] pointer-events-none" />

              {/* Center Focusing Reticle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-300">
                <div className="w-20 h-20 border border-dashed border-[#F4F4F4]/50 flex items-center justify-center">
                  <span className="font-mono text-xs text-[#F4F4F4]">+</span>
                </div>
              </div>

              {/* Overlay Badge Bottom Left */}
              <div className="absolute bottom-4 left-4 p-2 bg-[#050505]/90 border border-[#262626] backdrop-blur-sm">
                <span className="font-mono text-[9px] tracking-widest text-[#F4F4F4] uppercase block">
                  REF: {current.id.toUpperCase()} // PROD_BUILD
                </span>
              </div>
            </div>

            {/* Bottom Giant Sub-banner */}
            <div className="mt-4 pt-4 hairline-t flex items-center justify-between">
              <div className="font-sans font-extrabold text-2xl sm:text-4xl text-[#1a1a1a] uppercase tracking-tighter select-none">
                {language === 'fr' ? 'PROJET VEDETTE' : 'FEATURED PROJECT'} // {current.num}
              </div>
              <div className="font-mono text-[10px] tracking-widest text-[#B5B5B5] uppercase flex items-center gap-2">
                <span>{language === 'fr' ? 'VOIR LES DÉTAILS' : 'VIEW CASE ARCHIVE'}</span>
                <span>→</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectSection;

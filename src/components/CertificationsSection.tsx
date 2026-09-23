import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Award, ShieldCheck, Sparkles } from 'lucide-react';

interface Certification {
  id: string;
  num: string;
  title: { fr: string; en: string };
  issuer: string;
  issuerBadge: string;
  year: string;
  category: 'ai_product' | 'growth_marketing' | 'pedagogy';
  categoryLabel: { fr: string; en: string };
  image: string;
  skills: { fr: string[]; en: string[] };
  description: { fr: string; en: string };
}

const certificationsData: Certification[] = [
  {
    id: 'ai-managers',
    num: '01',
    title: {
      fr: 'IA POUR LES MANAGERS & DÉCIDEURS',
      en: 'AI FOR MANAGERS & DECISION MAKERS',
    },
    issuer: 'SIMPLON.CO / OPENCLASSROOMS',
    issuerBadge: 'SIMPLON // AI TECH',
    year: '2024',
    category: 'ai_product',
    categoryLabel: { fr: 'IA & PRODUIT', en: 'AI & PRODUCT' },
    image: '/certifications/Certificat - IA pour les managers.png',
    skills: {
      fr: ['PROMPT ENGINEERING', 'LLM INTEGRATION', 'AUTOMATISATION', 'STRATÉGIE IA'],
      en: ['PROMPT ENGINEERING', 'LLM INTEGRATION', 'AUTOMATION', 'AI STRATEGY'],
    },
    description: {
      fr: 'Accréditation attestant de la capacité à structurer, déployer et manager des cas d’usage d’intelligence artificielle générative et prédictive au sein des organisations.',
      en: 'Executive accreditation certifying proficiency in architecting, deploying, and managing generative and predictive AI workflows within enterprise environments.',
    },
  },
  {
    id: 'product-manager',
    num: '02',
    title: {
      fr: 'PRODUCT MANAGER PROFESSIONNEL',
      en: 'PROFESSIONAL PRODUCT MANAGER',
    },
    issuer: 'CERTIFICATION PROFESSIONNELLE',
    issuerBadge: 'PM // CERTIFIED',
    year: '2024',
    category: 'ai_product',
    categoryLabel: { fr: 'IA & PRODUIT', en: 'AI & PRODUCT' },
    image: '/certifications/Certificat Product Manager.jpeg',
    skills: {
      fr: ['PRODUCT ROADMAP', 'DISCOVERY UTILISATEUR', 'MÉTHODES AGILES', 'METRICS & ANALYTICS'],
      en: ['PRODUCT ROADMAP', 'CUSTOMER DISCOVERY', 'AGILE FRAMEWORK', 'METRICS & ANALYTICS'],
    },
    description: {
      fr: 'Validation avancée de la gouvernance de cycle de vie produit, de l’alignement stratégique des fonctionnalités prioritaires et de l’optimisation du Product-Market Fit.',
      en: 'Advanced credential in product lifecycle governance, strategic backlog prioritization, user discovery, and data-driven Product-Market Fit acceleration.',
    },
  },
  {
    id: 'active-pedagogy',
    num: '03',
    title: {
      fr: 'PÉDAGOGIE ACTIVE & FACILITATION DIGITALE',
      en: 'ACTIVE PEDAGOGY & DIGITAL FACILITATION',
    },
    issuer: 'SIMPLON AFRICA / PROGRAMME OIF',
    issuerBadge: 'SIMPLON.CO // PEDAGOGY',
    year: '2023',
    category: 'pedagogy',
    categoryLabel: { fr: 'PÉDAGOGIE ACTIVE', en: 'ACTIVE PEDAGOGY' },
    image: '/certifications/Certificat pédagogie active.png',
    skills: {
      fr: ['INGÉNIERIE PÉDAGOGIQUE', 'FACILITATION D’ATELIERS', 'MENTORAT', 'ÉVALUATION FORMATIVE'],
      en: ['LEARNING ARCHITECTURE', 'WORKSHOP FACILITATION', 'COACHING', 'SKILLS ASSESSMENT'],
    },
    description: {
      fr: 'Certification délivrée par le réseau Simplon attestant de l’aptitude à concevoir des parcours d’apprentissage immersifs, basés sur le faire et l’apprentissage par projets.',
      en: 'Accreditation by Simplon Africa certifying excellence in project-based learning design, immersive digital coaching, and active learning methodologies.',
    },
  },
  {
    id: 'google-digital-marketing',
    num: '04',
    title: {
      fr: 'FONDAMENTAUX DU MARKETING NUMÉRIQUE',
      en: 'FUNDAMENTALS OF DIGITAL MARKETING',
    },
    issuer: 'GOOGLE DIGITAL ACADEMY',
    issuerBadge: 'GOOGLE // CERTIFIED',
    year: '2023',
    category: 'growth_marketing',
    categoryLabel: { fr: 'MARKETING & GROWTH', en: 'MARKETING & GROWTH' },
    image: '/certifications/Certification Google.png',
    skills: {
      fr: ['RÉFÉRENCEMENT SEO', 'GOOGLE ANALYTICS', 'CAMPAGNES MULTICANALES', 'DATA-DRIVEN ADS'],
      en: ['SEO ARCHITECTURE', 'GOOGLE ANALYTICS', 'MULTI-CHANNEL ADS', 'DATA-DRIVEN ADS'],
    },
    description: {
      fr: 'Certification internationale validant la maîtrise complète de l’écosystème d’acquisition Google, des leviers organiques et payants et de l’analyse d’audience.',
      en: 'International certification validating comprehensive mastery of search marketing, multi-channel inbound engines, and performance web analytics.',
    },
  },
  {
    id: 'hubspot-inbound',
    num: '05',
    title: {
      fr: 'INBOUND MARKETING CERTIFIÉ',
      en: 'INBOUND MARKETING CERTIFIED',
    },
    issuer: 'HUBSPOT ACADEMY',
    issuerBadge: 'HUBSPOT // INBOUND',
    year: '2023',
    category: 'growth_marketing',
    categoryLabel: { fr: 'MARKETING & GROWTH', en: 'MARKETING & GROWTH' },
    image: '/certifications/Certification Inbound.png',
    skills: {
      fr: ['TUNNEL DE CONVERSION', 'LEAD NURTURING', 'CONTENT STRATEGY', 'AUTOMATISATION CRM'],
      en: ['CONVERSION FUNNELS', 'LEAD NURTURING', 'CONTENT STRATEGY', 'CRM AUTOMATION'],
    },
    description: {
      fr: 'Validation des méthodologies d’acquisition entrante : conception d’offres à haute valeur perçue, segmentation comportementale et tunnels de nurturing automatisés.',
      en: 'Industry-standard accreditation in inbound marketing mechanics, customer journey alignment, behavioral segmentation, and automated nurturing flows.',
    },
  },
  {
    id: 'hubspot-social-media',
    num: '06',
    title: {
      fr: 'SOCIAL MEDIA STRATEGY & ADVERTISING',
      en: 'SOCIAL MEDIA STRATEGY & ADVERTISING',
    },
    issuer: 'HUBSPOT ACADEMY',
    issuerBadge: 'HUBSPOT // SOCIAL',
    year: '2023',
    category: 'growth_marketing',
    categoryLabel: { fr: 'MARKETING & GROWTH', en: 'MARKETING & GROWTH' },
    image: '/certifications/Certification Social Media.png',
    skills: {
      fr: ['SOCIAL SELLING', 'STRATÉGIE DE MARQUE', 'AUDIENCE BUILDING', 'CAMPAGNES SPONSORISÉES'],
      en: ['SOCIAL SELLING', 'BRAND STRATEGY', 'AUDIENCE TARGETING', 'PAID SOCIAL LOOPS'],
    },
    description: {
      fr: 'Expertise dans la construction d’audiences qualifiées, l’ingénierie de contenus viraux et la conversion via les plateformes sociales majeures.',
      en: 'Specialized credential in high-impact social audience growth, organic storytelling, multi-platform media strategy, and community engagement loops.',
    },
  },
  {
    id: 'hp-life',
    num: '07',
    title: {
      fr: 'ENTREPRENEURIAT & GESTION D’ENTREPRISE',
      en: 'ENTREPRENEURSHIP & BUSINESS INNOVATION',
    },
    issuer: 'HP FOUNDATION / HP LIFE',
    issuerBadge: 'HP // FOUNDATION',
    year: '2023',
    category: 'growth_marketing',
    categoryLabel: { fr: 'MARKETING & GROWTH', en: 'MARKETING & GROWTH' },
    image: '/certifications/Certificat hp life.png',
    skills: {
      fr: ['BUSINESS MODEL CANVAS', 'GESTION FINANCIÈRE', 'DESIGN THINKING', 'SCALABILITÉ'],
      en: ['BUSINESS MODEL CANVAS', 'FINANCIAL MODELLING', 'DESIGN THINKING', 'SCALABILITY'],
    },
    description: {
      fr: 'Attestation internationale sur la structuration de modèles d’affaires résilients, l’analyse des coûts de lancement et l’optimisation opérationnelle de projets.',
      en: 'Global validation of entrepreneurial venture design, operational cost optimization, unit economics modelling, and rapid experimentation.',
    },
  },
  {
    id: 'management-excellence',
    num: '08',
    title: {
      fr: 'MANAGEMENT DE PROJETS NUMÉRIQUES & LEADERSHIP',
      en: 'DIGITAL PROJECT MANAGEMENT & LEADERSHIP',
    },
    issuer: 'PROGRAMME INTERNATIONAL D’EXCELLENCE',
    issuerBadge: 'LEADERSHIP // DIGITAL',
    year: '2024',
    category: 'ai_product',
    categoryLabel: { fr: 'IA & PRODUIT', en: 'AI & PRODUCT' },
    image: '/certifications/1.jpeg',
    skills: {
      fr: ['GOUVERNANCE DE PROJET', 'GESTION DES RISQUES', 'KPIs D’IMPACT', 'LEADERSHIP AGILE'],
      en: ['PROJECT GOVERNANCE', 'RISK MANAGEMENT', 'IMPACT METRICS', 'AGILE LEADERSHIP'],
    },
    description: {
      fr: 'Validation des compétences avancées de pilotage d’équipes transverses, d’exécution de feuilles de route stratégiques et de livraison dans des délais exigeants.',
      en: 'Executive certification in cross-functional team coordination, strategic roadmap milestone execution, stakeholder alignment, and risk-mitigated delivery.',
    },
  },
];

type CategoryFilter = 'all' | 'ai_product' | 'growth_marketing' | 'pedagogy';

const CertificationsSection: React.FC = () => {
  const { language } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredCerts = selectedFilter === 'all'
    ? certificationsData
    : certificationsData.filter((c) => c.category === selectedFilter);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev === null || prev === 0 ? filteredCerts.length - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === null || prev === filteredCerts.length - 1 ? 0 : prev + 1));
      }
    },
    [lightboxIndex, filteredCerts.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const activeCert = lightboxIndex !== null ? filteredCerts[lightboxIndex] : null;

  return (
    <section
      id="certifications"
      className="relative bg-[#050505] text-[#F4F4F4] py-24 sm:py-32 lg:py-40 overflow-hidden hairline-b select-none"
    >
      {/* Background Studio Vignette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-b from-[#181818]/40 via-[#0A0A0A]/20 to-transparent blur-3xl pointer-events-none z-0" />

      <div className="w-full px-4 sm:px-8 lg:px-16 relative z-10">
        
        {/* Section Header: Double Hairline & Colons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 hairline-b gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#B5B5B5] uppercase mb-3">
              <span className="w-1.5 h-1.5 bg-[#F4F4F4]" />
              <span>
                {language === 'fr'
                  ? '// 06 — VALIDATION PAR LES INSTITUTIONS & CERTIFICATIONS OFFICIELLES'
                  : '// 06 — OFFICIAL ACCREDITATIONS & INSTITUTIONAL CREDENTIALS'}
              </span>
            </div>
            <h2 className="font-sans font-extrabold uppercase text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#F4F4F4]">
              {language === 'fr' ? 'ACCRÉDITATIONS & CERTIFICATIONS' : 'ACCREDITATIONS & CERTIFICATIONS'}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 border transition-all duration-200 ${
                selectedFilter === 'all'
                  ? 'bg-[#F4F4F4] text-[#050505] font-bold border-white'
                  : 'bg-[#0B0B0B] text-[#888] border-[#222] hover:text-white hover:border-[#444]'
              }`}
            >
              {language === 'fr' ? 'TOUTES // 08' : 'ALL // 08'}
            </button>
            <button
              onClick={() => setSelectedFilter('ai_product')}
              className={`px-3 py-1.5 border transition-all duration-200 ${
                selectedFilter === 'ai_product'
                  ? 'bg-[#F4F4F4] text-[#050505] font-bold border-white'
                  : 'bg-[#0B0B0B] text-[#888] border-[#222] hover:text-white hover:border-[#444]'
              }`}
            >
              {language === 'fr' ? 'IA & PRODUIT' : 'AI & PRODUCT'}
            </button>
            <button
              onClick={() => setSelectedFilter('growth_marketing')}
              className={`px-3 py-1.5 border transition-all duration-200 ${
                selectedFilter === 'growth_marketing'
                  ? 'bg-[#F4F4F4] text-[#050505] font-bold border-white'
                  : 'bg-[#0B0B0B] text-[#888] border-[#222] hover:text-white hover:border-[#444]'
              }`}
            >
              {language === 'fr' ? 'GROWTH & MARKETING' : 'GROWTH & MARKETING'}
            </button>
            <button
              onClick={() => setSelectedFilter('pedagogy')}
              className={`px-3 py-1.5 border transition-all duration-200 ${
                selectedFilter === 'pedagogy'
                  ? 'bg-[#F4F4F4] text-[#050505] font-bold border-white'
                  : 'bg-[#0B0B0B] text-[#888] border-[#222] hover:text-white hover:border-[#444]'
              }`}
            >
              {language === 'fr' ? 'PÉDAGOGIE ACTIVE' : 'ACTIVE PEDAGOGY'}
            </button>
          </div>
        </div>

        {/* Certifications Grid (2 Cols on Mobile, 3 Cols on Tablet, 4 Cols on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {filteredCerts.map((cert, index) => (
            <div
              key={cert.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative bg-[#0B0B0B] border border-[#1c1c1c] hover:border-white/50 transition-all duration-500 flex flex-col justify-between cursor-pointer p-4 sm:p-5"
            >
              {/* Corner Viewfinder Marks */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/20 group-hover:border-white transition-colors duration-300 pointer-events-none" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/20 group-hover:border-white transition-colors duration-300 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/20 group-hover:border-white transition-colors duration-300 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/20 group-hover:border-white transition-colors duration-300 pointer-events-none" />

              <div>
                {/* Top Card Meta: Index Number & Issuer Badge */}
                <div className="flex items-center justify-between font-mono text-[8px] sm:text-[9px] tracking-widest text-[#B5B5B5] uppercase pb-3 mb-3 hairline-b">
                  <span className="text-[#666] group-hover:text-white transition-colors font-bold">
                    // {cert.num}
                  </span>
                  <span className="px-1.5 py-0.5 bg-[#141414] border border-[#262626] text-[#A0A0A0] group-hover:border-white/40 transition-colors">
                    {cert.year}
                  </span>
                </div>

                {/* Certificate High-Contrast Image Container */}
                <div className="relative aspect-[16/11] bg-[#121212] overflow-hidden border border-[#222] group-hover:border-[#383838] transition-colors mb-4">
                  <img
                    src={cert.image}
                    alt={cert.title[language]}
                    className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Dark Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Centered Hover Inspect Reticle */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="px-3 py-1.5 bg-[#050505]/95 border border-white/80 font-mono text-[9px] tracking-[0.2em] uppercase text-white shadow-2xl backdrop-blur-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span>{language === 'fr' ? 'INSPECTER' : 'INSPECT'}</span>
                      <ArrowUpRight className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>

                {/* Issuer Organization Sub-label */}
                <div className="font-mono text-[8.5px] sm:text-[9px] tracking-[0.18em] text-[#888] uppercase mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-[#B5B5B5]" />
                  <span>{cert.issuer}</span>
                </div>

                {/* Certificate Title */}
                <h3 className="font-sans font-bold text-sm sm:text-base text-[#F4F4F4] group-hover:text-white uppercase leading-snug tracking-tight mb-4 transition-colors">
                  {cert.title[language]}
                </h3>
              </div>

              {/* Bottom Skills Tag Cloud */}
              <div className="pt-3 hairline-t">
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills[language].slice(0, 3).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-1.5 py-0.5 bg-[#121212] border border-[#222] font-mono text-[7.5px] sm:text-[8px] tracking-wider text-[#A0A0A0] uppercase group-hover:border-[#333] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Guarantee of Authenticity */}
        <div className="mt-14 pt-8 hairline-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[9px] sm:text-[10px] text-[#666] uppercase tracking-widest">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#A0A0A0]">
              {language === 'fr'
                ? 'TOUS LES TITRES SONT VÉRIFIÉS ET DÉLIVRÉS PAR LES ORGANISMES OFFICIELS'
                : 'ALL CREDENTIALS ARE AUTHENTICATED & ISSUED BY ACCREDITED BODIES'}
            </span>
          </div>
          <div className="text-[#555]">
            {language === 'fr' ? '[ CLIQUEZ SUR UNE CARTE POUR AGRANDIR ]' : '[ CLICK ANY CARD TO INSPECT IN FULLSCREEN ]'}
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* FULLSCREEN LIGHTBOX MODAL                                */}
      {/* ======================================================== */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-md p-4 sm:p-8 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar with ESC button & Counter */}
          <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 flex items-center justify-between z-50">
            <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#B5B5B5] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#F4F4F4]" />
              <span>
                ARTIFACT // {activeCert.num} — {lightboxIndex !== null ? lightboxIndex + 1 : 1} / {filteredCerts.length}
              </span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#111] border border-[#333] hover:border-white font-mono text-[10px] tracking-widest uppercase text-white transition-colors"
            >
              <span>{language === 'fr' ? 'FERMER [ ESC ]' : 'CLOSE [ ESC ]'}</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Previous / Next Arrow Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev === null || prev === 0 ? filteredCerts.length - 1 : prev - 1));
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 bg-[#0B0B0B]/90 border border-[#262626] hover:border-white text-white transition-all z-50"
            aria-label="Previous Certificate"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev === null || prev === filteredCerts.length - 1 ? 0 : prev + 1));
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 bg-[#0B0B0B]/90 border border-[#262626] hover:border-white text-white transition-all z-50"
            aria-label="Next Certificate"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Modal Central Frame */}
          <div
            className="relative max-w-4xl w-full max-h-[88vh] flex flex-col items-center justify-center p-2 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Certificate High-Res Viewer with Brutalist Frame */}
            <div className="relative bg-[#0B0B0B] border border-[#262626] p-2 sm:p-4 shadow-2xl max-w-full">
              {/* Corner Accents */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-white pointer-events-none" />
              <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-white pointer-events-none" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-white pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-white pointer-events-none" />

              <img
                src={activeCert.image}
                alt={activeCert.title[language]}
                className="max-h-[60vh] sm:max-h-[65vh] w-auto object-contain mx-auto border border-[#1a1a1a]"
              />
            </div>

            {/* Certificate Details Under Image */}
            <div className="w-full mt-4 p-4 bg-[#0B0B0B]/95 border border-[#222] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-mono text-[9px] tracking-widest text-[#888] uppercase mb-1 flex items-center gap-2">
                  <span>{activeCert.issuer}</span>
                  <span>•</span>
                  <span>{activeCert.year}</span>
                </div>
                <h3 className="font-sans font-bold text-base sm:text-lg text-white uppercase tracking-tight">
                  {activeCert.title[language]}
                </h3>
                <p className="font-mono text-[10px] text-[#A0A0A0] mt-1 max-w-2xl">
                  {activeCert.description[language]}
                </p>
              </div>

              {/* Skills pills in modal */}
              <div className="flex flex-wrap sm:flex-col gap-1.5 sm:items-end">
                {activeCert.skills[language].map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-[#141414] border border-[#2a2a2a] font-mono text-[8px] tracking-wider text-[#B5B5B5] uppercase whitespace-nowrap"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </section>
  );
};

export default CertificationsSection;

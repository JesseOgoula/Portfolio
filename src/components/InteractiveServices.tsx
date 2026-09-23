import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const InteractiveServices = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(2); // UI/UX & Product Design by default

  const services = [
    {
      id: '01',
      title: language === 'fr' ? 'STRATÉGIE PRODUIT & ROADMAP' : 'PRODUCT STRATEGY & ROADMAP',
      shortTitle: 'PRODUCT STRATEGY',
      category: 'PRODUCT',
      tagline: language === 'fr'
        ? 'De la vision abstraite au cahier des charges fonctionnel et priorisé.'
        : 'Transforming abstract vision into prioritized product roadmaps.',
      description: language === 'fr'
        ? 'Définition des OKRs, discovery utilisateur, études de marché, priorisation des fonctionnalités (MoSCoW / RICE) et gouvernance agile pour maximiser le Product-Market Fit.'
        : 'OKRs definition, continuous customer discovery, market analysis, feature prioritization (MoSCoW / RICE) and agile sprint architecture for fast time-to-market.',
      leftPreview: '/banners/Ecole241.jpg',
      rightPreview: '/code school.jpg',
      deliverables: [
        'User Research & Personas',
        'Product Backlog & PRD',
        'MVP Scoping & Architecture',
        'KPIs & Product Analytics'
      ]
    },
    {
      id: '02',
      title: language === 'fr' ? 'GROWTH & ACQUISITION MULTICANALE' : 'GROWTH STRATEGY & ACQUISITION',
      shortTitle: 'GROWTH STRATEGY',
      category: 'GROWTH',
      tagline: language === 'fr'
        ? 'Moteurs d’acquisition automatisés et optimisation des taux de conversion.'
        : 'Predictable growth engines and conversion rate optimization.',
      description: language === 'fr'
        ? 'Audit complet des tunnels d’acquisition (AARRR), déploiement de stratégies de rétention, marketing automation, campagnes ciblées et dashboards de performance prédictifs.'
        : 'Full acquisition funnel audits (AARRR), retention loop engineering, marketing automation, targeted inbound campaigns, and predictive performance dashboards.',
      leftPreview: '/banners/AFRICAKARD.png',
      rightPreview: '/banners/DECLIC.jpg',
      deliverables: [
        'Growth Funnel Audit',
        'Multi-Channel Inbound & Ads',
        'Conversion Rate Optimization (CRO)',
        'Retention & LTV Maximization'
      ]
    },
    {
      id: '03',
      title: language === 'fr' ? 'DESIGN PRODUIT & UI / UX' : 'UI / UX & PRODUCT DESIGN',
      shortTitle: 'UI/UX DESIGN',
      category: 'DESIGN',
      tagline: language === 'fr'
        ? 'Interfaces immersives, systèmes de composants scalables et ergonomie.'
        : 'Immersive user experiences, scalable design systems and usability.',
      description: language === 'fr'
        ? 'Conception de wireframes, prototypage haute-fidélité interactif, design systems modulaires et tests utilisateurs pour une adoption immédiate et sans friction.'
        : 'Wireframing, interactive high-fidelity clickable prototyping, modular multi-brand design systems, and usability testing ensuring zero onboarding friction.',
      leftPreview: '/Sikaapp.jpeg',
      rightPreview: '/banners/fgtt.png',
      deliverables: [
        'Wireframing & Prototyping',
        'Figma Design Systems',
        'Mobile App & Web Interfaces',
        'Usability & Accessibility Audits'
      ]
    },
    {
      id: '04',
      title: language === 'fr' ? 'DÉVELOPPEMENT WEB & NO-CODE' : 'WEBSITE & NO-CODE PLATFORMS',
      shortTitle: 'WEBSITE DESIGN',
      category: 'TECH',
      tagline: language === 'fr'
        ? 'Déploiement rapide de plateformes modernes, réactives et performantes.'
        : 'Rapid deployment of modern, responsive and ultra-fast web platforms.',
      description: language === 'fr'
        ? 'Architecture de sites vitrines, applications web interactives, portails d’organisations et intégration d’automatisations sans friction (React, Tailwind, Supabase, No-Code).'
        : 'Architecture of modern portals, interactive web applications, official organizational hubs, and frictionless workflow integrations (React, Tailwind, Supabase, No-Code).',
      leftPreview: '/banners/fgtt.png',
      rightPreview: '/Sikaapp.jpeg',
      deliverables: [
        'Responsive Web Portals',
        'Modern Tech Stack (React / Tailwind)',
        'No-Code Automations & APIs',
        'SEO & Performance Tuning'
      ]
    },
    {
      id: '05',
      title: language === 'fr' ? 'FORMATION & PÉDAGOGIE ACTIVE (OIF)' : 'DIGITAL TRAINING & ACTIVE PEDAGOGY',
      shortTitle: 'DIGITAL TRAINING',
      category: 'EDTECH',
      tagline: language === 'fr'
        ? 'Montée en compétences certifiée pour jeunes talents et professionnels.'
        : 'Certified skill-building for digital talents, teams and managers.',
      description: language === 'fr'
        ? 'Accompagnement pédagogique certifié Simplon / OIF (programme D-CLIC). Modules pratiques en marketing digital, acculturation numérique, outils IA (ChatGPT, Midjourney) et No-Code.'
        : 'Certified pedagogical mentorship (Simplon Africa & OIF D-CLIC). Hands-on modules in digital marketing, digital culture, AI integration for professionals, and practical No-Code tooling.',
      leftPreview: '/banners/DECLIC.jpg',
      rightPreview: '/banners/Ecole241.jpg',
      deliverables: [
        'OIF D-CLIC Mentorship',
        'Corporate AI Workshops',
        'Hands-on Digital Marketing',
        'Active Pedagogy Certification'
      ]
    }
  ];

  const current = services[selectedIndex];

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#08080a] text-white border-b border-white/10 overflow-hidden">
      
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-zinc-900/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-2 text-xs font-space text-primary uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4" />
            <span>{t('services.sectionTitle')}</span>
          </div>
          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white mb-4">
            {t('services.title')}
          </h2>
          <p className="font-inter text-sm sm:text-base text-zinc-400">
            {t('services.subtitle')}
          </p>
        </div>

        {/* The Exact Reference Design: Interactive List with Floating Cards on Both Sides */}
        <div className="relative max-w-5xl mx-auto py-8">
          
          {/* Floating Left Preview Mockup */}
          <div className="hidden xl:block absolute left-[-40px] top-1/2 -translate-y-1/2 w-64 h-44 rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-zinc-900 z-10 transition-all duration-500 transform hover:scale-105">
            <img
              src={current.leftPreview}
              alt="Service context preview left"
              className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
              <span className="font-space text-[10px] uppercase tracking-wider text-zinc-300">
                CASE // {current.category}
              </span>
            </div>
          </div>

          {/* Floating Right Preview Mockup */}
          <div className="hidden xl:block absolute right-[-40px] top-1/2 -translate-y-1/2 w-64 h-44 rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-zinc-900 z-10 transition-all duration-500 transform hover:scale-105">
            <img
              src={current.rightPreview}
              alt="Service context preview right"
              className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
              <span className="font-space text-[10px] uppercase tracking-wider text-zinc-300">
                DELIVERY // {current.id}
              </span>
            </div>
          </div>

          {/* Center Services Stack */}
          <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
            {services.map((svc, idx) => {
              const isActive = selectedIndex === idx;

              if (isActive) {
                // The Highlighted Active Row with Inverted White Banner
                return (
                  <div
                    key={svc.id}
                    className="w-full max-w-2xl bg-white text-black py-4 px-6 sm:px-8 rounded-full shadow-2xl flex items-center justify-between transition-all duration-300 transform scale-105 cursor-pointer"
                    onClick={() => setSelectedIndex(idx)}
                  >
                    <span className="font-space text-xs font-bold uppercase tracking-widest text-zinc-600">
                      —— [ {svc.id} ] ——
                    </span>
                    <span className="font-syne font-extrabold text-base sm:text-2xl uppercase tracking-tighter text-black text-center mx-2">
                      {svc.title}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-black flex-shrink-0" />
                  </div>
                );
              }

              // Inactive Service Row
              return (
                <button
                  key={svc.id}
                  onClick={() => setSelectedIndex(idx)}
                  className="group w-full max-w-xl py-3 px-6 rounded-full border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-3 text-zinc-400 hover:text-white"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-primary transition-colors" />
                  <span className="font-syne font-bold text-sm sm:text-lg uppercase tracking-tight">
                    {svc.title}
                  </span>
                  <span className="font-space text-xs text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    [{svc.id}]
                  </span>
                </button>
              );
            })}
          </div>

          {/* Expanded Detail Panel Below Active Selection */}
          <div className="mt-12 max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#0e0e13] border border-white/10 shadow-2xl relative animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-space text-primary uppercase tracking-widest">
                  METHODOLOGY & SCOPE // {current.id}
                </span>
                <h4 className="font-syne font-bold text-xl sm:text-2xl text-white uppercase">
                  {current.tagline}
                </h4>
              </div>
              <Button
                size="sm"
                onClick={() => navigate('/schedule')}
                className="bg-white hover:bg-zinc-200 text-black font-space text-xs uppercase tracking-wider px-5 py-2 rounded-full flex items-center gap-1.5 w-fit"
              >
                <span>{language === 'fr' ? 'Réserver une session' : 'Book a session'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </div>

            <p className="font-inter text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
              {current.description}
            </p>

            {/* Deliverables Pills */}
            <div className="grid sm:grid-cols-2 gap-3">
              {current.deliverables.map((del, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-space text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InteractiveServices;

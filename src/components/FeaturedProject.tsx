import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Sparkles, ChevronRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturedProject = () => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const featuredProjects = [
    {
      id: '01',
      title: 'SikaApp',
      subtitle: language === 'fr' ? 'IA & FinTech Personnelle' : 'AI & Personal FinTech',
      category: language === 'fr' ? 'Application Mobile • IA / ML' : 'Mobile Application • AI / ML',
      year: '2024 - 2025',
      status: language === 'fr' ? 'En Bêta Active' : 'Active Beta',
      description: language === 'fr'
        ? 'Application mobile de gestion financière révolutionnaire propulsée par l’intelligence artificielle et le Machine Learning. Lecture et analyse automatisée des flux et SMS financiers, catégorisation intelligente des dépenses, projections budgétaires prédictives et recommandations proactives pour maximiser la santé financière.'
        : 'Revolutionary mobile financial management application powered by artificial intelligence and Machine Learning. Automated parsing and analytics of financial SMS notifications, intelligent expense classification, predictive budget modeling, and proactive financial health recommendations.',
      image: '/Sikaapp.jpeg',
      logo: '/logored.png',
      link: '#',
      stack: ['Flutter', 'Python / ML', 'FastAPI', 'Supabase', 'NLP'],
      metrics: [
        { label: language === 'fr' ? 'Précision IA' : 'AI Accuracy', value: '98%' },
        { label: language === 'fr' ? 'Gain de temps' : 'Time Saved', value: '4.5h/mois' },
        { label: language === 'fr' ? 'Statut' : 'Status', value: 'Beta Private' }
      ]
    },
    {
      id: '02',
      title: 'Africakard',
      subtitle: language === 'fr' ? 'Cartes Cadeaux & Divertissement' : 'Digital Gift Cards & Entertainment',
      category: language === 'fr' ? 'E-Commerce • Product Management • Growth' : 'E-Commerce • Product Management • Growth',
      year: '2023 - 2024',
      status: language === 'fr' ? 'Déployé' : 'Live Product',
      description: language === 'fr'
        ? 'Plateforme digitale majeure spécialisée dans l’émission, l’achat et la distribution instantanée de cartes cadeaux numériques et d’abonnements de divertissement en Afrique. Conduite complète de la feuille de route produit, de l’optimisation du tunnel d’achat et de la stratégie d’acquisition utilisateur.'
        : 'Major digital platform specializing in instant issuance, purchasing, and distribution of digital gift cards and streaming subscriptions across Africa. Led end-to-end product roadmapping, checkout funnel optimization, and high-velocity user acquisition strategies.',
      image: '/banners/AFRICAKARD.png',
      logo: '/logos/LOGO AFRICAKARD@300x.png',
      link: '#',
      stack: ['Next.js', 'Stripe & Mobile Money', 'Product Strategy', 'Growth Audits'],
      metrics: [
        { label: language === 'fr' ? 'Utilisateurs Actifs' : 'Active Users', value: '+150%' },
        { label: language === 'fr' ? 'Volume Ventes' : 'Transactions', value: '+200%' },
        { label: language === 'fr' ? 'Rétention' : 'Retention Rate', value: '85%' }
      ]
    },
    {
      id: '03',
      title: 'École 241',
      subtitle: language === 'fr' ? 'Hub de Formation & Numérique' : 'Digital Academy & Tech Hub',
      category: language === 'fr' ? 'Pédagogie Active • EdTech • Transformation' : 'Active Pedagogy • EdTech • Transformation',
      year: '2022 - 2024',
      status: language === 'fr' ? 'En cours' : 'Ongoing Impact',
      description: language === 'fr'
        ? 'Établissement pionnier de formation aux métiers du numérique basé au Gabon, impulsé par l’incubateur Ogooué Labs. Structuration pédagogique, conception de plateformes éducatives (CodeSchool), accompagnement d’apprenants vers l’employabilité et mise en œuvre d’ateliers pratiques en Product Management et No-Code.'
        : 'Pioneering digital education institution based in Gabon, powered by Ogooué Labs. Structured pedagogical frameworks, engineered educational web platforms (CodeSchool), mentored students toward high-retention employment, and deployed hands-on workshops in Product Management and No-Code.',
      image: '/banners/Ecole241.jpg',
      logo: '/logos/E241 NOIR.png',
      link: '#',
      stack: ['Product Conception', 'Active Pedagogy', 'LMS Design', 'Simplon Africa'],
      metrics: [
        { label: language === 'fr' ? 'Talents Formés' : 'Trained Talents', value: '200+' },
        { label: language === 'fr' ? 'Insertion Pro' : 'Job Placement', value: '75%' },
        { label: language === 'fr' ? 'Satisfaction' : 'Satisfaction', value: '94%' }
      ]
    },
    {
      id: '04',
      title: 'FGTT Official',
      subtitle: language === 'fr' ? 'Plateforme Fédérale Numérique' : 'Official Federation Platform',
      category: language === 'fr' ? 'Design & Développement Web' : 'Web Design & Platform',
      year: '2023',
      status: language === 'fr' ? 'Officiel' : 'Official',
      description: language === 'fr'
        ? 'Conception intégrale et déploiement de la plateforme officielle de la Fédération Gabonaise de Tennis de Table. Centralisation des compétitions nationales, profils des athlètes, calendrier des événements et actualités officielles dans une interface moderne et responsive.'
        : 'Complete architecture and deployment of the official Gabonese Table Tennis Federation portal. Centralized national competitions, athlete rosters, event schedules, and tournament results within a modern, mobile-first responsive interface.',
      image: '/banners/fgtt.png',
      logo: '/logos/fgtt.png',
      link: '#',
      stack: ['React', 'Tailwind CSS', 'CMS', 'Responsive UX'],
      metrics: [
        { label: language === 'fr' ? 'Visiteurs/mois' : 'Monthly Visits', value: '1500+' },
        { label: language === 'fr' ? 'Durée Session' : 'Avg Session', value: '4m 20s' },
        { label: language === 'fr' ? 'Satisfaction' : 'Satisfaction', value: '95%' }
      ]
    }
  ];

  const current = featuredProjects[activeTab];

  return (
    <section id="featured-work" className="relative py-24 sm:py-32 bg-[#08080a] text-white border-b border-white/10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Top Header & Tabs Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-space text-primary uppercase tracking-widest mb-3">
              <Sparkles className="w-4 h-4" />
              <span>{t('featured.label')}</span>
            </div>
            <h2 className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter text-white">
              FEATURED PROJECT
            </h2>
          </div>

          {/* Technical Tabs Selector (01 / 02 / 03 / 04) */}
          <div className="flex flex-wrap items-center gap-2 bg-[#121216] p-1.5 rounded-full border border-white/10">
            {featuredProjects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-space text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeTab === idx
                    ? 'bg-white text-black font-bold shadow-lg'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{proj.id}</span>
                <span className="hidden sm:inline">/ {proj.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Card Content Area */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Technical Metadata & Detailed Brief */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Box Header */}
            <div className="p-6 rounded-2xl bg-[#0f0f14] border border-white/10 shadow-2xl relative">
              {/* Corner crosshairs */}
              <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-600">+</div>
              <div className="absolute top-2 right-2 text-[10px] font-mono text-zinc-600">+</div>
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-600">+</div>
              <div className="absolute bottom-2 right-2 text-[10px] font-mono text-zinc-600">+</div>

              <div className="flex items-center justify-between text-xs font-space text-zinc-500 uppercase tracking-widest mb-4">
                <span>[ {current.id} / 04 ]</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {current.status}
                </span>
              </div>

              <h3 className="font-syne font-extrabold text-3xl sm:text-4xl uppercase text-white mb-2 tracking-tight">
                {current.title}
              </h3>
              <p className="font-space text-xs text-primary uppercase tracking-wider mb-4">
                {current.subtitle}
              </p>

              <p className="font-inter text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
                {current.description}
              </p>

              {/* Stack tags */}
              <div className="mb-6">
                <div className="text-[10px] font-space text-zinc-500 uppercase tracking-widest mb-2">
                  {t('featured.stack')}
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.stack.map((item, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-space text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantitative Metrics */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-white/10">
                {current.metrics.map((metric, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-syne font-bold text-lg sm:text-xl text-white">
                      {metric.value}
                    </span>
                    <span className="font-space text-[10px] text-zinc-500 uppercase tracking-wider">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Row */}
            <div className="flex items-center gap-4">
              <Button
                onClick={() => {
                  const el = document.getElementById('archive');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white hover:bg-zinc-200 text-black font-space font-medium text-xs uppercase tracking-wider px-6 py-5 rounded-full flex items-center gap-2 transition-all duration-200"
              >
                <span>{language === 'fr' ? 'Voir toutes les réalisations' : 'View Full Archive'}</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Column: Viewport Frame with Crosshairs */}
          <div className="lg:col-span-7">
            <div className="relative group rounded-2xl bg-[#111116] border border-white/15 p-2 sm:p-4 shadow-2xl overflow-hidden">
              
              {/* Technical framing header bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-3 text-[11px] font-space text-zinc-500 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-zinc-400">{current.category}</span>
                </div>
                <span>YEAR: {current.year}</span>
              </div>

              {/* Main Image Container */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/80">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover object-center filter contrast-110 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle vignette & wireframe crosshair overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Project Logo Watermark Badge */}
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md p-2.5 rounded-xl border border-white/15">
                  <img
                    src={current.logo}
                    alt={`${current.title} logo`}
                    className="h-8 w-auto object-contain brightness-110"
                  />
                </div>

                {/* Crosshairs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                  <div className="w-24 h-24 border border-dashed border-white rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-mono">+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;

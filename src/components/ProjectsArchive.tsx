import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ArrowUpRight, Sparkles, Filter, ExternalLink, X } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  category: 'product' | 'growth' | 'training' | 'web';
  categoryLabel: string;
  year: string;
  image: string;
  description: string;
  fullDetails?: string;
  stack?: string[];
  link?: string;
}

const ProjectsArchive = () => {
  const { language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'product' | 'growth' | 'training' | 'web'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects: ProjectItem[] = [
    {
      id: '01',
      title: 'SikaApp',
      category: 'product',
      categoryLabel: language === 'fr' ? 'Produit & IA' : 'Product & AI',
      year: '2024',
      image: '/Sikaapp.jpeg',
      description: language === 'fr'
        ? 'Application mobile fintech avec Machine Learning pour automatiser la gestion des dépenses et l’analyse des SMS financiers.'
        : 'Fintech mobile app powered by Machine Learning for automated expense parsing and predictive budgeting.',
      fullDetails: language === 'fr'
        ? 'Conception produit de A à Z : étude utilisateur, modélisation des flux, architecture Flutter et modèles NLP pour interpréter les notifications bancaires avec un taux de précision de 98%.'
        : 'Full end-to-end product design: customer research, workflow modeling, Flutter architecture, and NLP models for bank alert parsing with 98% accuracy.',
      stack: ['Flutter', 'Python ML', 'FastAPI', 'Supabase'],
      link: '#'
    },
    {
      id: '02',
      title: 'Africakard',
      category: 'growth',
      categoryLabel: language === 'fr' ? 'Growth & E-Commerce' : 'Growth & E-Commerce',
      year: '2023',
      image: '/banners/AFRICAKARD.png',
      description: language === 'fr'
        ? 'Plateforme de cartes cadeaux digitales et divertissement avec +200% de volume de vente généré.'
        : 'Digital gift cards and gaming platform with +200% transaction volume generated.',
      fullDetails: language === 'fr'
        ? 'Gestion produit et growth marketing : refonte du tunnel d’achat, intégration Mobile Money et Stripe, campagnes de fidélisation ayant permis une rétention de 85%.'
        : 'Product management and growth marketing: checkout optimization, Mobile Money and Stripe integration, and automated retention loops yielding 85% retention.',
      stack: ['Next.js', 'Stripe', 'Mobile Money', 'Growth Sprints'],
      link: '#'
    },
    {
      id: '03',
      title: 'École 241',
      category: 'training',
      categoryLabel: language === 'fr' ? 'Formation & EdTech' : 'Training & EdTech',
      year: '2022-2024',
      image: '/banners/Ecole241.jpg',
      description: language === 'fr'
        ? 'Hub de formation aux métiers du numérique et incubateur de talents en Afrique centrale.'
        : 'Digital training hub and talent incubator based in Central Africa.',
      fullDetails: language === 'fr'
        ? 'Coordination pédagogique, formation de plus de 200 apprenants, mise en place de la méthodologie de pédagogie active Simplon et structuration des modules Product & No-Code.'
        : 'Pedagogical coordination, training over 200 learners, implementing Simplon active pedagogy frameworks and structuring Product & No-Code modules.',
      stack: ['Active Pedagogy', 'Product Management', 'Ogooué Labs', 'Simplon'],
      link: '#'
    },
    {
      id: '04',
      title: 'FGTT Official',
      category: 'web',
      categoryLabel: language === 'fr' ? 'Plateforme Web' : 'Web Platform',
      year: '2023',
      image: '/banners/fgtt.png',
      description: language === 'fr'
        ? 'Site officiel de la Fédération Gabonaise de Tennis de Table : compétitions, athlètes et actualités.'
        : 'Official portal of the Gabonese Table Tennis Federation: national tournaments, rosters and news.',
      fullDetails: language === 'fr'
        ? 'Conception ergonomique et développement web responsive complet pour moderniser la communication institutionnelle de la fédération et diffuser les classements en direct.'
        : 'Ergonomic design and full responsive web deployment modernizing the federation’s institutional communication and real-time tournament brackets.',
      stack: ['React', 'Tailwind CSS', 'CMS', 'Responsive UX'],
      link: '#'
    },
    {
      id: '05',
      title: 'D-CLIC OIF',
      category: 'training',
      categoryLabel: language === 'fr' ? 'Formation Digitale' : 'Digital Mentorship',
      year: '2024',
      image: '/banners/DECLIC.jpg',
      description: language === 'fr'
        ? 'Programme international de l’OIF pour l’autonomisation numérique de milliers de jeunes francophones.'
        : 'International OIF program empowering thousands of young French-speaking talents.',
      fullDetails: language === 'fr'
        ? 'Tutorat et accompagnement de plus de 120 apprenants en marketing digital, stratégie d’acquisition, SEO et réseaux sociaux, avec un taux de satisfaction de plus de 90%.'
        : 'Mentoring 120+ students in digital marketing, multi-channel acquisition, SEO and social media strategy, with over 90% satisfaction rate.',
      stack: ['Digital Marketing', 'OIF', 'Social Media Strategy', 'Mentorship'],
      link: '#'
    },
    {
      id: '06',
      title: 'CodeSchool',
      category: 'product',
      categoryLabel: language === 'fr' ? 'Plateforme Pédagogique' : 'Learning Platform',
      year: '2022',
      image: '/code school.jpg',
      description: language === 'fr'
        ? 'Plateforme LMS interactive conçue pour centraliser les cours et le suivi des étudiants à École 241.'
        : 'Interactive LMS platform designed to centralize learning workflows and tracking at École 241.',
      fullDetails: language === 'fr'
        ? 'Conception produit, personas d’apprenants, parcours utilisateur et ergonomie en collaboration avec l’équipe technique pour accélérer l’assimilation des compétences.'
        : 'Product conception, learner personas, UX user flows and interface architecture in collaboration with engineering to accelerate knowledge retention.',
      stack: ['Product Conception', 'UX Architecture', 'EdTech LMS'],
      link: 'https://www.yohannobiang.com/codeschool.html'
    },
    {
      id: '07',
      title: 'IA pour les Managers',
      category: 'training',
      categoryLabel: language === 'fr' ? 'Certification' : 'Certification',
      year: '2024',
      image: '/certifications/Certificat - IA pour les managers.png',
      description: language === 'fr'
        ? 'Maîtrise des modèles d’IA générative et de l’automatisation des processus pour dirigeants.'
        : 'Mastery of generative AI workflows and process automation for leadership.',
      fullDetails: language === 'fr'
        ? 'Certification validant les compétences en implémentation d’agents IA, prompting avancé, automatisation No-Code et stratégie de transformation pour les entreprises.'
        : 'Certification validating skills in AI agent deployment, advanced prompting, No-Code automation and enterprise digital transformation strategy.',
      stack: ['Generative AI', 'Automation', 'LLMs', 'Prompt Engineering'],
      link: '#'
    },
    {
      id: '08',
      title: 'Product Manager Certifié',
      category: 'product',
      categoryLabel: language === 'fr' ? 'Certification' : 'Certification',
      year: '2022',
      image: '/certifications/Certificat Product Manager.jpeg',
      description: language === 'fr'
        ? 'Certification officielle en conception et gestion de cycle de vie produit logiciel.'
        : 'Official certification in product strategy and software product lifecycle management.',
      fullDetails: language === 'fr'
        ? 'Validation des méthodologies Scrum, Agile, Product Discovery, User Mapping, priorisation de backlog et métriques de performance de produits numériques.'
        : 'Validation of Scrum, Agile methodologies, Product Discovery, User Story Mapping, backlog prioritization and product analytics.',
      stack: ['Product Management', 'Scrum / Agile', 'Discovery', 'Analytics'],
      link: '#'
    },
    {
      id: '09',
      title: 'Pédagogie Active',
      category: 'training',
      categoryLabel: language === 'fr' ? 'Certification' : 'Certification',
      year: '2024',
      image: '/certifications/Certificat pédagogie active.png',
      description: language === 'fr'
        ? 'Certification Simplon Africa en ingénierie pédagogique par la pratique et projets concrets.'
        : 'Simplon Africa certification in project-based active pedagogical engineering.',
      fullDetails: language === 'fr'
        ? 'Méthodes d’enseignement immersif par les pairs, coaching bienveillant et évaluation par compétences dans les technologies du web.'
        : 'Peer-to-peer immersive learning frameworks, coaching and competency-based assessment in web technologies.',
      stack: ['Simplon Africa', 'Active Pedagogy', 'Talent Coaching'],
      link: '#'
    },
    {
      id: '10',
      title: 'Google & HubSpot Certifications',
      category: 'growth',
      categoryLabel: language === 'fr' ? 'Marketing & Growth' : 'Marketing & Growth',
      year: '2023',
      image: '/certifications/Certification Inbound.png',
      description: language === 'fr'
        ? 'Certifications Inbound Marketing, Social Media Marketing et Google Digital Marketing.'
        : 'Inbound Marketing, Social Media Marketing and Google Digital Marketing certifications.',
      fullDetails: language === 'fr'
        ? 'Compétences avancées en référencement naturel (SEO), inbound marketing, tunnels d’acquisition et campagnes publicitaires de conversion.'
        : 'Advanced skills in organic search (SEO), inbound marketing, acquisition funnels and high-converting paid campaigns.',
      stack: ['Google Digital', 'HubSpot Inbound', 'Social Media Marketing'],
      link: '#'
    },
    {
      id: '11',
      title: 'Dressing for Kids',
      category: 'growth',
      categoryLabel: language === 'fr' ? 'Growth Consulting' : 'Growth Consulting',
      year: '2022',
      image: '/logos/Dressingforkids.png',
      description: language === 'fr'
        ? 'Accompagnement à la structuration du catalogue et stratégie de distribution en ligne.'
        : 'Catalog structuring support and online distribution growth strategy.',
      fullDetails: language === 'fr'
        ? 'Optimisation du catalogue e-commerce, mise en place des canaux WhatsApp Business et réseaux sociaux pour générer des commandes régulières.'
        : 'E-commerce catalog optimization, WhatsApp Business and social selling channel engineering driving consistent orders.',
      stack: ['E-Commerce Growth', 'Social Selling', 'Catalog Architecture'],
      link: '#'
    },
    {
      id: '12',
      title: 'Chez Jimmy',
      category: 'growth',
      categoryLabel: language === 'fr' ? 'Branding & Growth' : 'Branding & Growth',
      year: '2021',
      image: '/logos/chezjimmy.jpg',
      description: language === 'fr'
        ? 'Stratégie de marque et présence locale pour dynamiser l’affluence et la notoriété.'
        : 'Brand strategy and local digital presence driving traffic and customer loyalty.',
      fullDetails: language === 'fr'
        ? 'Stratégie de contenu visuel, visibilité locale sur les réseaux sociaux et campagnes d’engagement client ciblées.'
        : 'Visual content strategy, local Google/Social presence, and targeted customer engagement campaigns.',
      stack: ['Local Growth', 'Brand Identity', 'Social Engagement'],
      link: '#'
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const filters = [
    { key: 'all', label: t('archive.all') },
    { key: 'product', label: t('archive.product') },
    { key: 'growth', label: t('archive.growth') },
    { key: 'training', label: t('archive.training') },
    { key: 'web', label: t('archive.web') }
  ];

  return (
    <section id="archive" className="relative py-24 sm:py-32 bg-[#08080a] text-white border-b border-white/10 overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-space text-primary uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CATALOG // ARCHIVE</span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white">
              {t('archive.title')}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#121216] p-1.5 rounded-full border border-white/10">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key as 'all' | 'product' | 'growth' | 'training' | 'web')}
                className={`px-3.5 py-1.5 rounded-full font-space text-xs uppercase tracking-wider transition-all duration-200 ${
                  activeFilter === f.key
                    ? 'bg-white text-black font-bold shadow'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* The Exact Reference Bento / Contact-Sheet Grid Layout (4 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProjects.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProject(item)}
              className="group relative rounded-xl bg-[#0f0f14] border border-white/10 p-3 flex flex-col justify-between hover:border-white/30 hover:bg-[#14141c] transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Image Frame with Tech Perforations / Label */}
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-black/60 mb-3 border border-white/5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                
                {/* Index tag top-left */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-space text-zinc-300 border border-white/10">
                  [{item.id}]
                </div>

                {/* Year tag top-right */}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-space text-zinc-400 border border-white/10">
                  {item.year}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="font-space text-xs uppercase tracking-widest text-white px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center gap-1.5">
                    <span>{language === 'fr' ? 'Détails' : 'View'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card Meta Info */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between text-[10px] font-space text-primary uppercase tracking-wider mb-1">
                  <span>{item.categoryLabel}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-primary transition-colors" />
                </div>
                <h4 className="font-syne font-bold text-base text-white group-hover:text-white line-clamp-1">
                  {item.title}
                </h4>
                <p className="font-inter text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="bg-[#0e0e13] border border-white/15 text-white max-w-2xl p-6 sm:p-8 rounded-2xl shadow-2xl">
          {selectedProject && (
            <div>
              <div className="flex items-center justify-between text-xs font-space text-primary uppercase tracking-widest mb-3">
                <span>// PROJECT DETAIL [{selectedProject.id}]</span>
                <span className="text-zinc-400">{selectedProject.year}</span>
              </div>

              <DialogTitle className="font-syne font-extrabold text-2xl sm:text-3xl uppercase text-white mb-2">
                {selectedProject.title}
              </DialogTitle>

              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/80 my-4 border border-white/10">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <DialogDescription className="font-inter text-sm sm:text-base text-zinc-300 leading-relaxed my-4">
                {selectedProject.fullDetails || selectedProject.description}
              </DialogDescription>

              {selectedProject.stack && (
                <div className="mb-6">
                  <span className="text-[10px] font-space text-zinc-500 uppercase tracking-widest block mb-2">
                    TECHNOLOGIES & CADRE
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((stk, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-space text-zinc-300"
                      >
                        {stk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-white/10">
                {selectedProject.link && selectedProject.link !== '#' ? (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-zinc-200 text-black font-space text-xs font-semibold uppercase px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors"
                  >
                    <span>{language === 'fr' ? 'Consulter le projet' : 'Visit Live Project'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="bg-white/10 hover:bg-white/20 text-white font-space text-xs uppercase px-5 py-2.5 rounded-full"
                  >
                    {language === 'fr' ? 'Fermer' : 'Close'}
                  </button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsArchive;

import { useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CollaborationsTable = () => {
  const { language, t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const collaborations = [
    {
      client: "Organisation Internationale de la Francophonie (OIF)",
      shortName: "OIF D-CLIC",
      logo: "/logos/Logo_OIF.svg.png",
      role: language === 'fr' ? 'Tuteur Marketing Digital & Pédagogie Active' : 'Digital Marketing & Active Pedagogy Tutor',
      year: '2024',
      status: language === 'fr' ? '120+ Apprenants' : '120+ Learners',
      category: 'Training'
    },
    {
      client: "SikaApp",
      shortName: "SikaApp",
      logo: "/logored.png",
      role: language === 'fr' ? 'Co-Fondateur & Product Manager IA / FinTech' : 'Co-Founder & AI FinTech Product Manager',
      year: '2024',
      status: 'Beta Private',
      category: 'Product'
    },
    {
      client: "Africakard",
      shortName: "Africakard",
      logo: "/logos/LOGO AFRICAKARD@300x.png",
      role: language === 'fr' ? 'Lead Product & Growth Manager' : 'Lead Product & Growth Manager',
      year: '2023',
      status: '+200% Vol.',
      category: 'Growth'
    },
    {
      client: "École 241 (Ogooué Labs)",
      shortName: "École 241",
      logo: "/logos/E241 NOIR.png",
      role: language === 'fr' ? 'Conception Produit & Formateur Numérique' : 'Product Conception & Digital Mentor',
      year: '2022-2024',
      status: '200+ Diplômés',
      category: 'EdTech'
    },
    {
      client: "Fédération Gabonaise de Tennis de Table",
      shortName: "FGTT",
      logo: "/logos/fgtt.png",
      role: language === 'fr' ? 'Conception & Développement Plateforme Officielle' : 'Official Web Portal Design & Architecture',
      year: '2023',
      status: 'Live Web',
      category: 'Web'
    },
    {
      client: "CodeSchool",
      shortName: "CodeSchool",
      logo: "/logos/E241 NOIR.png",
      role: language === 'fr' ? 'Conception Produit & UX (LMS)' : 'LMS Product Design & UX Conception',
      year: '2022',
      status: 'EdTech MVP',
      category: 'Product'
    },
    {
      client: "Simplon Africa",
      shortName: "Simplon co",
      logo: "/logos/école-simplon-logo.png",
      role: language === 'fr' ? 'Accompagnement & Pédagogie Active' : 'Active Pedagogy & Digital Skills Mentor',
      year: '2022',
      status: 'Certifié',
      category: 'Training'
    },
    {
      client: "Dressing for Kids",
      shortName: "Dressing for Kids",
      logo: "/logos/Dressingforkids.png",
      role: language === 'fr' ? 'Stratégie de Croissance & Acquisition' : 'Growth Strategy & Acquisition Consulting',
      year: '2022',
      status: 'E-commerce',
      category: 'Growth'
    },
    {
      client: "Just Sport Fit",
      shortName: "Just Sport Fit",
      logo: "/logos/justsportfit.png",
      role: language === 'fr' ? 'Stratégie Digitale & Présence Web' : 'Digital Strategy & Web Architecture',
      year: '2021',
      status: 'Consulting',
      category: 'Web'
    },
    {
      client: "Chez Jimmy",
      shortName: "Chez Jimmy",
      logo: "/logos/chezjimmy.jpg",
      role: language === 'fr' ? 'Branding Digital & Optimisation Locale' : 'Digital Branding & Local Growth Engine',
      year: '2021',
      status: 'Branding',
      category: 'Growth'
    },
    {
      client: "Restaure Service",
      shortName: "Restaure Service",
      logo: "/logos/restaureservice.png",
      role: language === 'fr' ? 'Transformation Digitale & UX' : 'UX & Digital Transformation Roadmap',
      year: '2021',
      status: 'Consulting',
      category: 'Tech'
    },
    {
      client: "SNPS",
      shortName: "SNPS",
      logo: "/logos/snps.png",
      role: language === 'fr' ? 'Accompagnement Numérique & Processus' : 'Digital Identity & Process Optimization',
      year: '2020',
      status: 'Enterprise',
      category: 'Tech'
    }
  ];

  return (
    <section id="collaborations" className="relative py-24 sm:py-32 bg-[#08080a] text-white border-b border-white/10 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-zinc-900/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Stacked Editorial Headline matching Reference Image */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="flex items-center gap-2 text-xs font-space text-primary uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INDEX // 2020 - 2025</span>
            </div>

            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl leading-[1.05] uppercase tracking-tighter text-white mb-6">
              A SELECTION<br />
              OF RECENT<br />
              COLLABORATIONS
            </h2>

            <p className="font-inter text-sm text-zinc-400 leading-relaxed max-w-sm mb-8">
              {t('collab.subtitle')}
            </p>

            {/* Hover preview display box */}
            <div className="hidden lg:block p-4 rounded-xl bg-[#0f0f14] border border-white/10 relative overflow-hidden h-36">
              {hoveredIndex !== null ? (
                <div className="flex items-center gap-4 h-full animate-fade-in">
                  <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/10 p-2 flex items-center justify-center flex-shrink-0">
                    <img
                      src={collaborations[hoveredIndex].logo}
                      alt={collaborations[hoveredIndex].client}
                      className="max-w-full max-h-full object-contain filter brightness-110"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-space text-primary uppercase tracking-wider block">
                      {collaborations[hoveredIndex].category} • {collaborations[hoveredIndex].year}
                    </span>
                    <h5 className="font-syne font-bold text-sm text-white line-clamp-1">
                      {collaborations[hoveredIndex].client}
                    </h5>
                    <p className="text-[11px] font-space text-zinc-400 mt-1 line-clamp-2">
                      {collaborations[hoveredIndex].role}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-zinc-600 font-space text-xs uppercase tracking-widest">
                  <span>// SURVOLEZ UNE LIGNE</span>
                  <span className="text-[10px] text-zinc-700 mt-1">POUR AFFICHER L’APERCU</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Editorial Data Table */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden border-t border-white/15">
              
              {/* Table Header */}
              <div className="grid grid-cols-12 py-3 px-4 text-[11px] font-space text-zinc-500 uppercase tracking-wider border-b border-white/10 bg-white/[0.02]">
                <div className="col-span-6 sm:col-span-5">{t('collab.client')}</div>
                <div className="col-span-4 sm:col-span-5">{t('collab.role')}</div>
                <div className="col-span-2 sm:col-span-2 text-right">{t('collab.year')}</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-white/10">
                {collaborations.map((item, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="grid grid-cols-12 py-4 px-4 items-center group hover:bg-white/5 transition-all duration-200 cursor-pointer"
                  >
                    {/* Client Name */}
                    <div className="col-span-6 sm:col-span-5 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-primary transition-colors flex-shrink-0" />
                      <span className="font-syne font-bold text-sm sm:text-base text-zinc-200 group-hover:text-white transition-colors line-clamp-1">
                        {item.client}
                      </span>
                    </div>

                    {/* Mission / Scope */}
                    <div className="col-span-4 sm:col-span-5 text-xs sm:text-sm font-inter text-zinc-400 group-hover:text-zinc-300 transition-colors line-clamp-1">
                      {item.role}
                    </div>

                    {/* Year & Arrow */}
                    <div className="col-span-2 sm:col-span-2 flex items-center justify-end gap-2 text-right">
                      <span className="font-space text-xs text-zinc-500 group-hover:text-white transition-colors">
                        {item.year}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Note */}
            <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-space text-zinc-500 uppercase tracking-widest">
              <span>TOTAL: 20+ MISSIONS & PARTENARIATS</span>
              <span className="text-zinc-400">GABON • SÉNÉGAL • FRANCE • DISTANCIEL</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CollaborationsTable;

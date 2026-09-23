import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Calendar, ArrowUpRight, Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import CVDownloadModal from '@/components/CVDownloadModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const AboutSection = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const pillars = [
    {
      title: language === 'fr' ? '7+ Ans de Rigueur Opérationnelle' : '7+ Years Operational Rigor',
      desc: language === 'fr'
        ? 'Issu de la logistique industrielle, j’applique aux produits digitaux une obsession pour l’optimisation des flux et la suppression des goulots.'
        : 'Originating from industrial logistics, I apply a relentless focus on flow optimization and bottleneck elimination to digital products.'
    },
    {
      title: language === 'fr' ? 'Product & Growth Centré Utilisateur' : 'User-Centric Product & Growth',
      desc: language === 'fr'
        ? 'Conception de solutions viables, désirables et techniquement réalisables avec des boucles de feedback rapides.'
        : 'Engineering viable, desirable and technically sound solutions with tight user feedback loops.'
    },
    {
      title: language === 'fr' ? 'Transmission & Impact Humain' : 'Active Pedagogy & Empowerment',
      desc: language === 'fr'
        ? 'Tuteur engagé pour l’OIF (D-CLIC) et formateur à École 241 pour outiller la nouvelle génération d’experts du numérique.'
        : 'Dedicated tutor for OIF (D-CLIC) and mentor at École 241, equipping next-generation African digital leaders.'
    }
  ];

  return (
    <>
      <section id="about" className="relative py-24 sm:py-32 bg-[#08080a] text-white border-b border-white/10 overflow-hidden">
        
        {/* Ambient lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-zinc-800/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 text-xs font-space text-primary uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE MIND BEHIND</span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white mb-4">
              {t('about.heading')}
            </h2>
            <p className="font-inter text-sm sm:text-base text-zinc-400">
              {t('about.subtitle')}
            </p>
          </div>

          {/* Portrait Composition with Floating Badges & Filmstrips matching Reference */}
          <div className="relative max-w-4xl mx-auto mb-16 flex flex-col items-center">
            
            {/* Ambient halo behind portrait */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[420px] h-80 sm:h-[420px] rounded-full bg-gradient-to-t from-primary/20 via-zinc-700/20 to-transparent blur-3xl pointer-events-none" />

            {/* Floating Horizontal Ribbon / Film Strip Behind Jesse */}
            <div className="absolute top-1/3 left-[-5%] right-[-5%] z-0 pointer-events-none opacity-40 overflow-hidden transform -rotate-3">
              <div className="flex gap-4 py-2 border-y border-white/15 bg-black/70 backdrop-blur-sm">
                {['/Sikaapp.jpeg', '/banners/AFRICAKARD.png', '/banners/Ecole241.jpg', '/banners/fgtt.png', '/code school.jpg'].map((src, i) => (
                  <div key={i} className="w-28 h-16 rounded overflow-hidden flex-shrink-0 border border-white/10">
                    <img src={src} alt="strip" className="w-full h-full object-cover filter grayscale contrast-125" />
                  </div>
                ))}
              </div>
            </div>

            {/* Central High-Res Jesse Portrait */}
            <div className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-[#0f0f14]">
              <img
                src="/me1 (2).png"
                alt="Jesse Ogoula at work"
                className="w-full h-auto object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="font-syne font-bold text-lg text-white block">Jesse Ogoula</span>
                <span className="font-space text-xs text-primary uppercase tracking-wider">Product & Growth Leader</span>
              </div>
            </div>

            {/* Floating Horizontal Film Strip In Front of Jesse (Lower Waist) */}
            <div className="absolute bottom-10 left-[-2%] right-[-2%] z-20 pointer-events-none overflow-hidden transform rotate-2">
              <div className="flex gap-4 py-1.5 border-y border-white/20 bg-[#0d0d12]/90 backdrop-blur-md shadow-2xl">
                {['/certifications/Certificat - IA pour les managers.png', '/certifications/Certificat Product Manager.jpeg', '/certifications/Certificat pédagogie active.png', '/certifications/Certification Google.png'].map((src, i) => (
                  <div key={i} className="w-24 h-14 rounded overflow-hidden flex-shrink-0 border border-white/20">
                    <img src={src} alt="cert" className="w-full h-full object-cover filter grayscale" />
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Metric Badges Around the Portrait */}
            <div className="absolute top-10 left-0 sm:left-4 z-20 hidden md:flex items-center gap-2 p-3 rounded-xl bg-black/80 border border-white/15 backdrop-blur-md shadow-xl">
              <span className="font-syne font-bold text-lg text-white">07+</span>
              <span className="font-space text-[10px] text-zinc-400 uppercase leading-tight">
                ANS LOGISTIQUE<br />& PROCESSUS
              </span>
            </div>

            <div className="absolute top-10 right-0 sm:right-4 z-20 hidden md:flex items-center gap-2 p-3 rounded-xl bg-black/80 border border-white/15 backdrop-blur-md shadow-xl">
              <span className="font-syne font-bold text-lg text-white">20+</span>
              <span className="font-space text-[10px] text-zinc-400 uppercase leading-tight">
                PRODUITS<br />ACCOMPAGNÉS
              </span>
            </div>

            <div className="absolute -bottom-6 left-6 z-30 hidden md:flex items-center gap-2 p-3 rounded-xl bg-black/90 border border-white/20 backdrop-blur-md shadow-2xl">
              <span className="font-syne font-bold text-lg text-primary">200+</span>
              <span className="font-space text-[10px] text-zinc-300 uppercase leading-tight">
                TALENTS FORMÉS<br />& CERTIFIÉS
              </span>
            </div>

            <div className="absolute -bottom-6 right-6 z-30 hidden md:flex items-center gap-2 p-3 rounded-xl bg-black/90 border border-white/20 backdrop-blur-md shadow-2xl">
              <span className="font-syne font-bold text-lg text-emerald-400">OIF</span>
              <span className="font-space text-[10px] text-zinc-300 uppercase leading-tight">
                TUTEUR OFFICIEL<br />PROGRAMME D-CLIC
              </span>
            </div>

          </div>

          {/* Strategic Narrative & Pillars Grid */}
          <div className="max-w-4xl mx-auto mt-12">
            
            {/* Biography Card */}
            <div className="p-6 sm:p-10 rounded-2xl bg-[#0e0e13] border border-white/10 shadow-2xl mb-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="font-space text-xs text-primary uppercase tracking-widest">
                  // BIOGRAPHY & MISSION
                </span>
                <span className="font-space text-xs text-zinc-500 uppercase">
                  LIBREVILLE / PARIS / REMOTE
                </span>
              </div>

              <div className="font-inter text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  {language === 'fr'
                    ? "Product & Growth Manager et formateur engagé, je suis passionné par le numérique comme puissant levier d’émancipation économique et de passage à l'échelle en Afrique."
                    : "Product & Growth Manager and dedicated tech educator, passionate about digital leverage as an engine for economic empowerment and scalable innovation in Africa."}
                </p>
                <p>
                  {language === 'fr'
                    ? "Après plus de 7 ans dans le secteur exigeant de la logistique, j’ai opéré dès 2020 une transition stratégique vers la conception de produits numériques et l'accompagnement à la transformation digitale. Depuis, j’ai guidé plus de 20 startups et entreprises vers des modèles centrés sur la valeur client et la rétention."
                    : "Following 7+ years in high-stakes logistics, I transitioned in 2020 toward digital product architecture and growth systems. Since then, I have empowered 20+ startups and institutions toward high-retention, user-centered product execution."}
                </p>

                {isExpanded && (
                  <div className="space-y-4 pt-2 animate-fade-in border-t border-white/10">
                    <p>
                      {language === 'fr'
                        ? "En parallèle, j'encadre des centaines de jeunes aux compétences numériques de pointe, notamment en tant que tuteur en marketing digital pour le prestigieux programme D-CLIC de l'OIF."
                        : "Concurrently, I mentor hundreds of young talents in future-proof digital competencies, notably as a lead marketing tutor for OIF’s prestigious D-CLIC program across francophone countries."}
                    </p>
                    <p>
                      {language === 'fr'
                        ? "Mes expertises clés : Product Management, Growth Hacking, architectures No-Code/IA générative, audit de conversion et pédagogie active."
                        : "Key core capabilities: Product Management, Growth Hacking, No-Code/AI architectures, conversion audits, and active pedagogical mentorship."}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="font-space text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors uppercase tracking-wider"
                >
                  <span>{isExpanded ? (language === 'fr' ? 'Réduire' : 'Show less') : (language === 'fr' ? 'Lire la suite' : 'Read full journey')}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsCVModalOpen(true)}
                    className="border-white/20 bg-white/5 hover:bg-white/10 text-white font-space text-xs uppercase tracking-wider rounded-full flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t('hero.download.cv')}</span>
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => navigate('/schedule')}
                    className="bg-white hover:bg-zinc-200 text-black font-space text-xs uppercase tracking-wider rounded-full flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t('hero.cta')}</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Core Pillars 3-Column Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {pillars.map((pil, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#0f0f14] border border-white/10 hover:border-white/25 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-syne font-bold text-base text-white uppercase mb-2">
                    {pil.title}
                  </h4>
                  <p className="font-inter text-xs text-zinc-400 leading-relaxed">
                    {pil.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* CV Download Modal */}
      <CVDownloadModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </>
  );
};

export default AboutSection;

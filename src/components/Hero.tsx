import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUpRight, Download, Calendar, Sparkles } from 'lucide-react';
import CVDownloadModal from '@/components/CVDownloadModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const stats = [
    { number: '20+', label: t('hero.stats.projects') },
    { number: '+35%', label: t('hero.stats.growth') },
    { number: '200+', label: t('hero.stats.students') }
  ];

  // Filmstrip frames featuring Jesse's real project captures
  const filmstripProjects = [
    { title: 'SikaApp AI', tag: 'Mobile & ML', img: '/Sikaapp.jpeg' },
    { title: 'Africakard', tag: 'FinTech', img: '/banners/AFRICAKARD.png' },
    { title: 'École 241', tag: 'EdTech', img: '/banners/Ecole241.jpg' },
    { title: 'FGTT Official', tag: 'Web Platform', img: '/banners/fgtt.png' },
    { title: 'CodeSchool', tag: 'LMS Platform', img: '/code school.jpg' },
    { title: 'D-CLIC OIF', tag: 'Digital Skills', img: '/banners/DECLIC.jpg' },
  ];

  return (
    <>
      <section
        id="work"
        className="relative min-h-screen flex flex-col justify-center bg-[#08080a] text-white pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b border-white/10"
      >
        {/* Subtle Architectural Grid & Spotlight Ambient Glow */}
        <div className="absolute inset-0 noise-bg pointer-events-none opacity-40" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-zinc-700/20 via-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-zinc-900/40 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Top Editorial Technical Coordinates */}
          <div className="flex flex-wrap items-center justify-between text-[11px] font-space text-zinc-500 uppercase tracking-widest border-b border-white/10 pb-4 mb-8 lg:mb-12">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>// JESSE OGOULA — PORTFOLIO 2024-2025</span>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <span>LAT: 0.4162° N / LON: 9.4673° E</span>
              <span className="text-zinc-400">LIBREVILLE, GABON • WORLDWIDE</span>
            </div>
          </div>

          {/* Main Grid: Headline Left / Cutout & 3D Filmstrip Right */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Bold Headline & Strategic Statement */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              {/* Micro badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300 font-space text-xs uppercase tracking-wider mb-6 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Product Management • Growth • EdTech</span>
              </div>

              {/* Huge Reference Typography */}
              <h1 className="font-syne font-extrabold text-5xl sm:text-7xl lg:text-[5.4rem] xl:text-[6.2rem] leading-[0.92] tracking-tighter uppercase mb-8 text-white">
                <span className="block">{t('hero.bigTitle1')}</span>
                <span className="block text-zinc-400">{t('hero.bigTitle2')}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                  {t('hero.bigTitle3')}
                </span>
              </h1>

              {/* Subtitle & Thesis */}
              <p className="font-inter text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl mb-8">
                {t('hero.subtitle')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Button
                  size="lg"
                  onClick={() => navigate('/schedule')}
                  className="bg-white hover:bg-zinc-200 text-black font-space font-semibold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-6 rounded-full flex items-center gap-2 shadow-xl hover:scale-105 transition-all duration-200"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t('hero.cta')}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsCVModalOpen(true)}
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white font-space font-medium text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-6 rounded-full flex items-center gap-2 transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('hero.download.cv')}</span>
                </Button>
              </div>

              {/* Numerical Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="font-syne font-bold text-2xl sm:text-3xl text-white tracking-tight">
                      {stat.number}
                    </span>
                    <span className="font-space text-[11px] sm:text-xs text-zinc-500 uppercase tracking-wider mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Cinematic Jesse Portrait & 3D Curved Filmstrip */}
            <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
              {/* Backlight / Ambient Aura */}
              <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-t from-primary/20 via-zinc-600/20 to-transparent blur-3xl pointer-events-none -translate-y-6" />

              {/* Container for 3D Perspective */}
              <div className="relative w-full max-w-[420px] sm:max-w-[480px] h-[480px] sm:h-[560px] flex items-end justify-center perspective-1000">
                
                {/* Filmstrip Layer Behind Jesse */}
                <div 
                  className="absolute top-12 left-[-15%] right-[-15%] z-0 pointer-events-none opacity-40"
                  style={{
                    transform: 'rotateX(16deg) rotateY(-18deg) rotateZ(-9deg) translateY(-20px)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="flex gap-3 overflow-hidden py-2 border-y border-white/10 bg-black/60 backdrop-blur-sm">
                    {filmstripProjects.concat(filmstripProjects).map((item, index) => (
                      <div
                        key={`rear-${index}`}
                        className="flex-shrink-0 w-28 h-20 bg-zinc-900 rounded border border-white/10 overflow-hidden relative"
                      >
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover filter grayscale contrast-125" />
                        <div className="absolute inset-0 bg-black/50" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Jesse Cutout Image */}
                <div className="relative z-10 w-full h-full flex items-end justify-center">
                  <img
                    src="/moi.png"
                    alt="Jesse Ogoula - Product & Growth Manager"
                    className="max-h-[500px] sm:max-h-[560px] w-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] select-none"
                  />
                </div>

                {/* The Signature 3D Filmstrip Ribbon Wrapping In Front Of Jesse */}
                <div
                  className="absolute bottom-16 -left-6 -right-6 sm:-left-12 sm:-right-12 z-20 pointer-events-auto"
                  style={{
                    transform: 'rotateX(14deg) rotateY(-12deg) rotateZ(-7deg)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="relative group bg-[#0d0d12]/95 border-y-2 border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.8)] backdrop-blur-md overflow-hidden py-2.5">
                    {/* 35mm Filmstrip Perforations on Top */}
                    <div className="flex justify-between px-2 mb-1.5 opacity-60">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div key={`perf-t-${i}`} className="w-2.5 h-1.5 bg-white/20 rounded-[1px]" />
                      ))}
                    </div>

                    {/* Continuous Sliding Filmstrip Cards */}
                    <div className="animate-marquee flex gap-3.5 items-center">
                      {filmstripProjects.concat(filmstripProjects).map((proj, i) => (
                        <div
                          key={`strip-${i}`}
                          className="flex-shrink-0 w-32 sm:w-36 h-20 sm:h-22 rounded bg-zinc-900 border border-white/15 overflow-hidden relative group/card cursor-pointer hover:scale-105 hover:border-primary transition-all duration-300"
                        >
                          <img
                            src={proj.img}
                            alt={proj.title}
                            className="w-full h-full object-cover filter grayscale contrast-125 group-hover/card:grayscale-0 transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-1.5">
                            <span className="font-space text-[10px] font-bold text-white uppercase tracking-tight truncate">
                              {proj.title}
                            </span>
                            <span className="text-[8px] font-space text-zinc-400 uppercase">
                              {proj.tag}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 35mm Filmstrip Perforations on Bottom */}
                    <div className="flex justify-between px-2 mt-1.5 opacity-60">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div key={`perf-b-${i}`} className="w-2.5 h-1.5 bg-white/20 rounded-[1px]" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Technical Crosshair Badges */}
                <div className="absolute top-8 right-2 z-20 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 border border-white/15 text-[10px] font-space text-zinc-300 uppercase backdrop-blur-md">
                  <span className="text-primary font-bold">+</span>
                  <span>PRODUCT ROADMAP</span>
                </div>

                <div className="absolute bottom-2 left-0 z-20 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 border border-white/15 text-[10px] font-space text-zinc-300 uppercase backdrop-blur-md">
                  <span className="text-primary font-bold">+</span>
                  <span>GROWTH ENGINES</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="flex justify-center mt-12">
            <a
              href="#manifesto-1"
              className="p-3 rounded-full border border-white/10 hover:border-white/30 text-zinc-500 hover:text-white transition-all duration-300 animate-bounce"
              aria-label="Scroll down"
            >
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CV Download Modal */}
      <CVDownloadModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </>
  );
};

export default Hero;

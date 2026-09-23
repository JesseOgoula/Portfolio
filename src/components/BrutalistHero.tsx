import { useLanguage } from '@/contexts/LanguageContext';

const BrutalistHero = () => {
  const { language } = useLanguage();

  return (
    <section
      id="work"
      className="relative min-h-[85vh] lg:min-h-screen bg-[#050505] text-[#F4F4F4] pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden hairline-b flex items-center"
    >
      {/* Full-Bleed 16:9 Cinematic Portrait Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/hero-portrait-16-9.png"
          alt="Jesse Ogoula - Product Strategist"
          className="w-full h-full object-cover object-[72%_center] sm:object-right filter contrast-115 brightness-95 select-none"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/portrait.png';
          }}
        />
        {/* Cinematic dark gradients to guarantee crystal-clear text contrast on left while letting face shine on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 via-50% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
        <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* Content Container on Top: Left-Aligned Editorial Typography */}
      <div className="w-full px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="max-w-3xl lg:max-w-4xl flex flex-col justify-center select-none">
          
          {/* Top Micro-Label */}
          <div className="flex items-center gap-3 text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#B5B5B5] uppercase mb-8 sm:mb-12">
            <span className="w-1.5 h-1.5 bg-[#F4F4F4]" />
            <span>
              {language === 'fr'
                ? '// 01 — STRATÉGIE PRODUIT, CROISSANCE, IA & EXPÉRIENCES DIGITALES'
                : '// 01 — CREATIVE DIRECTION, PRODUCT STRATEGY, AI & DIGITAL EXPERIENCES'}
            </span>
          </div>

          {/* Monumental Headline */}
          <div className="font-sans font-extrabold uppercase leading-[0.9] tracking-[-0.035em] text-[#F4F4F4] mb-8 sm:mb-12">
            {language === 'fr' ? (
              <>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] xl:text-[5.6rem]">
                  L&apos;IMPACT NE S&apos;ARRÊTE <br className="hidden sm:inline" />PAS À MOI.
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] xl:text-[5.6rem] text-[#F4F4F4]">
                  IL SE TRANSMET.
                </span>
              </>
            ) : (
              <>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] xl:text-[5.6rem]">
                  IMPACT DOESN&apos;T STOP <br className="hidden sm:inline" />WITH ME.
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] xl:text-[5.6rem] text-[#F4F4F4]">
                  IT IS PASSED ON.
                </span>
              </>
            )}
          </div>

          {/* Micro Lines & Scope Below Headline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 hairline-t max-w-xl">
            <div>
              <span className="block text-[8px] font-mono tracking-[0.2em] text-[#3A3A3A] uppercase mb-1">
                DISCIPLINE 01
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#B5B5B5] uppercase">
                {language === 'fr' ? 'PRODUCT & GROWTH' : 'PRODUCT & GROWTH'}
              </span>
            </div>
            <div>
              <span className="block text-[8px] font-mono tracking-[0.2em] text-[#3A3A3A] uppercase mb-1">
                DISCIPLINE 02
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#B5B5B5] uppercase">
                {language === 'fr' ? 'DESIGN D’EXPÉRIENCE' : 'DIGITAL EXPERIENCES'}
              </span>
            </div>
            <div>
              <span className="block text-[8px] font-mono tracking-[0.2em] text-[#3A3A3A] uppercase mb-1">
                DISCIPLINE 03
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#B5B5B5] uppercase">
                {language === 'fr' ? 'IA & AUTOMATISATION' : 'AI & AUTOMATION'}
              </span>
            </div>
          </div>

          {/* Subtle Pill Anchors */}
          <div className="flex items-center gap-6 mt-10 text-[10px] font-mono tracking-[0.2em] uppercase text-[#B5B5B5]">
            <a
              href="#manifesto"
              className="hover:text-white transition-colors underline underline-offset-4"
            >
              {language === 'fr' ? '[ PARCOURIR LES PROJETS MAJEURS ↓ ]' : '[ EXPLORE SELECTED WORKS ↓ ]'}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrutalistHero;

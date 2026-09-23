import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const SecondVisualHero: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section
      id="about"
      className="relative min-h-[950px] lg:min-h-[1100px] bg-[#050505] text-[#F4F4F4] pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden hairline-b flex flex-col items-center justify-between select-none"
    >
      {/* Studio Zenithal Backlight Vignette */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[#202020]/50 via-[#101010]/25 to-transparent blur-3xl pointer-events-none z-0" />

      {/* TOP: Monumental Statement with Flanking Hairlines & Colons */}
      <div className="w-full px-4 sm:px-8 lg:px-12 relative z-30 mb-8 sm:mb-12">
        <div className="relative flex items-center justify-center">
          
          {/* Left Hairline with Double Square Colons */}
          <div className="hidden md:flex items-center flex-1 mr-6 lg:mr-10">
            <div className="w-full hairline-t" />
            <div className="flex flex-col gap-1 ml-3 text-[#B5B5B5] font-mono text-[8px] leading-none">
              <span>▪</span>
              <span>▪</span>
            </div>
          </div>

          {/* Centered Multi-line Headline */}
          <div className="text-center max-w-4xl mx-auto">
            {language === 'fr' ? (
              <h2 className="font-sans font-bold uppercase text-2xl sm:text-4xl md:text-5xl lg:text-[3.1rem] leading-[1.08] tracking-[-0.035em] text-[#F4F4F4]">
                L&apos;IMPACT NAÎT DU JUSTE
                <br />
                QUESTIONNEMENT. LA STRATÉGIE
                <br />
                TRACE LE CAP, LE DESIGN DONNE
                <br />
                CORPS, ET LA RIGUEUR{' '}
                <span className="text-[#555] font-light">GARANTIT</span>
                <br />
                <span className="text-[#888]">QUE CHAQUE DÉTAIL SERT</span>
                <br />
                <span className="text-[#666]">LE DESSEIN GLOBAL</span>
              </h2>
            ) : (
              <h2 className="font-sans font-bold uppercase text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-[-0.035em] text-[#F4F4F4]">
                GOOD WORK IS BUILT ON GOOD
                <br />
                QUESTIONS. STRATEGY PROVIDES
                <br />
                THE DIRECTION, DESIGN GIVES IT
                <br />
                FORM, AND REFINEMENT{' '}
                <span className="text-[#555] font-light">ENSURES</span>
                <br />
                <span className="text-[#888]">EVERY DETAIL SUPPORTS THE</span>
                <br />
                <span className="text-[#666]">BIGGER PICTURE</span>
              </h2>
            )}
          </div>

          {/* Right Hairline with Double Square Colons */}
          <div className="hidden md:flex items-center flex-1 ml-6 lg:ml-10">
            <div className="flex flex-col gap-1 mr-3 text-[#B5B5B5] font-mono text-[8px] leading-none">
              <span>▪</span>
              <span>▪</span>
            </div>
            <div className="w-full hairline-t" />
          </div>

        </div>
      </div>

      {/* CENTER & BOTTOM: Cutout Subject, Angled Ribbons, Floating Project Previews & Gravitating Partner Logos */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 flex items-end justify-center min-h-[550px] sm:min-h-[650px] lg:min-h-[750px]">
        
        {/* ======================================================== */}
        {/* LAYER 1: REAR RIBBONS (Behind subject)                   */}
        {/* ======================================================== */}

        {/* Ribbon 1 (Top Rear - Slanted ~ -3.5deg) */}
        <div
          className="absolute top-28 sm:top-36 -left-20 -right-20 z-10 bg-[#E8E8E8] text-[#0A0A0A] py-2 sm:py-2.5 px-6 shadow-2xl pointer-events-none overflow-hidden"
          style={{ transform: 'rotate(-3.5deg)' }}
        >
          <div className="flex items-center space-x-8 font-mono text-[9px] sm:text-[11px] font-extrabold tracking-[0.22em] uppercase whitespace-nowrap opacity-90">
            {Array.from({ length: 12 }).map((_, i) => (
              <React.Fragment key={`r1-${i}`}>
                <span>
                  {language === 'fr'
                    ? '▪▪ TRANSFORMER LA COMPLEXITÉ EN CLARTÉ'
                    : '▪▪ TURNING COMPLEXITY INTO CLARITY'}
                </span>
                <span className="text-[#0A0A0A]/40">▪▪</span>
                <span>{language === 'fr' ? 'STRATÉGIE PRODUIT' : 'CREATIVE STRATEGY'}</span>
                <span className="text-[#0A0A0A]/40">▪▪</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Ribbon 2 (Mid Rear - Slanted ~ +2.2deg) */}
        <div
          className="absolute top-64 sm:top-80 -left-24 -right-24 z-10 bg-[#D4D4D4] text-[#0A0A0A] py-2 sm:py-2.5 px-6 shadow-2xl pointer-events-none overflow-hidden"
          style={{ transform: 'rotate(2.2deg)' }}
        >
          <div className="flex items-center space-x-8 font-mono text-[9px] sm:text-[11px] font-extrabold tracking-[0.22em] uppercase whitespace-nowrap opacity-90">
            {Array.from({ length: 12 }).map((_, i) => (
              <React.Fragment key={`r2-${i}`}>
                <span>▪▪ PRODUCT & GROWTH MANAGER</span>
                <span className="text-[#0A0A0A]/40">▪▪</span>
                <span>{language === 'fr' ? 'FORMATEUR DIGITAL & IA' : 'DIGITAL & AI TRAINER'}</span>
                <span className="text-[#0A0A0A]/40">▪▪</span>
                <span>{language === 'fr' ? 'ARCHITECTURE DE MARQUE' : 'BRAND ARCHITECTURE'}</span>
                <span className="text-[#0A0A0A]/40">▪▪</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* LAYER 3: SUBJECT CUTOUT PORTRAIT (Jesse Ogoula)          */}
        {/* ======================================================== */}
        <div className="relative z-20 w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[500px] flex flex-col items-center justify-end pointer-events-none">
          
          {/* Authentic Cutout Portrait (No frame, no border) */}
          <div className="relative w-full overflow-visible">
            <img
              src="/moi.png"
              alt="Jesse Ogoula - Product & Growth Manager"
              className="w-full h-auto object-contain filter grayscale contrast-125 brightness-95 select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              style={{
                transform: 'translate(0px, -120px) scale(1.3)',
                transformOrigin: 'center center',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/mee.png';
              }}
            />

            {/* Subtle Gradient Fade at bottom of torso */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
          </div>

        </div>

        {/* ======================================================== */}
        {/* LAYER 5: FOREGROUND RIBBON (In front of lower torso)      */}
        {/* ======================================================== */}
        <div
          className="absolute bottom-2 sm:bottom-4 -left-20 -right-20 z-30 bg-[#F4F4F4] text-[#0A0A0A] py-2 sm:py-2.5 px-6 shadow-[0_15px_35px_rgba(0,0,0,0.9)] pointer-events-none overflow-hidden"
          style={{ transform: 'rotate(-1.2deg)' }}
        >
          <div className="flex items-center space-x-8 font-mono text-[9px] sm:text-[11px] font-black tracking-[0.22em] uppercase whitespace-nowrap">
            {Array.from({ length: 12 }).map((_, i) => (
              <React.Fragment key={`r3-${i}`}>
                <span>
                  {language === 'fr'
                    ? '▪▪ TRANSFORMER LA COMPLEXITÉ EN CLARTÉ'
                    : '▪▪ TURNING COMPLEXITY INTO CLARITY'}
                </span>
                <span className="text-[#0A0A0A]/40">▪▪</span>
                <span>PRODUCT STRATEGY & UX</span>
                <span className="text-[#0A0A0A]/40">▪▪</span>
                <span>PORT-GENTIL • LIBREVILLE / GLOBAL</span>
                <span className="text-[#0A0A0A]/40">▪▪</span>
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};

export default SecondVisualHero;

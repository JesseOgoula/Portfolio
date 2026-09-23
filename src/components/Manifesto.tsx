import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Manifesto: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section
      id="manifesto"
      className="relative bg-[#050505] text-[#F4F4F4] py-24 sm:py-32 lg:py-40 overflow-hidden hairline-b select-none"
    >
      {/* Background Micro Coordinates */}
      <div className="absolute top-6 left-6 sm:left-12 flex items-center gap-3 font-mono text-[9px] tracking-[0.25em] text-[#3A3A3A] uppercase">
        <span>// 02 — STATEMENT</span>
        <span>•</span>
        <span>PORT-GENTIL / GLOBAL</span>
      </div>

      <div className="absolute top-6 right-6 sm:right-12 font-mono text-[9px] tracking-[0.25em] text-[#3A3A3A] uppercase">
        REF: PHILOSOPHY_2026
      </div>

      {/* Horizontal Crosshair Hairline through center */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-0">
        <div className="relative w-full hairline-t">
          {/* Center Crosshair '+' */}
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-3 font-mono text-[10px] text-[#3A3A3A] tracking-widest">
            +
          </div>
          {/* Left and Right Studio Crosses */}
          <div className="absolute left-8 -translate-y-1/2 bg-[#050505] px-2 font-mono text-[9px] text-[#222]">
            +
          </div>
          <div className="absolute right-8 -translate-y-1/2 bg-[#050505] px-2 font-mono text-[9px] text-[#222]">
            +
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10 text-center">
        {/* Editorial Sub-badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0B0B0B] border border-[#222] font-mono text-[9px] tracking-[0.25em] text-[#B5B5B5] uppercase mb-8 sm:mb-12">
          <span className="w-1.5 h-1.5 bg-[#F4F4F4]" />
          <span>
            {language === 'fr'
              ? 'MANIFESTE // ÉTHIQUE & PRINCIPES'
              : 'MANIFESTO // CORE CREATIVE ETHOS'}
          </span>
        </div>

        {/* Monumental Headline */}
        <h2 className="font-sans font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl lg:text-[4.1rem] leading-[1.03] tracking-[-0.035em] text-[#F4F4F4] max-w-5xl mx-auto">
          {language === 'fr' ? (
            <>
              REFUSER LE SUPERFLU. CONSTRUIRE DES ARCHITECTURES PRODUIT ET DES SYSTÈMES DIGITAUX{' '}
              <span className="inline-block px-2 sm:px-3 mx-1 bg-[#F4F4F4] text-[#050505] tracking-tight">
                FONDÉS
              </span>{' '}
              SUR UNE CLARTÉ ABSOLUE. LA RIGUEUR D&apos;EXÉCUTION AU SERVICE D&apos;UNE VALEUR TANGIBLE.
            </>
          ) : (
            <>
              WE REJECT THE SUPERFLUOUS. BUILDING IDENTITY SYSTEMS AND DIGITAL ENVIRONMENTS{' '}
              <span className="inline-block px-2 sm:px-3 mx-1 bg-[#F4F4F4] text-[#050505] tracking-tight">
                GROUNDED
              </span>{' '}
              IN EXTREME CLARITY. FORM AND REFINEMENT ENSURES EVERY DETAIL SUPPORTS THE BIGGER PICTURE.
            </>
          )}
        </h2>

        {/* Bottom Micro Meta */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 mt-12 sm:mt-16 text-[10px] font-mono tracking-[0.2em] text-[#B5B5B5] uppercase">
          <div className="flex items-center gap-2">
            <span className="text-[#3A3A3A]">[01]</span>
            <span>{language === 'fr' ? 'CLARTÉ CONCEPTUELLE' : 'INTENTIONAL ARCHITECTURE'}</span>
          </div>
          <span className="text-[#262626] hidden sm:inline">/</span>
          <div className="flex items-center gap-2">
            <span className="text-[#3A3A3A]">[02]</span>
            <span>{language === 'fr' ? 'EXÉCUTION MILLIMÉTRÉE' : 'UNCOMPROMISING PRECISION'}</span>
          </div>
          <span className="text-[#262626] hidden sm:inline">/</span>
          <div className="flex items-center gap-2">
            <span className="text-[#3A3A3A]">[03]</span>
            <span>{language === 'fr' ? 'IMPACT TANGIBLE' : 'LONG-TERM VALUE'}</span>
          </div>
        </div>
      </div>

      {/* Bottom Micro Reference */}
      <div className="absolute bottom-4 left-6 sm:left-12 font-mono text-[8px] tracking-widest text-[#262626] uppercase">
        ARCHIVE_ID // JOG-2026-M01
      </div>
      <div className="absolute bottom-4 right-6 sm:right-12 font-mono text-[8px] tracking-widest text-[#262626] uppercase">
        LAT 0.7196 / LON 8.7815
      </div>
    </section>
  );
};

export default Manifesto;

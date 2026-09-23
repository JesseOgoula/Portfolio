import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const BrutalistFooter: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cvUrl = language === 'fr' ? '/Cv/CVjesse - French.pdf' : '/Cv/CVjesse - English.pdf';

  return (
    <footer className="relative bg-[#050505] text-[#F4F4F4] pt-10 sm:pt-14 overflow-hidden select-none">
      
      {/* Top Columns Grid */}
      <div className="w-full px-6 sm:px-12 lg:px-16 mb-6 sm:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-6 pb-8 sm:pb-10 hairline-b">
          
          {/* Col 1: Studio Identity & Description */}
          <div className="md:col-span-4">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#3A3A3A] uppercase block mb-3">
              // STUDIO IDENTIFIER
            </span>
            <h3 className="font-sans font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-[#F4F4F4] mb-3">
              JESSE OGOULA
            </h3>
            <p className="font-sans text-xs text-[#B5B5B5] leading-relaxed max-w-sm mb-4">
              {language === 'fr'
                ? 'Product & Growth Manager et formateur certifié en pédagogie active. J’interviens à la croisée de la stratégie de croissance, de l’architecture UX et de la transmission de compétences pour concevoir des écosystèmes digitaux performants et durables.'
                : 'Product & Growth Manager / Certified active pedagogy trainer. Engineering user-centric digital products, scaling conversion funnels, and mentoring emerging tech talents across Africa.'}
            </p>
            {/* Language switch toggle in footer */}
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase border border-[#222] bg-[#0B0B0B] px-2 py-1">
              <button
                onClick={() => setLanguage('fr')}
                className={`transition-colors ${language === 'fr' ? 'text-white font-bold' : 'text-[#555]'}`}
              >
                FRANÇAIS
              </button>
              <span className="text-[#333]">/</span>
              <button
                onClick={() => setLanguage('en')}
                className={`transition-colors ${language === 'en' ? 'text-white font-bold' : 'text-[#555]'}`}
              >
                ENGLISH
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links (Purged to match primary site navigation) */}
          <div className="md:col-span-3">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#3A3A3A] uppercase block mb-3">
              // NAVIGATION
            </span>
            <ul className="space-y-2 font-mono text-xs tracking-wider uppercase text-[#B5B5B5]">
              <li>
                <button
                  onClick={() => scrollTo('featured')}
                  className="hover:text-white transition-colors"
                >
                  {language === 'fr' ? 'ÉTUDES DE CAS' : 'FEATURED'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-white transition-colors"
                >
                  {language === 'fr' ? 'EXPERTISES' : 'SERVICES'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('archive')}
                  className="hover:text-white transition-colors"
                >
                  {language === 'fr' ? 'COLLABORATIONS' : 'COLLABORATIONS'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  CONTACT
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Social Networks */}
          <div className="md:col-span-2">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#3A3A3A] uppercase block mb-3">
              // {language === 'fr' ? 'RÉSEAU' : 'NETWORK'}
            </span>
            <ul className="space-y-2 font-mono text-xs tracking-wider uppercase text-[#B5B5B5]">
              <li>
                <a
                  href="https://www.linkedin.com/in/ogoulajesse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LINKEDIN ↗
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ogoulajesse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GITHUB ↗
                </a>
              </li>
              <li>
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {language === 'fr' ? 'CURRICULUM (PDF) ↗' : 'RESUME (PDF) ↗'}
                </a>
              </li>
              <li>
                <a
                  href="mailto:adirignoogoula@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  EMAIL ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Technical & Legal Data */}
          <div className="md:col-span-3 space-y-4 font-mono text-[10px] uppercase text-[#B5B5B5]">
            <div>
              <span className="text-[#3A3A3A] block text-[8px] tracking-[0.25em] mb-1">
                {language === 'fr' ? 'LOCALISATION & FUSEAU' : 'LOCATION & TIME'}
              </span>
              <span className="text-[#F4F4F4]">PORT-GENTIL / LIBREVILLE (WAT / UTC+1)</span>
            </div>
            <div>
              <span className="text-[#3A3A3A] block text-[8px] tracking-[0.25em] mb-1">
                COPYRIGHT
              </span>
              <span>© 2026 JESSE OGOULA. ALL RIGHTS RESERVED.</span>
            </div>
          </div>

        </div>

        {/* Back To Top Bar */}
        <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.25em] text-[#3A3A3A] uppercase pt-4">
          <span>LAT 0.7196° S / LON 8.7815° E</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-[#F4F4F4] transition-colors"
          >
            {language === 'fr' ? '[ RETOUR AU SOMMET ↑ ]' : '[ BACK TO SUMMIT ↑ ]'}
          </button>
        </div>
      </div>

      {/* Monumental Giant Bleeding Text oscillating horizontally left to right and right to left */}
      <div className="w-full select-none pointer-events-none overflow-hidden leading-none pt-2 pb-1">
        <div className="animate-marquee-oscillate flex items-center justify-center whitespace-nowrap">
          <h1 className="font-sans font-black tracking-[-0.05em] uppercase text-[#0E0E0E] text-[15vw] sm:text-[16vw] lg:text-[17vw] whitespace-nowrap select-none">
            JESSE OGOULA — JESSE OGOULA
          </h1>
        </div>
      </div>

    </footer>
  );
};

export default BrutalistFooter;

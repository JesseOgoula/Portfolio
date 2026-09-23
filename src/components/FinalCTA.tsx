import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ProjectMeetingModal from '@/components/ProjectMeetingModal';

const FinalCTA: React.FC = () => {
  const { language } = useLanguage();
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const cvUrl = language === 'fr' ? '/Cv/CV_Jesse_Ogoula.pdf' : '/Cv/CV_Jesse_Ogoula_EN.pdf';

  return (
    <section
      id="contact"
      className="relative bg-[#050505] text-[#F4F4F4] py-28 sm:py-36 lg:py-48 overflow-hidden hairline-b select-none"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#121212] blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Top Micro Eyebrow */}
        <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.25em] text-[#B5B5B5] uppercase mb-8">
          <span className="w-1.5 h-1.5 bg-[#F4F4F4]" />
          <span>
            {language === 'fr'
              ? '// 09 — INITIER UNE COLLABORATION'
              : '// 09 — INITIATE COLLABORATION'}
          </span>
        </div>

        {/* Monumental Headline */}
        <h2 className="font-sans font-black uppercase text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] leading-[0.92] tracking-[-0.04em] text-[#F4F4F4] mb-8 sm:mb-12">
          {language === 'fr' ? (
            <>
              CRÉONS CE QUI
              <span className="block text-[#3A3A3A] hover:text-[#F4F4F4] transition-colors duration-300">
                MÉRITE D&apos;ÊTRE
              </span>
              <span className="block">REMARQUABLE.</span>
            </>
          ) : (
            <>
              LET&apos;S CREATE
              <span className="block text-[#3A3A3A] hover:text-[#F4F4F4] transition-colors duration-300">
                SOMETHING
              </span>
              <span className="block">MEANINGFUL.</span>
            </>
          )}
        </h2>

        {/* Supporting Copy */}
        <p className="font-sans text-base sm:text-lg lg:text-xl text-[#B5B5B5] max-w-2xl font-light leading-relaxed mb-12 sm:mb-16">
          {language === 'fr'
            ? "Lancement d'un nouveau produit, accélération de votre croissance digitale ou montée en compétences de vos talents : je collabore avec les organisations qui choisissent l'exigence stratégique et la création de valeur pérenne."
            : 'Whether you require product management roadmapping, digital growth audits, or team upskilling in active pedagogy and AI, I partner with forward-thinking organizations who value intentional craft.'}
        </p>

        {/* Action Buttons & Links */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 mb-16 sm:mb-20">
          <button
            onClick={() => setIsMeetingModalOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#F4F4F4] text-[#050505] font-mono text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#E0E0E0] transition-all cursor-pointer group hover:scale-[1.02]"
          >
            <span>{language === 'fr' ? 'ÉCHANGEONS SUR VOTRE PROJET' : "LET'S DISCUSS YOUR PROJECT"}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-[#B5B5B5] uppercase hover:text-white underline underline-offset-8 transition-colors"
          >
            <span>{language === 'fr' ? 'TÉLÉCHARGER LE CV (PDF)' : 'DOWNLOAD CV (PDF)'}</span>
            <span>↗</span>
          </a>
        </div>

        {/* Direct Contact Editorial Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 hairline-t font-mono text-[10px] tracking-wider uppercase text-[#B5B5B5]">
          <div>
            <span className="block text-[8px] text-[#3A3A3A] tracking-[0.25em] mb-1">
              {language === 'fr' ? 'EMAIL PROFESSIONNEL' : 'DIRECT EMAIL'}
            </span>
            <a
              href="mailto:adirignoogoula@gmail.com"
              className="text-[#F4F4F4] hover:underline block"
            >
              adirignoogoula@gmail.com
            </a>
            <a
              href="mailto:contact@ogoulajesse.pro"
              className="text-[#888] hover:underline block text-[9px] mt-0.5"
            >
              contact@ogoulajesse.pro
            </a>
          </div>

          <div>
            <span className="block text-[8px] text-[#3A3A3A] tracking-[0.25em] mb-1">
              {language === 'fr' ? 'TÉLÉPHONE // WHATSAPP' : 'PHONE // DIRECT'}
            </span>
            <a
              href="tel:+24166195786"
              className="text-[#F4F4F4] hover:underline block"
            >
              +241 066 19 57 86
            </a>
            <span className="text-[#888] block text-[9px] mt-0.5">
              +241 077 61 75 69
            </span>
          </div>

          <div>
            <span className="block text-[8px] text-[#3A3A3A] tracking-[0.25em] mb-1">
              {language === 'fr' ? 'LOCALISATION & FUSEAU' : 'LOCATION & TIMEZONE'}
            </span>
            <span className="text-[#F4F4F4] block">
              PORT-GENTIL / LIBREVILLE
            </span>
            <span className="text-[#888] block text-[9px] mt-0.5">
              GABON (WAT / UTC+1)
            </span>
          </div>

          <div>
            <span className="block text-[8px] text-[#3A3A3A] tracking-[0.25em] mb-1">
              {language === 'fr' ? 'DISPONIBILITÉ' : 'AVAILABILITY'}
            </span>
            <span className="text-[#F4F4F4] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#F4F4F4] inline-block animate-pulse" />
              {language === 'fr' ? 'OUVERT AUX MISSIONS' : 'OPEN FOR CONTRACTS'}
            </span>
          </div>
        </div>

      </div>

      {/* Interactive Project Discovery Meeting Booking Modal */}
      <ProjectMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
      />
    </section>
  );
};

export default FinalCTA;

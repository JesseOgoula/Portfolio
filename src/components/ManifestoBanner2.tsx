import { useLanguage } from '@/contexts/LanguageContext';

const ManifestoBanner2 = () => {
  const { language } = useLanguage();

  return (
    <section className="relative py-20 sm:py-28 bg-[#08080a] text-white border-y border-white/10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6 text-zinc-600">
          <span className="hidden sm:inline-block w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent to-zinc-700" />
          <div className="flex items-center gap-2 text-xs font-space tracking-widest text-zinc-400 uppercase">
            <span className="text-primary font-bold">///</span>
            <span>PHILOSOPHY // 02</span>
            <span className="text-primary font-bold">///</span>
          </div>
          <span className="hidden sm:inline-block w-16 sm:w-28 h-[1px] bg-gradient-to-l from-transparent to-zinc-700" />
        </div>

        {/* Central Bold Statement */}
        <div className="max-w-5xl mx-auto text-center">
          <blockquote className="font-syne font-bold text-2xl sm:text-4xl lg:text-5xl leading-tight sm:leading-snug uppercase tracking-tight text-zinc-200">
            {language === 'fr' ? (
              <>
                UN TRAVAIL REMARQUABLE NAÎT DE BONNES QUESTIONS. LA STRATÉGIE OFFRE LA DIRECTION, LE DESIGN LUI DONNE FORME, ET LE RAFFINEMENT{' '}
                <span className="text-white border-b-2 border-primary pb-1">GARANTIT</span>{' '}
                QUE CHAQUE DÉTAIL SERT LA VISION GLOBALE.
              </>
            ) : (
              <>
                GOOD WORK IS BUILT ON GOOD QUESTIONS. STRATEGY PROVIDES THE DIRECTION, DESIGN GIVES IT FORM, AND REFINEMENT{' '}
                <span className="text-white border-b-2 border-primary pb-1">ENSURES</span>{' '}
                EVERY DETAIL SUPPORTS THE BIGGER PICTURE.
              </>
            )}
          </blockquote>
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-8 mt-6 text-zinc-600">
          <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-zinc-800" />
          <span className="text-[10px] font-space uppercase tracking-widest text-zinc-500">
            FOUNDATION • VISION • PERSISTENCE
          </span>
          <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-zinc-800" />
        </div>
      </div>
    </section>
  );
};

export default ManifestoBanner2;

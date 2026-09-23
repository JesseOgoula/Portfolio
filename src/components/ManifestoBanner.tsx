import { useLanguage } from '@/contexts/LanguageContext';

interface ManifestoBannerProps {
  id?: string;
}

const ManifestoBanner = ({ id = "manifesto-1" }: ManifestoBannerProps) => {
  const { language } = useLanguage();

  return (
    <section id={id} className="relative py-20 sm:py-28 bg-[#08080a] text-white border-b border-white/10 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6 text-zinc-600">
          <span className="hidden sm:inline-block w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent to-zinc-700" />
          <div className="flex items-center gap-2 text-xs font-space tracking-widest text-zinc-400 uppercase">
            <span className="text-primary font-bold">+++</span>
            <span>MANIFESTO 01 // PRINCIPLES</span>
            <span className="text-primary font-bold">+++</span>
          </div>
          <span className="hidden sm:inline-block w-16 sm:w-28 h-[1px] bg-gradient-to-l from-transparent to-zinc-700" />
        </div>

        {/* Central Bold Statement with Stylized Highlight */}
        <div className="max-w-5xl mx-auto text-center">
          <blockquote className="font-syne font-bold text-2xl sm:text-4xl lg:text-5xl leading-tight sm:leading-snug uppercase tracking-tight text-zinc-100">
            {language === 'fr' ? (
              <>
                NOUS REJETONS LE SUPERFLU, CONSTRUISANT DES SYSTÈMES D'IDENTITÉ ET DES ENVIRONNEMENTS DIGITAUX{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-white to-zinc-400 border-b-2 border-primary pb-1">
                  ANCRÉS
                </span>{' '}
                DANS UNE CLARTÉ RADICALE, L'IMPACT ET UN SAVOIR-FAIRE SANS CONCESSION.
              </>
            ) : (
              <>
                WE REJECT THE SUPERFLUOUS, BUILDING IDENTITY SYSTEMS AND DIGITAL ENVIRONMENTS{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-white to-zinc-400 border-b-2 border-primary pb-1">
                  GROUNDED
                </span>{' '}
                IN EXTREME CLARITY, PURPOSE, AND UNCOMPROMISED CRAFT.
              </>
            )}
          </blockquote>
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-8 mt-6 text-zinc-600">
          <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-zinc-800" />
          <span className="text-[10px] font-space uppercase tracking-widest text-zinc-500">
            STRATEGY • EXECUTION • MEASURED VALUE
          </span>
          <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-zinc-800" />
        </div>
      </div>
    </section>
  );
};

export default ManifestoBanner;

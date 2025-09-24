import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const About = () => {
  const { t, language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const descRef = useRef<HTMLSpanElement>(null);

  const description = t('about.description');

  // Fonction utilitaire pour colorer les mots-clés
  function highlightKeywords(text: string) {
    // Couleur rouge personnalisée
    const color = 'rgb(230 57 70 / var(--tw-bg-opacity, 1))';
    // Regex pour trouver les mots-clés (français et anglais)
    return text
      .replace(/(Mes expertises ?[:：]?)/gi, `<span style="color:${color};font-weight:bold;">$1</span>`)
      .replace(/(Ma mission ?[:：]?)/gi, `<span style="color:${color};font-weight:bold;">$1</span>`)
      .replace(/(My expertise ?[:：]?)/gi, `<span style="color:${color};font-weight:bold;">$1</span>`)
      .replace(/(My mission ?[:：]?)/gi, `<span style="color:${color};font-weight:bold;">$1</span>`);
  }
  const halfLength = Math.floor(description.length / 2);
  const truncatedDescription = description.slice(0, halfLength) + '...';

  return (
    <section id="a-propos" className="py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-navy-800/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto relative">
          <div className="flex flex-col items-center justify-center">
            {/* Colonne image supprimée */}
            {/* Colonne texte */}
            <div>
              <div className="mb-8 text-center">
                <h2 className="font-poppins font-extrabold text-3xl lg:text-5xl text-navy-800 mb-4">
                  {t('about.title')}
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
                <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto text-center">
                  {t('about.subtitle')}
                </p>
              </div>
              <div className="bg-navy-800/95 rounded-2xl p-6 lg:p-8 shadow-lg border border-navy-800">
                <div className="relative">
                  <p className="font-inter text-white leading-relaxed text-base sm:text-lg text-justify max-w-3xl mx-auto">
                    {/* Sur desktop ou lorsque le texte est développé, afficher tout le texte */}
                    <span
                      className="hidden lg:block"
                      id="about-desc-full"
                      dangerouslySetInnerHTML={{ __html: highlightKeywords(description) }}
                    />
                    {/* Sur mobile, afficher le texte tronqué ou complet selon l'état */}
                    <span
                      className="block lg:hidden max-w-full text-justify"
                      id="about-desc-mobile"
                      ref={descRef}
                      dangerouslySetInnerHTML={{ __html: highlightKeywords(isExpanded ? description : truncatedDescription) }}
                    />
                  </p>
                  {/* Bouton "voir plus" uniquement sur mobile */}
                  <div className="mt-4 text-center block lg:hidden">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsExpanded(!isExpanded);
                        setTimeout(() => {
                          if (!isExpanded && descRef.current) {
                            descRef.current.focus();
                          }
                        }, 100);
                      }}
                      className="text-primary hover:text-white border border-primary hover:bg-primary/90 transition-colors focus-visible:ring-2 focus-visible:ring-primary px-4 py-2 rounded-full font-semibold"
                      aria-expanded={isExpanded}
                      aria-controls="about-desc-mobile"
                    >
                      {isExpanded ? (
                        <>
                          {language === 'fr' ? 'Voir moins' : 'Show less'}
                          <ChevronUp className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          {language === 'fr' ? 'Voir plus' : 'Show more'}
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Préparation pour lazy loading
export default About;
// export default React.lazy(() => import('./About')); // à utiliser dans App.tsx si besoin

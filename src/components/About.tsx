import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const About = () => {
  const { t, language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const description = t('about.description');
  const halfLength = Math.floor(description.length / 2);
  const truncatedDescription = description.slice(0, halfLength) + '...';

  return (
    <section id="a-propos" className="py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-navy-800/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl lg:text-5xl text-navy-800 mb-6">
              {t('about.title')}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>

          <div className="bg-navy-800 rounded-2xl p-8 lg:p-12 shadow-lg">
            <div className="relative">
              <p className="font-inter text-white leading-relaxed text-lg text-center">
                {/* Sur desktop ou lorsque le texte est développé, afficher tout le texte */}
                <span className="hidden lg:block">{description}</span>
                {/* Sur mobile, afficher le texte tronqué ou complet selon l'état */}
                <span className="block lg:hidden">
                  {isExpanded ? description : truncatedDescription}
                </span>
              </p>

              {/* Bouton "voir plus" uniquement sur mobile */}
              <div className="mt-4 text-center block lg:hidden">
                <Button
                  variant="ghost"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-white hover:text-primary transition-colors"
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
    </section>
  );
};

export default About;

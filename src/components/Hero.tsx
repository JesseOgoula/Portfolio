
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';
import CVDownloadModal from '@/components/CVDownloadModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

const Hero = () => {
  const { t } = useLanguage();
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
  { number: 20, suffix: '+', label: t('hero.stats.projects') },
  { number: 35, suffix: '%', label: t('hero.stats.growth') },
  { number: 200, suffix: '+', label: t('hero.stats.students') }
  ];

  return (
    <>
  <section id="accueil" className="min-h-screen flex items-center bg-gradient-to-br from-light-100 to-white relative overflow-hidden pt-8 sm:pt-4 mt-16 sm:mt-4">
        {/* Background decoration */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-navy-800/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 lg:px-8 pt-0 sm:pt-0 lg:pt-0 pb-12">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Content */}
            <div className="animate-fade-in text-center lg:text-left">
              <div className="mb-6">
                <span className="inline-block bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-inter font-medium mb-4">
                  {t('hero.role')}
                </span>
                <h1 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-navy-800 leading-tight mb-4 sm:mb-6">
                  {t('hero.title')}
                </h1>
                <p className="font-inter text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
                  {t('hero.subtitle')}
                </p>
              </div>
              {/* Stats */}
              <div className="flex flex-col items-center mb-8">
                <div className="flex w-full justify-center gap-6 mb-2">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center min-w-[70px]">
                      <div className="font-poppins font-bold text-xl sm:text-2xl lg:text-3xl text-navy-800 mb-1">
                        <AnimatedCounter 
                          target={stat.number} 
                          suffix={stat.suffix}
                          duration={2000}
                        />
                      </div>
                      <div className="font-inter text-xs sm:text-sm text-gray-600">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start w-full max-w-xs mx-auto mb-2">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white px-4 sm:px-8 py-3 sm:py-6 rounded-xl font-inter font-medium text-base sm:text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg w-full"
                  onClick={() => window.location.href = '/schedule'}
                >
                  {t('hero.cta')}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsCVModalOpen(true)}
                  className="border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white px-4 sm:px-8 py-3 sm:py-6 rounded-xl font-inter font-medium text-base sm:text-lg transition-all duration-200 w-full"
                >
                  {t('hero.download.cv')}
                </Button>
              </div>
            </div>
            {/* Image */}
            <div className="relative animate-scale-in mt-6 sm:mt-0">
              <div className="relative z-10">
                <img
                  src="/mee.png"
                  alt="Product & Growth Manager"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                  style={{ marginTop: '10px' }}
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-navy-800/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>
      <CVDownloadModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)} 
      />
    </>
  );
}

export default Hero;

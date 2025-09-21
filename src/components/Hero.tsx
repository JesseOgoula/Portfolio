
import { Button } from '@/components/ui/button';
import { ArrowDown, Phone, Download, BadgeCheck } from 'lucide-react';
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
      <section
        id="accueil"
        className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-light-100 to-white overflow-hidden pt-8 pb-8 lg:pt-16 lg:pb-16 mt-16"
      >
        {/* Background */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-16 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-56 h-56 bg-navy-800/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="text-center lg:text-left flex flex-col justify-center animate-fade-in">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-inter font-semibold mb-4 mx-auto lg:mx-0 max-w-[300px] truncate">
                {t('hero.role')}
              </span>
              <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl lg:text-6xl text-navy-900 leading-tight mb-4 tracking-tight">
                {t('hero.title')}
              </h1>
              <p className="font-inter text-lg sm:text-xl text-gray-700 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full max-w-md mx-auto lg:mx-0 mb-8">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-inter font-semibold text-lg px-8 py-4 rounded-xl shadow-lg flex items-center gap-2 transition-all duration-200 hover:scale-105"
                  onClick={() => {
                    window.open('https://calendly.com/jesseogoula/appel-de-decouverte', '_blank');
                  }}
                  tabIndex={0}
                  type="button"
                  aria-label={t('hero.cta')}
                >
                  <Phone className="w-5 h-5" />
                  {t('hero.cta')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsCVModalOpen(true)}
                  className="border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white font-inter font-semibold text-lg px-8 py-4 rounded-xl flex items-center gap-2 transition-all duration-200"
                >
                  <Download className="w-5 h-5" />
                  {t('hero.download.cv')}
                </Button>
              </div>
            </div>
            {/* Image */}
            <div className="relative flex justify-center items-center animate-scale-in mt-8 lg:mt-0">
              <div className="relative z-10">
                <img
                  src="/mee.png"
                  alt="Product & Growth Manager"
                  className="w-72 h-96 sm:w-96 sm:h-[28rem] object-cover rounded-3xl shadow-2xl border-4 border-white mx-auto"
                  style={{ objectPosition: 'top' }}
                />
              </div>
            </div>
          </div>
          {/* Stats Bar */}
          <div className="relative flex justify-center mt-8 z-20">
            <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-2xl shadow-lg flex flex-row flex-wrap justify-center gap-8 py-4 px-6 border border-gray-200">
              {stats.map((stat, index) => (
                <div key={index} className="text-center min-w-[80px]">
                  <div className="font-poppins font-bold text-2xl sm:text-3xl text-navy-900 mb-1">
                    <AnimatedCounter 
                      target={stat.number} 
                      suffix={stat.suffix}
                      duration={2000}
                    />
                  </div>
                  <div className="font-inter text-xs sm:text-sm text-gray-700">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
          <ArrowDown className="w-7 h-7 text-gray-400" />
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

import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

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
            <p className="font-inter text-white leading-relaxed text-lg text-justify">
              {t('about.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

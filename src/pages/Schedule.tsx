import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Schedule = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    // Make sure Calendly script is loaded
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-light-100 pt-20">
      <div className="container mx-auto px-4 lg:px-8 py-4 sm:py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/#contact')}
          className="mb-4 sm:mb-8 hover:bg-gray-100 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          {language === 'fr' ? 'Retour' : 'Back'}
        </Button>

        {/* Title */}
        <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-navy-800 mb-4 sm:mb-6 text-center">
          {language === 'fr' 
            ? 'Planifier votre appel découverte'
            : 'Schedule your discovery call'
          }
        </h1>

        {/* Calendly widget container */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-2 sm:p-4 lg:p-8">
          <div className="relative w-full" style={{ paddingTop: '133.33%' }}>
            <div 
              className="calendly-inline-widget absolute inset-0 w-full h-full"
              data-url="https://calendly.com/jesseogoula"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;

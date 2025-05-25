import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';

const Schedule = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    // Make sure Calendly script is loaded
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Calculate and set iframe height
    const updateIframeHeight = () => {
      const vh = window.innerHeight;
      const topOffset = 200; // Hauteur approximative du header + bouton retour + titre
      const minHeight = Math.max(700, vh - topOffset);
      const iframe = document.querySelector('.calendly-inline-widget') as HTMLElement;
      if (iframe) {
        iframe.style.height = `${minHeight}px`;
      }
    };

    // Initial height calculation
    setTimeout(updateIframeHeight, 1000);

    // Update height on window resize
    window.addEventListener('resize', updateIframeHeight);
    
    return () => {
      document.body.removeChild(script);
      window.removeEventListener('resize', updateIframeHeight);
    };
  }, []);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-light-100 pt-20 pb-8 flex flex-col">
        <div className="container mx-auto px-4 lg:px-8 py-4 sm:py-8 flex-1 flex flex-col">
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
          <div className="flex-1 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-2 sm:p-4 lg:p-8">
            <div className="w-full h-full">
              <div 
                className="calendly-inline-widget w-full"
                data-url="https://calendly.com/jesseogoula"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;

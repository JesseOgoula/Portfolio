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
    // Redirige vers la section demandée si hash présent
    if (window.location.hash) {
      const section = window.location.hash.replace('#', '');
      if (section) {
        window.location.href = `/${window.location.hash}`;
      }
    }

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
      <div className="min-h-screen bg-[#08080a] text-white pt-24 pb-12 flex flex-col">
        <div className="container mx-auto px-4 lg:px-8 py-4 sm:py-8 flex-1 flex flex-col">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/#contact')}
            className="mb-4 sm:mb-8 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 rounded-full w-fit px-4 py-2 font-space text-xs uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Retour au site' : 'Back to home'}
          </Button>

          {/* Title */}
          <div className="text-center mb-6 sm:mb-8">
            <span className="font-space text-xs text-primary uppercase tracking-widest block mb-2">
              // DISCOVERY CALL // 30 MIN
            </span>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl uppercase text-white tracking-tight">
              {language === 'fr' 
                ? 'Planifier votre appel découverte'
                : 'Schedule your discovery call'
              }
            </h1>
          </div>

          {/* Calendly widget container */}
          <div className="flex-1 bg-[#0e0e13] border border-white/10 rounded-2xl shadow-2xl p-2 sm:p-6 lg:p-8">
            <div className="w-full h-full">
              {/* Début de widget en ligne Calendly */}
              <div
                className="calendly-inline-widget w-full rounded-xl overflow-hidden"
                data-url="https://calendly.com/jesseogoula/appel-de-decouverte"
                style={{ minWidth: '320px', height: '700px' }}
              ></div>
              {/* Fin de widget en ligne Calendly */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;

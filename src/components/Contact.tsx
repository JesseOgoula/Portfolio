import { Button } from '@/components/ui/button';
import { Calendar, Mail, MapPin, MoveUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const contactEmail = "contact@portfolio.fr";

  return (
    <section id="contact" className="py-20 bg-light-100 relative overflow-hidden">
      {/* Decoration */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-navy-800/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl lg:text-5xl text-navy-800 mb-6">
            {language === 'fr' ? 'Prêt à Accélérer Votre Croissance ?' : 'Ready to Accelerate Your Growth?'}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Réservez un appel découverte de 30 minutes et discutons de votre vision'
              : 'Book a 30-minute discovery call and let\'s discuss your vision'
            }
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 relative z-10 backdrop-blur-lg bg-white/80">
            <div className="grid gap-8">
              {/* Call to Action */}
              <div className="text-center">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-10 py-7 rounded-xl font-inter font-medium text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg group"
                  onClick={() => navigate('/schedule')}
                >
                  <Calendar className="w-6 h-6 mr-3" />
                  {language === 'fr' ? 'Réserver un Appel' : 'Book a Discovery Call'}
                  <MoveUpRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const services = [
    {
      title: t('services.consulting.title'),
      description: t('services.consulting.description'),
      features: [
        language === 'fr' ? 'Audit croissance' : 'Growth audit',
        language === 'fr' ? 'Stratégie acquisition multicanales' : 'Multichannel acquisition strategy',
        language === 'fr' ? 'Recommandations actionnables & coaching stratégique' : 'Actionable recommendations & strategic coaching',
        language === 'fr' ? 'Optimisation conversion' : 'Conversion optimization',
        language === 'fr' ? 'Tableaux de bord & analytics avancés' : 'Dashboards & advanced analytics'
      ],
      color: 'bg-primary'
    },
    {
      title: t('services.formation.title'),
      description: t('services.formation.description'),
      features: [
        language === 'fr' ? 'Marketing digital (réseaux sociaux, acquisition, SEO)' : 'Digital Marketing (Social Media, Acquisition, SEO)',
        language === 'fr' ? 'Acculturation numérique (vocabulaire, enjeux, culture digitale)' : 'Digital acculturation (vocabulary, issues, digital culture)',
        language === 'fr' ? 'Suivi personnalisé' : 'Personalized follow-up',
        language === 'fr' ? 'Initiation à l’IA pour les pros (ChatGPT, outils no-code, automatisation)' : 'Introduction to AI for Professionals (ChatGPT, no-code tools, automation)'
      ],
      color: 'bg-gradient-to-r from-primary to-navy-800'
    }
  ];

  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Détail complet pour chaque service (traduction via t)
  const serviceDetails = [
    {
      title: t('services.consulting.title'),
      description: t('services.consulting.fullDescription'),
    },
    {
      title: t('services.formation.title'),
      description: t('services.formation.fullDescription'),
    }
  ];

  return (
    <section id="services" className="py-20 bg-light-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl lg:text-5xl text-navy-800 mb-6">
            {t('services.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto justify-center">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden">
              <div className={`h-2 ${service.color}`} />
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="font-poppins font-semibold text-xl sm:text-2xl text-navy-800 mb-4">
                  {service.title}
                </h3>
                <p className="font-inter text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center font-inter text-gray-700">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="border-t pt-6 flex gap-2">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white font-inter font-medium transition-all duration-200 hover:scale-105"
                    onClick={() => {
                      setSelectedService(serviceDetails[index]);
                      setOpen(true);
                    }}
                  >
                    {t('services.cta.main')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog pop-up */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedService?.title}</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {selectedService?.description}
            </DialogDescription>
            <DialogFooter>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white font-inter font-medium mt-4"
                onClick={() => { setOpen(false); navigate('/schedule'); }}
              >
                {language === 'fr' ? 'Réserver un call' : 'Book a call'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Services;
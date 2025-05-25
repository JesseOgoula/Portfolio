
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CVDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CVDownloadModal = ({ isOpen, onClose }: CVDownloadModalProps) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const handleDownload = (lang: 'fr' | 'en') => {
    // Ici, vous devrez remplacer par les vrais liens vers vos CV
    const cvLinks = {
      fr: '/Cv/CVjesse - French.pdf',
      en: '/Cv/CVjesse - English.pdf'
    };
    
    // Créer un lien temporaire pour télécharger
    const link = document.createElement('a');
    link.href = cvLinks[lang];
    link.download = `CV-Product-Manager-${lang.toUpperCase()}.pdf`;
    link.click();
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-poppins font-semibold text-2xl text-navy-800">
              {language === 'fr' ? 'Télécharger CV' : 'Download CV'}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <p className="font-inter text-gray-600 mb-6 text-center">
            {language === 'fr' 
              ? 'Choisissez la langue du CV :'
              : 'Choose CV language:'
            }
          </p>
          
          <div className="space-y-4">
            <Button
              onClick={() => handleDownload('fr')}
              className="w-full bg-primary hover:bg-primary/90 text-white py-4 font-inter font-medium text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              CV Français
            </Button>
            
            <Button
              onClick={() => handleDownload('en')}
              variant="outline"
              className="w-full border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white py-4 font-inter font-medium text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              CV English
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CVDownloadModal;

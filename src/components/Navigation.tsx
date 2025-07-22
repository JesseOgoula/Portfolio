import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'accueil', label: t('nav.home') },
    { id: 'a-propos', label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'realisations', label: t('nav.portfolio') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="font-poppins font-bold text-xl text-navy-800">
            <img 
              src="/Favicon.png" 
              alt="Ogoula Jesse Logo" 
              className="h-8 w-auto transition-transform duration-300 hover:scale-105"
              loading="lazy"
              width="32"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="font-inter text-navy-800 hover:text-primary transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
              </button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="font-inter"
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-navy-800 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md py-4 px-4 shadow-lg rounded-b-2xl">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    scrollToSection(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="font-inter text-navy-800 hover:text-primary transition-colors duration-200 py-2 text-left"
                >
                  {link.label}
                </button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="font-inter w-full justify-center"
              >
                {language === 'fr' ? 'EN' : 'FR'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'work', label: t('nav.work') },
    { id: 'services', label: t('nav.services') },
    { id: 'collaborations', label: t('nav.collaborations') },
    { id: 'archive', label: t('nav.archive') },
    { id: 'about', label: t('nav.about') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08080a]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Availability Pill */}
          <div className="flex items-center gap-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname !== '/') {
                  navigate('/');
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="group flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
                <span className="font-syne font-extrabold text-xs tracking-tighter text-white">JO</span>
              </div>
              <div className="flex flex-col">
                <span className="font-syne font-bold text-sm tracking-widest text-white uppercase group-hover:text-primary transition-colors">
                  Jesse Ogoula
                </span>
                <span className="text-[10px] font-space text-zinc-500 uppercase tracking-wider hidden sm:inline">
                  Product & Growth
                </span>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-space">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{language === 'fr' ? 'DISPONIBLE POUR MISSIONS' : 'AVAILABLE FOR CONTRACT'}</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-[#121216]/80 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="font-space text-xs uppercase tracking-wider text-zinc-400 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Actions: Lang Switcher & Book a Call */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="font-space text-xs font-semibold px-2.5 py-1.5 rounded-md border border-white/10 text-zinc-300 hover:text-white hover:border-white/30 transition-colors uppercase tracking-wider"
              aria-label="Toggle language"
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </button>

            <Button
              size="sm"
              onClick={() => navigate('/schedule')}
              className="bg-white hover:bg-zinc-200 text-black font-space font-medium text-xs tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 shadow-lg shadow-white/5 hover:scale-105"
            >
              <span>{t('hero.cta')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Mobile Actions: Language & Burger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="font-space text-xs font-semibold px-2 py-1 rounded border border-white/20 text-zinc-200 uppercase"
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-[#0d0d12] border border-white/10 rounded-2xl shadow-2xl animate-fade-in flex flex-col gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-space w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{language === 'fr' ? 'DISPONIBLE POUR MISSIONS' : 'AVAILABLE FOR CONTRACT'}</span>
            </div>

            <div className="flex flex-col space-y-1 pt-2 border-t border-white/10">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="font-space text-sm uppercase tracking-wider text-left py-2 px-3 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/schedule');
              }}
              className="w-full bg-white text-black font-space font-medium text-xs tracking-wider uppercase py-3 rounded-xl mt-2 flex items-center justify-center gap-2"
            >
              <span>{t('hero.cta')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll and pause Lenis virtual scroll while mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [mobileOpen]);

  // Auto-close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if ((window as any).lenis) {
      (window as any).lenis.start();
    }

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(el, { offset: -60, duration: 1 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 60);
  };

  const handleLogoClick = () => {
    if (mobileOpen) {
      setMobileOpen(false);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    }
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = language === 'fr' ? [
    { id: 'featured', label: 'ÉTUDES DE CAS' },
    { id: 'services', label: 'EXPERTISES' },
    { id: 'archive', label: 'COLLABORATIONS' },
    { id: 'certifications', label: 'CERTIFICATIONS' },
    { id: 'contact', label: 'CONTACT' },
  ] : [
    { id: 'featured', label: 'FEATURED' },
    { id: 'services', label: 'SERVICES' },
    { id: 'archive', label: 'ARCHIVE' },
    { id: 'certifications', label: 'CERTIFICATIONS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const cvUrl = language === 'fr' ? '/Cv/CV_Jesse_Ogoula.pdf' : '/Cv/CV_Jesse_Ogoula_EN.pdf';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-14 sm:h-16 flex items-center hairline-b ${
          mobileOpen
            ? 'bg-[#050505] border-[#1a1a1a]'
            : scrolled
              ? 'bg-[#050505]/95 backdrop-blur-md border-[#1a1a1a]'
              : 'bg-[#050505] border-[#151515]'
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Left: Studio / Creator Name on Two Lines */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogoClick}
              className="font-sans font-black text-xs sm:text-sm tracking-[0.2em] text-[#F4F4F4] uppercase hover:text-[#B5B5B5] transition-colors text-left leading-[1.05]"
            >
              <span className="block">JESSE</span>
              <span className="block">OGOULA</span>
            </button>
          </div>

          {/* Center: Minimalist Nav Items */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-7 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#B5B5B5] uppercase">
            {navItems.map((item, idx) => (
              <div key={item.id} className="flex items-center space-x-6 lg:space-x-7">
                <button
                  onClick={() => scrollTo(item.id)}
                  className="hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </button>
                {idx < navItems.length - 1 && <span className="text-[#3A3A3A]">•</span>}
              </div>
            ))}
          </nav>

          {/* Right: Language Switcher, CV */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* Minimalist Brutalist Language Switcher */}
            <div className="flex items-center font-mono text-[10px] tracking-widest uppercase border border-[#222] bg-[#0B0B0B] px-2 py-1">
              <button
                onClick={() => setLanguage('fr')}
                className={`px-1.5 transition-colors ${
                  language === 'fr' ? 'text-[#F4F4F4] font-black' : 'text-[#555] hover:text-[#B5B5B5]'
                }`}
              >
                FR
              </button>
              <span className="text-[#262626]">/</span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 transition-colors ${
                  language === 'en' ? 'text-[#F4F4F4] font-black' : 'text-[#555] hover:text-[#B5B5B5]'
                }`}
              >
                EN
              </button>
            </div>

            {/* Direct CV Download Link */}
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase text-[#B5B5B5] hover:text-white border border-[#222] px-2.5 py-1 bg-[#0B0B0B] hover:border-[#444] transition-colors"
            >
              <span>CV</span>
              <span className="text-[8px]">↗</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-xs font-mono tracking-widest text-white uppercase p-1"
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? '[ CLOSE ]' : '[ MENU ]'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay Portal (Detached from header to prevent stacking context & backdrop-filter trapping) */}
      {mobileOpen && typeof document !== 'undefined' && createPortal(
        <div
          data-lenis-prevent="true"
          className="fixed inset-x-0 top-14 sm:top-16 bottom-0 h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-4rem)] bg-[#050505] z-40 flex flex-col justify-between px-8 py-6 md:hidden overflow-y-auto overscroll-contain"
        >
          <div className="flex items-center justify-between pb-4 hairline-b">
            <div className="text-[10px] font-mono text-[#3A3A3A] tracking-widest uppercase">
              // INDEX NAVIGATION
            </div>
            {/* Mobile Lang switch */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setLanguage('fr')}
                className={language === 'fr' ? 'text-white font-bold' : 'text-[#555]'}
              >
                [ FR ]
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'text-white font-bold' : 'text-[#555]'}
              >
                [ EN ]
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-6 my-auto py-4">
            {navItems.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className="text-left font-sans text-3xl font-extrabold uppercase tracking-tight text-white hover:text-[#B5B5B5] transition-colors"
              >
                {sec.label}
              </button>
            ))}
          </div>

          <div className="pt-6 hairline-t flex items-center justify-between text-xs font-mono text-[#B5B5B5] tracking-widest uppercase">
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
              onClick={() => setMobileOpen(false)}
            >
              [ {language === 'fr' ? 'TÉLÉCHARGER CV' : 'DOWNLOAD CV'} ↗ ]
            </a>
            <span>JESSE OGOULA © 2026</span>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Header;

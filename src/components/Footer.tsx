import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowUpRight, Mail, Phone, MapPin, Calendar, Download } from 'lucide-react';
import { SiLinkedin, SiGithub, SiFacebook, SiTiktok } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: SiLinkedin, href: 'https://www.linkedin.com/in/ogoulajesse/', label: 'LinkedIn' },
    { icon: SiGithub, href: 'https://github.com/JesseOgoula', label: 'GitHub' },
    { icon: SiFacebook, href: 'https://www.facebook.com/OgoulaJesse/', label: 'Facebook' },
    { icon: SiTiktok, href: 'https://www.tiktok.com/@aoj0291', label: 'TikTok' }
  ];

  const navLinks = [
    { href: '#work', label: t('nav.work') },
    { href: '#services', label: t('nav.services') },
    { href: '#collaborations', label: t('nav.collaborations') },
    { href: '#archive', label: t('nav.archive') },
    { href: '#about', label: t('nav.about') }
  ];

  return (
    <footer id="contact" className="relative bg-[#050507] text-white pt-24 pb-12 overflow-hidden border-t border-white/10">
      
      {/* Subtle top spotlight glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Main CTA Block */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 text-xs font-space text-primary uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span>LET’S CONNECT // WORK TOGETHER</span>
          </div>

          <h2 className="font-syne font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter text-white leading-tight mb-6">
            {t('footer.headline')}
          </h2>

          <p className="font-inter text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-8">
            {t('footer.subtitle')}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate('/schedule')}
              className="bg-white hover:bg-zinc-200 text-black font-space font-semibold text-xs sm:text-sm uppercase tracking-wider px-8 py-6 rounded-full flex items-center gap-2 shadow-2xl hover:scale-105 transition-all duration-200"
            >
              <Calendar className="w-4 h-4" />
              <span>{language === 'fr' ? 'Réserver un Appel' : 'Book a Discovery Call'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>

            <a
              href="mailto:contact@ogoulajesse.pro"
              className="px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-space text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>contact@ogoulajesse.pro</span>
            </a>
          </div>
        </div>

        {/* Columns: Nav, Contacts, Socials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/10 text-sm">
          
          {/* Col 1: Coordinates */}
          <div className="flex flex-col space-y-3">
            <span className="font-space text-xs text-zinc-500 uppercase tracking-wider">// CONTACT DIRECT</span>
            <a href="mailto:contact@ogoulajesse.pro" className="font-inter text-zinc-300 hover:text-white transition-colors">
              contact@ogoulajesse.pro
            </a>
            <a href="tel:+241066195786" className="font-inter text-zinc-300 hover:text-white transition-colors">
              +241 066 19 57 86
            </a>
            <span className="font-inter text-zinc-500">Libreville, Gabon (GMT+1)</span>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col space-y-2.5">
            <span className="font-space text-xs text-zinc-500 uppercase tracking-wider">// NAVIGATION</span>
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="font-inter text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Col 3: Services */}
          <div className="flex flex-col space-y-2.5">
            <span className="font-space text-xs text-zinc-500 uppercase tracking-wider">// EXPERTISES</span>
            <span className="text-zinc-400">Product Strategy & MVP</span>
            <span className="text-zinc-400">Growth Marketing & Funnels</span>
            <span className="text-zinc-400">UI/UX & Design Systems</span>
            <span className="text-zinc-400">OIF Active Pedagogy & AI</span>
          </div>

          {/* Col 4: Socials */}
          <div className="flex flex-col space-y-3">
            <span className="font-space text-xs text-zinc-500 uppercase tracking-wider">// RÉSEAUX SOCIAUX</span>
            <div className="flex items-center gap-3">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <span className="text-xs font-space text-emerald-400 flex items-center gap-1.5 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Available worldwide</span>
            </span>
          </div>

        </div>

        {/* Legal & Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-space text-zinc-500 uppercase tracking-wider">
          <div>
            © {currentYear} JESSE OGOULA. {t('footer.rights')}
          </div>
          <div>
            ENGINEERED WITH RIGOR & STRATEGY
          </div>
        </div>

        {/* The Exact Signature from the Reference Design: Giant Edge-to-Edge Stylized Typography */}
        <div className="mt-16 pt-6 overflow-hidden select-none pointer-events-none opacity-80 border-t border-white/5">
          <h1 className="font-syne font-extrabold text-[12vw] sm:text-[13.5vw] uppercase tracking-tighter leading-none text-center text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 via-zinc-900 to-black whitespace-nowrap">
            JESSE OGOULA
          </h1>
        </div>

      </div>
    </footer>
  );
};

export default Footer;


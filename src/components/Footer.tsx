import { useLanguage } from '@/contexts/LanguageContext';
import { FacebookIcon, GithubIcon, LinkedinIcon } from 'lucide-react';

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: t('services.consulting.title'), href: '#services' },
      { name: t('services.coaching.title'), href: '#services' },
      { name: t('services.formation.title'), href: '#services' }
    ],
    ressources: [
      { name: language === 'fr' ? 'Certifications' : 'Certifications', href: '#certifications' },
      { name: language === 'fr' ? 'Témoignages' : 'Testimonials', href: '#testimonials' }
    ]
  };

  const socialLinks = [
    { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/ogoulajesse/', label: 'LinkedIn' },
    { icon: FacebookIcon, href: 'https://www.facebook.com/OgoulaJesse/', label: 'Facebook' },
    { icon: GithubIcon, href: 'https://github.com/JesseOgoula', label: 'Github' }
  ];

  return (
    <footer className="bg-navy-800 text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-poppins font-bold text-2xl mb-4">
              <img 
                src="/logored.png" 
                alt="Ogoula Jesse Logo" 
                className="h-12 w-auto brightness-0 invert transition-transform duration-300 hover:scale-105"
                loading="lazy"
                width="48"
              />
            </div>
            <p className="font-inter text-gray-300 leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">{t('footer.services')}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="font-inter text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">{t('footer.resources')}</h4>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="font-inter text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6">{t('footer.contact')}</h4>
            <div className="space-y-3 font-inter text-gray-300">
              <p>contact@ogoulajesse.pro</p>
              <p>+241 066 19 57 86</p>
              <p>Libreville, Gabon</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row md:justify-center items-center">
          <div className="font-inter text-gray-400">
            © {currentYear} Ogoula Jesse. {t('footer.rights')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

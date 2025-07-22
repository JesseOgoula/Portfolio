import { render, screen, fireEvent } from '@testing-library/react';
import About from './About';
import { LanguageContext } from '@/contexts/LanguageContext';

const renderWithLang = (lang = 'fr') =>
  render(
    <LanguageContext.Provider value={{
      language: lang,
      setLanguage: () => {},
      t: (key: string) => {
        if (key === 'about.description') return 'Ceci est une longue description pour le test.';
        if (key === 'about.title') return 'À propos';
        if (key === 'about.subtitle') return 'Sous-titre';
        return key;
      }
    }}>
      <About />
    </LanguageContext.Provider>
  );

test('affiche le texte tronqué et le bouton voir plus sur mobile', () => {
  renderWithLang('fr');
  // Simule mobile
  global.innerWidth = 375;
  global.dispatchEvent(new Event('resize'));
  expect(screen.getByText(/voir plus/i)).toBeInTheDocument();
});

test('affiche le texte complet après clic sur voir plus', () => {
  renderWithLang('fr');
  const btn = screen.getByRole('button');
  fireEvent.click(btn);
  expect(screen.getByText(/voir moins/i)).toBeInTheDocument();
});

test('affiche le texte anglais si language=en', () => {
  renderWithLang('en');
  expect(screen.getByText(/show more/i)).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import Navigation from './Navigation';
import { LanguageContext } from '@/contexts/LanguageContext';

describe('Navigation', () => {
  it('affiche le logo', () => {
    render(
      <LanguageContext.Provider value={{
        language: 'fr',
        setLanguage: () => {},
        t: (key: string) => key
      }}>
        <Navigation />
      </LanguageContext.Provider>
    );
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });

  it('affiche le bouton de changement de langue', () => {
    render(
      <LanguageContext.Provider value={{
        language: 'fr',
        setLanguage: () => {},
        t: (key: string) => key
      }}>
        <Navigation />
      </LanguageContext.Provider>
    );
    expect(screen.getByText(/EN/i)).toBeInTheDocument();
  });
});

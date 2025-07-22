import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { LanguageContext } from '@/contexts/LanguageContext';

describe('Footer', () => {
  it('affiche le logo footer', () => {
    render(
      <LanguageContext.Provider value={{
        language: 'fr',
        setLanguage: () => {},
        t: (key: string) => key
      }}>
        <Footer />
      </LanguageContext.Provider>
    );
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });

  it('affiche le contact', () => {
    render(
      <LanguageContext.Provider value={{
        language: 'fr',
        setLanguage: () => {},
        t: (key: string) => key
      }}>
        <Footer />
      </LanguageContext.Provider>
    );
    expect(screen.getByText(/contact@ogoulajesse.com/i)).toBeInTheDocument();
  });
});

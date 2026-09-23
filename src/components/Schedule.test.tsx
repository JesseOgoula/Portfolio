import { render, screen } from '@testing-library/react';
import Schedule from '../pages/Schedule';
import { LanguageContext } from '@/contexts/LanguageContext';

describe('Schedule', () => {
  it('affiche le titre en français', () => {
    render(
      <LanguageContext.Provider value={{
        language: 'fr',
        setLanguage: () => {},
        t: (key: string) => {
          if (key === 'fr') return 'fr';
          return key;
        }
      }}>
        <Schedule />
      </LanguageContext.Provider>
    );
    expect(screen.getByText(/Échangeons sur votre projet/i)).toBeInTheDocument();
  });

  it('affiche le titre en anglais', () => {
    render(
      <LanguageContext.Provider value={{
        language: 'en',
        setLanguage: () => {},
        t: (key: string) => {
          if (key === 'en') return 'en';
          return key;
        }
      }}>
        <Schedule />
      </LanguageContext.Provider>
    );
    expect(screen.getByText(/Let's discuss your project/i)).toBeInTheDocument();
  });
});

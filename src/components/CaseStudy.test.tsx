import { render, screen } from '@testing-library/react';
import CaseStudy from '../pages/CaseStudy';
import { LanguageContext } from '@/contexts/LanguageContext';

describe('CaseStudy', () => {
  it('affiche le titre de la page', () => {
    render(
      <LanguageContext.Provider value={{
        language: 'fr',
        setLanguage: () => {},
        t: (key: string) => key
      }}>
        <CaseStudy />
      </LanguageContext.Provider>
    );
    expect(screen.getByText(/case study/i)).toBeInTheDocument();
  });
});

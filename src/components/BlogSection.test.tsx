import { render, screen } from '@testing-library/react';
import BlogSection from './BlogSection';

jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: () => ({
      select: () => ({ order: () => ({ data: [
        { id: 1, title: 'Test Article', content: 'Contenu test', created_at: new Date().toISOString() }
      ], error: null }) })
    })
  }
}));

describe('BlogSection', () => {
  it('affiche un article fictif', async () => {
    render(<BlogSection />);
    expect(await screen.findByText(/Test Article/)).toBeInTheDocument();
    expect(await screen.findByText(/Contenu test/)).toBeInTheDocument();
  });
});

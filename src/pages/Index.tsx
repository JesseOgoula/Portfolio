import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Header from '@/components/Header';
import BrutalistHero from '@/components/BrutalistHero';
import Manifesto from '@/components/Manifesto';
import FeaturedProjectSection from '@/components/FeaturedProjectSection';
import ServicesCategories from '@/components/ServicesCategories';
import CollaborationsAndGrid from '@/components/CollaborationsAndGrid';
import CertificationsSection from '@/components/CertificationsSection';
import SecondVisualHero from '@/components/SecondVisualHero';
import FinalCTA from '@/components/FinalCTA';
import BrutalistFooter from '@/components/BrutalistFooter';
import VisualEditor from '@/components/VisualEditor';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { isTransitioning } = useLanguage();

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#050505] text-[#F4F4F4] selection:bg-[#F4F4F4] selection:text-[#050505] overflow-x-hidden font-sans">
        {/* Editorial Custom Desktop Cursor */}
        <CustomCursor />

        {/* Section 01: Top Minimalist Navigation */}
        <div data-editor-id="header" data-editor-label="Section 01 — En-tête & Navigation">
          <Header />
        </div>

        <main
          className={`flex flex-col transition-all duration-200 ease-out ${
            isTransitioning ? 'opacity-25 filter blur-[0.6px]' : 'opacity-100 filter-none'
          }`}
        >
          {/* Section 02: Brutalist Hero with 3D Helical Filmstrip */}
          <div data-editor-id="hero" data-editor-label="Section 02 — Hero Principal">
            <BrutalistHero />
          </div>

          {/* Section 03: First Manifesto / Statement */}
          <div data-editor-id="manifesto" data-editor-label="Section 03 — Manifesto">
            <Manifesto />
          </div>

          {/* Section 04: Featured Project Case Study */}
          <div data-editor-id="featured-project" data-editor-label="Section 04 — Études de Cas Vedettes">
            <FeaturedProjectSection />
          </div>

          {/* Section 05: Project Categories & Interactive Services */}
          <div data-editor-id="services" data-editor-label="Section 05 — Catégories & Services">
            <ServicesCategories />
          </div>

          {/* Section 06: Recent Collaborations Table & Selected Works Bento Grid */}
          <div data-editor-id="collaborations" data-editor-label="Section 06 — Collaborations & Bento Grid">
            <CollaborationsAndGrid />
          </div>

          {/* Section 07: Official Accreditations & Certifications Gallery */}
          <div data-editor-id="certifications" data-editor-label="Section 07 — Certifications & Accréditations">
            <CertificationsSection />
          </div>

          {/* Section 08: Unified Visual Hero (Editorial Statement + Borderless Portrait + Gravitating Partner Logos + 3D Ribbons) */}
          <div data-editor-id="second-hero" data-editor-label="Section 08 — Deuxième Hero Visuel">
            <SecondVisualHero />
          </div>

          {/* Section 09: Final Call to Action & Direct Coordinates */}
          <div data-editor-id="final-cta" data-editor-label="Section 09 — Appel à l'Action Final">
            <FinalCTA />
          </div>
        </main>

        {/* Section 10: Brutalist Footer with Monumental Typography */}
        <div
          data-editor-id="footer"
          data-editor-label="Section 10 — Pied de Page Brutaliste"
          className={`transition-all duration-200 ease-out ${
            isTransitioning ? 'opacity-25 filter blur-[0.6px]' : 'opacity-100 filter-none'
          }`}
        >
          <BrutalistFooter />
        </div>

        {/* In-Browser Visual Editor Tool */}
        <VisualEditor />
      </div>
    </SmoothScroll>
  );
};

export default Index;


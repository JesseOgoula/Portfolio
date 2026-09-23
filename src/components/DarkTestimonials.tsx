import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Quote, Linkedin } from 'lucide-react';

const DarkTestimonials = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Nel Brunel Mankou Madouma',
      role: language === 'fr' ? 'Web Designer | UI-UX Designer' : 'Web Designer | UI-UX Designer',
      content: language === 'fr'
        ? 'Grâce à la formation à École 241, j’ai eu l’opportunité de rencontrer le coach Jesse. Son accompagnement m’a permis de structurer mes compétences existantes et d’en développer de nouvelles. Aujourd’hui encore, j’apprends à ses côtés. Sa passion pour l’apprentissage et sa veille constante lui permettent de toujours progresser et de nous inspirer à faire de même.'
        : 'Thanks to the training at École 241, I had the opportunity to meet coach Jesse. His support helped me structure my existing skills and develop new ones. Even today, I continue to learn alongside him. His passion for learning and constant curiosity allow him to keep progressing and inspire us to do the same.',
      rating: 5,
      image: '/NEL.jpg',
      linkedin: 'https://www.linkedin.com/in/nel-brunel-mankou-madouma/'
    },
    {
      name: 'Bérénice GANGBO',
      role: language === 'fr' ? 'Responsable administrative et financière' : 'Administrative and Financial Manager',
      content: language === 'fr'
        ? `Dans le cadre de ma formation en marketing numérique avec D-CLIC (soutenu par l’OIF), j’ai eu le privilège d’être accompagnée par Monsieur Jesse OGOULA comme tuteur. Son engagement, sa disponibilité et sa patience ont été déterminants pour ma progression. Toujours à l’écoute, il apportait des explications claires même sur les modules complexes. Il a partagé généreusement ses connaissances et expériences.`
        : `As part of my digital marketing training with D-CLIC (supported by OIF), I had the privilege of being mentored by Mr. Jesse OGOULA. His commitment, availability, and patience were key to my progress. Always attentive, he provided clear explanations even on complex modules. He generously shared his knowledge and experience.`,
      rating: 5,
      image: '/berenice.jpeg',
      linkedin: 'https://www.linkedin.com/in/b%C3%A9r%C3%A9nice-gangbo-5385b0344/'
    }
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const current = testimonials[currentIndex];

  return (
    <section className="relative py-20 sm:py-28 bg-[#08080a] text-white border-b border-white/10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        <div className="max-w-4xl mx-auto">
          {/* Section Subtitle */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
            <span className="font-space text-xs text-primary uppercase tracking-widest">
              // TESTIMONIALS & ENDORSEMENTS
            </span>
            <span className="font-space text-xs text-zinc-500">
              0{currentIndex + 1} / 0{testimonials.length}
            </span>
          </div>

          {/* Testimonial Card */}
          <div className="relative p-8 sm:p-12 rounded-2xl bg-[#0e0e13] border border-white/10 shadow-2xl">
            <Quote className="w-12 h-12 text-white/10 absolute top-6 right-6 pointer-events-none" />

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start mb-6">
              <div className="relative flex-shrink-0">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-white/20 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full">
                  <Quote className="w-3 h-3" />
                </div>
              </div>

              <div className="text-center sm:text-left flex-1">
                <div className="flex justify-center sm:justify-start gap-1 mb-2 text-amber-400 text-sm">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <h4 className="font-syne font-bold text-xl sm:text-2xl text-white">
                  {current.name}
                </h4>
                <p className="font-space text-xs text-primary uppercase tracking-wider mb-2">
                  {current.role}
                </p>

                {current.linkedin && (
                  <a
                    href={current.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-space text-zinc-400 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>Profil LinkedIn Vérifié</span>
                  </a>
                )}
              </div>
            </div>

            <blockquote className="font-inter text-base sm:text-lg text-zinc-300 leading-relaxed italic border-t border-white/10 pt-6">
              "{current.content}"
            </blockquote>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === currentIndex ? 'bg-primary w-6' : 'bg-zinc-700'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default DarkTestimonials;

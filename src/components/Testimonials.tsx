
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Testimonials = () => {
  const { language } = useLanguage();
  
  const testimonials = [
    {
      name: 'Sylvère Boussamba',
      role: language === 'fr' ? 'CEO, École 241' : 'CEO, École 241',
      content: language === 'fr' 
        ? 'Un accompagnement exceptionnel qui a transformé notre approche produit. Les résultats ont dépassé nos attentes avec une augmentation de 200% de l\'engagement étudiant.'
        : 'Exceptional support that transformed our product approach. Results exceeded our expectations with a 200% increase in student engagement.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Marie Nkongolo',
      role: language === 'fr' ? 'Directrice Marketing, Africakard' : 'Marketing Director, Africakard',
      content: language === 'fr'
        ? 'Son expertise en Product Management nous a permis de structurer notre roadmap et d\'atteindre nos objectifs de croissance en un temps record.'
        : 'His Product Management expertise allowed us to structure our roadmap and achieve our growth objectives in record time.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b932?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Jean-Claude Mvondo',
      role: language === 'fr' ? 'Entrepreneur, Fintech' : 'Entrepreneur, Fintech',
      content: language === 'fr'
        ? 'Formation D-CLIC exceptionnelle ! J\'ai acquis les compétences nécessaires pour lancer ma startup avec une stratégie marketing solide.'
        : 'Exceptional D-CLIC training! I acquired the skills needed to launch my startup with a solid marketing strategy.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl lg:text-5xl text-navy-800 mb-6">
            {language === 'fr' ? 'Témoignages' : 'Testimonials'}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Découvrez ce que disent mes clients et apprenants de leur expérience'
              : 'Discover what my clients and students say about their experience'
            }
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="mb-8">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
                  />
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-2xl">★</span>
                    ))}
                  </div>
                </div>
                
                <blockquote className="font-inter text-xl text-gray-700 leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].content}"
                </blockquote>
                
                <div>
                  <div className="font-poppins font-semibold text-lg text-navy-800">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="font-inter text-primary">
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-navy-800" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronRight className="w-6 h-6 text-navy-800" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

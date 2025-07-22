
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Testimonials = () => {
  const { language } = useLanguage();
  
  const testimonials = [
    {
      name: 'Nel Brunel Mankou Madouma',
      role: language === 'fr' ? 'Web Designer | UI-UX Designer' : 'Web Designer | UI-UX Designer',
      content: language === 'fr'
        ? 'Grâce à la formation à École 241, j’ai eu l’opportunité de rencontrer le coach Jesse. Son accompagnement m’a permis de structurer mes compétences existantes et d’en développer de nouvelles. Aujourd’hui encore, j’apprends à ses côtés. Sa passion pour l’apprentissage et sa veille constante lui permettent de toujours progresser et de nous inspirer à faire de même.'
        : 'Thanks to the training at École 241, I had the opportunity to meet coach Jesse. His support helped me structure my existing skills and develop new ones. Even today, I continue to learn alongside him. His passion for learning and constant curiosity allow him to keep progressing and inspire us to do the same.' ,
      rating: 5,
      image: '/NEL.jpg',
      linkedin: 'https://www.linkedin.com/in/nel-brunel-mankou-madouma/'
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
                    {testimonials[currentIndex].linkedin ? (
                      <a href={testimonials[currentIndex].linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                        {testimonials[currentIndex].name}
                      </a>
                    ) : (
                      testimonials[currentIndex].name
                    )}
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

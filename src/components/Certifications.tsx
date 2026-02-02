import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Award, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Certifications = () => {
  const { t, language } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  const certifications = [
    {
      title: language === 'fr' ? 'Product Manager Certifié' : 'Certified Product Manager',
      organization: 'Ecole 241',
      year: '2022',
      image: '/certifications/Certificat Product Manager.jpeg',
    },
    {
      title: language === 'fr' ? 'Pédagogie Active' : 'Active Pedagogy',
      organization: 'Simplon Africa',
      year: '2024',
      image: '/certifications/Certificat pédagogie active.png',
    },
    {
      title: language === 'fr' ? 'IA pour les Managers' : 'AI for Managers',
      organization: 'Formation Continue',
      year: '2024',
      image: '/certifications/Certificat - IA pour les managers.png',
    },
    {
      title: 'Google Digital Marketing',
      organization: 'Google',
      year: '2023',
      image: '/certifications/Certification Google.png',
    },
    {
      title: 'Inbound Marketing',
      organization: 'HubSpot Academy',
      year: '2023',
      image: '/certifications/Certification Inbound.png',
    },
    {
      title: 'Social Media Marketing',
      organization: 'HubSpot Academy',
      year: '2023',
      image: '/certifications/Certification Social Media.png',
    },
    {
      title: 'HP Life',
      organization: 'HP Foundation',
      year: '2023',
      image: '/certifications/Certificat hp life.png',
    },
    {
      title: language === 'fr' ? 'Certification Supplémentaire' : 'Additional Certification',
      organization: 'Formation',
      year: '2024',
      image: '/certifications/1.jpeg',
    },
  ];

  const openLightbox = (index: number) => setSelectedCert(index);
  const closeLightbox = () => setSelectedCert(null);

  const goToPrevious = () => {
    if (selectedCert !== null) {
      setSelectedCert(selectedCert === 0 ? certifications.length - 1 : selectedCert - 1);
    }
  };

  const goToNext = () => {
    if (selectedCert !== null) {
      setSelectedCert(selectedCert === certifications.length - 1 ? 0 : selectedCert + 1);
    }
  };

  const aspirationText = language === 'fr'
    ? "En tant que professionnel du numérique, je m'efforce chaque jour de perfectionner mes compétences et d'élargir mon expertise. Mon engagement dans l'accompagnement des apprenants et le soutien aux entreprises dans leur transformation digitale témoigne de ma volonté d'avoir un impact positif dans l'écosystème numérique francophone."
    : "As a constantly evolving digital professional, I strive every day to perfect my skills and broaden my expertise. My commitment to supporting learners and assisting businesses in their digital transformation demonstrates my desire to have a positive impact in the French-speaking digital ecosystem.";

  return (
    <section id="certifications" className="py-20 bg-light-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl lg:text-5xl text-navy-800 mb-6">
            {t('certifications.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Mes certifications professionnelles validant mon expertise'
              : 'My professional certifications validating my expertise'}
          </p>
        </div>

        {/* Certification Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto mb-16">
          {certifications.map((cert, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Certificate Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay with info */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="font-poppins font-semibold text-white text-sm md:text-base mb-1 line-clamp-2">
                    {cert.title}
                  </h4>
                  <p className="text-primary text-xs md:text-sm font-medium">
                    {cert.organization} • {cert.year}
                  </p>
                </div>
              </div>

              {/* Badge icon */}
              <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Award className="w-4 h-4 text-white" />
              </div>

              {/* Bottom gradient bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-navy-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>

        {/* Aspiration Message */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-navy-800 to-navy-900 p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Award className="w-8 h-8 text-primary" />
                </div>
              </div>
              <p className="font-inter text-gray-300 leading-relaxed text-center italic text-base md:text-lg">
                "{aspirationText}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedCert !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all duration-200 z-50"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all duration-200 z-50"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Certificate display */}
          <div
            className="max-w-4xl max-h-[85vh] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={certifications[selectedCert].image}
              alt={certifications[selectedCert].title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl animate-scale-in"
            />
            <div className="text-center mt-4">
              <h4 className="font-poppins font-semibold text-white text-lg">
                {certifications[selectedCert].title}
              </h4>
              <p className="text-primary text-sm mt-1">
                {certifications[selectedCert].organization} • {certifications[selectedCert].year}
              </p>
            </div>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-inter text-sm">
            {selectedCert + 1} / {certifications.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;

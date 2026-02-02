import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Gallery = () => {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const photos = [
    {
      src: '/me1 (1).png',
      alt: language === 'fr' ? 'Photo professionnelle 1' : 'Professional photo 1',
    },
    {
      src: '/me1 (2).png',
      alt: language === 'fr' ? 'Photo professionnelle 2' : 'Professional photo 2',
    },
    {
      src: '/me1 (3).png',
      alt: language === 'fr' ? 'Photo professionnelle 3' : 'Professional photo 3',
    },
  ];

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? photos.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === photos.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section id="galerie" className="py-20 bg-gradient-to-br from-navy-800 to-navy-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl lg:text-5xl text-white mb-6">
            {language === 'fr' ? 'En Images' : 'Gallery'}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="font-inter text-lg text-gray-300 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Quelques moments capturés de mon parcours professionnel'
              : 'Some captured moments from my professional journey'}
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {photos.map((photo, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-center">
                    <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-inter">
                      {language === 'fr' ? 'Cliquer pour agrandir' : 'Click to enlarge'}
                    </span>
                  </div>
                </div>
              </div>
              {/* Glassmorphism border effect */}
              <div className="absolute inset-0 border-2 border-white/10 rounded-2xl pointer-events-none group-hover:border-primary/50 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
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

          {/* Image */}
          <div
            className="max-w-4xl max-h-[85vh] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[selectedImage].src}
              alt={photos[selectedImage].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-scale-in"
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-inter text-sm">
            {selectedImage + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;

import { useLanguage } from '@/contexts/LanguageContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from 'react';
import { type CarouselApi } from "@/components/ui/carousel"

const Partners = () => {
  const { t } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Démarrer l'autoplay
    const autoplayInterval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => {
      clearInterval(autoplayInterval);
    };
  }, [api]);    const partners = [
    {
      name: "Organisation Internationale de la Francophonie",
      logo: "/logos/Logo_OIF.svg.png",
      website: "https://www.francophonie.org/"
    },
    {
      name: "École 241",
      logo: "/logos/E241 NOIR.png",
      website: "#"
    },
    {
      name: "Simplon co",
      logo: "/logos/école-simplon-logo.png",
      website: "https://www.simplon.co/"
    },
    {
      name: "Agix",
      logo: "/logos/agix.png",
      website: "#"
    },
    {
      name: "Ogooué Labs",
      logo: "/logos/Ogooue-Labs-logo.png",
      website: "#"
    },
    {
      name: "Africakard",
      logo: "/logos/LOGO AFRICAKARD@300x.png",
      website: "#"
    },
    {
      name: "PCG",
      logo: "/logos/logopcg1.png",
      website: "#"
    },
    {
      name: "Chez Jimmy",
      logo: "/logos/chezjimmy.jpg",
      website: "#"
    },
    {
      name: "Dressing for Kids",
      logo: "/logos/Dressingforkids.png",
      website: "#"
    },
    {
      name: "FGTT",
      logo: "/logos/fgtt.png",
      website: "#"
    },
    {
      name: "Idée Design",
      logo: "/logos/ideedesign.png",
      website: "#"
    },
    {
      name: "Just Sport Fit",
      logo: "/logos/justsportfit.png",
      website: "#"
    },
    {
      name: "MCS",
      logo: "/logos/mcs.png",
      website: "#"
    },
    {
      name: "Restaure Service",
      logo: "/logos/restaureservice.png",
      website: "#"
    },
    {
      name: "SNPS",
      logo: "/logos/snps.png",
      website: "#"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-navy-800 mb-4">
            {t('partners.title')}
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            {t('partners.subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-12">
          <Carousel 
            opts={{
              align: "center",
              loop: true,
              skipSnaps: false,
              dragFree: true,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="-ml-4">
              {partners.map((partner, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div 
                    className={`
                      relative bg-white rounded-lg p-4
                      transition-all duration-500 ease-out
                      flex items-center justify-center
                      w-[200px] h-[120px] group mx-auto
                      hover:shadow-lg border border-gray-100
                      ${current === index ? 'scale-105 shadow-md' : 'scale-100'}
                    `}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className={`
                        w-auto h-auto max-w-[160px] max-h-[80px]
                        object-contain transition-all duration-500
                        filter grayscale opacity-75
                        group-hover:grayscale-0 group-hover:opacity-100
                        ${current === index ? 'grayscale-0 opacity-100' : ''}
                      `}
                    />
                    <div className="absolute inset-0 bg-navy-800/0 group-hover:bg-navy-800/5 rounded-xl transition-all duration-300" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-6 bg-white shadow-lg border-none hover:bg-gray-50" />
              <CarouselNext className="-right-6 bg-white shadow-lg border-none hover:bg-gray-50" />
            </div>
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <p className="font-inter text-gray-500 text-sm">
            {t('partners.collaboration')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Partners;

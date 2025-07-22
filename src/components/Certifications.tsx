import { useLanguage } from '@/contexts/LanguageContext';

const Certifications = () => {
  const { t, language } = useLanguage();

  const certifications = [
    {
      title: language === 'fr' ? 'Product Manager Certifié' : 'Certified Product Manager',
      organization: 'Ecole 241',
      year: '2022',
      description: language === 'fr' 
        ? 'Certification complète en Product Management avec focus sur les métriques et la stratégie produit.'
        : 'Complete Product Management certification with focus on metrics and product strategy.',
      link: '#'
    },
    {
      title: language === 'fr' ? 'Formateur Simplon certifié en pédagogie active' : 'Simplon trainer certified in active teaching methods',
      organization: 'Simplon Africa',
      year: '2024',
      description: language === 'fr'
        ? 'Habilitation officielle pour former aux métiers du numérique et de la tech.'
        : 'Official accreditation to train in digital and tech professions.',
      link: '#'
    },
    {
      title: language === 'fr' ? 'Tuteur D-CLIC (OIF)' : 'D-CLIC Tutor (OIF)',
      organization: language === 'fr' ? 'Organisation Internationale de la Francophonie' : 'International Organization of Francophonie',
      year: '2023',
      description: language === 'fr'
        ? 'Certification de tuteur pour le dispositif D-CLIC de formation au marketing numérique.'
        : 'Tutor certification for the D-CLIC digital marketing training program.',
      link: '#'
    }
  ];

  const aspirationText = language === 'fr' 
    ? "En tant que professionnel du numérique en constante évolution, je m'efforce chaque jour de perfectionner mes compétences et d'élargir mon expertise. Mon engagement dans l'accompagnement des apprenants et le soutien aux entreprises dans leur transformation digitale témoigne de ma volonté d'avoir un impact positif dans l'écosystème numérique francophone. Je continue à travailler avec passion et détermination, en espérant que mon expertise et mon dévouement contribueront à façonner l'avenir numérique de notre communauté."
    : "As a constantly evolving digital professional, I strive every day to perfect my skills and broaden my expertise. My commitment to supporting learners and assisting businesses in their digital transformation demonstrates my desire to have a positive impact in the French-speaking digital ecosystem. I continue to work with passion and determination, hoping that my expertise and dedication will help shape the digital future of our community.";

  return (
    <section id="certifications" className="py-20 bg-light-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl lg:text-5xl text-navy-800 mb-6">
            {t('certifications.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Certifications */}
          <div className="mb-16">
            <h3 className="font-poppins font-semibold text-2xl text-navy-800 mb-8 text-center">
              {t('certifications.professional')}
            </h3>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-poppins font-semibold text-xl text-navy-800 mb-2">
                        {cert.title}
                      </h4>
                      <div className="font-inter text-primary font-medium mb-2">
                        {cert.organization} • {cert.year}
                      </div>
                      <p className="font-inter text-gray-600 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>
                    {/* Bouton 'Vérifier' supprimé */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section des réalisations (à activer dans le futur)
          <div className="bg-navy-800 p-8 rounded-2xl">
            <h3 className="font-poppins font-semibold text-2xl text-white mb-8 text-center">
              {t('certifications.achievements')}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Top 1% Product Managers France 2023',
                'Speaker TEDx Libreville 2022',
                'Mentor Africa Code Week 2021-2023',
                'Prix Innovation Numérique Gabon 2022'
              ].map((achievement, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-4 flex-shrink-0" />
                  <span className="font-inter text-gray-300">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
          */}

          {/* Message d'aspiration */}
          <div className="bg-navy-800 p-8 rounded-2xl">
            <div className="max-w-3xl mx-auto">
              <p className="font-inter text-gray-300 leading-relaxed text-center italic">
                {aspirationText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;

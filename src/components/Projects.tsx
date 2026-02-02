import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles } from 'lucide-react';

const Projects = () => {
  const { language } = useLanguage();

  const projects = [
    {
      title: 'SikaApp',
      category: language === 'fr' ? 'Application Mobile' : 'Mobile App',
      duration: language === 'fr' ? 'En cours' : 'Ongoing',
      description: language === 'fr'
        ? 'Application mobile personnelle de gestion financière boostée à l\'IA et au Machine Learning. Analyse automatique des SMS bancaires, catégorisation intelligente des dépenses, prédictions budgétaires et recommandations personnalisées pour une meilleure santé financière.'
        : 'Personal mobile financial management app powered by AI and Machine Learning. Automatic bank SMS analysis, smart expense categorization, budget predictions, and personalized recommendations for better financial health.',
      logo: '/logored.png',
      banner: '/Sikaapp.jpeg',
      isPersonal: true,
      stats: [
        { label: language === 'fr' ? 'Technologie' : 'Technology', value: 'Flutter' },
        { label: 'AI/ML', value: language === 'fr' ? 'Intégré' : 'Built-in' },
        { label: 'Status', value: 'Beta' }
      ]
    },
    {
      title: 'Africakard',
      category: language === 'fr' ? 'Gestion de produit' : 'Product Management',
      duration: language === 'fr' ? '4 mois' : '4 months',
      description: language === 'fr'
        ? 'plateforme en ligne, spécialisée dans la vente de cartes cadeaux numériques et d\'abonnements pour divers services de divertissement et de jeux.'
        : 'Online platform, specializing in the sale of digital gift cards and subscriptions for various entertainment and gaming services.',
      logo: '/logos/LOGO AFRICAKARD@300x.png',
      banner: '/banners/AFRICAKARD.png',
      stats: [
        { label: language === 'fr' ? 'Utilisateurs actifs' : 'Active users', value: '+150%' },
        { label: language === 'fr' ? 'Transactions' : 'Transactions', value: '+200%' },
        { label: language === 'fr' ? 'Taux de rétention' : 'Retention rate', value: '85%' }
      ]
    },
    {
      title: 'École 241',
      category: language === 'fr' ? 'Formation' : 'Training',
      duration: language === 'fr' ? '24 mois' : '24 months',
      description: language === 'fr'
        ? 'établissement de formation aux métiers du numérique basé au Gabon. Fondée en 2018 par l\'incubateur Ogooué Labs, elle vise à démocratiser l\'accès aux compétences numériques pour les jeunes, les femmes et les personnes éloignées de l\'emploi.'
        : 'training institution for digital professions based in Gabon. Founded in 2018 by incubator Ogooué Labs, it aims to democratise access to digital skills for young people, women and people who are a long way from employment.',
      logo: '/logos/E241 NOIR.png',
      banner: '/banners/Ecole241.jpg',
      stats: [
        { label: language === 'fr' ? 'Étudiants formés' : 'Students trained', value: '15+' },
        { label: language === 'fr' ? 'Taux d\'insertion' : 'Job placement', value: '75%' },
        { label: language === 'fr' ? 'Satisfaction' : 'Satisfaction', value: '92%' }
      ]
    },
    {
      title: 'OIF D-CLIC',
      category: language === 'fr' ? 'Formation' : 'Training',
      duration: language === 'fr' ? '5 mois' : '5 months',
      description: language === 'fr'
        ? 'Le programme D-CLIC  est une initiative de l’Organisation internationale de la Francophonie (OIF) visant à renforcer les compétences numériques des jeunes francophones. L\'objectif est de favoriser leur employabilité et leur autonomisation dans des secteurs porteurs du numérique.'
        : 'The D-CLIC programme is an initiative of the Organisation internationale de la Francophonie (OIF) aimed at strengthening the digital skills of young Francophones. The aim is to promote their employability and empowerment in promising digital sectors.',
      logo: '/logos/Logo_OIF.svg.png',
      banner: '/banners/DECLIC.jpg',
      stats: [
        { label: language === 'fr' ? 'Apprenants' : 'Learners', value: '120+' },
        { label: language === 'fr' ? 'Complétion' : 'Completion', value: '85%' },
        { label: language === 'fr' ? 'Certifiés' : 'Certified', value: '45' }
      ]
    },
    {
      title: 'FGTT',
      category: 'site web',
      duration: language === 'fr' ? '2 mois' : '2 months',
      description: language === 'fr'
        ? 'conception et de développement  du site officiel de la Fédération Gabonaise de Tennis de Table (FGTT). Ce projet visait à doter la fédération d\'une plateforme numérique moderne, intuitive et responsive, permettant de centraliser les actualités, les événements, les résultats des compétitions et les ressources destinées aux membres et au grand public.'
        : 'Design and development of the official website of the Gabonese Table Tennis Federation (FGTT). This project aimed to provide the federation with a modern, intuitive, and responsive digital platform to centralize news, events, competition results, and resources for members and the general public.',
      logo: '/logos/fgtt.png',
      banner: '/banners/fgtt.png',
      stats: [
        { label: language === 'fr' ? 'Visites mensuelles' : 'Monthly visits', value: '150+' },
        { label: language === 'fr' ? 'Temps moyen / visite' : 'Avg. time / visit', value: '4m20s' },
        { label: language === 'fr' ? 'Satisfaction utilisateurs' : 'User satisfaction', value: '95%' }
      ]
    },
    {
      title: 'CodeSchool',
      category: language === 'fr' ? 'Plateforme pédagogique' : 'Learning Platform',
      duration: language === 'fr' ? '6 mois' : '6 months',
      description: language === 'fr'
        ? "Dans le cadre de ma mission à École 241 (Ogooue Labs), j'ai conçu CodeSchool : une plateforme pédagogique pensée pour centraliser nos activités et mieux accompagner les apprenants. J'ai assuré la conception produit (product management, design, fonctionnalités) tandis que le développement technique a été réalisé par mon collègue Yohann Obiang."
        : "As part of my mission at École 241 (Ogooue Labs), I designed CodeSchool: a learning platform created to centralize our activities and better support learners. I was responsible for product conception (product management, design, features) while the technical development was carried out by my colleague Yohann Obiang.",
      logo: '/logos/E241 NOIR.png',
      banner: '/code school.jpg',
      link: 'https://www.yohannobiang.com/codeschool.html',
      stats: [
        { label: language === 'fr' ? 'Utilisateurs' : 'Users', value: '20+' },
        { label: language === 'fr' ? 'Modules' : 'Modules', value: '12' },
        { label: language === 'fr' ? 'Satisfaction' : 'Satisfaction', value: '98%' }
      ]
    }
  ];

  return (
    <section id="realisations" className="py-20 bg-light-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-navy-800 mb-6">
            {language === 'fr' ? 'Réalisations' : 'Portfolio'}
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Découvrez quelques projets significatifs sur lesquels j\'ai eu l\'opportunité d\'avoir un impact.'
              : 'Discover some significant projects where I had the opportunity to make an impact.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className={`overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${project.isPersonal ? 'ring-2 ring-primary/30' : ''}`}>
              <CardContent className="p-0">
                {/* Personal Project Badge */}
                {project.isPersonal && (
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-gradient-to-r from-primary to-primary/80 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    {language === 'fr' ? 'Projet Personnel' : 'Personal Project'}
                  </div>
                )}
                {/* Bannière du projet */}
                <div className="relative h-48 bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50">
                    <img
                      src={project.banner || '/placeholder.svg'}
                      alt={`${project.title} banner`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-10 left-6">
                    <div className="bg-white rounded-xl p-3 shadow-lg w-20 h-20 flex items-center justify-center">
                      <img
                        src={project.logo}
                        alt={project.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="inline-block bg-primary/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                      {project.category}
                    </span>
                    <span className="inline-block bg-black/30 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                      {project.duration}
                    </span>
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-6 pt-12">
                  <h3 className="font-poppins font-bold text-xl text-navy-800 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {project.description}
                    {project.link && (
                      <>
                        <br />
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                          {language === 'fr' ? 'En savoir plus' : 'Learn more'}
                        </a>
                      </>
                    )}
                  </p>

                  {/* Statistiques */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    {project.stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="font-poppins font-bold text-xl text-primary mb-1">
                          {stat.value}
                        </div>
                        <div className="text-gray-600 text-sm">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

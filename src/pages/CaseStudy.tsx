
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Calendar, Target, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const CaseStudy = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const caseStudies = {
    'africakard': {
      title: 'Africakard',
      category: 'Fintech',
      duration: language === 'fr' ? '8 mois' : '8 months',
      client: 'Startup Fintech',
      challenge: language === 'fr' 
        ? 'Développer une plateforme de paiement mobile révolutionnaire pour l\'Afrique francophone avec des défis techniques majeurs et un marché très concurrentiel.'
        : 'Develop a revolutionary mobile payment platform for Francophone Africa with major technical challenges and a highly competitive market.',
      solution: language === 'fr'
        ? 'Mise en place d\'une stratégie product complète incluant l\'analyse utilisateur, l\'optimisation UX/UI, et l\'implémentation d\'un système de growth hacking adapté au marché local.'
        : 'Implementation of a complete product strategy including user analysis, UX/UI optimization, and implementation of a growth hacking system adapted to the local market.',
      results: [
        { metric: language === 'fr' ? 'Utilisateurs actifs' : 'Active users', value: '+150%' },
        { metric: language === 'fr' ? 'Transactions mensuelles' : 'Monthly transactions', value: '+200%' },
        { metric: language === 'fr' ? 'Taux de rétention' : 'Retention rate', value: '85%' },
        { metric: language === 'fr' ? 'Temps de téléchargement' : 'Download time', value: '-40%' }
      ],
      timeline: [
        { phase: language === 'fr' ? 'Recherche utilisateur' : 'User research', duration: language === 'fr' ? '2 semaines' : '2 weeks' },
        { phase: language === 'fr' ? 'Prototypage' : 'Prototyping', duration: language === 'fr' ? '3 semaines' : '3 weeks' },
        { phase: language === 'fr' ? 'Développement MVP' : 'MVP Development', duration: language === 'fr' ? '2 mois' : '2 months' },
        { phase: language === 'fr' ? 'Tests & Optimisation' : 'Testing & Optimization', duration: language === 'fr' ? '3 mois' : '3 months' }
      ],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
    },
    'ecole-241': {
      title: 'École 241',
      category: 'EdTech',
      duration: language === 'fr' ? '6 mois' : '6 months',
      client: language === 'fr' ? 'Institution éducative' : 'Educational institution',
      challenge: language === 'fr'
        ? 'Transformer l\'enseignement traditionnel en créant une plateforme e-learning innovante capable d\'engager les étudiants et d\'améliorer les résultats pédagogiques.'
        : 'Transform traditional education by creating an innovative e-learning platform capable of engaging students and improving educational outcomes.',
      solution: language === 'fr'
        ? 'Développement d\'une plateforme interactive avec gamification, suivi personnalisé des progrès, et outils collaboratifs adaptés au contexte éducatif francophone.'
        : 'Development of an interactive platform with gamification, personalized progress tracking, and collaborative tools adapted to the Francophone educational context.',
      results: [
        { metric: language === 'fr' ? 'Engagement étudiant' : 'Student engagement', value: '+200%' },
        { metric: language === 'fr' ? 'Taux de réussite' : 'Success rate', value: '+45%' },
        { metric: language === 'fr' ? 'Temps d\'apprentissage' : 'Learning time', value: '-30%' },
        { metric: language === 'fr' ? 'Satisfaction enseignants' : 'Teacher satisfaction', value: '92%' }
      ],
      timeline: [
        { phase: language === 'fr' ? 'Audit pédagogique' : 'Educational audit', duration: language === 'fr' ? '2 semaines' : '2 weeks' },
        { phase: language === 'fr' ? 'Conception UX' : 'UX Design', duration: language === 'fr' ? '4 semaines' : '4 weeks' },
        { phase: language === 'fr' ? 'Développement' : 'Development', duration: language === 'fr' ? '3 mois' : '3 months' },
        { phase: language === 'fr' ? 'Déploiement' : 'Deployment', duration: language === 'fr' ? '1 mois' : '1 month' }
      ],
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1200&q=80'
    }
  };

  const caseStudy = caseStudies[slug as keyof typeof caseStudies];

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-light-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-poppins font-bold text-2xl text-navy-800 mb-4">
            {language === 'fr' ? 'Cas d\'étude non trouvé' : 'Case study not found'}
          </h1>
          <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90">
            {language === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-100">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="mb-8 border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Retour aux projets' : 'Back to projects'}
            </Button>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-inter font-medium">
                    {caseStudy.category}
                  </span>
                </div>
                <h1 className="font-poppins font-bold text-4xl lg:text-5xl text-navy-800 mb-6">
                  {caseStudy.title}
                </h1>
                <div className="flex items-center space-x-6 text-gray-600 font-inter mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    {caseStudy.duration}
                  </div>
                  <div className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    {caseStudy.client}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="font-poppins font-semibold text-2xl text-navy-800 mb-6">
                    {language === 'fr' ? 'Le Défi' : 'The Challenge'}
                  </h2>
                  <p className="font-inter text-gray-600 leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-xl bg-primary/5">
                <CardContent className="p-8">
                  <h2 className="font-poppins font-semibold text-2xl text-navy-800 mb-6">
                    {language === 'fr' ? 'La Solution' : 'The Solution'}
                  </h2>
                  <p className="font-inter text-gray-600 leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-poppins font-bold text-3xl text-navy-800 text-center mb-12">
              {language === 'fr' ? 'Résultats Obtenus' : 'Results Achieved'}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {caseStudy.results.map((result, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <div className="font-poppins font-bold text-3xl text-primary mb-2">
                    {result.value}
                  </div>
                  <div className="font-inter text-gray-600">
                    {result.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-poppins font-bold text-3xl text-navy-800 text-center mb-12">
              {language === 'fr' ? 'Timeline du Projet' : 'Project Timeline'}
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {caseStudy.timeline.map((phase, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-poppins font-semibold mr-6">
                      {index + 1}
                    </div>
                    <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
                      <h3 className="font-poppins font-semibold text-lg text-navy-800 mb-2">
                        {phase.phase}
                      </h3>
                      <p className="font-inter text-gray-600">
                        {phase.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-navy-800">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="font-poppins font-bold text-3xl text-white mb-6">
              {language === 'fr' 
                ? 'Prêt à transformer votre projet ?'
                : 'Ready to transform your project?'
              }
            </h2>
            <p className="font-inter text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {language === 'fr'
                ? 'Discutons de votre vision et créons ensemble votre succès'
                : 'Let\'s discuss your vision and create your success together'
              }
            </p>
            <Button
              onClick={() => navigate('/#contact')}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 font-inter font-medium text-lg"
            >
              {language === 'fr' ? 'Démarrer un projet' : 'Start a project'}
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudy;

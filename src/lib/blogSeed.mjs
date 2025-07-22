import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ppbtswwjdjvoargsfjlv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYnRzd3dqZGp2b2FyZ3Nmamx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTY0NTgsImV4cCI6MjA2ODA3MjQ1OH0.Ju3RJAu7fkeYtk0sdogA65XrnxDHqYa6jzQxL14sB0c';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const articles = [
  {
    title: "5 stratégies de croissance digitale pour 2025",
    content: `Découvrez les tendances et tactiques incontournables pour booster la croissance de votre entreprise en 2025 :\n- Automatisation du marketing\n- Personnalisation avancée\n- Data-driven decision\n- Growth hacking\n- Expérience utilisateur mobile\n\nAdoptez ces stratégies pour rester compétitif !`,
  },
  {
    title: "Comment lancer un produit innovant sur le marché francophone ?",
    content: `Lancer un produit innovant nécessite :\n1. Une étude de marché approfondie\n2. Un MVP rapide\n3. Des feedbacks utilisateurs\n4. Une stratégie d'acquisition multicanale\n5. Un accompagnement post-lancement\n\nDécouvrez les étapes clés pour réussir !`,
  },
  {
    title: "Les erreurs à éviter en Product Management",
    content: `Dans le Product Management, évitez :\n- Négliger la voix du client\n- Sous-estimer l'importance des tests\n- Manquer de vision long terme\n- Oublier l'analyse des données\n\nApprenez à les anticiper pour maximiser vos chances de succès.`,
  },
  {
    title: "Growth Hacking : 3 exemples concrets pour les PME",
    content: `Le growth hacking n'est pas réservé aux startups !\n- Utilisez le referral marketing\n- Automatisez vos campagnes email\n- Analysez vos funnels de conversion\n\nDes actions simples pour des résultats rapides.`,
  },
];

async function seedBlogArticles() {
  for (const article of articles) {
    await supabase.from('blog_articles').insert([{ ...article }]);
  }
  console.log('Articles fictifs insérés dans la base de données.');
}

seedBlogArticles();

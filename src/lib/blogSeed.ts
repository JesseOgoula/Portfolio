import { supabase } from './supabaseClient';

const articles = [
  {
    title: "5 stratégies de croissance digitale pour 2025",
    content: `Découvrez les tendances et tactiques incontournables pour booster la croissance de votre entreprise en 2025 :
- Automatisation du marketing
- Personnalisation avancée
- Data-driven decision
- Growth hacking
- Expérience utilisateur mobile

Adoptez ces stratégies pour rester compétitif !`,
  },
  {
    title: "Comment lancer un produit innovant sur le marché francophone ?",
    content: `Lancer un produit innovant nécessite :
1. Une étude de marché approfondie
2. Un MVP rapide
3. Des feedbacks utilisateurs
4. Une stratégie d'acquisition multicanale
5. Un accompagnement post-lancement

Découvrez les étapes clés pour réussir !`,
  },
  {
    title: "Les erreurs à éviter en Product Management",
    content: `Dans le Product Management, évitez :
- Négliger la voix du client
- Sous-estimer l'importance des tests
- Manquer de vision long terme
- Oublier l'analyse des données

Apprenez à les anticiper pour maximiser vos chances de succès.`,
  },
  {
    title: "Growth Hacking : 3 exemples concrets pour les PME",
    content: `Le growth hacking n'est pas réservé aux startups !
- Utilisez le referral marketing
- Automatisez vos campagnes email
- Analysez vos funnels de conversion

Des actions simples pour des résultats rapides.`,
  },
];

export async function seedBlogArticles() {
  for (const article of articles) {
    await supabase.from('blog_articles').insert([{ ...article }]);
  }
  // Optionnel : afficher un message dans la console
  // eslint-disable-next-line no-console
  console.log('Articles fictifs insérés dans la base de données.');
}

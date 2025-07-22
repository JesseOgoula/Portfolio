import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export type BlogArticle = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

const BlogSection = () => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="font-poppins font-bold text-3xl lg:text-5xl text-navy-800 mb-10 text-center">Blog</h2>
        {loading ? (
          <div className="text-center text-gray-500">Chargement des articles...</div>
        ) : articles.length === 0 ? (
          <div className="text-center text-gray-500">Aucun article pour le moment.</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map(article => (
              <Card key={article.id}>
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="font-bold text-xl mb-2 text-navy-800">{article.title}</h3>
                  <div className="text-gray-700 flex-1 mb-4 whitespace-pre-line">{article.content}</div>
                  <div className="text-xs text-gray-400 mt-auto">{new Date(article.created_at).toLocaleDateString()}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;

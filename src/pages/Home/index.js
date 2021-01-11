import { useState, useEffect } from 'react';

import ArticleCard from 'components/ArticleCard';
import client from 'config/client';

export default function Home() {

  const dateNow = Date.now();

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchHome = async () => {
      const res = await client.get('articles');
      setArticles(res.data.results);
    }
    fetchHome();
  }, []);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">

      </div>
      <div className="col-span-12 md:col-span-9 p-5">
        <div className="grid grid-flow-cols grid-cols-1 md:grid-cols-3 gap-20">
          {articles.map(article => (
            <ArticleCard key={article['id']} dateNow={dateNow} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
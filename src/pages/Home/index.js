import { useState, useEffect } from 'react';

import Spinner from 'components/Spinner';
import ArticleCard from 'components/ArticleCard';
import ArticleTab from 'components/ArticleTab';
import FeaturedArticle from 'components/FeaturedArticle';
import client from 'config/client';

export default function Home() {

  const dateNow = Date.now();

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHome = async () => {
      // TODO: differentiate latest and home articles
      const res = await client.get('articles');
      setArticles(res.data.results);
      setIsLoading(false);
    }
    fetchHome();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-5 h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-12 md:gap-10">

      {/* Desktop view */}
      {/* Featured article */}
      {
        articles.length > 0
          ? (
            <div className="col-span-12 invisible h-0 absolute md:visible md:h-full md:relative">
              <FeaturedArticle key={articles[0]['id']} dateNow={dateNow} article={articles[0]} />
            </div>
          )
          : <></>
      }
      {/* Latest side panel */}
      <div className="col-start-1 col-span-12 md:col-start-1 md:col-span-3 invisible h-0 absolute md:visible md:h-full md:relative">
        <h1 className="text-2xl font-semibold border-t-2 border-b-2 py-3">Latest</h1>
        {articles.slice(0, 3).map(article => (
          <ArticleTab key={article['id']} dateNow={dateNow} article={article} />
        ))}
      </div>
      {/* Articles */}
      <div className="col-span-9 pt-5 border-t-2 invisible h-0 absolute md:visible md:h-full md:relative">
        <div className="grid grid-flow-cols grid-cols-3 gap-20">
          {articles.slice(0, 7).map(article => (
            <ArticleCard key={article['id']} dateNow={dateNow} article={article} />
          ))}
        </div>
      </div>

      {/* Mobile view */}
      {/* Articles */}
      <div className="col-span-12 visible h-full relative md:invisible md:h-0 md:absolute">
        <div className="grid grid-cols-1 gap-20">
          {articles.map(article => (
            <ArticleCard key={article['id']} dateNow={dateNow} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
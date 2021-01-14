import { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import client from 'config/client';
import { useCategories } from 'context/category';
import Spinner from 'components/Spinner';
import ArticleCard from 'components/ArticleCard';
import ArticleTab from 'components/ArticleTab';
import FeaturedArticle from 'components/FeaturedArticle';

/**
 * Home page
 */
export default function Home() {

  const dateNow = Date.now();

  const { id } = useParams();
  const { categoryMap } = useCategories();

  const [articles, setArticles] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchHome = async () => {
      try {
        // TODO: differentiate latest and home articles
        const res = id === undefined
          ? await client.get('articles')
          : await client.get(`articles?category_id=${id}`);
        setArticles(res.data.results);
        setIsLoading(false);
      } catch (err) {
        switch (err.response.status) {
          case 404:
            setIsNotFound(true);
            break;
          default:
            // no-op
            break;
        }
      }
    }
    fetchHome();
  }, []);


  if (isNotFound) {
    return <Redirect to="/" />
  }

  if (isLoading) {
    return (
      <div className="flex justify-center mt-5 h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-12 xl:gap-10">

      {
        id === undefined
          ? <></>
          : (
            <div className="col-span-12 pb-5">
              <h1 className="text-5xl xl:text-7xl font-extrabold">
                {categoryMap[id]}
              </h1>
              <div className="w-32 mt-5 border-b-2"></div>
            </div>
          )
      }

      {/* Desktop view */}
      {/* Featured article */}
      {
        articles.length > 0
          ? (
            <div className="col-span-12 hidden xl:block">
              <FeaturedArticle key={articles[0]['id']} dateNow={dateNow} article={articles[0]} />
            </div>
          )
          : <></>
      }
      {/* Latest side panel */}
      <div className="col-start-1 col-span-12 xl:col-start-1 xl:col-span-3 hidden xl:block">
        <h1 className="text-2xl font-semibold border-t-2 border-b-2 py-3">Latest</h1>
        {articles.slice(0, 3).map(article => (
          <ArticleTab key={article['id']} dateNow={dateNow} article={article} />
        ))}
      </div>
      {/* Articles */}
      <div className="col-span-9 pt-5 border-t-2 hidden xl:block">
        <div className="grid grid-flow-cols grid-cols-3 gap-20">
          {articles.slice(1, 7).map(article => (
            <ArticleCard key={article['id']} dateNow={dateNow} article={article} />
          ))}
        </div>
      </div>

      {/* Mobile view */}
      {/* Articles */}
      <div className="col-span-12 xl:hidden">
        <div className="grid grid-cols-1 gap-20">
          {articles.map(article => (
            <ArticleCard key={article['id']} dateNow={dateNow} article={article} />
          ))}
        </div>
      </div>
    </div >
  );
}
import { useState, useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import Spinner from 'components/Spinner';
import ArticleTab from 'components/ArticleTab';
import ArticleCard from 'components/ArticleCard';
import client from 'config/client';
import { getReadableTime } from 'utils';

export default function Article() {

  const dateNow = Date.now();

  const { id } = useParams();

  const [article, setArticle] = useState({});
  const [latestArticles, setLatestArticles] = useState([]);
  const [readMoreArticles, setReadMoreArticles] = useState([]);
  const [contents, setContents] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getArticle = async () => {
      try {
        const [articleRes, latestRes] = await Promise.all([
          client.get(`articles/${id}`),
          client.get(`articles`),
        ]);
        const [contentsRes, readMoreRes] = await Promise.all([
          client.get(articleRes.data['contents_file']),
          client.get(`articles?category_id=${articleRes.data['category']['id']}`),
        ]);
        setArticle(articleRes.data);
        setLatestArticles(latestRes.data['results']);
        setReadMoreArticles(
          readMoreRes.data['results']
            .filter(article => article['id'] != articleRes.data['id'])
        );
        setContents(contentsRes.data);
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
    getArticle();
  }, []);

  // Redirect to home if not found
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
    <div className="grid grid-cols-12 mt-5 md:gap-10">
      {/* Latest side bar */}
      <div className="col-start-1 col-span-12 md:col-start-1 md:col-span-3 invisible h-0 md:visible md:h-full">
        <h1 className="text-2xl font-semibold border-t-2 border-b-2 py-3">Latest</h1>
        {latestArticles.slice(0, 3).map(article => (
          <ArticleTab key={article['id']} dateNow={dateNow} article={article} />
        ))}
      </div>

      {/* Article */}
      <div className="col-start-1 col-span-12 md:col-start-4 md:col-span-6">
        <img className="w-full h-96 object-cover" src={article['header_image']} />
        <h1 className="text-2xl md:text-4xl font-bold mt-5">{article['category']['label']}</h1>
        <h1 className="text-4xl md:text-6xl font-extrabold mt-5">{article['title']}</h1>
        <h1 className="text-xl md:text-3xl mt-5">
          <span>By: </span>
          <Link to={`/authors/${article['author']['id']}`}>{article['author']['first_name']} {article['author']['last_name']}</Link>
        </h1>
        <h1 className="text-xl md:text-3xl mt-5">{getReadableTime(article['date_created'])}</h1>
        <div className="border-b-2 my-10"></div>
        <div className="prose md:prose-xl p-5">
          <ReactMarkdown>{contents}</ReactMarkdown>
        </div>
      </div>

      {/* Read more */}
      <div className="col-start-1 col-span-12 md:col-start-3 md:col-span-8">
        <h1 className="text-2xl font-semibold border-t-2 border-b-2 py-3">Read More</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {readMoreArticles.slice(0, 3).map(article => (
            <ArticleCard key={article['id']} dateNow={dateNow} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
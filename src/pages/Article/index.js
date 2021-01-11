import { useState, useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import client from 'config/client';


export default function Article() {

  const { id } = useParams();

  const [article, setArticle] = useState({});
  const [contents, setContents] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const res = await client.get(`articles/${id}/`);
        const contentsRes = await client.get(res.data['contents_file']);
        setArticle(res.data);
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
    return <p>loading</p>
  }

  return (
    <div className="px-5">
      <div className="grid grid-cols-12 mt-5">
        <div className="col-start-1 col-span-12 md:col-start-4 md:col-span-6">
          <img className="w-full h-96 object-cover" src={article['header_image']} />
          <h1 className="text-4xl font-bold mt-5">{article['category']['label']}</h1>
          <h1 className="text-6xl font-extrabold mt-5">{article['title']}</h1>
          <h1 className="text-3xl mt-5">
            <span>By: </span>
            <Link to={`authors/${article['author']['id']}`}>{article['author']['first_name']} {article['author']['last_name']}</Link>
          </h1>
          <h1 className="text-3xl mt-5">{new Date(article['date_created']).toUTCString()}</h1>
          <hr className="my-10" />
          <div className="prose prose-xl p-5">
            <ReactMarkdown>{contents}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
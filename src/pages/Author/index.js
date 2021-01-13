import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import ArticlePagination from 'components/ArticlePagination';
import Spinner from 'components/Spinner';
import client from 'config/client';

/**
 * Author page
 */
export default function Author() {

  const articlesPerPage = 10;

  const { id } = useParams();
  const pathName = `/authors/${id}`;

  const { search } = useLocation();
  const page = parseInt(new URLSearchParams(search).get('page')) || 1;

  const [author, setAuthor] = useState({});
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getInfo = async () => {
      const [articleRes, authorRes] = await Promise.all([
        client.get(`articles?offset=${(page - 1) * articlesPerPage}&limit=${articlesPerPage}&author_id=${id}`),
        client.get(`authors/${id}`),
      ]);
      setArticles(articleRes.data.results);
      setTotalCount(parseInt(articleRes.data.count));
      setPrev(articleRes.data.previous);
      setNext(articleRes.data.next);
      setAuthor(authorRes.data);
      setIsLoading(false);
    }
    getInfo();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-5 h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-6xl font-bold">{author['first_name']} {author['last_name']}</h1>
      <div className="mt-5">
        <ArticlePagination
          totalCount={totalCount}
          articlesPerPage={articlesPerPage}
          articles={articles}
          pathName={pathName}
          search={search}
          page={page}
          next={next}
          prev={prev}
        />
      </div>
    </div>
  );
}
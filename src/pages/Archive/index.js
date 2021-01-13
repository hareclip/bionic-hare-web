import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import ArticlePagination from 'components/ArticlePagination';
import Spinner from 'components/Spinner';
import client from 'config/client';

export default function Archive() {

  const articlesPerPage = 10;
  const pathName = '/archive';

  const { search } = useLocation();
  const page = parseInt(new URLSearchParams(search).get('page')) || 1;

  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getArticles = async () => {
      const res = await client.get(`articles?offset=${(page - 1) * articlesPerPage}&limit=${articlesPerPage}`);
      setArticles(res.data.results);
      setTotalCount(parseInt(res.data.count));
      setPrev(res.data.previous);
      setNext(res.data.next);
      setIsLoading(false);
    }
    getArticles();
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
      <div className="col-span-12 pb-5">
        <h1 className="text-5xl md:text-7xl font-extrabold">Archive</h1>
        <div className="w-32 mt-5 border-b-2"></div>
      </div>

      <ArticlePagination
        totalCount={totalCount}
        articlesPerPage={articlesPerPage}
        articles={articles}
        pathName={pathName}
        page={page}
        next={next}
        prev={prev}
      />
    </div>
  );
}
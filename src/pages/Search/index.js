import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import SearchInput from 'components/SearchInput';
import ArticlePagination from 'components/ArticlePagination';
import Spinner from 'components/Spinner';
import client from 'config/client';

/**
 * Search page
 */
export default function Search() {

  const articlesPerPage = 10;
  const pathName = '/search';

  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const page = parseInt(searchParams.get('page')) || 1;
  const searchTerm = searchParams.get('searchTerm');

  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getArticles = async () => {
      const res = await client.get(`articles?offset=${(page - 1) * articlesPerPage}&limit=${articlesPerPage}&search_term=${searchTerm}`);
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
    <div className="lg:px-40">
      <SearchInput />
      <div className="mt-5">
        {
          totalCount === 0
            ? <p className="text-2xl">No results found for "{searchTerm}":</p>
            : (
              <>
                <p className="text-2xl">Found {totalCount} articles for "{searchTerm}":</p>
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
              </>
            )
        }
      </div>
    </div>
  );
}
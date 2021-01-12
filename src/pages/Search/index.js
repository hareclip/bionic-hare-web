import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import SearchInput from 'components/SearchInput';
import ArticlePagination from 'components/ArticlePagination';
import Spinner from 'components/Spinner';
import client from 'config/client';

export default function Search() {

  const articlesPerPage = 10;
  const pathName = 'search';

  const { search } = useLocation();
  const { page } = useParams();

  const searchTerm = new URLSearchParams(search).get('searchTerm');
  const currPage = parseInt(page) || 1;

  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      const res = await client.get(`articles?offset=${(currPage - 1) * articlesPerPage}&limit=${articlesPerPage}&search_term=${searchTerm}`);
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
                  page={currPage}
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
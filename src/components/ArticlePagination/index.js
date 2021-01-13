import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import ArticleTab from 'components/ArticleTab';

/**
 * List of articles with pagination through query
 * 
 * @param {*} param0 
 */
export default function ArticlePagination({
  totalCount, articlesPerPage = 10, displayPages = 3, articles, pathName, search = '', page, next, prev,
}) {

  const totalPages = Math.ceil(totalCount / articlesPerPage);
  displayPages = Math.min(displayPages, totalPages);

  // Generate urls for controller
  const paramsFirst = new URLSearchParams(search)
  paramsFirst.set('page', 1);
  const paramsPrev = new URLSearchParams(search)
  paramsPrev.set('page', page - 1);
  const paramsNext = new URLSearchParams(search)
  paramsNext.set('page', page + 1);
  const paramsLast = new URLSearchParams(search)
  paramsLast.set('page', totalPages);

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Articles */}
      <div>
        {articles.map(article => <ArticleTab key={article['id']} article={article} dateNow={Date.now()} />)}
      </div>

      {/* Pagination controller */}
      <div className="flex justify-center items-center mt-5">
        <div className="mr-3">
          {prev
            ? <Link to={`${pathName}/?${paramsFirst.toString()}`}><FontAwesomeIcon size="2x" icon={faAngleDoubleLeft} /></Link>
            : <p><FontAwesomeIcon size="2x" color="lightGray" icon={faAngleDoubleLeft} /></p>}
        </div>
        <div className="mr-3">
          {prev
            ? <Link to={`${pathName}/?${paramsPrev.toString()}`}><FontAwesomeIcon size="2x" icon={faAngleLeft} /></Link>
            : <p><FontAwesomeIcon size="2x" color="lightGray" icon={faAngleLeft} /></p>}
        </div>
        {Array(displayPages)
          .fill(0)
          .map((_, i) => {
            const currPage = i + Math.min(page, totalPages - displayPages + 1);

            const params = new URLSearchParams(search)
            params.set('page', currPage);

            return (
              <div key={i} className="mr-3">
                {
                  page === currPage
                    ? (
                      <Link
                        className="bg-red-300 h-8 w-8 rounded-full flex items-center justify-center"
                        to={`${pathName}/?${params.toString()}`}
                      >{currPage}</Link>
                    )
                    : (
                      <Link
                        className="bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center"
                        to={`${pathName}/?${params.toString()}`}
                      >{currPage}</Link>
                    )
                }
              </div>
            );
          }
          )}
        <div className="mr-3">
          {next
            ? <Link to={`${pathName}/?${paramsNext.toString()}`}><FontAwesomeIcon size="2x" icon={faAngleRight} /></Link>
            : <p><FontAwesomeIcon size="2x" color="lightGray" icon={faAngleRight} /></p>}
        </div>
        <div className="mr-3">
          {next
            ? <Link to={`${pathName}/?${paramsLast.toString()}`}><FontAwesomeIcon size="2x" icon={faAngleDoubleRight} /></Link>
            : <p><FontAwesomeIcon size="2x" color="lightGray" icon={faAngleDoubleRight} /></p>}
        </div>
      </div>
    </div>
  );
}
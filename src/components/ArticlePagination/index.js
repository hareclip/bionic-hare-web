import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import ArticleTab from 'components/ArticleTab';

export default function ArticlePagination({
  totalCount, articlesPerPage = 10, displayPages = 3, articles, pathName, search = '', page, next, prev,
}) {

  const totalPages = Math.ceil(totalCount / articlesPerPage);
  displayPages = Math.min(displayPages, totalPages);

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
            ? <Link to={`/${pathName}/1/${search}`}><FontAwesomeIcon size="2x" icon={faAngleDoubleLeft} /></Link>
            : <p><FontAwesomeIcon size="2x" color="lightGray" icon={faAngleDoubleLeft} /></p>}
        </div>
        <div className="mr-3">
          {prev
            ? <Link to={`/${pathName}/${page - 1}/${search}`}><FontAwesomeIcon size="2x" icon={faAngleLeft} /></Link>
            : <p><FontAwesomeIcon size="2x" color="lightGray" icon={faAngleLeft} /></p>}
        </div>
        {Array(displayPages)
          .fill(0)
          .map((_, i) => {
            const currPage = i + Math.min(page, totalPages - displayPages + 1);
            return (
              <div key={i} className="mr-3">
                {
                  page === currPage
                    ? (
                      <Link
                        className="bg-red-300 h-8 w-8 rounded-full flex items-center justify-center"
                        to={`/${pathName}/${currPage}/${search}`}
                      >{currPage}</Link>
                    )
                    : (
                      <Link
                        className="bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center"
                        to={`/${pathName}/${currPage}/${search}`}
                      >{currPage}</Link>
                    )
                }
              </div>
            );
          }
          )}
        <div className="mr-3">
          {next
            ? <Link to={`/${pathName}/${page + 1}/${search}`}><FontAwesomeIcon size="2x" icon={faAngleRight} /></Link>
            : <p><FontAwesomeIcon size="2x" color="lightGray" icon={faAngleRight} /></p>}
        </div>
        <div className="mr-3">
          {next
            ? <Link to={`/${pathName}/${totalPages}/${search}`}><FontAwesomeIcon size="2x" icon={faAngleDoubleRight} /></Link>
            : <p><FontAwesomeIcon size="2x" color="lightGray" icon={faAngleDoubleRight} /></p>}
        </div>
      </div>
    </div>
  );
}
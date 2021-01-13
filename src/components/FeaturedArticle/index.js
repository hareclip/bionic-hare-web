import { Link } from 'react-router-dom';

import { getReadableTimeDifference } from 'utils';

/**
 * Article card for featured article
 * 
 * @param {*} param0 
 */
export default function FeaturedArticle({ dateNow, article }) {
  return (
    <div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4">
          <Link to={`/articles/${article['id']}`}>
            <img className="w-full h-96 object-cover" src={article['header_image']} />
          </Link>
        </div>

        <div className="col-span-8">
          <p className="text-4xl font-bold mt-5">{article['category']['label']}</p>
          <Link className="text-6xl font-extrabold mt-2" to={`/articles/${article['id']}`}>
            {article['title']}
          </Link>
          <p className="text-2xl text-gray-500 mt-5">{getReadableTimeDifference({ now: dateNow, start: new Date(article['date_edited']) })}</p>
        </div>
      </div>
    </div>
  );
}
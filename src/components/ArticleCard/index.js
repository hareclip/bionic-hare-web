import { Link } from 'react-router-dom';

import { getReadableTimeDifference } from 'utils';

export default function ArticleCard({ dateNow, article }) {
  return (
    <div className="flex flex-col h-full">
      <div className="h-full">
        <Link to={`/articles/${article['id']}`}>
          <img className="w-full h-64 object-cover" src={article['header_image']} />
        </Link>

        <p className="text-lg font-semibold mt-5">{article['category']['label']}</p>
        <Link to={`/articles/${article['id']}`} className="text-2xl font-bold mt-2">
          {article['title']}
        </Link>
      </div>

      <div>
        <p className="text-gray-500">{getReadableTimeDifference({ now: dateNow, start: new Date(article['date_edited']) })}</p>
        <div className="mt-5 border-b-2"></div>
      </div>
    </div>
  );
}
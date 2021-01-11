import { Link } from 'react-router-dom';

import { getReadableTimeDifference } from 'utils';

export default function ArticleCard({ dateNow, article }) {
  return (
    <div>
      <div className="flex flex-col h-full">
        <Link to={`articles/${article['id']}`}>
          <img className="w-full h-64 object-cover" src={article['header_image']} />
        </Link>
        <p className="text-xl font-semibold mt-5">{article['category']['label']}</p>
        <Link to={`articles/${article['id']}`}>
          <p className="text-3xl font-bold mt-2">{article['title']}</p>
        </Link>
      </div>
      <p className="text-gray-500">{getReadableTimeDifference({ now: dateNow, start: new Date(article['date_edited']) })}</p>
      <hr className="mt-5" />
    </div>
  );
}
import { Link } from 'react-router-dom';

import { getReadableTimeDifference } from 'utils';

export default function ArticleTab({ dateNow, article }) {
  return (
    <div>
      <p className="text-lg font-semibold mt-5">{article['category']['label']}</p>
      <Link className="text-2xl font-bold mt-2" to={`/articles/${article['id']}`}>
        {article['title']}
      </Link>
      <div>
        <p className="text-gray-500">{getReadableTimeDifference({ now: dateNow, start: new Date(article['date_edited']) })}</p>
        <div className="mt-5 border-b-2"></div>
      </div>
    </div>
  );
}
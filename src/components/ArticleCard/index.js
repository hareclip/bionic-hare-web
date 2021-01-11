import { getReadableTimeDifference } from 'utils';

export default function ArticleCard({ dateNow, article }) {
  return (
    <div>
      <div className="flex flex-col h-full">
        <img className="h-64 object-cover" src={article['header_image']} />
        <p className="text-xl mt-5">{article['category']['label']}</p>
        <p className="text-3xl mt-2">{article['title']}</p>
      </div>
      <p className="text-gray-500">{getReadableTimeDifference({ now: dateNow, start: new Date(article['date_edited']) })}</p>
      <hr className="mt-5" />
    </div>
  );
}
export default function ArticleCard({ article }) {
  return (
    <div>
      <div className="flex flex-col h-full">
        <img className="h-64 object-cover" src={article['header_image']} />
        <p className="text-xl mt-5">Category</p>
        <p className="text-3xl mt-3">{article['title']}</p>
      </div>
      <p className="text-gray-500">{new Date(article['date_edited']).toLocaleString()}</p>
      <hr className="mt-5" />
    </div>
  );
}
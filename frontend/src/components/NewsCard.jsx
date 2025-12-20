import React from "react";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewsCard({ news, api }) {
  const publishedDate = new Date(news.publishedAt);
  const year = publishedDate.getFullYear();
  const month = ("0" + (publishedDate.getMonth() + 1)).slice(-2);

  return (
    <Link to={`/news/news/${year}/${month}/${news.slug}`}>
      <article className="group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300 h-[400px] flex flex-col">
        {/* Image */}
        <div className="h-48 relative overflow-hidden rounded-t-xl">
          <img
            src={`${api}/uploads/${news.image}`}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs">
            {news.category?.name}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-red-600">
              {news.title}
            </h3>
            {news.description && (
              <p className="text-gray-600 text-sm line-clamp-3 mt-1">
                {news.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
            <Clock className="w-4 h-4" />
            <span>{publishedDate.toLocaleString("ne-NP")}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

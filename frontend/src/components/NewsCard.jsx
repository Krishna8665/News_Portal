import React from "react";
import { Link } from "react-router-dom";
import CategoryBadge from "./CategoryBadge";

export default function NewsCard({ news, api }) {
  const year = new Date(news.publishedAt).getFullYear();
  const month = String(new Date(news.publishedAt).getMonth() + 1).padStart(
    2,
    "0"
  );

  return (
    <Link
      to={`/news/news/${year}/${month}/${news.slug}`}
      className="block bg-white rounded-lg shadow hover:shadow-md overflow-hidden transition"
    >
      <img
        src={`${api}/uploads/${news.image}`}
        onError={(e) => (e.target.src = "/placeholder.jpg")}
        className="w-full h-40 object-cover"
      />
      <div className="p-3">
        {news.category && (
          <CategoryBadge
            categoryName={news.category.name}
            categorySlug={news.category.slug}
          />
        )}
        <h3 className="text-sm font-semibold mt-2 line-clamp-2">
          {news.title}
        </h3>
        <p className="text-gray-600 text-xs mt-1 line-clamp-3">
          {news.description}
        </p>
      </div>
    </Link>
  );
}

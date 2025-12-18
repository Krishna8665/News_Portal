import React from "react";
import { FileText, Eye, Edit, Trash2 } from "lucide-react";

const NewsCard = ({ news, onEdit, onDelete, onPublish }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {news.image ? (
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <FileText className="w-16 h-16 text-gray-400" />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span
            className={`bg-${news.isPublished ? "green" : "yellow"}-100 text-${
              news.isPublished ? "green" : "yellow"
            }-800 text-xs px-2 py-1 rounded-full`}
          >
            {news.isPublished ? "Published" : "Draft"}
          </span>
          <span className="text-xs text-gray-500">{news.category}</span>
        </div>
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {news.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          {news.createdAt || news.publishedAt}
        </p>
        <div className="flex space-x-2">
          {!news.isPublished && (
            <button
              onClick={() => onPublish(news._id)}
              className="flex-1 flex items-center justify-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Publish</span>
            </button>
          )}
          <button
            onClick={() => onEdit(news)}
            className="flex items-center justify-center bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(news._id)}
            className="flex items-center justify-center bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

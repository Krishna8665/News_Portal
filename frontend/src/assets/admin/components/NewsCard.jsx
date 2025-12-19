import { FileText, Eye, Edit, Trash2 } from "lucide-react";

const NewsCard = ({ news, onEdit, onDelete, onPublish }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200">
        {news.image ? (
          <img
            src={`http://localhost:3000/uploads/${news.image}`}
            alt={news.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <FileText className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>

      <div className="p-4">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            news.isPublished
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {news.isPublished ? "Published" : "Draft"}
        </span>

        <h3 className="font-semibold mt-2">{news.title}</h3>

        <p className="text-sm text-gray-500">
          {news.category?.name || "Uncategorized"}
        </p>

        <div className="flex gap-2 mt-3">
          {!news.isPublished && (
            <button
              onClick={() => onPublish(news._id)}
              className="flex-1 bg-green-600 text-white py-2 rounded"
            >
              Publish
            </button>
          )}
          <button
            onClick={() => onEdit(news)}
            className="bg-gray-200 p-2 rounded"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(news._id)}
            className="bg-red-100 text-red-600 p-2 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

import React from "react";
import { Edit, Trash2 } from "lucide-react";

const Published = ({ news = [], onEdit, onDelete, onPublish }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">News</h2>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Published At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {news.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-500 md:hidden">
                      {item.category?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                    {item.category?.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                    {item.publishedAt
                      ? new Date(item.publishedAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.isPublished
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {!item.isPublished && onPublish && (
                        <button
                          onClick={() => onPublish(item._id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Publish
                        </button>
                      )}
                      <button
                        onClick={() => onEdit(item)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(item._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {news.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-400"
                  >
                    No news found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Published;

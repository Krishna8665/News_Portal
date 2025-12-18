import React from "react";
import { FolderOpen, Edit, Trash2 } from "lucide-react";

const CategoryCard = ({ category, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <FolderOpen className="w-8 h-8 text-blue-600" />
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(category)}
            className="text-gray-600 hover:text-blue-600"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(category._id)}
            className="text-gray-600 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <h3 className="font-semibold text-gray-800 text-lg">{category.name}</h3>
      <p className="text-sm text-gray-500 mt-1">/{category.slug}</p>
    </div>
  );
};

export default CategoryCard;

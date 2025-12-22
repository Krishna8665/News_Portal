import React from "react";
import { Link } from "react-router-dom";

const categoryColors = {
  प्रविधि: "bg-blue-600 text-white",
  राजनीति: "bg-red-600 text-white",
  खेलकुद: "bg-green-600 text-white",
  शिक्षा: "bg-yellow-500 text-white",
  स्वास्थ्य: "bg-pink-500 text-white",
  पर्यटन: "bg-purple-600 text-white",
  Default: "bg-gray-200 text-gray-800",
};

export default function CategoryBadge({ categoryName, categorySlug }) {
  const colorClass = categoryColors[categoryName] || categoryColors.Default;

  return (
    <Link
      to={`/category/${categorySlug}`}
      className={`${colorClass} text-xs font-semibold px-2 py-1 rounded inline-block transition-transform transform hover:scale-105`}
    >
      {categoryName}
    </Link>
  );
}

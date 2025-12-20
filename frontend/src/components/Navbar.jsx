import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Navbar({ api }) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("सबै");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${api}/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, [api]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "सबै") navigate("/");
    else navigate(`/category/${category}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          {/* Small logo image */}
          <img
            src="https://merosathitv.com/wp-content/uploads/2025/11/1010-1.png"
            alt="Merosathi Logo"
            className="w-8 h-8 mr-2" // adjust size as needed
          />
          <span className="text-xl font-bold text-red-600">
            Merosathi समाचार
          </span>
        </div>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="खोज्नुहोस..."
            className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <nav className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex gap-4 overflow-x-auto py-2">
          {["सबै", ...categories.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              className={`whitespace-nowrap py-2 px-4 rounded-full font-medium ${
                activeCategory === cat
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}

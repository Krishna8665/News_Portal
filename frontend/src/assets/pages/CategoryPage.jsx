import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import NewsCard from "../../components/NewsCard";
import CategoryBadge from "../../components/CategoryBadge";
import { Flame, Layers } from "lucide-react";

export default function CategoriesPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const API = "http://localhost:3000";

  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchTrendingNews();
  }, [slug]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/categories`);
      setCategories(res.data || []);
      const selected = res.data.find((c) => c.slug === slug);
      setCategory(selected || null);
      if (selected?._id) fetchNewsByCategory(selected._id);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNewsByCategory = async (categoryId) => {
    try {
      const res = await axios.get(
        `${API}/news/getNewsByCategory?categoryId=${categoryId}&limit=9&page=1`
      );
      setNews(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTrendingNews = async () => {
    try {
      const res = await axios.get(`${API}/news/trending?limit=6&page=1`);
      setTrendingNews(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar api={API} />

      <main className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-4 gap-8">
        {/* ================= MAIN ================= */}
        <section className="lg:col-span-3 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
            {category && (
              <CategoryBadge name={category.name} slug={category.slug} />
            )}
            <h1 className="text-2xl font-bold">{category?.name || "समाचार"}</h1>
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {news.length > 0 ? (
              news.map((n) => <NewsCard key={n._id} news={n} api={API} />)
            ) : (
              <p className="text-gray-500">यो श्रेणीमा समाचार छैन।</p>
            )}
          </div>
        </section>

        {/* ================= SIDEBAR ================= */}
        <aside className="space-y-8">
          {/* Trending */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center gap-2 font-bold text-lg mb-4">
              <Flame className="w-5 h-5 text-red-600" />
              ट्रेन्डिङ
            </div>

            <div className="flex flex-col gap-6">
              {trendingNews.map((n) => (
                <NewsCard key={n._id} news={n} api={API} />
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center gap-2 font-bold text-lg mb-4">
              <Layers className="w-5 h-5 text-blue-600" />
              अन्य श्रेणीहरू
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c._id}
                  onClick={() => navigate(`/category/${c.slug}`)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition
                    ${
                      c.slug === slug
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

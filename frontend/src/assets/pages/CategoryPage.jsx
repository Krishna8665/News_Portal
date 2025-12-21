import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NewsCard from "../../components/NewsCard";
import Navbar from "../../components/Navbar";

export default function CategoriesPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const API = "http://localhost:3000";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API}/categories`);
        setCategories(res.data || []);
        const cat = res.data.find((c) => c.slug === slug);
        setCategory(cat || null);
        if (cat?._id) fetchNewsByCategory(cat._id);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchNewsByCategory = async (categoryId) => {
      try {
        const res = await axios.get(
          `${API}/news/getNewsByCategory?limit=6&page=1&categoryId=${categoryId}`
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

    fetchCategories();
    fetchTrendingNews();
  }, [slug]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar api={API} />

      <main className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Main news */}
        <section className="flex-1">
          <h1 className="text-2xl font-bold mb-4">
            {category?.name || "समाचार"}
          </h1>
          <div className="grid md:grid-cols-3 gap-6">
            {news.length > 0 ? (
              news.map((n) => <NewsCard key={n._id} news={n} api={API} />)
            ) : (
              <p>कोई समाचार छैन।</p>
            )}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="w-80">
          <div className="mb-8">
            <h2 className="font-bold text-lg mb-4">ट्रेन्डिङ</h2>
            <div className="flex flex-col gap-4">
              {trendingNews.map((n) => (
                <NewsCard key={n._id} news={n} api={API} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-4">अन्य श्रेणीहरू</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c._id}
                  className="px-3 py-1 rounded-full border bg-gray-100 hover:bg-gray-200"
                  onClick={() => navigate(`/category/${c.slug}`)}
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

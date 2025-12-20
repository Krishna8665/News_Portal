import React, { useState, useEffect } from "react";
import axios from "axios";
import { Flame, TrendingUp } from "lucide-react";
import NewsCard from "../../components/NewsCard";
import Navbar from "../../components/Navbar";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("सबै");

  const [trendingNews, setTrendingNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);

  const [latestPage, setLatestPage] = useState(1);
  const [latestTotalPages, setLatestTotalPages] = useState(1);

  const limit = 6;
  const API = "http://localhost:3000";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API}/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchLatestNews = async (page = 1, categoryId = null) => {
      try {
        let url = `${API}/news?limit=${limit}&page=${page}`;
        if (categoryId)
          url = `${API}/news/getNewsByCategory?limit=${limit}&page=${page}&categoryId=${categoryId}`;
        const res = await axios.get(url);
        setLatestNews(res.data.data);
        setLatestPage(res.data.pagination.page);
        setLatestTotalPages(res.data.pagination.totalPages);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTrendingNews = async (page = 1) => {
      try {
        const res = await axios.get(
          `${API}/news/trending?limit=6&page=${page}`
        );
        setTrendingNews(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
    fetchLatestNews();
    fetchTrendingNews();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    const catObj = categories.find((c) => c.name === category);
    axios
      .get(
        `${API}/news/getNewsByCategory?limit=${limit}&page=1&categoryId=${
          catObj?._id || ""
        }`
      )
      .then((res) => setLatestNews(res.data.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar api={API} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Trending News */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">ट्रेन्डिङ</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {trendingNews.map((news) => (
              <NewsCard key={news._id} news={news} api={API} />
            ))}
          </div>
        </section>

        {/* Latest News */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">नयाँ समाचार</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latestNews.map((news) => (
              <NewsCard key={news._id} news={news} api={API} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

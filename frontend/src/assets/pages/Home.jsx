import React, { useEffect, useState } from "react";
import axios from "axios";
import { Flame, TrendingUp } from "lucide-react";
import NewsCard from "../../components/NewsCard";
import Navbar from "../../components/Navbar";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const API = "http://localhost:3000";

  const limit = 6;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API}/categories`);
        setCategories(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchLatestNews = async () => {
      try {
        const res = await axios.get(`${API}/news?limit=${limit}&page=1`);
        setLatestNews(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTrendingNews = async () => {
      try {
        const res = await axios.get(
          `${API}/news/trending?limit=${limit}&page=1`
        );
        setTrendingNews(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
    fetchLatestNews();
    fetchTrendingNews();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar api={API} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Trending */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">ट्रेन्डिङ</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {trendingNews.map((n) => (
              <NewsCard key={n._id} news={n} api={API} />
            ))}
          </div>
        </section>

        {/* Latest News */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">नयाँ समाचार</h2>
          </div>

          {categories.map((c) => (
            <div key={c._id} className="mb-8">
              <h3 className="text-xl font-semibold mb-4">{c.name}</h3>
              <NewsByCategory categoryId={c._id} api={API} />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

function NewsByCategory({ categoryId, api }) {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `${api}/news/getNewsByCategory?limit=6&page=1&categoryId=${categoryId}`
        );
        setNews(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNews();
  }, [categoryId, api]);

  if (!news.length) return <p className="text-gray-500">कोई समाचार छैन।</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {news.map((n) => (
        <NewsCard key={n._id} news={n} api={api} />
      ))}
    </div>
  );
}

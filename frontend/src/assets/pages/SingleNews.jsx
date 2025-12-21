import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Clock, Flame, Layers } from "lucide-react";
import Navbar from "../../components/Navbar";
import NewsCard from "../../components/NewsCard";

export default function SingleNews() {
  const { year, month, slug } = useParams();
  const API = "http://localhost:3000";

  const [news, setNews] = useState(null);
  const [trendingNews, setTrendingNews] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const [differentCategoryNews, setDifferentCategoryNews] = useState([]);

  useEffect(() => {
    fetchSingleNews();
    fetchTrendingNews();
  }, [slug]);

  const fetchSingleNews = async () => {
    try {
      const res = await axios.get(`${API}/news/news/${year}/${month}/${slug}`);
      setNews(res.data);

      if (res.data?.category?._id) {
        fetchRelatedNews(res.data.category._id);
        fetchDifferentCategoryNews(res.data.category._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTrendingNews = async () => {
    try {
      const res = await axios.get(`${API}/news/trending?limit=5`);
      setTrendingNews(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // SAME CATEGORY (related)
  const fetchRelatedNews = async (categoryId) => {
    try {
      const res = await axios.get(
        `${API}/news/getNewsByCategory?categoryId=${categoryId}&limit=4`
      );
      setRelatedNews(res.data.data.filter((n) => n.slug !== slug));
    } catch (err) {
      console.error(err);
    }
  };

  // DIFFERENT CATEGORY (random)
  const fetchDifferentCategoryNews = async (currentCategoryId) => {
    try {
      const res = await axios.get(`${API}/news?limit=6`);
      const filtered = res.data.data.filter(
        (n) => n.category?._id !== currentCategoryId
      );
      setDifferentCategoryNews(filtered.slice(0, 4));
    } catch (err) {
      console.error(err);
    }
  };

  if (!news) return <p className="text-center mt-10">Loading...</p>;

  const publishedDate = new Date(news.publishedAt);

  return (
    <div className="min-h-screen bg-white">
      {/* SAME NAVBAR AS HOME */}
      <Navbar api={API} />

      <main className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-4 gap-8">
        {/* MAIN CONTENT */}
        <article className="md:col-span-3 space-y-6">
          <h1 className="text-3xl font-bold">{news.title}</h1>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            {publishedDate.toLocaleString("ne-NP")}
          </div>

          {news.image && (
            <img
              src={`${API}/uploads/${news.image}`}
              alt={news.title}
              className="w-full h-60 object-cover rounded-lg"
            />
          )}

          <p className="text-gray-700 leading-7">{news.description}</p>

          {/* RELATED NEWS */}
          {relatedNews.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mt-10 mb-4">सम्बन्धित समाचार</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedNews.map((n) => (
                  <NewsCard key={n._id} news={n} api={API} />
                ))}
              </div>
            </section>
          )}

          {/* DIFFERENT CATEGORY NEWS */}
          {differentCategoryNews.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 text-xl font-bold mt-10 mb-4">
                <Layers className="w-5 h-5 text-red-600" />
                अन्य श्रेणीका समाचार
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {differentCategoryNews.map((n) => (
                  <NewsCard key={n._id} news={n} api={API} />
                ))}
              </div>
            </section>
          )}
        </article>

        {/* SIDEBAR */}
        <aside className="md:col-span-1">
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <Flame className="w-5 h-5 text-red-600" />
            ट्रेन्डिङ
          </h2>
          <div className="space-y-4">
            {trendingNews.map((t) => (
              <NewsCard key={t._id} news={t} api={API} />
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}

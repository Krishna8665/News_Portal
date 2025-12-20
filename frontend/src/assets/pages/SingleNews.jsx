import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Clock, Flame } from "lucide-react";
import Navbar from "../../components/Navbar";
import NewsCard from "../../components/NewsCard";

export default function SingleNews() {
  const { year, month, slug } = useParams();
  const API = "http://localhost:3000";

  const [news, setNews] = useState(null);
  const [trendingNews, setTrendingNews] = useState([]);
  const [randomCategoryNews, setRandomCategoryNews] = useState([]);

  useEffect(() => {
    // Fetch single news
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `${API}/news/news/${year}/${month}/${slug}`
        );
        setNews(res.data);
        // Fetch random category news
        fetchRandomCategoryNews(res.data.category?._id);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch trending news
    const fetchTrendingNews = async () => {
      try {
        const res = await axios.get(`${API}/news/trending?limit=5`);
        setTrendingNews(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch random category news
    const fetchRandomCategoryNews = async (categoryId) => {
      try {
        if (!categoryId) return;
        const res = await axios.get(
          `${API}/news/getNewsByCategory?limit=5&page=1&categoryId=${categoryId}`
        );
        setRandomCategoryNews(res.data.data.filter((n) => n.slug !== slug));
      } catch (err) {
        console.error(err);
      }
    };

    fetchNews();
    fetchTrendingNews();
  }, [year, month, slug]);

  if (!news) return <p className="text-center mt-8">Loading...</p>;

  const publishedDate = new Date(news.publishedAt);

  return (
    <div className="min-h-screen bg-white">
      <Navbar api={API} />

      <main className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-4 gap-8">
        {/* Main Article */}
        <article className="md:col-span-3 flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-gray-900">{news.title}</h1>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock className="w-4 h-4" />
            <span>{publishedDate.toLocaleString("ne-NP")}</span>
          </div>

          {news.image && (
            <img
              src={`${API}/uploads/${news.image}`}
              alt={news.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}

          <p className="text-gray-700">{news.description}</p>

          {/* Random Category News */}
          {randomCategoryNews.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">
                यो श्रेणीका अन्य समाचार
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {randomCategoryNews.map((n) => (
                  <NewsCard key={n._id} news={n} api={API} />
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Sidebar */}
        <aside className="md:col-span-1 flex flex-col gap-6">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-4">
              <Flame className="w-6 h-6 text-red-600" /> ट्रेन्डिङ
            </h2>
            <div className="flex flex-col gap-4">
              {trendingNews.map((t) => (
                <NewsCard key={t._id} news={t} api={API} />
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CategoryBadge from "../../components/CategoryBadge";

export default function Home() {
  const API = "http://localhost:3000";

  const [categories, setCategories] = useState([]);
  const [trending, setTrending] = useState([]);
  const [mainNews, setMainNews] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchTrending();
    fetchMainNews();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get(`${API}/categories`);
    setCategories(res.data || []);
  };

  const fetchTrending = async () => {
    const res = await axios.get(`${API}/news/trending?limit=5&page=1`);
    setTrending(res.data.data || []);
  };

  const fetchMainNews = async () => {
    const res = await axios.get(`${API}/news?limit=1&page=1`);
    setMainNews(res.data.data?.[0]);
  };

  const buildNewsUrl = (news) => {
    const date = new Date(news.publishedAt || news.createdAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `/news/news/${year}/${month}/${news.slug}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar api={API} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* ================= MAIN + TRENDING ================= */}
        <section className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* MAIN NEWS */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="border-l-4 border-red-600 pl-3">
                <h2 className="text-2xl font-bold">मुख्य खबर</h2>
              </div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {mainNews && (
              <Link to={buildNewsUrl(mainNews)}>
                <div className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition">
                  <img
                    src={`${API}/uploads/${mainNews.image}`}
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-5">
                    <CategoryBadge
                      categoryName={mainNews.category?.name}
                      categorySlug={mainNews.category?.slug}
                    />
                    <h3 className="text-2xl font-bold mt-2 mb-2 line-clamp-2">
                      {mainNews.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-4">
                      {mainNews.description}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* TRENDING */}
          <aside>
            <div className="flex items-center gap-3 mb-4">
              <div className="border-l-4 border-red-600 pl-3">
                <h2 className="text-xl font-bold">ट्रेन्डिङ</h2>
              </div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="space-y-4">
              {trending.map((n) => (
                <Link
                  key={n._id}
                  to={buildNewsUrl(n)}
                  className="block bg-white rounded-lg shadow hover:shadow-md transition"
                >
                  <div className="flex gap-3 p-3 h-[110px]">
                    <img
                      src={`${API}/uploads/${n.image}`}
                      onError={(e) => (e.target.src = "/placeholder.jpg")}
                      className="w-28 h-full object-cover rounded"
                    />
                    <div className="flex-1">
                      <CategoryBadge
                        categoryName={n.category?.name}
                        categorySlug={n.category?.slug}
                      />
                      <h4 className="text-sm font-semibold mt-1 line-clamp-2">
                        {n.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        {/* ================= CATEGORY BLOCKS ================= */}
        {categories.map((cat) => (
          <CategoryBlock key={cat._id} category={cat} api={API} />
        ))}
      </main>

      <Footer />
    </div>
  );
}

/* ================= CATEGORY SECTION ================= */
function CategoryBlock({ category, api }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${api}/news/getNewsByCategory?limit=4&page=1&categoryId=${category._id}`
      )
      .then((res) => setNews(res.data.data || []));
  }, [category._id, api]);

  if (!news.length) return null;

  const buildNewsUrl = (n) => {
    const date = new Date(n.publishedAt || n.createdAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `/news/news/${year}/${month}/${n.slug}`;
  };

  const main = news[0];
  const side = news.slice(1);

  return (
    <section className="mb-20">
      {/* CATEGORY HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div className="border-l-4 border-blue-600 pl-3">
          <h2 className="text-xl font-bold">{category.name}</h2>
        </div>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* BIG NEWS */}
        <Link
          to={buildNewsUrl(main)}
          className="lg:col-span-2 bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition"
        >
          <img
            src={`${api}/uploads/${main.image}`}
            onError={(e) => (e.target.src = "/placeholder.jpg")}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <CategoryBadge
              categoryName={category.name}
              categorySlug={category.slug}
            />
            <h3 className="text-xl font-bold mt-2 line-clamp-2">
              {main.title}
            </h3>
            <p className="text-gray-600 mt-2 line-clamp-3">
              {main.description}
            </p>
          </div>
        </Link>

        {/* SIDE NEWS */}
        <div className="space-y-4">
          {side.map((n) => (
            <Link
              key={n._id}
              to={buildNewsUrl(n)}
              className="flex gap-3 bg-white p-3 rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={`${api}/uploads/${n.image}`}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
                className="w-24 h-20 object-cover rounded"
              />
              <div>
                <CategoryBadge
                  categoryName={category.name}
                  categorySlug={category.slug}
                />
                <h4 className="text-sm font-semibold mt-1 line-clamp-2">
                  {n.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

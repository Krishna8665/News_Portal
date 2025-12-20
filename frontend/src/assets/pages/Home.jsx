import { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Menu, X, Flame, Clock } from 'lucide-react';

const API = 'http://localhost:3000';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('सबै');
  const [trending, setTrending] = useState([]);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  /* FETCH DATA */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, trendRes, latestRes] = await Promise.all([
          axios.get(`${API}/categories`),
          axios.get(`${API}/news/trending`),
          axios.get(`${API}/news/published`)
        ]);

        setCategories(['सबै', ...catRes.data.map(c => c.name)]);
        setTrending(trendRes.data);
        setLatest(latestRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredNews =
    activeCategory === 'सबै'
      ? latest
      : latest.filter(n => n.category?.name === activeCategory);

  if (loading) {
    return <div className="text-center mt-20 text-xl">लोड हुँदैछ...</div>;
  }

  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">समाचार</h1>

          <div className="hidden md:flex relative">
            <input className="px-4 py-2 rounded-full bg-gray-100" placeholder="खोज्नुहोस..." />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* CATEGORY NAV */}
      <nav className="border-b bg-white sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto px-4 py-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap pb-2 ${
                activeCategory === cat
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* TRENDING */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="text-red-600" />
            <h2 className="text-2xl font-bold">ट्रेन्डिङ</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {trending.map(news => (
              <article key={news._id} className="rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                <img
                  src={`${API}/uploads/${news.image}`}
                  alt={news.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <span className="text-xs text-red-600">{news.category?.name}</span>
                  <h3 className="font-bold mt-2 line-clamp-2">{news.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <Clock size={14} /> {new Date(news.createdAt).toLocaleDateString('ne-NP')}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* LATEST */}
        <section>
          <h2 className="text-2xl font-bold mb-6">नयाँ समाचार</h2>

          <div className="space-y-4">
            {filteredNews.map(news => (
              <article key={news._id} className="flex gap-4 p-4 border rounded-xl hover:bg-gray-50">
                <img
                  src={`${API}/uploads/${news.image}`}
                  alt={news.title}
                  className="w-32 h-24 object-cover rounded"
                />
                <div>
                  <span className="text-xs text-red-600">{news.category?.name}</span>
                  <h3 className="font-bold line-clamp-2">{news.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{news.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-16">
        © २०२५ समाचार | सर्वाधिकार सुरक्षित
      </footer>
    </div>
  );
}

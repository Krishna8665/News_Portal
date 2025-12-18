import React, { useState, useEffect } from "react";
import axios from "axios";
import Published from "./Published";

const NewsAdminPage = () => {
  const [news, setNews] = useState([]);
  const [view, setView] = useState("published"); // "draft" or "published"
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      setLoading(true);
      let data = [];
      if (view === "published") {
        const res = await axios.get("http://localhost:3000/news");
        data = res.data;
      } else {
        const res = await axios.get("http://localhost:3000/news/drafts", {
          withCredentials: true,
        });
        data = res.data;
      }
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [view]);

  const handleEdit = (item) => {
    console.log("Edit:", item);
    // Redirect to edit page or open modal
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/news/${id}`, {
        withCredentials: true,
      });
      setNews(news.filter((n) => n._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePublish = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/news/${id}/publish`,
        {},
        { withCredentials: true }
      );
      fetchNews(); // refresh list
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            view === "published"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setView("published")}
        >
          Published News
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "draft"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setView("draft")}
        >
          Drafts
        </button>
      </div>

      <Published
        news={news}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPublish={handlePublish}
      />
    </div>
  );
};

export default NewsAdminPage;

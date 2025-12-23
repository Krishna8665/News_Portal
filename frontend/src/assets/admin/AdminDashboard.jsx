import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "../admin/pages/Dashboard";
import Drafts from "../admin/pages/Drafts";
import Published from "../admin/pages/Published";
import Categories from "../admin/pages/Categories";
import Sidebar from "../admin/components/Sidebar";
import Header from "../admin/components/Header";
import Modal from "../admin/components/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [news, setNews] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    description: "",
    category: "",
    image: null,
  });

  // 🔐 Token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // 📥 Initial fetch only ONCE
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [newsRes, draftsRes, catRes] = await Promise.all([
        axios.get("http://localhost:3000/news"),
        axios.get("http://localhost:3000/news/drafts"),
        axios.get("http://localhost:3000/categories"),
      ]);

      setNews(newsRes.data || []);
      setDrafts(draftsRes.data || []);
      setCategories(catRes.data || []);
    } catch {
      toast.error("Failed to load data");
    }
  };

  // 🧩 Modal handlers
  const openModalHandler = (type, data = null) => {
    setModalType(type);
    setShowModal(true);
    setFormData(
      data || {
        _id: "",
        title: "",
        description: "",
        category: "",
        image: null,
      }
    );
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setFormData({
      _id: "",
      title: "",
      description: "",
      category: "",
      image: null,
    });
  };

  // ❌ DELETE (no refresh)
  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`http://localhost:3000/news/${id}`);

      if (type === "draft") {
        setDrafts((prev) => prev.filter((n) => n._id !== id));
      }

      if (type === "news") {
        setNews((prev) => prev.filter((n) => n._id !== id));
      }

      toast.success("Deleted successfully");
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🚀 PUBLISH (NO REFRESH)
  const handlePublish = async (id) => {
    if (!window.confirm("Publish this news?")) return;

    try {
      const res = await axios.patch(`http://localhost:3000/news/${id}/publish`);

      const publishedNews = res.data;

      // 1️⃣ remove from drafts
      setDrafts((prev) => prev.filter((n) => n._id !== id));

      // 2️⃣ add to published
      setNews((prev) => [publishedNews, ...prev]);

      toast.success("News published 🚀");
    } catch {
      toast.error("Publish failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1">
        <Sidebar
          sidebarOpen={sidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-4 lg:p-8">
          {activeTab === "dashboard" && <Dashboard />}

          {activeTab === "drafts" && (
            <Drafts
              drafts={drafts}
              onEdit={(data) => openModalHandler("news", data)}
              onDelete={(id) => handleDelete(id, "draft")}
              onPublish={handlePublish}
            />
          )}

          {activeTab === "published" && (
            <Published
              news={news}
              onEdit={(data) => openModalHandler("news", data)}
              onDelete={(id) => handleDelete(id, "news")}
            />
          )}

          {activeTab === "categories" && (
            <Categories
              categories={categories}
              openModal={() => openModalHandler("category")}
              onDelete={(id) =>
                setCategories((prev) => prev.filter((c) => c._id !== id))
              }
            />
          )}
        </main>
      </div>

      {showModal && (
        <Modal
          modalType={modalType}
          formData={formData}
          setFormData={setFormData}
          closeModal={closeModalHandler}
          onSuccess={fetchInitialData}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminDashboard;

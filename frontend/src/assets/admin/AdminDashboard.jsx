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
  const [modalType, setModalType] = useState(""); // "news" or "category"
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    description: "",
    category: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  // Set default axios token if present
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // Fetch all data from backend
  const fetchData = async () => {
    try {
      setLoading(true);

      const newsRes = await axios.get("http://localhost:3000/news");
      setNews(newsRes.data);

      const draftsRes = await axios.get("http://localhost:3000/news/drafts", {
        withCredentials: true,
      });
      setDrafts(draftsRes.data);

      const catRes = await axios.get("http://localhost:3000/categories");
      setCategories(catRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Open modal
  const openModalHandler = (type, data = null) => {
    setModalType(type);
    setShowModal(true);
    if (data) setFormData(data);
    else
      setFormData({
        _id: "",
        title: "",
        description: "",
        category: "",
        image: null,
      });
  };

  // Close modal
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

  // Delete item (news or category)
  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      if (type === "news" || type === "draft") {
        await axios.delete(`http://localhost:3000/news/${id}`, {
          withCredentials: true,
        });
        toast.success("News deleted successfully!");
        fetchData();
      } else if (type === "category") {
        await axios.delete(`http://localhost:3000/categories/${id}`, {
          withCredentials: true,
        });
        toast.success("Category deleted successfully!");
        fetchData();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete");
    }
  };

  // Publish news
  const handlePublish = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/news/${id}/publish`,
        {},
        { withCredentials: true }
      );
      toast.success("News published successfully!");
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-4 lg:p-8">
          {activeTab === "dashboard" && <Dashboard />}

          {activeTab === "drafts" && (
            <Drafts
              drafts={drafts}
              openModal={(data) => openModalHandler("news", data)}
              onDelete={(id) => handleDelete(id, "draft")}
            />
          )}

          {activeTab === "published" && (
            <Published
              news={news}
              onEdit={(data) => openModalHandler("news", data)}
              onDelete={(id) => handleDelete(id, "news")}
              onPublish={handlePublish}
            />
          )}

          {activeTab === "categories" && (
            <Categories
              categories={categories}
              openModal={() => openModalHandler("category")}
              onDelete={(id) => handleDelete(id, "category")}
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
          onSuccess={fetchData} // Refresh list after create/edit
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminDashboard;

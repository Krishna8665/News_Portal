import React, { useState, useEffect } from "react";
import Dashboard from "../admin/pages/Dashboard";
import Drafts from "../admin/pages/Drafts";
import Published from "../admin/pages/Published";
import Categories from "../admin/pages/Categories";
import Sidebar from "../admin/components/Sidebar";
import Header from "../admin/components/Header";
import Modal from "../admin/components/Modal";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [news, setNews] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });
  const [newCategory, setNewCategory] = useState("");

  // MOCK DATA - Replace with actual API calls
  useEffect(() => {
    setCategories([
      { _id: "1", name: "Technology", slug: "technology" },
      { _id: "2", name: "Sports", slug: "sports" },
      { _id: "3", name: "Politics", slug: "politics" },
    ]);

    setDrafts([
      {
        _id: "1",
        title: "AI Update",
        category: "Technology",
        createdAt: "2025-12-18",
        image: null,
      },
      {
        _id: "2",
        title: "Sports Highlights",
        category: "Sports",
        createdAt: "2025-12-17",
        image: null,
      },
    ]);

    setNews([
      {
        _id: "3",
        title: "Climate Summit",
        category: "Politics",
        publishedAt: "2025-12-15",
        isPublished: true,
      },
      {
        _id: "4",
        title: "Movie Premiere",
        category: "Entertainment",
        publishedAt: "2025-12-14",
        isPublished: true,
      },
    ]);
  }, []);

  const openModalHandler = (type, data = null) => {
    setModalType(type);
    setShowModal(true);
    if (data) setFormData(data);
    else setFormData({ title: "", description: "", category: "", image: null });
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setFormData({ title: "", description: "", category: "", image: null });
    setNewCategory("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setNews(news.filter((n) => n._id !== id));
      setDrafts(drafts.filter((d) => d._id !== id));
      setCategories(categories.filter((c) => c._id !== id));
    }
  };

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
            <Drafts drafts={drafts} openModal={openModalHandler} />
          )}
          {activeTab === "published" && (
            <Published
              news={news}
              onEdit={openModalHandler}
              onDelete={handleDelete}
            />
          )}
          {activeTab === "categories" && (
            <Categories categories={categories} openModal={openModalHandler} />
          )}
        </main>
      </div>

      {showModal && (
        <Modal
          type={modalType}
          formData={formData}
          setFormData={setFormData}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          closeModal={closeModalHandler}
        />
      )}
    </div>
  );
};

export default AdminDashboard;

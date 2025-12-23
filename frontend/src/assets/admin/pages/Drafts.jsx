import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:3000";

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [editingNews, setEditingNews] = useState(null);

  const fetchDrafts = async () => {
    try {
      const res = await axios.get("/news/drafts");
      setDrafts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to load drafts");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    fetchDrafts();
  }, []);

  // ✅ ASK BEFORE PUBLISH
  const handlePublish = async (id) => {
    const confirmPublish = window.confirm(
      "Are you sure you want to publish this news?"
    );

    if (!confirmPublish) return;

    try {
      await axios.patch(`/news/${id}/publish`);
      toast.success("News published successfully 🚀");
      fetchDrafts();
    } catch (err) {
      toast.error("Failed to publish news");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this draft?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/news/${id}`);
      toast.success("Draft deleted");
      fetchDrafts();
    } catch (err) {
      toast.error("Failed to delete draft");
    }
  };

  const handleEdit = (news) => {
    setEditingNews(news);
    setModalType("news");
  };

  const closeModal = () => {
    setModalType(null);
    setEditingNews(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Draft News</h2>
        <button
          onClick={() => setModalType("news")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create Draft
        </button>
      </div>

      {/* Draft Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drafts.length > 0 ? (
          drafts.map((draft) => (
            <NewsCard
              key={draft._id}
              news={draft}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPublish={handlePublish}
            />
          ))
        ) : (
          <p className="text-gray-500">No drafts available.</p>
        )}
      </div>

      {/* Modal */}
      {modalType && (
        <Modal
          modalType={modalType}
          closeModal={() => {
            closeModal();
            fetchDrafts(); // 🔥 refresh after create/edit
          }}
          editingNews={editingNews}
        />
      )}
    </div>
  );
};

export default Drafts;

import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import Modal from "../components/Modal";

axios.defaults.baseURL = "http://localhost:3000";
const token = localStorage.getItem("token");
if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [editingNews, setEditingNews] = useState(null);

  const fetchDrafts = async () => {
    const res = await axios.get("http://localhost:3000/news/drafts");
    setDrafts(Array.isArray(res.data) ? res.data : []);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    fetchDrafts();
  }, []);

  const handlePublish = async (id) => {
    await axios.patch(`http://localhost:3000/news/${id}/publish`);
    fetchDrafts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/news/${id}`);
    fetchDrafts();
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
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Draft
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(drafts) &&
          drafts.map((draft) => (
            <NewsCard
              key={draft._id}
              news={draft}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPublish={handlePublish}
            />
          ))}
      </div>

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

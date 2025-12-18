import React, { useState } from "react";
import NewsCard from "../components/NewsCard";
import Modal from "../components/Modal";

const Drafts = ({ drafts = [], onNewsCreate }) => {
  const [modalType, setModalType] = useState(null);
  const [editingNews, setEditingNews] = useState(null);

  const handlePublish = (id) => console.log("Publish", id);
  const handleDelete = (id) => console.log("Delete", id);
  const handleEdit = (news) => {
    setEditingNews(news);
    setModalType("news");
  };

  const openModal = () => {
    setEditingNews(null);
    setModalType("news");
  };

  const closeModal = () => {
    setModalType(null);
    setEditingNews(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Draft News</h2>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Create Draft
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drafts.map((draft) => (
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
          closeModal={closeModal}
          onCategoryCreate={null}
          onNewsCreate={onNewsCreate}
          editingNews={editingNews}
        />
      )}
    </div>
  );
};

export default Drafts;
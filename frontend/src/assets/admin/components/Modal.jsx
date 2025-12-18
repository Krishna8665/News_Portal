import React, { useState } from "react";

const Modal = ({
  modalType,
  closeModal,
  onCategoryCreate,
  onNewsCreate,
  editingNews,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [newsData, setNewsData] = useState({
    title: editingNews?.title || "",
    content: editingNews?.content || "",
    category: editingNews?.category || "",
    imageUrl: editingNews?.imageUrl || "",
  });

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    onCategoryCreate(newCategory);
    setNewCategory("");
    closeModal();
  };

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    if (onNewsCreate) {
      onNewsCreate(newsData);
    }
    setNewsData({ title: "", content: "", category: "", imageUrl: "" });
    closeModal();
  };

  const handleNewsChange = (field, value) => {
    setNewsData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">
            {modalType === "category"
              ? "Add Category"
              : editingNews
              ? "Edit News Draft"
              : "Create News Draft"}
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {modalType === "category" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (newCategory.trim()) {
                    onCategoryCreate(newCategory);
                    setNewCategory("");
                    closeModal();
                  }
                }
              }}
            />
            <button
              onClick={handleCategorySubmit}
              className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition"
            >
              Create Category
            </button>
          </div>
        )}

        {modalType === "news" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter news title"
                value={newsData.title}
                onChange={(e) => handleNewsChange("title", e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                placeholder="Enter news content"
                value={newsData.content}
                onChange={(e) => handleNewsChange("content", e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                placeholder="Enter category"
                value={newsData.category}
                onChange={(e) => handleNewsChange("category", e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL (optional)
              </label>
              <input
                type="text"
                placeholder="Enter image URL"
                value={newsData.imageUrl}
                onChange={(e) => handleNewsChange("imageUrl", e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleNewsSubmit}
              className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition"
            >
              {editingNews ? "Update Draft" : "Create Draft"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

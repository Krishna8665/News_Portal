import { Upload } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Modal = ({ modalType, closeModal, editingNews, onSuccess }) => {
  const [newCategory, setNewCategory] = useState("");

  const [newsData, setNewsData] = useState({
    title: editingNews?.title || "",
    content: editingNews?.content || "",
    category: editingNews?.category || "",
    image: null,
    imagePreview: null, // preview URL
  });

  const [categories, setCategories] = useState([]);

  // Set token for axios requests
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  const handleNewsChange = (field, value) => {
    setNewsData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewsData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleNewsSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newsData.title);
      formData.append("description", newsData.content);
      formData.append("category", newsData.category);
      if (newsData.image) formData.append("image", newsData.image);

      await axios.post("http://localhost:3000/news", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Draft created successfully!");
      setNewsData({
        title: "",
        content: "",
        category: "",
        image: null,
        imagePreview: null,
      });
      onSuccess();
      closeModal();
    } catch (error) {
      console.error("Failed to create draft:", error);
      alert("Failed to create draft");
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };
  const handleCategorySubmit = async () => {
    if (!newCategory.trim()) return;

    try {
      const res = await axios.post("http://localhost:3000/categories", {
        name: newCategory,
      });

      toast.success(`Category "${res.data.name}" created successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setNewCategory("");
      closeModal();
      // Optionally refresh categories list if needed
      // fetchCategories();
    } catch (error) {
      console.error("Failed to create category:", error.response || error);
      toast.error(
        error.response?.data?.message || "Failed to create category",
        { position: "top-right", autoClose: 3000 }
      );
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

        {/* Category Form */}
        {modalType === "category" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCategorySubmit}
              className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition"
            >
              Create Category
            </button>
          </div>
        )}

        {/* News Form */}
        {modalType === "news" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={newsData.title}
              onChange={(e) => handleNewsChange("title", e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Content"
              value={newsData.content}
              onChange={(e) => handleNewsChange("content", e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
            />
            <select
              value={newsData.category}
              onChange={(e) => handleNewsChange("category", e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Image Upload */}
            <label className="cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors h-40 flex flex-col items-center justify-center">
                {newsData.imagePreview ? (
                  <img
                    src={newsData.imagePreview}
                    alt="preview"
                    className="h-full object-contain"
                  />
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload</p>
                  </>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>

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

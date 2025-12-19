import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryCard from "../components/CategoryCard";
import Modal from "../components/Modal";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null); // "category"
  const [editingCategory, setEditingCategory] = useState(null);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add new category
  const addCategory = async (name) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/categories",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
      // setCategories((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  // Update existing category
  const updateCategory = async (id, name) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:3000/categories/${id}`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories((prev) =>
        prev.map((cat) => (cat._id === id ? res.data : cat))
      );
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  // Open modal for editing
  const editCategory = (category) => {
    setEditingCategory(category);
    setModalType("category");
  };

  const closeModal = () => {
    setModalType(null);
    setEditingCategory(null);
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
        <button
          onClick={() => setModalType("category")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories
          .filter((category) => category && category._id)
          .map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              onEdit={() => editCategory(category)}
              onDelete={() => deleteCategory(category._id)}
            />
          ))}
      </div>
    {modalType && (
  <Modal
    modalType="category"
    closeModal={closeModal}
    onCategoryCreate={async (name) => {
      try {
        // Call backend to add category and wait for response
        const newCat = await addCategory(name);
        // Update local state with the new category
        setCategories((prev) => [...prev, newCat]);
        // Close the modal
        closeModal();
      } catch (err) {
        console.error("Failed to add category:", err);
      }
    }}
  />
)}

    </div>
  );
};

export default CategoriesPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryCard from "../components/CategoryCard";
import Modal from "../components/Modal";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null); // "category" or "news"

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/categories");
      setCategories(res.data); // backend should return array of categories
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add new category dynamically
  const addCategory = async (name) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/categories",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  // Delete category dynamically
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/categories/${id}`, {
        withCredentials: true,
      });
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  // Edit category (for simplicity, opens modal prefilled, can extend later)
  const editCategory = (category) => {
    console.log("Edit category:", category);
    // You can implement edit modal here
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
              onEdit={editCategory}
              onDelete={deleteCategory}
            />
          ))}
      </div>

      {modalType && (
        <Modal
          modalType={modalType}
          closeModal={() => setModalType(null)}
          onCategoryCreate={addCategory}
        />
      )}
    </div>
  );
};

export default CategoriesPage;

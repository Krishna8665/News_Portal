import React, { useState } from "react";

const SimpleModal = ({ isOpen, onClose, modalType }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">
            {modalType === "category" ? "Add Category" : "Create News Draft"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {modalType === "category" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Category Name"
              className="w-full p-2.5 border border-gray-300 rounded-md"
            />
            <button className="bg-blue-600 text-white w-full py-2 rounded-md">
              Create Category
            </button>
          </div>
        )}

        {modalType === "news" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="News Title"
              className="w-full p-2.5 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="News Content"
              className="w-full p-2.5 border border-gray-300 rounded-md min-h-[120px]"
            />
            <input
              type="text"
              placeholder="Category"
              className="w-full p-2.5 border border-gray-300 rounded-md"
            />
            <button className="bg-blue-600 text-white w-full py-2 rounded-md">
              Create Draft
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Test App
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("category");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Modal Test</h1>
        
        <div className="space-x-4">
          <button
            onClick={() => {
              setModalType("category");
              setModalOpen(true);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Open Category Modal
          </button>
          
          <button
            onClick={() => {
              setModalType("news");
              setModalOpen(true);
            }}
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Open News Modal
          </button>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Background Content</h2>
          <p className="text-gray-600">
            This is the background content. When you open the modal, you should see this content 
            slightly dimmed in the background, and the modal form should be clearly visible in the center.
          </p>
        </div>
      </div>

      <SimpleModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        modalType={modalType}
      />
    </div>
  );
}
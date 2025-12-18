import React, { useState } from "react";
import Sidebar from "./assets/admin/components/Sidebar";
import Header from "./assets/admin/components/Header";
import Dashboard from "./assets/admin/pages/Dashboard";
import Drafts from "./assets/admin/pages/Drafts";
import Published from "./assets/admin/pages/Published";
import Categories from "./assets/admin/pages/Categories";
import Modal from "./assets/admin/components/Modal";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <main className="flex-1 p-4 lg:p-8">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "drafts" && (
            <Drafts openModal={() => openModal("news")} />
          )}
          {activeTab === "published" && <Published />}
          {activeTab === "categories" && (
            <Categories openModal={() => openModal("category")} />
          )}
        </main>
      </div>

      {showModal && <Modal modalType={modalType} closeModal={closeModal} />}
    </div>
  );
};

export default AdminPanel;

import React from "react";
import {
  Home,
  FileText,
  Eye,
  FolderOpen,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = ({ sidebarOpen, activeTab, setActiveTab }) => {
  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 fixed lg:sticky top-0 left-0 z-30 w-64 h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full pt-20 lg:pt-4">
        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "dashboard"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("drafts")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "drafts"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Drafts</span>
          </button>

          <button
            onClick={() => setActiveTab("published")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "published"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Eye className="w-5 h-5" />
            <span className="font-medium">Published</span>
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "categories"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FolderOpen className="w-5 h-5" />
            <span className="font-medium">Categories</span>
          </button>
        </nav>

        <div className="px-4 py-4 border-t border-gray-200">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

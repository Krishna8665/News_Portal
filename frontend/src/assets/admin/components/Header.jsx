import React, { useState } from "react";
import { Menu, X, Bell, Search } from "lucide-react";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-gray-900 lg:hidden"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <h1 className="text-xl font-bold text-gray-800">News Admin Panel</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-48"
            />
          </div>
          <button className="relative text-gray-600 hover:text-gray-900">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

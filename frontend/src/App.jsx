import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./assets/admin/AdminDashboard";
import Login from "./assets/pages/Login";
import Home from "./assets/pages/Home";
import SingleNews from "./assets/pages/SingleNews";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/news/news/:year/:month/:slug" element={<SingleNews />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

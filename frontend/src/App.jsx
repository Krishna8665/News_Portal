import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./assets/admin/AdminDashboard";
import Login from "./assets/pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

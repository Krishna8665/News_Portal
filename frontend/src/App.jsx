import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import AdminDashboard from "./assets/admin/AdminDashboard";
import Login from "./assets/pages/Login";
import Home from "./assets/pages/Home";
import SingleNews from "./assets/pages/SingleNews";
import CategoriesPage from "./assets/pages/CategoryPage";

// 1. Configure Axios to include token and handle 401s
axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error happened on the login page
    const isLoginRequest = error.config.url.includes("/login");

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // ONLY redirect if we are NOT already on the login page
      if (!isLoginRequest) {
        sessionStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// 2. Gatekeeper for Protected Routes
const ProtectedRoute = ({ allowedRoles }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("userRole");

  if (!token) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role))
    return <Navigate to="/" replace />;

  return <Outlet />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<CategoriesPage />} />
        <Route path="/news/news/:year/:month/:slug" element={<SingleNews />} />

        {/* PROTECTED ADMIN ROUTE */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

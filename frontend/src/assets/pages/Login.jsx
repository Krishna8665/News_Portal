import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors) setErrors("");
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setErrors(""); // Reset error message before trying

    try {
      const res = await axios.post("http://localhost:3000/login", {
        email: formData.email,
        password: formData.password,
      });

      // If successful, save to sessionStorage (Auto-logout on tab close)
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("userRole", res.data.user.role);

      // Redirect
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      // THIS IS THE FIX:
      // If the backend sent an error (like 401), grab that message
      if (err.response && err.response.data) {
        setErrors(err.response.data.message); // This will show "Invalid password"
      } else {
        setErrors("Something went wrong with the server.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-900">
      <div className="bg-[#310D84] p-8 rounded-xl w-80">
        <h1 className="text-white text-2xl font-bold mb-4">Login</h1>

        {errors && (
          <p className="text-red-400 text-sm mb-4 text-center">{errors}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-purple-200"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-purple-200"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-2 rounded font-bold"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors) setErrors("");
  };

  // Validate form
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setErrors("Please fill in all fields");
      return false;
    }
    return true;
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", res.data.user.role);

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.log(err.response?.data);
      setErrors(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="bg-cover bg-gradient-to-br from-[#7337FF] via-[#000000] to-[#0C7EA8]"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/dkt1t22qc/image/upload/v1742348950/Prestataires_Documents/fopt5esl9cgvlcawz1z4.jpg)",
      }}
    >
      <div className="h-screen flex justify-center items-center backdrop-brightness-50">
        <div className="flex flex-col items-center space-y-8">
          <div
            className="rounded-[20px] w-80 p-8 bg-[#310D84]"
            style={{ boxShadow: "-6px 3px 20px 4px #0000007d" }}
          >
            <h1 className="text-white text-3xl font-bold mb-4">Login</h1>

            {errors && (
              <div className="text-red-500 text-sm mb-2 text-center">
                {errors}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="bg-[#8777BA] w-full p-2.5 rounded-md placeholder:text-gray-300 shadow-md shadow-blue-950"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="bg-[#8777BA] w-full p-2.5 rounded-md placeholder:text-gray-300 shadow-md shadow-blue-950"
              />
              <div className="mb-4 text-right">
                <span className="text-[#228CE0] text-[10px] cursor-pointer">
                  Forget Password?
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="h-10 w-full cursor-pointer text-white rounded-md bg-gradient-to-br from-[#7336FF] to-[#3269FF] shadow-md shadow-blue-950"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="text-gray-300 text-center mt-4">
              Don't have an account?{" "}
              <span
                className="text-[#228CE0] cursor-pointer"
                onClick={() => navigate("/user-registration")}
              >
                Sign up
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

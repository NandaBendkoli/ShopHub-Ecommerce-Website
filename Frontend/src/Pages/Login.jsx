import React, { useState } from "react";
import { loginUser } from "../Apis/userApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(form);

      localStorage.setItem("token", response.data.data.token);

      localStorage.setItem("userType", response.data.data.userType);

      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="flex justify-center items-center py-20">
        <div className="bg-white shadow-lg rounded-xl p-8 w-100">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              className="border text-black border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500"
              required
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              className="border text-black border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500"
              required
            />

            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-5 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-yellow-600 font-semibold">
              Signup
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;

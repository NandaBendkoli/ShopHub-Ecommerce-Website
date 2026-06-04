import React, { useState } from "react";
import { registerUser } from "../Apis/userApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Signup = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
    userType: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(form);

      toast.success(response.data.message);

      navigate("/login");
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
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex justify-center items-center flex-1 py-10">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="UserName"
              name="userName"
              onChange={handleChange}
              className="border text-black border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500"
              required
            />

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

            <input
              type="text"
              placeholder="Gender"
              name="gender"
              onChange={handleChange}
              className="border text-black border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500"
              required
            />

            <input
              type="text"
              placeholder="Address"
              name="address"
              onChange={handleChange}
              className="border text-black border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500"
              required
            />

            <input
              type="text"
              placeholder="userType [customer,admin]"
              name="userType"
              onChange={handleChange}
              className="border text-black border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500"
              required
            />

            <input
              type="number"
              placeholder="Mobile"
              name="mobile"
              onChange={handleChange}
              className="border text-black border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500"
              required
            />

            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg font-semibold transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-5 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;

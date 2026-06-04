import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../Apis/userApi.js";
import { toast } from "react-toastify";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();

      localStorage.removeItem("token");

      toast.success(response?.data?.message);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-yellow-500">
          ShopHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/signup" className="hover:text-yellow-500">
            Signup
          </Link>

          <Link to="/login" className="hover:text-yellow-500">
            Login
          </Link>

          <Link to="/admin-panel" className="hover:text-yellow-500">
            Admin Panel
          </Link>

          <Link to="/profile" className="hover:text-yellow-500">
            My Profile
          </Link>

          <Link to="/cart" className="hover:text-yellow-500">
            Cart
          </Link>
          <Link to="/orders" className="hover:text-yellow-500">
            My Orders
          </Link>

          <button
            onClick={handleLogout}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-6 pb-4 gap-4 bg-white">
          <Link to="/signup">Signup</Link>

          <Link to="/login">Login</Link>

          <Link to="/admin-panel">Admin Panel</Link>

          <Link to="/profile">My Profile</Link>

          <Link to="/cart">Cart</Link>

          <Link to="/orders">My Orders</Link>

          <button
            onClick={handleLogout}
            className="bg-yellow-500 text-white py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

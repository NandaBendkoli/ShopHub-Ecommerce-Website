import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Sidebar = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r shadow-sm p-5">
          <h1 className="text-3xl font-bold text-yellow-500 mb-10">
            Admin Panel
          </h1>

          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="p-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              Home
            </Link>

            <Link
              to="/admin-panel/products"
              className="p-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              Products
            </Link>

            <Link
              to="/admin-panel/users"
              className="p-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              Users
            </Link>

            <Link
              to="/admin-panel/orders"
              className="p-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              Orders
            </Link>

            <Link
              to="/admin-panel/add-product"
              className="p-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              Add Product
            </Link>

            <button className="mt-5 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition">
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome Admin 👋
            </h1>

            <p className="text-gray-600">
              Manage products, users and orders from here.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Sidebar;

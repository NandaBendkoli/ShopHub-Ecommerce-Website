import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../Apis/productApi";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await addProduct(product);

      toast.success(response.data.message);

      setProduct({
        productName: "",
        price: "",
        category: "",
        stock: "",
        image: "",
        description: "",
      });
      // navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8 text-black">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Add Product</h1>

          <p className="text-gray-600 mt-2">Add new products to your store</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl">
          <form
            onSubmit={handleAddProduct}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Product Name */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Product Name</label>

              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="border border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500"
                required
              />
            </div>
            {/* Price */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Price</label>

              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="border border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500"
                required
              />
            </div>

            {/* rating  */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Rating</label>

              <input
                type="number"
                name="rating"
                value={product.rating}
                onChange={handleChange}
                placeholder="Enter rating"
                className="border border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500"
                required
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Category</label>

              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="Enter category"
                className="border border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500"
                required
              />
            </div>

            {/* Stock */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Stock</label>

              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                placeholder="Enter stock"
                className="border border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500"
                required
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="font-medium text-gray-700">
                Product Image URL
              </label>

              <input
                type="text"
                name="image"
                value={product.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="border border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="font-medium text-gray-700">Description</label>

              <textarea
                rows="5"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Enter product description"
                className="border border-gray-300 p-3 rounded-lg outline-none focus:border-yellow-500 resize-none"
                required
              />
            </div>

            {/* Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg font-semibold transition"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddProduct;

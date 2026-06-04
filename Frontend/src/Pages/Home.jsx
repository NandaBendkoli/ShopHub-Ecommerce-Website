import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { getProducts } from "../Apis/productApi.js";
import { addToCart } from "../Apis/cartApi.js";
import { toast } from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 12;

  const fetchProducts = async () => {
    try {
      const response = await getProducts({
        page,
        limit,
        searchTitle,
      });

      setProducts(response?.data?.data?.products || []);
      setTotal(response?.data?.data?.total || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPages = Math.ceil(total / limit);

  const handleAddToCart = async (product) => {
    try {
      const payload = {
        productId: product.productId,
        quantity: 1,
      };

      const response = await addToCart(payload);

      toast.success(
        response?.data?.message || "Added to cart successfully!"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Error occurred while adding to cart"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-linear-to-r from-slate-600 via-slate-400 to-slate-500 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-extrabold text-white mb-4">
            Shop Smart. Live Better.
          </h1>

          <p className="text-xl text-gray-200 mb-10">
            Discover amazing deals on electronics, fashion and more.
          </p>

          <div className="flex justify-center max-w-2xl mx-auto">
            <input
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setPage(1);
                  fetchProducts();
                }
              }}
              type="text"
              placeholder="Search products..."
              className="flex-1 px-6 py-4 rounded-l-xl text-white outline-none border border-gray-300 focus:border-gray-500"
            />

            <button
              onClick={() => {
                setPage(1);
                fetchProducts();
              }}
              className="bg-black text-white px-8 rounded-r-xl hover:bg-gray-900"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="flex flex-wrap gap-4 mt-8 justify-center">
        {[
          "📱 Mobiles",
          "💻 Laptops",
          "⌚ Watches",
          "🎧 Electronics",
          "👕 Fashion",
          "📷 Cameras",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              const category = cat.split(" ")[1];
              setSearchTitle(category);
              setPage(1);
            }}
            className="bg-slate-500 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold mb-2 text-center text-gray-800">
          Featured Products
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Total Products: {total}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg truncate">
                  {item.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {item.category}
                </p>

                <div className="mt-2">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                    ⭐ {item.rating}
                  </span>
                </div>

                <h2 className="text-2xl font-bold mt-3 text-indigo-600">
                  ₹{item.price.toLocaleString()}
                </h2>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
                  >
                    Add to Cart
                  </button>

                  <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`px-4 py-2 rounded ${
                  page === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Home;
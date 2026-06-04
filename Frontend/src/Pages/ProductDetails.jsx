import React, { useEffect, useState } from "react";
import { getProducts } from "../Apis/productApi.js";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import EditProduct from "./EditProduct.jsx";
import SingleProdcut from "./SingleProdcut";

const ProductDetails = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [searchTitle, setSearchTitle] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 12;

  const [editForm, setEditForm] = useState({
    productId: "",
    name: "",
    description: "",
    category: "",
    price: "",
    rating: "",
    stock: "",
    image: "",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts({
        page,
        limit,
        searchTitle,
      });

      setProducts(response?.data?.data?.products || []);
      setTotal(response?.data?.data?.total || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / limit);

  const handleEditClick = (product) => {
    setEditForm({
      productId: product.productId,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      rating: product.rating,
      stock: product.stock,
      image: product.image,
    });

    setIsEditOpen(true);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen text-black">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">
            All Products ({total})
          </h1>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search product..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setPage(1);
                  fetchProducts();
                }
              }}
              className="border px-4 py-2 rounded-lg w-80"
            />

            <button
              onClick={() => {
                setPage(1);
                fetchProducts();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Search
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-52 object-cover rounded-t-lg"
                  />

                  <div className="p-4">
                    <h2 className="font-semibold text-lg truncate">
                      {item.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {item.category}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                        ⭐ {item.rating}
                      </span>

                      <span className="text-sm text-gray-500">
                        Stock: {item.stock}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mt-3">
                      ₹{item.price.toLocaleString()}
                    </h3>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => {
                          setSelectedProduct(item);
                          setIsViewOpen(true);
                        }}
                        className="flex-1 bg-blue-600 text-white py-2 rounded"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleEditClick(item)}
                        className="flex-1 bg-yellow-500 text-white py-2 rounded"
                      >
                        Edit
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
          </>
        )}
      </div>

      {isEditOpen && (
        <EditProduct
          editForm={editForm}
          setEditForm={setEditForm}
          setIsEditOpen={setIsEditOpen}
          fetchProducts={fetchProducts}
        />
      )}

      {isViewOpen && (
        <SingleProdcut
          product={selectedProduct}
          setIsViewOpen={setIsViewOpen}
        />
      )}

      <Footer />
    </div>
  );
};

export default ProductDetails;
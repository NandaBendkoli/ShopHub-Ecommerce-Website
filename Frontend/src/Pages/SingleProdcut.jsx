import React from "react";

const SingleProdcut = ({ product, setIsViewOpen }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 text-black">
      <div className="bg-white w-800 max-h-[90vh] overflow-y-auto rounded-lg p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Product Details</h2>

          <button
            onClick={() => setIsViewOpen(false)}
            className="text-red-500 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg"
        />

        <div className="mt-6 space-y-4">
          <div>
            <span className="font-semibold">Product ID:</span>{" "}
            {product.productId}
          </div>

          <div>
            <span className="font-semibold">Name:</span> {product.name}
          </div>

          <div>
            <span className="font-semibold">Category:</span> {product.category}
          </div>

          <div>
            <span className="font-semibold">Price:</span> ₹
            {product.price?.toLocaleString()}
          </div>

          <div>
            <span className="font-semibold">Rating:</span> ⭐ {product.rating}
          </div>

          <div>
            <span className="font-semibold">Stock:</span> {product.stock}
          </div>

          <div>
            <span className="font-semibold">Description:</span>

            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>

          <div>
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(product.createdAt).toLocaleString()}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsViewOpen(false)}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProdcut;

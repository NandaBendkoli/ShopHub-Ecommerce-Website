import React from "react";
import { updateProduct } from "../Apis/productApi.js";
import { toast } from "react-toastify";

const EditProduct = ({
  editForm,
  setEditForm,
  setIsEditOpen,
  fetchProducts,
}) => {
  const handleUpdateProduct = async () => {
    try {
      const response = await updateProduct(editForm);

      toast.success(response?.data?.message);

      setIsEditOpen(false);

      fetchProducts();
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to update product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 text-black">
      <div className="bg-white p-6 rounded-lg w-500">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        <input
          type="text"
          placeholder="Product Name"
          value={editForm.name}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              name: e.target.value,
            })
          }
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="number"
          placeholder="Price"
          value={editForm.price}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              price: e.target.value,
            })
          }
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="number"
          placeholder="Rating"
          value={editForm.rating}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              rating: e.target.value,
            })
          }
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="string"
          placeholder="Image URL"
          value={editForm.image}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              image: e.target.value,
            })
          }
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="number"
          placeholder="Stock"
          value={editForm.stock}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              stock: e.target.value,
            })
          }
          className="w-full border p-2 rounded mb-3"
        />

        <textarea
          placeholder="Description"
          value={editForm.description}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              description: e.target.value,
            })
          }
          className="w-full border p-2 rounded mb-3"
          rows={3}
        />

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditOpen(false)}
            className="flex-1 bg-gray-500 text-white py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdateProduct}
            className="flex-1 bg-green-600 text-white py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

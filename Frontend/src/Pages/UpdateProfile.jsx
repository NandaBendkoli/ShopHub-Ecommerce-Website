import React from "react";
import { update } from "../Apis/userApi.js";
import { toast } from "react-toastify";

const UpdateProfile = ({
  editForm,
  setEditForm,
  setEditOpen,
  fetchProfile,
}) => {
  const handleUpdate = async () => {
    try {
      const response = await update(editForm);

      toast.success(response.data.message);

      await fetchProfile();

      setEditOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    }
  };
  return (
    <div>
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-5 text-center">Edit Profile</h2>

          <div className="space-y-4">
            <input
              type="text"
              value={editForm.userName}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  userName: e.target.value,
                })
              }
              placeholder="User Name"
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="email"
              value={editForm.email}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  email: e.target.value,
                })
              }
              placeholder="Email"
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              value={editForm.mobile}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  mobile: e.target.value,
                })
              }
              placeholder="Mobile"
              className="w-full border p-3 rounded-lg"
            />

            <select
              value={editForm.gender}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  gender: e.target.value,
                })
              }
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setEditOpen(false)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

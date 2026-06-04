import React, { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../Apis/userApi.js";

const ChangePassword = ({ setChangePasswordOpen }) => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async () => {
    try {
      if (form.newPassword !== form.confirmPassword) {
        return toast.error("Passwords do not match!");
      }

      const response = await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      toast.success(response.data.message);

      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setChangePasswordOpen(false);
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Error while changing password",
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Old Password"
            value={form.oldPassword}
            onChange={(e) =>
              setForm({
                ...form,
                oldPassword: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="New Password"
            value={form.newPassword}
            onChange={(e) =>
              setForm({
                ...form,
                newPassword: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setChangePasswordOpen(false)}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

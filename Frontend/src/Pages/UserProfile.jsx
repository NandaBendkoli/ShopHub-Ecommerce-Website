import React, { useEffect, useState } from "react";
import { userProfile } from "../Apis/userApi";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./ChangePassword";

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await userProfile();
      setProfile(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [editForm, setEditForm] = useState({
    userId: "",
    userName: "",
    email: "",
    gender: "",
    userType: "",
    mobile: "",
  });

  const handleEdit = async (user) => {
    setEditForm({
      userId: user.userId,
      userName: user.userName,
      email: user.email,
      gender: user.gender,
      userType: user.userType,
      mobile: user.mobile,
    });
    setEditOpen(true);
  };
  const handleChangePassword = () => {
    setChangePasswordOpen(true);
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">My Profile</h1>

            <p className="text-gray-500 mt-2">
              Manage your account information
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Top Banner */}
            <div className="bg-yellow-500 h-32 flex justify-center items-end">
              <div className="w-28 h-28 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center translate-y-14">
                <span className="text-4xl font-bold text-yellow-500">
                  {profile?.userName?.charAt(0)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="pt-20 pb-10 px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                  {profile.userName}
                </h2>

                <p className="text-gray-500">{profile.userType}</p>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-5 rounded-xl">
                  <p className="text-gray-500 text-sm">Email Address</p>

                  <h3 className="font-semibold text-gray-800 mt-1">
                    {profile.email}
                  </h3>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl">
                  <p className="text-gray-500 text-sm">Mobile Number</p>

                  <h3 className="font-semibold text-gray-800 mt-1">
                    {profile.mobile}
                  </h3>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl">
                  <p className="text-gray-500 text-sm">Gender</p>

                  <h3 className="font-semibold text-gray-800 mt-1 capitalize">
                    {profile.gender}
                  </h3>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl">
                  <p className="text-gray-500 text-sm">Role</p>

                  <h3 className="font-semibold text-gray-800 mt-1 capitalize">
                    {profile.userType}
                  </h3>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 justify-center mt-10">
                <button
                  onClick={() => handleEdit(profile)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl transition"
                >
                  Edit Profile
                </button>

                <button
                  onClick={handleChangePassword}
                  className="border border-yellow-500 text-yellow-500 hover:bg-yellow-50 px-6 py-3 rounded-xl transition"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editOpen && (
        <UpdateProfile
          editForm={editForm}
          setEditForm={setEditForm}
          setEditOpen={setEditOpen}
          fetchProfile={fetchProfile}
        />
      )}
      {changePasswordOpen && (
        <ChangePassword
          changePasswordOpen={changePasswordOpen}
          setChangePasswordOpen={setChangePasswordOpen}
          fetchProfile={fetchProfile}
        />
      )}

      <Footer />
    </div>
  );
};

export default UserProfile;

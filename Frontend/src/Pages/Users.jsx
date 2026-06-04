import React, { useEffect, useState } from "react";
import { getAllUsers } from "../Apis/userApi.js";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await getAllUsers({
        page: 1,
        limit: 10,
      });
      setUsers(response.data.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8 text-black">
        {/* Heading */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Users</h1>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left p-4">Username</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Mobile</th>
                <th className="text-left p-4">Gender</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.userId} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{user.userName}</td>

                  <td className="p-4 text-gray-600">{user.email}</td>

                  <td className="p-4">{user.mobile}</td>

                  <td className="p-4">{user.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Users;

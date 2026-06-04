import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import ProductDetails from "../Pages/ProductDetails";
import AddProduct from "../Pages/AddProduct";
import AdminOrders from "../Pages/AdminOrders";
import Dashboard from "../Pages/Dashboard";
import Users from "../Pages/Users";
import Sidebar from "../Components/Sidebar";
import ProtectedRoutes from "../Components/ProtectedRoutes";
import UserProfile from "../Pages/UserProfile";
import Cart from "../Pages/Cart";
import Orders from "../Pages/Ordres";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },

  { path: "/login", element: <Login /> },

  { path: "/signup", element: <Signup /> },

  { path: "/products/:id", element: <ProductDetails /> },

  {
    path: "/profile",
    element: (
      <ProtectedRoutes>
        <UserProfile />
      </ProtectedRoutes>
    ),
  },

  {
    path: "/cart",
    element: (
      <ProtectedRoutes>
        <Cart />
      </ProtectedRoutes>
    ),
  },

  {
    path: "/orders",
    element: (
      <ProtectedRoutes>
        <Orders />
      </ProtectedRoutes>
    ),
  },

  {
    path: "/admin-panel",
    element: (
      <ProtectedRoutes allowedRoles={["admin"]}>
        <Sidebar />
      </ProtectedRoutes>
    ),
  },

  {
    path: "/admin-panel/dashboard",
    element: (
      <ProtectedRoutes allowedRoles={["admin"]}>
        <Dashboard />
      </ProtectedRoutes>
    ),
  },
  
  {
    path: "/admin-panel/products",
    element: (
      <ProtectedRoutes allowedRoles={["admin"]}>
        <ProductDetails/>
      </ProtectedRoutes>
    ),
  },

  {
    path: "/admin-panel/users",
    element: (
      <ProtectedRoutes allowedRoles={["admin"]}>
        <Users />
      </ProtectedRoutes>
    ),
  },

  {
    path: "/admin-panel/orders",
    element: (
      <ProtectedRoutes allowedRoles={["admin"]}>
        <AdminOrders />
      </ProtectedRoutes>
    ),
  },

  {
    path: "/admin-panel/add-product",
    element: (
      <ProtectedRoutes allowedRoles={["admin"]}>
        <AddProduct />
      </ProtectedRoutes>
    ),
  },
]);

const Route = () => {
  return <RouterProvider router={router} />;
};

export default Route;

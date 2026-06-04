import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";
import { getAllOrders, updateOrderStatus } from "../Apis/orderApi.js";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();

      setOrders(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusUpdate = async (orderId, orderStatus, paymentStatus) => {
    try {
      const response = await updateOrderStatus({
        orderId,
        orderStatus,
        paymentStatus,
      });

      toast.success(response.data.message);

      fetchOrders();
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-4xl font-bold mb-8">Admin Orders</h1>

          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white shadow-lg rounded-2xl p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  {/* <h2 className="text-2xl font-bold">{order.orderId}</h2> */}

                  <p className="text-gray-500">User: {order.userName}</p>

                  <p className="text-gray-500">₹{order.totalAmount}</p>
                </div>

                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    handleStatusUpdate(
                      order.orderId,
                      e.target.value,
                      order.paymentStatus,
                    )
                  }
                  className="border p-2 rounded-lg"
                >
                  <option value="PLACED">PLACED</option>

                  <option value="CONFIRMED">CONFIRMED</option>

                  <option value="PACKED">PACKED</option>

                  <option value="SHIPPED">SHIPPED</option>

                  <option value="DELIVERED">DELIVERED</option>

                  <option value="CANCELLED">CANCELLED</option>
                </select>
                <select
                  value={order.paymentStatus}
                  onChange={(e) =>
                    handleStatusUpdate(
                      order.orderId,
                      order.orderStatus,
                      e.target.value,
                    )
                  }
                  className="border p-2 rounded-lg"
                >
                  <option value="PENDING">PENDING</option>

                  <option value="COMPLETED">COMPLETED</option>

                  <option value="FAILED">FAILED</option>
                </select>
              </div>

              <div className="mb-4">
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {order.address}
                </p>

                <p>
                  <span className="font-semibold">Payment:</span>{" "}
                  {order.paymentStatus}
                </p>
              </div>

              <div className="space-y-3">
                {order.products?.map((product) => (
                  <div
                    key={product.productId}
                    className="flex items-center gap-4 border rounded-lg p-3"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    <div>
                      <h3 className="font-bold">{product.name}</h3>

                      <p>₹{product.price}</p>

                      <p>
                        Qty:
                        {product.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminOrders;

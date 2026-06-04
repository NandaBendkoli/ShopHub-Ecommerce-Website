import React, { useEffect, useState } from "react";
import { getMyOrders, cancelOrder } from "../Apis/orderApi";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await getMyOrders();

      setOrders(response?.data?.data || []);
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to fetch orders");
    }
  };
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await cancelOrder(orderId);

      toast.success(response.data.message);

      fetchOrders();
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to cancel order");
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
          <h1 className="text-4xl font-bold mb-8">My Orders</h1>

          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <h2 className="text-2xl font-bold">No Orders Found</h2>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl shadow-lg p-6 mb-6"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5">
                  <div>
                    <p className="text-gray-600">
                      Amount: ₹{order.totalAmount?.toLocaleString()}
                    </p>
                    <p className="text-gray-600">
                      Placed On: {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <p className="text-green-600 font-medium">
                      Expected Delivery: By{" "}
                      {new Date(
                        Date.now() + 3 * 24 * 60 * 60 * 1000,
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </p>
                  </div>

                  <div className="mt-3 md:mt-0">
                    <p className="font-bold text-green-500">
                      <span className="font-bold text-gray-500">Status:</span>{" "}
                      {order.orderStatus}
                    </p>

                    <p className="font-bold">
                      <span className="font-bold text-gray-500">Payment:</span>{" "}
                      {order.paymentStatus}
                    </p>
                  </div>
                  {order.orderStatus !== "DELIVERED" &&
                    order.orderStatus !== "CANCELLED" && (
                      <button
                        onClick={() => handleCancelOrder(order.orderId)}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Cancel Order
                      </button>
                    )}
                </div>

                {/* Address */}
                <div className="mb-5">
                  <h3 className="font-semibold text-lg">Delivery Address</h3>

                  <p className="text-gray-600">{order.address}</p>
                </div>

                {/* Products */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Products</h3>

                  {order.products?.length > 0 ? (
                    order.products.map((product) => (
                      <div
                        key={product.productId}
                        className="flex items-center gap-4 border rounded-lg p-3 mb-3"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">
                            {product.name}
                          </h4>

                          <p>Price: ₹{product.price?.toLocaleString()}</p>

                          <p>Quantity: {product.quantity}</p>

                          <p className="font-semibold">
                            Total: ₹
                            {(
                              product.price * product.quantity
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No Products Found</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Orders;

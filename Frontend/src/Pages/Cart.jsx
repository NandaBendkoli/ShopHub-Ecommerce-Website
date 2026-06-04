import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router";
import { getCartItems, removeFromCart } from "../Apis/cartApi";
import { placeOrder } from "../Apis/orderApi";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const response = await getCartItems();

      console.log("Cart Response:", response.data);

      setCartItems(response?.data?.data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = async (productId) => {
    try {
      const response = await removeFromCart({ productId });

      toast.success(response.data.message);

      fetchCartItems();
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
    }
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      return toast.error("Please enter delivery address");
    }

    if (cartItems.length === 0) {
      return toast.error("Cart is empty");
    }

    try {
      const response = await placeOrder({
        address,
      });

      toast.success(response?.data?.message || "Order placed successfully");

      navigate("/orders");
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to place order");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />

      <section className="bg-linear-to-r from-slate-600 via-slate-400 to-slate-500 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-white mb-3">Your Cart</h1>

          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            Review your selected items and proceed to checkout.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
          {/* Cart Items */}
          <div className="space-y-6">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-xl p-8 shadow text-center">
                <h2 className="text-2xl font-bold">Your cart is empty</h2>

                <Link
                  to="/"
                  className="inline-block mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-lg sm:flex-row sm:items-center"
                >
                  <img
                    src={item.image}
                    alt={item.productId}
                    className="h-40 w-full rounded-2xl object-cover sm:w-48"
                  />

                  <div className="flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-2xl font-semibold text-slate-800">
                          {item.name}
                        </h2>

                        <p className="text-sm text-slate-500">
                          {item.category || "Product"}
                        </p>
                      </div>

                      <span className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white">
                        Qty {item.quantity}
                      </span>
                    </div>

                    <div className="mt-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded">
                        ⭐ {item.rating || 4.5}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className="text-3xl font-bold text-indigo-600">
                        ₹{item.price.toLocaleString()}
                      </span>

                      <button
                        className="rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600"
                        onClick={() => removeCartItem(item.productId)}
                      >
                        Remove
                      </button>
                    </div>

                    <p className="mt-3 text-lg font-semibold text-slate-700">
                      Total: ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <aside className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl h-fit">
            <h3 className="text-3xl font-bold mb-4">Order Summary</h3>

            <textarea
              placeholder="Enter Delivery Address"
              rows={4}
              className="w-full rounded-lg p-3 mb-5  text-white"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="space-y-4 text-slate-300">
              <div className="flex justify-between border-b border-slate-700 pb-3">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between border-b border-slate-700 pb-3">
                <span>Delivery</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between border-b border-slate-700 pb-3">
                <span>Taxes</span>
                <span>₹0</span>
              </div>

              <div className="flex justify-between pt-3 text-xl font-semibold text-white">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
              className="mt-8 w-full rounded-2xl bg-yellow-500 py-4 text-lg font-semibold text-slate-900 hover:bg-yellow-400 disabled:opacity-50"
            >
              Place Order
            </button>

            <Link
              to="/"
              className="mt-5 inline-flex w-full justify-center rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-200 hover:bg-slate-700"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;

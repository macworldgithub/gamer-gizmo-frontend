"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "@/components/Store/Store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import StripeCheckoutModal from "./StripeCheckoutModal";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.token);
  const [paymentMethod, setPaymentMethod] = useState("online");


  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        toast.error("User not authenticated");
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCartItems(response.data?.cart_items || []);
        setUser(response?.data.users);
      } catch (error) {
        toast.error("Failed to fetch cart data");
        console.error(error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  const clearCart = async () => {
    if (!token) {
      toast.error("User not authenticated");
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems([]);
      toast.success("Cart cleared successfully!");
    } catch (error) {
      console.error("Error clearing cart", error);
      toast.error("Failed to clear cart");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce(
    //@ts-ignore
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingFee = 10; // Fixed shipping fee as shown in the design
  const orderTotal = subtotal + shippingFee;

  const deleteCartItem = async (productId: number) => {
    if (!token) {
      toast.error("User not authenticated");
      return;
    }

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/item/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optimistic update
      setCartItems((prev) =>
        //@ts-ignore
        prev.filter((item) => item.product?.id !== productId)
      );
      toast.success("Item removed from cart.");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to remove item from cart."
      );
      console.error("Delete cart item error:", error);
    }
  };

  const handleCheckout = async () => {
    if (!token) return toast.error("User not authenticated");
    if (!shippingAddress.trim()) return toast.error("Please enter a shipping address.");

    try {
      if (paymentMethod === "cash_on_delivery") {
        // COD API call
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`,
          {
            shipping_address: shippingAddress,
            payment_method: "cash_on_delivery",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Order placed successfully (COD)");
        router.push("/order"); // Redirect to orders or confirmation
      } else {
        // Online payment flow
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/create-intent`,
          {
            shipping_address: shippingAddress,
            payment_method: "online",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const clientSecret = response.data.clientSecret;
        if (clientSecret) {
          setClientSecret(clientSecret);
          setOpenModal(true); // ⬅️ Open Stripe Modal
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to place order");
    }
  };




  if (loading) {
    return (
      <div className="bg-white dark:bg-[#1e1e2f] min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center w-full dark:text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1e1e2f] min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full flex flex-col items-center justify-center py-24">
            <img
              src="/images/empty-cart.png"
              alt="Empty cart"
              className="w-64 h-64 mb-6"
            />
            <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-4">
              Your cart is empty!
            </h2>
            <p className="text-gray-500 dark:text-gray-300 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-[#6345ED] text-white rounded hover:bg-purple-600 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1e1e2f] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Shopping Cart Heading */}
        <h1 className="text-xl lg:text-2xl text-black font-bold mb-6 text-center lg:text-left dark:text-white">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shopping Cart Table */}
          <div className="lg:col-span-2">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 text-black border-gray-200">
                    <th className="text-left p-4 text-sm md:text-base text-black dark:text-white">
                      Item
                    </th>
                    <th className="text-left p-4 text-sm md:text-base text-black dark:text-white">
                      Price
                    </th>
                    <th className="text-left p-4 text-sm md:text-base dark:text-white">
                      Qty
                    </th>
                    <th className="text-left p-4 text-sm md:text-base dark:text-white">
                      Subtotal
                    </th>
                    <th className="text-left p-4 text-sm md:text-base dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item: any, index: number) => (
                    <tr key={index} className="border-b-2 border-gray-200">
                      <td className="p-4 sm:flex items-center gap-4 text-purple-500 text-sm md:text-base max-sm:text-[8px]">
                        <Image
                          src={
                            item.product?.product_images?.[0]?.image_url
                              ? item.product.product_images[0].image_url
                              : "/placeholder.jpg"
                          }
                          alt={item.product?.name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                        <span>{item.product?.name}</span>
                      </td>
                      <td className="p-4 font-bold text-purple-500 text-sm md:text-base">
                        <span className="text-xs dark:text-white">AED </span>
                        <span className="dark:text-white">{item.price}</span>
                      </td>

                      <td className="text-black">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          className="w-16  border-none  p-2 text-center rounded text-xs md:text-sm dark:text-black"
                          readOnly
                        />
                      </td>

                      <td className=" text-[#DC39FC] p-4 relative text-sm md:text-base">
                        <span className="text-xs">AED </span>
                        <span>{(item.price * item.quantity).toFixed(2)}</span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => deleteCartItem(item.product?.id)}
                          className="p-4"
                        >
                          <MdDelete color="red" size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => router.push("/")}
                className="text-purple-500 border border-[#DC39FC] px-4 py-2 rounded hover:bg-purple-500 hover:text-white transition text-sm md:text-base"
              >
                Continue Shopping
              </button>
              {/* <button
                onClick={handleUpdateCart}
                className="text-purple-500 border border-[#DC39FC] px-4 py-2 rounded hover:bg-purple-500 hover:text-white transition text-sm md:text-base"
              >
                Update Cart
              </button> */}
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-secondaryColorLight md:text-base dark:text-white">
              Summary
            </h2>
            {/* <div className="w-full h-[2px] bg-gray-300 mb-4"></div> */}
            {/* <div className="mb-4">
              <label
                htmlFor="discountCode"
                className="block text-sm font-medium mb-2 dark:text-white"
              >
                Apply Discount Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="discountCode"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Enter discount code"
                  className="flex-1 border border-gray-300 p-2 rounded text-xs md:text-sm dark:text-black"
                />
                <button className="text-black dark:text-white bg-white dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition text-xs md:text-sm">
                  Apply
                </button>
              </div>
            </div> */}
            <div className="w-full h-[2px]  bg-gray-300 mb-4"></div>
            <div className="space-y-2">
              <div className="flex justify-between text-black">
                <span className="text-xs md:text-sm text-black dark:text-white">
                  Subtotal
                </span>
                <div className="font-bold text-black">
                  {/* <span className="text-xs dark:text-white">AED </span> */}
                  <span className="dark:text-white text-black">
                    AED {subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-xs md:text-sm dark:text-white text-black">
                  Shipping (Fixed)
                </span>
                <div className="font-bold">
                  {/* <span className="text-xs dark:text-white">AED </span> */}
                  <span className="dark:text-white text-black">
                    AED {shippingFee.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="w-full h-[2px] bg-gray-300 mb-4"></div>
              <div className="flex justify-between font-semibold text-sm md:text-lg">
                <span className="dark:text-white text-black">Order Total</span>
                <span className="dark:text-white text-black">
                  AED {orderTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Shipping address input */}
            <div className="mb-4 mt-4">
              <label className="block mb-1 font-semibold text-black dark:text-white">
                Shipping Address
              </label>
              <input
                type="text"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full px-3 py-2 border rounded text-black dark:text-black"
                placeholder="123 Test Street, City, Country"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2 text-black dark:text-white">Select Payment Method:</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-black dark:text-white">
                  <input
                    type="radio"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                  />
                  Online Payment
                </label>
                <label className="flex items-center gap-2 text-sm text-black dark:text-white">
                  <input
                    type="radio"
                    value="cash_on_delivery"
                    checked={paymentMethod === "cash_on_delivery"}
                    onChange={() => setPaymentMethod("cash_on_delivery")}
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>


            <button
              onClick={handleCheckout}
              className="w-full mt-6 text-white bg-[#6345ED] px-4 py-2 rounded hover:bg-purple-600 transition text-sm md:text-base"
            >
              Proceed to Checkout
            </button>

            <button
              className="w-full mt-2 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm md:text-base"
              onClick={clearCart}
            >
              Clear Cart
            </button>

            <StripeCheckoutModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              clientSecret={clientSecret}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

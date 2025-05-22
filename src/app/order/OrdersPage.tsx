"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  profile?: string;
  condition: number;
}

interface OrderItem {
  id: number;
  quantity: number;
  price: string;
  product: Product;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  profile?: string;
}

interface Order {
  id: number;
  total_amount: string;
  order_status: string;
  created_at: string;
  shipping_address: string;
  order_items: OrderItem[];
  users: User;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getConditionText = (condition: number) => {
    switch (condition) {
      case 1:
        return "New";
      case 2:
        return "Used";
      case 3:
        return "Refurbished";
      default:
        return "N/A";
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.order_items.some((item) =>
      item.product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <p>Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">SHOPPING</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold text-lg mb-4">Shop For</h2>
              <ul className="space-y-2">
                <li className="text-gray-600 hover:text-purple-600 cursor-pointer">
                  All Products
                </li>
                <li className="text-gray-600 hover:text-purple-600 cursor-pointer">
                  New Arrivals
                </li>
                <li className="text-gray-600 hover:text-purple-600 cursor-pointer">
                  Best Sellers
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold text-lg mb-4">My Orders</h2>
              <p className="text-sm text-gray-600">
                View and edit all your pending, delivered orders
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold text-lg mb-4">Settings</h2>
              <ul className="space-y-2">
                <li className="text-gray-600 hover:text-purple-600 cursor-pointer">
                  Account Settings
                </li>
                <li className="text-gray-600 hover:text-purple-600 cursor-pointer">
                  Notification Preferences
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold">My Orders</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">
                    {searchQuery
                      ? "No orders match your search."
                      : "You haven't placed any orders yet."}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
                        <div>
                          <span className="font-medium">Order #</span>
                          <span className="font-bold">{order.id}</span>
                          <span className="text-sm text-gray-500 ml-4">
                            {formatDate(order.created_at)}
                          </span>
                        </div>
                        <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                          TRACK ORDER
                        </button>
                      </div>

                      <div className="p-4">
                        {order.order_items.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col md:flex-row gap-4 mb-6 pb-6 border-b last:border-b-0 last:mb-0 last:pb-0"
                          >
                            <div className="flex-shrink-0">
                              <Image
                                src={
                                  item.product.profile
                                    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${item.product.profile}`
                                    : "/placeholder-product.jpg"
                                }
                                alt={item.product.name}
                                width={120}
                                height={120}
                                className="rounded-lg object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <h3 className="font-semibold text-lg">
                                {item.product.name}
                              </h3>
                              <p className="text-sm text-gray-500 mb-2">
                                By: {order.users.first_name}{" "}
                                {order.users.last_name}
                              </p>
                              <p className="text-sm mb-2">
                                {item.product.description}
                              </p>
                              <div className="flex flex-wrap gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">
                                    Condition:{" "}
                                  </span>
                                  <span>
                                    {getConditionText(item.product.condition)}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Qty: </span>
                                  <span>{item.quantity}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Price: </span>
                                  <span className="font-medium">
                                    ${item.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex-shrink-0 md:text-right">
                              <div className="font-bold text-lg">
                                $
                                {(
                                  parseFloat(item.price) * item.quantity
                                ).toFixed(2)}
                              </div>
                              <div className="text-sm capitalize mt-1">
                                Status:{" "}
                                <span
                                  className={`px-2 py-1 rounded ${
                                    order.order_status === "PENDING"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : order.order_status === "DELIVERED"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {order.order_status.toLowerCase()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="flex justify-between items-center mt-4 pt-4 border-t">
                          <div>
                            <span className="text-gray-500">
                              Shipping Address:{" "}
                            </span>
                            <span>{order.shipping_address}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-gray-500 text-sm">
                              Order Total
                            </div>
                            <div className="font-bold text-xl">
                              ${order.total_amount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

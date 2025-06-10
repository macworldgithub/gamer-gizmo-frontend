"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Image from "next/image";
import Drawer from "@mui/material/Drawer";
import OrderDetailsDrawer from "./OrderDetailsDrawer";
import { RootState } from "@/components/Store/Store";
import { useRouter } from "next/navigation";

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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [orderDetailsLoading, setOrderDetailsLoading] = useState(false);
  const router = useRouter();
  const token = useSelector((state: RootState) => state?.user?.token);
  const [deletingOrderId, setDeletingOrderId] = useState<number | null>(null);
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response?.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
      toast.error("Please Login First to see orders");
    }
  }, [token]);

  const fetchOrderDetails = async (orderId: number) => {
    try {
      setOrderDetailsLoading(true);
      const response = await axios.get<Order>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrderDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      toast.error("Failed to load order details");
    } finally {
      setOrderDetailsLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingOrderId(orderId);

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order deleted successfully");
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      if (selectedOrder?.id === orderId) {
        handleDrawerClose();
      }
    } catch (error) {
      console.error("Failed to delete order:", error);
      toast.error("Failed to delete order");
    } finally {
      setDeletingOrderId(null);
      setConfirmingDeleteId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    fetchOrderDetails(order.id);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedOrder(null);
    setOrderDetails(null);
  };

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
  console.log(selectedOrder, "..");
  const handleUpdate = async () => {
    if (!selectedOrder) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${selectedOrder.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            shipping_address: shippingAddress,
          }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();

      toast.success("Shipping address updated!");

      // Update the order in state
      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, shipping_address: shippingAddress }
            : order
        )
      );

      // Optionally update drawer data
      setOrderDetails((prev) =>
        prev ? { ...prev, shipping_address: shippingAddress } : null
      );

      setIsModalOpen(false);
    } catch (err) {
      console.error("Error updating:", err);
      toast.error("Failed to update order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Order</h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-10 rounded-lg  flex flex-col justify-center items-center gap-8">
            <Image
              width={200}
              height={200}
              src="/images/empty-cart.png"
              alt="hj"
            />
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="grid grid-cols-12 font-bold text-black bg-gray-100 p-4 ">
              <div className="col-span-2 ">Order ID</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Customer</div>

              <div className="col-span-2">Date</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-2">Actions</div>
            </div>

            {orders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-12 p-4 border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => handleOrderClick(order)}
              >
                <div className="col-span-2 text-black font-medium">ORD-{order.id}</div>
                <div className="col-span-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${order.order_status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.order_status === "DELIVERED"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                      }`}
                  >
                    {order.order_status.toLowerCase()}
                  </span>
                </div>
                <div className="col-span-2 text-black " >
                  {order.users.first_name} {order.users.last_name}
                </div>
                <div className="col-span-2 text-black">{formatDate(order.created_at)}</div>
                <div className="col-span-2 font-semibold text-black">
                  AED {order.total_amount}
                </div>
                <div
                  className="col-span-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmingDeleteId(order.id);
                    }}
                    className=" py-1 w-14 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                  >
                    Delete
                  </button>
                  {/* <button
                    className=" py-1 w-14 ml-2 bg-custom-gradient text-white rounded text-xs"
                    onClick={(e) => {
                      e.stopPropagation();

                      handleUpdate(order.id);
                    }}
                  >
                    Update
                  </button> */}
                  <button
                    className="py-1 w-14 ml-2 bg-custom-gradient text-white rounded text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOrder(order); // full order object
                      setShippingAddress(order.shipping_address); // preload existing address
                      setIsModalOpen(true);
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerClose}
          PaperProps={{
            sx: {
              width: {
                xs: "80%",
                sm: "75%",
                md: "50%",
                lg: "50%",
                xl: "40%",
              },
              transition: "width 0.3s ease-in-out",
            },
          }}
        >
          <OrderDetailsDrawer
            //@ts-ignore
            order={selectedOrder}
            //@ts-ignore
            orderDetails={orderDetails}
            loading={orderDetailsLoading}
            onClose={handleDrawerClose}
          />
        </Drawer>

        {confirmingDeleteId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this order?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setConfirmingDeleteId(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={(e) =>
                    confirmingDeleteId !== null &&
                    handleDeleteOrder(confirmingDeleteId, e)
                  }
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h2 className="text-lg font-semibold mb-4 text-black">
                Update Shipping Address
              </h2>

              <input
                type="text"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-black mb-4"
                placeholder="Enter new shipping address"
              />

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded text-gray-700 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-secondaryColorLight text-white rounded "
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

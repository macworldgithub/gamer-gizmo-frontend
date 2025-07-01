"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Image from "next/image";
import OrderDetailsDrawer from "./OrderDetailsDrawer";
import { RootState } from "@/components/Store/Store";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Drawer,
} from "@mui/material";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  profile?: string;
  condition: number;
}
interface Transaction {
  id: number;
  order_id: number;
  transaction_id: string;
  transaction_status: string;
  payment_method: string;
  amount: string;
  created_at: string;
  updated_at: string;
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
  transactions: Transaction[];
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
        console.log(response?.data, "orders table data");

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
      console.log("order details", response?.data);
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
    <>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Order</h1>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-10 rounded-lg flex flex-col justify-center items-center gap-8">
              <Image width={200} height={200} src="/images/empty-cart.png" alt="Empty Cart" />
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="orders table">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Order ID</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Customer</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Amount</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => {
                    const status = order.transactions?.[0]?.transaction_status || order.order_status;
                    const statusColor =
                      status === "PENDING"
                        ? "warning"
                        : status === "DELIVERED"
                          ? "success"
                          : "info";

                    return (
                      <TableRow
                        key={order.id}
                        hover
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleOrderClick(order)}
                      >
                        <TableCell>ORD-{order.id}</TableCell>
                        <TableCell>
                          <Chip label={status} color={statusColor} size="small" />
                        </TableCell>
                        <TableCell>{order.users.first_name} {order.users.last_name}</TableCell>
                        <TableCell>{formatDate(order.created_at)}</TableCell>
                        <TableCell><strong>AED {order.total_amount}</strong></TableCell>

                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {/* <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfirmingDeleteId(order.id);
                              }}
                            >
                              DELETE
                            </Button> */}
                            <Button
                              variant="contained"
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOrder(order);
                                setShippingAddress(order.shipping_address);
                                setIsModalOpen(true);
                              }}
                            >
                              UPDATE
                            </Button>
                          </div>
                        </TableCell>

                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Drawer */}
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

          {/* Confirm Delete Modal */}
          {confirmingDeleteId !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                <p className="text-gray-700 mb-6">Are you sure you want to delete this order?</p>
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
                      confirmingDeleteId !== null && handleDeleteOrder(confirmingDeleteId, e)
                    }
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Address Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-lg font-semibold mb-4 text-black">Update Shipping Address</h2>
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black mb-4 dark:text-black"
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
                    className="px-4 py-2 bg-secondaryColorLight text-white rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        hello world
      </div>
    </>

  );
};

export default OrdersPage;

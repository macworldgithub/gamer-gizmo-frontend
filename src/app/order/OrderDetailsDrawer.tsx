import React from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface ProductImage {
  id: number;
  image_url: string;
  product_id: number;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  name: string;
  user_id: number;
  description: string;
  price: string;
  stock: string;
  brand_id: number;
  model_id: number;
  category_id: number;
  is_published: boolean;
  is_verified_by_admin: boolean;
  verified_by: number | null;
  created_at: string;
  show_on_home: boolean;
  top_rated: boolean;
  location: number;
  condition: number;
  other_brand_name: string;
  is_store_product: boolean;
  admin_id: number | null;
  is_featured: boolean;
  feature_start_date: string | null;
  feature_end_date: string | null;
  product_images?: ProductImage[];
}

interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: string;
  created_at: string;
  updated_at: string;
  product: Product;
}

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_seller: boolean;
  is_email_verified: boolean;
  phone: string;
  is_admin_verified: boolean;
  dob: string;
  gender: string;
  nic_front_image: string | null;
  nic_back_image: string | null;
  address: string | null;
  profile: string | null;
  applied_for_verification: boolean;
  is_active: boolean;
  googleId: string | null;
  facebookId: string | null;
  created_at: string;
}

interface Transaction {
  id: number;
  // Add transaction fields as needed
}

interface Order {
  id: number;
  user_id: number;
  total_amount: string;
  order_status: string;
  shipping_address: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
  users: User;
  transactions: Transaction[];
}

interface OrderDetailsDrawerProps {
  order: Order | null;
  orderDetails: Order | null;
  loading: boolean;
  onClose: () => void;
}

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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const OrderDetailsDrawer: React.FC<OrderDetailsDrawerProps> = ({
  order,
  orderDetails,
  loading,
  onClose,
}) => {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Order Details - ORD-{order?.id}</h2>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p>Loading order details...</p>
        </div>
      ) : (
        orderDetails && (
          <div className="space-y-6">
            {/* Customer Information Section */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-4">
                Customer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Name:</span>{" "}
                    {orderDetails.users.first_name}{" "}
                    {orderDetails.users.last_name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Username:</span>{" "}
                    {orderDetails.users.username}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span>{" "}
                    {orderDetails.users.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span>{" "}
                    {orderDetails.users.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">User ID:</span>{" "}
                    {orderDetails.users.id}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Account Type:</span>{" "}
                    {orderDetails.users.is_seller ? "Seller" : "Buyer"}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Joined Date:</span>{" "}
                    {formatDate(orderDetails.users.created_at)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        orderDetails.users.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {orderDetails.users.is_active ? "Active" : "Inactive"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Order ID:</span>{" "}
                    {orderDetails.id}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Order Date:</span>{" "}
                    {formatDate(orderDetails.created_at)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Last Updated:</span>{" "}
                    {formatDate(orderDetails.updated_at)}
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Status:</span>{" "}
                    {/* <span
                      className={`px-2 py-1 rounded text-xs ${orderDetails.order_status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : orderDetails.order_status === "DELIVERED"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                        }`}
                    >
                      {orderDetails.order_status}
                    </span> */}
                    <span
                      //@ts-ignore
                      className={`px-2 py-1 rounded text-xs ${
                        //@ts-ignore
                        (order.transactions?.[0]?.transaction_status ??
                          //@ts-ignore
                          order.order_status) === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : //@ts-ignore
                          (order.transactions?.[0]?.transaction_status ??
                              //@ts-ignore
                              order.order_status) === "DELIVERED"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {/* @ts-ignore */}
                      {order.transactions?.[0]?.transaction_status ??
                        //@ts-ignore
                        order.order_status.toLowerCase()}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Shipping Address:</span>{" "}
                    {orderDetails.shipping_address}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items Section */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-4">
                Order Items ({orderDetails.order_items.length})
              </h3>
              <div className="space-y-4">
                {orderDetails.order_items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src={
                          item.product.product_images?.[0]?.image_url
                            ? item.product.product_images[0].image_url
                            : "/placeholder-product.jpg"
                        }
                        alt={item.product.name}
                        width={120}
                        height={120}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-lg">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.product.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Product ID: </span>
                          <span>{item.product.id}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Condition: </span>
                          <span>
                            {getConditionText(item.product.condition)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Stock: </span>
                          <span>{item.product.stock}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Price: </span>
                          <span>AED {item.price}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Quantity: </span>
                          <span>{item.quantity}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Subtotal: </span>
                          <span>
                            AED{" "}
                            {(parseFloat(item.price) * item.quantity).toFixed(
                              2
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary Section */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-4">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>AED {orderDetails.total_amount}</span>
                </div>
              </div>
            </div>

            {/* Transactions Section */}
            {orderDetails.transactions.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-4">Transactions</h3>
                <div className="space-y-2">
                  {orderDetails.transactions.map((transaction) => (
                    <div key={transaction.id} className="p-3 border rounded-lg">
                      {/* Add transaction details here */}
                      <p>Transaction ID: {transaction.id}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default OrderDetailsDrawer;

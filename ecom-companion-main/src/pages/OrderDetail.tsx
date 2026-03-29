import { useParams, Link, useNavigate } from "react-router-dom";
import { useOrders } from "@/context/OrdersContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, DollarSign, CalendarDays } from "lucide-react";

const OrderDetail = () => {
  const { orderId } = useParams();
  const { orders } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  const order = orders.find((o) => o.id === orderId);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Please log in</h1>
          <Link to="/login">
            <Button variant="amazon">Sign in</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Order not found</h1>
          <Button onClick={() => navigate("/orders")} variant="amazon">
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/orders")}
        className="flex items-center gap-2 text-amazon-orange hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </button>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        {/* Order Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Order #{order.orderNumber}
          </h1>
          <div className="flex flex-col md:flex-row gap-4 mt-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              {order.createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              ${order.total.toFixed(2)}
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-bold ${
                order.status === "delivered"
                  ? "bg-green-100 text-green-800"
                  : order.status === "shipped"
                  ? "bg-blue-100 text-blue-800"
                  : order.status === "confirmed"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Items */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Items in this order</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.productName}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900 font-medium">${order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-900 font-medium">${order.shipping.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between">
            <span className="font-bold text-gray-900">Order Total</span>
            <span className="font-bold text-lg text-gray-900">${order.total.toFixed(2)}</span>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Delivery Address */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Delivery Address
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
            <p className="font-medium text-gray-900">{order.address.fullName}</p>
            <p>{order.address.address}</p>
            <p>
              {order.address.city}, {order.address.state} {order.address.zip}
            </p>
            <p className="mt-2 text-gray-600">Phone: {order.address.phone}</p>
            <p className="text-gray-600">Email: {order.address.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

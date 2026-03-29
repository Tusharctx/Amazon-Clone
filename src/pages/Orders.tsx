import { useOrders } from "@/context/OrdersContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Package, CalendarDays, DollarSign, MapPin, RotateCcw, Eye, UndoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { products } from "@/data/products";

const Orders = () => {
  const { user } = useAuth();
  const { orders, loading } = useOrders();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleReorder = (order: any) => {
    try {
      // Add all items from the order back to cart
      order.items.forEach((item: any) => {
        const product = products.find((p) => p.id === item.productId);
        if (product) {
          addToCart(product, item.quantity);
        }
      });
      toast.success("Order items added to cart!");
      setTimeout(() => navigate("/cart"), 500);
    } catch (error) {
      console.error("Error in reorder:", error);
      toast.error("Failed to add items to cart");
    }
  };

  const handleReturn = (order: any) => {
    try {
      toast.success("Return initiated for order #" + order.orderNumber);
      // In a real app, this would create a return request
    } catch (error) {
      console.error("Error in return:", error);
      toast.error("Failed to initiate return");
    }
  };

  const handleViewDetails = (orderId: string) => {
    try {
      navigate(`/order/${orderId}`);
    } catch (error) {
      console.error("Error navigating to details:", error);
      toast.error("Failed to load order details");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Please log in</h1>
          <p className="text-gray-600 mb-6">You need to be signed in to view your orders.</p>
          <Link
            to="/login"
            className="bg-amazon-orange hover:bg-amazon-orange/80 text-amazon-navy font-bold px-6 py-2 rounded-md transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-[1500px] mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
          <p className="text-gray-600 mt-1">View and manage your order history</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1500px] mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping and your orders will appear here.</p>
            <Link
              to="/products"
              className="bg-amazon-orange hover:bg-amazon-orange/80 text-amazon-navy font-bold px-6 py-2 rounded-md transition-colors inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Order #{order.orderNumber}
                    </h3>
                    <div className="flex flex-col md:flex-row gap-4 mt-2 text-sm text-gray-600">
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
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {order.address.city}, {order.address.state}
                      </div>
                    </div>
                  </div>

                {/* Status Badge and Actions */}
                <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3 items-start md:items-center">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${
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
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handleReorder(order);
                      }}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reorder
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handleViewDetails(order.id);
                      }}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handleReturn(order);
                      }}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <UndoIcon className="w-4 h-4" />
                      Return Items
                    </Button>
                  </div>
                </div>
                </div>

                {/* Items */}
                <div className="mb-4">
                  <h4 className="font-bold text-gray-900 mb-3">Items in this order</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex justify-between items-center text-sm text-gray-700 pb-2 border-b border-gray-100"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{item.productName}</p>
                          <p className="text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900 font-medium">${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900 font-medium">${order.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900 font-medium">${order.shipping.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-bold text-gray-900 mb-2">Delivery Address</h5>
                  <div className="text-sm text-gray-700">
                    <p>{order.address.fullName}</p>
                    <p>{order.address.address}</p>
                    <p>
                      {order.address.city}, {order.address.state} {order.address.zip}
                    </p>
                    <p className="mt-1">{order.address.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

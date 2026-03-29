import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrdersContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Checkout = () => {
  const { items, subtotal, totalItems, clearCart } = useCart();
  const { currency, convertPrice } = useCurrency();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", address: "", city: "", state: "", zip: "", phone: "",
  });

  // Handle Buy Now checkout vs regular cart checkout
  const isBuyNow = location.state?.buyNowProduct;
  const buyNowProduct = location.state?.buyNowProduct;
  const buyNowQuantity = location.state?.buyNowQuantity || 1;
  
  // Use cart items or buy now product
  const checkoutItems = isBuyNow 
    ? [{ product: buyNowProduct, quantity: buyNowQuantity }]
    : items;
  
  const checkoutSubtotal = isBuyNow
    ? buyNowProduct.price * buyNowQuantity
    : subtotal;
  
  const checkoutTotalItems = isBuyNow
    ? buyNowQuantity
    : totalItems;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.fullName || !form.email || !form.address || !form.city || !form.state || !form.zip) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!user) {
      toast.error("Please log in to place an order");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const TAX_RATE = 0.08; // 8% tax
      const tax = checkoutSubtotal * TAX_RATE;
      const shipping = checkoutSubtotal > 50 ? 0 : 5; // Free shipping over $50
      const total = checkoutSubtotal + tax + shipping;

      const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;

      const orderData = {
        orderNumber,
        items: checkoutItems.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        subtotal: checkoutSubtotal,
        tax,
        shipping,
        total,
        address: {
          fullName: form.fullName,
          email: form.email,
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          phone: form.phone,
        },
        status: "confirmed" as const,
      };

      const orderId = await addOrder(orderData);
      // Only clear cart if it's a regular checkout, not Buy Now
      if (!isBuyNow) {
        clearCart();
      }
      toast.success("Order placed successfully!");
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isBuyNow && items.length === 0) {
    navigate("/cart");
    return null;
  }

  const TAX_RATE = 0.08;
  const tax = checkoutSubtotal * TAX_RATE;
  const shipping = checkoutSubtotal > 50 ? 0 : 5;
  const total = checkoutSubtotal + tax + shipping;

  return (
    <div className="max-w-[900px] mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-card border border-border rounded-sm p-6">
              <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-bold block mb-1">Full Name *</label>
                  <Input name="fullName" value={form.fullName} onChange={handleChange} required />
                </div>
                <div>
                  <label className="text-sm font-bold block mb-1">Email *</label>
                  <Input type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div>
                  <label className="text-sm font-bold block mb-1">Address *</label>
                  <Input name="address" value={form.address} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-bold block mb-1">City *</label>
                    <Input name="city" value={form.city} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="text-sm font-bold block mb-1">State *</label>
                    <Input name="state" value={form.state} onChange={handleChange} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-bold block mb-1">ZIP Code *</label>
                    <Input name="zip" value={form.zip} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="text-sm font-bold block mb-1">Phone</label>
                    <Input name="phone" value={form.phone} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-card border border-border rounded-sm p-4 space-y-3 sticky top-[120px]">
              <Button type="submit" disabled={loading} variant="amazon" className="w-full">
                {loading ? "Placing order..." : "Place your order"}
              </Button>
              <hr className="border-border" />
              <h3 className="font-bold text-base">Order Summary</h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal ({checkoutTotalItems}):</span>
                  <span>{currency.symbol}{convertPrice(checkoutSubtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%):</span>
                  <span>{currency.symbol}{convertPrice(tax).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-amazon-success">FREE</span>
                    ) : (
                      `${currency.symbol}${convertPrice(shipping).toFixed(2)}`
                    )}
                  </span>
                </div>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between font-bold text-lg text-destructive">
                <span>Order total:</span>
                <span>{currency.symbol}{convertPrice(total).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;

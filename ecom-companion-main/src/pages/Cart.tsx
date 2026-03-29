import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, subtotal, totalItems, clearCart } = useCart();
  const { currency, convertPrice } = useCurrency();

  if (items.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-10">
        <div className="bg-card border border-border rounded-sm p-8">
          <h1 className="text-2xl font-bold mb-2">Your Shopping Cart is empty</h1>
          <p className="text-muted-foreground mb-4">Browse our products and add items to your cart.</p>
          <Link to="/">
            <Button variant="amazon">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cart items */}
        <div className="lg:col-span-9">
          <div className="bg-card border border-border rounded-sm p-6">
            <h1 className="text-2xl font-bold border-b border-border pb-4 mb-4">Shopping Cart</h1>
            <p className="text-sm text-right text-muted-foreground mb-2">Price</p>
            <div className="divide-y divide-border">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 py-4">
                  <Link to={`/product/${product.id}`} className="flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-[180px] h-[180px] object-contain bg-white rounded-sm p-2"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${product.id}`} className="amazon-link text-base line-clamp-2">
                      {product.name}
                    </Link>
                    <p className={`text-xs mt-1 font-medium ${product.stock > 0 ? "text-amazon-success" : "text-destructive"}`}>
                      In Stock
                    </p>
                    {product.prime && (
                      <span className="text-xs font-bold text-amazon-link">prime</span>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-border rounded-md overflow-hidden">
                        <select
                          value={quantity}
                          onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                          className="px-2 py-1 text-sm bg-muted border-none focus:outline-none"
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>Qty: {n}</option>
                          ))}
                        </select>
                      </div>
                      <span className="text-border">|</span>
                      <button
                        onClick={() => {
                          removeFromCart(product.id);
                          toast.info("Item removed from cart");
                        }}
                        className="amazon-link text-xs flex items-center gap-1 hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="font-bold text-lg">{currency.symbol}{convertPrice(product.price * quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right pt-4 text-lg">
              Subtotal ({totalItems} items): <span className="font-bold">{currency.symbol}{convertPrice(subtotal).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout sidebar */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-sm p-4 space-y-3 sticky top-[120px]">
            <p className="text-sm text-amazon-success flex items-center gap-1">
              ✓ Your order qualifies for FREE Shipping
            </p>
            <p className="text-lg">
              Subtotal ({totalItems} items):{" "}
              <span className="font-bold">{currency.symbol}{convertPrice(subtotal).toFixed(2)}</span>
            </p>
            <Link to="/checkout">
              <Button variant="amazon" className="w-full">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

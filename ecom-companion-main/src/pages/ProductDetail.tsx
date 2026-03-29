import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import StarRating from "@/components/StarRating";
import PriceDisplay from "@/components/PriceDisplay";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Product not found</h1>
        <Link to="/" className="amazon-link">Back to shopping</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login first to add items to cart");
      navigate("/login");
      return;
    }
    
    addToCart(product, quantity);
    toast.success(`Added ${quantity} × "${product.name}" to cart`);
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please login first to place an order");
      navigate("/login");
      return;
    }
    
    toast.success(`Proceeding to checkout with ${quantity} × "${product.name}"`);
    // Pass product and quantity via state, don't modify cart
    navigate("/checkout", { 
      state: { 
        buyNowProduct: product, 
        buyNowQuantity: quantity 
      } 
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <nav className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="amazon-link">Home</Link>
        <span className="mx-2">›</span>
        <Link to={`/?search=`} className="amazon-link">{product.category}</Link>
        <span className="mx-2">›</span>
        <span className="text-foreground">{product.name.substring(0, 40)}...</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Image */}
        <div className="md:col-span-5">
          <div className="bg-white rounded-sm border border-border p-6 aspect-square flex items-center justify-center sticky top-[120px]">
            <img src={product.images[0]} alt={product.name} className="max-h-full max-w-full object-contain" />
          </div>
        </div>

        {/* Details */}
        <div className="md:col-span-4 space-y-3">
          <h1 className="text-xl font-normal leading-tight">{product.name}</h1>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
          <hr className="border-border" />
          <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="lg" />
          {product.prime && (
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-amazon-link">prime</span>
              <span className="text-sm text-muted-foreground">FREE delivery</span>
            </div>
          )}
          <hr className="border-border" />
          <div>
            <h3 className="font-bold text-sm mb-2">About this item</h3>
            <p className="text-sm leading-relaxed text-foreground">{product.description}</p>
          </div>
          {product.specs && (
            <div>
              <h3 className="font-bold text-sm mb-2">Specifications</h3>
              <table className="text-sm w-full">
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key} className="border-t border-border">
                      <td className="py-1.5 pr-4 font-medium text-muted-foreground">{key}</td>
                      <td className="py-1.5">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Buy box */}
        <div className="md:col-span-3">
          <div className="border border-border rounded-lg p-4 space-y-3 sticky top-[120px]">
            <PriceDisplay price={product.price} size="md" />
            {product.prime && (
              <p className="text-sm">
                <span className="font-bold text-amazon-link">prime</span>{" "}
                <span className="text-muted-foreground">FREE delivery</span>
              </p>
            )}
            <p className={`text-lg font-medium ${product.stock > 0 ? "text-amazon-success" : "text-destructive"}`}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            {product.stock > 0 && (
              <>
                <div className="flex items-center gap-2">
                  <label className="text-sm">Qty:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-border rounded-md px-2 py-1 text-sm bg-card"
                  >
                    {Array.from({ length: Math.min(10, product.stock) }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <Button variant="amazon" className="w-full" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button variant="amazon-cart" className="w-full" onClick={handleBuyNow}>
                  Buy Now
                </Button>
              </>
            )}

            <div className="space-y-2 pt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 flex-shrink-0" />
                <span>Free delivery on orders over $25</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 flex-shrink-0" />
                <span>Free 30-day returns</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Secure transaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

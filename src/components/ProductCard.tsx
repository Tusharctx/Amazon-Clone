import { Link, useNavigate } from "react-router-dom";
import { Product } from "@/data/products";
import StarRating from "./StarRating";
import PriceDisplay from "./PriceDisplay";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login first to add items to cart");
      navigate("/login");
      return;
    }
    
    addToCart(product);
    toast.success(`Added "${product.name}" to cart`);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card flex flex-col">
      <div className="aspect-square bg-white p-4 flex items-center justify-center">
        <img
          src={product.images[0]}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="p-3 flex flex-col flex-1 gap-1">
        <h3 className="text-sm leading-tight line-clamp-2 amazon-link font-normal">
          {product.name}
        </h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="sm" />
        {product.prime && (
          <span className="text-xs font-bold text-amazon-link">
            prime
          </span>
        )}
        <p className="text-xs text-amazon-success font-medium">
          {product.stock > 50 ? "In Stock" : `Only ${product.stock} left`}
        </p>
        <Button variant="amazon" size="sm" className="mt-auto w-full" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;

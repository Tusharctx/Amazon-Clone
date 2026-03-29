import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lightbulb, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Recommendations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in</h1>
          <Button onClick={() => navigate("/login")} variant="amazon">
            Sign in
          </Button>
        </div>
      </div>
    );
  }

  // Get random products based on browsing history
  const recommendedProducts = products.slice(0, 8);

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <Lightbulb className="w-8 h-8 text-amazon-yellow" />
          Recommendations For You
        </h1>
        <p className="text-gray-600">Based on your browsing history and purchases</p>
      </div>

      {recommendedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {recommendedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No recommendations yet</h2>
          <p className="text-gray-600 mb-6">Start browsing to get personalized recommendations</p>
          <Button onClick={() => navigate("/products")} variant="amazon">
            Explore Products
          </Button>
        </div>
      )}
    </div>
  );
};

export default Recommendations;

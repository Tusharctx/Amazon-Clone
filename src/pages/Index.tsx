import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import CategorySidebar from "@/components/CategorySidebar";

const Index = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || null;
  const dealsParam = searchParams.get("deals") || null;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesDeals = !dealsParam || (p.originalPrice && p.originalPrice > p.price);
      return matchesSearch && matchesCategory && matchesDeals;
    });
  }, [searchQuery, selectedCategory, dealsParam]);

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-4">
      <div className="text-sm text-muted-foreground mb-3">
        <Link to="/" className="amazon-link">Home</Link> &gt; <span className="text-foreground font-medium">{selectedCategory || "All Products"}</span>
      </div>
      <div className="flex gap-6">
        <CategorySidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        <div className="flex-1">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold">
                {dealsParam ? "Today's Deals" : selectedCategory || "All Products"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {searchQuery ? `Results for "${searchQuery}" — ` : ""}
                {dealsParam && !selectedCategory ? "Limited-time offers" : ""}
                {filteredProducts.length} results
              </p>
            </div>
          </div>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No products found.</p>
              <p className="text-sm text-muted-foreground mt-1">Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;

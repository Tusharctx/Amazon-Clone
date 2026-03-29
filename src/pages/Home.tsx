import { Link } from "react-router-dom";
import { products, categories } from "@/data/products";
import { useCurrency } from "@/context/CurrencyContext";
import ProductCard from "@/components/ProductCard";
import { ChevronRight } from "lucide-react";

const heroBanners = [
  {
    title: "Great Indian Festival",
    subtitle: "Up to 70% off on Electronics, Fashion & more",
    bg: "from-[hsl(var(--amazon-navy))] to-[hsl(210,20%,25%)]",
    cta: "Shop Now",
    link: "/products",
  },
];

const Home = () => {
  const { currency, convertPrice } = useCurrency();

  const dealCategories = [
    {
      title: "Up to 40% off | Electronics",
      items: products.filter((p) => p.category === "Electronics").slice(0, 4),
    },
    {
      title: `Starting ${currency.symbol}${Math.round(convertPrice(79))} | Books & More`,
      items: products.filter((p) => p.category === "Books" || p.category === "Toys & Games").slice(0, 4),
    },
    {
      title: "Min. 50% off | Home & Kitchen",
      items: products.filter((p) => p.category === "Home & Kitchen" || p.category === "Sports & Outdoors").slice(0, 4),
    },
    {
      title: "Best in Computers",
      items: products.filter((p) => p.category === "Computers").slice(0, 4),
    },
  ];

  const topDeals = products.filter((p) => p.originalPrice).sort((a, b) => {
    const discA = ((a.originalPrice! - a.price) / a.originalPrice!) * 100;
    const discB = ((b.originalPrice! - b.price) / b.originalPrice!) * 100;
    return discB - discA;
  }).slice(0, 6);

  return (
    <div className="bg-muted">
      {/* Hero Banner Image */}
      <Link to={heroBanners[0].link} className="block w-full">
        <div className="w-full overflow-hidden bg-gray-900">
          <img 
            src="/Diwali-sale.jpg" 
            alt="Diwali Sale Banner"
            className="w-full h-auto object-cover hover:opacity-90 transition-opacity cursor-pointer"
          />
        </div>
      </Link>

      {/* Category Cards Grid */}
      <div className="max-w-[1500px] mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {dealCategories.map((section) => (
            <div key={section.title} className="bg-card rounded-sm p-5 shadow-sm">
              <h2 className="text-base font-bold text-foreground mb-3 line-clamp-1">{section.title}</h2>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {section.items.map((item) => (
                  <Link key={item.id} to={`/product/${item.id}`} className="block">
                    <div className="aspect-square bg-white rounded-sm overflow-hidden p-2 border border-border">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{item.name}</p>
                  </Link>
                ))}
              </div>
              <Link to="/products" className="amazon-link text-sm font-medium">
                See all deals
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Deals */}
      <section className="max-w-[1500px] mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Today's Deals</h2>
          <Link to="/products" className="amazon-link text-sm flex items-center gap-1">
            See all deals <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {topDeals.map((product) => {
            const discount = Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100);
            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="flex-shrink-0 w-48 bg-card rounded-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-square bg-white p-3">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" loading="lazy" />
                  <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded-sm">
                    {discount}% off
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-xs text-destructive font-bold">Deal of the Day</p>
                  <p className="text-sm font-medium text-foreground line-clamp-2 mt-1">{product.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Browse by Category */}
      <section className="max-w-[1500px] mx-auto px-4 pb-8">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="bg-card rounded-sm border border-border p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center text-lg">
                {cat.charAt(0)}
              </div>
              <p className="text-xs font-medium text-foreground line-clamp-2">{cat}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recommended Products */}
      <section className="max-w-[1500px] mx-auto px-4 pb-8">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Recommended for you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

import { Search, ShoppingCart, MapPin, Menu, ChevronDown, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useCurrency, CURRENCIES } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

const Navbar = () => {
  const { totalItems } = useCart();
  const { country, setCurrency } = useCurrency();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategorySidebar, setShowCategorySidebar] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const categories = ["All Categories", "Electronics", "Fashion", "Home & Kitchen", "Sports & Outdoors", "Books"];
  const navLinks = [
    { label: "Today's Deals", action: () => { navigate("/products?deals=true"); setShowCategorySidebar(false); } },
    { label: "Customer Service", action: () => { navigate("/customer-service"); setShowCategorySidebar(false); } },
    { label: "Gift Cards", action: () => toast.info("Gift Cards - Coming Soon!") },
    { label: "Registry", action: () => toast.info("Registry - Coming Soon!") },
    { label: "Sell", action: () => toast.info("Become a Seller - Coming Soon!") },
  ];

  const sidebarSections = [
    {
      title: "Trending",
      items: [
        { label: "Bestsellers" },
        { label: "New Releases" },
        { label: "Movers and Shakers" },
      ],
    },
    {
      title: "Digital Content and Devices",
      items: [
        { label: "Echo & Alexa" },
        { label: "Fire TV" },
        { label: "Kindle E-Readers & eBooks" },
        { label: "Audible Audiobooks" },
        { label: "Amazon Prime Video" },
        { label: "Amazon Prime Music" },
      ],
    },
    {
      title: "Shop by Category",
      items: [
        { label: "Electronics", category: "Electronics" },
        { label: "Fashion", category: "Fashion" },
        { label: "Home & Kitchen", category: "Home & Kitchen" },
        { label: "Sports & Outdoors", category: "Sports & Outdoors" },
        { label: "Books", category: "Books" },
      ],
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main header */}
      <div className="amazon-header px-2 sm:px-3 md:px-4 lg:px-6 py-2">
        <div className="max-w-full mx-auto flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 px-1 sm:px-2 py-1 border border-transparent hover:border-white rounded-sm">
            <img 
              src="/amazon-logo.png" 
              alt="Amazon Logo" 
              className="h-6 sm:h-7 md:h-[29.4px] object-contain"
            />
          </Link>

          {/* Deliver to */}
          <div 
            ref={dropdownRef}
            className="hidden md:block relative flex-shrink-0"
          >
            <button 
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="flex items-center gap-1 px-1 md:px-2 py-1 border border-transparent hover:border-white rounded-sm cursor-pointer"
            >
              <MapPin className="w-4 md:w-5 h-4 md:h-5 text-white" />
              <div className="text-left hidden sm:block">
                <p className="text-[10px] md:text-[11px] text-gray-300 leading-none">Deliver to</p>
                <p className="text-xs md:text-sm font-bold text-white leading-tight">{country}</p>
              </div>
              <ChevronDown className="w-3 md:w-4 h-3 md:h-4 text-white hidden sm:block" />
            </button>

            {/* Dropdown menu */}
            {showCountryDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-sm shadow-lg z-50 min-w-[250px] md:min-w-[280px] border border-gray-200">
                <div className="p-2 md:p-3 border-b border-gray-200">
                  <p className="text-xs font-bold text-gray-900 mb-2 md:mb-3">Select delivery country:</p>
                  {Object.entries(CURRENCIES).map(([code, currency]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(currency, currency.label);
                        setShowCountryDropdown(false);
                      }}
                      className="w-full text-left px-2 md:px-3 py-1.5 md:py-2 hover:bg-gray-100 rounded text-xs md:text-sm text-gray-900 font-medium transition-colors"
                    >
                      <span className="font-bold">{currency.label}</span>
                      <span className="text-gray-600 text-xs ml-2">({currency.symbol})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search bar - Responsive width */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 flex min-w-0 md:min-w-[200px]">
            <div className="flex w-full rounded-md overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="hidden md:block flex-1 px-3 md:px-4 py-2 text-xs md:text-sm text-foreground focus:outline-none min-w-0"
              />
              <button
                type="submit"
                className="bg-amazon-orange hover:bg-amazon-orange/80 px-2 md:px-3 flex items-center justify-center flex-shrink-0"
              >
                <Search className="w-4 md:w-5 h-4 md:h-5 text-amazon-navy" />
              </button>
            </div>
          </form>

          {/* Mobile Search Button */}
          <button 
            onClick={() => navigate("/products")}
            className="sm:hidden flex-shrink-0 bg-amazon-orange hover:bg-amazon-orange/80 p-2 rounded-md ml-auto"
          >
            <Search className="w-4 h-4 text-amazon-navy" />
          </button>

          {/* Account */}
          {user ? (
            <div className="hidden md:block relative group flex-shrink-0">
              <div className="px-1 md:px-2 py-1 border border-transparent hover:border-white rounded-sm cursor-pointer">
                <p className="text-[10px] md:text-[11px] text-gray-300 leading-none">Hello, {user.displayName || user.email?.split('@')[0]}</p>
                <p className="text-xs md:text-sm font-bold text-white leading-tight whitespace-nowrap">Account & Lists</p>
              </div>
              
              {/* Dropdown Menu - Expanded */}
              <div className="absolute right-0 mt-0 w-80 md:w-96 bg-white rounded-sm shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 max-h-[600px] overflow-y-auto">
                {/* Header */}
                <div className="p-2 md:p-3 border-b border-gray-200">
                  <p className="font-bold text-gray-900 text-xs md:text-sm mb-1 md:mb-2">Signed in as:</p>
                  <p className="text-xs text-gray-600 mb-2 md:mb-3">{user.email}</p>
                  <button
                    onClick={async () => {
                      await logout();
                      toast.success("Logged out successfully!");
                    }}
                    className="w-full bg-amazon-orange hover:bg-amazon-orange/80 text-amazon-navy font-bold py-1 md:py-1.5 px-2 md:px-3 rounded text-xs md:text-sm transition-colors"
                  >
                    Sign Out
                  </button>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-2 gap-2 md:gap-4 p-2 md:p-4">
                  {/* Left Column: Your Lists */}
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs md:text-sm mb-2 md:mb-3">Your Lists</h3>
                    <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
                      <button 
                        onClick={() => {
                          navigate("/wishlists");
                          document.querySelector("[data-close-dropdown]")?.click?.();
                        }}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Alexa Shopping List<br/>
                        <span className="text-xs text-gray-600">1 item</span>
                      </button>
                      <button 
                        onClick={() => {
                          navigate("/wishlists");
                          document.querySelector("[data-close-dropdown]")?.click?.();
                        }}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Shopping List
                      </button>
                      <button 
                        onClick={() => {
                          navigate("/wishlists");
                          document.querySelector("[data-close-dropdown]")?.click?.();
                        }}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Create a Wish List
                      </button>
                      <button 
                        onClick={() => toast.info("Wish from Any Website - Coming Soon!")}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Wish from Any Website
                      </button>
                      <button 
                        onClick={() => {
                          navigate("/wishlists");
                          document.querySelector("[data-close-dropdown]")?.click?.();
                        }}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Baby Wishlist
                      </button>
                      <button 
                        onClick={() => toast.info("Discover Your Style - Coming Soon!")}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Discover Your Style
                      </button>
                      <button 
                        onClick={() => toast.info("Explore Showroom - Coming Soon!")}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Explore Showroom
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Your Account */}
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-3">Your Account</h3>
                    <div className="space-y-2 text-sm">
                      <button 
                        onClick={() => toast.info("Switch Accounts - Coming Soon!")}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Switch Accounts
                      </button>
                      <button 
                        onClick={() => {
                          navigate("/your-account");
                          document.querySelector("[data-close-dropdown]")?.click?.();
                        }}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Your Account
                      </button>
                      <button 
                        onClick={() => {
                          navigate("/orders");
                          document.querySelector("[data-close-dropdown]")?.click?.();
                        }}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Your Orders
                      </button>
                      <button 
                        onClick={() => {
                          navigate("/wishlists");
                          document.querySelector("[data-close-dropdown]")?.click?.();
                        }}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Your Wish List
                      </button>
                      <button 
                        onClick={() => toast.info("Keep shopping for - Coming Soon!")}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Keep shopping for
                      </button>
                      <button 
                        onClick={() => {
                          navigate("/recommendations");
                          document.querySelector("[data-close-dropdown]")?.click?.();
                        }}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Your Recommendations
                      </button>
                      <button 
                        onClick={() => {
                          navigate("/orders");
                          document.querySelector("[data-close-dropdown]")?.click?.();
                        }}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Returns
                      </button>
                      <button 
                        onClick={() => toast.info("Recalls and Product Safety Alerts - Coming Soon!")}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors text-xs"
                      >
                        Recalls and Product<br/>Safety Alerts
                      </button>
                      <button 
                        onClick={() => {
                          navigate("/prime");
                          document.querySelector("[data-close-dropdown]")?.click?.();
                        }}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Your Prime Membership
                      </button>
                      <button 
                        onClick={() => toast.info("Your Prime Video - Coming Soon!")}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Your Prime Video
                      </button>
                      <button 
                        onClick={() => toast.info("Your Subscribe & Save Items - Coming Soon!")}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors text-xs"
                      >
                        Your Subscribe & Save<br/>Items
                      </button>
                      <button 
                        onClick={() => toast.info("Memberships & Subscriptions - Coming Soon!")}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors text-xs"
                      >
                        Memberships &<br/>Subscriptions
                      </button>
                      <button 
                        onClick={() => toast.info("Your Seller Account - Coming Soon!")}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Your Seller Account
                      </button>
                      <button 
                        onClick={() => toast.info("Content Library - Coming Soon!")}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Content Library
                      </button>
                      <button 
                        onClick={() => {
                          navigate("/devices");
                          document.querySelector("[data-close-dropdown]")?.click?.();
                        }}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors"
                      >
                        Devices
                      </button>
                      <button 
                        onClick={() => toast.info("Register for a free Business Account - Coming Soon!")}
                        className="w-full text-left text-amazon-navy hover:bg-gray-100 py-1.5 px-2 rounded transition-colors text-xs"
                      >
                        Register for a free<br/>Business Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:block px-1 md:px-2 py-1 border border-transparent hover:border-white rounded-sm flex-shrink-0"
            >
              <p className="text-[10px] md:text-[11px] text-gray-300 leading-none">Hello, sign in</p>
              <p className="text-xs md:text-sm font-bold text-white leading-tight whitespace-nowrap">Account & Lists</p>
            </Link>
          )}

          {/* Orders - Hidden on mobile, visible on lg */}
          <button 
            onClick={() => {
              if (!user) {
                navigate("/login");
              } else {
                navigate("/orders");
              }
            }}
            className="hidden lg:flex lg:flex-col px-1 md:px-2 py-1 border border-transparent hover:border-white rounded-sm flex-shrink-0 items-start"
          >
            <p className="text-[10px] md:text-[11px] text-gray-300 leading-none">Returns</p>
            <p className="text-xs md:text-sm font-bold text-white leading-tight whitespace-nowrap">& Orders</p>
          </button>

          {/* Cart - Responsive */}
          <Link
            to="/cart"
            className="flex items-end gap-0.5 md:gap-1 px-1 md:px-2 py-1 border border-transparent hover:border-white rounded-sm relative flex-shrink-0 ml-auto md:ml-0"
          >
            <div className="relative">
              <ShoppingCart className="w-6 md:w-8 h-6 md:h-8 text-white" />
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-amazon-orange font-bold text-sm md:text-base">
                {totalItems}
              </span>
            </div>
            <span className="text-xs md:text-sm font-bold text-white hidden md:inline whitespace-nowrap">Cart</span>
          </Link>
        </div>
      </div>

      {/* Sub header - Responsive */}
      <div className="amazon-header-bottom px-2 sm:px-3 md:px-4 lg:px-6 py-1.5">
        <div className="max-w-full mx-auto flex items-center gap-1 text-xs sm:text-sm text-white overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setShowCategorySidebar(!showCategorySidebar)}
            className="flex items-center gap-1 px-1.5 sm:px-2 py-1 border border-transparent hover:border-white rounded-sm whitespace-nowrap font-bold transition-colors text-xs md:text-sm flex-shrink-0"
          >
            <Menu className="w-4 md:w-5 h-4 md:h-5" /> All
          </button>
          {navLinks.map((link) => (
            <button 
              key={link.label}
              onClick={link.action}
              className="px-1.5 sm:px-2 py-1 border border-transparent hover:border-white rounded-sm whitespace-nowrap transition-colors text-xs md:text-sm flex-shrink-0"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Sidebar */}
      {showCategorySidebar && (
        <div className="fixed inset-0 z-40">
          {/* Overlay with fade animation */}
          <div 
            className="absolute inset-0 bg-black/50 animate-in fade-in duration-300"
            onClick={() => setShowCategorySidebar(false)}
          />
          
          {/* Sidebar with slide-in animation */}
          <div className="absolute top-0 left-0 w-80 md:w-96 bg-white text-foreground shadow-2xl z-50 h-screen overflow-y-auto animate-in slide-in-from-left duration-300 ease-out">
            {/* Sign in header */}
            <div className="bg-amazon-navy text-white p-3 md:p-4 flex items-center gap-2 md:gap-3 sticky top-0">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0">
                <span className="text-base md:text-lg">👤</span>
              </div>
              <span className="font-bold text-base md:text-lg">
                {user ? `Hello, ${user.displayName || user.email?.split('@')[0]}` : "Hello, sign in"}
              </span>
            </div>

            {/* Menu sections */}
            {sidebarSections.map((section) => (
              <div key={section.title} className="border-b border-gray-200">
                <div className="p-3 md:p-4">
                  <h3 className="text-sm md:text-base font-bold mb-2 md:mb-3 text-gray-900">{section.title}</h3>
                  <div className="space-y-1 md:space-y-2">
                    {section.items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          if (item.category) {
                            navigate(`/products?category=${encodeURIComponent(item.category)}`);
                          } else if (item.label === "Bestsellers") {
                            navigate("/products?sort=bestsellers");
                          } else if (item.label === "New Releases") {
                            navigate("/products?sort=new");
                          } else {
                            navigate("/products");
                          }
                          setShowCategorySidebar(false);
                        }}
                        className="w-full text-left px-2 md:px-3 py-1.5 md:py-2 hover:bg-gray-100 rounded text-xs md:text-sm text-gray-700 font-medium flex items-center justify-between group transition-colors"
                      >
                        <span>{item.label}</span>
                        <span className="text-gray-400 group-hover:text-gray-600">›</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

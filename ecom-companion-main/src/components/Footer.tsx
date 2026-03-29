import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full py-3 text-sm text-white bg-amazon-navy-light hover:bg-amazon-navy-light/80 transition-colors"
      >
        Back to top
      </button>
      <div className="amazon-header py-10 px-4">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { title: "Get to Know Us", links: ["Careers", "Blog", "About Us", "Investor Relations"] },
            { title: "Make Money with Us", links: ["Sell products", "Become an Affiliate", "Advertise", "Self-Publish"] },
            { title: "Payment Products", links: ["Business Card", "Shop with Points", "Reload Your Balance", "Currency Converter"] },
            { title: "Let Us Help You", links: ["Your Account", "Your Orders", "Shipping Policies", "Returns & Replacements"] },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-white text-sm mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link to="/" className="text-gray-300 text-xs hover:underline">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-amazon-navy py-4 text-center">
        <p className="text-gray-400 text-xs">© 2026 Shop.io — Demo E-commerce Store</p>
      </div>
    </footer>
  );
};

export default Footer;

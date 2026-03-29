import { categories } from "@/data/products";

interface CategorySidebarProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategorySidebar = ({ selectedCategory, onSelectCategory }: CategorySidebarProps) => {
  return (
    <aside className="w-56 flex-shrink-0 hidden lg:block">
      <div className="sticky top-[105px]">
        <h3 className="font-bold text-base mb-2">Department</h3>
        <ul className="space-y-0.5">
          <li>
            <button
              onClick={() => onSelectCategory(null)}
              className={`text-sm w-full text-left px-2 py-1 rounded-sm transition-colors ${
                selectedCategory === null ? "font-bold text-foreground" : "amazon-link"
              }`}
            >
              All Departments
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => onSelectCategory(cat)}
                className={`text-sm w-full text-left px-2 py-1 rounded-sm transition-colors ${
                  selectedCategory === cat ? "font-bold text-foreground" : "amazon-link"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default CategorySidebar;

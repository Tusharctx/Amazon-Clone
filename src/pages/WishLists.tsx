import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

const WishLists = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [wishlists, setWishlists] = useState([
    { id: 1, name: "Alexa Shopping List", items: 1 },
    { id: 2, name: "Shopping List", items: 0 },
  ]);

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

  const handleCreateList = () => {
    toast.info("Create new wishlist - Coming Soon!");
  };

  const handleDeleteList = (id: number) => {
    setWishlists(wishlists.filter(list => list.id !== id));
    toast.success("Wishlist deleted");
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Heart className="w-8 h-8 text-red-500" />
          Your Lists
        </h1>
        <Button onClick={handleCreateList} variant="amazon" className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create New List
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlists.map(list => (
          <div key={list.id} className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-2">{list.name}</h3>
            <p className="text-gray-600 mb-4">{list.items} item{list.items !== 1 ? 's' : ''}</p>
            <div className="flex gap-2">
              <Button 
                onClick={() => toast.info(`View ${list.name} - Coming Soon!`)}
                variant="outline" 
                className="flex-1"
              >
                View List
              </Button>
              <Button 
                onClick={() => handleDeleteList(list.id)}
                variant="destructive"
                size="sm"
                className="flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {wishlists.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No wishlists yet</h2>
          <p className="text-gray-600 mb-6">Create your first wishlist to save items you love</p>
          <Button onClick={handleCreateList} variant="amazon">
            Create Your First List
          </Button>
        </div>
      )}
    </div>
  );
};

export default WishLists;

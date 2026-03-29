import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown, Check } from "lucide-react";
import { toast } from "sonner";

const PrimeMembership = () => {
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

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Crown className="w-8 h-8 text-amazon-yellow" />
          Prime Membership
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Plan */}
        <div className="bg-white border-2 border-amazon-orange p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Your Membership</h2>
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Free & Fast Delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Prime Video Access</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Prime Music</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Exclusive Deals</span>
            </div>
          </div>
          <Button 
            onClick={() => toast.info("Manage Prime - Coming Soon!")}
            variant="amazon"
            className="w-full"
          >
            Manage Membership
          </Button>
        </div>

        {/* Benefits */}
        <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Prime Benefits</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-gray-900">Free Shipping</h3>
              <p className="text-sm text-gray-600">On millions of items</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Prime Video</h3>
              <p className="text-sm text-gray-600">Thousands of movies & shows</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Prime Music</h3>
              <p className="text-sm text-gray-600">2 million songs ad-free</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Exclusive Deals</h3>
              <p className="text-sm text-gray-600">Early access to sales</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimeMembership;

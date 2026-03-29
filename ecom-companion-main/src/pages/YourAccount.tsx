import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin } from "lucide-react";

const YourAccount = () => {
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
      <h1 className="text-3xl font-bold mb-8">Your Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Information */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <User className="w-6 h-6" />
            Account Information
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Email Address</p>
              <p className="text-lg font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Account Created</p>
              <p className="text-lg font-medium">{new Date(user.metadata?.creationTime || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Button onClick={() => navigate("/orders")} variant="outline" className="w-full justify-start">
              View Your Orders
            </Button>
            <Button onClick={() => navigate("/")} variant="outline" className="w-full justify-start">
              Continue Shopping
            </Button>
            <Button onClick={() => navigate("/cart")} variant="outline" className="w-full justify-start">
              View Your Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourAccount;

import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Smartphone, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const Devices = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [devices] = useState([
    { id: 1, name: "Mobile Phone", type: "Phone", lastUsed: "Today" },
    { id: 2, name: "Laptop", type: "Computer", lastUsed: "2 days ago" },
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

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Smartphone className="w-8 h-8" />
          Your Devices
        </h1>
        <Button 
          onClick={() => toast.info("Register new device - Coming Soon!")}
          variant="amazon"
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Device
        </Button>
      </div>

      <div className="space-y-4">
        {devices.map(device => (
          <div key={device.id} className="bg-white border border-gray-200 p-6 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">{device.name}</h3>
              <p className="text-gray-600">{device.type}</p>
              <p className="text-sm text-gray-500">Last used: {device.lastUsed}</p>
            </div>
            <Button 
              onClick={() => toast.info("Deregister device - Coming Soon!")}
              variant="destructive"
              size="sm"
              className="flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </Button>
          </div>
        ))}
      </div>

      {devices.length === 0 && (
        <div className="text-center py-12">
          <Smartphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No devices registered</h2>
          <p className="text-gray-600 mb-6">Register your devices to manage your Amazon account securely</p>
          <Button 
            onClick={() => toast.info("Register device - Coming Soon!")}
            variant="amazon"
          >
            Register Your First Device
          </Button>
        </div>
      )}
    </div>
  );
};

export default Devices;

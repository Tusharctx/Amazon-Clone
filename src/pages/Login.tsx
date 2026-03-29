import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-md mx-auto">
          <Link to="/" className="flex justify-center">
            <img 
              src="/amazon-logo.png" 
              alt="Amazon Logo" 
              className="h-[29.4px] object-contain"
            />
          </Link>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg border border-gray-300 p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign in</h1>
            <p className="text-sm text-gray-600 mb-6">to your Amazon account</p>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Email or mobile number
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 py-2 text-base"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 py-2 text-base"
                  />
                </div>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-amazon-orange hover:bg-amazon-orange/80 text-amazon-navy font-bold py-2 rounded-md text-base"
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-3 text-sm text-gray-500">New to Amazon?</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Register Link */}
            <Link
              to="/register"
              className="w-full block text-center bg-gray-100 hover:bg-gray-200 text-amazon-navy font-bold py-2 rounded-md transition-colors text-base"
            >
              Create your Amazon account
            </Link>

            {/* Forgot Password */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => toast.info("Password reset - Coming Soon!")}
                className="text-amazon-orange hover:underline text-sm"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-4 text-center space-y-1 text-xs text-gray-500">
            <div>
              <button
                onClick={() => toast.info("Conditions of Use - Coming Soon!")}
                className="text-amazon-orange hover:underline mr-3"
              >
                Conditions of Use
              </button>
              <button
                onClick={() => toast.info("Privacy Notice - Coming Soon!")}
                className="text-amazon-orange hover:underline"
              >
                Privacy Notice
              </button>
            </div>
            <p>© 1996-2026, Amazon.com, Inc. or its affiliates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

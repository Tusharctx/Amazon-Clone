import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/config/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
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

      {/* Register Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg border border-gray-300 p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Create account</h1>
            <p className="text-sm text-gray-600 mb-6">Join Amazon to start shopping</p>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Your name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First and last name"
                    className="pl-10 py-2 text-base"
                  />
                </div>
              </div>

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
                    placeholder="At least 6 characters"
                    className="pl-10 py-2 text-base"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Passwords must be at least 6 characters
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Re-enter password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="pl-10 py-2 text-base"
                  />
                </div>
              </div>

              {/* Create Account Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-amazon-orange hover:bg-amazon-orange/80 text-amazon-navy font-bold py-2 rounded-md text-base"
              >
                {loading ? "Creating account..." : "Create your Amazon account"}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-3 text-sm text-gray-500">Already have an account?</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Sign In Link */}
            <Link
              to="/login"
              className="w-full block text-center bg-gray-100 hover:bg-gray-200 text-amazon-navy font-bold py-2 rounded-md transition-colors text-base"
            >
              Sign in instead
            </Link>
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

export default Register;

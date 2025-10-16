import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header/header";
import Fotter from "../Fotter/fotter";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful! 🎉");
        if (data.user.role === "admin") {
          navigate("/admindash")
        }
        else if(data.user.role === "collector") {
          navigate("/collector-dashboard")
        }
        else { navigate("/user-dashboard");
        }
      } else alert(data.msg);
    } catch {
      alert("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />

      <div className="min-h-screen bg-gradient-to-b from-green-50 via-sky-50 to-white flex items-center justify-center px-4 py-12">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white overflow-hidden rounded-2xl shadow-xl border border-gray-100">
          {/* Left visual panel */}
          <div className="relative md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1610021243922-92ac26f3516e"
              alt="Eco city"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent flex flex-col justify-end p-10 text-white">
              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-sky-100 mb-6">
                Sign in to continue making sustainability smarter.
              </p>
              <ul className="space-y-3 text-sm text-white/90">
                <li className="flex items-center gap-2">
                  <span>♻️</span> Track your green impact
                </li>
                <li className="flex items-center gap-2">
                  <span>📦</span> Manage waste collections
                </li>
                <li className="flex items-center gap-2">
                  <span>🔐</span> Secure account protection
                </li>
              </ul>
            </div>
          </div>

          {/* Right form panel */}
          <div className="md:w-1/2 p-10 flex items-center">
            <form
              onSubmit={handleSubmit}
              className="w-full space-y-6 animate-fadeIn"
            >
              <h2 className="text-2xl font-bold text-green-700">Sign In</h2>
              <p className="text-sm text-gray-600">
                Enter your credentials to continue
              </p>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-200 py-2 px-3 outline-none transition"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-200 py-2 px-3 pr-10 outline-none transition"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <div className="mt-2">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-green-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 text-white font-semibold rounded-lg transition ${
                  isSubmitting
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-sky-600 hover:from-green-700 hover:to-sky-700 shadow-md hover:shadow-lg"
                }`}
              >
                {isSubmitting ? "Signing In..." : "Sign In →"}
              </button>

              {/* Divider */}
              <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-200" />
                <span className="px-3 text-gray-500 text-sm">
                  Or continue with
                </span>
                <hr className="flex-grow border-gray-200" />
              </div>

              {/* Social buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-green-50 transition"
                >
                  <span className="mr-2">🔍</span> Google
                </button>
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-green-50 transition"
                >
                  <span className="mr-2">ƒ</span> Facebook
                </button>
              </div>

              <p className="text-sm text-gray-600 text-center mt-4">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <Fotter />
    </div>
  );
}

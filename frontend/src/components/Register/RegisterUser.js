import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/header";
import Fotter from "../Fotter/fotter";

export default function RegisterUser() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5002/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert(data.msg);
      if (res.ok) navigate("/login");
    } catch {
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-sky-50 flex items-center justify-center px-4 py-12">
        <div className="flex flex-col md:flex-row w-full max-w-5xl overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-100">
          {/* Left panel */}
          <div className="md:w-1/2 bg-gradient-to-br from-green-100 via-sky-100 to-emerald-50 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Create Your Account
            </h2>
            <p className="text-gray-600 mb-8">
              Join thousands of eco-conscious citizens using <b>GreenScan</b> to
              make sustainability smarter.
            </p>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="bg-green-500/10 p-2 rounded-lg text-green-600">
                  ♻️
                </div>
                <p className="font-medium text-gray-800">
                  Track your waste footprint
                </p>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-sky-500/10 p-2 rounded-lg text-sky-600">
                  🌍
                </div>
                <p className="font-medium text-gray-800">
                  Access verified waste collectors
                </p>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-amber-500/10 p-2 rounded-lg text-amber-600">
                  ⭐
                </div>
                <p className="font-medium text-gray-800">
                  Earn rewards for eco-actions
                </p>
              </li>
            </ul>
          </div>

          {/* Right form panel */}
          <div className="md:w-1/2 p-10">
            <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-green-700">
                Create Account
              </h2>
              <p className="text-sm text-gray-500">
                Join GreenScan and start your eco journey today.
              </p>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-200 py-2 px-3 outline-none transition"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
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
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-200 py-2 px-3 outline-none transition"
                  placeholder="Create a strong password"
                  required
                />
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
                {isSubmitting ? "Creating Account..." : "Create Account →"}
              </button>

              {/* Links */}
              <div className="text-center space-y-2 mt-4 text-sm text-gray-600">
                <p>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
                <p>
                  Are you an administrator?{" "}
                  <Link
                    to="/register-admin"
                    className="text-sky-600 font-semibold hover:underline"
                  >
                    Register as Admin
                  </Link>
                </p>
<p>
                  Are you a collector?{" "}
                  <Link
                    to="/register-collector"
                    className="text-sky-600 font-semibold hover:underline"
                  >
                    Register as Collector
                  </Link>
                </p>


              </div>
            </form>
          </div>
        </div>
      </div>
      <Fotter />
    </div>
  );
}

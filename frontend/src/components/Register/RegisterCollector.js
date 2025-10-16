import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/header";
import Fotter from "../Fotter/fotter";

export default function RegisterCollector() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    securityCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5002/api/auth/register-collector", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Collector registered successfully! ✅");
        navigate("/login");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-sky-50 px-6 py-10">
        <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white overflow-hidden rounded-2xl shadow-xl border border-gray-100">
          {/* Left info panel */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-green-200 via-emerald-100 to-sky-100 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Become a Certified Waste Collector ♻️
            </h2>
            <p className="text-gray-600 mb-8">
              Join <b>GreenScan</b>’s network of verified collectors and
              contribute to a cleaner, smarter Sri Lanka.
            </p>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="bg-green-500/10 p-2 rounded-lg text-green-600">
                  🚛
                </div>
                <p className="font-medium text-gray-800">
                  Receive pickup requests from users
                </p>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-sky-500/10 p-2 rounded-lg text-sky-600">
                  📍
                </div>
                <p className="font-medium text-gray-800">
                  Manage routes and assigned areas
                </p>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-amber-500/10 p-2 rounded-lg text-amber-600">
                  💰
                </div>
                <p className="font-medium text-gray-800">
                  Earn income for every completed pickup
                </p>
              </li>
            </ul>
          </div>

          {/* Right form panel */}
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-green-700">
                Waste Collector Registration
              </h2>
              <p className="text-sm text-gray-500">
                Enter your details to join our collector network
              </p>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="mt-1 w-full rounded-lg border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-200 py-2 px-3 outline-none transition"
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
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email"
                  className="mt-1 w-full rounded-lg border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-200 py-2 px-3 outline-none transition"
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
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Create a password"
                  className="mt-1 w-full rounded-lg border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-200 py-2 px-3 outline-none transition"
                  required
                />
              </div>

              {/* Security Code */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Collector Security Code
                </label>
                <input
                  type="password"
                  value={form.securityCode}
                  onChange={(e) =>
                    setForm({ ...form, securityCode: e.target.value })
                  }
                  placeholder="Enter authorized collector code"
                  className="mt-1 w-full rounded-lg border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-200 py-2 px-3 outline-none transition"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  (Authorized staff only — contact GreenScan Admin)
                </p>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 text-white font-semibold rounded-lg transition ${
                  isSubmitting
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-sky-600 hover:from-green-700 hover:to-sky-700 shadow-md hover:shadow-lg"
                }`}
              >
                {isSubmitting ? "Registering..." : "Register as Collector →"}
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
                  Are you a regular user?{" "}
                  <Link
                    to="/register"
                    className="text-sky-600 font-semibold hover:underline"
                  >
                    Register as User
                  </Link>
                </p>
                <p>
                  Are you an administrator?{" "}
                  <Link
                    to="/register-admin"
                    className="text-amber-600 font-semibold hover:underline"
                  >
                    Register as Admin
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

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/header";
import Fotter from "../Fotter/fotter";

export default function RegisterAdmin() {
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
      const res = await fetch("http://localhost:5002/api/auth/register-admin", {
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
          {/* Left gradient section */}
          <div className="md:w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">Admin Portal Access</h2>
              <p className="text-blue-100 mb-8">
                Secure registration for administrators only.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-lg">🔒</div>
                  <p>Enhanced security protocols</p>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-lg">⚙️</div>
                  <p>Full system management access</p>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-lg">📊</div>
                  <p>Analytics and reporting tools</p>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 p-4 rounded-lg mt-8">
              <h4 className="text-lg font-semibold">Security Notice</h4>
              <p className="text-blue-100 text-sm mt-1">
                Admin registration requires an authorization code. Only authorized personnel may proceed.
              </p>
            </div>
          </div>

          {/* Right form */}
          <div className="md:w-1/2 p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  Admin Registration
                </h2>
                <span className="px-3 py-1 text-sm font-semibold bg-red-100 text-red-600 rounded-full animate-pulse">
                  Restricted Access
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                Authorized personnel only.
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
                  className="mt-1 w-full rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 py-2 px-3 outline-none transition"
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
                  className="mt-1 w-full rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 py-2 px-3 outline-none transition"
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
                  className="mt-1 w-full rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 py-2 px-3 outline-none transition"
                  placeholder="Create a strong password"
                  required
                />
              </div>

              {/* Security Code */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Security Code
                </label>
                <input
                  type="password"
                  value={form.securityCode}
                  onChange={(e) =>
                    setForm({ ...form, securityCode: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 py-2 px-3 outline-none transition"
                  placeholder="Enter security authorization code"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 text-white font-semibold rounded-lg transition ${
                  isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg"
                }`}
              >
                {isSubmitting
                  ? "Verifying Credentials..."
                  : "Register Admin Account"}
              </button>

              <div className="text-sm text-gray-600 text-center">
                <p>
                  Looking for user registration?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Register here
                  </Link>
                </p>
                <p className="mt-2">
                  Already have an admin account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign in
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

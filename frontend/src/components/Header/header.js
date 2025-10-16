import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Load logged-in user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  // Navigate to role-based dashboard
  const handleDashboard = () => {
    setMenuOpen(false);
    if (user?.role === "admin") navigate("/admindash");
    else if (user?.role === "collector") navigate("/collector-dashboard");
    else navigate("/user-dashboard");
  };

  return (
    <nav className="sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="text-xl sm:text-2xl font-extrabold tracking-tight">
          <Link
            to="/"
            className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-sky-500"
          >
            GreenScan
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-green-600 transition">Home</Link>
          <Link to="/about" className="hover:text-green-600 transition">About</Link>
          <Link to="/contact" className="hover:text-green-600 transition">Contact</Link>

          {/* Right Side - Auth Conditional */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-green-500 text-green-600 hover:bg-green-50 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              {/* Profile Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-green-50 transition border border-gray-200"
              >
                {/* Avatar */}
                <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-r from-green-600 to-sky-500 text-white font-bold rounded-full">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                {/* Greeting */}
                <span className="hidden sm:block text-gray-700 font-semibold">
                  Hi, {user.name?.split(" ")[0]} 👋
                </span>
                {/* Arrow Icon */}
                <svg
                  className={`w-4 h-4 text-gray-500 transform transition-transform ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-lg rounded-lg py-2 origin-top-right animate-fadeIn"
                  style={{ animation: "fadeIn 0.2s ease-out" }}
                >
                  <button
                    onClick={handleDashboard}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50"
                  >
                    View Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Simple fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}

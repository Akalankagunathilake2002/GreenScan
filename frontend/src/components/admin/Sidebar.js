import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMapMarkedAlt,
  FaUsers,
  FaChartLine,
  FaCog,
  FaRecycle,
} from "react-icons/fa";

export default function Sidebar() {
  const navItems = [
    { label: "Dashboard", icon: <FaTachometerAlt />, to: "/admindash" },
    { label: "View Bins", icon: <FaMapMarkedAlt />, to: "/bins" },
    { label: "Manage Users", icon: <FaUsers />, to: "/admindash/users" },
    { label: "Reports", icon: <FaChartLine />, to: "/admindash/reports" },
    { label: "Settings", icon: <FaCog />, to: "/admindash/settings" },
    { label: "Collection History", icon: <FaRecycle />, to: "/adminhistory" },
  ];

  return (
    <aside className="w-64 bg-green-800 text-white flex flex-col py-6 shadow-lg">
      {/* Sidebar Header */}
      <h2 className="text-center text-2xl font-bold mb-8">♻️ Admin Panel</h2>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 rounded-r-full text-left transition-colors duration-200 ${
                isActive
                  ? "bg-green-700 font-semibold shadow-inner"
                  : "hover:bg-green-700"
              }`
            }
          >
            <span className="text-lg mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="mt-auto border-t border-green-700 pt-4 px-6 text-sm text-green-200">
        <p>Logged in as <strong>Admin</strong></p>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className="mt-2 bg-red-600 w-full py-2 rounded-lg hover:bg-red-700 font-semibold"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

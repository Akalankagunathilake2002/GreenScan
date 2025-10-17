import React, { useState } from "react";
import { FaBars, FaMapMarkedAlt, FaClipboardList, FaTachometerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CollectorSidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`${
        open ? "w-64" : "w-16"
      } bg-green-800 text-white h-screen transition-all duration-300 flex flex-col`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="p-4 focus:outline-none hover:bg-green-700 transition"
      >
        <FaBars />
      </button>

      <nav className="flex-1 mt-4 space-y-1">
        <Link to="/collector-dashboard" className="flex items-center px-4 py-2 hover:bg-green-700">
          <FaTachometerAlt className="mr-3" /> {open && "Dashboard"}
        </Link>
        <Link to="/collector-view-bins" className="flex items-center px-4 py-2 hover:bg-green-700">
          <FaMapMarkedAlt className="mr-3" /> {open && "View Bins"}
        </Link>
        <Link to="/collector-actions" className="flex items-center px-4 py-2 hover:bg-green-700">
          <FaClipboardList className="mr-3" /> {open && "My Actions"}
        </Link>
      </nav>
    </div>
  );
}

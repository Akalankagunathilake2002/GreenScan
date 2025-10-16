import Header from "../Header/header";
import Fotter from "../Fotter/fotter";
import { useState } from "react";

export default function AdminDashboard() {
  const [overview] = useState([
    { label: "Total Users", value: "2,345", color: "from-green-600 to-emerald-400", icon: "👥" },
    { label: "Waste Collectors", value: "118", color: "from-sky-500 to-blue-400", icon: "🚛" },
    { label: "Active Requests", value: "56", color: "from-amber-400 to-orange-400", icon: "📦" },
    { label: "Total Waste Processed (Kg)", value: "12,450", color: "from-violet-500 to-fuchsia-400", icon: "♻️" },
  ]);

  const [latestActivity] = useState([
    { id: 1, name: "Ruwan Fernando", role: "Collector", action: "Completed 4 pickups", time: "2h ago" },
    { id: 2, name: "Amali Perera", role: "User", action: "Requested E-waste collection", time: "4h ago" },
    { id: 3, name: "Kamal Silva", role: "Collector", action: "Added new service area", time: "6h ago" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-sky-50 flex flex-col">
      <Header />

      <main className="flex-1 px-6 py-10 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🧭 Admin Control Panel
        </h1>
        <p className="text-gray-600 mb-8">
          Monitor platform activity, manage collectors, and oversee user engagement.
        </p>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {overview.map((card) => (
            <div
              key={card.label}
              className={`rounded-2xl p-6 text-white bg-gradient-to-br ${card.color} shadow-lg hover:shadow-xl transition`}
            >
              <div className="text-3xl mb-2">{card.icon}</div>
              <div className="text-3xl font-bold">{card.value}</div>
              <div className="text-sm text-white/90 mt-1">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Latest Activity */}
        <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">🕓 Recent Platform Activity</h2>
            <button className="px-4 py-2 text-sm font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">
              View Full Logs
            </button>
          </div>

          <ul className="divide-y divide-gray-100">
            {latestActivity.map((act) => (
              <li key={act.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{act.name}</p>
                  <p className="text-sm text-gray-500">{act.role} • {act.action}</p>
                </div>
                <span className="text-xs text-gray-500">{act.time}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Management Panel */}
        <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">⚙️ Management Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-5 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition">
              Add New Collector
            </button>
            <button className="px-5 py-3 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition">
              Manage Requests
            </button>
            <button className="px-5 py-3 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600 transition">
              View Reports
            </button>
            <button className="px-5 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition">
              Suspend User
            </button>
          </div>
        </section>
      </main>

      <Fotter />
    </div>
  );
}

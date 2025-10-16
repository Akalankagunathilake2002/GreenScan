import Header from "../Header/header";
import Fotter from "../Fotter/fotter";
import { useState } from "react";

export default function CollectorDashboard() {
  const [stats] = useState([
    { label: "Pickups Completed", value: "128", color: "from-green-500 to-emerald-400", icon: "🚛" },
    { label: "Pending Requests", value: "7", color: "from-sky-500 to-blue-400", icon: "📦" },
    { label: "Earnings (LKR)", value: "45,200", color: "from-amber-400 to-orange-400", icon: "💰" },
    { label: "Service Rating", value: "4.9★", color: "from-violet-500 to-fuchsia-400", icon: "⭐" },
  ]);

  const [recentRequests] = useState([
    { id: 1, user: "Amali Perera", area: "Colombo 05", wasteType: "Plastic", status: "Completed" },
    { id: 2, user: "Ruwan Fernando", area: "Kandy", wasteType: "E-Waste", status: "Pending" },
    { id: 3, user: "Sanduni Wickrama", area: "Galle", wasteType: "Organic", status: "In Progress" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-sky-50 flex flex-col">
      <Header />

      <main className="flex-1 px-6 py-10 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          👋 Welcome Back, Collector!
        </h1>
        <p className="text-gray-600 mb-8">
          Here’s your performance overview and current pickup requests.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl p-6 text-white bg-gradient-to-br ${stat.color} shadow-lg hover:shadow-xl transition`}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-white/90 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Requests */}
        <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              🗑️ Recent Pickup Requests
            </h2>
            <button className="px-4 py-2 text-sm font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead>
                <tr className="bg-green-100 text-green-700 uppercase text-xs">
                  <th className="px-4 py-3 rounded-l-lg">User</th>
                  <th className="px-4 py-3">Area</th>
                  <th className="px-4 py-3">Waste Type</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req) => (
                  <tr key={req.id} className="border-b hover:bg-sky-50">
                    <td className="px-4 py-3 font-medium">{req.user}</td>
                    <td className="px-4 py-3">{req.area}</td>
                    <td className="px-4 py-3">{req.wasteType}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          req.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : req.status === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-sky-100 text-sky-700"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Fotter />
    </div>
  );
}

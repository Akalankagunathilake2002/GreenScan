import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import Fotter from "../Fotter/fotter";

export default function UserDashboard() {
  const [binLevel, setBinLevel] = useState(68); // Simulated sensor % fill
  const [ecoStats, setEcoStats] = useState({
    totalCollections: 23,
    co2Saved: 48.2, // kg
    rewardPoints: 120,
  });
  const [wasteData, setWasteData] = useState([
    { type: "Plastic", amount: 12.3, color: "bg-sky-400" },
    { type: "Organic", amount: 20.8, color: "bg-green-500" },
    { type: "E-Waste", amount: 4.1, color: "bg-amber-500" },
  ]);
  const [isSettingsVisible, setSettingsVisible] = useState(false);

  // Simulate live bin fill sensor
  useEffect(() => {
    const interval = setInterval(() => {
      setBinLevel((prev) => {
        let next = prev + (Math.random() * 4 - 2);
        if (next > 100) next = 100;
        if (next < 0) next = 0;
        return Math.round(next);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-sky-50 flex flex-col">
      <Header />

      <div className="flex flex-col md:flex-row flex-grow">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gradient-to-b from-green-600 to-sky-600 text-white p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6">User Panel</h2>
            <nav className="space-y-3">
              <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-green-700 transition">
                🏠 Dashboard
              </button>
              <button
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-green-700 transition"
                onClick={() => setSettingsVisible(false)}
              >
                ♻ Monitor Bin
              </button>
              <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-green-700 transition">
                📊 Waste History
              </button>
              <button
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-green-700 transition"
                onClick={() => setSettingsVisible(!isSettingsVisible)}
              >
                ⚙ Settings
              </button>
            </nav>
          </div>
          <button className="mt-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold">
            🚪 Log Out
          </button>
        </aside>

        {/* Main Dashboard */}
        <main className="flex-grow p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back, Eco Hero! 🌿
          </h1>
          <p className="text-gray-600 mb-8">
            Here’s how your household waste management is performing today.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg text-center">
              <h3 className="text-sm uppercase">Total Collections</h3>
              <p className="text-3xl font-bold mt-2">
                {ecoStats.totalCollections}
              </p>
            </div>
            <div className="bg-sky-600 text-white rounded-xl p-6 shadow-lg text-center">
              <h3 className="text-sm uppercase">CO₂ Saved (kg)</h3>
              <p className="text-3xl font-bold mt-2">
                {ecoStats.co2Saved.toFixed(1)}
              </p>
            </div>
            <div className="bg-amber-500 text-white rounded-xl p-6 shadow-lg text-center">
              <h3 className="text-sm uppercase">Reward Points</h3>
              <p className="text-3xl font-bold mt-2">
                {ecoStats.rewardPoints}
              </p>
            </div>
          </div>

          {/* Bin Fill Monitor */}
          <section className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Smart Bin Fill Level
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Bin Visualization */}
              <div className="w-40 h-56 border-4 border-gray-300 rounded-xl relative overflow-hidden bg-gray-100 shadow-inner">
                <div
                  className="absolute bottom-0 w-full transition-all duration-700 bg-green-500"
                  style={{ height: `${binLevel}%` }}
                ></div>
                <div className="absolute top-2 left-0 right-0 text-center text-gray-700 font-bold">
                  {binLevel}%
                </div>
              </div>

              {/* Info */}
              <div className="mt-6 md:mt-0 md:ml-10">
                <p className="text-gray-700 mb-2">
                  🗑 <b>Current Fill Level:</b> {binLevel}%
                </p>
                <p className="text-gray-700 mb-2">
                  🔄 Last updated just now
                </p>
                {binLevel >= 85 ? (
                  <div className="text-red-600 font-semibold">
                    ⚠ Bin almost full — Schedule collection now!
                  </div>
                ) : binLevel >= 60 ? (
                  <div className="text-amber-600 font-semibold">
                    ⚠ Bin filling up — Keep an eye on it.
                  </div>
                ) : (
                  <div className="text-green-600 font-semibold">
                    ✅ Bin level healthy.
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Waste Breakdown */}
          <section className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Waste Breakdown (kg)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {wasteData.map((item) => (
                <div
                  key={item.type}
                  className={`rounded-xl p-6 shadow-md ${item.color} text-white`}
                >
                  <h3 className="text-lg font-semibold">{item.type}</h3>
                  <p className="text-2xl font-bold mt-2">{item.amount} kg</p>
                </div>
              ))}
            </div>
          </section>

          {/* Settings */}
          {isSettingsVisible && (
            <section className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Profile Settings
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full mt-1 border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full mt-1 border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full mt-1 border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="w-full mt-1 border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none transition"
                  />
                </div>
                <div className="col-span-full flex justify-end mt-4">
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    Save Changes
                  </button>
                </div>
              </form>
            </section>
          )}
        </main>
      </div>

      <Fotter />
    </div>
  );
}

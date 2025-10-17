import React, { useEffect, useState } from "react";
import api from "../../utils/api"; 
import Header from "../Header/header";
import Fotter from "../Fotter/fotter";
import CollectorSidebar from "./CollectorSidebar";

export default function MyActions() {
  const [actions, setActions] = useState([]);
  const [summary, setSummary] = useState({
    totalBins: 0,
    totalWeight: 0,
    lastCollected: null,
  });

  const collector = JSON.parse(localStorage.getItem("collector"));
  const collectorName = collector?.name || "";

  useEffect(() => {
    if (!collectorName) return;

    api
      .get(`/collector-actions/${collectorName}`)
      .then((res) => {
        const actionsData = res.data;
        setActions(actionsData);

        if (actionsData.length > 0) {
          const totalBins = actionsData.length;
          const totalWeight = actionsData.reduce(
            (sum, a) => sum + (a.quantity || 0),
            0
          );
          const lastCollected = actionsData[0].collectedAt;

          setSummary({ totalBins, totalWeight, lastCollected });
        }
      })
      .catch((err) => console.error("Error fetching actions:", err));
  }, [collectorName]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-sky-50">
      <Header />

      <div className="flex flex-1">
        <CollectorSidebar />

        <main className="flex-1 p-8">

          <div className="bg-gradient-to-r from-green-600 to-emerald-400 text-white p-6 rounded-2xl shadow-lg mb-8">
            <h1 className="text-2xl font-bold mb-2">
              👋 Welcome Back, {collectorName || "Collector"}!
            </h1>
            <p className="text-white/90">
              Here’s your performance summary based on collected bins.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 text-center">
              <div className="bg-white/20 p-4 rounded-xl">
                <div className="text-3xl font-bold">{summary.totalBins}</div>
                <div className="text-sm">Bins Collected</div>
              </div>

              <div className="bg-white/20 p-4 rounded-xl">
                <div className="text-3xl font-bold">
                  {summary.totalWeight.toFixed(1)} kg
                </div>
                <div className="text-sm">Total Waste Collected</div>
              </div>

              <div className="bg-white/20 p-4 rounded-xl">
                <div className="text-lg font-semibold">
                  {summary.lastCollected
                    ? new Date(summary.lastCollected).toLocaleDateString()
                    : "—"}
                </div>
                <div className="text-sm">Last Collection Date</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              🧾 My Collection Actions
            </h2>
            {actions.length === 0 ? (
              <p className="text-gray-500 italic">
                No collection actions logged yet.
              </p>
            ) : (
              <table className="w-full text-sm text-left border-t border-gray-200">
                <thead>
                  <tr className="bg-green-100 text-gray-800">
                    <th className="p-2">Bin Name</th>
                    <th className="p-2">City</th>
                    <th className="p-2">Waste Type</th>
                    <th className="p-2">Quantity (kg)</th>
                    <th className="p-2">Collected At</th>
                  </tr>
                </thead>
                <tbody>
                  {actions.map((a) => (
                    <tr
                      key={a._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-2 font-medium">{a.binName}</td>
                      <td className="p-2">{a.city}</td>
                      <td className="p-2">{a.wasteType}</td>
                      <td className="p-2">{a.quantity?.toFixed(1)}</td>
                      <td className="p-2">
                        {new Date(a.collectedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      <Fotter />
    </div>
  );
}

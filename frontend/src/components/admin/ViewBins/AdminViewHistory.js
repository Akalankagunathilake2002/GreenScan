import React, { useEffect, useState } from "react";
import api from "../../../utils/api"; // ✅ use centralized API instance
import Sidebar from "../../Dashboards/adminSlidebar";
import Header from "../../Header/header";
import Fotter from "../../Fotter/fotter";

export default function AdminViewHistory() {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    // ✅ Fetch all collector actions
    api
      .get("/collector-actions")
      .then((res) => setActions(res.data))
      .catch((err) => console.error("Error fetching history:", err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-sky-50">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            🗂️ Waste Collection History
          </h1>
          <p className="text-gray-600 mb-6">
            Review all waste collection activities performed by collectors.
          </p>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            {actions.length === 0 ? (
              <p className="text-gray-500 italic">
                No collection history found yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-t border-gray-200">
                  <thead>
                    <tr className="bg-green-100 text-gray-800">
                      <th className="p-2">Collector</th>
                      <th className="p-2">Bin</th>
                      <th className="p-2">City</th>
                      <th className="p-2">Waste Type</th>
                      <th className="p-2">Collected (kg)</th>
                      <th className="p-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actions.map((act) => (
                      <tr key={act._id} className="border-b hover:bg-gray-50 transition">
                        <td className="p-2">{act.collectorName}</td>
                        <td className="p-2">{act.binName}</td>
                        <td className="p-2">{act.city}</td>
                        <td className="p-2">{act.wasteType}</td>
                        <td className="p-2">{act.quantity?.toFixed(1)}</td>
                        <td className="p-2">
                          {new Date(act.collectedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      <Fotter />
    </div>
  );
}

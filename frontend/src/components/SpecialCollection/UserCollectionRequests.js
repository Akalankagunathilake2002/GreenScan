import React, { useEffect, useState } from "react";
import Header from "../Header/header";
import Fotter from "../Fotter/fotter";
import UserSidebar from "../Dashboards/UserSideBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserRequests } from "../../services/FEscheduleService";

export default function MyRequests() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Load user and fetch requests
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      fetchRequests(parsed._id || parsed.id);
    } else {
      toast.error("Please log in first");
      navigate("/login");
    }
  }, []);

  const fetchRequests = async (userId) => {
    try {
      const res = await getUserRequests(userId);
      console.log("User requests:", res);
      setRequests(res);
    } catch (err) {
      console.error("Error fetching user requests:", err);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleMakePayment = (request) => {
    navigate("/make-payment", { state: request });
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <UserSidebar />
          <main className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-green-50/50 to-blue-50/50">
            <p className="text-center mt-10 text-gray-600">Loading your requests...</p>
          </main>
        </div>
        <Fotter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <UserSidebar />
        <main className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-green-50/50 to-blue-50/50">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              📋 My Special Collection Requests
            </h1>

            {requests.length === 0 ? (
              <div className="bg-white border border-gray-600 rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600">No requests found.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {requests.map((req) => {
                  const isExpanded = expandedId === req._id;
                  return (
                    <div
                      key={req._id}
                      className="bg-white border border-gray-600 rounded-lg shadow-md hover:shadow-lg transition"
                    >
                      {/* Collapsed Header */}
                      <div
                        onClick={() => toggleExpand(req._id)}
                        className="p-3 cursor-pointer flex items-center justify-between hover:bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-lg">{isExpanded ? "▼" : "▶"}</span>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800">
                              #{req._id.slice(-8).toUpperCase()} - {req.wasteType}
                            </p>
                            <p className="text-xs text-gray-600">
                              {req.quantity} kg • Rs. {req.fee}
                            </p>
                          </div>
                        </div>
                        
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold border ${
                            req.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-700 border-green-400"
                              : "bg-red-100 text-red-700 border-red-400"
                          }`}
                        >
                          {req.paymentStatus || "Unpaid"}
                        </span>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="px-3 pb-3 pt-2 border-t border-gray-300">
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                            <div>
                              <span className="text-gray-600 font-medium">Request ID:</span>
                              <p className="text-gray-800 font-semibold">#{req._id.slice(-8).toUpperCase()}</p>
                            </div>
                            
                            <div>
                              <span className="text-gray-600 font-medium">Waste Type:</span>
                              <p className="text-gray-800 font-semibold">{req.wasteType}</p>
                            </div>
                            
                            <div>
                              <span className="text-gray-600 font-medium">Quantity:</span>
                              <p className="text-gray-800 font-semibold">{req.quantity} kg</p>
                            </div>
                            
                            <div>
                              <span className="text-gray-600 font-medium">Fee:</span>
                              <p className="text-gray-800 font-semibold">Rs. {req.fee}</p>
                            </div>

                            {req.area && (
                              <div>
                                <span className="text-gray-600 font-medium">Area:</span>
                                <p className="text-gray-800 font-semibold">{req.area}</p>
                              </div>
                            )}

                            {req.preferredDate && (
                              <div>
                                <span className="text-gray-600 font-medium">Date:</span>
                                <p className="text-gray-800 font-semibold">{new Date(req.preferredDate).toLocaleDateString()}</p>
                              </div>
                            )}
                          </div>

                          {req.paymentStatus !== "Paid" && (
                            <button
                              onClick={() => handleMakePayment(req)}
                              className="w-full py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white text-sm font-semibold rounded hover:from-green-700 hover:to-teal-700 transition shadow-sm border border-gray-700"
                            >
                              💳 Make Payment
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
      <Fotter />
    </div>
  );
}
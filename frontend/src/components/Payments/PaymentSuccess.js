import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/header";
import Fotter from "../Fotter/fotter";
import UserSidebar from "../Dashboards/UserSideBar";

export default function PaymentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <UserSidebar />
        <main className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-green-50/50 to-blue-50/50">
          <div className="max-w-md mx-auto mt-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-600">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-teal-600 px-4 py-4 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-2">
                  <svg
                    className="w-7 h-7 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">
                  Payment Successful!
                </h2>
              </div>

              {/* Body */}
              <div className="p-4">
                {/* Amount */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg px-4 py-4 mb-4 text-center border border-green-400">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">Amount Paid</p>
                  <p className="text-2xl font-bold text-green-700">
                    Rs. {state?.amount || "0.00"}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-400">
                    <p className="text-xs text-gray-600 mb-1 font-semibold">Request ID</p>
                    <p className="text-sm font-medium text-gray-800">
                      #{state?.requestId?.slice(-8).toUpperCase() || "N/A"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-400">
                    <p className="text-xs text-gray-600 mb-1 font-semibold">Transaction Reference</p>
                    <p className="text-sm font-medium text-gray-800">
                      {state?.transactionId || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => navigate("/user-collection-requests")}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold py-2 text-sm rounded hover:from-green-700 hover:to-teal-700 transition shadow-sm border border-gray-700"
                >
                  View My Requests
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Fotter />
    </div>
  );
}
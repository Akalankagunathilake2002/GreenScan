import React from "react";

export default function RequestConfirmationModal({ visible, details, onClose, onMakePayment, onViewRequests }) {
  if (!visible || !details) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-center relative">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-3">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Request Confirmed!
          </h2>
          <p className="text-green-50 text-sm">
            Your collection has been successfully scheduled
          </p>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Left Column */}
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Name</p>
                <p className="font-semibold text-gray-900">{details.name}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Waste Type</p>
                <p className="font-semibold text-gray-900">{details.wasteType}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Quantity</p>
                <p className="font-semibold text-gray-900">{details.quantity} kg</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Pickup Slot</p>
                <p className="font-semibold text-gray-900">{details.slot.startTime} - {details.slot.endTime}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Address</p>
                <p className="font-semibold text-gray-900 text-sm">{details.address}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Preferred Date</p>
                <p className="font-semibold text-gray-900">{details.preferredDate}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Truck No</p>
                <p className="font-semibold text-gray-900">{details.slot.assignedTruck?.truckNo || "Pending"}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Collector</p>
                <p className="font-semibold text-gray-900">{details.slot.assignedCollector?.name || "Pending"}</p>
              </div>
            </div>
          </div>

          {/* Fee Display */}
          <div className="bg-green-600 rounded-lg p-4 text-white mb-6">
            <div className="flex items-center justify-between">
              <span className="font-medium">Collection Fee</span>
              <span className="text-xl font-bold">Rs. {details.fee}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onMakePayment}
              className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              💳 Make Payment
            </button>
            <button
              onClick={onViewRequests}
              className="flex-1 bg-sky-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-sky-600 transition-colors"
            >
              📋 View My Requests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
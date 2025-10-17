import React from "react";
import { InfoWindow } from "@react-google-maps/api";

export const BinInfoWindow = ({ bin, onClose, onEdit, onDelete }) => (
  <InfoWindow
    position={{ lat: bin.lat, lng: bin.lng }}
    onCloseClick={onClose}
  >
    <div className="p-2 max-w-xs">
      <h3 className="font-semibold text-gray-800 text-base mb-1">
        🗑️ {bin.name || "Unnamed Bin"}
      </h3>

      <div className="text-sm text-gray-700 space-y-1">
        <p><strong>City:</strong> {bin.city || "N/A"}</p>
        <p><strong>Waste Type:</strong> {bin.wasteType || "N/A"}</p>
        <p><strong>Level:</strong> {bin.level}%</p>
        <p><strong>Quantity:</strong> {bin.quantity?.toFixed(1) || 0} kg</p>
        <p><strong>Status:</strong> {bin.status}</p>
        <p><strong>Assigned To:</strong> {bin.userId?.name || "Unassigned"}</p>
      </div>

      <div className="mt-3 flex justify-between">
        <button
          onClick={() => onEdit(bin)}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(bin._id)}
          className="text-red-600 text-sm font-medium hover:underline"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  </InfoWindow>
);

import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import api from "../../../utils/api"; 
import Sidebar from "../../Dashboards/adminSlidebar";
import Header from "../../Header/header";
import Fotter from "../../Fotter/fotter";

import normalBinIcon from "../../../assets/bins/normalbin.png";
import moderateBinIcon from "../../../assets/bins/moderatebin.png";
import reachingBinIcon from "../../../assets/bins/reachingtofullbin.png";
import fullBinIcon from "../../../assets/bins/fullbin.png";

const containerStyle = { width: "100%", height: "70vh", borderRadius: "1rem" };
const center = { lat: 6.9271, lng: 79.8612 };
const MAX_CAPACITY_KG = 30;
const getCityFromCoordinates = async (lat, lng, apiKey) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const data = await res.json();
    if (data.results.length > 0) {
      const addressComponents = data.results[0].address_components;
      const cityObj =
        addressComponents.find((c) => c.types.includes("locality")) ||
        addressComponents.find((c) =>
          c.types.includes("administrative_area_level_2")
        );
      return cityObj ? cityObj.long_name : "Unknown";
    }
    return "Unknown";
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    return "Unknown";
  }
};

export default function ViewBins() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCQlsYyEJIRVQHAPUpvE54dtdOQNnKY3gM", 
    libraries: ["places"],
  });

  const [bins, setBins] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBin, setSelectedBin] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lat: "",
    lng: "",
    city: "",
    userId: "",
    level: 0,
    quantity: 0,
    wasteType: "",
    status: "Normal",
  });

  // ✅ Fetch bins and users via centralized api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [binsRes, usersRes] = await Promise.all([
          api.get("/bins"),
          api.get("/users"),
        ]);
        setBins(binsRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleMapClick = useCallback(async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    const city = await getCityFromCoordinates(
      lat,
      lng,
      "AIzaSyCQlsYyEJIRVQHAPUpvE54dtdOQNnKY3gM"
    );

    setFormData({
      name: "",
      lat,
      lng,
      city,
      userId: "",
      level: 0,
      quantity: 0,
      wasteType: "",
      status: "Normal",
    });
    setFormVisible(true);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (formData._id) {
        res = await api.put(`/bins/${formData._id}`, formData);
        setBins((prev) =>
          prev.map((b) => (b._id === res.data._id ? res.data : b))
        );
      } else {
        res = await api.post("/bins", formData);
        setBins((prev) => [...prev, res.data]);
      }
      setFormVisible(false);
    } catch (err) {
      console.error("Error saving bin:", err);
    }
  };

  const deleteBin = async (id) => {
    if (!window.confirm("Delete this bin?")) return;
    try {
      await api.delete(`/bins/${id}`);
      setBins((prev) => prev.filter((b) => b._id !== id));
      setSelectedBin(null);
    } catch (err) {
      console.error("Error deleting bin:", err);
    }
  };

  const getIcon = (level) => {
    if (level >= 100) return fullBinIcon;
    if (level >= 80) return reachingBinIcon;
    if (level >= 50) return moderateBinIcon;
    return normalBinIcon;
  };

  if (!isLoaded)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading Map…
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-sky-50">
      <Header />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                🗺️ View & Manage Smart Bins
              </h1>
              <p className="text-gray-600">
                Monitor bin statuses, assign collectors, and manage locations efficiently.
              </p>
            </div>
            <button
              className="bg-green-700 text-white px-5 py-2 rounded-lg shadow hover:bg-green-800 transition"
              onClick={() =>
                setFormData({
                  name: "",
                  lat: "",
                  lng: "",
                  city: "",
                  userId: "",
                  level: 0,
                  quantity: 0,
                  wasteType: "",
                  status: "Normal",
                }) || setFormVisible(true)
              }
            >
              ➕ Add Bin
            </button>
          </header>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              📍 Map Overview
            </h2>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onClick={handleMapClick}
            >
              {bins.map((bin) => (
                <Marker
                  key={bin._id}
                  position={{ lat: bin.lat, lng: bin.lng }}
                  icon={{
                    url: getIcon(bin.level),
                    scaledSize: new window.google.maps.Size(20, 20),
                  }}
                  onClick={() => setSelectedBin(bin)}
                />
              ))}

              {selectedBin && (
                <InfoWindow
                  position={{ lat: selectedBin.lat, lng: selectedBin.lng }}
                  onCloseClick={() => setSelectedBin(null)}
                >
                  <div className="p-2">
                    <h3 className="font-semibold">{selectedBin.name}</h3>
                    <p className="text-sm text-gray-600">City: {selectedBin.city}</p>
                    <p className="text-sm text-gray-600">
                      Waste Type: {selectedBin.wasteType}
                    </p>
                    <p className="text-sm text-gray-600">
                      Level: {selectedBin.level}%
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {selectedBin.quantity?.toFixed(1)} kg
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: {selectedBin.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      Assigned: {selectedBin.userId?.name || "Unassigned"}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        className="text-blue-600 underline"
                        onClick={() => {
                          setFormData(selectedBin);
                          setFormVisible(true);
                          setSelectedBin(null);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 underline"
                        onClick={() => deleteBin(selectedBin._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              📋 Bin Summary
            </h2>
            {bins.length === 0 ? (
              <p className="text-gray-500 italic">No bins available yet.</p>
            ) : (
              <table className="w-full text-sm text-left border-t border-gray-200">
                <thead>
                  <tr className="bg-green-100 text-gray-800">
                    <th className="p-2">Name</th>
                    <th className="p-2">City</th>
                    <th className="p-2">Waste Type</th>
                    <th className="p-2">Level (%)</th>
                    <th className="p-2">Quantity (kg)</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Assigned User</th>
                  </tr>
                </thead>
                <tbody>
                  {bins.map((bin) => (
                    <tr
                      key={bin._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-2">{bin.name}</td>
                      <td className="p-2">{bin.city}</td>
                      <td className="p-2">{bin.wasteType}</td>
                      <td className="p-2">{bin.level}</td>
                      <td className="p-2">{bin.quantity?.toFixed(1)}</td>
                      <td className="p-2 font-medium">{bin.status}</td>
                      <td className="p-2">{bin.userId?.name || "Unassigned"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      <Fotter />

      {/* Modal */}
      {formVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-semibold mb-4">
              {formData._id ? "Edit Bin" : "Add New Bin"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name */}
              <input
                type="text"
                placeholder="Bin Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
                required
              />
              {/* Location */}
              <input
                type="text"
                value={`Lat: ${formData.lat}, Lng: ${formData.lng}`}
                readOnly
                className="border w-full px-3 py-2 rounded-lg bg-gray-100"
              />
              {/* City */}
              <input
                type="text"
                placeholder="Nearest City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
              />

              {/* Waste Type */}
              <select
                value={formData.wasteType}
                onChange={(e) =>
                  setFormData({ ...formData, wasteType: e.target.value })
                }
                required
                className="border w-full px-3 py-2 rounded-lg"
              >
                <option value="">Select Waste Type</option>
                <option value="E-Waste">E-Waste</option>
                <option value="Plastic">Plastic</option>
                <option value="Organic">Organic</option>
                <option value="Hazardous">Hazardous</option>
                <option value="Other">Other</option>
              </select>

              {/* User */}
              <select
                value={formData.userId}
                onChange={(e) =>
                  setFormData({ ...formData, userId: e.target.value })
                }
                className="border w-full px-3 py-2 rounded-lg"
              >
                <option value="">Assign to User</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>

              {/* Level */}
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Level %"
                value={formData.level}
                onChange={(e) => {
                  const level = Number(e.target.value);
                  const quantity = (level / 100) * MAX_CAPACITY_KG;
                  const status =
                    level >= 100
                      ? "Full"
                      : level >= 80
                      ? "Reaching to Full"
                      : level >= 50
                      ? "Moderate"
                      : "Normal";
                  setFormData({ ...formData, level, quantity, status });
                }}
                className="border w-full px-3 py-2 rounded-lg"
              />

              {/* Quantity (auto) */}
              <input
                type="text"
                value={`${formData.quantity.toFixed(1)} kg`}
                readOnly
                className="border w-full px-3 py-2 rounded-lg bg-gray-100"
              />

              {/* Status */}
              <input
                type="text"
                value={formData.status}
                readOnly
                className="border w-full px-3 py-2 rounded-lg bg-gray-100"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

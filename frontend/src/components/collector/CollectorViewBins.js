import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import api from "../../utils/api"; 
import CollectorSidebar from "./CollectorSidebar";
import Header from "../Header/header";
import Fotter from "../Fotter/fotter";

// Custom bin icons
import normalBin from "../../assets/bins/normalbin.png";
import moderateBin from "../../assets/bins/moderatebin.png";
import reachingBin from "../../assets/bins/reachingtofullbin.png";
import fullBinIcon from "../../assets/bins/fullbin.png";

const containerStyle = { width: "100%", height: "70vh", borderRadius: "1rem" };
const center = { lat: 6.9271, lng: 79.8612 };

export default function CollectorViewBins() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCQlsYyEJIRVQHAPUpvE54dtdOQNnKY3gM",
    libraries: ["places"],
  });

  const [bins, setBins] = useState([]);
  const [selectedBin, setSelectedBin] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api
      .get("/bins")
      .then((res) => setBins(res.data))
      .catch((err) => console.error("Error fetching bins:", err));
  }, []);

  const getIcon = (level) => {
    if (level >= 100) return fullBinIcon;
    if (level >= 80) return reachingBin;
    if (level >= 50) return moderateBin;
    return normalBin;
  };

  const filteredBins =
    filter === "All"
      ? bins
      : bins.filter((b) =>
          filter === "Full"
            ? b.level >= 100
            : filter === "Moderate"
            ? b.level >= 50 && b.level < 80
            : b.level < 50
        );

  const handleStatusUpdate = async (bin) => {
    try {
      const collector = JSON.parse(localStorage.getItem("collector")) || { name: "Unknown" };
      const { data: updatedBin } = await api.put(`/bins/${bin._id}`, {
        level: 0,
        quantity: 0,
        status: "Normal",
      });

      await api.post("/collector-actions", {
        collectorName: collector.name,
        binName: bin.name,
        city: bin.city,
        wasteType: bin.wasteType || "N/A",
        quantity: bin.quantity || 0,
      });

      setBins((prev) =>
        prev.map((b) => (b._id === updatedBin._id ? updatedBin : b))
      );

      alert(`✅ ${bin.name} marked as collected by ${collector.name}!`);
      setSelectedBin(null);
    } catch (err) {
      console.error("Error updating bin:", err);
      alert("❌ Failed to mark bin as collected.");
    }
  };

  if (!isLoaded)
    return <div className="text-center p-10 text-gray-600">Loading map...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-sky-50">
      <Header />

      <div className="flex flex-1">
        <CollectorSidebar />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">🗺️ View Smart Bins</h1>

          <div className="flex gap-4 mb-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border px-3 py-2 rounded-lg shadow-sm"
            >
              <option value="All">All Bins</option>
              <option value="Full">Full</option>
              <option value="Moderate">Moderate</option>
              <option value="Normal">Normal</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
              {filteredBins.map((bin) => (
                <Marker
                  key={bin._id}
                  position={{ lat: bin.lat, lng: bin.lng }}
                  icon={{
                    url: getIcon(bin.level),
                    scaledSize: new window.google.maps.Size(25, 25),
                  }}
                  onClick={() => setSelectedBin(bin)}
                />
              ))}

              {selectedBin && (
                <InfoWindow
                  position={{ lat: selectedBin.lat, lng: selectedBin.lng }}
                  onCloseClick={() => setSelectedBin(null)}
                >
                  <div className="p-1">
                    <h3 className="font-semibold text-gray-800">{selectedBin.name}</h3>
                    <p className="text-sm text-gray-600">City: {selectedBin.city}</p>
                    <p className="text-sm text-gray-600">
                      Waste Type: {selectedBin.wasteType || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">Level: {selectedBin.level}%</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {selectedBin.quantity?.toFixed(1)} kg
                    </p>
                    <p className="text-sm text-gray-600">Status: {selectedBin.status}</p>
                    <p className="text-sm text-gray-600">
                      Assigned To: {selectedBin.userId?.name || "Unassigned"}
                    </p>

                    <button
                      onClick={() => handleStatusUpdate(selectedBin)}
                      className="mt-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Mark as Collected
                    </button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </main>
      </div>

      <Fotter />
    </div>
  );
}

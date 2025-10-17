import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { BinInfoWindow } from "./BinInfoWindow";
import { mapDefaults } from "../../../utils/mapUtils";

// 🗑️ Import bin level icons
import normalBinIcon from "../../../assets/bins/normalbin.png";
import moderateBinIcon from "../../../assets/bins/moderatebin.png";
import reachingBinIcon from "../../../assets/bins/reachingtofullbin.png";
import fullBinIcon from "../../../assets/bins/fullbin.png";

// ✅ Helper to pick icon based on fill level
const getBinIcon = (level) => {
  if (level >= 100) return fullBinIcon;
  if (level >= 80) return reachingBinIcon;
  if (level >= 50) return moderateBinIcon;
  return normalBinIcon;
};

export const BinMap = ({
  bins,
  selectedBin,
  onMapClick,
  onMarkerClick,
  onCloseInfo,
  onEdit,
  onDelete,
}) => (
  <GoogleMap
    mapContainerStyle={mapDefaults.containerStyle}
    center={mapDefaults.center}
    zoom={mapDefaults.zoom}
    onClick={onMapClick}
  >
    {bins.map((bin) => (
      <Marker
        key={bin._id}
        position={{ lat: bin.lat, lng: bin.lng }}
        icon={{
          url: getBinIcon(bin.level),
          scaledSize: new window.google.maps.Size(26, 26),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(13, 26),
        }}
        onClick={() => onMarkerClick(bin)}
        animation={
          bin.level >= 100 ? window.google.maps.Animation.BOUNCE : undefined
        }
      />
    ))}

    {selectedBin && (
      <BinInfoWindow
        bin={selectedBin}
        onClose={onCloseInfo}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    )}
  </GoogleMap>
);

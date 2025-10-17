import React from "react";

export const BinFormModal = ({
  visible,
  formData,
  users,
  onChange,
  onClose,
  onSubmit,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h3 className="text-xl font-semibold mb-4">
          {formData._id ? "Edit Bin" : "Add New Bin"}
        </h3>

        <form onSubmit={onSubmit} className="space-y-3">
          {/* Bin Name */}
          <input
            type="text"
            placeholder="Bin Name"
            value={formData.name}
            onChange={(e) => onChange({ ...formData, name: e.target.value })}
            className="border w-full px-3 py-2 rounded-lg"
            required
          />

          {/* Lat & Lng */}
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
            onChange={(e) => onChange({ ...formData, city: e.target.value })}
            className="border w-full px-3 py-2 rounded-lg"
          />

          {/* Waste Type */}
          <select
            value={formData.wasteType}
            onChange={(e) =>
              onChange({ ...formData, wasteType: e.target.value })
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

          {/* Assign to User */}
          <select
            value={formData.userId}
            onChange={(e) => onChange({ ...formData, userId: e.target.value })}
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
            onChange={(e) =>
              onChange({
                ...formData,
                level: Number(e.target.value),
              })
            }
            className="border w-full px-3 py-2 rounded-lg"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
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
  );
};

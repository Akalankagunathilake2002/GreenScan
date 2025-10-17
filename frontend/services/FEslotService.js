import api from "../utils/api";

// Fetch all slots
export const getAllSlots = async () => {
  try {
    const res = await api.get(`/slots`);
    return res.data;
  } catch (err) {
    console.error("Error fetching all slots:", err);
    throw err;
  }
};

// Update slot availability
export const updateSlotAvailability = async (slotId, isAvailable) => {
  try {
    const res = await api.put(`/slots/${slotId}/availability`, { isAvailable });
    return res.data;
  } catch (err) {
    console.error("Error updating slot:", err);
    throw err;
  }
};

// Create new slot
export const createSlot = async (slotData) => {
  const res = await api.post("/slots", slotData);
  return res.data;
};

// Fetch both trucks and collectors
export const getSlotResources = async () => {
  try {
    const res = await api.get("/slots/resources");
    return res.data; 
  } catch (err) {
    console.error("Error fetching slot resources:", err);
    throw err;
  }
};





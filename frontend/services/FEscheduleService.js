import api from "../utils/api";

// Create special collection request
export const createRequest = async (data) => {
  const payload = { ...data, slot: data.slot };
  delete payload.slot;

  try {
    const res = await api.post("/schedules/requests", payload);

    return res.data;
  } catch (err) {
    const backendMsg =
      err.response?.data?.message ||
      err.response?.data?.msg ||
      "Unable to connect to the server.";
    console.warn("⚠️ createRequest failed:", backendMsg);

    return { success: false, message: backendMsg, error: true };
  }
};

// Get all requests of a user
export const getUserRequests = async (userId) => {
  try {
    const res = await api.get(`/schedules/requests/${userId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching user requests:", err);
    throw err;
  }
};

// Update request status
export const updateRequestStatus = async (requestId, status) => {
  try {
    const res = await api.put(`/schedules/requests/${requestId}/status`, { status });
    return res.data;
  } catch (err) {
    console.error("Error updating request status:", err);
    throw err;
  }
};

export const fetchAllRequests = async () => {
  try {
    const res = await api.get("/schedules/requests");
    return res.data;
  } catch (err) {
    console.error("Error fetching all requests:", err);
    throw err;
  }
};
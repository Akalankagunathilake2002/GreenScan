import api from "../utils/api";

export const createPayment = async (data) => {
  try {
    const res = await api.post("/payments", data);
    return res.data;
  } catch (err) {
    console.error("Error creating payment:", err);
    throw err;
  }
};


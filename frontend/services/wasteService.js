import axios from "axios";
const API_BASE = "http://localhost:5002/api/waste";

export const fetchWasteRecords = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const saveWasteRecord = async (data) => {
  return await axios.post(API_BASE, data);
};

export const updateWasteRecord = async (id, data) => {
  return await axios.put(`${API_BASE}/${id}`, data);
};

export const deleteWasteRecord = async (id) => {
  return await axios.delete(`${API_BASE}/${id}`);
};

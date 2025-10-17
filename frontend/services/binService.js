import api from "../utils/api";
import { getBinStatus } from "../components/utils/statusUtils";

export const binService = {
  async getAll() {
    const { data } = await api.get("/bins");
    return data;
  },

  async create(bin) {
    const payload = { ...bin, status: getBinStatus(bin.level) };
    const { data } = await api.post("/bins", payload);
    return data;
  },

  async update(id, bin) {
    const payload = { ...bin, status: getBinStatus(bin.level) };
    const { data } = await api.put(`/bins/${id}`, payload);
    return data;
  },

  async remove(id) {
    await api.delete(`/bins/${id}`);
  },
};

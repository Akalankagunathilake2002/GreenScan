import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const userService = {
  async getAll() {
    const { data } = await axios.get(API_URL);
    return data;
  },
};

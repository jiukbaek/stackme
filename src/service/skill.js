import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getAllSkill = async () => {
  const result = await axios.get(`${API_URL}/skill`);
  return result;
};

import axios from "axios";

const API_URL = "/api";

export const getAllSkill = async () => {
  const result = await axios.get(`${API_URL}/skill`);
  return result;
};

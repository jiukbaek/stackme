import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getProjectRandom = async (count = 10) => {
  const result = await axios.get(`${API_URL}/project/random?number=${count}`);
  return result;
};

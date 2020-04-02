import axios from "axios";
import { getToken } from "../utils";

const API_URL = "http://localhost:3000/api";

export const getProjectRandom = async (count = 10) => {
  return await axios.get(`${API_URL}/project/random?number=${count}`);
};

export const getMyProject = async () => {
  const token = getToken();
  return await axios.get(`${API_URL}/project`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const registProject = async values => {
  const token = getToken();
  return await axios.post(`${API_URL}/project`, values, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

import axios from "axios";
import { getToken } from "../utils";

const API_URL = "http://localhost:3000/api";

export const getUser = async id => {
  const token = getToken();
  const result = await axios.get(`${API_URL}/user/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return result;
};

export const modifyUser = async (id, modifyObj) => {
  const token = getToken();
  const result = await axios.patch(`${API_URL}/user/${id}`, modifyObj, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return result;
};

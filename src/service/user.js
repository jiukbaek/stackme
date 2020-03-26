import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getUser = async id => {
  const token = localStorage.getItem("token");
  const result = await axios.get(`${API_URL}/user/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log(result);
};

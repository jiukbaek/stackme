import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const login = async (email, password) => {
  const result = await axios.post(`${API_URL}/auth/login`, { email, password });
  if (result) {
    const { token } = result.data;
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  }
  return result;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
};

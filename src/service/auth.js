import axios from "axios";

const API_URL = "/api";

export const createUser = async ({ email, password, name, birth }) => {
  const result = await axios.post(`${API_URL}/user`, {
    email,
    password,
    name,
    birth,
  });
  return result;
};

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

export const verifySignup = async (email) => {
  const result = await axios.post(`${API_URL}/auth/verify`, { email });
  return result;
};

export const checkEmailCode = async (email, code) => {
  const result = await axios.post(`${API_URL}/auth/verify/check`, {
    email,
    code,
  });
  return result;
};

import axios from "axios";
import { getToken } from "../utils";

const API_URL = "/api";

export const getCareer = async () => {
  const token = getToken();
  const result = await axios.get(`${API_URL}/career`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return result;
};

export const createCareer = async (company, duty, join_date, end_date) => {
  const token = getToken();
  const result = await axios.post(
    `${API_URL}/career`,
    {
      company,
      duty,
      join_date,
      end_date,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return result;
};

export const modifyCareer = async (id, values) => {
  const token = getToken();
  const result = await axios.patch(
    `${API_URL}/career/${id}`,
    { ...values },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return result;
};

export const deleteCareer = async (id) => {
  const token = getToken();
  const result = await axios.delete(`${API_URL}/career/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return result;
};

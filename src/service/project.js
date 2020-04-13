import axios from "axios";
import { getToken } from "../utils";

const API_URL = "http://localhost:3000/api";

export const getProjectRandom = async (count = 10) => {
  return await axios.get(`${API_URL}/project/random?number=${count}`);
};

export const getProject = async (page, perPage, showing = false) => {
  const token = getToken();
  let filterStr = "";

  const q = showing ? "" : localStorage.getItem("q");
  const filterSkill = showing
    ? localStorage.getItem("publicFilterSkill")
    : localStorage.getItem("filterSkill");

  if (q) filterStr += `&q=${q}`;
  if (filterSkill) filterStr += `&skills=${filterSkill}`;
  if (showing) filterStr += `&showing=Y`;

  const result = await axios.get(
    `${API_URL}/project?page=${page}&perPage=${perPage}${filterStr}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return result;
};

export const registProject = async (values) => {
  const token = getToken();
  return await axios.post(`${API_URL}/project`, values, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getProjectId = async (id) => {
  const token = getToken();
  localStorage.setItem("cpId", id);
  return await axios.get(`${API_URL}/project/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const modifyProject = async (values) => {
  const token = getToken();
  const id = localStorage.getItem("cpId");
  return await axios.patch(
    `${API_URL}/project/${id}`,
    {
      ...values,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const deleteProject = async (id) => {
  const token = getToken();
  return await axios.delete(`${API_URL}/project/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

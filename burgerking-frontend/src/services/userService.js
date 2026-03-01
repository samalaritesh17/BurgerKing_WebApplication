import { api } from "./api";

const BASE_URL = "/api/admin/users";

export const getAllUsers = async () => {
  const res = await api.get(BASE_URL);
  return res.data;
};

export const addUser = async (user) => {
  const res = await api.post(BASE_URL, user);
  return res.data;
};

export const updateUser = async (id, user) => {
  const res = await api.put(`${BASE_URL}/${id}`, user);
  return res.data;
};

export const toggleUserStatus = async (id) => {
  const res = await api.patch(`${BASE_URL}/${id}/toggle`);
  return res.data;
};

export const deleteUser = async (id) => {
  await api.delete(`${BASE_URL}/${id}`);
};

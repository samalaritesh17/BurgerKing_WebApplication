import { api } from "./api";

const BASE_URL = "/api/admin/dishes";

export async function getAllDishes() {
  const res = await api.get(BASE_URL);
  return res.data;
}

export async function toggleAvailability(id) {
  await api.patch(`${BASE_URL}/${id}/availability`);
}

export async function toggleDiscount(id, discount) {
  await api.patch(`${BASE_URL}/${id}/discount-toggle`, { discount });
}

export async function deleteDish(id) {
  await api.delete(`${BASE_URL}/${id}`);
}

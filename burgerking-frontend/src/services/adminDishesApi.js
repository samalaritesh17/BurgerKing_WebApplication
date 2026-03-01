import { api } from "./api";

const API = "/api/admin/dishes";

// GET all dishes
export const fetchDishes = async () => {
  const res = await api.get(API);
  return res.data;
};

// TOGGLE availability ✅ (already correct)
export const toggleAvailability = async (id) => {
  await api.patch(`${API}/${id}/availability`);
  const res = await api.get(`${API}/${id}`);
  return res.data;
};

// UPDATE price (pricing)
export const updatePricing = async (id, price, discount) => {
  await api.patch(`${API}/${id}/pricing`, {
    price,
    discount,
  });
  const res = await api.get(`${API}/${id}`);
  return res.data;
};

// TOGGLE discount
export const toggleDiscount = async (id) => {
  await api.patch(`${API}/${id}/discount-toggle`);
  const res = await api.get(`${API}/${id}`);
  return res.data;
};

// DELETE
export const deleteDish = async (id) => {
  await api.delete(`${API}/${id}`);
};

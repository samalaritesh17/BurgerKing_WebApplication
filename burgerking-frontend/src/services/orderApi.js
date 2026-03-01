import { api } from "./api";

export const fetchOrderSummary = () => api.get("/api/admin/orders/summary");

export const fetchRecentOrders = (page = 0, size = 10) =>
  api.get(`/api/admin/orders?page=${page}&size=${size}`);

export const fetchOrderDetails = (orderId) =>
  api.get(`/api/admin/orders/${orderId}/details`);

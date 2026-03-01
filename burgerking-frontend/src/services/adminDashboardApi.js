import { api } from "./api";

export async function fetchAdminKpis() {
  try {
    const res = await api.get("/api/admin/dashboard/kpis");
    return res.data;
  } catch (err) {
    const status = err?.response?.status;
    const msg = err?.response?.data?.message || err?.message;
    throw new Error(
      status ? `Failed to fetch dashboard KPIs (HTTP ${status})${msg ? `: ${msg}` : ""}` : "Failed to fetch dashboard KPIs"
    );
  }
}

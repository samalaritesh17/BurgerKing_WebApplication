import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  // Prefer admin token so other portals don't override it.
  const token =
    localStorage.getItem("adminToken") ||
    localStorage.getItem("token");
  if (token) {
    const bearer = `Bearer ${String(token).trim()}`;
    config.headers = config.headers || {};
    // Axios v1 uses AxiosHeaders; direct assignment can be ignored.
    if (typeof config.headers.set === "function") {
      config.headers.set("Authorization", bearer);
    } else {
      config.headers.Authorization = bearer;
    }
  }

  // Dev-only: helps confirm header presence without printing the token.
  try {
    const isDev = typeof import.meta !== "undefined" && import.meta.env && import.meta.env.DEV;
    if (isDev) {
      const hasAuth =
        (typeof config.headers?.get === "function" && !!config.headers.get("Authorization")) ||
        !!config.headers?.Authorization;
      // eslint-disable-next-line no-console
      console.debug("[api]", config.method?.toUpperCase?.() || "GET", config.url, "auth:", hasAuth);
    }
  } catch {
    // ignore
  }

  return config;
});

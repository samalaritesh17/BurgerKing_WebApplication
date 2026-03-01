import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/billingAuthService";
import "../css/login.css";

const LoginPage = () => {
  const navigate = useNavigate();

  // ✅ STATE (THIS WAS MISSING / BROKEN)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(username, password);
      console.log("LOGIN RESPONSE 👉", response);

      // ✅ Store JWT token if backend returns it (try common shapes)
      const looksLikeJwt = (s) =>
        typeof s === "string" && /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(s) && s.length > 40;

      const findJwtDeep = (obj) => {
        if (!obj || typeof obj !== "object") return null;
        const seen = new Set();
        const stack = [obj];
        while (stack.length) {
          const cur = stack.pop();
          if (!cur || typeof cur !== "object") continue;
          if (seen.has(cur)) continue;
          seen.add(cur);
          for (const v of Object.values(cur)) {
            if (looksLikeJwt(v)) return v;
            if (v && typeof v === "object") stack.push(v);
          }
        }
        return null;
      };

      const token =
        response?.token ||
        response?.accessToken ||
        response?.access_token ||
        response?.jwt ||
        response?.jwtToken ||
        response?.idToken ||
        response?.data?.token ||
        response?.data?.accessToken ||
        findJwtDeep(response);

       if (token) {
         // Keep billing token separate; admin portal uses its own token key.
         localStorage.setItem("billingToken", token);
       }

      // ✅ Store entire backend response (includes id)
      localStorage.setItem(
        "billingUser",
        JSON.stringify(response)
      );

      // ✅ Redirect
      navigate("/billing/dashboard");

    } catch (err) {
      setError("Invalid username or password");
    }

  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Billing Portal Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="error">{error}</div>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

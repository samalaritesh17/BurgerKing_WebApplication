import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ MISSING IMPORT
import "../styles/register.css"; // reuse same premium styles

const extractToken = (res) => {
  const looksLikeJwt = (s) => {
    if (typeof s !== "string") return false;
    // Basic JWT shape: three base64url parts
    return /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(s) && s.length > 40;
  };

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
        if (typeof v === "string" && looksLikeJwt(v)) return v;
        if (v && typeof v === "object") stack.push(v);
      }
    }

    return null;
  };

  const headerAuth = res?.headers?.authorization || res?.headers?.Authorization;
  if (typeof headerAuth === "string" && headerAuth.toLowerCase().startsWith("bearer ")) {
    return headerAuth.slice(7).trim();
  }

  if (typeof headerAuth === "string" && looksLikeJwt(headerAuth.trim())) {
    return headerAuth.trim();
  }

  const d = res?.data;

  const direct =
    d?.token ||
    d?.accessToken ||
    d?.access_token ||
    d?.jwt ||
    d?.jwtToken ||
    d?.idToken ||
    d?.data?.token ||
    d?.data?.accessToken ||
    d?.data?.jwt ||
    null;

  if (direct) return direct;

  // Fallback: find any JWT-like string in the response payload
  return findJwtDeep(d);
};

const extractRole = (data) => {
  const role = data?.role || data?.user?.role;
  if (role) return role;

  const roles = data?.roles || data?.user?.roles;
  if (Array.isArray(roles) && roles.length) return roles[0];

  const auth = data?.authorities || data?.user?.authorities;
  if (Array.isArray(auth) && auth.length) {
    const a0 = auth[0];
    return typeof a0 === "string" ? a0 : a0?.authority;
  }

  return null;
};

const isAdminRole = (role) => {
  if (!role) return false;
  const r = String(role).toUpperCase();
  return r === "ADMIN" || r === "ROLE_ADMIN";
};

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  if (!username || !password) {
    setError("Please enter username and password");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:8080/api/auth/login",
      { username, password }
    );

    // Token is optional (auth is disabled in backend for now).
    const token = extractToken(res);
    if (token) {
      localStorage.setItem("adminToken", token);
      localStorage.setItem("token", token);
    }

    const role = extractRole(res.data);

    if (isAdminRole(role)) {
      // ✅ STORE LOGIN STATE
      localStorage.setItem("isAdminLoggedIn", "true");
      localStorage.setItem("role", "ADMIN");
      localStorage.setItem("username", username);

      // ✅ NAVIGATE & REMOVE LOGIN PAGE FROM HISTORY
      navigate("/admin", { replace: true });
    } else {
      setError("Access denied. Admins only.");
    }

  } catch (err) {
    setError(
      err.response?.data?.message || "Login failed. Server error."
    );
  }
};


  return (
    <div className="register-wrapper">
      <div className="overlay"></div>

      <div className="register-card">
        <h1 className="title">Admin Login</h1>
        <p className="subtitle">
          Login to BurgerKing Admin Panel
        </p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>

          {error && <p style={{ color: "#ffb3b3" }}>{error}</p>}

          <button className="btn-register">Login</button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p style={{ color: "#ccc" }}>
            Not registered yet?
          </p>
          <button
            className="btn-back"
            onClick={() => navigate("/register")}
          >
            Go to Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

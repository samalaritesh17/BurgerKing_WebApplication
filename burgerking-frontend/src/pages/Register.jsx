import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import Toast from "../components/common/Toast";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [fieldError, setFieldError] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  const validate = () => {
    const errors = {};

    const u = username.trim();
    if (!u) errors.username = "Username is required";
    if (u && u.length < 3) errors.username = "Username must be at least 3 characters";

    if (!role) errors.role = "Role is required";

    const p = password;
    if (!p) errors.password = "Password is required";

    if (p) {
      const checks = [
        { ok: p.length >= 8, msg: "At least 8 characters" },
        { ok: /[a-z]/.test(p), msg: "One lowercase letter" },
        { ok: /[A-Z]/.test(p), msg: "One uppercase letter" },
        { ok: /\d/.test(p), msg: "One number" },
        { ok: /[^A-Za-z0-9]/.test(p), msg: "One special character" },
      ];

      const failed = checks.filter((c) => !c.ok).map((c) => c.msg);
      if (failed.length) {
        errors.password = `Weak password: ${failed.join(", ")}`;
      }
    }

    if (!confirmPassword) errors.confirmPassword = "Please confirm password";
    if (confirmPassword && password && confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFieldError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setSubmitting(true);
      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            role,
          }),
        }
      );

      const result = await response.text();

      if (result === "USERNAME_ALREADY_EXISTS") {
        setToast("Username already exists. Try another.");
        return;
      }

      // ✅ Success
      setMessage(`You have successfully registered as ${role}`);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setToast("Server error. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="overlay"></div>

      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}

      <div className="register-card">
        {!success ? (
          <>
            <h1 className="title">Register</h1>
            <p className="subtitle">
              Create your BurgerKing system account
            </p>

            <form onSubmit={handleRegister}>
              <div className="input-group">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (fieldError.username) setFieldError((p) => ({ ...p, username: "" }));
                  }}
                />
                {fieldError.username ? (
                  <p style={{ color: "#ffb3b3", marginTop: 8, fontSize: 12 }}>
                    {fieldError.username}
                  </p>
                ) : null}
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldError.password) setFieldError((p) => ({ ...p, password: "" }));
                  }}
                />
                {fieldError.password ? (
                  <p style={{ color: "#ffb3b3", marginTop: 8, fontSize: 12 }}>
                    {fieldError.password}
                  </p>
                ) : null}
              </div>

              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (fieldError.confirmPassword) {
                      setFieldError((p) => ({ ...p, confirmPassword: "" }));
                    }
                  }}
                />
                {fieldError.confirmPassword ? (
                  <p style={{ color: "#ffb3b3", marginTop: 8, fontSize: 12 }}>
                    {fieldError.confirmPassword}
                  </p>
                ) : null}
              </div>

              <div className="input-group">
                <label>User Role</label>
                <select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    if (fieldError.role) setFieldError((p) => ({ ...p, role: "" }));
                  }}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="KITCHEN">KITCHEN</option>
                </select>
                {fieldError.role ? (
                  <p style={{ color: "#ffb3b3", marginTop: 8, fontSize: 12 }}>
                    {fieldError.role}
                  </p>
                ) : null}
              </div>

              <button className="btn-register" disabled={submitting}>
                {submitting ? "Registering..." : "Register"}
              </button>
            </form>
          </>
        ) : (
          <div className="success-box">
            <div className="success-icon">✅</div>
            <h2>Registration Successful</h2>
            <p>{message}</p>

            <button className="btn-back" onClick={() => navigate("/")}>
              Go to Welcome Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;

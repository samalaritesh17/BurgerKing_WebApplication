import { useNavigate } from "react-router-dom";
import "../css/billing-welcome.css";

const BillingWelcome = () => {
  const navigate = useNavigate();

  return (
    <div className="billing-wrapper">
      <div className="billing-overlay" />

      <div className="billing-grid">
        {/* LEFT SECTION */}
        <div className="billing-left">
          <h1 className="billing-brand">
            Burger<span>King</span>
          </h1>

          <h2 className="billing-headline">
            Billing & Order Processing Portal
          </h2>

          <p className="billing-tagline">
            Secure, fast, and accurate billing operations for in-store orders.
            Designed for speed, reliability, and control at scale.
          </p>

          <div className="billing-cta">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/billing/login")}
            >
              Proceed to Billing Login
            </button>

            <button
              className="btn btn-outline"
              onClick={() => navigate("/")}
            >
              Back to Admin Control
            </button>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="billing-right">
          <div className="glass-card">
            <div className="icon">🧾</div>
            <h3>Real-Time Billing</h3>
            <p>
              Generate bills instantly, manage live orders, and ensure accurate
              transaction handling with role-based access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingWelcome;

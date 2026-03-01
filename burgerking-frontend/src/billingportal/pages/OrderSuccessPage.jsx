import { useLocation, useNavigate } from "react-router-dom";
import BillingNavbar from "../components/BillingNavbar";
import "../css/orderSuccess.css";
import "../css/billingShell.css";

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderNumber = location.state?.orderNumber;

  return (
    <div className="billing-shell">
      <BillingNavbar
        onLogout={() => {
          localStorage.clear();
          window.history.replaceState(null, "", "/");
          navigate("/", { replace: true });
        }}
      />

      <div className="success-wrapper">
        <div className="success-card">

          {/* Animated Checkmark */}
          <div className="checkmark-circle">
            <div className="checkmark draw"></div>
          </div>

          <h1 className="success-title">
            Order Placed Successfully
          </h1>

          <p className="success-subtext">
            Your Order ID
          </p>

          <div className="order-id-box">
            {orderNumber}
          </div>

          <p className="info-text">
            Please share this Order ID with the customer.
          </p>

          <button className="back-dashboard-btn" onClick={() => navigate("/billing/dashboard")}
          >Back to Dashboard</button>

        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;

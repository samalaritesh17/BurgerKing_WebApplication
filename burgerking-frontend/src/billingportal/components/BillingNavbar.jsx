import { useEffect, useState } from "react";
import "../css/billingNavbar.css";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const BillingNavbar = ({ username: usernameProp, onLogout }) => {
  const [username, setUsername] = useState("User");
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (usernameProp) {
      setUsername(usernameProp);
      return;
    }

    const storedUser = JSON.parse(
      localStorage.getItem("billingUser")
    );

    if (storedUser?.username) {
      setUsername(storedUser.username);
    }
  }, [usernameProp]);

  return (
    <header className="billing-navbar">
      <div className="nav-container">

        {/* LEFT SECTION */}
        <div className="nav-left">
          <div className="brand-section">
            <span className="brand-icon">🍔</span>

            <div className="brand-text">
              <h1 className="brand-title">
                Billing Portal
              </h1>
              <span className="brand-subtitle">
                Fast & Secure Billing
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="nav-right">
          <div className="user-info">
            <span className="user-label">
              Welcome
            </span>
            <span className="username">
              {username}
            </span>
          </div>

          {onLogout && (
            <button
              className="logout-btn"
              onClick={() => setConfirmOpen(true)}
              aria-label="Logout"
            >
              <span className="logout-text">Logout</span>
              <span className="logout-icon">⎋</span>
            </button>
          )}
        </div>

      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Logout"
        description="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        danger
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          onLogout?.();
        }}
      />
    </header>
  );
};

export default BillingNavbar;

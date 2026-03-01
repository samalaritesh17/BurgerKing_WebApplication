import { useNavigate } from "react-router-dom";
import "../styles/welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-wrapper">
      {/* Overlay for depth */}
      <div className="overlay"></div>

      {/* Main Content */}
      <div className="welcome-grid">
        {/* LEFT SECTION */}
        <div className="left-section">
          <h1 className="brand">
            Burger<span>King</span>
          </h1>

          <h2 className="headline">
            Admin Control Center
          </h2>

          <p className="tagline">
            A powerful dashboard to manage dishes, pricing, kitchen workflow,
            and customer orders in real time.
          </p>

          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn btn-outline" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="right-section">
          <div className="glass-card">
            <div className="icon">🍔</div>
            <h3>Smart Restaurant Management</h3>
            <p>
              Real-time orders • Dynamic pricing • Kitchen coordination •
              Customer tracking
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;

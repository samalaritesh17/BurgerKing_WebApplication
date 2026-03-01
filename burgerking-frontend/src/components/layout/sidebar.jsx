import {
  FaChartLine,
  FaUtensils,
  FaUsers,
  FaShoppingCart
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar-premium">
      <div className="brand">🍔 BurgerKing</div>

      <nav className="nav-menu">
        <button
          className={`nav-item ${
            location.pathname === "/admin" ? "active" : ""
          }`}
          onClick={() => navigate("/admin")}
        >
          <FaChartLine /> Dashboard
        </button>

        <button
          className={`nav-item ${
            location.pathname === "/admin/dishes" ? "active" : ""
          }`}
          onClick={() => navigate("/admin/dishes")}
        >
          <FaUtensils /> Dishes
        </button>

        <button
          className={`nav-item ${
            location.pathname === "/admin/staff" ? "active" : ""
          }`}
          onClick={() => navigate("/admin/staff")}
        >
          <FaUsers /> Manage Staff
        </button>

        <button
          className={`nav-item ${
            location.pathname.startsWith("/admin/orders") ? "active" : ""
          }`}
          onClick={() => navigate("/admin/orders")}
        >
          <FaShoppingCart /> Manage Orders
        </button>


      </nav>
    </aside>
  );
};

export default Sidebar;

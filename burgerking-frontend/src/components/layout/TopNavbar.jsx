import { FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmDialog from "../common/ConfirmDialog";

const TopNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const menuRef = useRef(null);

  const username = localStorage.getItem("username") || "Admin";
  const role = localStorage.getItem("role") || "ADMIN";

  const title = (() => {
    const path = location.pathname;
    if (path === "/admin") return "Dashboard";
    if (path.startsWith("/admin/orders")) return "Orders";
    if (path.startsWith("/admin/dishes")) return "Dishes";
    if (path.startsWith("/admin/staff")) return "Staff";
    return "Admin";
  })();

  useEffect(() => {
    if (!menuOpen) return;

    const onDown = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };

    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [menuOpen]);

  const doLogout = () => {
    setConfirmOpen(false);
    setMenuOpen(false);
    localStorage.clear();
    window.history.replaceState(null, "", "/");
    navigate("/", { replace: true });
  };

  return (
    <header className="topbar-glass">
      <h2>{title}</h2>

      <div className="topbar-actions">
        <div className="profile" ref={menuRef}>
          <button
            type="button"
            className="profile-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Profile"
            aria-expanded={menuOpen}
          >
            <FaUserCircle className="avatar" />
          </button>

          {menuOpen && (
            <div className="profile-menu" role="menu">
              <div className="profile-meta">
                <div className="profile-name">{username}</div>
                <div className="profile-role">{role}</div>
              </div>

              <button
                type="button"
                className="profile-logout"
                onClick={() => setConfirmOpen(true)}
              >
                Logout
              </button>
            </div>
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
        onConfirm={doLogout}
      />
    </header>
  );
};

export default TopNavbar;

import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./sidebar";
import TopNavbar from "./TopNavbar";

import "../../styles/adminLayout.css";

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    const role = localStorage.getItem("role");

    if (!isLoggedIn || role !== "ADMIN") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="admin-shell">
      <Sidebar />
      <div className="admin-main">
        <TopNavbar />
        <div className="admin-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

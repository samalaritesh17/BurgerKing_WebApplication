import { useEffect, useState } from "react";
import StatsGrid from "../components/dashboard/StatsGrid";
import { fetchAdminKpis } from "../services/adminDashboardApi";

import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdminKpis()
      .then((data) => {
        console.log("Admin KPIs Response:", data);
        setKpis(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Admin KPI fetch failed:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-dashboard">
      {loading && <p className="loading-text">Loading dashboard...</p>}

      {error && <p className="error-text">{error}</p>}

      {kpis && <StatsGrid kpis={kpis} />}
    </div>
  );
};

export default AdminDashboard;

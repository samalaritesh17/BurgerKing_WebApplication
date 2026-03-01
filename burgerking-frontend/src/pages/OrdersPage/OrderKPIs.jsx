import { useEffect, useState } from "react";
import { fetchOrderSummary } from "../../services/orderApi";

const OrderKPIs = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchOrderSummary()
      .then(res => setSummary(res.data))
      .catch(err => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ color: "#94a3b8" }}>Loading order summary...</p>;
  }

  if (error || !summary) {
    return <p style={{ color: "red" }}>Failed to load order summary</p>;
  }

  return (
    <div className="kpi-grid">
      <div className="kpi-card">
        <h3>Today Orders</h3>
        <p>{summary.totalOrdersToday}</p>
      </div>

      <div className="kpi-card">
        <h3>Today Revenue</h3>
        <p>₹{summary.totalRevenueToday}</p>
      </div>

      <div className="kpi-card">
        <h3>Placed</h3>
        <p>{summary.placedOrders}</p>
      </div>

      <div className="kpi-card">
        <h3>Preparing</h3>
        <p>{summary.preparingOrders}</p>
      </div>

      <div className="kpi-card">
        <h3>Ready</h3>
        <p>{summary.readyOrders}</p>
      </div>
    </div>
  );
};

export default OrderKPIs;

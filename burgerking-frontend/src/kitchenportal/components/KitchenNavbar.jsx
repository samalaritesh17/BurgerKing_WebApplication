import { useEffect, useState } from "react";

const KitchenNavbar = ({ total, waiting, preparing }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Date → Nov 17 2026
  const formattedDate = time
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .replace(",", "");

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="k-topbar">
      <span className="k-topbar-brand">Kitchen OS</span>

      <div className="k-topbar-sep" />

      <div className="k-kpi-row">
        <div className="k-kpi k-kpi--red">
          <span className="k-kpi-count">{waiting}</span>
          <span className="k-kpi-label">New</span>
        </div>

        <div className="k-kpi k-kpi--amber">
          <span className="k-kpi-count">{preparing}</span>
          <span className="k-kpi-label">Cooking</span>
        </div>

        <div className="k-kpi k-kpi--green">
          <span className="k-kpi-count">{total}</span>
          <span className="k-kpi-label">Total</span>
        </div>
      </div>

      {/* Date & Time Section */}
      <div className="k-clock-wrapper">
        <div className="k-date">{formattedDate}</div>
        <div className="k-clock">{formattedTime}</div>
      </div>
    </div>
  );
};

export default KitchenNavbar;
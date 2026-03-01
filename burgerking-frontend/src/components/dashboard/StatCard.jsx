import { useEffect, useState } from "react";

const StatCard = ({ title, value, danger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = Number.isFinite(Number(value)) ? Number(value) : 0;
    let start = 0;
    const duration = 800;
    const increment = Math.max(1, Math.ceil(target / (duration / 16)));

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setCount(start);
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className={`kpi-card ${danger ? "danger" : ""}`}>
      <p>{title}</p>
      <h1>{count}</h1>
    </div>
  );
};

export default StatCard;

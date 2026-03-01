import StatCard from "./StatCard";

const StatsGrid = ({ kpis }) => {
  return (
    <div className="kpi-grid">
      <StatCard title="Total Dishes" value={kpis.totalDishes} />
      <StatCard title="Available Dishes" value={kpis.availableDishes} />
      <StatCard title="Out of Stock" value={kpis.outOfStockDishes} danger />
      <StatCard title="Today's Orders" value={kpis.todayOrders} />
      <StatCard title="Admins" value={kpis.admins} />
      <StatCard title="Kitchen Staff" value={kpis.kitchenStaff} />
      <StatCard title="Billing Users" value={kpis.billingUsers} />
    </div>
  );
};

export default StatsGrid;

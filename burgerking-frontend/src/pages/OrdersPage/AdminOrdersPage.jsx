import "./orders.css";
import OrderKPIs from "./OrderKPIs";
import OrdersTable from "./OrdersTable";

const AdminOrdersPage = () => {
  return (
<div className="orders-page">
  <div className="page-header">
    <h1>Orders</h1>
    <p>Overview of today’s orders and revenue</p>
  </div>

  <OrderKPIs />
  <OrdersTable />
</div>
  );
};

export default AdminOrdersPage;

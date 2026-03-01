import { useEffect, useState } from "react";
import KitchenNavbar from "../components/KitchenNavbar";
import OrderCard from "../components/OrderCard";
import "../css/kitchen.css";

const KitchenDashboard = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/kitchen/orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const newOrders      = orders.filter(o => o.status === "PLACED");
  const cookingOrders  = orders.filter(o => o.status === "PREPARING");

  return (
    <div className="kitchen-root">
      <KitchenNavbar
        total={orders.length}
        waiting={newOrders.length}
        preparing={cookingOrders.length}
      />

      {/* Two-lane Kanban */}
      <div className="k-lanes">

        {/* LEFT — New Orders */}
        <div className="k-lane k-lane--new">
          <div className="k-lane-header">
            <div className="k-lane-icon" />
            <span className="k-lane-title">New Orders</span>
            <span className="k-lane-count">{newOrders.length}</span>
          </div>
          <div className="k-lane-body">
            {newOrders.length === 0 ? (
              <div className="k-lane-empty">All clear</div>
            ) : (
              newOrders.map(order => (
                <OrderCard key={order.id} order={order} refreshOrders={fetchOrders} />
              ))
            )}
          </div>
        </div>

        {/* RIGHT — Cooking */}
        <div className="k-lane k-lane--cooking">
          <div className="k-lane-header">
            <div className="k-lane-icon" />
            <span className="k-lane-title">Cooking</span>
            <span className="k-lane-count">{cookingOrders.length}</span>
          </div>
          <div className="k-lane-body">
            {cookingOrders.length === 0 ? (
              <div className="k-lane-empty">Nothing cooking</div>
            ) : (
              cookingOrders.map(order => (
                <OrderCard key={order.id} order={order} refreshOrders={fetchOrders} />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default KitchenDashboard;
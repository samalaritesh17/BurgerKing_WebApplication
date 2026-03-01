import { useEffect, useState } from "react";
import { fetchRecentOrders } from "../../services/orderApi";
import OrderDetailsCard from "./OrderDetailsCard";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchRecentOrders(0, 10)
      .then(res => {
        setOrders(res.data.content || []);
      })
      .catch(err => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ color: "#94a3b8" }}>Loading orders...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Failed to load orders</p>;
  }

  if (orders.length === 0) {
    return <p style={{ color: "#94a3b8" }}>No orders found</p>;
  }

  return (
    <>
      <div className="table-card">
        <table className="premium-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order.orderId}>
                <td>{order.orderNumber}</td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => setSelectedOrderId(order.orderId)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrderId && (
        <OrderDetailsCard
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </>
  );
};

export default OrdersTable;

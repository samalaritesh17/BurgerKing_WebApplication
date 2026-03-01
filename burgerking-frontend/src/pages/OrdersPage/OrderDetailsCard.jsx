import { useEffect, useState } from "react";
import { fetchOrderDetails } from "../../services/orderApi";

const OrderDetailsCard = ({ orderId, onClose }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails(orderId)
      .then(res => setOrder(res.data))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return <p style={{ color: "#94a3b8" }}>Loading order details...</p>;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="order-card" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="card-header">
          <div>
            <h3>Order #{order.orderNumber}</h3>
            <p className="muted">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Meta */}
        <div className="order-meta">
          <span><strong>Created by:</strong> {order.createdBy}</span>
          <span className={`status ${order.statusTimeline.at(-1).status.toLowerCase()}`}>
            {order.statusTimeline.at(-1).status}
          </span>
        </div>

        {/* Items */}
        <h4 className="section-title">Items</h4>
        <table className="items-table">
          <thead>
            <tr>
              <th>Dish</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i}>
                <td>{item.dishName}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total">
          Total: <strong>₹{order.totalAmount}</strong>
        </div>

        {/* Timeline */}
        <h4 className="section-title">Order Timeline</h4>
        <div className="timeline">
          {order.statusTimeline.map((step, i) => (
            <div className="timeline-item" key={i}>
              <div className="dot" />
              <div className="content">
                <span className="status-text">{step.status}</span>
                <span className="time">
                  {new Date(step.changedAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default OrderDetailsCard;

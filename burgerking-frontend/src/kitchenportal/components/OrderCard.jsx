import { useEffect, useState } from "react";

const OrderCard = ({ order, refreshOrders }) => {
  const [localStatus, setLocalStatus] = useState(order.status);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);

  // Live Timer
  useEffect(() => {
    const interval = setInterval(() => {
      const minutes =
        (Date.now() - new Date(order.createdAt)) / 60000;
      setElapsedMinutes(Math.floor(minutes));
    }, 1000);

    return () => clearInterval(interval);
  }, [order.createdAt]);

  useEffect(() => {
    setLocalStatus(order.status);
  }, [order.status]);

  const handleAccept = async () => {
    setLocalStatus("PREPARING"); // instant UI feedback

    await fetch(
      `http://localhost:8080/api/kitchen/orders/${order.id}/accept`,
      { method: "PUT" }
    );

    refreshOrders();
  };

  const handleReady = async () => {
    setLocalStatus("READY");

    await fetch(
      `http://localhost:8080/api/kitchen/orders/${order.id}/ready`,
      { method: "PUT" }
    );

    // Smooth fade before refresh
    setTimeout(() => {
      refreshOrders();
    }, 1000);
  };

  // 🚨 Overdue logic (>15 minutes)
  const isOverdue =
    elapsedMinutes > 15 && localStatus !== "READY";

  // Determine card class
  const getCardClass = () => {
    if (isOverdue) return "k-card k-card--overdue";
    if (localStatus === "PLACED")
      return "k-card k-card--new";
    if (localStatus === "PREPARING")
      return "k-card k-card--cooking";
    if (localStatus === "READY")
      return "k-card k-card--ready";

    return "k-card";
  };

  const getTagLabel = () => {
    if (localStatus === "PLACED") return "New Order";
    if (localStatus === "PREPARING") return "Cooking";
    if (localStatus === "READY") return "Ready";
    return "";
  };

  return (
    <div className={getCardClass()}>
      <div className="k-card-inner">

        {/* Header */}
        <div className="k-card-top">
          <div>
            <span className="k-order-number">
              {order.orderNumber}
            </span>

            {/* Live Timer */}
            <div
              className="k-timer"
              style={{
                color: isOverdue
                  ? "#ff3b30"
                  : elapsedMinutes > 10
                  ? "#ff9f0a"
                  : "#999",
              }}
            >
              {elapsedMinutes} min
            </div>
          </div>

          <span className="k-status-tag">
            {getTagLabel()}
          </span>
        </div>

        {/* Items */}
        {order.items?.length > 0 && (
          <div className="k-items">
            {order.items.map((item, i) => (
              <div className="k-item" key={i}>
                <span className="k-item-name">
                  {item.dishName}
                </span>
                <span className="k-item-qty">
                  ×{item.quantity}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {localStatus === "PLACED" && (
          <button
            className="k-action-btn k-action-btn--accept"
            onClick={handleAccept}
          >
            ✓ Accept
          </button>
        )}

        {localStatus === "PREPARING" && (
          <button
            className="k-action-btn k-action-btn--ready"
            onClick={handleReady}
          >
            ✓ Done
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
import { useState } from "react";
import "../css/dishcard.css";

const DishCard = ({ dish, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  const apiBase =
    (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
    "http://localhost:8080";

  const imageSrc = (() => {
    const raw = dish?.image;
    if (!raw || imgFailed) return "";
    if (typeof raw !== "string") return "";
    const s = raw.trim();
    if (!s) return "";

    // Support both absolute URLs and relative paths like /uploads/x.png
    if (/^https?:\/\//i.test(s)) return s;
    if (s.startsWith("/")) return `${apiBase}${s}`;
    return `${apiBase}/${s}`;
  })();

  const handleAdd = () => {
    setQuantity(1);
    onQuantityChange(dish, 1);
  };

  const increment = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onQuantityChange(dish, newQty);
  };

  const decrement = () => {
    const newQty = quantity - 1;
    setQuantity(newQty);
    onQuantityChange(dish, newQty);
  };

  return (
    <div className="dish-card">
      <div className="dish-image">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={dish.name}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="no-image">🍔</div>
        )}
      </div>

      <div className="dish-body">
        <h3>{dish.name}</h3>

        <div className="price-row">
          <span className="price">₹{dish.price}</span>
          {dish.discount > 0 && (
            <span className="discount">{dish.discount}% OFF</span>
          )}
        </div>

        {/* 🔥 Button Transition */}
        {quantity === 0 ? (
          <button className="add-btn" onClick={handleAdd}>
            Add
          </button>
        ) : (
          <div className="qty-controller">
            <button onClick={decrement}>−</button>
            <span>{quantity}</span>
            <button onClick={increment}>+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DishCard;

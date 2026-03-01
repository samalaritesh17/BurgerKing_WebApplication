import { useState } from "react";
import "../css/dishcard.css";

const DishCard = ({ dish, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(0);

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
        {dish.image ? (
          <img src={dish.image} alt={dish.name} />
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

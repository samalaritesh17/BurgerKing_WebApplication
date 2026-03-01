import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BillingNavbar from "../components/BillingNavbar";
import DishCard from "../components/DishCard";
import { fetchDishes } from "../services/billingDishService";
import "../css/billingDashboard.css";
import "../css/billingShell.css";

const BillingDashboard = () => {
  const navigate = useNavigate();

  // 🔐 Logged-in user
  const storedUserJson = localStorage.getItem("billingUser");
  const storedUser = storedUserJson ? JSON.parse(storedUserJson) : null;
  const username = storedUser?.username || "User";

  // 🍔 Data
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState([]);

  // 🚫 Protect route
  useEffect(() => {
    if (!storedUser) {
      navigate("/billing", { replace: true });
      return;
    }

    fetchDishes().then(setDishes);
  }, [navigate, storedUserJson]);

  // 🛒 Update cart from DishCard
  const updateCart = (dish, quantity) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.id === dish.id
      );

      if (quantity === 0) {
        return prevCart.filter(
          (item) => item.id !== dish.id
        );
      }

      if (existing) {
        return prevCart.map((item) =>
          item.id === dish.id
            ? { ...item, quantity }
            : item
        );
      }

      return [...prevCart, { ...dish, quantity }];
    });
  };

  // 🔓 Logout
  const handleLogout = () => {
    localStorage.clear();
    window.history.replaceState(null, "", "/");
    navigate("/", { replace: true });
  };

  // 🧾 Checkout
  const goToCheckout = () => {
    localStorage.setItem(
      "billingCart",
      JSON.stringify(cart)
    );
    navigate("/billing/checkout");
  };

  return (
    <div className="billing-shell">
      <BillingNavbar username={username} onLogout={handleLogout} />

      <main className="billing-dashboard">
        <div className="billing-container">
          <div className="billing-header">
            <div>
              <h2>Available Dishes</h2>
              <p className="billing-subtitle">Tap to add items. Quantities update instantly.</p>
            </div>
          </div>

          <div className="dish-grid">
            {dishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} onQuantityChange={updateCart} />
            ))}
          </div>

          {cart.length > 0 && (
            <div className="checkout-bar">
              <button className="checkout-btn" onClick={goToCheckout}>
                Checkout ({cart.length} items)
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BillingDashboard;

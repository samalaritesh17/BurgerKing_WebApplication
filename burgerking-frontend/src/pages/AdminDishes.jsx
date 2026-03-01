import { useState } from "react";
import "../styles/dishes.css";
import "../styles/dishes-table.css";
import DishesTable from "../components/dishes/DishesTable";
import AddDishForm from "../components/dishes/AddDishForm";

const AdminDishes = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="dishes-page">
      <div className="dishes-header">
        <div>
          <h1>Dishes Management</h1>
          <p className="subtitle">
            Manage menu items, availability, pricing, and discounts
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowAddForm(true)}
        >
          + Add Dish
        </button>
      </div>

      <DishesTable key={refreshKey} />

      {showAddForm && (
        <AddDishForm
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            setShowAddForm(false);
            setRefreshKey((k) => k + 1);
          }}
        />
      )}
    </div>
  );
};

export default AdminDishes;

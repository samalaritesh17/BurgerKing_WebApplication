import {
  toggleAvailability,
  toggleDiscount,
  updatePricing,
  deleteDish,
} from "../../services/adminDishesApi";

import { useState } from "react";
import ConfirmDialog from "../common/ConfirmDialog";
import PromptDialog from "../common/PromptDialog";
import Toast from "../common/Toast";

const DishRow = ({ dish, onUpdate, onDelete, highlighted }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [discountPromptOpen, setDiscountPromptOpen] = useState(false);
  const [pricePromptOpen, setPricePromptOpen] = useState(false);
  /* -------------------------
     STATUS TOGGLE
  -------------------------- */
  const handleAvailability = async () => {
    try {
      const updated = await toggleAvailability(dish.id);
      onUpdate(updated, "Dish status updated successfully");
    } catch {
      setToast("Failed to update dish status");
    }
  };

  /* -------------------------
     DISCOUNT TOGGLE / UPDATE
  -------------------------- */
  const handleDiscount = async () => {
    try {
      // If discount OFF → just enable
      if (dish.discount === 0) {
        const updated = await toggleDiscount(dish.id);
        onUpdate(updated, "Discount updated successfully");
        return;
      }
    } catch {
      setToast("Failed to update discount");
    }
  };

  /* -------------------------
     PRICE UPDATE
  -------------------------- */
  const handlePriceUpdate = async () => {
    try {
      // handled by prompt dialog
    } catch {
      setToast("Failed to update price");
    }
  };

  /* -------------------------
     DELETE DISH
  -------------------------- */
  const handleDelete = async () => {
    try {
      await deleteDish(dish.id);
      onDelete(dish.id);
    } catch {
      setToast("Failed to delete dish");
    }
  };

  return (
    <>
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}

      <tr
      id={`dish-row-${dish.id}`}
      className={`
        ${!dish.available ? "row-disabled" : ""}
        ${highlighted ? "row-highlight" : ""}
      `}
    >
      <td>{dish.name}</td>

      <td>{dish.category}</td>

      <td>
        ₹{dish.price}
        <button className="edit-btn" onClick={() => setPricePromptOpen(true)}>
          Edit
        </button>
      </td>

      <td>
        <button
          className={`discount-btn ${dish.discount > 0 ? "active" : ""}`}
          onClick={() => {
            if (dish.discount === 0) {
              handleDiscount();
              return;
            }
            setDiscountPromptOpen(true);
          }}
        >
          {dish.discount > 0 ? `${dish.discount}%` : "OFF"}
        </button>
      </td>

      <td>
        <label className="switch">
          <input
            type="checkbox"
            checked={dish.available}
            onChange={handleAvailability}
          />
          <span className="slider" />
        </label>
      </td>

      <td>
        <button className="delete-btn" onClick={() => setConfirmOpen(true)}>
          Delete
        </button>

        <ConfirmDialog
          open={confirmOpen}
          title="Delete dish"
          description={`Delete ${dish.name}? This cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          danger
          onCancel={() => setConfirmOpen(false)}
          onConfirm={async () => {
            setConfirmOpen(false);
            await handleDelete();
          }}
        />
      </td>
    </tr>

      <PromptDialog
        open={pricePromptOpen}
        title="Update price"
        description={`Set a new price for ${dish.name}`}
        label="Price"
        placeholder="Enter new price"
        initialValue={dish.price}
        type="number"
        inputMode="decimal"
        confirmText="Update"
        cancelText="Cancel"
        validate={(v) => {
          const n = Number(v);
          if (!v) return "Price is required";
          if (Number.isNaN(n) || n <= 0) return "Enter a valid price";
          return "";
        }}
        onCancel={() => setPricePromptOpen(false)}
        onConfirm={async (val) => {
          const value = Number(val);
          setPricePromptOpen(false);
          try {
            const updated = await updatePricing(dish.id, value, dish.discount);
            onUpdate(updated, "Dish price updated successfully");
          } catch {
            setToast("Failed to update price");
          }
        }}
      />

      <PromptDialog
        open={discountPromptOpen}
        title="Update discount"
        description={`Set discount percentage for ${dish.name}`}
        label="Discount (0 - 90)"
        placeholder="Enter discount"
        initialValue={dish.discount}
        type="number"
        inputMode="numeric"
        confirmText="Update"
        cancelText="Cancel"
        validate={(v) => {
          const n = Number(v);
          if (v === "") return "Discount is required";
          if (Number.isNaN(n) || n < 0 || n > 90) return "Enter a discount between 0 and 90";
          return "";
        }}
        onCancel={() => setDiscountPromptOpen(false)}
        onConfirm={async (val) => {
          const value = Number(val);
          setDiscountPromptOpen(false);
          try {
            const updated = await updatePricing(dish.id, dish.price, value);
            onUpdate(updated, "Discount updated successfully");
          } catch {
            setToast("Failed to update discount");
          }
        }}
      />
    </>
  );
};

export default DishRow;

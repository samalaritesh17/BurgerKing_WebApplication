import { useState } from "react";

import Toast from "../common/Toast";
import { api } from "../../services/api";



const AddDishForm = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    discount: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.price) {
      setToast("Please fill all required fields");
      return;
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("category", form.category);
    data.append("price", form.price);

    // ✅ FIX 1: send discount ONLY if provided
    if (form.discount !== "") {
      data.append("discount", form.discount);
    }

    // ✅ FIX 2: backend already defaults this to true
    // data.append("available", "true");

    if (image) {
      data.append("image", image);
    }

    try {
      setLoading(true);

      console.log("📤 Sending FormData:");
      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      await api.post("/api/admin/dishes", data);

      onSuccess();
    } catch (err) {
      console.error("❌ Add Dish Failed:", err);
      setToast("Failed to add dish");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}

      <div className="modal-backdrop">
        <div className="modal-card">
        <h2>Add New Dish</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Dish Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="discount"
            placeholder="Discount (%)"
            value={form.discount}
            onChange={handleChange}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="modal-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Adding..." : "Add Dish"}
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
};

export default AddDishForm;

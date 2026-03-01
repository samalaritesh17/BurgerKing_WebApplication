import { useState } from "react";
import { addUser } from "../../services/userService";
import Toast from "../common/Toast";

const AddUserModal = ({ onClose }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    roleId: 2 // default USER
  });

  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "roleId" ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addUser(form);
      setToastMessage("User added successfully");

      setTimeout(() => {
        setToastMessage("");
        onClose();
      }, 2000);
    } catch (err) {
      setToastMessage("Failed to add user");
    }
  };

  return (
    <>
      <div className="ui-modal-overlay" onClick={onClose}>
        <div className="ui-modal-card" onClick={(e) => e.stopPropagation()}>
          <div className="ui-modal-header">
            <div>
              <h2 className="ui-modal-title">Add User</h2>
              <p className="ui-modal-subtitle">Create a new staff account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              className="ui-field"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />

            <input
              className="ui-field"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <select
              className="ui-field"
              name="roleId"
              value={form.roleId}
              onChange={handleChange}
            >
              <option value={1}>ADMIN</option>
              <option value={3}>KITCHEN</option>
              <option value={2}>USER</option>
            </select>

            <div className="ui-modal-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={onClose}
              >
                Cancel
              </button>

              <button type="submit" className="primary-btn">
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ✅ TOAST MUST BE INSIDE COMPONENT */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </>
  );
};

export default AddUserModal;

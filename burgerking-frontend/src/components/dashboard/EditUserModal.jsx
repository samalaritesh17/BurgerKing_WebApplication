import { useState } from "react";
import { updateUser } from "../../services/userService";
import Toast from "../common/Toast";

const EditUserModal = ({ user, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    username: user.username,
    roleId: user.roleId
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
      await updateUser(user.id, form);
      setToastMessage("User updated successfully");

      setTimeout(() => {
        setToastMessage("");
        onUpdated();
        onClose();
      }, 2000);
    } catch (err) {
      setToastMessage("Failed to update user");
    }
  };

  return (
    <>
      <div className="ui-modal-overlay" onClick={onClose}>
        <div className="ui-modal-card" onClick={(e) => e.stopPropagation()}>
          <div className="ui-modal-header">
            <div>
              <h2 className="ui-modal-title">Edit User</h2>
              <p className="ui-modal-subtitle">Update role and username</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              className="ui-field"
              name="username"
              value={form.username}
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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ✅ TOAST INSIDE COMPONENT */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </>
  );
};

export default EditUserModal;

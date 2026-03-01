import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  getAllUsers,
  deleteUser,
  toggleUserStatus
} from "../../services/userService";
import EditUserModal from "./EditUserModal";
import Toast from "../common/Toast";
import ConfirmDialog from "../common/ConfirmDialog";

const StaffTable = ({ refreshKey }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);

  const loadUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, [refreshKey]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setToastMessage("User deleted successfully");
      loadUsers();

      setTimeout(() => setToastMessage(""), 2000);
    } catch {
      setToastMessage("Failed to delete user");
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleUserStatus(id);
      setToastMessage("User status updated");
      loadUsers();

      setTimeout(() => setToastMessage(""), 2000);
    } catch {
      setToastMessage("Failed to update status");
    }
  };

  const getRoleName = (roleId) => {
    if (roleId === 1) return "ADMIN";
    if (roleId === 3) return "KITCHEN";
    return "USER";
  };

  return (
    <>
      <div className="card premium-table">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th align="right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{getRoleName(user.roleId)}</td>
                <td>
                  <span
                    className={`status ${
                      user.active ? "active" : "inactive"
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleToggle(user.id)}
                  >
                    {user.active ? "ACTIVE" : "INACTIVE"}
                  </span>
                </td>
                <td align="right">
                  <button
                    className="icon-btn edit"
                    onClick={() => setSelectedUser(user)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="icon-btn delete"
                    onClick={() => setPendingDelete(user)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete user"
        description={
          pendingDelete
            ? `Delete ${pendingDelete.username}? This cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onCancel={() => setPendingDelete(null)}
        onConfirm={async () => {
          const id = pendingDelete?.id;
          setPendingDelete(null);
          if (id) await handleDelete(id);
        }}
      />

      {/* EDIT MODAL */}
      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdated={loadUsers}
        />
      )}

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

export default StaffTable;

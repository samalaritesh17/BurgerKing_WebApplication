import { useState } from "react";
import StaffTable from "../components/dashboard/StaffTable";
import AddUserModal from "../components/dashboard/AddUserModal";
import "../styles/manageStaff.css";

const ManageStaff = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="manage-staff-page u-page-enter">
      <div className="page-header">
        <div>
          <h1>Manage Staff</h1>
          <p>Manage admins, kitchen and staff users</p>
        </div>

        <button className="primary-btn" onClick={() => setOpen(true)}>
          + Add Staff
        </button>
      </div>

      <StaffTable refreshKey={open} />

      {open && <AddUserModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default ManageStaff;

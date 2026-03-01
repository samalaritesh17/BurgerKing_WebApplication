import { Navigate, Outlet } from "react-router-dom";

const BillingProtected = () => {
  const user = localStorage.getItem("billingUser");

  if (!user) {
    return <Navigate to="/billing/login" replace />;
  }

  return <Outlet />;
};

export default BillingProtected;

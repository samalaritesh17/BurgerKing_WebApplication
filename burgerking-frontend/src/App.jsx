import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ================= ADMIN ================= */
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";

import AdminOrdersPage from "./pages/OrdersPage/AdminOrdersPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDishes from "./pages/AdminDishes";
import ManageStaff from "./pages/ManageStaff";
import AdminLayout from "./components/layout/AdminLayout";

/* ================= BILLING ================= */
import BillingWelcome from "./billingportal/pages/BillingWelcome";
import BillingLogin from "./billingportal/pages/LoginPage";
import BillingDashboard from "./billingportal/pages/BillingDashboard";
import CheckoutPage from "./billingportal/pages/CheckoutPage";
import OrderSuccessPage from "./billingportal/pages/OrderSuccessPage"
import BillingProtected from "./billingportal/components/BillingProtected";

/* ================= KITCHEN ================= */
import KitchenDashboard from "./kitchenportal/pages/KitchenDashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========= PUBLIC / ADMIN ENTRY ========= */}
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ========= BILLING PORTAL ========= */}
        <Route path="/billing" element={<BillingWelcome />} />
        <Route path="/billing/login" element={<BillingLogin />} />
        <Route element={<BillingProtected />}>
          <Route path="/billing/dashboard" element={<BillingDashboard />} />
          <Route path="/billing/checkout" element={<CheckoutPage />} />
          <Route path="/billing/order-success" element={<OrderSuccessPage />} />
        </Route>

        {/* ========= ADMIN CONTROL CENTER ========= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="dishes" element={<AdminDishes />} />
          <Route path="staff" element={<ManageStaff />} />
        </Route>

        {/* ========= KITCHEN DASHBOARD ========= */}
        <Route path="/kitchen" element={<KitchenDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

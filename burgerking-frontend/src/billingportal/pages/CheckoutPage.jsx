import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BillingNavbar from "../components/BillingNavbar";
import "../css/checkout.css";
import "../css/billingShell.css";
import Toast from "../../components/common/Toast";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState("");

  const cart = JSON.parse(localStorage.getItem("billingCart")) || [];
  const storedUser = JSON.parse(localStorage.getItem("billingUser"));

  useEffect(() => {
    if (!storedUser) {
      navigate("/billing", { replace: true });
    }
  }, [navigate, storedUser]);

  const getDiscountedPrice = (price, discount) => {
    if (!discount || discount === 0) return price;
    return price - (price * discount) / 100;
  };

  const grandTotal = cart.reduce((sum, item) => {
    const discountedPrice = getDiscountedPrice(
      item.price,
      item.discount
    );
    return sum + discountedPrice * item.quantity;
  }, 0);

  const handlePlaceOrder = async () => {
    try {
      const orderRequest = {
        totalAmount: grandTotal,
        items: cart.map((item) => ({
          dishId: item.id,
          quantity: item.quantity,
          price:
            getDiscountedPrice(item.price, item.discount) *
            item.quantity,
        })),
      };

      const response = await fetch(
        `http://localhost:8080/api/orders/place?userId=${storedUser.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderRequest),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order failed");
      }

      localStorage.removeItem("billingCart");

      navigate("/billing/order-success", {
        state: { orderNumber: data.orderNumber },
      });
    } catch (error) {
      setToast("Something went wrong while placing order");
      console.error(error);
    }
  };

  return (
    <div className="billing-shell">
      <BillingNavbar
        username={storedUser?.username}
        onLogout={() => {
          localStorage.clear();
          window.history.replaceState(null, "", "/");
          navigate("/", { replace: true });
        }}
      />

      <main className="checkout-page">
        <div className="billing-container">
          {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
          <h2 className="checkout-title">Order Summary</h2>

        {cart.length === 0 ? (
          <p className="empty-cart">No items added.</p>
        ) : (
          <>
            <div className="checkout-table-wrap">
              <table className="checkout-table">
                <thead>
                  <tr>
                    <th>Dish</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Qty</th>
                    <th>Final Price</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((item) => {
                    const discountedPrice = getDiscountedPrice(item.price, item.discount);

                    return (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>₹{item.price}</td>
                        <td>{item.discount ? `${item.discount}%` : "-"}</td>
                        <td>{item.quantity}</td>
                        <td>₹{discountedPrice.toFixed(2)}</td>
                        <td>₹{(discountedPrice * item.quantity).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="checkout-footer">
              <div className="grand-total">Grand Total: ₹{grandTotal.toFixed(2)}</div>

              <button className="place-order-btn" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </>
        )}
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;

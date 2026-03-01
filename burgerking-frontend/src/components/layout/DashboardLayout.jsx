import TopNavbar from "./TopNavbar";
import "../../styles/dashboard.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="admin-root">

      <main className="admin-main">
        <TopNavbar />
        <section className="admin-content">
          {children}
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;

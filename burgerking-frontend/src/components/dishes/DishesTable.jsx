import { useEffect, useState, useMemo } from "react";
import DishRow from "./DishRow";
import DishesFilterBar from "./DishesFilterBar";
import Toast from "../common/Toast";
import { fetchDishes } from "../../services/adminDishesApi";

const DishesTable = () => {
  const [dishes, setDishes] = useState([]);
  const [toast, setToast] = useState("");

  // Search
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedId, setHighlightedId] = useState(null);
  const [searchError, setSearchError] = useState("");

  // Filters
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    loadDishes();
  }, []);

  const loadDishes = async () => {
    const data = await fetchDishes();
    setDishes(data);
  };

  /* -------------------------
     SEARCH HANDLER
  -------------------------- */
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setHighlightedId(null);
      setSearchError("");
      return;
    }

    const found = dishes.find((d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (found) {
      setHighlightedId(found.id);
      setSearchError("");

      setTimeout(() => {
        document
          .getElementById(`dish-row-${found.id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } else {
      setHighlightedId(null);
      setSearchError("Dish not found");
    }
  };

  /* -------------------------
     FILTER + SORT PIPELINE
  -------------------------- */
  const filteredDishes = useMemo(() => {
    let result = [...dishes];

    // Category filter
    if (category) {
      result = result.filter((d) => d.category === category);
    }

    // Status filter
    if (status) {
      result = result.filter((d) =>
        status === "available" ? d.available : !d.available
      );
    }

    // Sort
    if (sort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [dishes, category, status, sort]);

  return (
    <>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}

      <div className="dishes-table-container">
        <DishesFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearchSubmit={handleSearch}
          searchError={searchError}
          category={category}
          status={status}
          sort={sort}
          onCategoryChange={setCategory}
          onStatusChange={setStatus}
          onSortChange={setSort}
        />

        <div className="dishes-table-wrapper">
          <table className="dishes-table">
            <thead>
              <tr>
                <th>Dish</th>
                <th>Category</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDishes.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "40px" }}>
                    No dishes found
                  </td>
                </tr>
              ) : (
                filteredDishes.map((dish) => (
                  <DishRow
                    key={dish.id}
                    dish={dish}
                    highlighted={dish.id === highlightedId}
                    onUpdate={(updated, message) => {
                      setDishes((prev) =>
                        prev.map((d) => (d.id === updated.id ? updated : d))
                      );
                      setToast(message);
                    }}
                    onDelete={(id) => {
                      setDishes((prev) => prev.filter((d) => d.id !== id));
                      setToast("Dish deleted successfully");
                    }}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DishesTable;

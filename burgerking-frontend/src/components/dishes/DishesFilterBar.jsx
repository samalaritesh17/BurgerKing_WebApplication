import { FaSearch, FaFilter } from "react-icons/fa";

const DishesFilterBar = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  searchError,
  category,
  status,
  sort,
  onCategoryChange,
  onStatusChange,
  onSortChange,
}) => {
  return (
    <div className="filter-bar">
      {/* Search */}
      <div className="search-box">
        <FaSearch />
        <input
          type="text"
          placeholder="Search dishes by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearchSubmit()}
        />
      </div>

      {searchError && <span className="search-error">{searchError}</span>}

      {/* Filters */}
      <div className="filters">
        <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Burgers">Burgers</option>
          <option value="Beverages">Beverages</option>
          <option value="Sides">Sides</option>
        </select>

        <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>

        <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="low-high">Low → High</option>
          <option value="high-low">High → Low</option>
        </select>

        <button className="filter-btn">
          <FaFilter /> Filters
        </button>
      </div>
    </div>
  );
};

export default DishesFilterBar;

import React from "react";
import config from "@/config/config";
const Filters = ({ filter, handleFilterSelect }) => {
  return (
    <div className="filters-container">
      {config.FILTERS.map(({ value, displayName }) => (
        <button
          className={`filter-button ${value === filter ? "selected" : ""}`}
          key={value}
          onClick={() => handleFilterSelect(value)}
        >
          {displayName}
        </button>
      ))}
    </div>
  );
};

export default Filters;

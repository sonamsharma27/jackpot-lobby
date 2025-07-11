import React from "react";

const Search = ({ searchInput, setSearchInput }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={searchInput}
        placeholder="Search a game"
        onChange={setSearchInput}
      />
    </div>
  );
};

export default Search;

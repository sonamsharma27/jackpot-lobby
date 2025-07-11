"use client";
import "../styles/lobby.scss";
import React, { useState } from "react";
import Search from "./Search";
import Filters from "./Filters";
import staticGameCards from "../data/staticGameCards.json";
import GameSection from "./GameSection";
import useSearch from "@/hooks/useSearch";
import useDebounce from "@/hooks/useDebounce";
import Shimmer from "./Shimmer";
import InfiniteScroll from "./InfiniteScroll";
import CardsGrid from "./CardsGrid";
import FavouriteGames from "./FavouriteGames";

const Lobby = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("");
  const [filterResult, setFilterResult] = useState([]);
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    setFilter(""); // Reset filter when search input changes
  };
  const debouncedQuery = useDebounce(searchInput, 300);
  const {
    data: gameCards,
    isError: isSearchError,
    isFetching,
  } = useSearch(debouncedQuery);

  if (isSearchError) {
    return (
      <h1 className="error">Error loading games. Please try again later.</h1>
    );
  }

  const handleFilterSelect = (filterName) => {
    setFilter((prev) => (prev === filterName ? "" : filterName));
    setSearchInput(""); // Reset search input when filter is applied
  };

  const renderSearchAndFilters = () => (
    <>
      <Search
        searchInput={searchInput}
        setSearchInput={handleSearchInputChange}
      />
      <Filters filter={filter} handleFilterSelect={handleFilterSelect} />
    </>
  );

  const renderGameContent = () => {
    const showFavorites = filter === "favouriteGames";
    const showStaticGameCards =
      ((!searchInput && !filter) || !gameCards || gameCards?.length === 0) &&
      !isFetching;

    if (showFavorites) return <FavouriteGames />;
    if (filter) {
      return (
        <InfiniteScroll
          filter={filter.toUpperCase()}
          filterResult={filterResult}
          setFilterResult={setFilterResult}
        />
      );
    }

    if (showStaticGameCards) {
      return Object.entries(staticGameCards).map(([title, games]) => (
        <GameSection key={title} title={title} games={games} />
      ));
    }

    return isFetching ? <Shimmer /> : <CardsGrid games={gameCards} />;
  };

  return (
    <div>
      {renderSearchAndFilters()}
      {renderGameContent()}
    </div>
  );

};

export default Lobby;

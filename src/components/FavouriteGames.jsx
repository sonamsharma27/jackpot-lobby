import React from "react";
import GameCard from "./GameCard";
import CardsGrid from "./CardsGrid";
import { useFavoriteStore } from "@/store/favouriteStore";
const FavouriteGames = () => {
  const favouriteGames = useFavoriteStore((state) => state.favouriteGames);
  if (favouriteGames.length === 0) {
    return <p>No favourite games added</p>;
  }
  return (
    <div className="favourite-games">
      <CardsGrid games={favouriteGames} />
    </div>
  );
};

export default FavouriteGames;

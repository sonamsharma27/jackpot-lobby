import React from "react";
import GameCard from "./GameCard";
import CardShimmer from "./CardShimmer";
import "../styles/shimmer.scss";
const CardsGrid = ({ games, isFetchingNextPage }) => {
  return (
    <div className="card-grid">
      {games.map((game) => (
        <GameCard key={game.slug} game={game} />
      ))}
      {isFetchingNextPage &&
        Array.from({ length: 8 }).map((_, i) => (
          <CardShimmer key={`shimmer-${i}`} />
        ))}
    </div>
  );
};

export default CardsGrid;

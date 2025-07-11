import React from "react";
import GameCard from "./GameCard";

const GameSection = ({ title, games }) => {
  return (
    <div className="section">
      {title && <h2>{title}</h2>}
      <div className="game-list">
        {games.map((game) => (
          <GameCard key={game.slug ?? game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameSection;

import React, { useState } from "react";
import { useFavoriteStore } from "@/store/favouriteStore";

const GameCard = ({ game }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const isFavoriteGame = isFavorite(game.slug);
  const handleButtonClick = () => {
    isFavoriteGame ? removeFavorite(game.slug) : addFavorite(game);
  };
  const [showFavoritesButton, setShowFavoritesButton] = useState(false);
  
  return (
    <div
      key={game.slug}
      className="game-card"
      onMouseEnter={() => setShowFavoritesButton(true)}
      onMouseLeave={() => setShowFavoritesButton(false)}
    >
      {showFavoritesButton && (
        <button onClick={handleButtonClick} className="favourite-button">
          <img
            src={`assets/favorite-icon${isFavoriteGame ? "-coloured" : ""}.png`}
            alt="Fav button"
          />
        </button>
      )}
      <img
        className="game-image"
        src={game.thumbnail}
        alt={game.name}
        style={{ borderColor: game.borderColor }}
      />
    </div>
  );
};

export default GameCard;

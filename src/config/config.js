const config = {
  SEARCH_BASE_URL: "https://jpapi-staging.jackpot.bet/casino/games/search",
  GAMES_BASE_URL: "https://jpapi-staging.jackpot.bet/casino/games",
  PROXY_SEARCH_URL: "https://jackpot-proxy.onrender.com/search",
  PROXY_GAMES_URL: "https://jackpot-proxy.onrender.com/games",
  PROXY_URL: "https://jackpot-proxy.onrender.com/search",
  FILTERS: [
    { displayName: "Table Games", value: "tableGames" },
    { displayName: "Live Dealer", value: "liveDealer" },
    { displayName: "Video Slots", value: "videoSlots" },
    { displayName: "Game Shows", value: "gameShows" },
    { displayName: "Favourite Games", value: "favouriteGames" },
  ],
};

export default config;

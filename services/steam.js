export const getRandomGame = async () => {
  const response = await fetch("/api/random-game");

  if (!response.ok) {
    throw new Error("Failed to fetch random game");
  }

  const randomGame = await response.json();
  return randomGame;
};

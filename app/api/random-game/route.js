import {STEAM_ID} from "@/data/data";
import {EXCLUDED_GAMES} from "@/data/data";

export async function GET() {
  try {
    const response = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=true&format=json`
    );

    if (!response.ok) {
      throw new Error(`Steam API error: ${response.status}`);
    }

    const gamesData = await response.json();
    const allGames = gamesData.response.games;
    const filteredGames = allGames.filter(
      (game) => !EXCLUDED_GAMES.some((excluded) => game.name?.toLowerCase().includes(excluded.toLowerCase()))
    );

    const randomGame = filteredGames[Math.floor(Math.random() * filteredGames.length)];

    return Response.json(randomGame);
  } catch (error) {
    console.error("Steam API error:", error);
    return Response.json({error: "Failed to fetch random game"}, {status: 500});
  }
}

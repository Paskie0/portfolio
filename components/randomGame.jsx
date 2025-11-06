"use client";

import {useFunData} from "@/hooks/useFunData";
import Link from "next/link";

export default function RandomGame() {
  const {randomGame, gameLoading, gameError, refetchGame} = useFunData();

  return gameLoading ? (
    <span>Rolling the dice...</span>
  ) : gameError ? (
    <span>The dice landed on a corner...</span>
  ) : (
    <div>
      <Link
        href={`https://store.steampowered.com/app/${randomGame.appid}`}
        target="_blank"
        className="hover:bg-red-500/75 text-red-500 hover:text-foreground">
        {randomGame.name}
      </Link>
      <span className="select-none"> • </span>
      <button onClick={refetchGame} className="hover:bg-red-500/75 cursor-pointer">
        Reroll
      </button>
    </div>
  );
}

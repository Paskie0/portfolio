"use client";

import {useFunData} from "@/hooks/useFunData";
import Link from "next/link";
import Dice from "@/components/icons/Dice";

export default function RandomGame() {
  const {randomGame, gameLoading, gameError, refetchGame} = useFunData();

  return gameLoading ? (
    <span>Rolling the dice...</span>
  ) : gameError ? (
    <span>The dice landed on a corner...</span>
  ) : (
    <div className="flex gap-2 items-center">
      <Link
        href={`https://store.steampowered.com/app/${randomGame.appid}`}
        target="_blank"
        className="hover:bg-accent-fun/75">
        {randomGame.name}
      </Link>
      <span className="select-none">•</span>
      <button
        onClick={refetchGame}
        className="text-accent-fun font-bold hover:bg-accent-fun/75 hover:text-muted-foreground cursor-pointer flex items-center gap-1">
        Reroll
        <Dice className="text-muted-foreground" />
      </button>
    </div>
  );
}

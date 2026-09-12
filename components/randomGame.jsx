"use client";

import {useRef, useState, useEffect} from "react";
import {useFunData} from "@/hooks/useFunData";
import Link from "next/link";
import Dice from "@/components/icons/Dice";
import { getRotationDegrees } from "@/lib/utils";

export default function RandomGame() {
  const {randomGame, gameLoading, gameError, refetchGame} = useFunData();
  const buttonRef = useRef(null);
  const [isRefetching, setIsRefetching] = useState(false);

  useEffect(() => {
    if (!gameLoading) setIsRefetching(false);
  }, [gameLoading]);

  function handleRefetch() {
    if (buttonRef.current) {
      buttonRef.current.style.setProperty("--dice-start", `${getRotationDegrees(buttonRef.current)}deg`);
    }
    setIsRefetching(true);
    refetchGame();
  }

  return (
    <div className="flex gap-1 items-center min-w-0">
      {gameLoading ? (
        <span className="shimmer">Rolling the dice...</span>
      ) : gameError ? (
        <span>The dice landed on a corner...</span>
      ) : (
        <Link href={`https://store.steampowered.com/app/${randomGame.appid}`} className="hover:text-accent-fun truncate min-w-0 max-w-[75vw]">
          {randomGame.name}
        </Link>
      )}
      <button
        ref={buttonRef}
        onClick={handleRefetch}
        disabled={gameLoading}
        className={`shrink-0 cursor-pointer duration-300 disabled:cursor-default ${isRefetching ? "animate-dice-spin" : gameLoading ? "animate-dice-spin-simple" : "hover:rotate-90"}`}
      >
        <Dice className={`rotate-90 text-accent-fun ${gameError && !gameLoading ? "rotate-45" : ""}`} />
      </button>
    </div>
  );
}

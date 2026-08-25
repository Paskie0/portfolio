"use client";

import {useRef} from "react";
import {useFunData} from "@/hooks/useFunData";
import Link from "next/link";
import Dice from "@/components/icons/Dice";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { getRotationDegrees } from "@/lib/utils";

export default function RandomGame() {
  const {randomGame, gameLoading, gameError, refetchGame} = useFunData();
  const buttonRef = useRef(null);

  function handleRefetch() {
    if (buttonRef.current) {
      buttonRef.current.style.setProperty("--dice-start", `${getRotationDegrees(buttonRef.current)}deg`);
    }
    refetchGame();
  }

  return (
    <div className="flex gap-1 items-center min-w-0">
      {gameLoading ? (
        <AnimatedShinyText delay={800}>Rolling the dice...</AnimatedShinyText>
      ) : gameError ? (
        <span>The dice landed on a corner...</span>
      ) : (
        <Link href={`https://store.steampowered.com/app/${randomGame.appid}`} target="_blank" className="hover:text-accent-fun truncate min-w-0 max-w-[65vw] sm:max-w-80 md:max-w-svw">
          {randomGame.name}
        </Link>
      )}
      <button
        ref={buttonRef}
        onClick={handleRefetch}
        disabled={gameLoading}
        className={`shrink-0 cursor-pointer duration-300 disabled:cursor-default ${gameLoading ? "animate-dice-spin" : "hover:rotate-90"}`}
      >
        <Dice className={`text-accent-fun ${gameError && !gameLoading ? "rotate-45" : ""}`} />
      </button>
    </div>
  );
}

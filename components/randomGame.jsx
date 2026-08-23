"use client";

import {useFunData} from "@/hooks/useFunData";
import Link from "next/link";
import Dice from "@/components/icons/Dice";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";


export default function RandomGame() {
  const {randomGame, gameLoading, gameError, refetchGame} = useFunData();

  return gameLoading ? (
    <div className="flex gap-1 items-center">
      <AnimatedShinyText delay={800}>Rolling the dice...</AnimatedShinyText>
      <Dice className="text-accent-fun animate-[spin_3s_linear_infinite]" />
    </div>
  ) : gameError ? (
      <div className="flex gap-1 items-center">
        <span>The dice landed on a corner...</span>
        <button
          onClick={refetchGame}
          className="cursor-pointer hover:rotate-90 duration-300">
          <Dice className="text-accent-fun rotate-45" />
        </button>
      </div>
  ) : (
    <div className="flex gap-1 items-center">
      <Link href={`https://store.steampowered.com/app/${randomGame.appid}`} target="_blank" className="hover:text-accent-fun">
        {randomGame.name}
      </Link>
      <button
        onClick={refetchGame}
        className="cursor-pointer hover:rotate-90 duration-300">
        <Dice className="text-accent-fun" />
      </button>
    </div>
  );
}

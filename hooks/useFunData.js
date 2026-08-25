import {useState, useEffect} from "react";
import {getTemperature} from "@/services/weather";
import {getRandomGame} from "@/services/steam";

export const useFunData = () => {
  const [randomGame, setRandomGame] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [gameLoading, setGameLoading] = useState(true);
  const [tempLoading, setTempLoading] = useState(true);
  const [gameError, setGameError] = useState(null);
  const [tempError, setTempError] = useState(null);

  const fetchGame = async () => {
    setGameLoading(true);
    setGameError(null);
    const MIN_LOADING_TIME = 3000;
    const startTime = Date.now();

    const gameResult = await Promise.allSettled([getRandomGame()]);

    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
    if (remainingTime > 0) {
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
    }

    if (gameResult[0].status === "fulfilled") {
      setRandomGame(gameResult[0].value);
    } else {
      setGameError(gameResult[0].reason?.message || "Failed to load game");
    }

    setGameLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const MIN_LOADING_TIME = 3000;
      const startTime = Date.now();

      const [gameResult, tempResult] = await Promise.allSettled([getRandomGame(), getTemperature()]);

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      if (gameResult.status === "fulfilled") {
        setRandomGame(gameResult.value);
      } else {
        setGameError(gameResult.reason?.message || "Failed to load game");
      }

      if (tempResult.status === "fulfilled") {
        setTemperature(tempResult.value);
      } else {
        setTempError(tempResult.reason?.message || "Failed to load temperature");
      }

      setGameLoading(false);
      setTempLoading(false);
    };

    fetchData();
  }, []);

  return {
    randomGame,
    temperature,
    gameLoading,
    tempLoading,
    gameError,
    tempError,
    refetchGame: fetchGame,
  };
};

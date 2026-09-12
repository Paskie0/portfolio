"use client";

import { useFunData } from "@/hooks/useFunData";

export default function DateTime() {
  const { temperature, tempLoading, tempError } = useFunData();
  return tempLoading ? (
    <span className="shimmer">Geolocating...</span>
  ) : tempError ? (
    <span>No Signal...</span>
  ) : (
    <div className="text-nowrap">
      <span className="group-hover:text-accent-fun"> {temperature}°C</span>
      <span> • </span>
      <span>
        {new Date().toLocaleTimeString("nl-NL", {
          timeZone: "Europe/Amsterdam",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </span>
    </div>
  );
}

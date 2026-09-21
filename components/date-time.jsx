"use client";

import { useEffect, useState } from "react";
import { useFunData } from "@/hooks/useFunData";

export default function DateTime() {
  const { temperature, tempLoading, tempError } = useFunData();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timeout;
    const tick = () => {
      const current = new Date();
      setNow(current);
      timeout = setTimeout(
        tick,
        60000 - (current.getSeconds() * 1000 + current.getMilliseconds()),
      );
    };
    tick();
    return () => clearTimeout(timeout);
  }, []);

  return tempLoading ? (
    <span className="shimmer">Geolocating...</span>
  ) : tempError ? (
    <span>No Signal...</span>
  ) : (
    <div className="text-nowrap">
      <span className="group-hover:text-accent-fun"> {temperature}°C</span>
      <span> • </span>
      <span>
        {now.toLocaleTimeString("nl-NL", {
          timeZone: "Europe/Amsterdam",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </span>
    </div>
  );
}

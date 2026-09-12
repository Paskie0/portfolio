"use client";

import {useFunData} from "@/hooks/useFunData";
import {CITY} from "@/data/data";
import Link from "next/link";

export default function Location() {
  const {temperature, tempLoading, tempError} = useFunData();

  return tempLoading ? (
    <span className="shimmer">Geolocating...</span>
  ) : tempError ? (
    <span>No Signal...</span>
  ) : (
    <Link href={`https://en.wikipedia.org/wiki/${CITY}`} className="text-nowrap group text-foreground hover:decoration-accent-fun">
      <span className="group-hover:text-accent-fun">{CITY}</span><sup className="group-hover:text-accent-fun"> {temperature}°C</sup>
    </Link>
  );
}

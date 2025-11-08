"use client";

import {useFunData} from "@/hooks/useFunData";
import {CITY} from "@/data/data";
import Link from "next/link";

export default function Location() {
  const {temperature, tempLoading, tempError} = useFunData();

  return tempLoading ? (
    <span>Geolocating...</span>
  ) : tempError ? (
    <span>No Signal...</span>
  ) : (
    <Link href={`https://en.wikipedia.org/wiki/${CITY}`} className="w-fit hover:bg-accent-fun/75">
      {CITY} • {temperature}°C
    </Link>
  );
}

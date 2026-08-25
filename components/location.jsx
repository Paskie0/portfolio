"use client";

import {useFunData} from "@/hooks/useFunData";
import {CITY} from "@/data/data";
import Link from "next/link";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

export default function Location() {
  const {temperature, tempLoading, tempError} = useFunData();

  return tempLoading ? (
    <AnimatedShinyText delay={400}>Geolocating...</AnimatedShinyText>
  ) : tempError ? (
    <span>No Signal...</span>
  ) : (
    <Link href={`https://en.wikipedia.org/wiki/${CITY}`} className="text-nowrap group text-foreground hover:decoration-accent-fun">
      <span className="group-hover:text-accent-fun">{CITY}</span><sup className="group-hover:text-accent-fun"> {temperature}°C</sup>
    </Link>
  );
}

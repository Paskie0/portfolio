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
    <Link href={`https://en.wikipedia.org/wiki/${CITY}`} className="group text-foreground hover:decoration-accent-fun underline underline-offset-4 decoration-muted">
      <span className="group-hover:text-accent-fun">{CITY}</span><sup className="group-hover:text-accent-fun"> {temperature}°C</sup>
    </Link>
  );
}

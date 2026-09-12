"use client";

import { CITY } from "@/data/data";
import Link from "next/link";

export default function Location() {
  return (
    <Link
      href={`https://en.wikipedia.org/wiki/${CITY}`}
      className="text-nowrap hover:text-accent-fun text-foreground hover:decoration-accent-fun"
    >
      <span>{CITY}</span>
    </Link>
  );
}

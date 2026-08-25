import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRotationDegrees(element: Element) {
  const {transform} = getComputedStyle(element)
  const match = /matrix\(([^)]+)\)/.exec(transform)
  if (!match) return 0
  const [a, b] = match[1].split(",").map(Number)
  return Math.atan2(b, a) * (180 / Math.PI)
}

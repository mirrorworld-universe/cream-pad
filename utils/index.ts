import { clsx } from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatStr(str?: string, length = 4) {
  if (!str) return null;
  return `${str.slice(0, length)}…${str.slice(-length)}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

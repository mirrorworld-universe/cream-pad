import { clsx } from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatStr(str?: string, length = 4) {
  if (!str) return null;
  return `${str?.slice(0, length)}…${str?.slice(-length)}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  if (typeof seconds !== "number") {
    return seconds;
  }
  if (seconds < 60) {
    return `${seconds}s`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0
      ? `${minutes}m ${remainingSeconds}s`
      : `${minutes}m`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let result = `${hours}h`;
    if (minutes > 0) result += ` ${minutes}m`;
    if (remainingSeconds > 0) result += ` ${remainingSeconds}s`;
    return result;
  }
}

export function getRandomAddressColor(address: string) {
  const colors = [
    "#6B9DF2",
    "#6BF279",
    "#7DD8FF",
    "#A36BF2",
    "#D6BEF2",
    "#DEF26B",
    "#F26B6D",
    "#FFA885"
  ];
  // Simple hash function to get consistent index
  const hash = address
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % colors.length;
  return colors[index];
}

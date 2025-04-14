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

export function formatTimeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds >= 48 * 3600) {
    return "48h ago";
  }

  if (diffInSeconds >= 3600) {
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  }

  if (diffInSeconds >= 60) {
    return `${Math.floor(diffInSeconds / 60)}m ago`;
  }

  return `${diffInSeconds}s ago`;
}

export function formatNumber(num?: number | string): string {
  if (num === undefined || num === null) return "";

  const value = typeof num === "string" ? parseFloat(num) : num;

  if (isNaN(value)) return "";

  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(2) + "B";
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(2) + "M";
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(2) + "K";
  }

  return value.toFixed(2);
}

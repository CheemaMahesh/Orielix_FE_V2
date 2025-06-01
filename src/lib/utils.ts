import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date | string) => {
  // TODO if the date is below 24hr show relative time like "2 hours ago"
  // IF the date is more than 24hr show the date in "MMM DD" format
  // IF the date is more than a year show the date in "MMM DD, YYYY" format
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);
  if (diffDays > 365) {
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  if (diffDays > 1) {
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  if (diffHours > 1) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  }
  if (diffMinutes > 1) {
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  }
  if (diffSeconds > 1) {
    return `${diffSeconds} second${diffSeconds > 1 ? "s" : ""} ago`;
  }
  return "just now";
};

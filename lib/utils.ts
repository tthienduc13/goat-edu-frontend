import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimeAgo = (date: Date): string => {
  // Ensure the date is correctly parsed
  const parsedDate = new Date(date);

  return formatDistanceToNow(parsedDate, { addSuffix: true });
};

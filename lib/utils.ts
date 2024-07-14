import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimeAgo = (date: Date): string => {
  const parsedDate = new Date(date);

  return formatDistanceToNow(parsedDate, { addSuffix: true });
};

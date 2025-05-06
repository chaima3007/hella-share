import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function formatDate(dateString: string): string {
  const now: Date = new Date();
  const past: Date = new Date(dateString);
  const seconds: number = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: Record<string, number> = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const key in intervals) {
    const value = Math.floor(seconds / intervals[key]);
    if (value >= 1) {
      return `${value} ${key}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};


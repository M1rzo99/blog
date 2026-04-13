import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getReadingTime(content: string) {
  const WPS = 230 / 60; // Words per second
  let imageCount = 0;
  const regex = /\w/;

  const words = content
    .split(" ")
    .filter((word) => {
      if (word.includes("<img")) {
        imageCount += 1;
      }
      return regex.test(word);
    }).length;

  const imageAdjust = imageCount * 4;
  let imageSecs = 0;
  let imageFactor = 12;

  for (let i = 0; i < imageCount; i++) {
    imageSecs += imageFactor;
    if (imageFactor > 3) {
      imageFactor -= 1;
    }
  }

  // O‘qish vaqtini hisoblashda imageSecs ni ham qo‘shamiz
  const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60);

  return minutes < 10 ? "0" + minutes : String(minutes);
}

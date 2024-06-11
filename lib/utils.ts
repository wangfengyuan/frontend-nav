import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const colors = [
  "slate",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "teal",
  "cyan",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
]

export const shades = ["300", "400", "500", "600", "700", "800", "900"]

function getRandom(array: string[]) {
  return array[Math.floor(Math.random() * array.length)]
}

export function generateRandomGradient() {
  const fromColor = getRandom(colors)
  const toColor = getRandom(colors)
  const fromShade = getRandom(shades)
  const toShade = getRandom(shades)
  return [`from-${fromColor}-${fromShade}`, `to-${toColor}-${toShade}`]
}

export const localExecutablePath =
  process.platform === "win32"
    ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
      ? "/usr/bin/google-chrome"
      : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
export const remoteExecutablePath =
  "https://github.com/Sparticuz/chromium/releases/download/v123.0.1/chromium-v123.0.1-pack.tar"

export const isDev = process.env.NODE_ENV === "development"

export const userAgent =
  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36"

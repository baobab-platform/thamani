type IconName =
  | "grid"
  | "box"
  | "quote"
  | "track"
  | "file"
  | "help"
  | "arrow"
  | "chevron"
  | "search"
  | "plus"
  | "truck"
  | "air"
  | "check"
  | "alert"
  | "clock"
  | "globe"
  | "menu"
  | "close"
  | "reset"
const paths: Record<IconName, string> = {
  grid: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  box: "m3 7 9-4 9 4v10l-9 4-9-4V7Zm0 0 9 5 9-5M12 12v9M7 5l10 5",
  quote: "M5 3h14v18H5zM8 7h8M8 11h8M8 15h4",
  track: "M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  file: "M14 3H5v18h14V8l-5-5ZM14 3v5h5M8 13h8M8 17h5",
  help: "M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3M12 17h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  arrow: "M4 12h16M14 6l6 6-6 6",
  chevron: "m9 5 7 7-7 7",
  search: "M21 21l-6-6M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
  plus: "M12 5v14M5 12h14",
  truck:
    "M3 6h11v11H3zM14 10h4l3 4v3h-7M8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM20 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
  air: "m3 13 7-3 2-7h2l-1 7 7 4v2l-8-2-3 5H7l1-6-5 2z",
  check: "m5 12 4 4L19 6",
  alert: "m12 3 10 18H2L12 3ZM12 9v5M12 17h.01",
  clock: "M12 7v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  globe: "M2 12h20M12 2c6 6 6 14 0 20-6-6-6-14 0-20ZM22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "m6 6 12 12M6 18 18 6",
  reset: "M3 10a9 9 0 1 1 2 9M3 3v7h7",
}
export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}

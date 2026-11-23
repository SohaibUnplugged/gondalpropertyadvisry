import type { SVGProps } from "react";

const paths = {
  home: "M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z",
  key: "M14 4a6 6 0 1 1-4 10L3 21H1v-4l7-7a6 6 0 0 1 6-6Zm3 4h.01",
  building:
    "M4 21V7h8V3h8v18M2 21h20M8 11h.01M8 15h.01M8 19h.01M16 7h.01M16 11h.01M16 15h.01",
  phone:
    "M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2Z",
  chat: "M21 11.5a9 9 0 0 1-9 9 10 10 0 0 1-4-.9L3 21l1.4-4.7A9 9 0 1 1 21 11.5ZM8 12h.01M12 12h.01M16 12h.01",
  mail: "M3 5h18v14H3ZM3 5l9 7 9-7",
  plus: "M12 5v14M5 12h14",
  check: "m5 12 4 4L19 6",
  arrow: "M4 12h15m-6-6 6 6-6 6",
  diagonal: "M5 19 19 5M5 5h14v14",
  globe:
    "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3a20 20 0 0 0 0 18 20 20 0 0 0 0-18Z",
  spark: "M12 2v20M2 12h20M5 5l14 14M5 19 14 5",
};

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: keyof typeof paths }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}

export function BrandMark() {
  return (
    <svg viewBox="0 0 40 44" fill="none" aria-hidden="true">
      <path
        d="M4 36V17L20 5l16 12v19H24V23h-8v13H4Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="m10 13 10 8 10-8M20 5v16"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

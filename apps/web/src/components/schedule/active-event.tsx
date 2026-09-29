"use client";

import { motion } from "motion/react";

const shapePath =
  "M2.12827 9.62465C-5.60474 20.2684 8.33629 29.1309 34.1982 29.9798C79.3503 31.5004 89.6054 9.44261 47.2503 1.84814C24.4253 -2.22486 8.74811 0.463357 2.12827 9.62465ZM23.1543 1.80765C27.9683 1.04457 34.6008 0.849388 33.3492 1.51216C33.1145 1.63642 30.1399 2.02088 26.8269 2.3719C22.4486 2.81923 20.028 3.4206 18.3326 4.53102C16.0086 6.01679 16.2351 6.02442 24.4903 4.67232C53.9553 -0.128917 81.2393 11.3637 66.9303 22.513C60.1332 27.8133 33.2275 29.7709 17.2598 26.1491C-3.2593 21.4929 0.652801 5.34544 23.1543 1.80765Z";

const drawPath =
  "M12.5 4 C5 7 0 15 6 22 C14 31 38 34 58 29 C76 25 82 14 72 8 C61 1 38 0 18 4";
const line1 = " Happening Now!";

export default function ActiveCircle() {
  return (
    <svg
      viewBox="0 0 75 31"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[calc(100%+1.75rem)] w-[calc(100%+2.15rem)] -translate-x-1/2 -translate-y-1/2 overflow-visible"
    >
      <defs>
        <mask id="draw-mask">
          <rect width="100%" height="100%" fill="black" />

          <motion.path
            d={drawPath}
            fill="none"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
          />
        </mask>
      </defs>

      <path
        d={shapePath}
        fill="#AC1903"
        mask="url(#draw-mask)"
      />
    </svg>
  );
}
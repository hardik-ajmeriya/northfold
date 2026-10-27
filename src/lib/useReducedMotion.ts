"use client";

import { useMediaQuery } from "./useMediaQuery";

/** true when the user asked the OS for less motion. Safe for static export. */
export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

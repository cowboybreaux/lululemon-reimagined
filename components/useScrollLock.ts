"use client";
import { useLayoutEffect } from "react";
let locks = 0;
let previousOverflow = "";
let previousPadding = "";
// Shared ownership avoids accidental unlocking during menu/cart handoffs.
export default function useScrollLock(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    if (locks++ === 0) {
      const width = root.clientWidth;
      previousOverflow = root.style.overflow;
      previousPadding = root.style.paddingRight;
      const padding = parseFloat(getComputedStyle(root).paddingRight) || 0;
      root.style.overflow = "hidden";
      // Safari can release the scrollbar lane despite scrollbar-gutter: stable.
      const gap = Math.max(0, root.clientWidth - width);
      root.style.paddingRight = `${padding + gap}px`;
      root.style.setProperty("--lock-gap", `${gap}px`);
    }
    return () => {
      if (--locks === 0) {
        root.style.overflow = previousOverflow;
        root.style.paddingRight = previousPadding;
        root.style.removeProperty("--lock-gap");
      }
    };
  }, [locked]);
}

"use client";
import { useLayoutEffect } from "react";
let locks = 0;
let restore: (() => void) | undefined;

// Shared ownership avoids accidental unlocking during menu/cart handoffs.
export default function useScrollLock(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    if (locks++ === 0) {
      const properties = ["overflow", "padding-right", "--lock-gap"] as const;
      const previous = properties.map(name => ({
        name, value: root.style.getPropertyValue(name), priority: root.style.getPropertyPriority(name),
      }));
      // clientWidth can grow when overflow is hidden even though the stable
      // gutter still occupies layout space. Measure the actual boxes instead.
      const width = root.getBoundingClientRect().width;
      const padding = parseFloat(getComputedStyle(root).paddingRight) || 0;
      const viewport = document.createElement("div");
      viewport.style.cssText = "position:fixed;inset:0;visibility:hidden;pointer-events:none;";
      document.body.appendChild(viewport);
      const fixedWidth = viewport.getBoundingClientRect().width;
      root.style.overflow = "hidden";
      const gap = Math.max(0, root.getBoundingClientRect().width - width);
      const fixedGap = Math.max(0, viewport.getBoundingClientRect().width - fixedWidth);
      viewport.remove();
      // Only compensate browsers that actually release the scrollbar lane.
      if (gap > 0) root.style.paddingRight = `${padding + gap}px`;
      if (fixedGap > 0) root.style.setProperty("--lock-gap", `${fixedGap}px`);
      restore = () => {
        previous.forEach(({ name, value, priority }) => {
          if (value) root.style.setProperty(name, value, priority);
          else root.style.removeProperty(name);
        });
      };
    }
    return () => {
      if (--locks === 0) {
        restore?.();
        restore = undefined;
      }
    };
  }, [locked]);
}

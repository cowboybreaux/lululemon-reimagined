"use client";

import { useLayoutEffect, useRef, type HTMLAttributes } from "react";

// Shared across all showcases, including carousel cards remounted at a breakpoint.
// Kept in memory only: a fresh page visit gets a fresh entrance.
const revealedProducts = new Set<string>();
const pendingCards = new Map<Element, (delay: number) => void>();
let observer: IntersectionObserver | undefined;

function observeCard(card: HTMLElement, reveal: (delay: number) => void) {
  observer ??= new IntersectionObserver((entries) => {
    const groups = new Map<Element | null, IntersectionObserverEntry[]>();
    for (const entry of entries) {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.15) continue;
      const parent = entry.target.parentElement;
      const group = groups.get(parent) ?? [];
      group.push(entry);
      groups.set(parent, group);
    }
    for (const group of Array.from(groups.values())) {
      group.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
      let rowTop = -Infinity;
      let index = 0;
      for (const entry of group) {
        if (Math.abs(entry.boundingClientRect.top - rowTop) > 20) {
          rowTop = entry.boundingClientRect.top;
          index = 0;
        }
        const parent = entry.target.parentElement;
        const layout = parent ? getComputedStyle(parent) : null;
        // Use the actual responsive column position even when carousel motion
        // brings neighboring cards into view in separate observer callbacks.
        const columns = layout?.display.includes("grid")
          ? layout.gridTemplateColumns.split(/\s+/).length
          : 0;
        const position = columns && parent
          ? Array.from(parent.children).indexOf(entry.target) % columns
          : index;
        pendingCards.get(entry.target)?.(position * 85);
        index++;
      }
    }
  }, { threshold: 0.15 });
  pendingCards.set(card, reveal);
  observer.observe(card);
  return () => {
    observer?.unobserve(card);
    pendingCards.delete(card);
    if (!pendingCards.size) {
      observer?.disconnect();
      observer = undefined;
    }
  };
}

interface ProductCardProps extends HTMLAttributes<HTMLElement> {
  /** Stable product identity, shared across showcases and responsive remounts. */
  productId: string;
}

export default function ProductCard({ productId, className = "", children, ...props }: ProductCardProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const card = ref.current;
    if (!card) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stopObserving: (() => void) | undefined;
    const reveal = (delay = 0) => {
      revealedProducts.add(productId);
      card.style.setProperty("--product-delay", `calc(${delay / 85} * var(--motion-stagger))`);
      card.dataset.entrance = card.dataset.entrance === "pending" && !motion.matches ? "visible" : "settled";
      stopObserving?.();
    };
    const handleMotion = () => {
      if (motion.matches) reveal();
    };
    // Progressive enhancement: server-rendered cards remain visible without JS.
    if (motion.matches || revealedProducts.has(productId) || !("IntersectionObserver" in window)) {
      reveal();
    } else {
      card.dataset.entrance = "pending";
      stopObserving = observeCard(card, reveal);
    }
    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.target === card) card.dataset.entrance = "settled";
    };
    const handleFocus = () => reveal();
    card.addEventListener("animationend", handleAnimationEnd);
    card.addEventListener("focusin", handleFocus);
    motion.addEventListener("change", handleMotion);
    return () => {
      stopObserving?.();
      card.removeEventListener("focusin", handleFocus);
      card.removeEventListener("animationend", handleAnimationEnd);
      motion.removeEventListener("change", handleMotion);
    };
  }, [productId]);

  return (
    <article {...props} ref={ref} className={`product-card ${className}`} data-product-id={productId}>
      {children}
      <style jsx>{`
        .product-card { --product-travel: 45px; }
        .product-card[data-entrance="pending"] {
          opacity: 0;
          transform: translateY(var(--product-travel));
        }
        .product-card[data-entrance="visible"] {
          animation: product-surface var(--motion-enter) var(--ease-emphasized) var(--product-delay, 0ms) both;
        }
        .product-card:focus-within { animation: none; opacity: 1; transform: none; }
        @keyframes product-surface {
          from { opacity: 0; transform: translateY(var(--product-travel)); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 639px) { .product-card { --product-travel: 30px; } }
        @media (prefers-reduced-motion: reduce) {
          .product-card[data-entrance] { opacity: 1; transform: none; animation: none; }
        }
      `}</style>
    </article>
  );
}

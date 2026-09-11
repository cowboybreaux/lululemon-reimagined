"use client";
import useScrollLock from "./useScrollLock";

import React, { useEffect, useRef } from "react";

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRIMARY_ITEMS = [
  { label: "New", href: "#new" },
  { label: "Women", href: "#women" },
  { label: "Men", href: "#men" },
  { label: "Accessories", href: "#accessories" },
];

// Only existing destinations are linked. The remaining labels await real routes.
const SECONDARY_ITEMS = [
  { label: "What’s New", href: "#new" },
  { label: "Stories", href: "#stories" },
  { label: "Stores", href: null },
  { label: "Membership", href: null },
  { label: "About lululemon", href: null },
];

export default function NavigationMenu({ isOpen, onClose }: NavigationMenuProps) {
  useScrollLock(isOpen);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.inert = !isOpen;
    if (!isOpen) return;

    const trigger = document.querySelector<HTMLButtonElement>(".menu-control");
    panel.focus({ preventScroll: true });

    // The existing header's X remains the close control, outside this canvas.
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const links = Array.from(panel.querySelectorAll<HTMLAnchorElement>("a[href]"));
      const controls = trigger ? [trigger, ...links] : links;
      const current = controls.indexOf(document.activeElement as HTMLAnchorElement);
      const next = current < 0
        ? (event.shiftKey ? controls.length - 1 : (trigger ? 1 : 0))
        : (current + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
      if (controls.length) {
        event.preventDefault();
        controls[next].focus({ preventScroll: true });
      }
    };
    window.addEventListener("keydown", trapFocus);
    return () => {
      window.removeEventListener("keydown", trapFocus);
      if (!document.querySelector(".cart-layer.open")) trigger?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      className={`menu-canvas ${isOpen ? "menu-open" : ""}`}
      role="dialog"
      aria-modal={isOpen ? true : undefined}
      aria-hidden={!isOpen}
      aria-label="Main Navigation Menu"
    >
      <div className="menu-scroll">
        <div className="menu-layout">
          <nav className="primary-nav" aria-label="Shop">
            <ul className="primary-list">
              {PRIMARY_ITEMS.map((item, index) => (
                <li
                  key={item.label}
                  className="primary-item"
                  style={{ "--item-index": index } as React.CSSProperties}
                >
                  <a href={item.href} onClick={onClose} className="primary-link">
                    <span>{item.label}</span>
                    <span className="link-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="secondary-nav" aria-label="Explore lululemon">
            <ul className="secondary-list">
              {SECONDARY_ITEMS.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href} onClick={onClose} className="secondary-link">
                      {item.label}
                    </a>
                  ) : (
                    <span className="secondary-label" role="link" aria-disabled="true">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <style jsx>{`
        .menu-canvas {
          --menu-ease: var(--ease-emphasized);
          position: fixed;
          inset: 48px var(--lock-gap, 0px) 0 0;
          z-index: 40;
          outline: none;
          background: #e3243b;
          color: #fff8ef;
          clip-path: inset(0 0 100% 0);
          visibility: hidden;
          pointer-events: none;
          transition: clip-path var(--motion-panel) var(--menu-ease), visibility 0s var(--motion-panel);
        }
        .menu-canvas::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse at 100% 85%, rgba(88, 8, 22, 0.075), transparent 65%);
        }
        .menu-open {
          clip-path: inset(0);
          visibility: visible;
          pointer-events: auto;
          transition-delay: 0s;
        }
        .menu-scroll {
          position: relative;
          height: 100%;
          overflow-y: auto; scrollbar-gutter: stable;
          overscroll-behavior: contain;
        }
        .menu-layout {
          width: 100%;
          max-width: 1400px;
          min-height: 100%;
          margin: 0 auto;
          padding: 64px clamp(28px, 6vw, 100px) max(56px, calc(36px + env(safe-area-inset-bottom, 0px)));
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          align-content: center;
          gap: 42px;
        }
        ul { margin: 0; padding: 0; list-style: none; }
        .primary-list { display: grid; gap: 4px; }
        .primary-item {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity var(--motion-fast) var(--ease-standard), transform var(--motion-base) var(--menu-ease);
          transition-delay: calc((3 - var(--item-index)) * 30ms);
        }
        .menu-open .primary-item {
          opacity: 1;
          transform: translateY(0);
          transition-duration: var(--motion-base);
          transition-delay: calc(40ms + var(--item-index) * 35ms);
        }
        .primary-link {
          display: flex;
          align-items: center;
          gap: 18px;
          width: fit-content;
          max-width: 100%;
          min-height: 48px;
          padding: 3px 0;
          color: #fff8ef;
          font-size: clamp(2.5rem, 5vw, 5rem);
          font-weight: 600;
          letter-spacing: -0.035em;
          line-height: 1.12;
          text-decoration: none;
          transition: color var(--motion-fast) var(--ease-standard), opacity var(--motion-fast) var(--ease-standard), transform var(--motion-base) var(--menu-ease);
        }
        .link-arrow {
          font-size: 0.38em;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity var(--motion-fast) var(--ease-standard), transform var(--motion-base) var(--menu-ease);
        }
        .primary-link:focus-visible {
          color: white;
          transform: translateX(10px);
        }
        .primary-link:focus-visible .link-arrow { opacity: 1; transform: translateX(0); }
        .primary-list:has(.primary-link:focus-visible) .primary-link:not(:focus-visible) { opacity: 0.6; }
        a:focus-visible { outline: 1px solid #fff8ef; outline-offset: 6px; border-radius: 2px; }
        .secondary-nav {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity var(--motion-fast) var(--ease-standard), transform var(--motion-base) var(--menu-ease);
        }
        .menu-open .secondary-nav {
          opacity: 1;
          transform: translateY(0);
          transition-duration: var(--motion-base);
          transition-delay: 160ms;
        }
        .secondary-list { display: grid; gap: 0; }
        .secondary-link, .secondary-label {
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          font-size: clamp(1.125rem, 1.5vw, 1.375rem);
          line-height: 1.3;
          font-weight: 400;
          letter-spacing: -0.01em;
        }
        .secondary-link {
          color: rgba(255, 248, 239, 0.85);
          text-decoration: none;
          text-underline-offset: 5px;
          text-decoration-thickness: 1px;
          transition: color var(--motion-fast) var(--ease-standard), transform var(--motion-base) var(--menu-ease);
        }
        .secondary-label { color: rgba(255, 248, 239, 0.6); }
        @media (hover: hover) and (pointer: fine) {
          .primary-list:has(.primary-link:hover) .primary-link:not(:hover) { opacity: 0.6; }
          .primary-link:hover { color: white; opacity: 1; transform: translateX(10px); }
          .primary-link:hover .link-arrow { opacity: 1; transform: translateX(0); }
          .secondary-link:hover { color: white; transform: translateX(5px); text-decoration-line: underline; }
        }
        @media (min-width: 640px) { .menu-canvas { top: 50px; } }
        @media (min-width: 768px) {
          .menu-layout { grid-template-columns: minmax(0, 65fr) minmax(0, 35fr); gap: 0; align-items: center; padding-top: 80px; padding-bottom: 80px; }
          .secondary-nav { padding-left: clamp(24px, 4vw, 64px); }
          .primary-list { gap: 8px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .menu-canvas, .primary-item, .menu-open .primary-item,
          .secondary-nav, .menu-open .secondary-nav,
          .primary-link, .link-arrow, .secondary-link {
            transition: none;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}

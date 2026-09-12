"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "./CartContext";
import NavigationMenu from "./NavigationMenu";

const MARQUEE_TEXT =
  "ENJOY EXCLUSIVE GRAB PAYLATER COUPONS AT CHECKOUT   ●   FREE SHIPPING AND FREE RETURNS FOR A LIMITED TIME    ●   SIGN UP FOR 10% OFF YOUR FIRST ORDER INCLUDING EARLY ACCESS TO OUR PRODUCT DROPS   ●   ";

export default function Header() {
  const { count, revision, setOpen: setCartOpen } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hasPassedHero, setHasPassedHero] = useState(false);

  const [isBottomHeaderVisible, setIsBottomHeaderVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("fast-and-free");
    let frame = 0;
    let scrolled = false;
    let passed = false;
    const update = () => {
      frame = 0;
      const nextScrolled = window.scrollY > 20;
      const bottom = hero?.getBoundingClientRect().bottom ?? Infinity;
      // A four-pixel return deadband avoids chatter at the hero boundary.
      const nextPassed = passed ? bottom <= 4 : bottom <= 0;
      if (nextScrolled !== scrolled) { scrolled = nextScrolled; setHasScrolled(scrolled); }
      if (nextPassed !== passed) { passed = nextPassed; setHasPassedHero(passed); }
    };
    const handleScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

    const bottomHeader = document.querySelector('footer[aria-label="Bottom header"]');
    const footerObserver = new IntersectionObserver(([entry]) => {
      setIsBottomHeaderVisible(entry.isIntersecting);
    });
    if (bottomHeader) footerObserver.observe(bottomHeader);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    window.addEventListener("resize", handleScroll);
    const resizeObserver = new ResizeObserver(handleScroll);
    if (hero) resizeObserver.observe(hero);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  return (
    <>
      <header className={`header-shell fixed left-1/2 -translate-x-1/2 z-50 ${hasPassedHero ? "header-pill" : ""}`}>
        {/* Dissolve only appears after scrolling */}
        <div
          className={`header-dissolve absolute top-full h-5 pointer-events-none
          bg-gradient-to-b from-[#e3243b] to-transparent
          ${hasScrolled && !hasPassedHero ? "dissolve-visible" : ""}`}
        />

        <div className="header-surface relative overflow-hidden bg-[#e3243b]">
        <div className="relative h-[48px] sm:h-[50px] w-full px-5 sm:px-10 md:px-14 flex items-center justify-between">
          {/* MENU BUTTON */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="menu-control relative z-20 flex h-10 w-10 items-center justify-center"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            <div className="relative w-8 h-6">
              {/* Top */}
              <span
                className={`absolute left-0 top-[12px] block h-[3px] w-7 bg-white
                transition-[transform,opacity] duration-[var(--motion-base)] ease-[var(--ease-emphasized)]
                ${
                  isOpen
                    ? "rotate-45 translate-y-0"
                    : "-translate-y-[7px]"
                }`}
              />

              {/* Middle */}
              <span
                className={`absolute left-0 top-[12px] block h-[3px] w-7 bg-white
                transition-[transform,opacity] duration-[var(--motion-base)] ease-[var(--ease-emphasized)]
                ${
                  isOpen
                    ? "opacity-0 scale-x-0"
                    : "opacity-100 scale-x-100"
                }`}
              />

              {/* Bottom */}
              <span
                className={`absolute left-0 top-[12px] block h-[3px] w-7 bg-white
                transition-[transform,opacity] duration-[var(--motion-base)] ease-[var(--ease-emphasized)]
                ${
                  isOpen
                    ? "-rotate-45 translate-y-0"
                    : "translate-y-[7px]"
                }`}
              />
            </div>
          </button>

          {/* CENTER LOGO */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a
              href="/"
              aria-label="lululemon Hong Kong Home"
              className="relative block h-8 w-[104px] sm:h-9 sm:w-[128px]"
            >
              <span
                aria-hidden="true"
                className={`absolute inset-0 flex items-center justify-center text-white text-[23px] sm:text-[28px] font-semibold leading-none tracking-[-0.04em] transition-[opacity,transform] duration-[var(--motion-slow)] ease-[var(--ease-emphasized)] motion-reduce:transition-none ${hasPassedHero ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
              >
                lululemon
              </span>
              <span
                aria-hidden="true"
                className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-[var(--motion-slow)] ease-[var(--ease-emphasized)] motion-reduce:transition-none ${hasPassedHero ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              >
                <Image
                  src="/images/lululogo.png"
                  alt=""
                  width={100}
                  height={100}
                  priority
                  className="w-auto h-8 sm:h-9 object-contain"
                />
              </span>
            </a>
          </div>

          {/* RIGHT-SIDE ICONS */}
          <div className="right-controls ml-auto flex items-center gap-5 sm:gap-6">
            {/* Profile */}
            <button
              type="button"
              aria-label="Profile"
              className="flex items-center justify-center text-white"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="3.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M5 20C5.6 16.4 8.2 14.5 12 14.5C15.8 14.5 18.4 16.4 19 20"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Cart / Bag */}
            <button
              type="button"
              aria-label={`Shopping bag, ${count} ${count === 1 ? "item" : "items"}`}
              onClick={() => { setIsOpen(false); setCartOpen(true); }}
              className="relative flex items-center justify-center text-white"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 8H19L18 21H6L5 8Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 9V6.5C9 4.6 10.3 3 12 3C13.7 3 15 4.6 15 6.5V9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              {count > 0 && <span key={revision} className="cart-count" aria-hidden="true">{count}</span>}
            </button>
          </div>
        </div>
        </div>
      </header>
        <div
          className={`marquee-strip overflow-hidden text-white leading-none ${hasPassedHero ? "marquee-docked" : ""} ${hasPassedHero && isBottomHeaderVisible ? "marquee-hidden" : ""}`}
        >
          <div aria-hidden="true" className="marquee-background absolute inset-0" />
          <p className="sr-only">{MARQUEE_TEXT}</p>
          <div className="marquee-scale h-full">
          <div
            aria-hidden="true"
            className="header-marquee relative flex w-max h-full items-center"
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex min-w-[100vw] shrink-0 whitespace-pre">
                {[0, 1, 2].map((repeat) => (
                  <span key={repeat}>{MARQUEE_TEXT}{"    "}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
        </div>

      <style jsx>{`
        .cart-count { position: absolute; top: -7px; right: -9px; min-width: 16px; height: 16px; padding: 0 3px; display: grid; place-items: center; background: #fffffa; color: #e3243b; border-radius: 50%; font-size: 10px; line-height: 1; animation: cart-count-in var(--motion-base) ease-out; }
        @keyframes cart-count-in { from { opacity: .5; transform: translateY(3px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .cart-count { animation: none; } }
        .header-shell {
          top: 0;
          left: calc((100% - var(--lock-gap, 0px)) / 2);
          width: calc(100% - var(--lock-gap, 0px));
          transform: translate3d(-50%, 0, 0);
          transition: width var(--motion-slow) var(--ease-emphasized), transform var(--motion-slow) var(--ease-emphasized);
        }
        .header-surface {
          border-radius: 0;
          transition: border-radius var(--motion-slow) var(--ease-emphasized);
        }
        .header-pill { transform: translate3d(-50%, 8px, 0); width: calc((100% - var(--lock-gap, 0px)) * 0.96); }
        .header-pill .header-surface { border-radius: 48px; }
        .header-dissolve {
          top: 80px;
          left: 0;
          right: 0;
          width: 100%;
          opacity: 0;
          transition: opacity 150ms ease-out;
          -webkit-mask-image: none;
          mask-image: none;
        }
        /* Fade out at the start of contraction; return near the end of expansion. */
        .header-dissolve.dissolve-visible {
          opacity: 1;
          transition-delay: calc(var(--motion-slow) * 0.7);
        }
        .header-pill .header-dissolve { opacity: 0; transition-delay: 0ms; }
        /* Separate fixed layer: the transformed pill must not contain the ticker. */
        .marquee-strip {
          --nav-height: 48px;
          --strip-height: 32px;
          position: fixed;
          z-index: 50;
          top: var(--nav-height);
          left: 0;
          width: calc(100% - var(--lock-gap, 0px));
          height: var(--strip-height);
          padding-top: 8px;
          font-size: 11px;
          pointer-events: none;
          transform: translateY(0);
          transition: transform var(--motion-slow) var(--ease-emphasized),
            height var(--motion-slow) var(--ease-emphasized),
            padding-top var(--motion-slow) var(--ease-emphasized),
            left var(--motion-slow) var(--ease-standard), width var(--motion-slow) var(--ease-standard), opacity 700ms ease;
        }
        .marquee-docked {
          left: 2%;
          width: calc((100% - var(--lock-gap, 0px)) * 0.96);
          height: calc(var(--strip-height) * 0.7);
          padding-top: 2px;
          transform: translateY(calc(100vh - var(--nav-height) - var(--strip-height) * 0.7 - env(safe-area-inset-bottom, 0px) - 12px));
          transform: translateY(calc(100dvh - var(--nav-height) - var(--strip-height) * 0.7 - env(safe-area-inset-bottom, 0px) - 12px));
          mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
        }
        .marquee-hidden { opacity: 0; }
        @media (min-width: 640px) {
          .marquee-strip { --nav-height: 50px; --strip-height: 36px; }
          .header-dissolve { top: 86px; }
        }
        @media (min-width: 768px) {
          .marquee-strip { --strip-height: 38px; }
          .header-dissolve { top: 88px; }
        }
        @media (min-width: 1024px) {
          .marquee-docked { left: 4%; width: calc((100% - var(--lock-gap, 0px)) * 0.92); }
        }
        .marquee-background { background: linear-gradient(to right, transparent, #e3243b 10%, #e3243b 90%, transparent); }
        .marquee-background::after { content: ""; position: absolute; inset: 0; background: #e3243b; opacity: 1; transition: opacity var(--motion-slow) var(--ease-standard); }
        .marquee-docked .marquee-background::after { opacity: 0; }
        .menu-control, .right-controls { transition: transform var(--motion-slow) var(--ease-emphasized); }
        .header-pill .menu-control { transform: translateX(8px); }
        .header-pill .right-controls { transform: translateX(-8px); }
        @media (min-width: 1024px) {
          .header-pill { transform: translate3d(-50%, 12px, 0); width: calc((100% - var(--lock-gap, 0px)) * 0.92); }
          .header-pill .menu-control { transform: translateX(16px); }
          .header-pill .right-controls { transform: translateX(-16px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .header-shell, .header-surface, .header-dissolve, .marquee-strip, .marquee-background::after, .menu-control, .right-controls { transition: none; }
        }
        .marquee-scale { transform: scale(1); transform-origin: left center; transition: transform var(--motion-slow) var(--ease-emphasized); }
        .marquee-docked .marquee-scale { transform: scale(0.9090909); }
        .header-marquee {
          animation: header-marquee-right 120s linear infinite;
        }

        @keyframes header-marquee-right {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .header-marquee { animation: none; }
        }
      `}</style>

      <NavigationMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
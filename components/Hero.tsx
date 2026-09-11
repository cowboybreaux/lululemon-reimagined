"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const collections = [
  {
    name: "Fast & Free", category: "Running",
    image: "/images/fast-and-free-hero.png",
    desktopImage: "/images/fast-and-free-desktop.webp",
    leftTitle: "fast &", rightTitle: "free.",
    heading: "BREEZY AND EASY NULUX™ SENSATION  –  RUNNING",
    description: "Engineered for pure speed and zero distraction. Crafted with weightless Nulux™ fabric to deliver unrestricted motion in Hong Kong’s tropical heat and urban tempo runs.",
  },
  {
    name: "Align", category: "Yoga",
    image: "/images/align-hero.png",
    desktopImage: "/images/align-desktop.jpg",
    leftTitle: "align.", rightTitle: "",
    heading: "FEEL THE BUTTERY NULU™ SENSATION  –  YOGA",
    description: "Find softness in every stretch. Move freely through your yoga practice with gentle comfort that follows your flow, from the first breath to the final pose.",
  },
  {
    name: "Wunder Train", category: "Training",
    image: "/images/wunder-train-hero.png",
    desktopImage: "/images/wunder-train-desktop.webp",
    leftTitle: "wunder", rightTitle: "train.",
    heading: "EVERLUX™ SECURE SENSATION  –  TRAINING • WEIGHTLIFTING ",
    description: "Meet the sweat with steady support. Move through every rep with comfort and confidence, and keep your focus on performance when the training turns up.",
  },
];

// End copies allow both loop directions to finish on an identical panel.
const panels = [collections[2], ...collections, collections[0]];

function CampaignPhoto({ collection, priority }: { collection: (typeof collections)[number]; priority: boolean }) {
  const [desktopReady, setDesktopReady] = useState(false);
  return (
    <div className={`campaign-photo ${desktopReady ? "desktop-ready" : ""}`}>
      <div className="portrait-photo absolute inset-0">
        <Image src={collection.image} alt={`lululemon ${collection.name} ${collection.category} Collection campaign`} fill priority={priority} loading="eager" sizes="100vw" className="object-cover object-center" />
      </div>
      <div className="desktop-photo absolute inset-0" aria-hidden="true">
        <Image src={collection.desktopImage} alt="" fill loading="eager" sizes="100vw" onLoad={() => setDesktopReady(true)} className={collection.name === "Align" ? "object-contain object-center" : "object-cover object-center"} />
      </div>
      <style jsx>{`
        .campaign-photo {
          position: absolute; inset: 0; z-index: 1;
          -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
          mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
        }
        .portrait-photo, .desktop-photo { transition: opacity 400ms ease-in-out; }
        .portrait-photo { opacity: 1; }
        .desktop-photo { opacity: 0; background: #fffffa; }
        @media (min-width: 1024px) {
          .desktop-ready .desktop-photo { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .portrait-photo, .desktop-photo { transition: none; }
        }
      `}</style>
    </div>
  );
}

export default function Hero() {
  const [position, setPosition] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [blending, setBlending] = useState(false);
  const moving = useRef(false);
  const active = (position + collections.length - 1) % collections.length;

  const move = useCallback((direction: number) => {
    if (moving.current) return;
    moving.current = true;
    setBlending(true);
    setAnimate(true);
    setPosition((current) => current + direction);
  }, []);

  useEffect(() => {
    if (blending) return;
    const timer = window.setTimeout(() => move(1), 5000);
    return () => window.clearTimeout(timer);
  }, [position, blending, move]);

  const finishTransition = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
    if (position === 0 || position === panels.length - 1) {
      setAnimate(false);
      setPosition(position === 0 ? collections.length : 1);
    }
    setAnimate(false);
    moving.current = false;
    setBlending(false);
  };
  const detailsRef = useRef<HTMLDivElement>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

  useEffect(() => {
    const element = detailsRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDetailsVisible(true);
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="fast-and-free"
      className={`relative w-full overflow-hidden bg-[#fffffa] ${blending ? "is-sliding" : ""}`}
      aria-roledescription="carousel"
      aria-label="Collection campaigns"
    >
      <div
        className="flex items-stretch"
        style={{
          transform: `translate3d(-${position * 100}%, 0, 0)`,
          transition: animate ? "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        }}
        onTransitionEnd={finishTransition}
      >
        {panels.map((collection, index) => (
          <div
            key={index}
            className="w-full min-w-full flex-[0_0_100%] bg-[#fffffa]"
            role="group"
            aria-roledescription="slide"
            aria-label={`${collection.name} — ${collection.category}`}
            aria-hidden={index !== position}
          >
      {/* HERO IMAGE */}
      <div className="campaign-frame relative w-full bg-[#fffffa]">
  <CampaignPhoto collection={collection} priority={index > 0 && index <= collections.length} />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-[30%] flex-col"
  >
    <div
      className="min-h-0 flex-1"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255,255,250,0) 0%, rgba(255,255,250,0.2) 30%, rgba(255,255,250,0.6) 60%, rgba(255,255,250,0.9) 82%, #fffffa 100%)",
      }}
    />
    <div className="h-24 shrink-0 bg-[#fffffa] sm:h-28 md:h-36" />
  </div>

  <div data-collection-title={collection.name} className="absolute inset-x-0 bottom-[32%] z-20 flex items-center justify-between px-[4vw] pointer-events-none">
    <span style={collection.name === "Wunder Train" ? { fontSize: "clamp(3rem, 8vw, 9rem)" } : undefined} className="font-calibre text-white text-[clamp(3.5rem,8vw,9rem)] leading-none tracking-[-0.05em] font-semibold lowercase whitespace-nowrap">
      {collection.leftTitle}
    </span>

    <span style={collection.name === "Wunder Train" ? { fontSize: "clamp(3rem, 8vw, 9rem)" } : undefined} className="font-calibre text-white text-[clamp(3.5rem,8vw,9rem)] leading-none tracking-[-0.05em] font-semibold lowercase whitespace-nowrap">
      {collection.rightTitle}
    </span>
  </div>
</div>

      {/* DESCRIPTION SECTION */}
      <div
        ref={index === 1 ? detailsRef : undefined}
        className="relative z-20 -mt-24 sm:-mt-28 md:-mt-36 bg-[#fffffa] px-7 sm:px-10 md:px-14 lg:px-20 pt-1 sm:pt-3 md:pt-5 pb-24 md:pb-36"
      >
        <div
          className={`
            mx-auto
            max-w-7xl
            grid
            grid-cols-1
            md:grid-cols-[1.5fr_1fr]
            gap-12
            md:gap-20
            items-end
            transition-all
            duration-1000
            ease-[cubic-bezier(0.16,1,0.3,1)]
            ${
              detailsVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }
          `}
        >
          {/* LEFT COPY */}
          <div className="max-w-2xl">
            <p className="text-sm sm:text-base uppercase tracking-[0.22em] text-[#170306]/70 font-bold mb-6">
              {collection.heading}
            </p>

            <p className="text-[15px] sm:text-[17px] md:text-[19px] font-normal leading-[1.5] text-[#170306] text-justify">
              {collection.description}
            </p>
          </div>

          {/* RIGHT CTA */}
          <div className="md:flex md:justify-end">
            <button
              type="button"
              tabIndex={index === position ? 0 : -1}
              className="group inline-flex items-center justify-between gap-8 border border-[#170306]/60 px-7 py-4 text-xs font-semibold tracking-[0.2em] uppercase text-[#170306] transition-all duration-300 hover:bg-[#170306] hover:text-[#fffffa]"
            >
              <span>SHOP THE COLLECTION</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
          </div>
        ))}
      </div>

      <div className="campaign-frame pointer-events-none absolute inset-x-0 top-0">
        <div className="absolute inset-x-[2vw] top-[35%] z-30 flex justify-between">
          <button
            type="button"
            aria-label="Previous collection"
            onClick={() => move(-1)}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center text-2xl text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.8)] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next collection"
            onClick={() => move(1)}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center text-2xl text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.8)] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
          >
            ›
          </button>
        </div>
      </div>
      <p className="sr-only">{active + 1} of {collections.length}: {collections[active].name}</p>
      <style jsx>{`
        .campaign-frame { aspect-ratio: 2 / 3; transition: aspect-ratio 400ms ease-in-out; }
        @media (min-width: 1024px) {
          .campaign-frame { aspect-ratio: 3 / 2; }
          [data-collection-title="Align"] { text-shadow: 0 1px 4px rgba(23, 3, 6, 0.75); }
        }
        /* Only overlapping photographic layers blend; text and controls stay crisp. */
        .is-sliding :global(.campaign-photo) {
          -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
          mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
        }
        @media (prefers-reduced-motion: reduce) {
          .campaign-frame { transition: none; }
        }
      `}</style>
    </section>
  );
}
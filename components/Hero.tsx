"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useReducedMotion from "./useReducedMotion";

interface Campaign {
  name: string; category: string; image: string; desktopImage: string;
  leftTitle: string; rightTitle: string; heading: string; description: string;
  artwork?: boolean; cta?: string;
}
const collections: Campaign[] = [
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
  {
    name: "Listening Lounge", category: "Kuala Lumpur",
    image: "/images/listening-lounge-expanded.png",
    desktopImage: "/images/listening-lounge-expanded.png",
    leftTitle: "", rightTitle: "", heading: "QUIET THE NOISE AND FIND YOUR RHYTHM.", artwork: true, cta: "SIGN UP NOW",
    description: "Meet us at the lululemon listening lounge in Kuala Lumpur.\nTune out the noise during the race week and find your rhythm through music, presence and community. Record your mantra, design a vinyl sleeve and make it yours with a customised tee.",
  },
];

const ctaLabel = (collection: Campaign) => collection.cta ?? `EXPLORE ${collection.name.replace("&", "AND").toUpperCase()}`;

// End copies allow both loop directions to finish on an identical panel.
const panels = [collections[collections.length - 1], ...collections, collections[0]];

function CampaignPhoto({ collection, priority }: { collection: (typeof collections)[number]; priority: boolean }) {
  const [desktopReady, setDesktopReady] = useState(false);
  return (
    <div className={`campaign-photo ${desktopReady ? "desktop-ready" : ""} ${collection.artwork ? "artwork" : ""}`}>
      <div className="portrait-photo absolute inset-0">
        <Image src={collection.image} alt={`lululemon ${collection.name} ${collection.category} Collection campaign`} fill priority={priority} loading="eager" sizes="100vw" className="object-cover object-center" />
      </div>
      {!collection.artwork && <div className="desktop-photo absolute inset-0" aria-hidden="true">
        <Image src={collection.desktopImage} alt="" fill loading="eager" sizes="100vw" onLoad={() => setDesktopReady(true)} className={collection.artwork ? "object-cover object-center" : collection.name === "Align" ? "object-contain object-center" : "object-cover object-center"} />
      </div>}
      <style jsx>{`
        .campaign-photo {
          position: absolute; inset: 0; z-index: 1;
        }
        .portrait-photo, .desktop-photo { transition: opacity 500ms cubic-bezier(0.22, 1, 0.36, 1); }
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
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [blending, setBlending] = useState(false);
  const moving = useRef(false);
  const active = (position + collections.length - 1) % collections.length;

  const move = useCallback((direction: number) => {
    if (reducedMotion) {
      setAnimate(false);
      setPosition(current => ((current - 1 + direction + collections.length) % collections.length) + 1);
      return;
    }
    if (moving.current) return;
    moving.current = true;
    setBlending(true);
    setAnimate(true);
    setPosition((current) => current + direction);
  }, [reducedMotion]);

  useEffect(() => {
    if (blending || reducedMotion) return;
    const timer = window.setTimeout(() => move(1), 5000);
    return () => window.clearTimeout(timer);
  }, [position, blending, move, reducedMotion]);

  const settle = useCallback(() => {
    setPosition(current => current === 0 ? collections.length : current === panels.length - 1 ? 1 : current);
    setAnimate(false);
    moving.current = false;
    setBlending(false);
  }, []);
  const finishTransition = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && event.propertyName === "transform") settle();
  };
  useEffect(() => {
    if (!blending) return;
    if (reducedMotion) { settle(); return; }
    // Recover if a transition is cancelled by a breakpoint or browser visibility change.
    const duration = 500;
    const timer = window.setTimeout(settle, duration + 80);
    return () => window.clearTimeout(timer);
  }, [blending, reducedMotion, settle]);
  const [detailsVisible, setDetailsVisible] = useState(false);
  useEffect(() => {
    if (reducedMotion) { setDetailsVisible(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setDetailsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    sectionRef.current?.querySelectorAll(".campaign-details").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="fast-and-free" className="relative w-full overflow-hidden bg-[#fffffa]" aria-roledescription="carousel" aria-label="Collection campaigns">
      <div className="campaign-frame relative w-full overflow-hidden bg-[#fffffa]">
        <div className="absolute inset-0 flex items-stretch"
          style={{ transform: `translate3d(-${position * 100}%, 0, 0)`, transition: animate && !reducedMotion ? "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)" : "none" }}
          onTransitionEnd={finishTransition}>
          {panels.map((collection, index) => (
            <div key={index} className="relative w-full min-w-full flex-[0_0_100%]" role="group" aria-roledescription="slide" aria-label={`${collection.name} — ${collection.category}`} aria-hidden={index !== position}>
              <CampaignPhoto collection={collection} priority={index > 0 && index <= collections.length} />
            </div>
          ))}
        </div>
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

        {collections.map((collection, index) => (
          <React.Fragment key={collection.name}>
  {!collection.artwork && <div data-collection-title={collection.name} aria-hidden={index !== active} className={`text-layer ${index === active ? "active" : ""} absolute inset-x-0 bottom-[32%] z-20 flex items-center justify-between px-[4vw] pointer-events-none`}>
    <span style={collection.name === "Wunder Train" ? { fontSize: "clamp(2.7rem, 7.2vw, 8.1rem)" } : undefined} className="font-calibre text-white text-[clamp(3.15rem,7.2vw,8.1rem)] leading-none tracking-[-0.05em] font-semibold lowercase whitespace-nowrap">
      {collection.leftTitle}
    </span>

    <span style={collection.name === "Wunder Train" ? { fontSize: "clamp(2.7rem, 7.2vw, 8.1rem)" } : undefined} className="font-calibre text-white text-[clamp(3.15rem,7.2vw,8.1rem)] leading-none tracking-[-0.05em] font-semibold lowercase whitespace-nowrap">
      {collection.rightTitle}
    </span>
  </div>}
          </React.Fragment>
        ))}
      </div>
      <div className="campaign-details relative z-20 -mt-24 sm:-mt-28 md:-mt-36 bg-[#fffffa] px-7 sm:px-10 md:px-14 lg:px-20 pt-1 sm:pt-3 md:pt-5 pb-24 md:pb-36">
        <div className={`mx-auto max-w-7xl grid grid-cols-1 ${collections[active].artwork ? "" : "md:grid-cols-[1.5fr_1fr]"} gap-12 md:gap-20 items-end transition-opacity duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:opacity-100 ${detailsVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="copy-stack max-w-2xl">
            {collections.map((collection, index) => (
              <div key={collection.name} aria-hidden={index !== active} className={`copy-layer ${index === active ? "active" : ""}`}>
                {collection.heading && <p className="text-[12.6px]/[20px] sm:text-[14.4px]/[24px] uppercase tracking-[0.22em] text-[#170306]/70 font-bold mb-6">{collection.heading}</p>}
                <p className="description text-[13.5px] sm:text-[15.3px] md:text-[17.1px] font-normal leading-[1.5] text-[#170306] text-justify">{collection.description}</p>
              </div>
            ))}
          </div>
          <div className={`relative -top-3 ${collections[active].artwork ? "" : "md:flex md:justify-end"}`}>
            <button type="button" aria-label={ctaLabel(collections[active])} className="slideshow-cta group inline-flex max-w-full items-center justify-between gap-8 border px-7 py-4 text-[10.8px]/[16px] font-semibold tracking-[0.2em] uppercase">
              <span className="cta-labels" aria-hidden="true">
                {collections.map((collection, index) => (
                  <span key={collection.name} className={`text-layer ${index === active ? "active" : ""}`}>{ctaLabel(collection)}</span>
                ))}
              </span>
              <span aria-hidden="true" className="transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
      <div className="campaign-frame pointer-events-none absolute inset-x-0 top-0">
        <div className="absolute inset-x-[2vw] top-[35%] z-30 flex justify-between">
          <button
            type="button"
            aria-label="Previous collection"
            onClick={() => move(-1)}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center text-[21.6px]/[32px] text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.8)] transition-opacity duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next collection"
            onClick={() => move(1)}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center text-[21.6px]/[32px] text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.8)] transition-opacity duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
          >
            ›
          </button>
        </div>
      </div>

      <p className="sr-only">{active + 1} of {collections.length}: {collections[active].name}</p>
      <style jsx>{`
        .slideshow-cta {
          color: #e3243b; border-color: #e3243b; background-color: transparent;
          transition: background-color 300ms cubic-bezier(.22,1,.36,1), color 300ms cubic-bezier(.22,1,.36,1), border-color 300ms cubic-bezier(.22,1,.36,1);
        }
        .slideshow-cta:focus-visible { background-color: #e3243b; color: white; outline: 2px solid #e3243b; outline-offset: 4px; }
        @media (hover: hover) and (pointer: fine) {
          .slideshow-cta:hover { background-color: #e3243b; color: white; }
        }
        .campaign-frame { aspect-ratio: 2 / 3; }
        .copy-stack, .cta-labels { display: grid; }
        .copy-layer, .cta-labels .text-layer { grid-area: 1 / 1; min-width: 0; }
        .text-layer, .copy-layer { opacity: 0; pointer-events: none; transition: opacity 500ms cubic-bezier(0.22, 1, 0.36, 1); }
        .text-layer.active, .copy-layer.active { opacity: 1; transition-delay: 0ms; }
        .copy-layer.active .description { animation: description-enter 500ms cubic-bezier(0.22, 1, 0.36, 1) backwards; }
        @keyframes description-enter {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (min-width: 1024px) {
          .campaign-frame { aspect-ratio: 3 / 2; }
          [data-collection-title="Align"] { text-shadow: 0 1px 4px rgba(23, 3, 6, 0.75); }
        }
        @media (prefers-reduced-motion: reduce) {
          .text-layer, .copy-layer { transition: none; }
          .copy-layer.active .description { animation: none; }
        }
      `}</style>
    </section>
  );
}

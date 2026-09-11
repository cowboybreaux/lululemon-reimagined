"use client";
import { useEffect, useId, useState } from "react";
import { useCart, type PurchaseProduct } from "./CartContext";

export default function QuickAdd({ product, active = true, dark = false }: { product: PurchaseProduct; active?: boolean; dark?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const id = useId();
  const { addItem } = useCart();
  useEffect(() => { if (!added) return; const timer = setTimeout(() => setAdded(false), 2200); return () => clearTimeout(timer); }, [added]);
  useEffect(() => { if (!active) { setExpanded(false); setSize(null); } }, [active]);
  return <div className={`quick-add mt-3 ${dark ? "on-dark" : ""}`}>
    <button type="button" tabIndex={active ? 0 : -1} aria-expanded={expanded} aria-controls={id} className="trigger py-3 text-xs font-semibold tracking-[0.2em]" onClick={() => { setExpanded(!expanded); setSize(null); setAdded(false); }}>QUICK ADD</button>
    <div id={id} aria-hidden={!expanded} className={`reveal ${expanded ? "expanded" : ""}`}>
      <div className="min-h-0 overflow-hidden">
        <div role="group" aria-label={`Choose a size for ${product.name}${product.colour ? ` — ${product.colour}` : ""}`} className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
          {product.sizes.map(option => <button key={option} type="button" tabIndex={active && expanded ? 0 : -1} aria-pressed={size === option} className="size min-w-8 h-8 sm:min-w-10 sm:h-10 border px-2 sm:px-3 text-xs font-semibold" onClick={() => { setSize(option); setAdded(false); }}>{option}</button>)}
        </div>
        {size && <button type="button" tabIndex={active && expanded ? 0 : -1} className="add mt-3 border px-3 sm:px-5 py-3 text-xs font-bold tracking-[0.15em]" onClick={() => { if (active && expanded) { addItem(product, size); setAdded(true); } }}>ADD TO CART</button>}
      </div>
    </div>
    <span role="status" className={added ? "block mt-2 text-xs opacity-70" : "sr-only"}>{added ? "Added to cart" : ""}</span>
    <style jsx>{`
      .quick-add { --ink: #170306; --paper: #fffffa; }
      .on-dark { --ink: #ffe7c2; --paper: #361502; }
      button { transition: background-color 200ms ease, color 200ms ease, opacity 200ms ease; }
      button:focus-visible { outline: 1px solid var(--ink); outline-offset: 3px; }
      .trigger:hover { opacity: .7; }
      .size, .add { border-color: currentColor; }
      .size:hover { background: color-mix(in srgb, var(--ink) 10%, transparent); }
      .size[aria-pressed="true"], .add:hover { background: var(--ink); color: var(--paper); }
      .reveal { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 300ms ease, opacity 300ms ease; }
      .expanded { grid-template-rows: 1fr; opacity: 1; }
      @media (prefers-reduced-motion: reduce) { button, .reveal { transition: none; } }
    `}</style>
  </div>;
}

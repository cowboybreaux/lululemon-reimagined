"use client";
import { useEffect, useId, useState } from "react";
import { useCartActions, type PurchaseProduct } from "./CartContext";

export default function QuickAdd({ product, active = true, dark = false }: { product: PurchaseProduct; active?: boolean; dark?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const id = useId();
  const { addItem } = useCartActions();
  useEffect(() => { if (!added) return; const timer = setTimeout(() => setAdded(false), 2200); return () => clearTimeout(timer); }, [added]);
  useEffect(() => { if (!active) { setExpanded(false); setSize(null); } }, [active]);
  return <div className={`quick-add mt-3 ${dark ? "on-dark" : ""}`}>
    <button type="button" tabIndex={active ? 0 : -1} aria-expanded={expanded} aria-controls={id} className="trigger py-3 text-[10.8px]/[16px] font-semibold tracking-[0.2em]" onClick={() => { setExpanded(!expanded); setSize(null); setAdded(false); }}>QUICK ADD</button>
    <div id={id} aria-hidden={!expanded} className={`reveal ${expanded ? "expanded" : ""}`}>
      <div className="min-h-0 overflow-hidden">
        <div role="group" aria-label={`Choose a size for ${product.name}${product.colour ? ` — ${product.colour}` : ""}`} className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 px-px">
          {product.sizes.map(option => <button key={option} type="button" tabIndex={active && expanded ? 0 : -1} aria-pressed={size === option} className="size min-w-8 h-8 sm:min-w-10 sm:h-10 border px-2 sm:px-3 text-[10.8px]/[16px] font-semibold" onClick={() => { setSize(option); setAdded(false); }}>{option}</button>)}
        </div>
        <div className={`reveal ${size && expanded ? "expanded" : ""}`} aria-hidden={!size || !expanded}><div className="min-h-0 overflow-hidden"><button type="button" tabIndex={active && expanded && size ? 0 : -1} disabled={!size || !expanded || !active} className="add mt-3 border px-3 sm:px-5 py-3 text-[10.8px]/[16px] font-bold tracking-[0.15em]" onClick={() => { if (active && expanded && size) { addItem(product, size); setAdded(true); } }}>ADD TO CART</button></div></div>
      </div>
    </div>
    <div className={`reveal ${added ? "expanded" : ""}`}><div className="min-h-0 overflow-hidden"><span aria-hidden="true" className="block mt-2 text-[10.8px]/[16px] opacity-70">Added to cart</span></div></div>
    <span role="status" className="sr-only">{added ? "Added to cart" : ""}</span>
    <style jsx>{`
      .quick-add { --ink: #170306; --paper: #fffffa; }
      .on-dark { --ink: #ffe7c2; --paper: #361502; }
      button { transition: background-color var(--motion-fast) var(--ease-standard), color var(--motion-fast) var(--ease-standard), opacity var(--motion-fast) var(--ease-standard); }
      button:focus-visible { outline: 1px solid var(--ink); outline-offset: 3px; }
      @media (hover: hover) and (pointer: fine) { .trigger:hover { opacity: .7; } }
      .size, .add { border-color: currentColor; }
      .size { border-width: 1px; border-style: solid; border-radius: 0; }
      @media (hover: hover) and (pointer: fine) { .size:hover { background: color-mix(in srgb, var(--ink) 10%, transparent); } }
      .size[aria-pressed="true"] { background: var(--ink); color: var(--paper); }
      @media (hover: hover) and (pointer: fine) { .add:not(:disabled):hover { background: var(--ink); color: var(--paper); } }
      .reveal { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows var(--motion-base) var(--ease-standard), opacity var(--motion-base) var(--ease-standard); }
      .expanded { grid-template-rows: 1fr; opacity: 1; }
      @media (prefers-reduced-motion: reduce) { button, .reveal { transition: none; } }
    `}</style>
  </div>;
}

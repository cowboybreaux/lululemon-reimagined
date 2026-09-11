"use client";
import useScrollLock from "./useScrollLock";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useCart } from "./CartContext";
const money = (value: number) => `RM${value.toLocaleString("en-MY", { maximumFractionDigits: 2 })}`;
export default function CartDrawer() {
  const { items, count, subtotal, isOpen, setOpen, removeItem } = useCart();
  useScrollLock(isOpen);
  const panel = useRef<HTMLElement>(null);
  const removals = useRef(new Map<string, Animation>());
  useEffect(() => () => { removals.current.forEach(animation => animation.cancel()); }, []);
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!panel.current) return;
    panel.current.inert = !isOpen;
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const focusFrame = window.setTimeout(() => close.current?.focus({ preventScroll: true }), 0);
    const keys = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
      if (event.key === "Tab") {
        const controls = Array.from(panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]') ?? []);
        const first = controls[0], last = controls[controls.length - 1];
        if (!panel.current?.contains(document.activeElement)) { event.preventDefault(); first?.focus(); }
        else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", keys);
    return () => { window.clearTimeout(focusFrame); document.removeEventListener("keydown", keys); previousFocus?.focus({ preventScroll: true }); };
  }, [isOpen, setOpen]);
  const remove = (key: string, button: HTMLButtonElement) => {
    if (removals.current.has(key)) return;
    const row = button.closest("li");
    if (!row || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      close.current?.focus({ preventScroll: true }); removeItem(key); return;
    }
    const height = row.getBoundingClientRect().height;
    const animation = row.animate([
      { height: `${height}px`, opacity: 1 },
      { height: "0px", paddingTop: "0px", paddingBottom: "0px", borderWidth: "0px", opacity: 0 },
    ], { duration: 180, easing: "cubic-bezier(.2,.7,.3,1)", fill: "forwards" });
    removals.current.set(key, animation);
    animation.onfinish = () => {
      if (row.contains(document.activeElement)) close.current?.focus({ preventScroll: true });
      removeItem(key);
      removals.current.delete(key);
    };
  };
  return <div className={`cart-layer ${isOpen ? "open" : ""}`} aria-hidden={!isOpen}>
    <div className="backdrop" onClick={() => setOpen(false)} />
    <aside ref={panel} onTransitionEnd={event => { if (event.target === event.currentTarget && event.propertyName === "transform" && isOpen && !panel.current?.contains(document.activeElement)) close.current?.focus({ preventScroll: true }); }} role="dialog" aria-modal={isOpen ? true : undefined} aria-labelledby="cart-title" className="drawer">
      <div className="flex items-center justify-between border-b border-[#170306]/20 px-6 sm:px-8 py-5">
        <h2 id="cart-title" className="text-2xl font-semibold">Your bag <span className="text-base opacity-60">({count})</span></h2>
        <button ref={close} onClick={() => setOpen(false)} type="button" aria-label="Close shopping bag" className="h-10 w-10 text-3xl">×</button>
      </div>
      <div className="items px-6 sm:px-8">
        {!items.length ? <p className="py-12 text-lg opacity-70">Your bag is empty.</p> : <ul>
          {items.map(item => <li key={item.key} className="flex gap-4 overflow-hidden border-b border-[#170306]/20 py-6">
            <div className="relative w-24 shrink-0 aspect-[5/6] self-start border border-[#170306]/20"><Image src={item.image} alt={item.name} fill unoptimized className="object-contain" sizes="96px" /></div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold leading-snug">{item.name}</h3>
              {item.colour && <p className="mt-1 text-sm opacity-70">{item.colour}</p>}
              <p className="mt-2 text-sm">Size: {item.size}</p>
              <p className="mt-1 text-sm">{item.price}</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm"><span>Qty: {item.quantity}</span><button type="button" className="underline underline-offset-4" aria-label={`Remove ${item.name}${item.colour ? ` — ${item.colour}` : ""}, size ${item.size}`} onClick={event => remove(item.key, event.currentTarget)}>Remove</button></div>
            </div>
          </li>)}
        </ul>}
      </div>
      <div className="summary border-t border-[#170306]/20 px-6 sm:px-8 pt-5">
        <div className="flex justify-between text-lg font-semibold"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <p className="mt-1 text-sm opacity-70">{count} {count === 1 ? "item" : "items"}</p>
        <button type="button" disabled className="mt-5 w-full bg-[#e3243b] text-white py-4 text-xs font-semibold tracking-[0.2em] disabled:cursor-default">CHECKOUT</button>
      </div>
    </aside>
    <style jsx>{`
      .cart-layer { position: fixed; inset: 0; z-index: 100; visibility: hidden; pointer-events: none; transition: visibility 0s var(--motion-panel); }
      .cart-layer.open { visibility: visible; pointer-events: auto; transition-delay: 0s; }
      .backdrop { position: absolute; inset: 0; background: rgba(23,3,6,.25); opacity: 0; transition: opacity var(--motion-panel) var(--ease-standard); }
      .open .backdrop { opacity: 1; }
      .drawer { position: absolute; inset: 0 0 0 auto; width: min(100%, 480px); height: 100%; background: #fffffa; color: #170306; display: flex; flex-direction: column; transform: translateX(100%); transition: transform var(--motion-panel) var(--ease-emphasized); }
      .open .drawer { transform: translateX(0); }
      .items { overflow-y: auto; scrollbar-gutter: stable; overscroll-behavior: contain; flex: 1; min-height: 0; }
      .summary { padding-bottom: max(24px, env(safe-area-inset-bottom)); }
      button:focus-visible { outline: 2px solid #e3243b; outline-offset: 3px; }
      @media (prefers-reduced-motion: reduce) { .cart-layer, .backdrop, .drawer { transition: none; } }
    `}</style>
  </div>;
}

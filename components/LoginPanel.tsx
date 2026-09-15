"use client";
import { useEffect, useRef } from "react";
import { useCart } from "./CartContext";
import useScrollLock from "./useScrollLock";
const perks = [
  { label: "Check out faster", path: "M12 8v4l3 2M20 12a8 8 0 1 1-8-8M17 3v6m-3-3h6" },
  { label: "Easily track orders", path: "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" },
  { label: "View order history", path: "M4 8h16l1 13H3L4 8ZM8 9V6a4 4 0 0 1 8 0v3" },
  { label: "Saved wishlist", path: "M12 21S2 15 2 8a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 7-10 13-10 13Z" },
];
export default function LoginPanel() {
  const { isLoginOpen: open, setLoginOpen, isOpen: cartOpen } = useCart();
  const panel = useRef<HTMLElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  useScrollLock(open);
  useEffect(() => {
    if (!panel.current) return;
    panel.current.inert = !open;
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => close.current?.focus({ preventScroll: true }));
    const keys = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setLoginOpen(false); }
      if (event.key === "Tab") {
        const controls = Array.from(panel.current?.querySelectorAll<HTMLElement>('button, input') ?? []);
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", keys);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("keydown", keys); previous?.focus({ preventScroll: true }); };
  }, [open, setLoginOpen]);
  return <div className={`login-layer ${open ? "open" : ""}`} aria-hidden={!open} style={cartOpen ? { visibility: "hidden" } : undefined}>
    <div className="backdrop" onClick={() => setLoginOpen(false)} />
    <aside ref={panel} className="panel" role="dialog" aria-modal={open ? true : undefined} aria-labelledby="login-title">
      <button ref={close} className="close" type="button" aria-label="Close login panel" onClick={() => setLoginOpen(false)}>×</button>
      <h2 id="login-title">Sign in</h2>
      <form onSubmit={event => event.preventDefault()}>
        <label className="sr-only" htmlFor="guest-email">Email address</label>
        <input id="guest-email" type="email" autoComplete="email" placeholder="Enter email address" />
        <label className="sr-only" htmlFor="guest-password">Password</label>
        <input id="guest-password" type="password" autoComplete="current-password" placeholder="Enter password" />
        <button type="submit" className="cta sign-in">SIGN IN</button>
      </form>
      <button type="button" className="forgot">Forgot password?</button>
      <hr />
      <h3>Don’t have an account?</h3>
      <p className="intro">Create one and start enjoying your perks right away.</p>
      <ul className="perks">{perks.map(perk => <li key={perk.label}><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={perk.path} /></svg><span>{perk.label}</span></li>)}</ul>
      <button type="button" className="cta create">CREATE AN ACCOUNT</button>
    </aside>
    <style jsx>{`
      .login-layer { position: fixed; inset: 0; z-index: 100; visibility: hidden; pointer-events: none; transition: visibility 0s 400ms; }
      .open { visibility: visible; pointer-events: auto; transition-delay: 0s; }
      .backdrop { position: absolute; inset: 0; background: rgba(0,0,0,.15); opacity: 0; transition: opacity 400ms var(--ease-standard); }
      .panel { --panel-top: calc(max(var(--header-height, 80px), env(safe-area-inset-top, 0px)) + 20px); position: absolute; top: var(--panel-top); left: 0; right: 0; margin-inline: auto; width: min(540px, calc(100% - 32px)); max-height: calc(100dvh - var(--panel-top) - max(8px, env(safe-area-inset-bottom, 0px))); overflow-y: auto; overscroll-behavior: contain; padding: 44px 20px 20px; border-radius: 24px; background: #fffffa; color: #170306; opacity: 0; transform: translateY(-20px); transition: opacity 400ms var(--ease-standard), transform 400ms var(--ease-emphasized); }
      .open .panel { opacity: 1; transform: translateY(0); } .open .backdrop { opacity: 1; }
      .close { position: absolute; right: 20px; top: 8px; width: 40px; height: 40px; font-size: 30px; }
      h2 { text-align: center; font-size: 18px; font-weight: 600; line-height: 1.2; margin: 0 0 18px; }
      form { display: grid; gap: 10px; }
      input { width: 100%; height: 38px; padding: 8px 12px; border: 1px solid rgba(23,3,6,.25); border-radius: 4px; background: transparent; font: inherit; font-size: 11.5px; }
      .cta { width: 100%; padding: 12px 12px; font-size: 11.5px; font-weight: 600; letter-spacing: .15em; border: 1px solid #e3243b; border-radius: 8px; transition: background-color 250ms ease-out, color 250ms ease-out; }
      .sign-in { background: transparent; color: #e3243b; } .sign-in:focus-visible, .sign-in:active { background: #e3243b; color: white; }
      .forgot { display: block; margin: 12px auto 0; font-size: 11.5px; opacity: .7; text-decoration: underline; text-underline-offset: 3px; }
      hr { border: 0; border-top: 1px solid rgba(23,3,6,.2); margin: 18px 0; }
      h3 { font-size: 16px; font-weight: 600; } .intro { font-size: 11.5px; line-height: 1.4; margin-top: 8px; }
      .perks { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 14px 10px; margin: 18px 0; padding: 0; list-style: none; }
      li { display: flex; align-items: center; gap: 8px; font-size: 11.5px; line-height: 1.3; } svg { width: 22px; height: 22px; flex-shrink: 0; }
      .create { background: #e3243b; color: white; } button:focus-visible, input:focus-visible { outline: 2px solid #e3243b; outline-offset: 3px; }
      @media (hover: hover) and (pointer: fine) { .sign-in:hover { background: #e3243b; color: white; } .create:hover { background: #ce2035; } }
      @media (min-width: 640px) {
        .panel { left: auto; right: 4vw; margin-inline: 0; width: min(330px, 92vw); padding: 44px 20px 20px; }
        form { gap: 10px; }
        input { height: 38px; padding-block: 8px; }
        h2 { margin-bottom: 18px; }
        hr { margin: 18px 0; }
        .perks { gap: 14px 10px; margin: 18px 0; }
      }
      @media (max-width: 639px) { .panel { right: 0; left: 0; width: min(86vw, 360px); padding-inline: 20px; max-height: calc(100dvh - var(--panel-top) - max(8px, env(safe-area-inset-bottom, 0px))); } }
      @media (max-width: 350px) { .perks { grid-template-columns: 1fr; } }
      @media (prefers-reduced-motion: reduce) { .login-layer, .panel, .backdrop { transition: none; } }
    `}</style>
  </div>;
}

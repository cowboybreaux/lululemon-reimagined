"use client";

import { useLayoutEffect, useRef, useState } from "react";
import useScrollLock from "./useScrollLock";

const sessionKey = "azib-student-project-disclaimer-accepted";

export default function EntryDisclaimer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const enter = useRef<HTMLButtonElement>(null);
  useScrollLock(open);

  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(sessionKey) === "1") {
        setOpen(false);
        return;
      }
    } catch { /* Keep the disclaimer usable when storage is unavailable. */ }
    enter.current?.focus({ preventScroll: true });
  }, []);

  function accept() {
    try { sessionStorage.setItem(sessionKey, "1"); } catch { /* Dismiss for this visit. */ }
    setOpen(false);
  }

  return (
    <>
      <div style={{ display: "contents" }} {...(open ? { inert: "" } as Record<string, string> : {})} aria-hidden={open ? true : undefined}>{children}</div>
      {open && (
        <div className="entry-overlay">
          <section role="dialog" aria-modal="true" aria-labelledby="entry-title" aria-describedby="entry-description" className="entry-card"
            onKeyDown={event => {
              if (event.key === "Tab") {
                event.preventDefault();
                enter.current?.focus();
              }
            }}>
            <h1 id="entry-title">UNOFFICIAL STUDENT UI REDESIGN</h1>
            <div id="entry-description">
              <p>This website is an independent student UI/UX and frontend development project created solely for educational and portfolio purposes.</p>
              <p>It is an unofficial conceptual redesign and is not affiliated with, endorsed by, sponsored by, or operated by lululemon athletica inc. lululemon trademarks, product names, imagery, and other brand assets displayed remain the property of their respective owners.</p>
              <p><strong>This is not a functioning ecommerce website. No products are offered for sale, no purchases or payments can be made, and no commercial transactions take place through this website.</strong></p>
            </div>
            <button ref={enter} type="button" onClick={accept}>ENTER PROJECT →</button>
          </section>
        </div>
      )}
      <style jsx>{`
        .entry-overlay { position: fixed; inset: 0; z-index: 10000; display: grid; place-items: center; padding: 24px; background: rgba(23, 3, 6, .42); overscroll-behavior: contain; }
        .entry-card { width: 100%; max-width: 520px; max-height: calc(100dvh - 48px); overflow-y: auto; padding: 32px; border-radius: 24px; background: #fffffa; color: #170306; box-shadow: 0 16px 64px rgba(23,3,6,.16); }
        h1 { margin: 0 0 22px; font-size: 19px; font-weight: 600; line-height: 1.2; letter-spacing: .06em; }
        p { margin: 0 0 16px; font-size: 15px; line-height: 1.45; font-weight: 400; }
        strong { font-weight: 700; }
        button { width: 100%; margin-top: 8px; min-height: 46px; padding: 12px 16px; border: 1px solid #e3243b; border-radius: 8px; background: #e3243b; color: white; font: inherit; font-size: 12px; font-weight: 600; letter-spacing: .12em; cursor: pointer; }
        button:focus-visible { outline: 2px solid #e3243b; outline-offset: 4px; }
        @media (max-width: 639px) { .entry-overlay { padding: 18px; } .entry-card { padding: 24px; max-height: calc(100dvh - 36px); } h1 { font-size: 17px; } p { font-size: 14px; } }
      `}</style>
    </>
  );
}

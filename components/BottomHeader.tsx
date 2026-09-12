"use client";

import Image from "next/image";

const socialIcons = [
  { name: "X", path: "M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.9-9L1.7 2h6.5l4.5 6.8L18.9 2ZM17.8 20h1.7L7.2 4H5.4l12.4 16Z" },
  { name: "Pinterest", path: "M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.8.2-2.7l1.3-5.5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.5-.3 1.1.5 2 1.6 2 1.9 0 3.3-2 3.3-4.9 0-2.6-1.9-4.4-4.5-4.4-3.1 0-4.9 2.3-4.9 4.6 0 .9.4 1.9.8 2.4l.2.6-.3 1c0 .2-.2.3-.5.2-1.3-.6-2.1-2.4-2.1-4 0-3.3 2.4-6.3 7-6.3 3.7 0 6.6 2.7 6.6 6.2 0 3.7-2.4 6.7-5.6 6.7-1.1 0-2.2-.6-2.6-1.3l-.7 2.8c-.2 1-.9 2-1.3 2.8A10 10 0 1 0 12 2Z" },
  { name: "YouTube", path: "M23 7s-.2-1.7-1-2.4c-.9-.9-1.9-.9-2.4-1C16.3 3.4 12 3.4 12 3.4s-4.3 0-7.6.2c-.5.1-1.5.1-2.4 1C1.2 5.3 1 7 1 7s-.2 2-.2 4v2c0 2 .2 4 .2 4s.2 1.7 1 2.4c.9.9 2.1.9 2.7 1 1.9.2 7.3.2 7.3.2s4.3 0 7.6-.2c.5-.1 1.5-.1 2.4-1 .8-.7 1-2.4 1-2.4s.2-2 .2-4v-2c0-2-.2-4-.2-4ZM9.7 15.5v-7l6.6 3.5-6.6 3.5Z" },
  { name: "Facebook", path: "M14 22v-9h3l.5-3H14V8c0-.9.3-1.5 1.7-1.5h1.9V3.8a25 25 0 0 0-2.7-.2c-2.7 0-4.5 1.6-4.5 4.6V10H7.5v3h2.9v9H14Z" },
  { name: "Instagram", path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" },
  { name: "TikTok", path: "M16.7 2c.3 2.4 1.6 3.9 4 4.1v3.3a8 8 0 0 1-4-1.2v7.2a6.4 6.4 0 1 1-5.5-6.3v3.4a3.1 3.1 0 1 0 2.1 2.9V2h3.4Z" },
];

const navigation = [
  { title: "HELP", links: [
    "Track Order & Return", "Ordering & Payment", "Delivery", "Returns & Refunds",
    "Size Guide", "Gift Cards", "Our Products",
  ] },
  { title: "ABOUT US", links: [
    "Sustainability", "Our Careers", "Inclusion, Diversity, Equity & Action",
    "Strategic Sales", "Sweat Collective", "Investors", "Media", "Sitemap",
  ] },
];

export default function BottomHeader() {
  const restart = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return (
    <footer aria-label="Bottom header" className="bg-[#e3243b] text-white">
      <div aria-hidden="true" className="h-12 sm:h-16" style={{ background: "linear-gradient(to bottom, #fffffa 0%, #fceee9 18%, #f6c5c4 42%, #ec7782 70%, #e3243b 100%)" }} />
      <div className="mx-auto max-w-[1400px] px-7 sm:px-10 md:px-14 pt-4 pb-4 sm:pb-5">
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2" aria-label="lululemon">
            <Image src="/images/lululogo.png" alt="" width={100} height={100} className="h-7 w-7 sm:h-8 sm:w-8 object-contain" />
            <span className="text-[22px] sm:text-[26.4px] font-semibold leading-none tracking-[-0.04em]">lululemon</span>
          </div>
          <button type="button" onClick={restart} aria-label="Restart: scroll to top" className="footer-button min-h-8 border border-white px-3 sm:px-5 py-2 text-[9.9px] font-semibold tracking-[0.15em]">RESTART</button>
        </div>
        <nav aria-label="Footer navigation" className="grid grid-cols-1 md:grid-cols-3 items-start gap-7 lg:gap-8 mb-6 sm:mb-8">
          <div className="min-w-0">
            <h2 className="text-[13.2px] font-bold leading-[1.35] tracking-[0.14em]">CONTACT US</h2>
            <ul className="mt-3 space-y-1 text-[12.65px] font-normal leading-[1.35]">
              {["WhatsApp", "Live Chat"].map(label => (
                <li key={label}><a href="#" onClick={event => event.preventDefault()} className="footer-link inline-flex min-h-6 items-center">{label}</a></li>
              ))}
              <li className="py-1"><strong className="font-bold">Phone:</strong> +852 8009 06220 (Toll Free)</li>
              <li className="py-1 break-words"><strong className="font-bold">Email:</strong> gec@lululemon.com.hk</li>
            </ul>
            <div className="mt-3 text-[12.65px] font-normal leading-[1.35]">
              <p>Monday to Sunday &amp; Hong Kong SAR Public Holidays<br />(except Christmas Day, Boxing Day and the first three days of LNY)</p>
              <p className="mt-2">9AM - 6PM HKT</p>
            </div>
          </div>
          {navigation.map(group => (
            <div key={group.title} className="min-w-0">
              <h2 className="text-[13.2px] font-bold leading-[1.35] tracking-[0.14em]">{group.title}</h2>
              <ul className="mt-3 space-y-1">
                {group.links.map(label => (
                  <li key={label}>
                    <a href="#" onClick={event => event.preventDefault()} className="footer-link inline-flex min-h-6 items-center py-1 text-[12.65px] font-normal leading-[1.35]">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div aria-label="Social media" className="mx-auto flex max-w-[240px] items-center justify-between gap-3">
          {socialIcons.map(({ name, path }) => (
            <svg key={name} role="img" aria-label={name} viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="currentColor">
              <title>{name}</title>
              <path d={path} />
            </svg>
          ))}
        </div>
        <p className="mt-3 text-center text-[9.9px] sm:text-[11px] font-normal leading-[1.35] tracking-[0.02em]">
          © lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7
          <span className="block mt-1">// lululemon: reimagined by Azib 2026</span>
        </p>
        <div className="mx-auto mt-3 grid max-w-sm grid-cols-2 gap-2 sm:gap-3">
          {["PRIVACY POLICY", "TERMS OF USE"].map((label) => (
            <button key={label} type="button" className="footer-button border border-white px-2 sm:px-4 py-2 text-[9.9px] tracking-[0.1em]">
              {label}
            </button>
          ))}
        </div>
      </div>
      <style jsx>{`
        .footer-link, .footer-button { color: white; transition: opacity var(--motion-fast) var(--ease-standard); }
        .footer-link { text-decoration-color: transparent; text-underline-offset: 5px; }
        .footer-link:focus-visible, .footer-button:focus-visible { outline: 2px solid white; outline-offset: 4px; }
        @media (hover: hover) and (pointer: fine) {
          .footer-link:hover { text-decoration-line: underline; text-decoration-color: white; opacity: .8; }
          .footer-button:hover { opacity: .8; }
        }
      `}</style>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ProductCard from "./ProductCard";
import QuickAdd from "./QuickAdd";

const metalVentSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const productName = "Metal Vent Tech Relaxed-Fit Short-Sleeve Shirt";
const products = [
  { name: productName, colour: "Polo Pastel/Steel Blue", price: "RM358", image: "/images/products/LM3FG2S_074135_1.webp" },
  { name: productName, colour: "Raspberry Rave", price: "RM358", image: "/images/products/LM3FG2S_076925_1.webp" },
  { name: productName, colour: "Dusty Diamond", price: "RM358", image: "/images/products/LM3FG2S_077991_1.webp" },
  { name: productName, colour: "Cypress Forest/Deep Forest", price: "RM358", image: "/images/products/LM3FG2S_078013_1.webp" },
  { name: productName, colour: "Black", price: "RM358", image: "/images/products/LM3FIKS_4780_1.webp" },
  { name: productName, colour: "Sassy Sage/Deep Forest", price: "RM358", image: "/images/products/LM3FIKS_077823_1.webp" },
].map((product, index) => ({ ...product, id: `metal-vent-${String(index + 1).padStart(2, "0")}`, amount: 358, sizes: metalVentSizes }));

export default function MetalVentSection() {
  const [slide, setSlide] = useState(0);
  const [perPage, setPerPage] = useState(2);
  const pageCount = Math.ceil(products.length / perPage);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      const count = desktop.matches ? 4 : 2;
      setPerPage(count);
      setSlide((current) => Math.min(current, Math.ceil(products.length / count) - 1));
    };
    update();
    desktop.addEventListener("change", update);
    return () => desktop.removeEventListener("change", update);
  }, []);

  return (
    <section aria-label="Lewis Hamilton in Metal Vent Tech" className="bg-[#361502] text-[#FFE7C2]">
      <div className="bg-[#fffffa] px-7 sm:px-10 md:px-14 lg:px-20 pb-12 md:pb-16">
        <hr className="mx-auto max-w-7xl border-0 border-t border-[#170306]/20" />
      </div>
      <div className="relative w-full aspect-[2/3] lg:aspect-[3/4] overflow-hidden">
        <video autoPlay muted loop playsInline preload="metadata" className="block w-full h-full object-cover object-center lg:object-top" aria-label="Lewis Hamilton training campaign">
          <source src="/videos/lewis-hamilton.mp4" type="video/mp4" />
        </video>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%]" style={{ background: "linear-gradient(to bottom, rgba(54,21,2,0) 0%, rgba(54,21,2,0.2) 30%, rgba(54,21,2,0.6) 60%, rgba(54,21,2,0.9) 82%, #361502 100%)" }} />
        <h2 className="pointer-events-none absolute inset-x-0 top-[8%] bottom-[32%] flex flex-col justify-between px-7 sm:px-10 md:px-14 lg:px-20 text-[#FFE7C2] [text-shadow:0_1px_6px_rgba(54,21,2,0.45)]">
          <span>
            <span className="block text-[clamp(1.5rem,5vw,5rem)] font-bold leading-none tracking-[-0.03em]">LEWIS HAMILTON</span>
            <span className="mt-2 block text-[clamp(0.875rem,2.5vw,2.5rem)] leading-tight">in METAL VENT TECH?</span>
          </span>
          <span className="block text-[clamp(1.75rem,6vw,6rem)] font-bold leading-none tracking-[-0.03em]">UNSTOPPABLE.</span>
        </h2>
      </div>

      <div className="px-7 sm:px-10 md:px-14 lg:px-20 pt-6 md:pt-8 pb-24 md:pb-36">
        <div className="mx-auto max-w-7xl">
          <p className="max-w-2xl text-[15px] sm:text-[17px] md:text-[19px] font-normal leading-[1.5]">
            Seven-time world champion. Advocate. Adventurer. Actual knight...and our newest global Ambassador. Sir Lewis Hamilton doesn't let up for an instant—and neither does his gear.
          </p>
          <div className="mt-10 md:mt-14 mb-6 flex items-center justify-between gap-4">
            <h3 id="metal-vent-products" className="text-lg sm:text-xl font-semibold">Shop Metal Vent Tech</h3>
            <div className="flex gap-2">
              <button type="button" aria-label="Previous Metal Vent Tech products" onClick={() => setSlide(current => (current + pageCount - 1) % pageCount)} className="h-11 w-9 text-2xl transition-opacity hover:opacity-60">‹</button>
              <button type="button" aria-label="Next Metal Vent Tech products" onClick={() => setSlide(current => (current + 1) % pageCount)} className="h-11 w-9 text-2xl transition-opacity hover:opacity-60">›</button>
            </div>
          </div>
          <div role="region" aria-roledescription="carousel" aria-labelledby="metal-vent-products" className="mx-auto max-w-[960px] lg:max-w-[1400px] overflow-hidden">
            <div className="flex transition-transform duration-[var(--motion-panel)] ease-[var(--ease-emphasized)] motion-reduce:transition-none" style={{ transform: `translateX(-${slide * 100}%)` }}>
              {Array.from({ length: pageCount }, (_, page) => page).map((page) => (
                <div key={page} role="group" aria-roledescription="slide" aria-label={`${page + 1} of ${pageCount}`} aria-hidden={slide !== page} className="w-full shrink-0 grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 md:gap-x-10">
                  {products.slice(page * perPage, page * perPage + perPage).map((product, index) => {
                    const number = String(page * perPage + index + 1).padStart(2, "0");
                    return (
                      <ProductCard key={number} productId={`metal-vent-${number}`} className="min-w-0">
                        <div className="border border-[#FFE7C2] p-[3px]">
                          <div className="relative aspect-[5/6]">
                            <Image src={product.image} alt={`${product.name} — ${product.colour}`} fill unoptimized sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain" />
                          </div>
                        </div>
                        <h4 className="mt-4 text-sm sm:text-base md:text-lg font-semibold leading-snug">{product.name}</h4>
                        <p className="mt-1 text-xs sm:text-sm md:text-base font-normal text-[#FFE7C2]/70">{product.colour}</p>
                        <p className="mt-2 text-xs sm:text-sm md:text-base text-[#FFE7C2]/70">{product.price}</p>
                        <QuickAdd product={product} active={slide === page} dark />
                      </ProductCard>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <p aria-live="polite" className="sr-only">Product slide {slide + 1} of {pageCount}</p>
        </div>
      </div>
      <div aria-hidden="true" className="h-24 sm:h-32" style={{ background: "linear-gradient(to bottom, #361502 0%, #9b8a7e 50%, #fffffa 100%)" }} />
    </section>
  );
}

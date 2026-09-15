"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProductCard from "./ProductCard";
import QuickAdd from "./QuickAdd";
import type { PurchaseProduct } from "./CartContext";
export interface CampaignProduct extends PurchaseProduct { hoverImage?: string; originalPrice?: string; }
export default function CampaignProductCarousel({ products, title, id }: { products: CampaignProduct[]; title: string; id: string }) {
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
  }, [products.length]);

  return <>
          <div className="mt-10 md:mt-14 mb-6 flex items-center justify-between gap-4">
            <h3 id={id} className="text-[16.2px]/[28px] sm:text-[18px]/[28px] font-semibold">{title}</h3>
            <div className="flex gap-2">
              <button type="button" aria-label={`Previous ${title} products`} onClick={() => setSlide(current => (current + pageCount - 1) % pageCount)} className="h-11 w-9 text-[21.6px]/[32px] transition-opacity hover:opacity-60">‹</button>
              <button type="button" aria-label={`Next ${title} products`} onClick={() => setSlide(current => (current + 1) % pageCount)} className="h-11 w-9 text-[21.6px]/[32px] transition-opacity hover:opacity-60">›</button>
            </div>
          </div>
          <div role="region" aria-roledescription="carousel" aria-labelledby={id} className="mx-auto max-w-[960px] lg:max-w-[1400px] overflow-clip">
            <div className="flex transition-transform duration-[var(--motion-panel)] ease-[var(--ease-emphasized)] motion-reduce:transition-none" style={{ transform: `translateX(-${slide * 100}%)` }}>
              {Array.from({ length: pageCount }, (_, page) => page).map((page) => (
                <div key={page} role="group" aria-roledescription="slide" aria-label={`${page + 1} of ${pageCount}`} aria-hidden={slide !== page} className="w-full shrink-0 grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 md:gap-x-10">
                  {products.slice(page * perPage, page * perPage + perPage).map((product) => {
                    return (
                      <ProductCard key={product.id} productId={product.id} className="min-w-0">
                        <div className="border border-[#FFE7C2] p-[3px]">
                          <div className="product-photo relative aspect-[5/6]">
                            <Image src={product.image} alt={`${product.name} — ${product.colour}`} fill unoptimized sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain" />
                            {product.hoverImage && <Image src={product.hoverImage} alt="" aria-hidden="true" fill unoptimized sizes="(min-width: 1024px) 25vw, 50vw" className="alternate object-contain" />}
                          </div>
                        </div>
                        <h4 className="mt-4 text-[12.6px]/[20px] sm:text-[14.4px]/[24px] md:text-[16.2px]/[28px] font-semibold leading-snug">{product.name}</h4>
                        <p className="mt-1 text-[10.8px]/[16px] sm:text-[12.6px]/[20px] md:text-[14.4px]/[24px] font-normal text-[#FFE7C2]/70">{product.colour}</p>
                        <p className="mt-2 text-[10.8px]/[16px] sm:text-[12.6px]/[20px] md:text-[14.4px]/[24px] text-[#FFE7C2]/70">{product.originalPrice && <del className="mr-2 opacity-[0.55]">{product.originalPrice}</del>}{product.price}</p>
                        <QuickAdd product={product} active={slide === page} dark />
                      </ProductCard>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <p aria-live="polite" className="sr-only">Product slide {slide + 1} of {pageCount}</p>
    <style jsx>{`
      .product-photo :global(.alternate) { opacity: 0; transition: opacity var(--motion-panel) var(--ease-standard); }
      @media (hover: hover) and (pointer: fine) { .product-photo:hover :global(.alternate) { opacity: 1; } }
      @media (prefers-reduced-motion: reduce) { .product-photo :global(.alternate) { transition: none; } }
    `}</style>
  </>;
}

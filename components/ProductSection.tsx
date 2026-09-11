"use client";

import Image from "next/image";
import ProductCard from "./ProductCard";
import QuickAdd from "./QuickAdd";

const products = [
  { id: "cloud-bra", name: "Like a Cloud Bra B/C", price: "RM268", primary: "1.jpeg", secondary: "5.webp", sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
  { id: "align-jogger", name: "lululemon Align™ Ribbed-Waist Jogger", price: "RM598", primary: "2.webp", secondary: "6.webp", sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"] },
  { id: "flow-y-bra", name: "Flow Y Bra Light Support, A/B Cup", price: "RM228", primary: "3.jpeg", secondary: "7.webp", sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
  { id: "align-short", name: 'lululemon Align No Line™ High-Rise Short 6"', price: "from RM218", primary: "4.webp", secondary: "8.webp", sizes: ["0", "2", "4", "6", "8", "10", "12", "14"] },
];

function Product({ product }: { product: (typeof products)[number] }) {

  return (
    <ProductCard productId={product.id} aria-labelledby={`${product.id}-name`} className="min-w-0 text-left">
      <div className="product-frame border-[1px] border-[#170306] p-[3px]">
        <div className="relative aspect-[5/6]">
          <div className="product-primary absolute inset-0">
            <Image src={`/images/products/${product.primary}`} alt={product.name} fill sizes="(min-width: 1560px) 320px, (min-width: 1024px) calc((100vw - 256px) / 4), 42vw" className="object-contain" />
          </div>
          <div className="product-secondary absolute inset-0" aria-hidden="true">
            <Image src={`/images/products/${product.secondary}`} alt="" fill sizes="(min-width: 1560px) 320px, (min-width: 1024px) calc((100vw - 256px) / 4), 42vw" className="object-contain" />
          </div>
        </div>
      </div>

      <h3 id={`${product.id}-name`} className="mt-4 text-sm sm:text-base md:text-lg font-semibold leading-snug sm:min-h-[2.75em]">{product.name}</h3>
      <p className="mt-2 text-xs sm:text-sm md:text-base text-[#170306]/70">{product.price}</p>
      <QuickAdd product={{ ...product, image: `/images/products/${product.primary}`, amount: Number(product.price.replace(/[^0-9.]/g, "")) }} />
      <style jsx>{`
        .product-primary, .product-secondary { transition: opacity 280ms ease; }
        .product-primary { opacity: 1; }
        .product-secondary { opacity: 0; }
        @media (hover: hover) and (pointer: fine) {
          .product-frame:hover .product-primary { opacity: 0; }
          .product-frame:hover .product-secondary { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .product-primary, .product-secondary { transition: none; }
        }
      `}</style>
    </ProductCard>
  );
}

export default function ProductSection() {
  return (
    <section aria-labelledby="new-arrivals-title" className="px-7 sm:px-10 md:px-14 lg:px-20 pb-24 md:pb-36 bg-[#fffffa] text-[#170306]">
      <div className="mx-auto max-w-[1400px]">
        <hr className="border-0 border-t border-[#170306]/20" />
        <h2 id="new-arrivals-title" className="pt-10 md:pt-14 mb-8 md:mb-12 text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.12em] text-left">WOMEN’S NEW ARRIVALS</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 md:gap-x-10 lg:gap-x-8 gap-y-8 md:gap-y-12 items-start">
          {products.map((product) => <Product key={product.id} product={product} />)}
        </div>
        <div className="mt-10 md:mt-12">
          <button type="button" className="inline-flex items-center gap-6 border border-[#170306]/60 px-5 sm:px-7 py-4 text-xs font-semibold tracking-[0.2em] transition-colors hover:bg-[#170306] hover:text-[#fffffa]">
            EXPLORE NEW ARRIVALS <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

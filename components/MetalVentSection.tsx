"use client";

import CampaignProductCarousel from "./CampaignProductCarousel";
import { licenseProducts } from "./licenseProducts";
import styles from "./MetalVentSection.module.css";

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

  return (
    <section aria-label="Lewis Hamilton in Metal Vent Tech" className={styles.section}>
      <div className="bg-[#fffffa] px-7 sm:px-10 md:px-14 lg:px-20 pb-12 md:pb-16">
        <hr className="mx-auto max-w-7xl border-0 border-t border-[#170306]/20" />
      </div>
      <div className="relative w-full aspect-[2/3] lg:aspect-[5/3] overflow-hidden">
        <video autoPlay muted loop playsInline preload="metadata" className="block w-full h-full object-cover object-center lg:object-top" aria-label="Lewis Hamilton training campaign">
          <source src="/videos/lewis-hamilton.mov" />
        </video>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%]" style={{ background: "linear-gradient(to bottom, rgba(36,15,0,0) 0%, rgba(36,15,0,0.2) 30%, rgba(36,15,0,0.6) 60%, rgba(36,15,0,0.9) 82%, #240f00 100%)" }} />
        <h2 className="pointer-events-none absolute inset-x-0 top-[8%] bottom-[8%] lg:bottom-[3%] flex flex-col justify-between px-7 sm:px-10 md:px-14 lg:px-20 text-[#FFE7C2] [text-shadow:0_1px_6px_rgba(54,21,2,0.45)]">
          <span>
            <span className="block text-[clamp(1.5525rem,5.175vw,5.175rem)] lg:text-[clamp(1.35rem,4.5vw,4.5rem)] font-bold leading-none tracking-[-0.03em]">LEWIS HAMILTON</span>
            <span className="mt-2 block text-[clamp(0.905625rem,2.5875vw,2.5875rem)] lg:text-[clamp(0.7875rem,2.25vw,2.25rem)] leading-tight">in METAL VENT TECH?</span>
          </span>
          <span className="block text-[clamp(1.81125rem,6.21vw,6.21rem)] lg:text-[clamp(1.575rem,5.4vw,5.4rem)] font-bold leading-none tracking-[-0.03em]">UNSTOPPABLE.</span>
        </h2>
      </div>

      <div className="px-7 sm:px-10 md:px-14 lg:px-20 pt-6 md:pt-8 pb-24 md:pb-36">
        <div className="mx-auto max-w-7xl">
          <p className="max-w-2xl text-[13.5px] sm:text-[15.3px] md:text-[17.1px] font-normal leading-[1.5]">
            Seven-time world champion. Advocate. Adventurer. Actual knight...and our newest global Ambassador. Sir Lewis Hamilton doesn't let up for an instant—and neither does his gear.
          </p>
          <CampaignProductCarousel products={products} title="Shop Metal Vent Tech" id="metal-vent-products" />
          <CampaignProductCarousel products={licenseProducts} title="Shop License to Train" id="license-to-train-products" />
        </div>
      </div>
      <div aria-hidden="true" className="h-24 sm:h-32" style={{ background: "linear-gradient(to bottom, #361502 0%, #9b8a7e 50%, #fffffa 100%)" }} />
    </section>
  );
}

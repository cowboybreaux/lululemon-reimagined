import BottomHeader from "@/components/BottomHeader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import MetalVentSection from "@/components/MetalVentSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#fffffa]">
      <Header />
      <Hero />
      <ProductSection />
      <MetalVentSection />
      <BottomHeader />
    </main>
  );
}
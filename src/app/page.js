"use client";
import SceneTracker from "@/components/common/SenceTracker";
import ConnectWithUs from "@/components/home/ConnectWithUs";
import Hero from "@/components/home/Hero";
import OurCraft from "@/components/home/OurCraft";
import Footer from "@/components/layout/Footer";


export default function Home() {
  return (
    <div>
      <section className="relative isolate z-10">
        <Hero />
     </section>

    <section className="relative isolate z-10">
      <SceneTracker />
    </section>
      
      <OurCraft />

        <section className="relative isolate z-10">
        <ConnectWithUs />
     </section>
      
      <Footer />
    </div>
  );
}



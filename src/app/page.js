"use client";
import SceneTracker from "@/components/common/SenceTracker";
import AboutUs from "@/components/home/AboutUs";
import ConnectWithUs from "@/components/home/ConnectWithUs";
import Hero from "@/components/home/Hero";
import OurCraft from "@/components/home/OurCraft";
import ServicesExperience from "@/components/home/ServicesExperience";
import WatchShowReel from "@/components/home/WatchShowReel";


export default function Home() {
  return (
    <div>
      {/* <Hero /> */}
     
      {/* <div className=" h-screen" ></div> */}
      <OurCraft />
      <ConnectWithUs />
      {/* <SceneTracker /> */}
      {/* <WatchShowReel /> */}
      {/* <ServicesExperience /> */}
    </div>
  );
}

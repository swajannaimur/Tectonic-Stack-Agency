import SceneTracker from "@/components/common/SenceTracker";
import AboutUs from "@/components/home/AboutUs";
import Hero from "@/components/home/Hero";
import ServicesExperience from "@/components/home/ServicesExperience";


export default function Home() {
  return (
    <div>
      <Hero />
      {/* <div className=" h-screen" ></div> */}
      <SceneTracker />
      <ServicesExperience />
      <AboutUs />
    </div>
  );
}

"use client";
import React, { useState, useMemo } from 'react';
import ViewAllButton from '../common/ViewAllButton';
import TitleHoverEffect from '../common/TitleHoverEffect';
import CategoryTabs from '../common/CategoryTabs';

const projectsData = [
  { id: 1, title: "Tower Garage Doors", categories: ["UI/UX", "DEVELOPMENT", "3D"], image: "/images/our-craft/Home.png (1).png" },
  { id: 2, title: "Uptown", categories: ["UI/UX", "DEVELOPMENT"], image: "/images/our-craft/hero-section.png.png" },
  { id: 3, title: "3D Showroom", categories: ["UI/UX", "DEVELOPMENT", "3D"], image: "/images/our-craft/image_2025-12-16_150442306-scaled.png.png" },
  { id: 4, title: "Cirus", categories: ["UI/UX", "DEVELOPMENT", "3D"], image: "/images/our-craft/Home.png.png" },
  { id: 5, title: "FLIGHT PATH", categories: ["UI/UX", "DEVELOPMENT", "3D"], image: "/images/our-craft/project-1.webp" },
];

const OurCraft = () => {
  const [activeTab, setActiveTab] = useState("ALL");

  const allCategories = useMemo(() => {
    return ["ALL", ...new Set(projectsData.flatMap(p => p.categories))];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeTab === "ALL") return projectsData;
    return projectsData.filter(p => p.categories.includes(activeTab));
  }, [activeTab]);

  return (
    <section className="bg-black text-white py-20 px-10 relative z-10 isolate min-h-screen">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-5xl font-medium leading-tight">Our Craft,<br/> Your Expression.</h2>
       <div>
         <ViewAllButton 
  projectCount={filteredProjects.length} 
  onClick={() => {
    console.log("View all clicked");
  }} 
  btnText="View All"
/>
       </div>
      </div>

      <CategoryTabs 
        categories={allCategories} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
        {filteredProjects.slice(0, 4).map((project) => (
          <div key={project.id} className="group cursor-pointer">
            <div className="rounded-[2.5rem] overflow-hidden aspect-[16/10] bg-[#111]">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
            </div>
            <div className="mt-6 px-2">
              <p className="text-gray-500 text-[10px] tracking-widest uppercase mb-2">{project.categories.join(" / ")}</p>
              {/* <h3 className="text-3xl font-light">{project.title}</h3> */}
              <TitleHoverEffect title={project.title} />
            </div>
          </div>
        ))}
      </div>
<ViewAllButton 
  projectCount={filteredProjects.length} 
  onClick={() => {
    console.log("View all clicked");
  }} 
  buttonText="View All Projects"
/>
    </section>
  );
};

export default OurCraft;
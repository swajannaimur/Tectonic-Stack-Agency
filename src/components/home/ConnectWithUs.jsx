"use client";
import { useState } from "react";
import { ArrowIcon, FacebookIcon, InstagramIcon, LinkedinIcon, MailIcon, TikTokIcon, XIcon, YoutubeIcon } from "../icons";

const INTERESTS = ["UI/UX", "Development", "Branding", "3D Animation"];
const socials = [
  { icon: <TikTokIcon /> }, { icon: <InstagramIcon /> }, { icon: <XIcon /> },
  { icon: <FacebookIcon /> }, { icon: <YoutubeIcon /> }, { icon: <LinkedinIcon /> },
];

export default function ConnectWithUs() {
  const [selected, setSelected] = useState(["UI/UX"]);
  const [form, setForm] = useState({ fullName: "", company: "", email: "", phone: "", message: "" });

  const toggleInterest = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const SocialLinks = ({ className }) => (
    <div className={`flex gap-3 flex-wrap ${className}`}>
      {socials.map((s, i) => (
        <button
          key={i}
          className="w-10 h-10 rounded-full border border-[#0f0c08]/10 flex items-center justify-center hover:bg-white hover:border-transparent hover:shadow-md transition-all duration-300 text-[#0f0c08]"
        >
          {s.icon}
        </button>
      ))}
    </div>
  );

  return (
    <section className="w-full py-12 md:py-24 px-4 sm:px-10 bg-gray-100">
      <div className=" w-full mx-auto grid grid-cols-1 md:grid-cols-[42%_58%] min-h-[650px] bg-[#ffffff40] rounded-[40px] overflow-hidden font-['DM_Sans',sans-serif] shadow-sm">
        
        <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-between ">
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-8 md:mb-12">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e07020] animate-pulse" />
              <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#c85f10]">
                Connect with us!
              </span>
            </div>

            <h2 className="text-[34px] sm:text-[42px] md:text-[48px] font-semibold leading-[1.1] text-[#0f0c08] tracking-tighter">
              Turn Your Vision Into<br className="hidden sm:block" />
              an Experience That<br className="hidden sm:block" />
              Lasts
            </h2>

            <div className="w-14 h-[2px] bg-[#0f0c08]/15 my-10" />

            <a 
              href="mailto:hello@mdx.so" 
              className="inline-flex items-center gap-3 text-[15px] font-medium text-[#0f0c08]/80 hover:text-[#0f0c08] transition-all group"
            >
              <div className="p-2.5 rounded-full bg-white/40 group-hover:bg-white transition-colors">
                <MailIcon />
              </div>
              <span className="underline underline-offset-4 decoration-[#0f0c08]/20">hello@mdx.so</span>
            </a>
          </div>

          {/* Desktop Only Social Icons */}
          <SocialLinks className="hidden md:flex mt-12" />
        </div>

        <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center ">
          <h3 className="text-[32px] sm:text-[40px] font-normal text-[#0f0c08] mb-12 tracking-tight">
            Let's talk
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
            {[
              { id: "fullName", placeholder: "Full name", type: "text" },
              { id: "company", placeholder: "Company", type: "text" },
              { id: "email", placeholder: "Email", type: "email" },
              { id: "phone", placeholder: "Phone", type: "tel" },
            ].map((field) => (
              <div key={field.id} className="relative">
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.id]}
                  onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                  className="w-full bg-transparent border-b border-[#0f0c08]/15 py-2.5 text-[15px] text-[#0f0c08] outline-none transition-all focus:border-[#0f0c08] placeholder:text-[#0f0c08]/30"
                />
              </div>
            ))}
          </div>

          <div className="mt-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#0f0c08]/40 mb-5">
              I'm Interested in
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              {INTERESTS.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleInterest(item)}
                  className={`px-6 py-2.5 rounded-full border text-[13px] font-medium transition-all duration-300 ${
                    selected.includes(item)
                      ? "bg-[#111109] border-[#111109] text-white shadow-lg shadow-black/10"
                      : "border-[#0f0c08]/10 text-[#0f0c08] hover:border-[#0f0c08]/30 hover:bg-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <textarea
              placeholder="Tell us more about your project!"
              rows="3"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-transparent border-b border-[#0f0c08]/15 py-2.5 text-[15px] text-[#0f0c08] outline-none transition-all focus:border-[#0f0c08] placeholder:text-[#0f0c08]/30 resize-none min-h-[90px]"
            />
          </div>

          <button className="group relative w-full py-5 bg-[#111109] text-white rounded-full text-[12px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-4 transition-all hover:bg-black active:scale-[0.98] shadow-lg shadow-black/5">
            SEND MESSAGE
            <span className="transition-transform group-hover:translate-x-2">
              <ArrowIcon />
            </span>
          </button>

          <SocialLinks className="flex md:hidden mt-14 justify-center border-t border-[#0f0c08]/5 pt-8" />
        </div>
      </div>
    </section>
  );
}
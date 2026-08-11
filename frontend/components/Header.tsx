"use client";
import { useState } from "react";

const topLinks = [
  { label: "About", href: "https://www.iitkgp.ac.in/about-iitkgp" },
  { label: "Administration", href: "https://www.iitkgp.ac.in/navpage/administration" },
  { label: "Students", href: "https://www.iitkgp.ac.in/navpage/student", active: true },
  { label: "Faculty and Staff", href: "https://www.iitkgp.ac.in/faculty-why-joining-iitkgp" },
  { label: "Visitors", href: "https://www.iitkgp.ac.in/how-to-reach" },
  { label: "Outreach and Alumni Affairs", href: "https://www.iitkgp.ac.in/navpage/outreach" },
  { label: "Platinum Jubilee", href: "https://www.iitkgp.ac.in/pj", pill: true },
  { label: "Jobs", href: "https://www.iitkgp.ac.in/navpage/jobs" },
];

const mainLinks = [
  { label: "Academics", href: "https://www.iitkgp.ac.in/navpage/academics" },
  { label: "Admissions", href: "https://www.iitkgp.ac.in/navpage/admissions" },
  { label: "Research", href: "https://www.iitkgp.ac.in/navpage/research" },
  { label: "Industry", href: "https://www.iitkgp.ac.in/navpage/industry" },
];

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/IITKgp", icon: "fa-facebook-f" },
  { label: "Twitter", href: "https://twitter.com/IITKgp", icon: "fa-x-twitter" },
  { label: "LinkedIn", href: "https://www.linkedin.com/school/indian-institute-of-technology-kharagpur", icon: "fa-linkedin-in" },
  { label: "Instagram", href: "https://www.instagram.com/iit.kgp", icon: "fa-instagram" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCQCLWAILNrEVemERg4ybAYQ", icon: "fa-youtube" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top utility strip */}
      <div className="bg-[#FF7F00] text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between h-11">
            {/* Desktop utility nav */}
            <nav className="hidden lg:flex items-center gap-1 text-[13px] font-inter font-medium">
              <a
                href="https://www.iitkgp.ac.in/home"
                title="Home"
                className="px-2 py-1.5 rounded hover:bg-white/15 transition-colors no-underline text-white"
              >
                <i className="fas fa-house text-[15px]" />
              </a>
              {topLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className={`px-2.5 py-1.5 rounded transition-colors no-underline whitespace-nowrap ${
                    l.pill
                      ? "bg-white/20 hover:bg-white/30 text-white font-semibold"
                      : l.active
                      ? "bg-white text-[#FF7F00] font-semibold"
                      : "text-white/95 hover:bg-white/15"
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Mobile: brand text */}
            <span className="lg:hidden font-lexend font-semibold text-sm tracking-wide">
              Student Portal
            </span>

            {/* Right controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="hidden sm:flex items-center gap-2 pr-1 mr-1 border-r border-white/25">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    aria-label={s.label}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white text-[13px] no-underline"
                  >
                    <i className={`fab ${s.icon}`} />
                  </a>
                ))}
              </div>

              <div className="relative flex items-center text-white text-[13px] font-medium">
                <i className="fas fa-globe mr-1.5 text-[12px] opacity-90" />
                <select
                  title="Change Language"
                  aria-label="Change Language"
                  className="bg-transparent text-white text-[13px] font-medium pr-4 outline-none cursor-pointer appearance-none"
                >
                  <option className="text-gray-900" value="en">English</option>
                  <option className="text-gray-900" value="hi">हिन्दी</option>
                </select>
                <i className="fas fa-chevron-down text-[9px] -ml-3 pointer-events-none opacity-90" />
              </div>

              <button
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
                title="Search"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#FF7F00] hover:bg-white/90 transition-colors ml-1"
              >
                <i className="fas fa-magnifying-glass text-[13px]" />
              </button>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menu"
                title="Menu"
                className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors ml-0.5"
              >
                <i className={`fas ${mobileOpen ? "fa-xmark" : "fa-bars"} text-[16px]`} />
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-3 pt-1">
              <div className="flex items-center bg-white rounded-full overflow-hidden shadow-sm">
                <input
                  type="search"
                  placeholder="Search IIT Kharagpur…"
                  className="flex-1 px-4 py-2 text-sm text-gray-800 outline-none font-inter"
                  autoFocus
                />
                <button className="px-4 py-2 text-[#FF7F00]" aria-label="Submit search">
                  <i className="fas fa-magnifying-glass" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logo + main nav row */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between gap-4 py-3">
            <a href="https://www.iitkgp.ac.in/" className="shrink-0" title="IIT Kharagpur">
              <img
                src="https://www.iitkgp.ac.in/assets/pages/images/logo.png"
                alt="Indian Institute of Technology Kharagpur"
                className="h-11 sm:h-12 w-auto"
              />
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              {mainLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="px-4 py-2 rounded-lg text-[15px] font-lexend font-medium text-gray-700 hover:text-[#FF7F00] hover:bg-orange-50 transition-colors no-underline"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3 shrink-0">
              <a href="https://www.iitkgp.ac.in/abhijnana" title="Abhijnana">
                <img
                  src="https://www.iitkgp.ac.in//assets/pages/images/abhijnana-logo.png"
                  alt="Abhijnana"
                  className="h-9 w-auto"
                />
              </a>
              <a href="https://www.iitkgp.ac.in/pj" title="Platinum Jubilee">
                <img
                  src="https://www.iitkgp.ac.in/assets/pages/images/logopj.jpg"
                  alt="Platinum Jubilee"
                  className="h-9 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg max-h-[70vh] overflow-y-auto">
          <nav className="mx-auto max-w-7xl px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FF7F00] mb-1 mt-1">Explore</p>
            {mainLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block py-2.5 px-2 rounded-lg text-[15px] font-lexend font-medium text-gray-800 hover:bg-orange-50 no-underline"
              >
                {l.label}
              </a>
            ))}
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FF7F00] mb-1 mt-3">Quick Links</p>
            <a href="https://www.iitkgp.ac.in/home" className="block py-2.5 px-2 rounded-lg text-[15px] text-gray-700 hover:bg-orange-50 no-underline font-inter">Home</a>
            {topLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`block py-2.5 px-2 rounded-lg text-[15px] hover:bg-orange-50 no-underline font-inter ${
                  l.active ? "text-[#FF7F00] font-semibold" : "text-gray-700"
                }`}
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-4 pb-2 px-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-50 text-[#FF7F00] no-underline"
                >
                  <i className={`fab ${s.icon}`} />
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

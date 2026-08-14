"use client";
import { useState } from "react";

const topNavLinks = [
  { label: "About", href: "https://www.iitkgp.ac.in/about-iitkgp" },
  { label: "Administration", href: "https://www.iitkgp.ac.in/navpage/administration" },
  { label: "Students", href: "https://www.iitkgp.ac.in/navpage/student", isStudentsPill: true },
  { label: "Faculty and Staff", href: "https://www.iitkgp.ac.in/faculty-why-joining-iitkgp" },
  { label: "Visitors", href: "https://www.iitkgp.ac.in/how-to-reach" },
  { label: "Outreach and Alumni Affairs", href: "https://www.iitkgp.ac.in/navpage/outreach" },
  { label: "Platinum Jubilee", href: "https://www.iitkgp.ac.in/pj", isPjPill: true },
  { label: "Jobs", href: "https://www.iitkgp.ac.in/navpage/jobs" },
];

const mainNavLinks = [
  { label: "Academics", href: "https://www.iitkgp.ac.in/navpage/academics" },
  { label: "Admissions", href: "https://www.iitkgp.ac.in/navpage/admissions" },
  { label: "Research", href: "https://www.iitkgp.ac.in/navpage/research" },
  { label: "Industry", href: "https://www.iitkgp.ac.in/navpage/industry" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-md bg-white">
      {/* Top utility strip matching exact dark orange color #d9531e */}
      <div className="bg-[#d9531e] text-white">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-[52px] py-1.5">
            {/* Desktop utility nav */}
            <nav className="hidden xl:flex items-center gap-4 text-sm sm:text-[15px] font-sans font-medium">
              <a
                href="https://www.iitkgp.ac.in/home"
                title="Home"
                className="text-white hover:opacity-85 transition-opacity no-underline flex items-center px-1.5"
              >
                <i className="fas fa-house text-lg" />
              </a>

              {topNavLinks.map((l) => {
                if (l.isStudentsPill) {
                  return (
                    <a
                      key={l.label}
                      href={l.href}
                      className="bg-white text-[#d9531e] font-bold text-sm sm:text-[15px] px-4 py-1.5 rounded-full border-2 border-yellow-400 no-underline shadow-sm hover:bg-yellow-50 transition-colors"
                    >
                      {l.label}
                    </a>
                  );
                }
                if (l.isPjPill) {
                  return (
                    <a
                      key={l.label}
                      href={l.href}
                      className="bg-[#ffeb3b] text-[#d9531e] font-bold text-sm sm:text-[15px] px-4 py-1.5 rounded-full border border-yellow-300 no-underline shadow-sm hover:bg-yellow-300 transition-colors"
                    >
                      {l.label}
                    </a>
                  );
                }
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-white hover:opacity-85 transition-opacity no-underline whitespace-nowrap"
                  >
                    {l.label}
                  </a>
                );
              })}
            </nav>

            {/* Mobile: brand text */}
            <span className="xl:hidden font-lexend font-bold text-base text-white tracking-wide">
              IIT Kharagpur Student Portal
            </span>

            {/* Right side controls */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <div className="hidden sm:flex items-center gap-3 text-sm sm:text-[15px] font-medium text-white">
                <button
                  type="button"
                  className="hover:opacity-85 transition-opacity flex items-center gap-1.5 bg-transparent border-0 text-white cursor-pointer"
                >
                  Social <i className="fas fa-chevron-down text-xs" />
                </button>
                <span className="h-5 w-px bg-white/40" />
                <button
                  type="button"
                  className="hover:opacity-85 transition-opacity flex items-center gap-1.5 bg-transparent border-0 text-white cursor-pointer"
                >
                  English <i className="fas fa-chevron-down text-xs" />
                </button>
                <span className="h-5 w-px bg-white/40" />
              </div>

              {/* Search circular button */}
              <button
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
                title="Search"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#d9531e] flex items-center justify-center text-base shadow-xs hover:bg-gray-100 transition-colors border-0 cursor-pointer"
              >
                <i className="fas fa-magnifying-glass" />
              </button>

              {/* Scroll down square button */}
              <button
                onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                aria-label="Scroll down"
                title="Scroll down"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded bg-white text-gray-800 flex items-center justify-center text-base shadow-xs hover:bg-gray-100 transition-colors border-0 cursor-pointer"
              >
                <i className="fas fa-arrow-down" />
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menu"
                title="Menu"
                className="xl:hidden w-9 h-9 flex items-center justify-center rounded bg-white/20 text-white hover:bg-white/30 transition-colors border-0 cursor-pointer"
              >
                <i className={`fas ${mobileOpen ? "fa-xmark" : "fa-bars"} text-lg`} />
              </button>
            </div>
          </div>

          {/* Search bar expandable */}
          {searchOpen && (
            <div className="pb-3.5 pt-1.5">
              <div className="flex items-center bg-white rounded-full overflow-hidden shadow-md max-w-xl mx-auto border border-orange-200">
                <input
                  type="search"
                  placeholder="Search IIT Kharagpur…"
                  className="flex-1 px-4 py-2.5 text-base text-gray-800 outline-none font-sans"
                  autoFocus
                />
                <button className="px-4 py-2.5 text-[#d9531e] hover:text-[#b34015] border-0 bg-transparent cursor-pointer text-base" aria-label="Submit search">
                  <i className="fas fa-magnifying-glass" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main logo & nav row */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 py-4 sm:py-5">
            {/* Left: Official Crest & Multilingual Name Logo */}
            <a href="https://www.iitkgp.ac.in/" className="shrink-0" title="IIT Kharagpur">
              <img
                src="https://www.iitkgp.ac.in/assets/pages/images/logo.png"
                alt="Indian Institute of Technology Kharagpur"
                className="h-16 sm:h-20 lg:h-22 w-auto object-contain"
              />
            </a>

            {/* Middle Nav Links: Academics, Admissions, Research, Industry */}
            <nav className="hidden lg:flex items-center gap-10 lg:gap-14">
              {mainNavLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-[#337ab7] font-bold text-xl lg:text-2xl hover:text-[#23527c] transition-colors no-underline font-sans tracking-wide"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Right: Abhijnana & Platinum Jubilee Logos */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              <a href="https://www.iitkgp.ac.in/abhijnana" title="Abhijnana" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://www.iitkgp.ac.in/assets/pages/images/abhijnana-logo.png"
                  alt="Abhijnana Newsletter"
                  className="h-13 sm:h-15 lg:h-16 w-auto object-contain"
                />
              </a>
              <a href="https://www.iitkgp.ac.in/pj" title="Platinum Jubilee" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://www.iitkgp.ac.in/assets/pages/images/logopj.jpg"
                  alt="Platinum Jubilee"
                  className="h-13 sm:h-15 lg:h-16 w-auto object-contain rounded"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 shadow-xl max-h-[75vh] overflow-y-auto">
          <nav className="mx-auto max-w-[1536px] px-4 py-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[#d9531e] mb-2 mt-1 font-sans">Main Navigation</p>
            {mainNavLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block py-3 px-3.5 rounded-lg text-lg font-bold text-[#337ab7] hover:bg-orange-50 no-underline"
              >
                {l.label}
              </a>
            ))}
            <p className="text-xs font-bold uppercase tracking-wider text-[#d9531e] mb-2 mt-4 font-sans">Quick Links</p>
            <a href="https://www.iitkgp.ac.in/home" className="block py-2.5 px-3.5 rounded-lg text-base text-gray-800 hover:bg-orange-50 no-underline font-sans">Home</a>
            {topNavLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block py-2.5 px-3.5 rounded-lg text-base text-gray-800 hover:bg-orange-50 no-underline font-sans"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

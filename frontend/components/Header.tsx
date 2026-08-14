"use client";

import { useState, useEffect } from "react";

const topNavLinks = [
  { label: "About", href: "https://www.iitkgp.ac.in/about-iitkgp" },
  { label: "Administration", href: "https://www.iitkgp.ac.in/navpage/administration" },
  { label: "Students", href: "https://students.iitkgp.ac.in", isPill: true },
  { label: "Faculty and Staff", href: "https://www.iitkgp.ac.in/faculty-why-joining-iitkgp" },
  { label: "Visitors", href: "https://www.iitkgp.ac.in/how-to-reach" },
  { label: "Outreach and Alumni Affairs", href: "https://www.iitkgp.ac.in/navpage/outreach" },
  { label: "Platinum Jubilee", href: "https://www.iitkgp.ac.in/pj", isPill: true },
  { label: "Jobs", href: "https://www.iitkgp.ac.in/navpage/jobs" },
];

const mainNavLinks = [
  { label: "Academics", href: "https://www.iitkgp.ac.in/navpage/academics" },
  { label: "Admissions", href: "https://www.iitkgp.ac.in/navpage/admissions" },
  { label: "Research", href: "https://www.iitkgp.ac.in/navpage/research" },
  { label: "Industry", href: "https://www.iitkgp.ac.in/navpage/industry" },
];

const socialLinks = [
  { name: "Facebook", icon: "fab fa-facebook-square", href: "https://www.facebook.com/IITKgp" },
  { name: "Twitter", icon: "fab fa-twitter-square", href: "https://twitter.com/IITKgp" },
  { name: "LinkedIn", icon: "fab fa-linkedin", href: "https://www.linkedin.com/school/indian-institute-of-technology-kharagpur" },
  { name: "Instagram", icon: "fab fa-instagram-square", href: "https://www.instagram.com/iit.kgp" },
  { name: "YouTube", icon: "fab fa-youtube-square", href: "https://www.youtube.com/channel/UCQCLWAILNrEVemERg4ybAYQ" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 shadow-sm bg-white font-public-sans">
      {/* 1. Header Top Strip (.header-top-strip .orange-bg) */}
      <div className="bg-[#db5903] text-white py-[6px] border-b border-white/20 xl:border-b-0">
        <div className="mx-auto max-w-[1320px] px-3 sm:px-4">
          <div className="flex items-center justify-between min-h-[44px]">
            {/* Desktop Left: Top navigation list (.primary-menu-links) (>= xl) */}
            <nav className="hidden xl:flex items-center space-x-0 list-none m-0 p-0">
              {/* Home Icon */}
              <a
                href="https://www.iitkgp.ac.in/home"
                title="Home"
                className="text-white hover:opacity-90 no-underline px-[9px] py-[10px] flex items-center cursor-pointer group relative shrink-0"
              >
                <i className="fas fa-home text-[22px] leading-none" />
              </a>

              {topNavLinks.map((link) => {
                if (link.isPill) {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className="mx-[5px] inline-block px-[12px] py-[4px] text-[13.5px] font-semibold rounded-[999px] bg-[#FDF781] text-[#FF000C] no-underline transition-all duration-200 hover:bg-[#1B1B5C] hover:text-white hover:-translate-y-[1px] hover:shadow-md leading-[1] align-middle shrink-0"
                    >
                      {link.label}
                    </a>
                  );
                }
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    title={link.label}
                    className="relative text-white hover:opacity-100 transition-all px-[9px] py-[10px] text-[15px] font-medium no-underline whitespace-nowrap cursor-pointer group shrink-0"
                  >
                    {link.label}
                    <span className="absolute bottom-[7px] left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
                  </a>
                );
              })}
            </nav>

            {/* Mobile Left: Language Select & Search Icon (< xl) */}
            <div className="xl:hidden flex items-center gap-3">
              {/* Language Select */}
              <div className="relative flex items-center">
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="bg-transparent text-white border-0 text-[15px] font-medium focus:outline-none cursor-pointer py-1 pr-4 appearance-none outline-none"
                  aria-label="Change Language"
                >
                  <option value="en" className="text-gray-900 bg-white">
                    English
                  </option>
                  <option value="hi" className="text-gray-900 bg-white">
                    हिन्दी
                  </option>
                </select>
                <i className="fas fa-chevron-down text-[11px] text-white absolute right-0 pointer-events-none" />
              </div>

              {/* Circular Search Button -> Links to iitkgp.ac.in */}
              <a
                href="https://www.iitkgp.ac.in"
                title="Search"
                aria-label="Search IIT Kharagpur"
                className="w-[34px] h-[34px] aspect-square rounded-full bg-white text-[#db5903] flex items-center justify-center border-0 cursor-pointer hover:bg-gray-100 transition-colors shrink-0 shadow-sm no-underline"
              >
                <svg
                  className="w-4 h-4 text-[#db5903]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </a>
            </div>

            {/* Desktop Right Controls (>= xl) */}
            <div className="hidden xl:flex items-center">
              <ul className="flex items-center m-0 p-0 list-none text-white">
                {/* Social Dropdown Toggle */}
                <li className="relative flex items-center">
                  <button
                    type="button"
                    onClick={() => setSocialOpen((v) => !v)}
                    className="hover:opacity-90 flex items-center gap-1 bg-transparent border-0 text-white cursor-pointer text-[15px] font-medium capitalize px-[9px] py-[10px] outline-none"
                  >
                    social <i className="fas fa-chevron-down text-[11px] ml-0.5" />
                  </button>

                  {socialOpen && (
                    <div className="absolute right-0 top-full mt-1 w-[160px] bg-white rounded-md shadow-2xl py-2 z-50 border border-gray-100 flex flex-col gap-1">
                      {socialLinks.map((s) => (
                        <a
                          key={s.name}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-1.5 text-[14px] text-gray-800 hover:text-[#db5903] hover:bg-orange-50 transition-colors no-underline font-medium"
                          onClick={() => setSocialOpen(false)}
                        >
                          <i className={`${s.icon} text-[18px] text-[#db5903]`} />
                          {s.name}
                        </a>
                      ))}
                    </div>
                  )}
                </li>

                {/* Vertical Separator 1 */}
                <li className="border-l border-white/70 h-3.5 mx-1.5" />

                {/* Language Select (.change_language) */}
                <li className="relative flex items-center px-1">
                  <select
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className="bg-transparent text-white border-0 text-[15px] font-normal focus:outline-none cursor-pointer py-1 pr-1 bg-no-repeat outline-none appearance-none"
                    aria-label="Change Language"
                  >
                    <option value="en" className="text-gray-900 bg-white">
                      English
                    </option>
                    <option value="hi" className="text-gray-900 bg-white">
                      हिन्दी
                    </option>
                  </select>
                </li>

                {/* Vertical Separator 2 */}
                <li className="border-l border-white/70 h-3.5 mx-1.5" />

                {/* Search Button (.searchNada) -> Links to iitkgp.ac.in */}
                <li className="flex items-center px-1">
                  <a
                    href="https://www.iitkgp.ac.in"
                    title="Search"
                    aria-label="Search IIT Kharagpur"
                    className="w-[40px] h-[40px] aspect-square rounded-full bg-white text-[#db5903] flex items-center justify-center border border-[#db5903] cursor-pointer hover:bg-gray-50 transition-colors shrink-0 no-underline shadow-sm"
                  >
                    <svg
                      className="w-[18px] h-[18px] text-[#db5903]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </a>
                </li>

                {/* Scroll Down Arrow (#downArrow) */}
                <li className="flex items-center pl-1">
                  <button
                    type="button"
                    id="downArrow"
                    onClick={() => window.scrollTo({ top: 480, behavior: "smooth" })}
                    title="Top to Bottom"
                    className="bg-white border-0 rounded-[3px] px-[9px] py-[3px] cursor-pointer text-black hover:bg-gray-100 transition-colors flex items-center justify-center shrink-0"
                  >
                    <i className="fa-solid fa-arrow-down text-[14px]" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Mobile Right: Hamburger / Close Toggle (< xl) */}
            <div className="xl:hidden flex items-center">
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                className="text-white hover:opacity-80 transition-opacity bg-transparent border-0 cursor-pointer p-1.5 flex items-center justify-center outline-none"
              >
                {mobileOpen ? (
                  <i className="fas fa-xmark text-[28px] leading-none" />
                ) : (
                  <i className="fas fa-bars text-[24px] leading-none" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation & Logo Row (.logo-menu) */}
      <div className="bg-white border-b border-[#e5e5e5] py-[12px]">
        <div className="mx-auto max-w-[1320px] px-3 sm:px-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Official Crest & Multilingual Name Logo (.logo) */}
            <div className="logo shrink-0">
              <a
                href="https://www.iitkgp.ac.in/"
                title="Indian Institute of Technology Kharagpur"
                className="no-underline block"
              >
                <img
                  src="https://www.iitkgp.ac.in/assets/pages/images/logo.png"
                  alt="Indian Institute of Technology Kharagpur"
                  className="h-[60px] sm:h-[68px] xl:h-[75px] w-auto object-contain block"
                />
              </a>
            </div>

            {/* Center: Main Navigation Links (.mainmenunav) */}
            <nav className="hidden lg:flex items-center space-x-0 ms-auto">
              <ul className="flex items-center m-0 p-0 list-none">
                {mainNavLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      title={link.label}
                      className="relative text-[#3D7BB7] font-bold text-[19px] xl:text-[20px] px-[16px] xl:px-[20px] py-[8px] hover:text-[#db5903] transition-colors no-underline cursor-pointer group block"
                    >
                      {link.label}
                      <span className="absolute bottom-[2px] left-[16px] xl:left-[20px] right-[16px] xl:right-[20px] h-[1px] bg-[#db5903] w-0 group-hover:w-[calc(100%-32px)] xl:group-hover:w-[calc(100%-40px)] transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right: Abhijnana Newsletter & Platinum Jubilee Logos (.other-logo) */}
            <div className="hidden md:flex items-center shrink-0 pl-3 gap-3">
              <a
                href="https://www.iitkgp.ac.in/abhijnana"
                title="Abhijnana"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform hover:scale-105"
              >
                <img
                  src="https://www.iitkgp.ac.in/assets/pages/images/abhijnana-logo.png"
                  alt="Abhijnana Logo"
                  className="h-[46px] sm:h-[52px] xl:h-[58px] w-auto object-contain block"
                />
              </a>
              <a
                href="https://www.iitkgp.ac.in/pj"
                title="Platinum Jubilee"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform hover:scale-105"
              >
                <img
                  src="https://www.iitkgp.ac.in/assets/pages/images/logopj.jpg"
                  alt="Logo"
                  className="h-[46px] sm:h-[52px] xl:h-[58px] w-auto object-contain rounded block"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Side Drawer Overlay (< xl) */}
      <div
        className={`xl:hidden fixed inset-0 top-[56px] z-50 flex transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Left Orange Sidebar Menu Panel */}
        <div
          className={`w-[74%] sm:w-[65%] max-w-[320px] bg-[#db5903] h-full overflow-y-auto flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Home Icon Item */}
          <div className="border-b border-white/20">
            <a
              href="https://www.iitkgp.ac.in/home"
              title="Home"
              onClick={() => setMobileOpen(false)}
              className="py-3.5 px-5 text-white flex items-center hover:bg-black/10 transition-colors no-underline"
            >
              <i className="fas fa-home text-[22px] leading-none" />
            </a>
          </div>

          {/* Menu Items */}
          {topNavLinks.map((link) => {
            if (link.isPill) {
              return (
                <div key={link.label} className="py-2.5 px-3 border-b border-white/20">
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block w-full py-2 px-4 rounded-full bg-[#FDF781] text-[#FF000C] font-bold text-[15px] hover:bg-[#1B1B5C] hover:text-white transition-all text-left no-underline shadow-sm"
                  >
                    {link.label}
                  </a>
                </div>
              );
            }
            return (
              <div key={link.label} className="border-b border-white/20">
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3.5 px-5 text-white font-bold text-[15px] hover:bg-black/10 transition-colors no-underline block text-left"
                >
                  {link.label}
                </a>
              </div>
            );
          })}
        </div>

        {/* Right Backdrop Area (click outside to close) */}
        <div
          className="flex-1 bg-black/45 backdrop-blur-[2px] cursor-pointer"
          onClick={() => setMobileOpen(false)}
        />
      </div>
    </header>
  );
}

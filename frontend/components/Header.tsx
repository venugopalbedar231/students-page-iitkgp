"use client";

import { useState } from "react";

const topNavLinks = [
  { label: "About", href: "https://www.iitkgp.ac.in/about-iitkgp" },
  { label: "Administration", href: "https://www.iitkgp.ac.in/navpage/administration" },
  { label: "Students", href: "https://www.iitkgp.ac.in/navpage/student", isPill: true },
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");

  return (
    <header className="sticky top-0 z-50 shadow-sm bg-white font-public-sans">
      {/* 1. Header Top Strip (.header-top-strip .orange-bg) */}
      <div className="bg-[#db5903] text-white py-[6px]">
        <div className="mx-auto max-w-[1320px] px-3 sm:px-4">
          <div className="flex items-center justify-between min-h-[44px]">
            {/* Left: Desktop top navigation list (.primary-menu-links) */}
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

            {/* Mobile Header Title (< xl) */}
            <div className="xl:hidden flex items-center gap-2.5">
              <a href="https://www.iitkgp.ac.in/home" className="text-white text-lg no-underline flex items-center">
                <i className="fas fa-home text-[20px]" />
              </a>
              <span className="font-semibold text-sm sm:text-base text-white tracking-tight">
                IIT Kharagpur
              </span>
            </div>

            {/* Right Controls (.lang-fontSize-social-media) */}
            <div className="flex items-center">
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
                <li className="border-l border-white/70 h-3.5 mx-1.5 hidden sm:block" />

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
                <li className="border-l border-white/70 h-3.5 mx-1.5 hidden sm:block" />

                {/* Search Button (.searchNada) */}
                <li className="flex items-center px-1">
                  <button
                    type="button"
                    onClick={() => setSearchOpen((v) => !v)}
                    title="Search"
                    className="w-[42px] h-[42px] aspect-square rounded-full bg-white text-[#db5903] flex items-center justify-center border border-[#db5903] cursor-pointer hover:bg-gray-50 transition-colors shrink-0"
                  >
                    <i className={`far ${searchOpen ? "fa-times" : "fa-search"} text-[17px]`} />
                  </button>
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

                {/* Mobile Menu Toggle */}
                <li className="xl:hidden flex items-center pl-2">
                  <button
                    type="button"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label="Toggle navigation menu"
                    className="w-9 h-9 flex items-center justify-center rounded bg-white/20 text-white hover:bg-white/30 transition-colors border-0 cursor-pointer"
                  >
                    <i className={`fas ${mobileOpen ? "fa-xmark" : "fa-bars"} text-[18px]`} />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Search bar expandable drawer */}
          {searchOpen && (
            <div className="py-3 border-t border-white/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.currentTarget.elements.namedItem("q") as HTMLInputElement;
                  if (target?.value) {
                    window.open(
                      `https://www.google.com/search?q=site:iitkgp.ac.in+${encodeURIComponent(
                        target.value
                      )}`,
                      "_blank"
                    );
                  }
                }}
                className="flex items-center bg-white rounded-full overflow-hidden shadow-md max-w-xl mx-auto px-4 py-2 border border-orange-200"
              >
                <input
                  name="q"
                  type="search"
                  placeholder="Indian Institute of Technology Kharagpur..."
                  className="flex-1 px-3 py-1 text-[15px] text-gray-800 outline-none border-0 font-public-sans"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1 text-[#db5903] hover:text-[#b34015] border-0 bg-transparent cursor-pointer text-[18px]"
                  aria-label="Submit search"
                >
                  <i className="far fa-search" />
                </button>
              </form>
            </div>
          )}
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

      {/* 3. Mobile Responsive Drawer (< xl) */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 shadow-2xl max-h-[80vh] overflow-y-auto">
          <nav className="mx-auto max-w-[1320px] px-5 py-4 divide-y divide-gray-100">
            <div className="pb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#db5903] mb-2 font-public-sans">
                Main Sections
              </p>
              <div className="grid grid-cols-2 gap-2">
                {mainNavLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block py-2.5 px-3 rounded-md text-base font-bold text-[#3D7BB7] hover:bg-orange-50 hover:text-[#db5903] no-underline transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#db5903] mb-2 font-public-sans">
                Quick Links
              </p>
              <div className="flex flex-col gap-1">
                <a
                  href="https://www.iitkgp.ac.in/home"
                  className="py-2 px-3 rounded-md text-sm font-medium text-gray-800 hover:bg-orange-50 hover:text-[#db5903] no-underline"
                >
                  Home
                </a>
                {topNavLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="py-2 px-3 rounded-md text-sm font-medium text-gray-800 hover:bg-orange-50 hover:text-[#db5903] no-underline flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    {link.isPill && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FDF781] text-[#FF000C]">
                        Official
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}



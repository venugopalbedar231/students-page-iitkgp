"use client";
import React from 'react';
import { useSearch, normalizeStr, textMatches } from "@/context/SearchContext";

/**
 * Deliberately a glance layer, not a directory — the Gymkhana site is the authority on
 * societies and fixtures. The EAA/NSO facts below come from the Faculty Advisor handbook
 * (booklet p20), served at /docs/STUDENTCOPY_FACULTYADVISOR_IITKGP.pdf.
 */

const flagship = [
  {
    title: "Kshitij",
    kicker: "Techno-management fest",
    blurb: "Asia's largest techno-management festival, run entirely by students — competitions, exhibitions and guest lectures.",
    icon: "fas fa-microchip",
    image: "/fests/kshitij.jpeg",
    dates: "15–17 JAN 2027",
    tentative: true,
  },
  {
    title: "Spring Fest",
    kicker: "Socio-cultural fest",
    blurb: "The annual social and cultural festival, drawing performers and competitors from across the country.",
    icon: "fas fa-star",
    image: "/fests/spring-fest.jpeg",
    dates: "22–24 JAN 2027 ",
    tentative: true,
  },
  {
    title: "Shaurya",
    kicker: "Sports fest",
    blurb: "The annual sports festival bringing together top athletic talent across colleges.",
    icon: "fas fa-trophy",
    image: "/fests/shaurya.jpeg",
    dates: "09–11 OCT 2026",
    tentative: true,
  },
  {
    title: "Wellbeing Day",
    kicker: "Campus wellness fest",
    blurb: "A campus-wide festival promoting student health, mindfulness, and holistic well-being.",
    icon: "fas fa-heart-pulse",
    image: "/fests/wellbeing-day.jpeg",
    dates: "To be declared",
    tentative: false,
  },
];

// NSO sports, per the Faculty Advisor handbook (booklet p20).
const sports = [
  "Athletics",
  "Badminton",
  "Basketball",
  "Cricket",
  "Football",
  "Hockey",
  "Swimming",
  "Table Tennis",
  "Tennis",
  "Volleyball",
];

// The five EAA streams, per the same page.
const eaaStreams = ["NCC", "NSS", "NSO", "Health & Fitness", "Indian Classical Music Academy"];

export default function ExtraCurricular() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { query } = useSearch();
  const q = query.trim().toLowerCase();
  const qn = normalizeStr(q);
  const match = (text: string) => textMatches(text, q, qn);

  const sectionKeywords = ["extra curricular", "extracurricular", "fest", "kshitij", "spring fest",
    "shaurya", "wellbeing", "sports", "society", "gymkhana", "nso", "eaa", "cultural", "techno", "campus life"];
  const sectionVisible = qn === "" ||
    sectionKeywords.some(k => match(k)) ||
    flagship.some(f => match(f.title) || match(f.blurb) || match(f.kicker));

  if (!sectionVisible) return null;

  return (
    <div id="extra-curricular" className="mb-6 md:mb-8 rounded-lg shadow-sm border border-gray-200 bg-white overflow-hidden scroll-mt-24">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between bg-[#FF7F00] text-white px-4 py-3">
        <h3 className="font-lexend font-semibold text-lg m-0">Extra-Curricular &amp; Campus Life</h3>
        <span className="text-[12px] font-inter text-white/90 flex items-center gap-1.5">
          <i className="fas fa-people-group text-[11px]"></i>
          Student-run
        </span>
      </div>

      {/* Mobile Accordion Header */}
      <div
        className="md:hidden bg-[#FF7F00] text-white px-4 py-3 flex justify-between items-center cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-lexend font-semibold text-lg m-0">CAMPUS LIFE</h3>
        <i className={`fas fa-chevron-down transition-transform duration-300 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}></i>
      </div>

      {/* Content — animated open/close on mobile via grid-rows 0fr→1fr; untouched on desktop. */}
      <div
        className={`max-md:grid max-md:transition-[grid-template-rows] max-md:duration-300 max-md:ease-out motion-reduce:transition-none ${isOpen ? 'max-md:grid-rows-[1fr]' : 'max-md:grid-rows-[0fr]'
          }`}
      >
        <div className="max-md:overflow-hidden max-md:min-h-0">
          <div className="p-4 md:p-5 bg-[#fafafa] flex flex-col gap-5">

            {/* CTA */}
            <div className="relative overflow-hidden rounded-xl bg-gray-900 border border-[#FF7F00]/40 shadow-md group min-h-[260px] sm:min-h-[280px] flex flex-col justify-end p-5 sm:p-6">
              {/* Background Image - anchored to top so the building is fully visible */}
              <img
                src="/tsg.jpg"
                alt="Technology Students' Gymkhana (TSG)"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlay - dark at bottom for text contrast, clear at top to reveal the building */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 via-55% to-transparent" />

              {/* Text content overlaid on top */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-12">
                <div className="relative">
                  <p className="font-lexend font-bold text-white text-base sm:text-lg m-0 mb-1 leading-tight drop-shadow-md">
                    There&apos;s far more than fits on this page
                  </p>
                  <p className="text-sm text-gray-200 font-inter leading-relaxed m-0 max-w-xl drop-shadow-md">
                    Robotics, dramatics, music, debating, photography, social work — the societies, the inter-hall
                    circuit and every fixture are coordinated by the Technology Students&apos; Gymkhana. Their site is
                    where the current list lives.
                  </p>
                </div>
                <a
                  href="https://gymkhana.iitkgp.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center justify-center gap-2 max-md:min-h-11 bg-[#FF7F00] text-white font-inter font-semibold text-sm px-5 py-2.5 rounded-full no-underline shadow-md hover:bg-[#e06f00] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Explore TSG
                  <i className="fas fa-arrow-up-right-from-square text-xs"></i>
                </a>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-600 font-inter leading-relaxed m-0 pl-2 md:pl-3 max-w-3xl">
              Life at KGP runs well past the classroom — major student festivals, a full
              sporting calendar, and a long list of societies, almost all of it student-run through the Gymkhana.
            </p>

            {/* Flagship fests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {flagship.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-md"
                >
                  {f.image && (
                    <div className="relative h-44 sm:h-48 overflow-hidden bg-gray-100 shrink-0">
                      <img
                        src={f.image}
                        alt={f.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white text-xs">
                        <i className={f.icon}></i>
                      </div>
                    </div>
                  )}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-xs font-inter font-semibold uppercase tracking-wider text-[#FF7F00]">
                        {f.kicker}
                      </span>
                      <h4 className="font-lexend font-bold text-xl text-gray-900 mt-1 mb-2 leading-tight">
                        {f.title}
                      </h4>
                      <p className="text-sm text-gray-600 font-inter leading-relaxed m-0">
                        {f.blurb}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-inter font-medium text-gray-600 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200/60">
                        <i className="fas fa-calendar text-[11px] text-[#FF7F00]"></i>
                        {f.dates}
                      </span>
                      {f.tentative && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-inter font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          <i className="fas fa-clock-rotate-left text-[9px]"></i>
                          Tentative
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sport & EAA */}
            <div className="rounded-xl bg-white border border-gray-200 p-4 md:p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#FFF2E5] text-[#FF7F00] flex items-center justify-center text-base shrink-0">
                  <i className="fas fa-medal"></i>
                </div>
                <h4 className="font-lexend font-semibold text-base text-gray-900 m-0">Sport &amp; Extra Academic Activity</h4>
              </div>

              <p className="text-sm text-gray-600 font-inter leading-relaxed m-0 mb-4 max-w-3xl">
                Sport isn&apos;t optional here — the National Sports Organisation is one of five Extra Academic Activity
                streams, and clearing EAA is required for the award of your degree. Under the 2024 curriculum, EAA-I to
                EAA-IV are mandatory one-credit courses across your first four semesters.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2">
                  <span className="text-xs font-inter font-semibold uppercase tracking-wider text-gray-400">
                    Sports under NSO
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {sports.map((s) => (
                      <span
                        key={s}
                        className="text-xs sm:text-[13px] font-inter font-medium text-gray-700 bg-[#fafafa] border border-gray-200 rounded-full px-3 py-1"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-inter font-semibold uppercase tracking-wider text-gray-400">
                    EAA streams
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {eaaStreams.map((e) => (
                      <span
                        key={e}
                        className="text-xs sm:text-[13px] font-inter font-medium text-[#FF7F00] bg-[#FFF2E5] border border-[#FF7F00]/20 rounded-full px-3 py-1"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

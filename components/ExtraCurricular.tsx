"use client";
import React from 'react';

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
  },
  {
    title: "Spring Fest",
    kicker: "Socio-cultural fest",
    blurb: "The annual social and cultural festival, drawing performers and competitors from across the country.",
    icon: "fas fa-star",
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
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} transition-transform duration-300`}></i>
      </div>

      {/* Content */}
      <div className={`md:block ${isOpen ? 'block' : 'hidden'}`}>
        <div className="p-4 md:p-5 bg-[#fafafa] flex flex-col gap-5">

          <p className="text-sm text-gray-600 font-inter leading-relaxed m-0 max-w-3xl">
            Life at KGP runs well past the classroom — two of the country&apos;s biggest student festivals, a full
            sporting calendar, and a long list of societies, almost all of it student-run through the Gymkhana.
          </p>

          {/* Flagship fests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flagship.map((f) => (
              <div
                key={f.title}
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#FF7F00] to-[#ff9e3d] p-5 shadow-md"
              >
                <i className={`${f.icon} absolute -right-3 -bottom-3 text-white/15 text-7xl pointer-events-none`}></i>
                <div className="relative">
                  <span className="text-[10px] font-inter font-semibold uppercase tracking-[0.15em] text-white/85">
                    {f.kicker}
                  </span>
                  <h4 className="font-lexend font-bold text-2xl text-white mt-1 mb-2 leading-tight">{f.title}</h4>
                  <p className="text-[13px] text-white/90 font-inter leading-relaxed m-0 max-w-md">{f.blurb}</p>
                  <span className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-inter font-semibold text-white/85 bg-white/20 px-2.5 py-1 rounded-full">
                    <i className="fas fa-calendar text-[10px]"></i>
                    Dates to be announced
                  </span>
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

            <p className="text-xs text-gray-500 font-inter leading-relaxed m-0 mb-4 max-w-3xl">
              Sport isn&apos;t optional here — the National Sports Organisation is one of five Extra Academic Activity
              streams, and clearing EAA is required for the award of your degree. Under the 2024 curriculum, EAA-I to
              EAA-IV are mandatory one-credit courses across your first four semesters.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2">
                <span className="text-[10px] font-inter font-semibold uppercase tracking-wider text-gray-400">
                  Sports under NSO
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {sports.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-inter font-medium text-gray-700 bg-[#fafafa] border border-gray-200 rounded-full px-2.5 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-inter font-semibold uppercase tracking-wider text-gray-400">
                  EAA streams
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {eaaStreams.map((e) => (
                    <span
                      key={e}
                      className="text-[11px] font-inter font-medium text-[#FF7F00] bg-[#FFF2E5] border border-[#FF7F00]/20 rounded-full px-2.5 py-1"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="relative overflow-hidden rounded-xl bg-white border border-[#FF7F00]/30 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative">
              <p className="font-lexend font-semibold text-gray-900 text-base m-0 mb-1">
                There&apos;s far more than fits on this page
              </p>
              <p className="text-[13px] text-gray-500 font-inter leading-relaxed m-0 max-w-xl">
                Robotics, dramatics, music, debating, photography, social work — the societies, the inter-hall
                circuit and every fixture are coordinated by the Technology Students&apos; Gymkhana. Their site is
                where the current list lives.
              </p>
            </div>
            <a
              href="https://gymkhana.iitkgp.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center gap-2 max-md:min-h-11 bg-[#FF7F00] text-white font-inter font-semibold text-sm px-5 py-2.5 rounded-full no-underline shadow-sm hover:bg-[#e06f00] transition-colors"
            >
              Explore TSG
              <i className="fas fa-arrow-up-right-from-square text-xs"></i>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

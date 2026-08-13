"use client";
import React, { useState } from 'react';

/**
 * Every fact below is sourced from the two PDFs served out of /public/docs:
 *  - UG Admission Manual 2024, §10 "Major curriculum reforms" (pp. 30-31)
 *  - Faculty Advisor handbook 2026 Issue-I (booklet pp. 19, 21-24, 32-36)
 * Senate item numbers are quoted where the source quotes them. Keep this section short —
 * it is a glance layer; the PDFs are the authority.
 */

const UG_MANUAL = "/docs/UGAdmManual2024.pdf";
const FA_HANDBOOK = "/docs/STUDENTCOPY_FACULTYADVISOR_IITKGP.pdf";

const changes = [
  "Admission now only into 4-year B.Tech./B.S.",
  "Branch change after 1st year abolished",
  "160–168 total credits (was 173)",
  "One AI/ML elective mandatory for everyone",
];

type Track = {
  title: string;
  icon: string;
  chip: string;
  blurb: string;
  points: string[];
};

const tracks: Track[] = [
  {
    title: "Dual Degree",
    icon: "fas fa-layer-group",
    chip: "Opt in after 2nd/3rd year",
    blurb: "You are admitted to a 4-year programme, then choose whether to extend it to five.",
    points: [
      "Either a 5-year dual degree in your parent department, or an Interdisciplinary Dual Degree (IDDP)",
      "IDDP crosses streams — B.S. (Hons.) Economics into M.Tech. in AI/ML, for instance",
      "The point is to decide after a few semesters here, not before you arrive",
    ],
  },
  {
    title: "Double Major",
    icon: "fas fa-award",
    chip: "40–48 extra credits",
    blurb: "A second major in a branch different from the one you were admitted to.",
    points: [
      "Register after 1st year: all semester 1–2 subjects done, CGPA ≥ 7.00, no backlogs",
      "Up to 8 credits may be double-counted — Depth Core only, never electives",
      "Degree reads “B.Tech. (Hons.) in [parent] and Major in [second]”; you may withdraw any time",
    ],
  },
  {
    title: "Minor",
    icon: "fas fa-bookmark",
    chip: "6+ subjects",
    blurb: "An additional set of subjects from a department that already offers that major.",
    points: [
      "From 2024: all subjects up to semester 4 cleared, CGPA ≥ 7.0, no backlogs (Senate 361-8)",
      "At least three of the six subjects must be taken as additional credits",
      "GPA of 6.00 across the minor subjects earns you the minor",
    ],
  },
  {
    title: "Micro-Specialization",
    icon: "fas fa-microscope",
    chip: "10–14 credits",
    blurb: "A compact, niche specialisation you can fit into your elective slots.",
    points: [
      "Three parts: a foundation course, one or two listed subjects, then a project or a fourth subject",
      "Register any semester after the first with CGPA ≥ 7.0; hold CGPA/SGPA ≥ 7.5 to stay registered",
      "Take the foundation course early — it is a prerequisite for everything after it",
    ],
  },
  {
    title: "Semester Away (SAP)",
    icon: "fas fa-plane-departure",
    chip: "1 semester away · 9 credits",
    blurb: "Spend a semester at another institute, industry or research lab and earn full credits.",
    points: [
      "In India or abroad; SAP replaces the older SAIP and is worth 9 credits",
      "Bolt the mandatory 8-week summer internship onto it for roughly 8 months away",
      "Dual degree students have their own route: SAPP, a 12-credit 9th-semester project",
    ],
  },
];

type Doc = {
  title: string;
  href: string;
  meta: string;
  desc: string;
  icon: string;
};

const docs: Doc[] = [
  {
    title: "UG Admission Manual 2024",
    href: UG_MANUAL,
    meta: "PDF · 32 pages · 5.1 MB",
    desc: "Registration walkthrough, fee structure, tuition-fee waiver, documents to upload, and the curriculum reforms summarised above.",
    icon: "fas fa-file-lines",
  },
  {
    title: "Faculty Advisor Handbook",
    href: FA_HANDBOOK,
    meta: "PDF · 2026 Issue-I · 24.1 MB",
    desc: "The full UG rules: micro-specialization, double major, minor, SAIP/SAPP, EAA, supplementary exams, medical leave, switch-overs and the faculty advisor directory.",
    icon: "fas fa-book-open",
  },
];

function DocCard({ doc }: { doc: Doc }) {
  const [open, setOpen] = useState(false);
  // Mount the iframe on first preview and keep it: the animation needs the wrapper to stay in
  // the DOM to transition, and re-opening shouldn't refetch 24 MB. Nothing loads until asked.
  const [mounted, setMounted] = useState(false);

  const toggle = () => {
    setMounted(true);
    setOpen((v) => !v);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex items-start gap-3 p-4">
        <div className="w-10 h-10 rounded-lg bg-[#FFF2E5] text-[#FF7F00] flex items-center justify-center text-lg shrink-0">
          <i className={doc.icon}></i>
        </div>

        <div className="min-w-0 flex-1">
          <h5 className="font-lexend font-semibold text-base text-gray-900 m-0 mb-0.5 leading-snug">{doc.title}</h5>
          <span className="text-xs text-gray-400 font-inter tabular-nums">{doc.meta}</span>
          <p className="text-sm text-gray-500 font-inter leading-relaxed m-0 mt-2">{doc.desc}</p>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <a
              href={doc.href}
              download
              className="inline-flex items-center justify-center gap-2 max-md:min-h-11 bg-[#FF7F00] text-white font-inter font-semibold text-xs sm:text-sm px-4 py-2 rounded-full no-underline hover:bg-[#e06f00] transition-colors"
            >
              <i className="fas fa-download text-xs"></i>
              Download
            </a>
            {/* The handbook is 24 MB — the preview iframe only mounts once asked for. */}
            <button
              onClick={toggle}
              aria-expanded={open}
              className="inline-flex items-center justify-center gap-2 max-md:min-h-11 bg-white text-gray-600 border border-gray-200 font-inter font-semibold text-xs sm:text-sm px-4 py-2 rounded-full hover:border-[#FF7F00] hover:text-[#FF7F00] transition-colors"
            >
              <i
                className={`fas fa-chevron-down text-xs transition-transform duration-300 motion-reduce:transition-none ${
                  open ? 'rotate-180' : ''
                }`}
              ></i>
              {open ? 'Hide preview' : 'Preview'}
            </button>
            <a
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-inter font-semibold text-gray-400 hover:text-[#FF7F00] no-underline px-1 max-md:min-h-11 max-md:items-center"
            >
              Open in new tab
              <i className="fas fa-arrow-up-right-from-square text-xs"></i>
            </a>
          </div>
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden min-h-0">
          {mounted && (
            <iframe
              src={doc.href}
              title={doc.title}
              className="w-full h-[60vh] md:h-[75vh] border-0 border-t border-gray-200 bg-gray-50"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function UGGuidelines() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="ug-guidelines" className="mb-6 md:mb-8 rounded-lg shadow-sm border border-gray-200 bg-white overflow-hidden scroll-mt-24">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between bg-[#FF7F00] text-white px-4 py-3">
        <h3 className="font-lexend font-semibold text-lg m-0">UG Guidelines</h3>
        <span className="text-[12px] font-inter text-white/90 flex items-center gap-1.5">
          <i className="fas fa-file-pdf text-[11px]"></i>
          2024 curriculum
        </span>
      </div>

      {/* Mobile Accordion Header */}
      <div
        className="md:hidden bg-[#FF7F00] text-white px-4 py-3 flex justify-between items-center cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-lexend font-semibold text-lg m-0">UG GUIDELINES</h3>
        <i className={`fas fa-chevron-down transition-transform duration-300 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}></i>
      </div>

      {/* Content — animated open/close on mobile via grid-rows 0fr→1fr; untouched on desktop. */}
      <div
        className={`max-md:grid max-md:transition-[grid-template-rows] max-md:duration-300 max-md:ease-out motion-reduce:transition-none ${
          isOpen ? 'max-md:grid-rows-[1fr]' : 'max-md:grid-rows-[0fr]'
        }`}
      >
        <div className="max-md:overflow-hidden max-md:min-h-0">
        <div className="p-4 md:p-5 bg-[#fafafa] flex flex-col gap-5">

          <p className="text-sm sm:text-base text-gray-600 font-inter leading-relaxed m-0 max-w-3xl">
            The 2024 curriculum changed how you build your degree — you now pick most of the shape of it
            <em> after</em> you arrive. The essentials are below; the manuals at the bottom carry the full rules.
          </p>

          {/* What changed */}
          <div className="rounded-xl bg-white border border-[#FF7F00]/30 p-4">
            <h4 className="font-lexend font-semibold text-sm text-gray-900 mb-2.5 flex items-center gap-2">
              <i className="fas fa-arrows-rotate text-[#FF7F00] text-xs"></i>
              What changed from 2024
            </h4>
            <div className="flex flex-wrap gap-2">
              {changes.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-inter text-gray-600 bg-[#fafafa] border border-gray-200 rounded-full px-3 py-1"
                >
                  <i className="fas fa-[#FF7F00] fa-check text-[10px]"></i>
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Tracks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map((t) => (
              <div
                key={t.title}
                className="flex flex-col bg-white border border-gray-200 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-[#FF7F00]/50"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#FFF2E5] text-[#FF7F00] flex items-center justify-center text-base shrink-0">
                    <i className={t.icon}></i>
                  </div>
                  <h5 className="font-lexend font-semibold text-[15px] text-gray-900 m-0 leading-snug">{t.title}</h5>
                </div>

                <span className="self-start text-xs font-inter font-semibold uppercase tracking-wider text-[#FF7F00] bg-[#FFF2E5] px-2.5 py-1 rounded-full mb-2.5">
                  {t.chip}
                </span>

                <p className="text-sm text-gray-500 font-inter leading-relaxed m-0 mb-3">{t.blurb}</p>

                <ul className="list-none p-0 m-0 flex flex-col gap-2 mt-auto">
                  {t.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 font-inter leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF7F00]/60 mt-1.5 shrink-0"></span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Where to look next — fills the 6th cell of the grid */}
            <div className="flex flex-col justify-center bg-white border border-dashed border-[#FF7F00]/40 rounded-xl p-4">
              <div className="w-9 h-9 rounded-lg bg-[#FFF2E5] text-[#FF7F00] flex items-center justify-center text-base mb-2.5">
                <i className="fas fa-circle-question"></i>
              </div>
              <h5 className="font-lexend font-semibold text-[15px] text-gray-900 m-0 mb-1.5 leading-snug">Need the detail?</h5>
              <p className="text-sm text-gray-500 font-inter leading-relaxed m-0 mb-3">
                Credit tables, Senate items and the exact eligibility wording live in the two manuals below.
              </p>
              <div className="flex flex-col gap-1.5">
                <a href={UG_MANUAL} download className="inline-flex items-center gap-1.5 max-md:min-h-11 text-xs sm:text-sm font-inter font-semibold text-[#FF7F00] hover:text-[#e06f00] no-underline">
                  <i className="fas fa-download text-xs"></i>
                  UG Admission Manual
                </a>
                <a href={FA_HANDBOOK} download className="inline-flex items-center gap-1.5 max-md:min-h-11 text-xs sm:text-sm font-inter font-semibold text-[#FF7F00] hover:text-[#e06f00] no-underline">
                  <i className="fas fa-download text-xs"></i>
                  Faculty Advisor Handbook
                </a>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h4 className="font-lexend font-semibold text-base text-gray-900 mb-3 flex items-center gap-2">
              <i className="fas fa-folder-open text-[#FF7F00] text-sm"></i>
              The manuals
            </h4>
            <div className="flex flex-col gap-4">
              {docs.map((d) => (
                <DocCard key={d.title} doc={d} />
              ))}
            </div>
          </div>

        </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from 'react';

const OFFICIAL_URL = "https://www.iitkgp.ac.in/inclusivity";
const DISABILITY_DOC = "https://www.iitkgp.ac.in/assets/sdsi/Brief-write-up-on-disabilty-inclusiveness.pdf";
const RESEARCH_DOC = "https://www.iitkgp.ac.in/assets/sdsi/SRP_DS.pdf";

const features = [
  {
    title: "Dedicated PwD Cell & PIC",
    icon: "fas fa-hands-holding-child",
    badge: "Administration",
    desc: "A designated Professor-in-Charge (PIC) and specialized PwD Cell to ensure equal opportunity, accessibility, and proactive student welfare.",
  },
  {
    title: "Barrier-Free Campus & Mobility",
    icon: "fas fa-wheelchair",
    badge: "Infrastructure",
    desc: "Ramps, lifts, and accessible washrooms across departments, hostels, and hospital. Motorized wheelchairs and assistive transit provided for campus commute.",
  },
  {
    title: "Examination Support",
    icon: "fas fa-file-pen",
    badge: "Academics",
    desc: "Separate ground-floor exam halls, +20 mins/hour extra time, scribe support for visually/motor impaired students, and counseling center assistance.",
  },
  {
    title: "Divyang Corner (Central Library)",
    icon: "fas fa-book-reader",
    badge: "Library",
    desc: "Ground-floor facility with LibriVox audiobooks, headphones, Kindle e-readers, and dedicated circulation staff for catalogue & e-database search.",
  },
  {
    title: "Adaptive Sports & Societies",
    icon: "fas fa-dumbbell",
    badge: "Campus Life",
    desc: "Gymnasium with customized training modules, Para Powerlifting in Inter-IIT, and active participation in music, robotics, dramatics, and quiz clubs.",
  },
  {
    title: "Assistive Tech & Innovation",
    icon: "fas fa-microchip",
    badge: "Innovation",
    desc: "Communication Empowerment Lab (CEL) assistive tools (Sparsha, Sanyog, Akashvani) and indigenous innovations like the disabled-friendly i-Bike.",
  },
];

export default function PwdInclusivity() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      id="pwd-inclusivity"
      className="mb-6 md:mb-8 rounded-lg shadow-sm border border-gray-200 bg-white overflow-hidden scroll-mt-24"
    >
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between bg-[#FF7F00] text-white px-4 py-3">
        <div className="flex items-center gap-2.5">
          <i className="fas fa-universal-access text-xl"></i>
          <h3 className="font-lexend font-semibold text-lg m-0">
            Inclusivity &amp; PwD Support
          </h3>
        </div>
        <a
          href={OFFICIAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] font-inter font-semibold text-white/95 hover:text-white no-underline flex items-center gap-1.5 px-3 py-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <span>Official Inclusivity Portal</span>
          <i className="fas fa-arrow-up-right-from-square text-[11px]"></i>
        </a>
      </div>

      {/* Mobile Accordion Header */}
      <div
        className="md:hidden bg-[#FF7F00] text-white px-4 py-3 flex justify-between items-center cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <i className="fas fa-universal-access text-base shrink-0"></i>
          <h3 className="font-lexend font-semibold text-base sm:text-lg m-0 truncate">
            INCLUSIVITY &amp; PwD SUPPORT
          </h3>
        </div>
        <i
          className={`fas fa-chevron-down transition-transform duration-300 motion-reduce:transition-none ${
            isOpen ? 'rotate-180' : ''
          }`}
        ></i>
      </div>

      {/* Content */}
      <div
        className={`max-md:grid max-md:transition-[grid-template-rows] max-md:duration-300 max-md:ease-out motion-reduce:transition-none ${
          isOpen ? 'max-md:grid-rows-[1fr]' : 'max-md:grid-rows-[0fr]'
        }`}
      >
        <div className="max-md:overflow-hidden max-md:min-h-0">
          <div className="p-4 md:p-5 bg-[#fafafa] flex flex-col gap-5">
            {/* Overview description */}
            <p className="text-sm sm:text-base text-gray-600 font-inter leading-relaxed m-0 max-w-3xl">
              IIT Kharagpur is committed to barrier-free education and equal opportunities for students of all abilities,
              offering tailored academic accommodations, accessible infrastructure, assistive technologies, and wellness support.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex flex-col bg-white border border-gray-200 rounded-xl p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-[#FF7F00]/50"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FFF2E5] text-[#FF7F00] flex items-center justify-center text-lg shrink-0">
                      <i className={f.icon}></i>
                    </div>
                    <span className="text-[11px] font-inter font-semibold uppercase tracking-wider text-[#FF7F00] bg-[#FFF2E5] px-2.5 py-0.5 rounded-full">
                      {f.badge}
                    </span>
                  </div>

                  <h4 className="font-lexend font-semibold text-base text-gray-900 m-0 mb-1.5 leading-snug">
                    {f.title}
                  </h4>
                  <p className="text-sm text-gray-500 font-inter leading-relaxed m-0 flex-grow">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Documents & Useful Links */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="font-lexend font-semibold text-sm sm:text-base text-gray-900 mb-3 flex items-center gap-2">
                <i className="fas fa-folder-open text-[#FF7F00] text-sm"></i>
                Resources &amp; Reference Documents
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={DISABILITY_DOC}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-lg bg-[#fafafa] border border-gray-200 hover:border-[#FF7F00] no-underline transition-all"
                >
                  <div className="w-8 h-8 rounded-md bg-[#FFF2E5] text-[#FF7F00] group-hover:bg-[#FF7F00] group-hover:text-white flex items-center justify-center text-sm shrink-0 transition-colors">
                    <i className="fas fa-file-pdf"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 font-inter text-sm m-0 group-hover:text-[#FF7F00] truncate">
                      Disability Support &amp; Inclusiveness
                    </p>
                    <p className="text-xs text-gray-500 font-inter m-0 truncate">
                      Brief Write-up (PDF)
                    </p>
                  </div>
                  <i className="fas fa-download text-xs text-gray-400 group-hover:text-[#FF7F00] shrink-0"></i>
                </a>

                <a
                  href={RESEARCH_DOC}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-lg bg-[#fafafa] border border-gray-200 hover:border-[#FF7F00] no-underline transition-all"
                >
                  <div className="w-8 h-8 rounded-md bg-[#FFF2E5] text-[#FF7F00] group-hover:bg-[#FF7F00] group-hover:text-white flex items-center justify-center text-sm shrink-0 transition-colors">
                    <i className="fas fa-file-pdf"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 font-inter text-sm m-0 group-hover:text-[#FF7F00] truncate">
                      Disability Research Projects
                    </p>
                    <p className="text-xs text-gray-500 font-inter m-0 truncate">
                      Special Research Projects (PDF)
                    </p>
                  </div>
                  <i className="fas fa-download text-xs text-gray-400 group-hover:text-[#FF7F00] shrink-0"></i>
                </a>
              </div>
            </div>

            {/* Official Portal CTA Banner */}
            <div className="rounded-xl bg-gradient-to-r from-[#FF7F00] to-[#ff9e3d] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
              <div>
                <p className="font-lexend font-semibold text-white text-base m-0 mb-1">
                  Learn more about Inclusivity at IIT Kharagpur
                </p>
                <p className="text-sm text-white/95 font-inter leading-relaxed m-0 max-w-xl">
                  Visit the official IIT KGP Inclusivity portal for policy details, universal city planning initiatives (NIUA MoU), and communication technologies.
                </p>
              </div>
              <a
                href={OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-white text-[#FF7F00] hover:bg-orange-50 font-inter font-semibold text-sm px-5 py-2.5 rounded-full no-underline shadow-sm transition-colors"
              >
                <span>Visit Inclusivity Page</span>
                <i className="fas fa-arrow-up-right-from-square text-xs"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

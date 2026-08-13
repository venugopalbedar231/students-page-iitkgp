"use client";
import React, { useState } from 'react';

/**
 * Numbers are transcribed from the Institute's "Important Telephone Numbers" sheet.
 * Dialling rules (per the Institute's own guidance): 5-digit campus extensions are
 * reached from outside as 03222-2xxxxx; 6-digit Kharagpur town numbers as 03222-xxxxxx.
 */
type Contact = { label: string; numbers: string[]; note?: string };
type Group = { title: string; icon: string; contacts: Contact[] };
type Office = { role: string; numbers: string[]; email?: string; note?: string };

function telHref(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (/^\d{3}$/.test(digits)) return `tel:${digits}`;              // national short code
  if (/^\d{5}$/.test(digits)) return `tel:+913222 2${digits}`.replace(/\s/g, ''); // campus extension
  if (/^\d{6}$/.test(digits)) return `tel:+913222${digits}`;        // Kharagpur town
  if (/^91\d{10}$/.test(digits)) return `tel:+${digits}`;           // mobile, country code already present
  if (/^\d{10}$/.test(digits)) return `tel:+91${digits}`;           // bare Indian mobile
  return `tel:+91${digits.replace(/^0/, '')}`;                      // number with its own STD code
}

const emergency: Contact[] = [
  { label: "Quick Response Team", numbers: ["032222-81002", "032222-81003"], note: "Campus-wide emergency response" },
  { label: "Security", numbers: ["032222-82751"], note: "Institute security control" },
  { label: "Hospital", numbers: ["032222-82632"], note: "B.C. Roy Technology Hospital" },
  { label: "Police", numbers: ["032222-88060"], note: "Campus police" },
];

/**
 * The VP and Welfare numbers are personal mobiles of elected TSG officials — they turn over
 * with each term, so re-check them at the start of every session.
 *
 * Dean, Student Affairs (ext 82038 / deansa@hijli.iitkgp.ac.in) is UNVERIFIED: it comes from
 * a web search of iitkgp.ac.in/deans, whose fetchAllDeans endpoint was returning HTTP 500 and
 * could not be checked against the live directory. Note the Faculty Advisor handbook (2026
 * Issue-I, booklet p5) gives the DOSA office as ext 82042, which contradicts this.
 */
const offices: Office[] = [
  {
    role: "Vice President, TSG",
    numbers: ["+91 99752 61910"],
    note: "Technology Students' Gymkhana",
  },
  {
    role: "Gen. Secretary, Students' Welfare",
    numbers: ["+91 93410 35378", "+91 63052 64348", "+91 96196 13642"],
    note: "TSG students' welfare",
  },
  {
    role: "Dean, Student Affairs",
    numbers: ["82038"],
    email: "deansa@hijli.iitkgp.ac.in",
    note: "Institute student affairs office",
  },
];

const campusGroups: Group[] = [
  {
    title: "Guest Houses",
    icon: "fas fa-bed",
    contacts: [
      { label: "Tech. Guest House", numbers: ["82800"] },
      { label: "Vishveswarayya Guest House", numbers: ["82880"] },
      { label: "Alumni Guest House", numbers: ["82860"] },
    ],
  },
  {
    title: "Complaints",
    icon: "fas fa-screwdriver-wrench",
    contacts: [
      { label: "Building — Campus", numbers: ["82610"] },
      { label: "Building — Institute", numbers: ["82611"] },
      { label: "Electrical — Overhead", numbers: ["82552"] },
      { label: "Electrical — Campus", numbers: ["82550"] },
      { label: "Electrical — Institute", numbers: ["82551"] },
      { label: "Sanitation — Campus", numbers: ["82734"] },
      { label: "Sanitation — Institute", numbers: ["82732"] },
      { label: "Telephone", numbers: ["82710"] },
      { label: "Water", numbers: ["82629"] },
      { label: "Gas", numbers: ["81028"] },
      { label: "Halls", numbers: ["81104"] },
    ],
  },
];

type SecurityContact = {
  label: string;
  number: string;
  type: 'landline' | 'mobile';
  availability: string;
  description?: string;
};

const securityContacts: SecurityContact[] = [
  {
    label: "Security Control Room",
    number: "032222-81001",
    type: "landline",
    availability: "24×7",
    description: "Main security control room — report any campus emergency",
  },
  {
    label: "Security Control Room",
    number: "032222-82751",
    type: "landline",
    availability: "24×7",
    description: "Alternate security control room line",
  },
  {
    label: "QRT Team",
    number: "032222-81002",
    type: "landline",
    availability: "24×7",
    description: "Quick Response Team landline 1",
  },
  {
    label: "QRT Team",
    number: "032222-81003",
    type: "landline",
    availability: "24×7",
    description: "Quick Response Team landline 2",
  },
  {
    label: "Puri Gate",
    number: "032222-82765",
    type: "landline",
    availability: "24×7",
    description: "Puri Gate security checkpoint",
  },
  {
    label: "Duty Officer",
    number: "9474984524",
    type: "mobile",
    availability: "24×7",
  },
  {
    label: "Lady QRT",
    number: "9474984542",
    type: "mobile",
    availability: "24×7",
  },
  {
    label: "QRT Team",
    number: "9531765049",
    type: "mobile",
    availability: "24×7",
  },
  {
    label: "QRT Team",
    number: "8531765048",
    type: "mobile",
    availability: "24×7",
  },
];


const townGroups: Group[] = [
  {
    title: "Police & Fire",
    icon: "fas fa-shield-halved",
    contacts: [
      { label: "Police", numbers: ["277234"] },
      { label: "Town Thana", numbers: ["255967"] },
      { label: "Local", numbers: ["227841"] },
      { label: "Fire", numbers: ["255709"] },
    ],
  },
  {
    title: "Hospitals",
    icon: "fas fa-house-medical",
    contacts: [
      { label: "Railway KGP Division", numbers: ["292144", "292099"] },
      { label: "State", numbers: ["255610"] },
      { label: "Prembazar", numbers: ["277229"] },
    ],
  },
  {
    title: "Railway & Air Force",
    icon: "fas fa-train",
    contacts: [
      { label: "Railway Enquiry", numbers: ["139"] },
      { label: "AFS Salua", numbers: ["255701", "277240", "277267"] },
      { label: "EFR Salua", numbers: ["277237", "277338", "277239"] },
      { label: "AFS Kalaikunda", numbers: ["232176", "0364-2561461"] },
    ],
  },
];

function NumberLinks({ numbers, tone = "brand" }: { numbers: string[]; tone?: "brand" | "danger" }) {
  return (
    <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1 justify-end">
      {numbers.map((n, i) => (
        <React.Fragment key={n}>
          {i > 0 && <span className="text-gray-300 text-xs">/</span>}
          <a
            href={telHref(n)}
            className={`font-inter font-semibold text-[13px] tabular-nums no-underline transition-colors ${tone === "danger"
                ? "text-red-700 hover:text-red-900"
                : "text-gray-800 hover:text-[#FF7F00]"
              }`}
          >
            {n}
          </a>
        </React.Fragment>
      ))}
    </span>
  );
}

function DirectoryGroup({ group }: { group: Group }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-gray-100">
        <div className="w-7 h-7 rounded-md bg-[#FFF2E5] text-[#FF7F00] flex items-center justify-center text-xs shrink-0">
          <i className={group.icon}></i>
        </div>
        <h5 className="font-lexend font-semibold text-sm text-gray-900 m-0">{group.title}</h5>
      </div>
      <ul className="list-none p-0 m-0 flex flex-col">
        {group.contacts.map((c) => (
          <li
            key={c.label}
            className="flex items-center justify-between gap-3 py-1.5 border-b border-dashed border-gray-100 last:border-0"
          >
            <span className="text-xs text-gray-600 font-inter leading-snug">{c.label}</span>
            <NumberLinks numbers={c.numbers} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EmergencyContacts() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="contacts" className="mb-6 md:mb-8 rounded-lg shadow-sm border border-gray-200 bg-white overflow-hidden scroll-mt-24">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between bg-[#FF7F00] text-white px-4 py-3">
        <h3 className="font-lexend font-semibold text-lg m-0">Emergency &amp; Important Contacts</h3>
        <span className="text-[12px] font-inter text-white/90 flex items-center gap-1.5">
          <i className="fas fa-circle-info text-[11px]"></i>
          Tap any number to call
        </span>
      </div>

      {/* Mobile Accordion Header */}
      <div
        className="md:hidden bg-[#FF7F00] text-white px-4 py-3 flex justify-between items-center cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-lexend font-semibold text-lg m-0">EMERGENCY CONTACTS</h3>
        <i className={`fas fa-chevron-down transition-transform duration-300 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}></i>
      </div>

      {/* Content — animated open/close on mobile via grid-rows 0fr→1fr; untouched on desktop. */}
      <div
        className={`max-md:grid max-md:transition-[grid-template-rows] max-md:duration-300 max-md:ease-out motion-reduce:transition-none ${isOpen ? 'max-md:grid-rows-[1fr]' : 'max-md:grid-rows-[0fr]'
          }`}
      >
        <div className="max-md:overflow-hidden max-md:min-h-0">
          <div className="p-4 md:p-5 bg-[#fafafa] flex flex-col gap-5">

            {/* Emergency strip */}
            <div>
              <h4 className="font-lexend font-semibold text-base text-gray-900 mb-3 flex items-center gap-2">
                <i className="fas fa-triangle-exclamation text-red-600 text-sm"></i>
                In an emergency
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {emergency.map((c) => (
                  <div
                    key={c.label}
                    className="group flex flex-col bg-red-50 border border-red-200 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-red-400"
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center text-sm shrink-0">
                        <i className="fas fa-phone-volume"></i>
                      </div>
                      <span className="font-lexend font-semibold text-[13px] text-red-900 leading-snug">{c.label}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 mb-1.5">
                      {c.numbers.map((n, i) => (
                        <React.Fragment key={n}>
                          {i > 0 && <span className="text-red-400 font-bold text-xs">/</span>}
                          <a
                            href={telHref(n)}
                            className="font-lexend font-bold text-sm sm:text-base lg:text-[15px] xl:text-base text-red-700 tabular-nums leading-tight no-underline transition-colors"
                          >
                            {n}
                          </a>
                        </React.Fragment>
                      ))}
                    </div>
                    {c.note && <span className="text-[11px] text-red-800/70 font-inter leading-snug">{c.note}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Student support & offices */}
            <div>
              <h4 className="font-lexend font-semibold text-base text-gray-900 mb-3 flex items-center gap-2">
                <i className="fas fa-user-shield text-[#FF7F00] text-sm"></i>
                Student support &amp; offices
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {offices.map((o) => (
                  <div
                    key={o.role}
                    className="flex flex-col bg-white border border-[#FF7F00]/20 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-[#FF7F00]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FFF2E5] text-[#FF7F00] flex items-center justify-center text-sm shrink-0 mb-2.5">
                      <i className="fas fa-user-tie"></i>
                    </div>

                    <span className="font-lexend font-semibold text-[13px] text-gray-900 leading-snug mb-2">
                      {o.role}
                    </span>

                    <div className="flex flex-col mb-1.5">
                      {o.numbers.map((n) => (
                        <a
                          key={n}
                          href={telHref(n)}
                          className="inline-flex items-center max-md:min-h-11 font-lexend font-bold text-base text-[#FF7F00] hover:text-[#e06f00] tabular-nums leading-tight no-underline transition-colors"
                        >
                          {n}
                        </a>
                      ))}
                    </div>

                    {o.note && <span className="text-[11px] text-gray-500 font-inter leading-snug">{o.note}</span>}
                    {o.email && (
                      <span className="text-[11px] text-gray-500 font-inter leading-snug mt-1 break-all">{o.email}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Campus Security */}
            <div>
              <h4 className="font-lexend font-semibold text-base text-gray-900 mb-3 flex items-center gap-2">
                <i className="fas fa-shield-halved text-blue-600 text-sm"></i>
                Campus Security
                <span className="ml-auto text-[10px] font-inter font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Available 24×7
                </span>
              </h4>

              {/* Landlines */}
              <div className="mb-3">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider font-inter mb-2 flex items-center gap-1.5">
                  <i className="fas fa-phone text-[10px]"></i> Landlines
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {securityContacts
                    .filter((c) => c.type === 'landline')
                    .map((c, i) => (
                      <a
                        key={`${c.label}-${i}`}
                        href={telHref(c.number)}
                        className="group flex items-start gap-3 bg-white border border-blue-200 rounded-xl p-3.5 no-underline transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-blue-400"
                      >
                        <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <i className="fas fa-phone-volume"></i>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-lexend font-semibold text-[12px] text-gray-800 leading-snug">{c.label}</span>
                          <span className="font-lexend font-bold text-base text-blue-700 tabular-nums leading-tight mt-0.5 group-hover:text-blue-900">{c.number}</span>
                          {c.description && (
                            <span className="text-[10px] text-gray-500 font-inter leading-snug mt-1">{c.description}</span>
                          )}
                        </div>
                      </a>
                    ))}
                </div>
              </div>

              {/* Mobiles */}
              <div>
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider font-inter mb-2 flex items-center gap-1.5">
                  <i className="fas fa-mobile-screen text-[10px]"></i> Mobile Numbers
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {securityContacts
                    .filter((c) => c.type === 'mobile')
                    .map((c, i) => (
                      <a
                        key={`${c.label}-mob-${i}`}
                        href={telHref(c.number)}
                        className="group flex items-center gap-3 bg-white border border-green-200 rounded-xl p-3.5 no-underline transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-green-400"
                      >
                        <div className="w-9 h-9 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-sm shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
                          <i className="fas fa-mobile-screen-button"></i>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-lexend font-semibold text-[12px] text-gray-800 leading-snug">{c.label}</span>
                          <span className="font-lexend font-bold text-[15px] text-green-700 tabular-nums leading-tight mt-0.5 group-hover:text-green-900">{c.number}</span>
                        </div>
                      </a>
                    ))}
                </div>
              </div>

              {/* QRT note */}
              <div className="mt-3 flex items-start gap-2.5 rounded-lg bg-blue-50 border border-blue-200/60 p-3">
                <i className="fas fa-circle-info text-blue-500 text-xs mt-0.5 shrink-0"></i>
                <p className="text-[11px] text-blue-800 font-inter leading-relaxed m-0">
                  <span className="font-semibold">*QRT = Quick Response Team</span> — campus patrol available round-the-clock for any security emergency. Tap any number above to dial directly on mobile.
                </p>
              </div>
            </div>

            {/* Dialling note */}
            <div className="flex items-start gap-3 rounded-xl bg-white border border-[#FF7F00]/30 p-3.5">
              <i className="fas fa-mobile-screen-button text-[#FF7F00] text-sm mt-0.5 shrink-0"></i>
              <p className="text-xs text-gray-600 font-inter leading-relaxed m-0">
                <span className="font-semibold text-gray-800">Calling from a mobile?</span>{" "}
                Five-digit campus numbers need the prefix <span className="font-semibold text-gray-800">03222-2</span> —
                so <span className="tabular-nums">82632</span> becomes{" "}
                <span className="font-semibold text-gray-800 tabular-nums">03222-282632</span>. Six-digit town numbers
                just take <span className="font-semibold text-gray-800">03222</span>. On a campus landline, dial the
                number as printed.
              </p>
            </div>

            {/* On campus */}
            <div>
              <h4 className="font-lexend font-semibold text-base text-gray-900 mb-3 flex items-center gap-2">
                <i className="fas fa-location-dot text-[#FF7F00] text-sm"></i>
                On campus
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                {campusGroups.map((g) => (
                  <DirectoryGroup key={g.title} group={g} />
                ))}
              </div>
            </div>

            {/* Town & outside */}
            <div>
              <h4 className="font-lexend font-semibold text-base text-gray-900 mb-3 flex items-center gap-2">
                <i className="fas fa-city text-[#FF7F00] text-sm"></i>
                Kharagpur town &amp; outside
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                {townGroups.map((g) => (
                  <DirectoryGroup key={g.title} group={g} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from 'react';
import { useSearch, normalizeStr, textMatches } from "@/context/SearchContext";


const OFFICIAL_URL = "https://www.iitkgp.ac.in/scholarships";

const stats = [
  { value: "25%", label: "of each admitted batch receive MCM", icon: "fas fa-users" },
  { value: "10%", label: "additionally get tuition-fee exemption", icon: "fas fa-percent" },
  { value: "12", label: "months a year, paid from July", icon: "fas fa-calendar-check" },
  { value: "7.00", label: "minimum GPA to renew each year", icon: "fas fa-chart-simple" },
];

const schemes = [
  {
    name: "Merit-Cum-Means (MCM) Scholarship",
    icon: "fas fa-award",
    featured: true,
    tag: "Institute funded",
    summary:
      "The Institute's principal scholarship for UG and dual-degree students, awarded on combined merit and family-income criteria.",
    points: [
      "Open to 4-year B.Tech.(Hons.), 5-year Dual Degree, 5-year B.Arch.(Hons.), 5-year Integrated M.Sc. and 4-year BS students",
      "Full exemption from Institute tuition fee, plus a monthly stipend set by the Board of Governors",
      "Paid for all 12 months, July through June; other prescribed fees still apply",
      "SC/ST students eligible for their State Government's Post-Matric Scholarship are covered by that scheme instead",
    ],
  },
  {
    name: "Tuition Fee Exemption",
    icon: "fas fa-file-invoice-dollar",
    tag: "Institute funded",
    summary:
      "A fallback for students who meet the means criterion but fall short on merit — fees waived, without the stipend.",
    points: [
      "Exemption from payment of tuition fees only",
      "Restricted to 10% of the students admitted each year",
      "Means criterion applies exactly as it does for MCM",
    ],
  },
  {
    name: "Endowment & Alumni Funded Scholarships",
    icon: "fas fa-hand-holding-heart",
    tag: "Endowment funded",
    summary:
      "Awards financed by endowment funds and alumni donors, each governed by the rules of its own fund.",
    points: [
      "Several awards go to the \"best student\" — the highest CGPA in the immediately preceding semester within a batch",
      "Individual eligibility and value vary fund by fund",
      "See the official page for the full list of endowments and their conditions",
    ],
  },
];

const criteria = [
  {
    title: "Merit criterion",
    icon: "fas fa-star",
    items: [
      "Fresh entrants: at least 60% aggregate (or equivalent grade) in the qualifying examination for JEE Advanced",
      "Renewals: GPA of at least 7.00 across the two semesters of the preceding session, as updated after supplementary/summer quarter exams",
    ],
  },
  {
    title: "Means criterion",
    icon: "fas fa-indian-rupee-sign",
    items: [
      "Annual family income within the upper limit laid down by the Government of India",
      "Income for the financial year completed before the session commences is what counts",
      "Submit an income certificate, both parents' income tax returns, or an income affidavit with every application and renewal",
    ],
  },
  {
    title: "Good standing",
    icon: "fas fa-shield-halved",
    items: [
      "No disciplinary action taken or pending during the preceding year",
      "No record of examination malpractice or code-of-conduct violation",
      "Maintain attendance and appear in all semester examinations, barring illness or family calamity",
    ],
  },
];

const goodToKnow = [
  {
    icon: "fas fa-circle-info",
    text: "You may hold only one scholarship at a time. If you become eligible for another, tell the Dean Undergraduate Studies in writing which one you choose.",
  },
  {
    icon: "fas fa-handshake-angle",
    text: "If two or more students tie for the last available scholarship, every student in the tie is awarded it — even if that pushes the count past the 25% limit.",
  },
  {
    icon: "fas fa-graduation-cap",
    text: "Institute scholarships are not blocked by an incomplete EAA requirement (Senate 322.H.I.C.5).",
  },
  {
    icon: "fas fa-arrow-rotate-left",
    text: "Scholarships resume on re-joining after a temporary withdrawal on medical or family-calamity grounds, subject to eligibility and approval (Senate 328.H.I.C.6).",
  },
  {
    icon: "fas fa-receipt",
    text: "Outstanding Institute and Hall dues may be deducted at source before the balance is paid out.",
  },
  {
    icon: "fas fa-triangle-exclamation",
    text: "False documents or suppressed information stop the scholarship immediately and trigger an inquiry by the Standing Disciplinary Committee.",
  },
];

const related = [
  { title: "Assistantships", desc: "PG & research assistantship rules", url: "https://www.iitkgp.ac.in/assistantships", icon: "fas fa-flask" },
  { title: "PMRF", desc: "Prime Minister's Research Fellowship", url: "https://www.iitkgp.ac.in/pmrf", icon: "fas fa-user-graduate" },
  { title: "Student Brotherhood Fund", desc: "Peer-supported financial assistance", url: "https://www.iitkgp.ac.in/student-brotherhood-fund", icon: "fas fa-people-group" },
  { title: "Prizes, Medals & Awards", desc: "Institute honours and citations", url: "https://www.iitkgp.ac.in/prize-medals-awards", icon: "fas fa-medal" },
];

export default function Scholarships() {
  const [isOpen, setIsOpen] = useState(false);
  const { query } = useSearch();
  const q = query.trim().toLowerCase();
  const qn = normalizeStr(q);
  const match = (text: string) => textMatches(text, q, qn);

  const sectionKeywords = ["scholarship", "mcm", "merit", "tuition", "fee", "stipend", "endowment",
    "alumni", "assistantship", "pmrf", "fellowship", "award", "medal", "prize", "financial"];
  const sectionVisible = qn === "" ||
    sectionKeywords.some(k => match(k)) ||
    schemes.some(s => match(s.name) || match(s.summary) || s.points.some(p => match(p))) ||
    criteria.some(c => match(c.title) || c.items.some(i => match(i))) ||
    goodToKnow.some(g => match(g.text)) ||
    related.some(r => match(r.title) || match(r.desc));

  if (!sectionVisible) return null;

  return (
    <div id="scholarships" className="mb-6 md:mb-8 rounded-lg shadow-sm border border-gray-200 bg-white overflow-hidden scroll-mt-24">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between bg-[#FF7F00] text-white px-4 py-3">
        <h3 className="font-lexend font-semibold text-lg m-0">Scholarships &amp; Financial Aid</h3>
        <a
          href={OFFICIAL_URL}
          className="text-[13px] font-inter font-semibold text-white/95 hover:text-white no-underline flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-white/20 transition-colors"
        >
          Official page
          <i className="fas fa-arrow-up-right-from-square text-[11px]"></i>
        </a>
      </div>

      {/* Mobile Accordion Header */}
      <div
        className="md:hidden bg-[#FF7F00] text-white px-4 py-3 flex justify-between items-center cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-lexend font-semibold text-lg m-0">SCHOLARSHIPS</h3>
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

          {/* Intro + stat strip */}
          <div>
            <p className="text-sm sm:text-base text-gray-600 font-inter leading-relaxed m-0 mb-4 max-w-3xl">
              IIT Kharagpur funds its students through Institute scholarships awarded on merit-cum-means, plus a
              wide set of endowment and alumni-funded awards. Here are the essentials — the official page carries
              the complete, authoritative rules.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white border border-[#FF7F00]/20 rounded-xl p-3.5 flex flex-col items-start"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#FFF2E5] text-[#FF7F00] flex items-center justify-center text-sm mb-2.5">
                    <i className={s.icon}></i>
                  </div>
                  <span className="font-lexend font-bold text-2xl text-gray-900 leading-none mb-1.5">{s.value}</span>
                  <span className="text-xs sm:text-[13px] text-gray-500 font-inter leading-snug">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scheme cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {schemes.map((sch) => (
              <div
                key={sch.name}
                className={`flex flex-col bg-white rounded-xl p-4 border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                  sch.featured
                    ? 'border-[#FF7F00]/50 shadow-sm ring-1 ring-[#FF7F00]/10'
                    : 'border-gray-200 hover:border-[#FF7F00]/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FFF2E5] text-[#FF7F00] flex items-center justify-center text-xl shrink-0">
                    <i className={sch.icon}></i>
                  </div>
                  <span className="text-xs font-inter font-semibold uppercase tracking-wider text-[#FF7F00] bg-[#FFF2E5] px-2.5 py-1 rounded-full whitespace-nowrap">
                    {sch.tag}
                  </span>
                </div>

                <h4 className="font-lexend font-semibold text-base text-gray-900 mb-1.5 leading-snug">{sch.name}</h4>
                <p className="text-sm text-gray-500 font-inter leading-relaxed m-0 mb-3">{sch.summary}</p>

                <ul className="list-none p-0 m-0 flex flex-col gap-2 mt-auto">
                  {sch.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 font-inter leading-relaxed">
                      <i className="fas fa-check text-[#FF7F00] text-xs mt-1 shrink-0"></i>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Eligibility */}
          <div>
            <h4 className="font-lexend font-semibold text-base text-gray-900 mb-3 flex items-center gap-2">
              <i className="fas fa-list-check text-[#FF7F00] text-sm"></i>
              Do you qualify?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {criteria.map((c) => (
                <div key={c.title} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-gray-100">
                    <div className="w-7 h-7 rounded-md bg-[#FFF2E5] text-[#FF7F00] flex items-center justify-center text-xs shrink-0">
                      <i className={c.icon}></i>
                    </div>
                    <h5 className="font-lexend font-semibold text-sm text-gray-900 m-0">{c.title}</h5>
                  </div>
                  <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                    {c.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 font-inter leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF7F00]/60 mt-1.5 shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Good to know */}
          <div>
            <h4 className="font-lexend font-semibold text-base text-gray-900 mb-3 flex items-center gap-2">
              <i className="fas fa-lightbulb text-[#FF7F00] text-sm"></i>
              Good to know
            </h4>
            <div className="bg-white border border-gray-200 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              {goodToKnow.map((g, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <i className={`${g.icon} text-[#FF7F00] text-xs mt-0.5 shrink-0 w-4 text-center`}></i>
                  <p className="text-xs sm:text-sm text-gray-600 font-inter leading-relaxed m-0">{g.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related links */}
          <div>
            <h4 className="font-lexend font-semibold text-base text-gray-900 mb-3 flex items-center gap-2">
              <i className="fas fa-link text-[#FF7F00] text-sm"></i>
              Related funding &amp; recognition
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {related.map((r) => (
                <a
                  key={r.title}
                  href={r.url}
                  className="group flex items-center gap-3 bg-white border border-[#FF7F00]/20 rounded-xl p-3 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-[#FF7F00] no-underline"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#FFF2E5] text-[#FF7F00] flex items-center justify-center text-base shrink-0 group-hover:bg-[#FF7F00] group-hover:text-white transition-colors">
                    <i className={r.icon}></i>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 font-inter text-sm m-0 group-hover:text-[#FF7F00] truncate">{r.title}</p>
                    <p className="text-xs text-gray-500 font-inter leading-snug m-0 truncate">{r.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-xl bg-gradient-to-r from-[#FF7F00] to-[#ff9e3d] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
            <div>
              <p className="font-lexend font-semibold text-white text-base m-0 mb-1">Read the complete rules</p>
              <p className="text-sm text-white/90 font-inter leading-relaxed m-0">
                Full scholarship regulations, endowment list and application conditions live on the Institute site.
                For queries, contact the Dean, Undergraduate Studies.
              </p>
            </div>
            <a
              href={OFFICIAL_URL}
              className="shrink-0 inline-flex items-center justify-center gap-2 bg-white text-[#FF7F00] font-inter font-semibold text-sm px-5 py-2.5 rounded-full no-underline shadow-sm hover:bg-orange-50 transition-colors"
            >
              Visit scholarships page
              <i className="fas fa-arrow-up-right-from-square text-xs"></i>
            </a>
          </div>

        </div>
        </div>
      </div>
    </div>
  );
}

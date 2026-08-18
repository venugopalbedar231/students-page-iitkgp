"use client";
import React, { useState } from 'react';
import { useSearch, normalizeStr, textMatches } from "@/context/SearchContext";


const PORTAL_URL = "https://erp.iitkgp.ac.in/DupCertReqPortal/auth/welcome.htm";
const ERP_URL = "https://erp.iitkgp.ac.in";
const FEE_PAYMENT_URL = "https://erp.iitkgp.ac.in/SupplierFacilities/feePaymentPageView.htm";

const services = [
  {
    title: "Degree Verification",
    icon: "fas fa-user-check",
    badge: "Verification",
    desc: "Online verification of educational qualifications and degree awards for employers, embassies, and universities worldwide.",
    url: PORTAL_URL,
    actionText: "Verify Degree",
  },
  {
    title: "Official Transcripts",
    icon: "fas fa-file-lines",
    badge: "Transcripts",
    desc: "Request certified, official academic transcripts and grade sheets for higher studies abroad, job applications, or immigration.",
    url: PORTAL_URL,
    actionText: "Request Transcripts",
  },
  {
    title: "Duplicate Certificates",
    icon: "fas fa-certificate",
    badge: "Certificates",
    desc: "Apply for duplicate degree certificates, provisional certificates, or migration certificates in case of loss or damage.",
    url: PORTAL_URL,
    actionText: "Apply for Certificate",
  },
];

const steps = [
  {
    num: "1",
    title: "Access the Portal",
    desc: "Open the ERP Certificate & Transcript Request Portal using your Roll Number or registration details.",
  },
  {
    num: "2",
    title: "Select Service",
    desc: "Choose from Degree Verification, Transcript Issuance, or Duplicate Certificate request.",
  },
  {
    num: "3",
    title: "Upload & Pay",
    desc: "Upload required ID proofs/documents and complete payment of prescribed fees through the portal.",
  },
  {
    num: "4",
    title: "Track Dispatch",
    desc: "Monitor your application status and postal tracking number until delivery at your designated address.",
  },
];

export default function AlumniServices() {
  const [isOpen, setIsOpen] = useState(false);
  const { query } = useSearch();
  const q = query.trim().toLowerCase();
  const qn = normalizeStr(q);
  const match = (text: string) => textMatches(text, q, qn);

  const sectionKeywords = ["alumni", "transcript", "certificate", "degree", "verification",
    "duplicate", "erp", "portal", "dispatch", "convocation"];
  const sectionVisible = qn === "" ||
    sectionKeywords.some(k => match(k)) ||
    services.some(s => match(s.title) || match(s.desc)) ||
    steps.some(s => match(s.title) || match(s.desc));

  if (!sectionVisible) return null;

  return (
    <div
      id="alumni-services"
      className="mb-6 md:mb-8 rounded-lg shadow-sm border border-gray-200 bg-white overflow-hidden scroll-mt-24"
    >
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between bg-[#FF7F00] text-white px-4 py-3">
        <div className="flex items-center gap-2.5">
          <i className="fas fa-graduation-cap text-lg"></i>
          <h3 className="font-lexend font-semibold text-lg m-0">
            Alumni: Degree Verification / Transcripts / Certificates
          </h3>
        </div>
        <a
          href={PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] font-inter font-semibold text-white/95 hover:text-white no-underline flex items-center gap-1.5 px-3 py-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <span>ERP Portal</span>
          <i className="fas fa-arrow-up-right-from-square text-[11px]"></i>
        </a>
      </div>

      {/* Mobile Accordion Header */}
      <div
        className="md:hidden bg-[#FF7F00] text-white px-4 py-3 flex justify-between items-center cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <i className="fas fa-graduation-cap text-base shrink-0"></i>
          <h3 className="font-lexend font-semibold text-base sm:text-lg m-0 truncate">
            ALUMNI &amp; VERIFICATION
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
            {/* Intro text */}
            <div>
              <p className="text-sm sm:text-base text-gray-600 font-inter leading-relaxed m-0 max-w-3xl">
                Alumni and passed-out students can request duplicate degree certificates, official transcripts,
                migration certificates, and degree verifications online directly through the IIT Kharagpur ERP portal.
              </p>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="flex flex-col bg-white border border-gray-200 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-[#FF7F00]/50"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FFF2E5] text-[#FF7F00] flex items-center justify-center text-lg shrink-0">
                      <i className={s.icon}></i>
                    </div>
                    <span className="text-[11px] font-inter font-semibold uppercase tracking-wider text-[#FF7F00] bg-[#FFF2E5] px-2.5 py-0.5 rounded-full">
                      {s.badge}
                    </span>
                  </div>

                  <h4 className="font-lexend font-semibold text-base text-gray-900 m-0 mb-1.5 leading-snug">
                    {s.title}
                  </h4>
                  <p className="text-sm text-gray-500 font-inter leading-relaxed m-0 mb-4 flex-grow">
                    {s.desc}
                  </p>

                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#FFF2E5] hover:bg-[#FF7F00] text-[#FF7F00] hover:text-white font-inter font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg no-underline transition-all mt-auto"
                  >
                    <span>{s.actionText}</span>
                    <i className="fas fa-arrow-right text-xs"></i>
                  </a>
                </div>
              ))}
            </div>

            {/* How It Works Strip */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5">
              <h4 className="font-lexend font-semibold text-sm sm:text-base text-gray-900 mb-3.5 flex items-center gap-2">
                <i className="fas fa-list-ol text-[#FF7F00] text-sm"></i>
                How to Request Online
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {steps.map((st) => (
                  <div
                    key={st.num}
                    className="flex flex-col p-3 rounded-lg bg-[#fafafa] border border-gray-100"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#FF7F00] text-white text-xs font-bold font-inter flex items-center justify-center shrink-0">
                        {st.num}
                      </span>
                      <h5 className="font-lexend font-semibold text-sm text-gray-800 m-0 truncate">
                        {st.title}
                      </h5>
                    </div>
                    <p className="text-xs text-gray-500 font-inter leading-relaxed m-0">
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links & Related Portals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={ERP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 bg-white border border-gray-200 hover:border-[#FF7F00]/60 rounded-xl p-3.5 transition-all duration-200 hover:shadow-md no-underline"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FFF2E5] text-[#FF7F00] group-hover:bg-[#FF7F00] group-hover:text-white flex items-center justify-center text-base shrink-0 transition-colors">
                  <i className="fas fa-network-wired"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 font-inter text-sm m-0 group-hover:text-[#FF7F00] truncate">
                    IIT Kharagpur ERP Home
                  </p>
                  <p className="text-xs text-gray-500 font-inter m-0 truncate">
                    erp.iitkgp.ac.in
                  </p>
                </div>
                <i className="fas fa-external-link-alt text-xs text-gray-400 group-hover:text-[#FF7F00] shrink-0 mr-1"></i>
              </a>

              <a
                href={FEE_PAYMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 bg-white border border-gray-200 hover:border-[#FF7F00]/60 rounded-xl p-3.5 transition-all duration-200 hover:shadow-md no-underline"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FFF2E5] text-[#FF7F00] group-hover:bg-[#FF7F00] group-hover:text-white flex items-center justify-center text-base shrink-0 transition-colors">
                  <i className="fas fa-credit-card"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 font-inter text-sm m-0 group-hover:text-[#FF7F00] truncate">
                    Fee Payment (Passed-out Students)
                  </p>
                  <p className="text-xs text-gray-500 font-inter m-0 truncate">
                    Online payments for academic documents
                  </p>
                </div>
                <i className="fas fa-external-link-alt text-xs text-gray-400 group-hover:text-[#FF7F00] shrink-0 mr-1"></i>
              </a>
            </div>

            {/* CTA Banner */}
            <div className="rounded-xl bg-gradient-to-r from-[#FF7F00] to-[#ff9e3d] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
              <div>
                <p className="font-lexend font-semibold text-white text-base m-0 mb-1">
                  Need Degree Verification or Transcripts?
                </p>
                <p className="text-sm text-white/95 font-inter leading-relaxed m-0 max-w-xl">
                  Visit the dedicated online portal on ERP to submit verification requests and apply for official documents.
                </p>
              </div>
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-white text-[#FF7F00] hover:bg-orange-50 font-inter font-semibold text-sm px-5 py-2.5 rounded-full no-underline shadow-sm transition-colors"
              >
                <span>Open Request Portal</span>
                <i className="fas fa-arrow-up-right-from-square text-xs"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

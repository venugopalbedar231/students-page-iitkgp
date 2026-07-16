"use client";
import React, { useState } from 'react';

/**
 * Real posts from the Institute and Gymkhana Instagram accounts, newest first. Summaries are
 * condensed from the original captions — see /public/news for the accompanying images.
 *
 * `href` points at the source account, not the individual post: permalinks weren't available
 * when this was written. Swap in the real post URLs when you have them.
 */

const ACCOUNTS = {
  tsg: { handle: "tsg.iitkharagpur", url: "https://www.instagram.com/tsg.iitkharagpur/" },
  inst: { handle: "iit.kgp", url: "https://www.instagram.com/iit.kgp/" },
} as const;

type NewsItem = {
  id: number;
  title: string;
  date: string;
  iso: string;
  desc: string;
  img: string;
  alt: string;
  account: keyof typeof ACCOUNTS;
};

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Nasha Mukt Bharat pledge at LBS Hall",
    date: "26 Jun 2026",
    iso: "2026-06-26",
    desc: "Students pledged to stand against substance abuse at a ceremony graced by the Dean of Student Wellbeing and the Dean of Hall Management.",
    img: "/news/nasha-mukt-bharat.jpg",
    alt: "Students and faculty holding a Nasha Mukt Bharat Abhiyaan banner at LBS Hall",
    account: "inst",
  },
  {
    id: 2,
    title: "Over 400 join the 12th International Day of Yoga",
    date: "21 Jun 2026",
    iso: "2026-06-21",
    desc: "Students, faculty, staff and residents marked #YogaForHealthyAgeing with asanas and performances by children aged 6–11, organised by TSG.",
    img: "/news/yoga-day-2026.jpg",
    alt: "Hundreds of participants seated on yoga mats across a green ground at IIT Kharagpur",
    account: "inst",
  },
  {
    id: 3,
    title: "IIT Kharagpur secures 6th overall in NIRF 2025",
    date: "5 Sep 2025",
    iso: "2025-09-05",
    desc: "The Institute placed 5th in Engineering and Research, 4th in Innovation and 3rd in Architecture in the Ministry of Education's rankings.",
    img: "/news/nirf-2025.jpg",
    alt: "India Rankings 2025 graphic showing IIT Kharagpur's NIRF positions",
    account: "inst",
  },
  {
    id: 4,
    title: "75th Foundation Day — Platinum Jubilee",
    date: "18 Aug 2025",
    iso: "2025-08-18",
    desc: "The journey that began at the Hijli Detention Camp in 1951 turned 75, marking the Platinum Jubilee of the nation's first IIT.",
    img: "/news/foundation-day-75.jpg",
    alt: "75th Foundation Day poster showing the IIT Kharagpur main building",
    account: "tsg",
  },
];

export default function NewsSidebar() {
  const [showAllMobile, setShowAllMobile] = useState(false);

  return (
    <>
      {/* Mobile Horizontal Ticker */}
      <div className="md:hidden bg-white border-y border-gray-200 relative z-30 shadow-sm">
        <div className="flex items-center px-4 py-2">
          <span className="text-xs font-bold font-lexend text-[#FF7F00] shrink-0 mr-2 uppercase tracking-wide">News & Updates:</span>
          <div className="flex-1 overflow-hidden">
            <div className="whitespace-nowrap animate-marquee flex gap-4">
              {newsItems.map((item) => (
                <a
                  key={item.id}
                  href={ACCOUNTS[item.account].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-inter text-gray-700 hover:text-[#FF7F00] transition-colors"
                  style={{ textDecoration: 'none' }}
                >
                  {item.title} <span className="mx-2 text-gray-300">|</span>
                </a>
              ))}
            </div>
          </div>
          <button onClick={() => setShowAllMobile(!showAllMobile)} className="shrink-0 ml-2 text-xs font-semibold text-[#FF7F00] hover:text-[#e06f00] font-inter">
            View All <i className="fas fa-caret-down"></i>
          </button>
        </div>

        {showAllMobile && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg border-b border-gray-200 z-50 max-h-80 overflow-y-auto">
            {newsItems.map(item => (
              <a
                key={item.id}
                href={ACCOUNTS[item.account].url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                style={{ textDecoration: 'none' }}
              >
                <div className="flex justify-between items-center gap-3">
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm text-[#FF7F00] font-inter m-0">{item.title}</h4>
                    <time dateTime={item.iso} className="text-[11px] text-gray-400 font-inter">{item.date}</time>
                  </div>
                  <i className="fas fa-angle-right text-gray-400 shrink-0"></i>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Vertical Sidebar */}
      <div className="hidden md:flex flex-col h-full rounded-lg shadow-sm bg-white overflow-hidden border border-gray-200">
        <div className="bg-[#FF7F00] text-white px-4 py-3 shrink-0">
          <h3 className="font-lexend font-semibold text-base xl:text-lg m-0 whitespace-nowrap tracking-tight truncate">News & Announcements</h3>
        </div>
        <div className="overflow-y-auto flex-1 p-3 space-y-4 custom-scrollbar">
          {newsItems.map((item) => (
            <a
              key={item.id}
              href={ACCOUNTS[item.account].url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:border-[#FF7F00]/40 transition-all no-underline"
            >
              <div className="h-32 bg-gray-100 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-[15px] font-lexend text-gray-900 leading-tight mb-1 group-hover:text-[#FF7F00] transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1.5 mb-2 text-[11px] text-gray-500 font-inter">
                  <i className="fab fa-instagram text-[#FF7F00]"></i>
                  <span className="truncate">{ACCOUNTS[item.account].handle}</span>
                  <span className="text-gray-300">·</span>
                  <time dateTime={item.iso} className="whitespace-nowrap">{item.date}</time>
                </div>
                <p className="text-xs text-gray-700 font-inter leading-relaxed line-clamp-2 m-0">{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #aaa;
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </>
  );
}

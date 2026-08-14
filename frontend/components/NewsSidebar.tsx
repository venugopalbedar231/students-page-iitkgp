"use client";
import React, { useState, useEffect } from 'react';

const ACCOUNTS = {
  tsg: { handle: "tsg.iitkharagpur", url: "https://www.instagram.com/tsg.iitkharagpur/" },
  inst: { handle: "iit.kgp", url: "https://www.instagram.com/iit.kgp/" },
} as const;

export type NewsItem = {
  id: number;
  title: string;
  date: string;
  iso: string;
  desc: string;
  img: string;
  alt: string;
  account: keyof typeof ACCOUNTS;
  category?: string;
};

const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Nasha Mukt Bharat pledge at LBS Hall",
    date: "26 Jun 2026",
    iso: "2026-06-26",
    desc: "Students pledged to stand against substance abuse at a ceremony graced by the Dean of Student Wellbeing and the Dean of Hall Management.",
    img: "/news/nasha-mukt-bharat.jpg",
    alt: "Students and faculty holding a Nasha Mukt Bharat Abhiyaan banner at LBS Hall",
    account: "inst",
    category: "General",
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
    category: "Event",
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
    category: "Academic",
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
    category: "Event",
  },
];

export default function NewsSidebar() {
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>(DEFAULT_NEWS);

  const handleNewsWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const scrollableDiv = e.currentTarget.querySelector('.overflow-y-auto') as HTMLDivElement | null;
    if (!scrollableDiv) return;

    if (!scrollableDiv.contains(e.target as Node)) {
      scrollableDiv.scrollTop += e.deltaY;
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = scrollableDiv;
    const delta = e.deltaY;
    const isAtTop = scrollTop <= 0 && delta < 0;
    const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight && delta > 0;

    if (isAtTop || isAtBottom) {
      e.preventDefault();
    }
    e.stopPropagation();
  };

  useEffect(() => {
    async function fetchNotices() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/notices`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setNewsItems(json.data.map((item: any) => ({
              ...item,
              account: (item.account === 'tsg' ? 'tsg' : 'inst') as keyof typeof ACCOUNTS,
            })));
          }
        }
      } catch (err) {
        console.warn("Could not fetch notices from backend API, using fallback notices", err);
      }
    }
    fetchNotices();
  }, []);

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
                  href={ACCOUNTS[item.account]?.url || "https://www.instagram.com/iit.kgp/"}
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
                href={ACCOUNTS[item.account]?.url || "https://www.instagram.com/iit.kgp/"}
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
      <div
        onWheel={handleNewsWheel}
        className="hidden md:flex flex-col h-full rounded-lg shadow-sm bg-white overflow-hidden border border-gray-200 overscroll-contain"
      >
        <div className="bg-[#FF7F00] text-white px-4 py-3 shrink-0 flex justify-between items-center select-none">
          <h3 className="font-lexend font-semibold text-base xl:text-lg m-0 whitespace-nowrap tracking-tight truncate">News & Announcements</h3>
          <span className="text-xs font-inter bg-white/20 px-2 py-0.5 rounded-full">{newsItems.length}</span>
        </div>
        <div className="overflow-y-auto flex-1 p-3 space-y-4 custom-scrollbar overscroll-contain">
          {newsItems.map((item) => (
            <a
              key={item.id}
              href={ACCOUNTS[item.account]?.url || "https://www.instagram.com/iit.kgp/"}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:border-[#FF7F00]/40 transition-all no-underline"
            >
              <div className="h-32 bg-gray-100 overflow-hidden relative">
                <img
                  src={item.img || "/news/nasha-mukt-bharat.jpg"}
                  alt={item.alt || item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=600&auto=format&fit=crop&q=60';
                  }}
                />
                {item.category && (
                  <span className="absolute top-2 right-2 text-xs uppercase tracking-wider font-semibold font-inter bg-[#FF7F00] text-white px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-bold text-[15px] font-lexend text-gray-900 leading-tight mb-1 group-hover:text-[#FF7F00] transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1.5 mb-2 text-xs text-gray-500 font-inter">
                  <i className="fab fa-instagram text-[#FF7F00]"></i>
                  <span className="truncate">{ACCOUNTS[item.account]?.handle || "iit.kgp"}</span>
                  <span className="text-gray-300">·</span>
                  <time dateTime={item.iso} className="whitespace-nowrap">{item.date}</time>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-inter leading-relaxed line-clamp-2 m-0">{item.desc}</p>
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

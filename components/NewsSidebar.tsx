"use client";
import React, { useState } from 'react';

const newsItems = [
  { id: 1, title: "Convocation 2024 Postponed", date: "11 Apr. 2024", desc: "Convocation 2024 Postponed - The Convocation 2024 Postponed is...", img: "https://www.iitkgp.ac.in/assets/images/about-header-banner.jpg" },
  { id: 2, title: "New Research Grant Announced", date: "11 Apr. 2024", desc: "New Research Grant Announced on New Research Grant Announc...", img: "https://www.iitkgp.ac.in/assets/images/about-header-banner.jpg" },
  { id: 3, title: "Career Fair: Top Recruiters Visiting", date: "11 Apr. 2024", desc: "Career Fair: Top Recruiters Visiting in career Pak: Top Recruiters inn visiting...", img: "https://www.iitkgp.ac.in/assets/images/about-header-banner.jpg" },
  { id: 4, title: "Student Elections: Vote Now", date: "11 Apr. 2024", desc: "Student Elections: Vote Now - and wanting to meet our orints and sale...", img: "https://www.iitkgp.ac.in/assets/images/about-header-banner.jpg" },
  { id: 5, title: "Ads: Campus Merchandise Sale", date: "11 Nov 2024", desc: "Ads: Campus Merchandise Sale in airconnpers campus merchandise ilc...", img: "https://www.iitkgp.ac.in/assets/images/about-header-banner.jpg" },
  { id: 6, title: "Library Extended Hours during Exams", date: "11 Nov 2024", desc: "Library Extended Hours during Exams meragement of ompus sepan-ond-6-tow...", img: "https://www.iitkgp.ac.in/assets/images/about-header-banner.jpg" },
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
              {newsItems.map((item, idx) => (
                <a key={item.id} href="#" className="text-sm font-inter text-gray-700 hover:text-[#FF7F00] transition-colors" style={{ textDecoration: 'none' }}>
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
              <a key={item.id} href="#" className="block p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors" style={{ textDecoration: 'none' }}>
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm text-[#FF7F00] font-inter">{item.title}</h4>
                  <i className="fas fa-angle-right text-gray-400"></i>
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
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className="h-32 bg-gray-200 overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-[15px] font-lexend text-gray-900 leading-tight mb-1">{item.title}</h4>
                <span className="text-[11px] text-gray-500 font-inter mb-2 block">{item.date}</span>
                <p className="text-xs text-gray-700 font-inter leading-relaxed line-clamp-2 m-0">{item.desc}</p>
              </div>
            </div>
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

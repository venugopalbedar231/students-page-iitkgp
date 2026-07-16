"use client";
import React, { useState } from 'react';

type LinkItem = {
  title: string;
  desc: string;
  icon: string;
  url: string;
};

interface ResourceCategoryProps {
  title: string;
  links: LinkItem[];
  defaultOpen?: boolean;
}

export default function ResourceCategory({ title, links, defaultOpen = false }: ResourceCategoryProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-6 md:mb-8 rounded-lg shadow-sm border border-gray-200 bg-white overflow-hidden">
      {/* Desktop Header */}
      <div className="hidden md:block bg-[#FF7F00] text-white px-4 py-3">
        <h3 className="font-lexend font-semibold text-lg m-0">{title}</h3>
      </div>
      
      {/* Mobile Accordion Header */}
      <div 
        className="md:hidden bg-[#FF7F00] text-white px-4 py-3 flex justify-between items-center cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Drop the "(UG)"/"(PG)" parenthetical, but keep multi-word titles intact. */}
        <h3 className="font-lexend font-semibold text-lg m-0">FOR {title.replace(/\s*\([^)]*\)/g, '')}</h3>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} transition-transform duration-300`}></i>
      </div>

      {/* Content */}
      <div className={`md:block ${isOpen ? 'block' : 'hidden'}`}>
        <div className="p-4 md:p-5 bg-[#fafafa]">
          {/* Desktop Grid View */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {links.map((link, idx) => (
              <a 
                key={idx} 
                href={link.url}
                className="group flex flex-col bg-white border border-[#FF7F00]/20 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#FF7F00]"
                style={{ textDecoration: 'none' }}
              >
                <div className="w-10 h-10 rounded-lg bg-[#FFF2E5] text-[#FF7F00] flex items-center justify-center text-xl mb-3 group-hover:bg-[#FF7F00] group-hover:text-white transition-colors">
                  <i className={link.icon}></i>
                </div>
                <h4 className="font-semibold text-gray-900 font-inter text-sm mb-1 group-hover:text-[#FF7F00]">{link.title}</h4>
                <p className="text-xs text-gray-500 font-inter leading-relaxed m-0">{link.desc}</p>
              </a>
            ))}
          </div>

          {/* Mobile List View */}
          <div className="md:hidden flex flex-col gap-2">
            {links.map((link, idx) => (
              <a 
                key={idx} 
                href={link.url}
                className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm active:bg-gray-50"
                style={{ textDecoration: 'none' }}
              >
                <div className="text-[#FF7F00] text-lg w-6 text-center">
                  <i className={link.icon}></i>
                </div>
                <span className="font-semibold text-sm text-gray-800 font-inter">{link.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

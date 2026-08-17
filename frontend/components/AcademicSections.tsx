"use client";

import React, { useState, useEffect } from "react";
import ResourceCategory from "./ResourceCategory";
import { getApiUrl } from "@/lib/api";

export type LinkItem = {
  title: string;
  desc: string;
  icon: string;
  url: string;
  order?: number;
  id?: number;
};

export type ApiResource = {
  id: number;
  category: string;
  title: string;
  description: string;
  link: string;
  icon: string | null;
  order: number;
};

export const fallbackUgLinks: LinkItem[] = [
  { title: "Curriculum", icon: "fas fa-book", url: "https://www.iitkgp.ac.in/curricula-ug", desc: "View semester-wise course structures" },
  { title: "Academic Calendar", icon: "fas fa-calendar-days", url: "https://www.iitkgp.ac.in/academic-calendar-ug", desc: "Important dates and deadlines" },
  { title: "UG Manual & Regulations", icon: "fas fa-file-contract", url: "https://www.iitkgp.ac.in/assets/pdf/UG_Manual.pdf", desc: "Official student guide & policies" },
  { title: "ERP Portal", icon: "fas fa-laptop-code", url: "https://erp.iitkgp.ac.in", desc: "View the new ERP Portal" },
  { title: "Course Registration", icon: "fas fa-pen-to-square", url: "https://erp.iitkgp.ac.in", desc: "View semester-registration" },
  { title: "Examinations & Results", icon: "fas fa-clipboard-check", url: "https://erp.iitkgp.ac.in", desc: "View examinations & results" },
];

export const fallbackPgLinks: LinkItem[] = [
  { title: "M.Tech Curriculum", icon: "fas fa-graduation-cap", url: "https://www.iitkgp.ac.in/curricula-pg", desc: "View M.Tech & MS curriculum" },
  { title: "Thesis Guidelines", icon: "fas fa-scroll", url: "#", desc: "Submission norms and formats" },
  { title: "Research Facilities", icon: "fas fa-microscope", url: "https://www.iitkgp.ac.in/navpage/research", desc: "Labs and central facilities" },
  { title: "Funding Opportunities", icon: "fas fa-hand-holding-dollar", url: "https://www.iitkgp.ac.in/scholarships", desc: "Scholarships and assistantships" },
  { title: "Ph.D. Admission", icon: "fas fa-user-graduate", url: "https://www.iitkgp.ac.in/phd-admission", desc: "Admission calendar for Ph.D." },
  { title: "PG Academic Calendar", icon: "fas fa-calendar-days", url: "#", desc: "Important dates and deadlines" },
];

export const fallbackPhdLinks: LinkItem[] = [
  { title: "Doctoral Research Manual", icon: "fas fa-book", url: "#", desc: "View doctoral research manual" },
  { title: "Guide Allocation", icon: "fas fa-chalkboard-user", url: "#", desc: "Supervisor allocation process" },
  { title: "Progress Monitoring", icon: "fas fa-chart-line", url: "#", desc: "Track research progress" },
  { title: "Conference Support", icon: "fas fa-plane-departure", url: "#", desc: "Travel grants and support" },
  { title: "Fellowship Information", icon: "fas fa-award", url: "https://www.iitkgp.ac.in/scholarships", desc: "Fellowship information" },
  { title: "Important Forms", icon: "fas fa-file-lines", url: "#", desc: "Downloadable forms" },
];

function normalizeCategory(raw: string): "ug" | "pg" | "phd" | null {
  const cat = raw.toLowerCase().trim();
  if (cat === "ug" || cat === "undergraduate" || cat.includes("undergrad")) return "ug";
  if (cat === "pg" || cat === "postgraduate" || cat.includes("postgrad") || cat.includes("mtech") || cat.includes("ms")) return "pg";
  if (cat === "phd" || cat === "rs" || cat === "research" || cat.includes("scholar") || cat.includes("doctoral")) return "phd";
  return null;
}

interface AcademicSectionsProps {
  initialUg?: LinkItem[];
  initialPg?: LinkItem[];
  initialPhd?: LinkItem[];
}

export default function AcademicSections({
  initialUg = fallbackUgLinks,
  initialPg = fallbackPgLinks,
  initialPhd = fallbackPhdLinks,
}: AcademicSectionsProps) {
  const [ugLinks, setUgLinks] = useState<LinkItem[]>(initialUg);
  const [pgLinks, setPgLinks] = useState<LinkItem[]>(initialPg);
  const [phdLinks, setPhdLinks] = useState<LinkItem[]>(initialPhd);
  const [query, setQuery] = useState<string>("");

  // Strip dots, spaces, hyphens for fuzzy matching (e.g. "mtech" == "m.tech" == "m tech")
  const normalize = (s: string) => s.toLowerCase().replace(/[\s.\-]/g, "");

  const q = query.trim().toLowerCase();
  const qn = normalize(q); // normalized query

  const matchText = (text: string) =>
    text.toLowerCase().includes(q) || normalize(text).includes(qn);

  const filterLinks = (links: LinkItem[]) =>
    qn === ""
      ? links
      : links.filter(
          (l) => matchText(l.title) || matchText(l.desc ?? "")
        );

  const filteredUg = filterLinks(ugLinks);
  const filteredPg = filterLinks(pgLinks);
  const filteredPhd = filterLinks(phdLinks);

  // A section is visible if it has matching links OR its title matches
  const ugVisible = qn === "" || filteredUg.length > 0 || matchText("undergraduate") || matchText("ug");
  const pgVisible = qn === "" || filteredPg.length > 0 || matchText("postgraduate") || matchText("pg");
  const phdVisible = qn === "" || filteredPhd.length > 0 || matchText("research scholars") || matchText("phd") || matchText("rs");

  useEffect(() => {
    async function fetchLatestResources() {
      try {
        const apiUrl = getApiUrl();
        const res = await fetch(`${apiUrl}/academic`, { cache: "no-store" });
        if (!res.ok) return;

        const json = await res.json();
        let items: ApiResource[] = [];
        if (Array.isArray(json)) {
          items = json;
        } else if (json && json.success && Array.isArray(json.data)) {
          items = json.data;
        }

        if (items.length > 0) {
          const grouped: Record<"ug" | "pg" | "phd", LinkItem[]> = {
            ug: [],
            pg: [],
            phd: [],
          };

          for (const item of items) {
            const cat = normalizeCategory(item.category);
            if (cat) {
              grouped[cat].push({
                id: item.id,
                title: item.title,
                icon: item.icon || "fas fa-link",
                url: item.link,
                desc: item.description,
                order: item.order ?? 0,
              });
            }
          }

          // Sort by order ascending, then by id ascending
          const sortByOrder = (a: LinkItem, b: LinkItem) => {
            const orderDiff = (a.order ?? 0) - (b.order ?? 0);
            if (orderDiff !== 0) return orderDiff;
            return (a.id ?? 0) - (b.id ?? 0);
          };

          if (grouped.ug.length > 0) setUgLinks(grouped.ug.sort(sortByOrder));
          if (grouped.pg.length > 0) setPgLinks(grouped.pg.sort(sortByOrder));
          if (grouped.phd.length > 0) setPhdLinks(grouped.phd.sort(sortByOrder));
        }
      } catch (err) {
        console.warn("Could not fetch latest academic resources from database, using initial resources:", err);
      }
    }

    fetchLatestResources();

    // Refetch whenever the browser tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchLatestResources();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* Search bar */}
      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <i className="fas fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
          <input
            id="academic-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources (e.g. curriculum, thesis, ERP…)"
            className="w-full pl-9 pr-4 py-2.5 text-sm font-inter rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF7F00]/40 focus:border-[#FF7F00] placeholder:text-gray-400 transition"
          />
        </div>
        {query && (
          <button
            onClick={() => setQuery("")}
            className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-inter font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition"
          >
            <i className="fas fa-xmark text-xs"></i>
            Cancel
          </button>
        )}
      </div>




      {ugVisible && <ResourceCategory title="Undergraduate (UG)" links={q ? filteredUg : ugLinks} defaultOpen={true} />}
      {pgVisible && <ResourceCategory title="Postgraduate (PG)" links={q ? filteredPg : pgLinks} defaultOpen={q !== ""} />}
      {phdVisible && <ResourceCategory title="Research Scholars" links={q ? filteredPhd : phdLinks} defaultOpen={q !== ""} />}
    </>
  );
}

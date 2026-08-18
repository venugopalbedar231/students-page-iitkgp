"use client";
import { useSearch } from "@/context/SearchContext";

export default function GlobalSearchBar() {
  const { query, setQuery } = useSearch();

  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="relative flex-1">
        <i className="fas fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
        <input
          id="global-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search everything — curriculum, scholarship, fest, contacts…"
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
  );
}

"use client";
import React, { createContext, useContext, useState } from "react";

interface SearchContextValue {
  query: string;
  setQuery: (q: string) => void;
}

const SearchContext = createContext<SearchContextValue>({
  query: "",
  setQuery: () => {},
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}

/** Normalize text for fuzzy matching — strips dots, spaces, hyphens */
export function normalizeStr(s: string): string {
  return s.toLowerCase().replace(/[\s.\-]/g, "");
}

/** Returns true if `text` matches the given normalized query `qn` or raw query `q` */
export function textMatches(text: string, q: string, qn: string): boolean {
  if (!qn) return true;
  const lower = text.toLowerCase();
  return lower.includes(q) || normalizeStr(text).includes(qn);
}

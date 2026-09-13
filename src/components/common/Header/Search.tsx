// src/components/Header/Search.tsx
import React, { useState } from 'react';

export const Search = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative hidden sm:block w-44 lg:w-56">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Пошук товарів..."
        className="w-full bg-neutral-100 text-sm font-normal text-neutral-800 placeholder-neutral-400 rounded-full py-2 pl-4 pr-9 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition border border-transparent focus:bg-white focus:border-neutral-300"
      />
      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
};
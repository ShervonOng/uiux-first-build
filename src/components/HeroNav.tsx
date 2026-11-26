import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { MarketCategory } from '../types/market';

interface HeroNavProps {
  activeCategory: MarketCategory;
  onSelectCategory: (cat: MarketCategory) => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

const CATEGORIES: { id: MarketCategory; label: string }[] = [
  { id: 'indices', label: 'Indices' },
  { id: 'us-stocks', label: 'US stocks' },
  { id: 'world-stocks', label: 'World stocks' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'futures', label: 'Futures' },
  { id: 'forex', label: 'Forex' },
  { id: 'bonds', label: 'Bonds' },
  { id: 'etfs', label: 'ETFs' },
  { id: 'economy', label: 'Economy' },
];

const REGIONS = ['Global', 'Americas', 'Europe', 'Asia-Pacific'];

export const HeroNav: React.FC<HeroNavProps> = ({
  activeCategory,
  onSelectCategory,
  selectedRegion,
  onSelectRegion,
}) => {
  const [regionOpen, setRegionOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setRegionOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleJump = (cat: MarketCategory) => {
    onSelectCategory(cat);
    const el = document.getElementById(cat);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="flex flex-col items-center text-center gap-4 pt-2 pb-2">
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setRegionOpen((v) => !v)}
          className="inline-flex items-center gap-2 group cursor-pointer"
          aria-expanded={regionOpen}
          aria-label="Select market region"
        >
          <h1 className="font-headline text-[34px] sm:text-[56px] font-bold leading-[42px] sm:leading-[64px] tracking-[-0.5px] sm:tracking-[-1.1px] text-[#131722] dark:text-[#D1D4DC]">
            {selectedRegion === 'Global' ? 'Markets, everywhere' : `Markets, ${selectedRegion}`}
          </h1>
          <ChevronDown
            className={`w-7 h-7 text-[#131722] dark:text-[#D1D4DC] transition-transform duration-150 ${
              regionOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'
            }`}
            aria-hidden="true"
          />
        </button>

        {regionOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#1E222D] p-1.5 shadow-lg z-20 text-left">
            <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#6A6D78] dark:text-[#92959E]">
              Market Region Scope
            </div>
            {REGIONS.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => {
                  onSelectRegion(region);
                  setRegionOpen(false);
                }}
                className={`w-full flex items-center justify-between rounded-md px-3 py-2 text-[14px] transition-colors ${
                  selectedRegion === region
                    ? 'bg-[#F0F3FA] dark:bg-[#2A2E39] font-semibold text-[#1E53E5]'
                    : 'text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39]'
                }`}
              >
                <span>{region === 'Global' ? 'Everywhere (Global)' : region}</span>
                {selectedRegion === region && (
                  <span className="text-[11px] font-semibold text-[#1E53E5]">Active</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Category Jump Links */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleJump(cat.id)}
              className={`rounded-full px-4 py-1.5 font-label text-[12px] font-semibold transition-colors duration-100 cursor-pointer whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#F0F3FA] dark:bg-[#1E222D] text-[#131722] dark:text-[#D1D4DC]'
                  : 'text-[#6A6D78] dark:text-[#92959E] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] hover:text-[#131722] dark:hover:text-[#D1D4DC]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};

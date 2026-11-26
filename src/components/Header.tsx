import React, { useEffect, useRef, useState } from 'react';
import { Globe, Moon, Search, Star, Sun, User } from 'lucide-react';
import { MarketCategory } from '../types/market';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenPricing: () => void;
  onOpenCalendar: () => void;
  onOpenScreener: (cat: MarketCategory, title: string) => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  language: string;
  onChangeLanguage: (lang: string) => void;
}

type NavMenuKey = 'products' | 'community' | 'brokers' | 'more' | null;

const LANGUAGES = [
  { code: 'EN', label: 'English (US)' },
  { code: 'ES', label: 'Español' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'JP', label: '日本語' },
];

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenPricing,
  onOpenCalendar,
  onOpenScreener,
  onOpenWatchlist,
  watchlistCount,
  darkMode,
  onToggleDarkMode,
  language,
  onChangeLanguage,
}) => {
  const [openMenu, setOpenMenu] = useState<NavMenuKey>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setLangOpen(false);
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (key: NavMenuKey) => {
    setLangOpen(false);
    setAccountOpen(false);
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-30 border-b border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#131722]"
    >
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-4 px-6 py-3">
        {/* Brand + Search */}
        <div className="flex items-center gap-6">
          <a
            href="#top"
            className="flex items-center gap-2 text-[#131722] dark:text-[#D1D4DC] whitespace-nowrap shrink-0"
          >
            <svg width="28" height="18" viewBox="0 0 36 22" fill="none" aria-hidden="true">
              <path d="M14 2H0V8H8V20H14V2Z" fill="currentColor" />
              <circle cx="20" cy="5" r="3" fill="currentColor" />
              <path d="M23.5 20L30 2H36L29.5 20H23.5Z" fill="currentColor" />
            </svg>
            <span className="font-headline text-[20px] font-bold leading-[26px] tracking-[-0.2px]">
              TradingView
            </span>
          </a>

          <button
            type="button"
            onClick={onOpenSearch}
            className="hidden md:flex items-center gap-2 rounded-full bg-[#F0F3FA] dark:bg-[#1E222D] px-4 py-2 text-[#6A6D78] dark:text-[#92959E] transition-colors duration-100 hover:bg-[#E6E9F2] dark:hover:bg-[#2A2E39] min-w-[220px] cursor-pointer whitespace-nowrap shrink-0"
            aria-label="Search markets and tickers"
          >
            <Search className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="text-[14px] leading-[20px]">Search (Ctrl+K)</span>
          </button>
        </div>

        {/* Primary Nav */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6 relative">
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu('products')}
              className="font-label text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC] transition-colors duration-100 hover:text-[#1E53E5] cursor-pointer whitespace-nowrap shrink-0"
            >
              Products
            </button>
            {openMenu === 'products' && (
              <div className="absolute left-0 top-full mt-3 w-64 rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#1E222D] p-2 shadow-lg z-40">
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null);
                    onOpenScreener('us-stocks', 'Stock Screener');
                  }}
                  className="w-full text-left rounded-md px-3 py-2 hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39] transition-colors"
                >
                  <div className="text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC]">Stock Screener</div>
                  <div className="text-[12px] text-[#6A6D78] dark:text-[#92959E]">Filter US & global equities</div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null);
                    onOpenScreener('crypto', 'Crypto Screener');
                  }}
                  className="w-full text-left rounded-md px-3 py-2 hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39] transition-colors"
                >
                  <div className="text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC]">Crypto Coins</div>
                  <div className="text-[12px] text-[#6A6D78] dark:text-[#92959E]">Market cap & daily movers</div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null);
                    onOpenCalendar();
                  }}
                  className="w-full text-left rounded-md px-3 py-2 hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39] transition-colors"
                >
                  <div className="text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC]">Economic Calendar</div>
                  <div className="text-[12px] text-[#6A6D78] dark:text-[#92959E]">Key macro releases & rates</div>
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu('community')}
              className="font-label text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC] transition-colors duration-100 hover:text-[#1E53E5] cursor-pointer whitespace-nowrap shrink-0"
            >
              Community
            </button>
            {openMenu === 'community' && (
              <div className="absolute left-0 top-full mt-3 w-64 rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#1E222D] p-2 shadow-lg z-40">
                <a
                  href="#us-stocks"
                  onClick={() => setOpenMenu(null)}
                  className="block rounded-md px-3 py-2 hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39]"
                >
                  <div className="text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC]">Trending US Equities</div>
                  <div className="text-[12px] text-[#6A6D78] dark:text-[#92959E]">Most active tickers today</div>
                </a>
                <a
                  href="#crypto"
                  onClick={() => setOpenMenu(null)}
                  className="block rounded-md px-3 py-2 hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39]"
                >
                  <div className="text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC]">Crypto Ideas & Movers</div>
                  <div className="text-[12px] text-[#6A6D78] dark:text-[#92959E]">Top gainers & losers</div>
                </a>
              </div>
            )}
          </div>

          <a
            href="#top"
            aria-current="page"
            onClick={() => setOpenMenu(null)}
            className="font-label text-[14px] font-semibold text-[#1E53E5] whitespace-nowrap shrink-0"
          >
            Markets
          </a>

          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu('brokers')}
              className="font-label text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC] transition-colors duration-100 hover:text-[#1E53E5] cursor-pointer whitespace-nowrap shrink-0"
            >
              Brokers
            </button>
            {openMenu === 'brokers' && (
              <div className="absolute left-0 top-full mt-3 w-64 rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#1E222D] p-3 shadow-lg z-40">
                <div className="text-[13px] font-semibold text-[#131722] dark:text-[#D1D4DC] mb-1">
                  Integrated Multi-Asset Access
                </div>
                <p className="text-[12px] text-[#6A6D78] dark:text-[#92959E] mb-2">
                  Compare supported equities, futures, and FX venues directly from the asset screeners.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null);
                    onOpenScreener('forex', 'Forex & Currencies');
                  }}
                  className="text-[12px] font-semibold text-[#1E53E5] hover:underline"
                >
                  Explore Forex Markets →
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu('more')}
              className="font-label text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC] transition-colors duration-100 hover:text-[#1E53E5] cursor-pointer whitespace-nowrap shrink-0"
            >
              More
            </button>
            {openMenu === 'more' && (
              <div className="absolute left-0 top-full mt-3 w-56 rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#1E222D] p-2 shadow-lg z-40">
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null);
                    onOpenWatchlist();
                  }}
                  className="w-full text-left rounded-md px-3 py-2 text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39]"
                >
                  My Watchlist ({watchlistCount})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null);
                    onOpenPricing();
                  }}
                  className="w-full text-left rounded-md px-3 py-2 text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39]"
                >
                  Plans & Pricing
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null);
                    onToggleDarkMode();
                  }}
                  className="w-full text-left rounded-md px-3 py-2 text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39]"
                >
                  Switch to {darkMode ? 'Light' : 'Dark'} Mode
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3 shrink-0 relative">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search markets"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D]"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setOpenMenu(null);
                setAccountOpen(false);
                setLangOpen((v) => !v);
              }}
              className="hidden sm:inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[#131722] dark:text-[#D1D4DC] transition-colors duration-100 hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] cursor-pointer whitespace-nowrap"
              aria-label="Select language"
            >
              <Globe className="w-4 h-4" aria-hidden="true" />
              <span className="font-label text-[12px] font-semibold">{language}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#1E222D] p-1.5 shadow-lg z-40">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      onChangeLanguage(l.code);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between rounded-md px-3 py-1.5 text-[13px] ${
                      language === l.code
                        ? 'bg-[#F0F3FA] dark:bg-[#2A2E39] font-semibold text-[#1E53E5]'
                        : 'text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39]'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="font-mono text-[11px]">{l.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Account & Appearance Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setOpenMenu(null);
                setLangOpen(false);
                setAccountOpen((v) => !v);
              }}
              aria-label="User account and theme settings"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#131722] dark:text-[#D1D4DC] transition-colors duration-100 hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] cursor-pointer"
            >
              <User className="w-4 h-4" aria-hidden="true" />
            </button>
            {accountOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#1E222D] p-2 shadow-lg z-40">
                <button
                  type="button"
                  onClick={() => {
                    onToggleDarkMode();
                    setAccountOpen(false);
                  }}
                  className="w-full flex items-center justify-between rounded-md px-3 py-2 text-[13px] font-medium text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39]"
                >
                  <span className="flex items-center gap-2">
                    {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span>{darkMode ? 'Light theme' : 'Dark theme'}</span>
                  </span>
                  <span className="text-[11px] text-[#6A6D78] dark:text-[#92959E]">
                    {darkMode ? 'Dark' : 'Light'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAccountOpen(false);
                    onOpenWatchlist();
                  }}
                  className="w-full flex items-center justify-between rounded-md px-3 py-2 text-[13px] font-medium text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F8F9FD] dark:hover:bg-[#2A2E39]"
                >
                  <span className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>Saved Watchlist</span>
                  </span>
                  <span className="font-mono text-[11px] text-[#1E53E5] tabular-nums">
                    {watchlistCount}
                  </span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onOpenPricing}
            className="inline-flex flex-col items-center justify-center rounded-lg bg-[#FF3B30] px-3.5 py-1.5 text-[#212121] transition-opacity duration-100 hover:opacity-90 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="font-label text-[12px] font-semibold leading-none">Black Friday</span>
            <span className="font-label text-[11px] font-semibold leading-none mt-0.5">Up to 80% OFF</span>
          </button>
        </div>
      </div>
    </header>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AssetClassesGrid } from './components/AssetClassesGrid';
import { CryptoSection } from './components/CryptoSection';
import { EconomySection } from './components/EconomySection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroNav } from './components/HeroNav';
import { IndicesSection } from './components/IndicesSection';
import { ScreenerModal } from './components/ScreenerModal';
import { SearchModal } from './components/SearchModal';
import { SymbolInspectorModal } from './components/SymbolInspectorModal';
import { USStocksSection } from './components/USStocksSection';
import {
  EconomicCalendarModal,
  PricingModal,
  WatchlistModal,
} from './components/UtilityModals';
import { WorldStocksSection } from './components/WorldStocksSection';
import { MarketCategory, MarketInstrument } from './types/market';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<MarketCategory>('indices');
  const [selectedRegion, setSelectedRegion] = useState<string>('Global');
  const [language, setLanguage] = useState<string>('EN');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('tv_theme') === 'dark';
    } catch {
      return false;
    }
  });

  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tv_watchlist');
      return saved ? (JSON.parse(saved) as string[]) : ['SPX', 'NVDA', 'BTCUSD'];
    } catch {
      return ['SPX', 'NVDA', 'BTCUSD'];
    }
  });

  const [searchOpen, setSearchOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [watchlistOpen, setWatchlistOpen] = useState(false);
  const [inspectedInstrument, setInspectedInstrument] = useState<MarketInstrument | null>(null);
  const [screenerState, setScreenerState] = useState<{
    isOpen: boolean;
    category: MarketCategory;
    title: string;
  }>({
    isOpen: false,
    category: 'indices',
    title: 'Indices',
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    try {
      localStorage.setItem('tv_theme', darkMode ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem('tv_watchlist', JSON.stringify(watchlist));
    } catch {
      // ignore storage errors
    }
  }, [watchlist]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleWatchlist = (symbol: string) => {
    setWatchlist((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  const openScreener = (category: MarketCategory, title: string) => {
    setScreenerState({ isOpen: true, category, title });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#131722] text-[#131722] dark:text-[#D1D4DC]">
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onOpenPricing={() => setPricingOpen(true)}
        onOpenCalendar={() => setCalendarOpen(true)}
        onOpenScreener={openScreener}
        onOpenWatchlist={() => setWatchlistOpen(true)}
        watchlistCount={watchlist.length}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
        language={language}
        onChangeLanguage={setLanguage}
      />

      <main
        id="top"
        className="flex-1 mx-auto w-full max-w-[1360px] px-6 py-10 flex flex-col gap-12"
      >
        <HeroNav
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />

        <IndicesSection
          onInspectInstrument={setInspectedInstrument}
          onOpenScreener={openScreener}
          selectedRegion={selectedRegion}
        />

        <USStocksSection
          onInspectInstrument={setInspectedInstrument}
          onOpenScreener={openScreener}
        />

        <WorldStocksSection
          onInspectInstrument={setInspectedInstrument}
          onOpenScreener={openScreener}
        />

        <CryptoSection
          onInspectInstrument={setInspectedInstrument}
          onOpenScreener={openScreener}
        />

        <AssetClassesGrid
          onInspectInstrument={setInspectedInstrument}
          onOpenScreener={openScreener}
        />

        <EconomySection onOpenCalendar={() => setCalendarOpen(true)} />
      </main>

      <Footer
        onOpenScreener={openScreener}
        onOpenCalendar={() => setCalendarOpen(true)}
        onOpenPricing={() => setPricingOpen(true)}
      />

      {/* Interactive Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectInstrument={setInspectedInstrument}
        watchlist={watchlist}
        onToggleWatchlist={toggleWatchlist}
      />

      <SymbolInspectorModal
        instrument={inspectedInstrument}
        onClose={() => setInspectedInstrument(null)}
        isWatchlisted={
          inspectedInstrument ? watchlist.includes(inspectedInstrument.symbol) : false
        }
        onToggleWatchlist={toggleWatchlist}
      />

      <ScreenerModal
        isOpen={screenerState.isOpen}
        category={screenerState.category}
        title={screenerState.title}
        onClose={() => setScreenerState((prev) => ({ ...prev, isOpen: false }))}
        onInspectInstrument={setInspectedInstrument}
        watchlist={watchlist}
        onToggleWatchlist={toggleWatchlist}
      />

      <EconomicCalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
      />

      <PricingModal
        isOpen={pricingOpen}
        onClose={() => setPricingOpen(false)}
      />

      <WatchlistModal
        isOpen={watchlistOpen}
        onClose={() => setWatchlistOpen(false)}
        watchlist={watchlist}
        onToggleWatchlist={toggleWatchlist}
        onInspectInstrument={setInspectedInstrument}
      />
    </div>
  );
}

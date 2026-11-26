import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, Star, X } from 'lucide-react';
import { ALL_INSTRUMENTS } from '../data/marketData';
import { MarketCategory, MarketInstrument } from '../types/market';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectInstrument: (instrument: MarketInstrument) => void;
  watchlist: string[];
  onToggleWatchlist: (symbol: string) => void;
}

const FILTER_TABS: { id: 'all' | MarketCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'indices', label: 'Indices' },
  { id: 'us-stocks', label: 'US Stocks' },
  { id: 'world-stocks', label: 'World' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'futures', label: 'Futures' },
  { id: 'forex', label: 'Forex' },
  { id: 'bonds', label: 'Bonds' },
  { id: 'etfs', label: 'ETFs' },
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectInstrument,
  watchlist,
  onToggleWatchlist,
}) => {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'all' | MarketCategory>('all');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      setQuery('');
      setTab('all');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_INSTRUMENTS.filter((item) => {
      const matchesTab = tab === 'all' || item.category === tab;
      if (!matchesTab) return false;
      if (!q) return true;
      return (
        item.symbol.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        (item.exchange ?? '').toLowerCase().includes(q)
      );
    });
  }, [query, tab]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-[2px] p-4 pt-16"
      role="dialog"
      aria-modal="true"
      aria-label="Symbol Search"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#131722] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[#E0E3EB] dark:border-[#2A2E39] px-4 py-3">
          <Search className="w-5 h-5 text-[#6A6D78] dark:text-[#92959E] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, company, index, or pair (e.g. NVDA, BTCUSD, SPX)..."
            className="w-full bg-transparent text-[15px] text-[#131722] dark:text-[#D1D4DC] placeholder:text-[#6A6D78] dark:placeholder:text-[#92959E] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="rounded-md p-1.5 text-[#6A6D78] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto border-b border-[#E0E3EB] dark:border-[#2A2E39] px-4 py-2 bg-[#F8F9FD] dark:bg-[#181C28]">
          {FILTER_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-full px-3 py-1 font-label text-[12px] font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                tab === t.id
                  ? 'bg-[#131722] dark:bg-[#F0F3FA] text-white dark:text-[#131722]'
                  : 'text-[#6A6D78] dark:text-[#92959E] hover:bg-[#E6E9F2] dark:hover:bg-[#2A2E39]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-[#E0E3EB] dark:divide-[#2A2E39]">
          {results.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-[14px] font-medium text-[#131722] dark:text-[#D1D4DC]">
                No matching symbols found
              </p>
              <p className="text-[13px] text-[#6A6D78] dark:text-[#92959E] mt-1">
                Try another ticker or clear your category filter.
              </p>
            </div>
          ) : (
            results.map((item) => {
              const isSaved = watchlist.includes(item.symbol);
              return (
                <div
                  key={`${item.category}-${item.symbol}`}
                  onClick={() => {
                    onSelectInstrument(item);
                    onClose();
                  }}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-[#F8F9FD] dark:hover:bg-[#181C28] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWatchlist(item.symbol);
                      }}
                      aria-label={isSaved ? `Remove ${item.symbol} from watchlist` : `Add ${item.symbol} to watchlist`}
                      className={`p-1 rounded hover:bg-[#E6E9F2] dark:hover:bg-[#2A2E39] ${
                        isSaved ? 'text-[#1E53E5]' : 'text-[#6A6D78] dark:text-[#92959E]'
                      }`}
                    >
                      <Star className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[13px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                          {item.symbol}
                        </span>
                        <span className="text-[12px] text-[#6A6D78] dark:text-[#92959E] truncate">
                          {item.name}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#6A6D78] dark:text-[#92959E]">
                        {item.exchange ?? 'MARKET'} · {item.category.replace('-', ' ')}
                      </div>
                    </div>
                  </div>

                  <div className="text-right tabular-nums shrink-0 ml-3">
                    <div className="font-label text-[13px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                      {item.price} {item.currency ?? ''}
                    </div>
                    <div
                      className={`font-label text-[12px] font-semibold ${
                        item.gain ? 'text-[#067562] dark:text-[#089981]' : 'text-[#C91D2C] dark:text-[#F23645]'
                      }`}
                    >
                      {item.changePct}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

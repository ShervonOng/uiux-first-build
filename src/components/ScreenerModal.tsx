import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpDown, Search, Star, X } from 'lucide-react';
import { ALL_INSTRUMENTS } from '../data/marketData';
import { MarketCategory, MarketInstrument } from '../types/market';

interface ScreenerModalProps {
  isOpen: boolean;
  category: MarketCategory;
  title: string;
  onClose: () => void;
  onInspectInstrument: (instrument: MarketInstrument) => void;
  watchlist: string[];
  onToggleWatchlist: (symbol: string) => void;
}

type SortField = 'name' | 'price' | 'change';

export const ScreenerModal: React.FC<ScreenerModalProps> = ({
  isOpen,
  category,
  title,
  onClose,
  onInspectInstrument,
  watchlist,
  onToggleWatchlist,
}) => {
  const [filterText, setFilterText] = useState('');
  const [sortField, setSortField] = useState<SortField>('change');
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    setFilterText('');
  }, [category, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const rows = useMemo(() => {
    const q = filterText.trim().toLowerCase();
    const list = ALL_INSTRUMENTS.filter((item) => {
      if (item.category !== category) return false;
      if (!q) return true;
      return item.name.toLowerCase().includes(q) || item.symbol.toLowerCase().includes(q);
    });

    return [...list].sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') {
        cmp = a.name.localeCompare(b.name);
      } else if (sortField === 'price') {
        cmp = a.numericPrice - b.numericPrice;
      } else {
        cmp = a.numericChangePct - b.numericChangePct;
      }
      return sortAsc ? cmp : -cmp;
    });
  }, [category, filterText, sortField, sortAsc]);

  if (!isOpen) return null;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-xl border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#131722] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#E0E3EB] dark:border-[#2A2E39] px-6 py-4">
          <div>
            <h2 className="font-headline text-[20px] font-bold text-[#131722] dark:text-[#D1D4DC]">
              {title}
            </h2>
            <p className="text-[12px] text-[#6A6D78] dark:text-[#92959E]">
              {rows.length} instruments · Click any row to open interactive chart
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-[#F0F3FA] dark:bg-[#1E222D] px-3 py-1.5">
              <Search className="w-4 h-4 text-[#6A6D78]" />
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Filter list..."
                className="w-36 sm:w-48 bg-transparent text-[13px] text-[#131722] dark:text-[#D1D4DC] placeholder:text-[#6A6D78] focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close screener"
              className="rounded-lg p-1.5 text-[#6A6D78] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          <table className="w-full border-collapse text-left">
            <thead className="sticky top-0 bg-[#F8F9FD] dark:bg-[#181C28] border-b border-[#E0E3EB] dark:border-[#2A2E39]">
              <tr className="text-[#6A6D78] dark:text-[#92959E]">
                <th className="py-2.5 px-6 font-label text-[11px] font-semibold uppercase">
                  <button
                    type="button"
                    onClick={() => handleSort('name')}
                    className="inline-flex items-center gap-1 hover:text-[#131722] dark:hover:text-[#D1D4DC] cursor-pointer"
                  >
                    <span>SYMBOL</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-2.5 px-4 font-label text-[11px] font-semibold uppercase">
                  EXCHANGE
                </th>
                <th className="py-2.5 px-4 text-right font-label text-[11px] font-semibold uppercase">
                  <button
                    type="button"
                    onClick={() => handleSort('price')}
                    className="inline-flex items-center gap-1 hover:text-[#131722] dark:hover:text-[#D1D4DC] cursor-pointer"
                  >
                    <span>PRICE</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-2.5 px-6 text-right font-label text-[11px] font-semibold uppercase">
                  <button
                    type="button"
                    onClick={() => handleSort('change')}
                    className="inline-flex items-center gap-1 hover:text-[#131722] dark:hover:text-[#D1D4DC] cursor-pointer"
                  >
                    <span>CHANGE %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB] dark:divide-[#2A2E39] tabular-nums">
              {rows.map((item) => {
                const isSaved = watchlist.includes(item.symbol);
                return (
                  <tr
                    key={`${item.category}-${item.symbol}`}
                    onClick={() => {
                      onInspectInstrument(item);
                      onClose();
                    }}
                    className="hover:bg-[#F8F9FD] dark:hover:bg-[#181C28] cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWatchlist(item.symbol);
                          }}
                          className={`${
                            isSaved ? 'text-[#1E53E5]' : 'text-[#6A6D78] dark:text-[#92959E]'
                          }`}
                          aria-label={`Toggle ${item.symbol} watchlist`}
                        >
                          <Star className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                        </button>
                        <div>
                          <div className="font-label text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                            {item.name}
                          </div>
                          <div className="font-mono text-[12px] text-[#6A6D78] dark:text-[#92959E]">
                            {item.symbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[12px] text-[#6A6D78] dark:text-[#92959E]">
                      {item.exchange ?? 'GLOBAL'}
                    </td>
                    <td className="py-3 px-4 text-right font-label text-[13px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                      {item.price} {item.currency ?? ''}
                    </td>
                    <td
                      className={`py-3 px-6 text-right font-label text-[13px] font-semibold ${
                        item.gain ? 'text-[#067562] dark:text-[#089981]' : 'text-[#C91D2C] dark:text-[#F23645]'
                      }`}
                    >
                      {item.changePct}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

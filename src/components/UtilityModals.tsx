import React, { useEffect, useState } from 'react';
import { Calendar, Check, Star, X } from 'lucide-react';
import { ALL_INSTRUMENTS, ECONOMIC_EVENTS } from '../data/marketData';
import { MarketInstrument } from '../types/market';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EconomicCalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose }) => {
  const [impactFilter, setImpactFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = ECONOMIC_EVENTS.filter(
    (ev) => impactFilter === 'All' || ev.impact === impactFilter
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Economic Calendar"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-xl border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#131722] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#E0E3EB] dark:border-[#2A2E39] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-[#1E53E5]" />
            <h2 className="font-headline text-[20px] font-bold text-[#131722] dark:text-[#D1D4DC]">
              Economic Calendar
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-[#F0F3FA] dark:bg-[#1E222D] p-1">
              {(['All', 'High', 'Medium', 'Low'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setImpactFilter(level)}
                  className={`rounded-full px-3 py-1 font-label text-[11px] font-semibold cursor-pointer transition-colors ${
                    impactFilter === level
                      ? 'bg-white dark:bg-[#2A2E39] text-[#131722] dark:text-[#D1D4DC] shadow-sm'
                      : 'text-[#6A6D78] dark:text-[#92959E]'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close calendar"
              className="rounded-lg p-1.5 text-[#6A6D78] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left tabular-nums">
            <thead>
              <tr className="border-b border-[#E0E3EB] dark:border-[#2A2E39] bg-[#F8F9FD] dark:bg-[#181C28] text-[#6A6D78] dark:text-[#92959E]">
                <th className="py-2.5 px-5 font-label text-[11px] font-semibold uppercase">DATE / TIME</th>
                <th className="py-2.5 px-3 font-label text-[11px] font-semibold uppercase">REGION</th>
                <th className="py-2.5 px-3 font-label text-[11px] font-semibold uppercase">EVENT</th>
                <th className="py-2.5 px-3 text-right font-label text-[11px] font-semibold uppercase">ACTUAL</th>
                <th className="py-2.5 px-3 text-right font-label text-[11px] font-semibold uppercase">FORECAST</th>
                <th className="py-2.5 px-5 text-right font-label text-[11px] font-semibold uppercase">PREV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB] dark:divide-[#2A2E39]">
              {filtered.map((ev) => (
                <tr key={ev.id} className="hover:bg-[#F8F9FD] dark:hover:bg-[#181C28]">
                  <td className="py-3 px-5 font-mono text-[12px] text-[#6A6D78] dark:text-[#92959E] whitespace-nowrap">
                    {ev.date} · {ev.time}
                  </td>
                  <td className="py-3 px-3 font-label text-[13px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                    {ev.country}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-label text-[13px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                      {ev.event}
                    </div>
                    <div
                      className={`text-[11px] font-semibold ${
                        ev.impact === 'High'
                          ? 'text-[#C91D2C] dark:text-[#F23645]'
                          : ev.impact === 'Medium'
                          ? 'text-[#9E3500] dark:text-[#FFB59A]'
                          : 'text-[#6A6D78] dark:text-[#92959E]'
                      }`}
                    >
                      {ev.impact} impact
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-[13px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                    {ev.actual}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-[13px] text-[#6A6D78] dark:text-[#92959E]">
                    {ev.forecast}
                  </td>
                  <td className="py-3 px-5 text-right font-mono text-[13px] text-[#6A6D78] dark:text-[#92959E]">
                    {ev.previous}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('Plus');

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const plans = [
    {
      name: 'Essential',
      audience: 'For active swing traders',
      price: '$12.95',
      original: '$14.95',
      discount: '30% OFF annual',
      features: ['2 charts per tab', '5 indicators per chart', '20 price alerts', 'Ad-free experience'],
    },
    {
      name: 'Plus',
      audience: 'For multi-market analysts',
      price: '$24.95',
      original: '$29.95',
      discount: '50% OFF annual',
      features: ['4 charts per tab', '10 indicators per chart', '100 price alerts', 'Intraday exotic charts'],
    },
    {
      name: 'Premium',
      audience: 'For institutional desks',
      price: '$39.95',
      original: '$59.95',
      discount: '80% OFF Black Friday',
      features: ['8 charts per tab', '25 indicators per chart', '400 price alerts', 'Second-based intervals'],
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Black Friday Plans"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-xl border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#131722] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#E0E3EB] dark:border-[#2A2E39] px-6 py-4">
          <div>
            <h2 className="font-headline text-[22px] font-bold text-[#131722] dark:text-[#D1D4DC]">
              Black Friday Plans — Up to 80% OFF
            </h2>
            <p className="text-[13px] text-[#6A6D78] dark:text-[#92959E]">
              Annual billing savings across all TradingView charting tiers.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close pricing"
            className="rounded-lg p-1.5 text-[#6A6D78] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          {plans.map((p) => {
            const active = selectedPlan === p.name;
            return (
              <div
                key={p.name}
                className={`rounded-lg border p-5 flex flex-col justify-between transition-colors ${
                  active
                    ? 'border-[#1E53E5] bg-[#F8F9FD] dark:bg-[#181C28]'
                    : 'border-[#E0E3EB] dark:border-[#2A2E39]'
                }`}
              >
                <div>
                  <div className="font-label text-[12px] font-semibold text-[#1E53E5]">
                    {p.discount}
                  </div>
                  <h3 className="font-headline text-[20px] font-bold text-[#131722] dark:text-[#D1D4DC] mt-1">
                    {p.name}
                  </h3>
                  <p className="text-[12px] text-[#6A6D78] dark:text-[#92959E]">{p.audience}</p>
                  <div className="flex items-baseline gap-2 mt-4 tabular-nums">
                    <span className="font-headline text-[26px] font-bold text-[#131722] dark:text-[#D1D4DC]">
                      {p.price}
                    </span>
                    <span className="text-[12px] text-[#6A6D78] line-through">{p.original}</span>
                    <span className="text-[12px] text-[#6A6D78]">/mo</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-[13px] text-[#131722] dark:text-[#D1D4DC]">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#067562] dark:text-[#089981] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPlan(p.name)}
                  className={`mt-6 w-full rounded-lg py-2 font-label text-[13px] font-semibold cursor-pointer transition-colors ${
                    active
                      ? 'bg-[#1E53E5] text-white'
                      : 'bg-[#F0F3FA] dark:bg-[#1E222D] text-[#131722] dark:text-[#D1D4DC] hover:bg-[#E6E9F2] dark:hover:bg-[#2A2E39]'
                  }`}
                >
                  {active ? 'Selected Plan' : `Choose ${p.name}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface WatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: string[];
  onToggleWatchlist: (symbol: string) => void;
  onInspectInstrument: (instrument: MarketInstrument) => void;
}

export const WatchlistModal: React.FC<WatchlistModalProps> = ({
  isOpen,
  onClose,
  watchlist,
  onToggleWatchlist,
  onInspectInstrument,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = ALL_INSTRUMENTS.filter((item) => watchlist.includes(item.symbol));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Saved Watchlist"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#131722] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#E0E3EB] dark:border-[#2A2E39] px-6 py-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#1E53E5]" fill="currentColor" />
            <h2 className="font-headline text-[18px] font-bold text-[#131722] dark:text-[#D1D4DC]">
              My Watchlist ({items.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close watchlist"
            className="rounded-lg p-1.5 text-[#6A6D78] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[380px] overflow-y-auto divide-y divide-[#E0E3EB] dark:divide-[#2A2E39]">
          {items.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="text-[14px] font-medium text-[#131722] dark:text-[#D1D4DC]">
                Your watchlist is empty
              </p>
              <p className="text-[13px] text-[#6A6D78] dark:text-[#92959E] mt-1">
                Click any symbol across the dashboard or search with Ctrl+K to track instruments here.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.symbol}
                onClick={() => {
                  onInspectInstrument(item);
                  onClose();
                }}
                className="flex items-center justify-between px-6 py-3 hover:bg-[#F8F9FD] dark:hover:bg-[#181C28] cursor-pointer"
              >
                <div>
                  <div className="font-label text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                    {item.name}
                  </div>
                  <div className="font-mono text-[12px] text-[#6A6D78] dark:text-[#92959E]">
                    {item.symbol}
                  </div>
                </div>
                <div className="flex items-center gap-4 tabular-nums">
                  <div className="text-right">
                    <div className="font-label text-[13px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                      {item.price}
                    </div>
                    <div
                      className={`font-label text-[12px] font-semibold ${
                        item.gain ? 'text-[#067562] dark:text-[#089981]' : 'text-[#C91D2C] dark:text-[#F23645]'
                      }`}
                    >
                      {item.changePct}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWatchlist(item.symbol);
                    }}
                    aria-label={`Remove ${item.symbol}`}
                    className="p-1 text-[#1E53E5] hover:opacity-75 cursor-pointer"
                  >
                    <Star className="w-4 h-4" fill="currentColor" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

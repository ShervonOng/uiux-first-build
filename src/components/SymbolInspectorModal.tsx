import React, { useEffect, useState } from 'react';
import { Star, X } from 'lucide-react';
import { generateInstrumentSeries } from '../data/marketData';
import { MarketInstrument, Timeframe } from '../types/market';
import { InteractiveAreaChart } from './InteractiveAreaChart';

interface SymbolInspectorModalProps {
  instrument: MarketInstrument | null;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (symbol: string) => void;
}

const TIMEFRAMES: Timeframe[] = ['1D', '1M', '3M', '1Y', '5Y', 'All'];

export const SymbolInspectorModal: React.FC<SymbolInspectorModalProps> = ({
  instrument,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');

  useEffect(() => {
    setTimeframe('1D');
  }, [instrument?.symbol]);

  useEffect(() => {
    if (!instrument) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [instrument, onClose]);

  if (!instrument) return null;

  const series = generateInstrumentSeries(instrument, timeframe);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${instrument.name} quote and chart`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-xl border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#131722] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#E0E3EB] dark:border-[#2A2E39] px-6 py-4">
          <div>
            <div className="flex items-center gap-2 text-[12px] text-[#6A6D78] dark:text-[#92959E]">
              <span className="font-mono font-semibold text-[#1E53E5]">{instrument.symbol}</span>
              <span>·</span>
              <span>{instrument.exchange ?? 'GLOBAL'}</span>
              {instrument.region && (
                <>
                  <span>·</span>
                  <span>{instrument.region}</span>
                </>
              )}
            </div>
            <h2 className="font-headline text-[24px] font-bold text-[#131722] dark:text-[#D1D4DC] mt-0.5">
              {instrument.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleWatchlist(instrument.symbol)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-label text-[12px] font-semibold transition-colors cursor-pointer ${
                isWatchlisted
                  ? 'border-[#1E53E5] bg-[#1E53E5]/10 text-[#1E53E5]'
                  : 'border-[#E0E3EB] dark:border-[#2A2E39] text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F8F9FD] dark:hover:bg-[#181C28]'
              }`}
            >
              <Star className="w-3.5 h-3.5" fill={isWatchlisted ? 'currentColor' : 'none'} />
              <span>{isWatchlisted ? 'In Watchlist' : 'Watchlist'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="rounded-lg p-1.5 text-[#6A6D78] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Price + Timeframes */}
        <div className="px-6 pt-5 pb-2 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-baseline gap-3 tabular-nums">
            <span className="font-headline text-[28px] font-bold text-[#131722] dark:text-[#D1D4DC]">
              {instrument.price}
              {instrument.currency ? ` ${instrument.currency}` : ''}
            </span>
            <span
              className={`font-label text-[14px] font-semibold ${
                series.gain ? 'text-[#067562] dark:text-[#089981]' : 'text-[#C91D2C] dark:text-[#F23645]'
              }`}
            >
              {series.deltaText}
            </span>
          </div>

          <div className="flex items-center gap-1" role="group" aria-label="Symbol timeframe">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`rounded-full px-3 py-1 font-label text-[12px] font-semibold cursor-pointer transition-colors ${
                  timeframe === tf
                    ? 'bg-[#F0F3FA] dark:bg-[#1E222D] text-[#131722] dark:text-[#D1D4DC]'
                    : 'text-[#6A6D78] dark:text-[#92959E] hover:bg-[#F8F9FD] dark:hover:bg-[#181C28]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="px-6 py-3">
          <InteractiveAreaChart
            points={series.points}
            gain={series.gain}
            heightClass="h-[220px]"
            gradientIdSuffix={`modal-${instrument.id}-${timeframe}`}
          />
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#E0E3EB] dark:border-[#2A2E39] bg-[#F8F9FD] dark:bg-[#181C28] px-6 py-4 tabular-nums">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.4px] text-[#6A6D78] dark:text-[#92959E]">
              Day Range
            </div>
            <div className="font-mono text-[13px] font-medium text-[#131722] dark:text-[#D1D4DC] mt-0.5">
              {instrument.dayRange ?? `${(instrument.numericPrice * 0.985).toFixed(2)} – ${(instrument.numericPrice * 1.012).toFixed(2)}`}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.4px] text-[#6A6D78] dark:text-[#92959E]">
              52W Range
            </div>
            <div className="font-mono text-[13px] font-medium text-[#131722] dark:text-[#D1D4DC] mt-0.5">
              {instrument.week52Range ?? `${(instrument.numericPrice * 0.72).toFixed(2)} – ${(instrument.numericPrice * 1.06).toFixed(2)}`}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.4px] text-[#6A6D78] dark:text-[#92959E]">
              {instrument.marketCap ? 'Market Cap' : instrument.employees ? 'Employees' : 'Volume'}
            </div>
            <div className="font-mono text-[13px] font-medium text-[#131722] dark:text-[#D1D4DC] mt-0.5">
              {instrument.marketCap ?? instrument.employees ?? instrument.volume ?? 'High Liquidity'}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.4px] text-[#6A6D78] dark:text-[#92959E]">
              24H / Session Chg
            </div>
            <div
              className={`font-mono text-[13px] font-semibold mt-0.5 ${
                instrument.gain ? 'text-[#067562] dark:text-[#089981]' : 'text-[#C91D2C] dark:text-[#F23645]'
              }`}
            >
              {instrument.changePct}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { MAJOR_INDICES, WORLD_INDICES } from '../data/marketData';
import { MarketCategory, MarketInstrument, Timeframe } from '../types/market';
import { InteractiveAreaChart } from './InteractiveAreaChart';

interface IndicesSectionProps {
  onInspectInstrument: (instrument: MarketInstrument) => void;
  onOpenScreener: (cat: MarketCategory, title: string) => void;
  selectedRegion: string;
}

const TIMEFRAMES: Timeframe[] = ['1D', '1M', '3M', '1Y', '5Y', 'All'];

export const IndicesSection: React.FC<IndicesSectionProps> = ({
  onInspectInstrument,
  onOpenScreener,
  selectedRegion,
}) => {
  const [activeIndexId, setActiveIndexId] = useState<string>('spx');
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');

  const activeIndex = MAJOR_INDICES.find((idx) => idx.id === activeIndexId) ?? MAJOR_INDICES[0];
  const currentSeries = activeIndex.seriesByTimeframe[timeframe];

  const visibleWorldIndices =
    selectedRegion === 'Global' || selectedRegion === 'Americas'
      ? WORLD_INDICES
      : WORLD_INDICES.filter((idx) => idx.region === selectedRegion);

  return (
    <section id="indices" className="flex flex-col gap-6 scroll-mt-20">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onOpenScreener('indices', 'Major Global Indices')}
          className="inline-flex items-center gap-1 group cursor-pointer"
        >
          <h2 className="font-headline text-[28px] font-bold leading-[34px] tracking-[-0.4px] text-[#131722] dark:text-[#D1D4DC]">
            Indices
          </h2>
          <ChevronRight
            className="w-5 h-5 text-[#131722] dark:text-[#D1D4DC] transition-transform duration-100 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* 4 Major Index Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {MAJOR_INDICES.map((idx) => {
          const isSelected = idx.id === activeIndex.id;
          return (
            <button
              key={idx.id}
              type="button"
              onClick={() => setActiveIndexId(idx.id)}
              aria-pressed={isSelected}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-left transition-colors duration-100 cursor-pointer ${
                isSelected
                  ? 'bg-[#F0F3FA] dark:bg-[#1E222D]'
                  : 'bg-white dark:bg-[#131722] hover:bg-[#F8F9FD] dark:hover:bg-[#181C28]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-label text-[11px] font-semibold ${idx.badgeBgClass}`}
                >
                  {idx.badgeText}
                </span>
                <div className="min-w-0">
                  <div className="font-label text-[14px] font-semibold leading-[20px] text-[#131722] dark:text-[#D1D4DC] truncate">
                    {idx.name}
                  </div>
                  <div className="font-mono text-[12px] font-medium leading-[16px] text-[#6A6D78] dark:text-[#92959E] tabular-nums">
                    {idx.price}
                  </div>
                </div>
              </div>
              <span
                className={`font-label text-[12px] font-semibold tabular-nums shrink-0 ml-2 ${
                  idx.gain ? 'text-[#067562] dark:text-[#089981]' : 'text-[#C91D2C] dark:text-[#F23645]'
                }`}
              >
                {idx.changePct}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Area Chart Panel */}
      <div className="rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#131722] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-baseline gap-3 tabular-nums">
            <button
              type="button"
              onClick={() => onInspectInstrument(activeIndex)}
              className="font-headline text-[20px] font-bold leading-[26px] tracking-[-0.2px] text-[#131722] dark:text-[#D1D4DC] hover:text-[#1E53E5] transition-colors cursor-pointer"
            >
              {activeIndex.name}
            </button>
            <span className="font-headline text-[20px] font-bold leading-[26px] tracking-[-0.2px] text-[#131722] dark:text-[#D1D4DC]">
              {activeIndex.price}
            </span>
            <span
              className={`font-label text-[14px] font-semibold ${
                currentSeries.gain ? 'text-[#067562] dark:text-[#089981]' : 'text-[#C91D2C] dark:text-[#F23645]'
              }`}
            >
              {currentSeries.deltaText}
            </span>
          </div>

          <div className="flex items-center gap-1" role="group" aria-label="Chart timeframe">
            {TIMEFRAMES.map((tf) => {
              const active = timeframe === tf;
              return (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setTimeframe(tf)}
                  className={`rounded-full px-3 py-1 font-label text-[12px] font-semibold transition-colors duration-100 cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#F0F3FA] dark:bg-[#1E222D] text-[#131722] dark:text-[#D1D4DC]'
                      : 'text-[#6A6D78] dark:text-[#92959E] hover:bg-[#F8F9FD] dark:hover:bg-[#181C28]'
                  }`}
                >
                  {tf}
                </button>
              );
            })}
          </div>
        </div>

        <InteractiveAreaChart
          points={currentSeries.points}
          gain={currentSeries.gain}
          heightClass="h-[260px]"
          gradientIdSuffix={`hero-${activeIndex.id}-${timeframe}`}
        />
      </div>

      {/* World Indices Strip */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-title text-[16px] font-semibold leading-[22px] text-[#131722] dark:text-[#D1D4DC]">
            World indices
          </h3>
          <button
            type="button"
            onClick={() => onOpenScreener('indices', 'All Major World Indices')}
            className="inline-flex items-center gap-1 font-label text-[12px] font-semibold text-[#1E53E5] hover:underline cursor-pointer whitespace-nowrap"
          >
            <span>See all major indices</span>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {visibleWorldIndices.map((idx) => (
            <button
              key={idx.id}
              type="button"
              onClick={() => onInspectInstrument(idx)}
              className="flex items-center justify-between rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39] p-3.5 text-left transition-colors duration-100 hover:bg-[#F8F9FD] dark:hover:bg-[#181C28] cursor-pointer"
            >
              <div>
                <div className="font-label text-[14px] font-semibold leading-[20px] text-[#131722] dark:text-[#D1D4DC]">
                  {idx.name}
                </div>
                <div className="font-mono text-[12px] font-medium leading-[16px] text-[#6A6D78] dark:text-[#92959E]">
                  {idx.symbol}
                </div>
              </div>
              <div className="text-right tabular-nums">
                <div className="font-label text-[14px] font-semibold leading-[20px] text-[#131722] dark:text-[#D1D4DC]">
                  {idx.price}
                </div>
                <div
                  className={`font-label text-[12px] font-semibold leading-[16px] ${
                    idx.gain ? 'text-[#067562] dark:text-[#089981]' : 'text-[#C91D2C] dark:text-[#F23645]'
                  }`}
                >
                  {idx.changePct}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import {
  HIGHEST_VOLUME_STOCKS,
  STOCK_GAINERS_PREMARKET,
  STOCK_GAINERS_REGULAR,
  US_MEGA_CAPS,
} from '../data/marketData';
import { MarketCategory, MarketInstrument } from '../types/market';

interface USStocksSectionProps {
  onInspectInstrument: (instrument: MarketInstrument) => void;
  onOpenScreener: (cat: MarketCategory, title: string) => void;
}

export const USStocksSection: React.FC<USStocksSectionProps> = ({
  onInspectInstrument,
  onOpenScreener,
}) => {
  const [session, setSession] = useState<'regular' | 'premarket'>('regular');

  const gainersRows = session === 'regular' ? STOCK_GAINERS_REGULAR : STOCK_GAINERS_PREMARKET;

  return (
    <section
      id="us-stocks"
      className="flex flex-col gap-6 pt-4 border-t border-[#E0E3EB] dark:border-[#2A2E39] scroll-mt-20"
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onOpenScreener('us-stocks', 'US Stocks Market')}
          className="inline-flex items-center gap-1 group cursor-pointer"
        >
          <h2 className="font-headline text-[28px] font-bold leading-[34px] tracking-[-0.4px] text-[#131722] dark:text-[#D1D4DC]">
            US stocks
          </h2>
          <ChevronRight
            className="w-5 h-5 text-[#131722] dark:text-[#D1D4DC] transition-transform duration-100 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* 6 Featured Mega-Cap Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {US_MEGA_CAPS.map((stock) => (
          <button
            key={stock.id}
            type="button"
            onClick={() => onInspectInstrument(stock)}
            className="block w-full text-left rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#131722] p-3.5 transition-colors duration-100 hover:bg-[#F8F9FD] dark:hover:bg-[#181C28] cursor-pointer"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <span
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-label text-[11px] font-semibold ${stock.badgeColorClass}`}
              >
                {stock.badgeText}
              </span>
              <div className="min-w-0">
                <h3 className="font-label text-[14px] font-semibold leading-[20px] text-[#131722] dark:text-[#D1D4DC] truncate">
                  {stock.name}
                </h3>
                <p className="font-mono text-[12px] font-medium leading-[16px] text-[#6A6D78] dark:text-[#92959E]">
                  {stock.symbol}
                </p>
              </div>
            </div>
            <div className="flex items-baseline justify-between tabular-nums">
              <span className="font-label text-[12px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                {stock.price}
              </span>
              <span
                className={`font-label text-[12px] font-semibold ${
                  stock.gain ? 'text-[#067562] dark:text-[#089981]' : 'text-[#C91D2C] dark:text-[#F23645]'
                }`}
              >
                {stock.changePct}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* 2-Column Ranked Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Highest Volume Stocks */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-title text-[16px] font-semibold leading-[22px] text-[#131722] dark:text-[#D1D4DC]">
              Highest volume stocks
            </h3>
            <button
              type="button"
              onClick={() => onOpenScreener('us-stocks', 'Highest Volume US Stocks')}
              className="font-label text-[12px] font-semibold text-[#1E53E5] hover:underline cursor-pointer"
            >
              See all
            </button>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#E0E3EB] dark:border-[#2A2E39] text-[#6A6D78] dark:text-[#92959E]">
                  <th scope="col" className="py-2 pr-3 font-label text-[11px] font-semibold uppercase tracking-[0.4px]">
                    SYMBOL
                  </th>
                  <th scope="col" className="py-2 px-3 text-right font-label text-[11px] font-semibold uppercase tracking-[0.4px]">
                    PRICE &amp; CHG
                  </th>
                  <th scope="col" className="py-2 pl-3 text-right font-label text-[11px] font-semibold uppercase tracking-[0.4px]">
                    VOLUME
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E3EB] dark:divide-[#2A2E39]">
                {HIGHEST_VOLUME_STOCKS.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => onInspectInstrument(row)}
                    className="hover:bg-[#F8F9FD] dark:hover:bg-[#181C28] cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 pr-3">
                      <div className="font-label text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                        {row.name}
                      </div>
                      <div className="font-mono text-[12px] text-[#6A6D78] dark:text-[#92959E]">
                        {row.symbol}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums">
                      <div className="font-label text-[12px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                        {row.price} {row.currency}
                      </div>
                      <div
                        className={`font-label text-[11px] font-semibold ${
                          row.gain ? 'text-[#067562] dark:text-[#089981]' : 'text-[#C91D2C] dark:text-[#F23645]'
                        }`}
                      >
                        {row.changePct}
                      </div>
                    </td>
                    <td className="py-2.5 pl-3 text-right tabular-nums text-[14px] text-[#131722] dark:text-[#D1D4DC]">
                      {row.volume}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock Gainers with Session Tabs */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-title text-[16px] font-semibold leading-[22px] text-[#131722] dark:text-[#D1D4DC]">
              Stock gainers
            </h3>
            <div
              role="tablist"
              aria-label="Session filter"
              className="inline-flex items-center gap-1 rounded-full bg-[#F8F9FD] dark:bg-[#181C28] p-1 border border-[#E0E3EB] dark:border-[#2A2E39]"
            >
              <button
                type="button"
                role="tab"
                aria-selected={session === 'regular'}
                onClick={() => setSession('regular')}
                className={`rounded-full px-3 py-1 font-label text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  session === 'regular'
                    ? 'bg-white dark:bg-[#2A2E39] text-[#131722] dark:text-[#D1D4DC] shadow-sm'
                    : 'text-[#6A6D78] dark:text-[#92959E] hover:text-[#131722] dark:hover:text-[#D1D4DC]'
                }`}
              >
                Regular hours
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={session === 'premarket'}
                onClick={() => setSession('premarket')}
                className={`rounded-full px-3 py-1 font-label text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  session === 'premarket'
                    ? 'bg-white dark:bg-[#2A2E39] text-[#131722] dark:text-[#D1D4DC] shadow-sm'
                    : 'text-[#6A6D78] dark:text-[#92959E] hover:text-[#131722] dark:hover:text-[#D1D4DC]'
                }`}
              >
                Pre-market
              </button>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#E0E3EB] dark:border-[#2A2E39] text-[#6A6D78] dark:text-[#92959E]">
                  <th scope="col" className="py-2 pr-3 font-label text-[11px] font-semibold uppercase tracking-[0.4px]">
                    SYMBOL
                  </th>
                  <th scope="col" className="py-2 px-3 text-right font-label text-[11px] font-semibold uppercase tracking-[0.4px]">
                    PRICE
                  </th>
                  <th scope="col" className="py-2 pl-3 text-right font-label text-[11px] font-semibold uppercase tracking-[0.4px]">
                    CHANGE %
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E3EB] dark:divide-[#2A2E39]">
                {gainersRows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => onInspectInstrument(row)}
                    className="hover:bg-[#F8F9FD] dark:hover:bg-[#181C28] cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 pr-3">
                      <div className="font-label text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                        {row.name}
                      </div>
                      <div className="font-mono text-[12px] text-[#6A6D78] dark:text-[#92959E]">
                        {row.symbol}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums font-label text-[12px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                      {row.price} {row.currency}
                    </td>
                    <td className="py-2.5 pl-3 text-right tabular-nums font-label text-[12px] font-semibold text-[#067562] dark:text-[#089981]">
                      {row.changePct}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

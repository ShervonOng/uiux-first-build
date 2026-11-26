import React from 'react';
import { MarketCategory } from '../types/market';

interface FooterProps {
  onOpenScreener: (cat: MarketCategory, title: string) => void;
  onOpenCalendar: () => void;
  onOpenPricing: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenScreener,
  onOpenCalendar,
  onOpenPricing,
}) => {
  return (
    <footer className="border-t border-[#E0E3EB] dark:border-[#2A2E39] bg-[#F8F9FD] dark:bg-[#181C28] mt-8">
      <div className="mx-auto max-w-[1360px] px-6 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[#131722] dark:text-[#D1D4DC]">
            <svg width="24" height="16" viewBox="0 0 36 22" fill="none" aria-hidden="true">
              <path d="M14 2H0V8H8V20H14V2Z" fill="currentColor" />
              <circle cx="20" cy="5" r="3" fill="currentColor" />
              <path d="M23.5 20L30 2H36L29.5 20H23.5Z" fill="currentColor" />
            </svg>
            <span className="font-headline text-[16px] font-bold">TradingView</span>
          </div>
          <p className="text-[13px] leading-[18px] text-[#6A6D78] dark:text-[#92959E] max-w-prose">
            Select market data provided by ICE Data Services. Reference data provided by FactSet.
          </p>
          <p className="font-label text-[11px] font-semibold text-[#6A6D78] dark:text-[#92959E]">
            MADE BY HUMANS · © 2026 TradingView, Inc.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-label text-[11px] font-semibold uppercase tracking-[0.4px] text-[#131722] dark:text-[#D1D4DC]">
            MORE THAN A PRODUCT
          </h3>
          <a
            href="#indices"
            className="text-left text-[13px] text-[#6A6D78] dark:text-[#92959E] hover:text-[#131722] dark:hover:text-[#D1D4DC]"
          >
            Supercharts
          </a>
          <button
            type="button"
            onClick={() => onOpenScreener('us-stocks', 'Stock Screener')}
            className="text-left text-[13px] text-[#6A6D78] dark:text-[#92959E] hover:text-[#131722] dark:hover:text-[#D1D4DC] cursor-pointer"
          >
            Stock Screener
          </button>
          <button
            type="button"
            onClick={() => onOpenScreener('crypto', 'Crypto Markets')}
            className="text-left text-[13px] text-[#6A6D78] dark:text-[#92959E] hover:text-[#131722] dark:hover:text-[#D1D4DC] cursor-pointer"
          >
            Heatmaps
          </button>
          <button
            type="button"
            onClick={onOpenCalendar}
            className="text-left text-[13px] text-[#6A6D78] dark:text-[#92959E] hover:text-[#131722] dark:hover:text-[#D1D4DC] cursor-pointer"
          >
            Economic Calendar
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-label text-[11px] font-semibold uppercase tracking-[0.4px] text-[#131722] dark:text-[#D1D4DC]">
            COMPANY
          </h3>
          <a
            href="#top"
            className="text-left text-[13px] text-[#6A6D78] dark:text-[#92959E] hover:text-[#131722] dark:hover:text-[#D1D4DC]"
          >
            Who we are
          </a>
          <button
            type="button"
            onClick={onOpenPricing}
            className="text-left text-[13px] text-[#6A6D78] dark:text-[#92959E] hover:text-[#131722] dark:hover:text-[#D1D4DC] cursor-pointer"
          >
            Pricing
          </button>
          <a
            href="#economy"
            className="text-left text-[13px] text-[#6A6D78] dark:text-[#92959E] hover:text-[#131722] dark:hover:text-[#D1D4DC]"
          >
            Blog
          </a>
          <a
            href="#world-stocks"
            className="text-left text-[13px] text-[#6A6D78] dark:text-[#92959E] hover:text-[#131722] dark:hover:text-[#D1D4DC]"
          >
            Careers
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-label text-[11px] font-semibold uppercase tracking-[0.4px] text-[#131722] dark:text-[#D1D4DC]">
            COMMUNITY
          </h3>
          <a
            href="#us-stocks"
            className="text-left text-[13px] text-[#6A6D78] dark:text-[#92959E] hover:text-[#131722] dark:hover:text-[#D1D4DC]"
          >
            Trading Ideas
          </a>
          <button
            type="button"
            onClick={() => onOpenScreener('etfs', 'ETF Screener')}
            className="text-left text-[13px] text-[#6A6D78] dark:text-[#92959E] hover:text-[#131722] dark:hover:text-[#D1D4DC] cursor-pointer"
          >
            Pine Script
          </button>
          <button
            type="button"
            onClick={() => onOpenScreener('futures', 'Futures & Commodities')}
            className="text-left text-[13px] text-[#6A6D78] dark:text-[#92959E] hover:text-[#131722] dark:hover:text-[#D1D4DC] cursor-pointer"
          >
            Widgets
          </button>
          <button
            type="button"
            onClick={() => onOpenScreener('forex', 'Forex Markets')}
            className="text-left text-[13px] text-[#6A6D78] dark:text-[#92959E] hover:text-[#131722] dark:hover:text-[#D1D4DC] cursor-pointer"
          >
            Brokers
          </button>
        </div>
      </div>
    </footer>
  );
};

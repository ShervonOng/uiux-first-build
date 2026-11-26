import React from 'react';
import { ChevronRight } from 'lucide-react';
import { WORLD_BIGGEST_COMPANIES, WORLD_LARGEST_EMPLOYERS } from '../data/marketData';
import { MarketCategory, MarketInstrument } from '../types/market';

interface WorldStocksSectionProps {
  onInspectInstrument: (instrument: MarketInstrument) => void;
  onOpenScreener: (cat: MarketCategory, title: string) => void;
}

export const WorldStocksSection: React.FC<WorldStocksSectionProps> = ({
  onInspectInstrument,
  onOpenScreener,
}) => {
  return (
    <section
      id="world-stocks"
      className="flex flex-col gap-6 pt-4 border-t border-[#E0E3EB] dark:border-[#2A2E39] scroll-mt-20"
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onOpenScreener('world-stocks', 'World Stocks')}
          className="inline-flex items-center gap-1 group cursor-pointer"
        >
          <h2 className="font-headline text-[28px] font-bold leading-[34px] tracking-[-0.4px] text-[#131722] dark:text-[#D1D4DC]">
            World stocks
          </h2>
          <ChevronRight
            className="w-5 h-5 text-[#131722] dark:text-[#D1D4DC] transition-transform duration-100 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* World Biggest Companies */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-title text-[16px] font-semibold leading-[22px] text-[#131722] dark:text-[#D1D4DC]">
              World biggest companies
            </h3>
            <button
              type="button"
              onClick={() => onOpenScreener('world-stocks', 'World Biggest Companies')}
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
                    MARKET CAP
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E3EB] dark:divide-[#2A2E39]">
                {WORLD_BIGGEST_COMPANIES.map((row) => (
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
                      {row.marketCap}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* World Largest Employers */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-title text-[16px] font-semibold leading-[22px] text-[#131722] dark:text-[#D1D4DC]">
              World largest employers
            </h3>
            <button
              type="button"
              onClick={() => onOpenScreener('world-stocks', 'World Largest Employers')}
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
                    EMPLOYEES
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E3EB] dark:divide-[#2A2E39]">
                {WORLD_LARGEST_EMPLOYERS.map((row) => (
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
                      {row.employees}
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

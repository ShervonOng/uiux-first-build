import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { ECONOMY_ROWS } from '../data/marketData';
import { EconomyRow } from '../types/market';

interface EconomySectionProps {
  onOpenCalendar: () => void;
}

export const EconomySection: React.FC<EconomySectionProps> = ({ onOpenCalendar }) => {
  const [selectedCountry, setSelectedCountry] = useState<EconomyRow | null>(null);

  return (
    <section
      id="economy"
      className="flex flex-col gap-4 pt-4 border-t border-[#E0E3EB] dark:border-[#2A2E39] scroll-mt-20"
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onOpenCalendar}
          className="inline-flex items-center gap-1 group cursor-pointer"
        >
          <h2 className="font-headline text-[28px] font-bold leading-[34px] tracking-[-0.4px] text-[#131722] dark:text-[#D1D4DC]">
            Economy
          </h2>
          <ChevronRight
            className="w-5 h-5 text-[#131722] dark:text-[#D1D4DC] transition-transform duration-100 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          onClick={onOpenCalendar}
          className="font-label text-[12px] font-semibold text-[#1E53E5] hover:underline cursor-pointer"
        >
          Economic Calendar
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#E0E3EB] dark:border-[#2A2E39] bg-[#F8F9FD] dark:bg-[#181C28] text-[#6A6D78] dark:text-[#92959E]">
              <th scope="col" className="py-2.5 px-4 font-label text-[11px] font-semibold uppercase tracking-[0.4px]">
                COUNTRY
              </th>
              <th scope="col" className="py-2.5 px-4 text-right font-label text-[11px] font-semibold uppercase tracking-[0.4px]">
                GDP GROWTH
              </th>
              <th scope="col" className="py-2.5 px-4 text-right font-label text-[11px] font-semibold uppercase tracking-[0.4px]">
                INTEREST RATE
              </th>
              <th scope="col" className="py-2.5 px-4 text-right font-label text-[11px] font-semibold uppercase tracking-[0.4px]">
                INFLATION YOY
              </th>
              <th scope="col" className="py-2.5 px-4 text-right font-label text-[11px] font-semibold uppercase tracking-[0.4px]">
                UNEMPLOYMENT
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E0E3EB] dark:divide-[#2A2E39] tabular-nums">
            {ECONOMY_ROWS.map((row) => {
              const isSelected = selectedCountry?.code === row.code;
              return (
                <React.Fragment key={row.code}>
                  <tr
                    onClick={() => setSelectedCountry(isSelected ? null : row)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#F0F3FA] dark:bg-[#1E222D]'
                        : 'hover:bg-[#F8F9FD] dark:hover:bg-[#181C28]'
                    }`}
                  >
                    <td className="py-2.5 px-4 font-label text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                      {row.country}
                    </td>
                    <td
                      className={`py-2.5 px-4 text-right text-[14px] ${
                        row.gdpPositive ? 'text-[#067562] dark:text-[#089981]' : 'text-[#C91D2C] dark:text-[#F23645]'
                      }`}
                    >
                      {row.gdpGrowth}
                    </td>
                    <td className="py-2.5 px-4 text-right text-[14px] text-[#131722] dark:text-[#D1D4DC]">
                      {row.interestRate}
                    </td>
                    <td className="py-2.5 px-4 text-right text-[14px] text-[#131722] dark:text-[#D1D4DC]">
                      {row.inflationYoY}
                    </td>
                    <td className="py-2.5 px-4 text-right text-[14px] text-[#131722] dark:text-[#D1D4DC]">
                      {row.unemployment}
                    </td>
                  </tr>
                  {isSelected && (
                    <tr className="bg-[#F8F9FD] dark:bg-[#181C28]">
                      <td colSpan={5} className="px-4 py-3">
                        <div className="flex flex-wrap items-center justify-between gap-4 text-[13px]">
                          <div className="space-y-1">
                            <div className="font-semibold text-[#131722] dark:text-[#D1D4DC]">
                              {row.centralBank} · Next Policy Decision: {row.nextDecision}
                            </div>
                            <p className="text-[#6A6D78] dark:text-[#92959E]">{row.outlook}</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenCalendar();
                            }}
                            className="font-label text-[12px] font-semibold text-[#1E53E5] hover:underline whitespace-nowrap"
                          >
                            View {row.country} Releases →
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

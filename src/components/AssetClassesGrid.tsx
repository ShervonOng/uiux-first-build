import React from 'react';
import { ChevronRight } from 'lucide-react';
import { BONDS_ITEMS, ETFS_ITEMS, FOREX_ITEMS, FUTURES_ITEMS } from '../data/marketData';
import { MarketCategory, MarketInstrument } from '../types/market';

interface AssetClassesGridProps {
  onInspectInstrument: (instrument: MarketInstrument) => void;
  onOpenScreener: (cat: MarketCategory, title: string) => void;
}

interface AssetColumn {
  id: MarketCategory;
  title: string;
  items: MarketInstrument[];
}

export const AssetClassesGrid: React.FC<AssetClassesGridProps> = ({
  onInspectInstrument,
  onOpenScreener,
}) => {
  const columns: AssetColumn[] = [
    { id: 'futures', title: 'Futures', items: FUTURES_ITEMS },
    { id: 'forex', title: 'Forex', items: FOREX_ITEMS },
    { id: 'bonds', title: 'Bonds', items: BONDS_ITEMS },
    { id: 'etfs', title: 'ETFs', items: ETFS_ITEMS },
  ];

  return (
    <section
      id="futures"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-[#E0E3EB] dark:border-[#2A2E39] scroll-mt-20"
    >
      {columns.map((col) => (
        <div
          key={col.id}
          id={col.id !== 'futures' ? col.id : undefined}
          className="flex flex-col gap-3 rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39] p-4 scroll-mt-20"
        >
          <button
            type="button"
            onClick={() => onOpenScreener(col.id, `${col.title} Overview`)}
            className="inline-flex items-center justify-between w-full group cursor-pointer"
          >
            <h2 className="font-headline text-[20px] font-bold leading-[26px] tracking-[-0.2px] text-[#131722] dark:text-[#D1D4DC]">
              {col.title}
            </h2>
            <ChevronRight
              className="w-4 h-4 text-[#6A6D78] dark:text-[#92959E] transition-transform duration-100 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>

          <div className="divide-y divide-[#E0E3EB] dark:divide-[#2A2E39]">
            {col.items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onInspectInstrument(item)}
                className="w-full flex items-center justify-between py-2.5 text-left hover:bg-[#F8F9FD] dark:hover:bg-[#181C28] -mx-1 px-1 rounded transition-colors cursor-pointer"
              >
                <div>
                  <div className="font-label text-[12px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                    {item.name}
                  </div>
                  <div className="font-mono text-[12px] text-[#6A6D78] dark:text-[#92959E]">
                    {item.symbol}
                  </div>
                </div>
                <div className="text-right tabular-nums">
                  <div className="font-label text-[12px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                    {item.price}
                  </div>
                  <div
                    className={`font-label text-[11px] font-semibold ${
                      item.gain ? 'text-[#067562] dark:text-[#089981]' : 'text-[#C91D2C] dark:text-[#F23645]'
                    }`}
                  >
                    {item.changePct}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

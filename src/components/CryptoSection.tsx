import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CRYPTO_GAINERS, CRYPTO_LOSERS, CRYPTO_MARKET_CAP } from '../data/marketData';
import { MarketCategory, MarketInstrument } from '../types/market';

interface CryptoSectionProps {
  onInspectInstrument: (instrument: MarketInstrument) => void;
  onOpenScreener: (cat: MarketCategory, title: string) => void;
}

export const CryptoSection: React.FC<CryptoSectionProps> = ({
  onInspectInstrument,
  onOpenScreener,
}) => {
  return (
    <section
      id="crypto"
      className="flex flex-col gap-6 pt-4 border-t border-[#E0E3EB] dark:border-[#2A2E39] scroll-mt-20"
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onOpenScreener('crypto', 'Cryptocurrency Markets')}
          className="inline-flex items-center gap-1 group cursor-pointer"
        >
          <h2 className="font-headline text-[28px] font-bold leading-[34px] tracking-[-0.4px] text-[#131722] dark:text-[#D1D4DC]">
            Crypto
          </h2>
          <ChevronRight
            className="w-5 h-5 text-[#131722] dark:text-[#D1D4DC] transition-transform duration-100 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Crypto Market Cap Ranking */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-title text-[16px] font-semibold leading-[22px] text-[#131722] dark:text-[#D1D4DC]">
              Crypto market cap ranking
            </h3>
            <button
              type="button"
              onClick={() => onOpenScreener('crypto', 'All Coins Market Cap')}
              className="font-label text-[12px] font-semibold text-[#1E53E5] hover:underline cursor-pointer"
            >
              See all coins
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
                {CRYPTO_MARKET_CAP.map((coin) => (
                  <tr
                    key={coin.id}
                    onClick={() => onInspectInstrument(coin)}
                    className="hover:bg-[#F8F9FD] dark:hover:bg-[#181C28] cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 pr-3">
                      <div className="font-label text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                        {coin.name}
                      </div>
                      <div className="font-mono text-[12px] text-[#6A6D78] dark:text-[#92959E]">
                        {coin.symbol}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums">
                      <div className="font-label text-[12px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                        {coin.price}
                      </div>
                      <div
                        className={`font-label text-[11px] font-semibold ${
                          coin.gain ? 'text-[#067562] dark:text-[#089981]' : 'text-[#C91D2C] dark:text-[#F23645]'
                        }`}
                      >
                        {coin.changePct}
                      </div>
                    </td>
                    <td className="py-2.5 pl-3 text-right tabular-nums text-[14px] text-[#131722] dark:text-[#D1D4DC]">
                      {coin.marketCap}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Crypto Gainers & Losers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="font-title text-[16px] font-semibold leading-[22px] text-[#131722] dark:text-[#D1D4DC]">
              Crypto gainers
            </h3>
            <div className="divide-y divide-[#E0E3EB] dark:divide-[#2A2E39] rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39] px-3.5">
              {CRYPTO_GAINERS.map((coin) => (
                <button
                  key={coin.id}
                  type="button"
                  onClick={() => onInspectInstrument(coin)}
                  className="w-full flex items-center justify-between py-2.5 text-left hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <div>
                    <div className="font-label text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                      {coin.name}
                    </div>
                    <div className="font-mono text-[12px] text-[#6A6D78] dark:text-[#92959E]">
                      {coin.symbol}
                    </div>
                  </div>
                  <span className="font-label text-[12px] font-semibold text-[#067562] dark:text-[#089981] tabular-nums">
                    {coin.changePct}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-title text-[16px] font-semibold leading-[22px] text-[#131722] dark:text-[#D1D4DC]">
              Crypto losers
            </h3>
            <div className="divide-y divide-[#E0E3EB] dark:divide-[#2A2E39] rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39] px-3.5">
              {CRYPTO_LOSERS.map((coin) => (
                <button
                  key={coin.id}
                  type="button"
                  onClick={() => onInspectInstrument(coin)}
                  className="w-full flex items-center justify-between py-2.5 text-left hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <div>
                    <div className="font-label text-[14px] font-semibold text-[#131722] dark:text-[#D1D4DC]">
                      {coin.name}
                    </div>
                    <div className="font-mono text-[12px] text-[#6A6D78] dark:text-[#92959E]">
                      {coin.symbol}
                    </div>
                  </div>
                  <span className="font-label text-[12px] font-semibold text-[#C91D2C] dark:text-[#F23645] tabular-nums">
                    {coin.changePct}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

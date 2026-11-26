export type Timeframe = '1D' | '1M' | '3M' | '1Y' | '5Y' | 'All';

export type MarketCategory =
  | 'indices'
  | 'us-stocks'
  | 'world-stocks'
  | 'crypto'
  | 'futures'
  | 'forex'
  | 'bonds'
  | 'etfs'
  | 'economy';

export interface ChartPoint {
  label: string;
  value: number;
}

export interface TimeframeSeries {
  deltaText: string;
  gain: boolean;
  points: ChartPoint[];
}

export interface MarketInstrument {
  id: string;
  symbol: string;
  name: string;
  category: MarketCategory;
  region?: 'Americas' | 'Europe' | 'Asia-Pacific' | 'Global';
  price: string;
  numericPrice: number;
  currency?: string;
  changePct: string;
  numericChangePct: number;
  gain: boolean;
  volume?: string;
  marketCap?: string;
  employees?: string;
  dayRange?: string;
  week52Range?: string;
  peRatio?: string;
  exchange?: string;
  badgeText?: string;
  badgeColorClass?: string;
  description?: string;
}

export interface MajorIndex extends MarketInstrument {
  badgeText: string;
  badgeBgClass: string;
  seriesByTimeframe: Record<Timeframe, TimeframeSeries>;
}

export interface EconomyRow {
  country: string;
  code: string;
  gdpGrowth: string;
  gdpPositive: boolean;
  interestRate: string;
  inflationYoY: string;
  unemployment: string;
  centralBank: string;
  nextDecision: string;
  outlook: string;
}

export interface EconomicEvent {
  id: string;
  time: string;
  date: string;
  country: string;
  event: string;
  impact: 'High' | 'Medium' | 'Low';
  actual: string;
  forecast: string;
  previous: string;
}

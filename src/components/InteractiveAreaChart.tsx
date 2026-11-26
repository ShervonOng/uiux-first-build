import React, { useMemo, useRef, useState } from 'react';
import { ChartPoint } from '../types/market';

interface InteractiveAreaChartProps {
  points: ChartPoint[];
  gain: boolean;
  heightClass?: string;
  gradientIdSuffix?: string;
}

function formatAxisNumber(val: number): string {
  if (val >= 1000) {
    return Math.round(val).toLocaleString('en-US');
  }
  if (val >= 10) {
    return val.toFixed(2);
  }
  return val.toFixed(4);
}

export const InteractiveAreaChart: React.FC<InteractiveAreaChartProps> = ({
  points,
  gain,
  heightClass = 'h-[260px]',
  gradientIdSuffix = 'main',
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const width = 1200;
  const chartRight = 1126;
  const chartTop = 26;
  const chartBottom = 234;
  const height = 260;

  const { minVal, maxVal, coords, linePath, areaPath, ticks } = useMemo(() => {
    const values = points.map((p) => p.value);
    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    const span = rawMax - rawMin || rawMax * 0.02 || 1;
    const paddedMin = rawMin - span * 0.14;
    const paddedMax = rawMax + span * 0.14;
    const range = paddedMax - paddedMin;

    const computedCoords = points.map((pt, i) => {
      const x =
        points.length === 1
          ? chartRight / 2
          : (i / (points.length - 1)) * chartRight;
      const y =
        chartBottom - ((pt.value - paddedMin) / range) * (chartBottom - chartTop);
      return { x, y, point: pt };
    });

    const line = computedCoords
      .map((c, idx) => `${idx === 0 ? 'M' : 'L'}${c.x.toFixed(1)},${c.y.toFixed(1)}`)
      .join(' ');
    const area = `${line} L${chartRight},${chartBottom + 6} L0,${chartBottom + 6} Z`;

    const yRows = [45, 110, 175, 230];
    const tickItems = yRows.map((yPos) => {
      const ratio = (chartBottom - yPos) / (chartBottom - chartTop);
      const val = paddedMin + ratio * range;
      return { y: yPos, label: formatAxisNumber(val) };
    });

    return {
      minVal: paddedMin,
      maxVal: paddedMax,
      coords: computedCoords,
      linePath: line,
      areaPath: area,
      ticks: tickItems,
    };
  }, [points]);

  const strokeColor = gain ? '#089981' : '#F23645';
  const gradId = `chartGrad-${gain ? 'gain' : 'loss'}-${gradientIdSuffix}`;

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg || coords.length === 0) return;
    const rect = svg.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * width;
    const clampedX = Math.max(0, Math.min(chartRight, relX));
    const idx = Math.round((clampedX / chartRight) * (coords.length - 1));
    setHoverIdx(Math.max(0, Math.min(coords.length - 1, idx)));
  };

  const activeCoord = hoverIdx !== null ? coords[hoverIdx] : null;
  const _unusedBounds = minVal + maxVal;
  void _unusedBounds;

  return (
    <div className="relative w-full select-none">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className={`w-full ${heightClass} cursor-crosshair overflow-visible`}
        role="img"
        aria-label="Market performance area chart"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverIdx(null)}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.24" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal dashed grid lines */}
        {ticks.map((t) => (
          <g key={t.y}>
            <line
              x1="0"
              y1={t.y}
              x2={chartRight}
              y2={t.y}
              className="stroke-[#E0E3EB] dark:stroke-[#2A2E39]"
              strokeDasharray="3 3"
            />
            <text
              x={chartRight + 14}
              y={t.y + 4}
              className="fill-[#6A6D78] dark:fill-[#92959E]"
              fontFamily="Red Hat Mono, monospace"
              fontSize="11"
            >
              {t.label}
            </text>
          </g>
        ))}

        {/* Area & Line */}
        <path d={areaPath} fill={`url(#${gradId})`} />
        <path
          d={linePath}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Hover Crosshair & Marker */}
        {activeCoord && (
          <g>
            <line
              x1={activeCoord.x}
              y1={chartTop - 8}
              x2={activeCoord.x}
              y2={chartBottom + 6}
              className="stroke-[#737687] dark:stroke-[#5D606B]"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <circle
              cx={activeCoord.x}
              cy={activeCoord.y}
              r="7"
              fill={strokeColor}
              fillOpacity="0.2"
            />
            <circle
              cx={activeCoord.x}
              cy={activeCoord.y}
              r="4"
              fill={strokeColor}
              className="stroke-white dark:stroke-[#131722]"
              strokeWidth="2"
            />
          </g>
        )}
      </svg>

      {/* Floating Tooltip */}
      {activeCoord && (
        <div
          className="pointer-events-none absolute top-1 z-10 rounded-md border border-[#E0E3EB] dark:border-[#2A2E39] bg-white/95 dark:bg-[#1E222D]/95 px-2.5 py-1.5 shadow-sm backdrop-blur-sm transition-transform duration-75"
          style={{
            left: `clamp(8px, calc(${(activeCoord.x / width) * 100}% - 56px), calc(100% - 148px))`,
          }}
        >
          <div className="font-mono text-[12px] font-semibold text-[#131722] dark:text-[#D1D4DC] tabular-nums">
            {formatAxisNumber(activeCoord.point.value)}
          </div>
          <div className="font-mono text-[11px] text-[#6A6D78] dark:text-[#92959E]">
            {activeCoord.point.label}
          </div>
        </div>
      )}
    </div>
  );
};

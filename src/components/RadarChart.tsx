'use client';

import { useState, useMemo } from 'react';

interface DataSet {
  label: string;
  color: string;
  values: { [key: string]: number };
}

interface RadarChartProps {
  dimensions: { key: string; label: string; max: number }[];
  datasets: DataSet[];
  minBranches?: number;
}

const POLYGON_LEVELS = [1, 2, 3, 4, 5];

export default function RadarChart({ dimensions, datasets, minBranches = 3 }: RadarChartProps) {
  const [activeDimensions, setActiveDimensions] = useState<Set<string>>(
    () => new Set(dimensions.map((d) => d.key))
  );

  const visibleDimensions = useMemo(
    () => dimensions.filter((d) => activeDimensions.has(d.key)),
    [dimensions, activeDimensions]
  );

  const toggleDimension = (key: string) => {
    setActiveDimensions((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size <= minBranches) return prev;
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const selectAll = () => setActiveDimensions(new Set(dimensions.map((d) => d.key)));
  const selectMin = () => setActiveDimensions(new Set(dimensions.slice(0, minBranches).map((d) => d.key)));

  // SVG geometry - large viewBox so labels have room
  const size = 500;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 150;

  const getPoint = (index: number, total: number, value: number, max: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = (value / max) * radius;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  const getPolygonPoints = (values: Record<string, number>) => {
    return visibleDimensions
      .map((dim, i) => {
        const val = values[dim.key] ?? 0;
        const pt = getPoint(i, visibleDimensions.length, val, dim.max);
        return `${pt.x},${pt.y}`;
      })
      .join(' ');
  };

  const gridPolygon = (level: number) => {
    return visibleDimensions
      .map((_, i) => {
        const pt = getPoint(i, visibleDimensions.length, level, 5);
        return `${pt.x},${pt.y}`;
      })
      .join(' ');
  };

  return (
    <div className="space-y-4">
      {/* Dimension toggles */}
      <div className="flex flex-wrap gap-2">
        {dimensions.map((dim) => {
          const active = activeDimensions.has(dim.key);
          return (
            <button
              key={dim.key}
              onClick={() => toggleDimension(dim.key)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                active
                  ? 'bg-blue-100 text-blue-800 ring-1 ring-blue-300'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {dim.label}
            </button>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 text-xs">
        <button onClick={selectAll} className="text-blue-600 hover:underline">
          Tout afficher
        </button>
        <span className="text-gray-300">|</span>
        <button onClick={selectMin} className="text-blue-600 hover:underline">
          Minimum ({minBranches})
        </button>
        <span className="ml-auto text-gray-400">
          {visibleDimensions.length} branche{visibleDimensions.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Radar SVG */}
      <div className="flex justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="h-72 w-72 sm:h-96 sm:w-96">
          {/* Grid levels */}
          {POLYGON_LEVELS.map((level) => (
            <polygon
              key={level}
              points={gridPolygon(level)}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={level === 5 ? 1.5 : 0.75}
            />
          ))}

          {/* Axis lines */}
          {visibleDimensions.map((_, i) => {
            const pt = getPoint(i, visibleDimensions.length, 5, 5);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={pt.x}
                y2={pt.y}
                stroke="#e5e7eb"
                strokeWidth={0.75}
              />
            );
          })}

          {/* Data polygons */}
          {datasets.map((ds, dsIndex) => (
            <polygon
              key={dsIndex}
              points={getPolygonPoints(ds.values)}
              fill={ds.color}
              fillOpacity={0.15}
              stroke={ds.color}
              strokeWidth={2}
              className="transition-all duration-300"
            />
          ))}

          {/* Data points */}
          {datasets.map((ds, dsIndex) =>
            visibleDimensions.map((dim, i) => {
              const val = ds.values[dim.key] ?? 0;
              const pt = getPoint(i, visibleDimensions.length, val, dim.max);
              return (
                <circle
                  key={`${dsIndex}-${dim.key}`}
                  cx={pt.x}
                  cy={pt.y}
                  r={4}
                  fill={ds.color}
                  stroke="white"
                  strokeWidth={2}
                  className="transition-all duration-300"
                />
              );
            })
          )}

          {/* Labels - placed further out with paint-order halo for readability */}
          {visibleDimensions.map((dim, i) => {
            const angle = (Math.PI * 2 * i) / visibleDimensions.length - Math.PI / 2;
            const labelR = radius + 55;
            const x = cx + labelR * Math.cos(angle);
            const y = cy + labelR * Math.sin(angle);

            let anchor: 'middle' | 'start' | 'end' = 'middle';
            if (Math.cos(angle) > 0.3) anchor = 'start';
            else if (Math.cos(angle) < -0.3) anchor = 'end';

            // Get values for all datasets at this dimension
            const vals = datasets.map((ds) => ds.values[dim.key] ?? 0);

            return (
              <g key={dim.key}>
                <text
                  x={x}
                  y={y - 3}
                  textAnchor={anchor}
                  dominantBaseline="central"
                  fill="#374151"
                  fontSize={12}
                  fontWeight={600}
                  stroke="white"
                  strokeWidth={4}
                  paintOrder="stroke"
                >
                  {dim.label}
                </text>
                <text
                  x={x}
                  y={y + 11}
                  textAnchor={anchor}
                  dominantBaseline="central"
                  fill="#6b7280"
                  fontSize={11}
                  stroke="white"
                  strokeWidth={3}
                  paintOrder="stroke"
                >
                  {vals.map((v, vi) => (
                    <tspan key={vi} fill={datasets[vi].color} fontWeight={700}>
                      {v}{vi < vals.length - 1 ? ' / ' : ''}
                    </tspan>
                  ))}
                  <tspan fill="#9ca3af">/5</tspan>
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      {datasets.length > 1 && (
        <div className="flex justify-center gap-6">
          {datasets.map((ds, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: ds.color }}
              />
              <span className="text-sm font-medium text-gray-700">{ds.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

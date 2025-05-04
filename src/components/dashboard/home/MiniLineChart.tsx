
import React from 'react';

interface MiniLineChartProps {
  data: number[];
  height?: number;
  width?: number;
  lineColor?: string;
  className?: string;
}

export function MiniLineChart({ 
  data,
  height = 30,
  width = 100, 
  lineColor = "#8B5CF6",
  className
}: MiniLineChartProps) {
  if (!data || data.length === 0) return null;
  
  // Find min and max to scale the chart
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1; // Avoid division by zero
  
  // Calculate points for the SVG path
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={`inline-block ${className}`}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Line representing the data trend */}
        <polyline
          fill="none"
          stroke={lineColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        
        {/* Gradient fill under the line */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        
        {/* Create a filled area under the line */}
        <path
          d={`M0,${height} ${points} ${width},${height} Z`}
          fill="url(#gradient)"
        />
      </svg>
    </div>
  );
}

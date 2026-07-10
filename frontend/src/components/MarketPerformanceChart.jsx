import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

// Utility to generate a sparkline of recent simulated performance
const generatePerformanceData = () => {
  const data = [];
  let currentValue = 15000; // Starting simulated index value
  const now = new Date();
  
  // Generate data for the last 30 days
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Add random volatility (-1.5% to +2%)
    const change = (Math.random() * 0.035) - 0.015;
    currentValue = currentValue * (1 + change);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(currentValue)
    });
  }
  return data;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#1a1a24] p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">{label}</p>
        <p className="text-blue-600 dark:text-blue-400 font-bold text-sm">
          {payload[0].value.toLocaleString()} pts
        </p>
      </div>
    );
  }
  return null;
};

const MarketPerformanceChart = () => {
  // Memoize data to prevent re-generating on every render
  const data = useMemo(() => generatePerformanceData(), []);
  
  // Use redux theme to adjust colors if necessary (optional)
  const theme = useSelector((state) => state.theme?.theme || 'light');
  const isDark = document.documentElement.classList.contains('dark') || theme === 'dark';
  const lineColor = isDark ? '#3b82f6' : '#2563eb'; // Tailwind blue-500 : blue-600

  return (
    <div className="w-full relative">
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#e2e8f0'} />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: isDark ? '#94a3b8' : '#64748b' }}
            minTickGap={20}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: isDark ? '#94a3b8' : '#64748b' }}
            domain={['auto', 'auto']}
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={lineColor} 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: lineColor, stroke: isDark ? '#1e1e2d' : '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketPerformanceChart;

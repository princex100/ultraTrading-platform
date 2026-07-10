import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useSelector } from 'react-redux';

// Utility to generate simulated volume data for top stocks
const generateVolumeData = (stocks) => {
  if (stocks && stocks.length > 0) {
    // Take top 5 stocks by some metric (or just first 5 for simulation)
    return stocks.slice(0, 5).map(stock => ({
      symbol: stock.symbol,
      volume: Math.floor(Math.random() * 50000) + 10000,
      isPositive: stock.percentageChange >= 0
    }));
  }
  
  // Fallback data if stocks aren't loaded yet
  return [
    { symbol: 'AAPL', volume: 45000, isPositive: true },
    { symbol: 'TSLA', volume: 38000, isPositive: false },
    { symbol: 'AMZN', volume: 32000, isPositive: true },
    { symbol: 'MSFT', volume: 29000, isPositive: true },
    { symbol: 'META', volume: 21000, isPositive: false },
  ];
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#1a1a24] p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1 font-semibold">{label}</p>
        <p className="text-gray-900 dark:text-gray-100 text-sm">
          Volume: <span className="font-bold">{(payload[0].value / 1000).toFixed(1)}k</span>
        </p>
      </div>
    );
  }
  return null;
};

const VolumeAnalysisChart = () => {
  const stocks = useSelector((state) => state.stock?.stocks || []);
  
  // Use useMemo to avoid constant shifting of random data unless stocks list changes
  const data = useMemo(() => generateVolumeData(stocks), [stocks]);

  const theme = useSelector((state) => state.theme?.theme || 'light');
  const isDark = document.documentElement.classList.contains('dark') || theme === 'dark';
  
  // Colors for positive/negative volume representation
  const colorPositive = isDark ? '#22c55e' : '#16a34a'; // green-500 : green-600
  const colorNegative = isDark ? '#ef4444' : '#dc2626'; // red-500 : red-600

  return (
    <div className="w-full relative">
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#e2e8f0'} />
          <XAxis 
            dataKey="symbol" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: isDark ? '#94a3b8' : '#64748b', fontWeight: 'bold' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: isDark ? '#94a3b8' : '#64748b' }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip cursor={{ fill: isDark ? '#334155' : '#f1f5f9', opacity: 0.4 }} content={<CustomTooltip />} />
          <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.isPositive ? colorPositive : colorNegative} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolumeAnalysisChart;

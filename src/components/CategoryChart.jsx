import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg"
      >
        <p className="text-slate-300 font-medium mb-1">{data.name}</p>
        <p className="text-sm" style={{ color: data.payload.color }}>
          Value: {data.value}%
        </p>
      </motion.div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2"
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-slate-300">{entry.value}</span>
        </motion.div>
      ))}
    </div>
  );
};

const CategoryChart = ({ data, isLoading }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [chartSize, setChartSize] = useState({ innerRadius: 40, outerRadius: 70 });

  useEffect(() => {
    const updateChartSize = () => {
      if (window.innerWidth >= 1024) {
        setChartSize({ innerRadius: 60, outerRadius: 100 });
      } else if (window.innerWidth >= 768) {
        setChartSize({ innerRadius: 50, outerRadius: 85 });
      } else {
        setChartSize({ innerRadius: 40, outerRadius: 70 });
      }
    };

    updateChartSize();
    window.addEventListener('resize', updateChartSize);
    return () => window.removeEventListener('resize', updateChartSize);
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg"
      >
        <div className="skeleton h-6 w-48 mb-4"></div>
        <div className="skeleton h-64 w-full rounded-lg"></div>
      </motion.div>
    );
  }

  const handlePieEnter = (data, index) => {
    setActiveIndex(index);
  };

  const handlePieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg"
    >
      <h3 className="text-xl font-bold text-white mb-6">Category Distribution</h3>
      
      <div className="h-48 sm:h-64 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={chartSize.innerRadius}
              outerRadius={chartSize.outerRadius}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={handlePieEnter}
              onMouseLeave={handlePieLeave}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke={activeIndex === index ? '#ffffff' : 'none'}
                  strokeWidth={activeIndex === index ? 2 : 0}
                  style={{
                    filter: activeIndex === index ? 'brightness(1.1)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Additional stats */}
      <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        {data.slice(0, 4).map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex items-center justify-between p-2 sm:p-3 bg-slate-700/50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs sm:text-sm text-slate-300">{item.name}</span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-white">{item.value}%</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryChart;

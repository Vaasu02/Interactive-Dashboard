import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDashboardData, useSalesData, useCategoryData, useRecentOrders } from './hooks/useDashboardData';
import StatsCards from './components/StatsCards';
import SalesChart from './components/SalesChart';
import CategoryChart from './components/CategoryChart';
import DataTable from './components/DataTable';
import DateRangeFilter from './components/DateRangeFilter';

const App = () => {
  const [dateRange, setDateRange] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch data using TanStack Query with date filtering
  const { data: statsData, isLoading: statsLoading } = useDashboardData();
  const { data: salesData, isLoading: salesLoading } = useSalesData(dateRange);
  const { data: categoryData, isLoading: categoryLoading } = useCategoryData();
  const { data: ordersData, isLoading: ordersLoading } = useRecentOrders(searchQuery, dateRange);

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    console.log('Date range changed:', range);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 border-b border-slate-700 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Interactive Dashboard</h1>
            <p className="text-slate-400">Tecnvirons Pvt LTD - Assignment</p>
          </div>
          <div className="flex items-center gap-4">
            <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
            {dateRange && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg"
              >
                <span className="text-sm text-blue-400">
                  {new Date(dateRange.startDate).toLocaleDateString()} - {new Date(dateRange.endDate).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleDateRangeChange(null)}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  ×
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Stats Cards */}
          <StatsCards data={statsData} isLoading={statsLoading} />

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SalesChart data={salesData} isLoading={salesLoading} />
            <CategoryChart data={categoryData} isLoading={categoryLoading} />
          </div>

          {/* Data Table */}
          <DataTable data={ordersData} isLoading={ordersLoading} />
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-slate-800 border-t border-slate-700 px-6 py-4 mt-8"
      >
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>Built with React, Recharts, Framer Motion, TanStack Query & Tailwind CSS</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default App;

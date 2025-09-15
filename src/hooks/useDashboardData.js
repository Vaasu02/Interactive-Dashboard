import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboardData'],
    queryFn: apiService.getDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSalesData = (dateRange = null) => {
  return useQuery({
    queryKey: ['salesData', dateRange],
    queryFn: () => dateRange 
      ? apiService.getSalesDataWithDateRange(dateRange.startDate, dateRange.endDate)
      : apiService.getSalesData(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCategoryData = () => {
  return useQuery({
    queryKey: ['categoryData'],
    queryFn: apiService.getCategoryData,
    staleTime: 5 * 60 * 1000,
  });
};

export const useRecentOrders = (searchQuery = '', dateRange = null) => {
  return useQuery({
    queryKey: ['recentOrders', searchQuery, dateRange],
    queryFn: () => {
      if (dateRange) {
        return apiService.getOrdersWithDateRange(dateRange.startDate, dateRange.endDate);
      }
      return searchQuery ? apiService.searchOrders(searchQuery) : apiService.getRecentOrders();
    },
    staleTime: 2 * 60 * 1000, // 2 minutes for more dynamic data
  });
};

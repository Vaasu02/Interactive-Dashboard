const API_BASE_URL = 'http://localhost:3001';

export const apiService = {
  // Fetch all dashboard data
  async getDashboardData() {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  // Fetch sales data
  async getSalesData() {
    const response = await fetch(`${API_BASE_URL}/salesData`);
    if (!response.ok) throw new Error('Failed to fetch sales data');
    return response.json();
  },

  // Fetch category data
  async getCategoryData() {
    const response = await fetch(`${API_BASE_URL}/categoryData`);
    if (!response.ok) throw new Error('Failed to fetch category data');
    return response.json();
  },

  // Fetch recent orders
  async getRecentOrders() {
    const response = await fetch(`${API_BASE_URL}/recentOrders`);
    if (!response.ok) throw new Error('Failed to fetch recent orders');
    return response.json();
  },

  // Search orders
  async searchOrders(query) {
    const response = await fetch(`${API_BASE_URL}/recentOrders?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search orders');
    return response.json();
  },

  // Fetch sales data with date range filter
  async getSalesDataWithDateRange(startDate, endDate) {
    const response = await fetch(`${API_BASE_URL}/salesData`);
    if (!response.ok) throw new Error('Failed to fetch sales data');
    const data = await response.json();
    
    if (!startDate || !endDate) return data;
    
    // Filter data based on date range (simulating date filtering)
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // For demo purposes, we'll filter based on month index
    // In a real app, you'd filter based on actual dates
    return data.filter(item => {
      const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(item.month);
      const currentDate = new Date(2024, monthIndex, 1);
      return currentDate >= start && currentDate <= end;
    });
  },

  // Fetch orders with date range filter
  async getOrdersWithDateRange(startDate, endDate) {
    const response = await fetch(`${API_BASE_URL}/recentOrders`);
    if (!response.ok) throw new Error('Failed to fetch recent orders');
    const data = await response.json();
    
    if (!startDate || !endDate) return data;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return data.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate >= start && orderDate <= end;
    });
  }
};

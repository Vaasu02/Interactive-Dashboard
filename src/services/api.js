// Static data for production
const staticData = {
  stats: {
    totalRevenue: 125000,
    totalUsers: 2847,
    totalOrders: 156,
    conversionRate: 3.2
  },
  salesData: [
    { "month": "Jan", "revenue": 12000, "orders": 45 },
    { "month": "Feb", "revenue": 15000, "orders": 52 },
    { "month": "Mar", "revenue": 18000, "orders": 61 },
    { "month": "Apr", "revenue": 22000, "orders": 73 },
    { "month": "May", "revenue": 25000, "orders": 84 },
    { "month": "Jun", "revenue": 28000, "orders": 92 },
    { "month": "Jul", "revenue": 32000, "orders": 105 },
    { "month": "Aug", "revenue": 35000, "orders": 118 },
    { "month": "Sep", "revenue": 38000, "orders": 125 },
    { "month": "Oct", "revenue": 42000, "orders": 138 },
    { "month": "Nov", "revenue": 45000, "orders": 142 },
    { "month": "Dec", "revenue": 48000, "orders": 156 }
  ],
  categoryData: [
    { "name": "Electronics", "value": 35, "color": "#8884d8" },
    { "name": "Clothing", "value": 25, "color": "#82ca9d" },
    { "name": "Books", "value": 20, "color": "#ffc658" },
    { "name": "Home & Garden", "value": 12, "color": "#ff7300" },
    { "name": "Sports", "value": 8, "color": "#00ff00" }
  ],
  recentOrders: [
    { "id": 1, "customer": "John Doe", "product": "iPhone 15", "amount": 999, "status": "Completed", "date": "2024-01-15" },
    { "id": 2, "customer": "Jane Smith", "product": "MacBook Pro", "amount": 2499, "status": "Processing", "date": "2024-01-14" },
    { "id": 3, "customer": "Mike Johnson", "product": "AirPods Pro", "amount": 249, "status": "Shipped", "date": "2024-01-13" },
    { "id": 4, "customer": "Sarah Wilson", "product": "iPad Air", "amount": 599, "status": "Completed", "date": "2024-01-12" },
    { "id": 5, "customer": "David Brown", "product": "Apple Watch", "amount": 399, "status": "Pending", "date": "2024-01-11" },
    { "id": 6, "customer": "Lisa Davis", "product": "MacBook Air", "amount": 1199, "status": "Completed", "date": "2024-01-10" },
    { "id": 7, "customer": "Tom Miller", "product": "iPhone 14", "amount": 799, "status": "Shipped", "date": "2024-01-09" },
    { "id": 8, "customer": "Emma Garcia", "product": "iPad Pro", "amount": 1099, "status": "Processing", "date": "2024-01-08" }
  ]
};

const API_BASE_URL = 'http://localhost:3001';

export const apiService = {
  // Fetch all dashboard data
  async getDashboardData() {
    if (process.env.NODE_ENV === 'production') {
      return staticData.stats;
    }
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  // Fetch sales data
  async getSalesData() {
    if (process.env.NODE_ENV === 'production') {
      return staticData.salesData;
    }
    const response = await fetch(`${API_BASE_URL}/salesData`);
    if (!response.ok) throw new Error('Failed to fetch sales data');
    return response.json();
  },

  // Fetch category data
  async getCategoryData() {
    if (process.env.NODE_ENV === 'production') {
      return staticData.categoryData;
    }
    const response = await fetch(`${API_BASE_URL}/categoryData`);
    if (!response.ok) throw new Error('Failed to fetch category data');
    return response.json();
  },

  // Fetch recent orders
  async getRecentOrders() {
    if (process.env.NODE_ENV === 'production') {
      return staticData.recentOrders;
    }
    const response = await fetch(`${API_BASE_URL}/recentOrders`);
    if (!response.ok) throw new Error('Failed to fetch recent orders');
    return response.json();
  },

  // Search orders
  async searchOrders(query) {
    if (process.env.NODE_ENV === 'production') {
      return staticData.recentOrders.filter(order =>
        order.customer.toLowerCase().includes(query.toLowerCase()) ||
        order.product.toLowerCase().includes(query.toLowerCase()) ||
        order.status.toLowerCase().includes(query.toLowerCase())
      );
    }
    const response = await fetch(`${API_BASE_URL}/recentOrders?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search orders');
    return response.json();
  },

  // Fetch sales data with date range filter
  async getSalesDataWithDateRange(startDate, endDate) {
    const data = process.env.NODE_ENV === 'production' 
      ? staticData.salesData 
      : await fetch(`${API_BASE_URL}/salesData`).then(res => res.json());
    
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
    const data = process.env.NODE_ENV === 'production' 
      ? staticData.recentOrders 
      : await fetch(`${API_BASE_URL}/recentOrders`).then(res => res.json());
    
    if (!startDate || !endDate) return data;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return data.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate >= start && orderDate <= end;
    });
  }
};

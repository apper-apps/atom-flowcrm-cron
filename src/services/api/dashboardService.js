import mockDashboard from '@/services/mockData/dashboard.json';

export const dashboardService = {
  getStats: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return mockDashboard.stats;
  },
};
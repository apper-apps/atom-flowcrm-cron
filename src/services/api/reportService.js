import mockReports from '@/services/mockData/reports.json';

export const reportService = {
  getReports: async (timeRange = '30d') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockReports[timeRange] || mockReports['30d'];
  },
};
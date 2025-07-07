import { toast } from 'react-toastify';

export const reportService = {
  getReports: async (timeRange = '30d') => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "total_revenue" } },
          { field: { Name: "deals_completed" } },
          { field: { Name: "conversion_rate" } },
          { field: { Name: "avg_deal_size" } },
          { field: { Name: "pipeline_data" } },
          { field: { Name: "sales_data" } }
        ],
        orderBy: [{ fieldName: "CreatedOn", sorttype: "DESC" }],
        pagingInfo: { limit: 1, offset: 0 }
      };

      const response = await apperClient.fetchRecords('report', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return {
          totalRevenue: 0,
          dealsCompleted: 0,
          conversionRate: 0,
          avgDealSize: 0,
          pipelineData: { labels: [], series: [] },
          salesData: { categories: [], series: [] }
        };
      }

      const reportData = response.data?.[0];
      if (!reportData) {
        return {
          totalRevenue: 0,
          dealsCompleted: 0,
          conversionRate: 0,
          avgDealSize: 0,
          pipelineData: { labels: [], series: [] },
          salesData: { categories: [], series: [] }
        };
      }

      return {
        totalRevenue: reportData.total_revenue || 0,
        dealsCompleted: reportData.deals_completed || 0,
        conversionRate: reportData.conversion_rate || 0,
        avgDealSize: reportData.avg_deal_size || 0,
        pipelineData: reportData.pipeline_data ? JSON.parse(reportData.pipeline_data) : { labels: [], series: [] },
        salesData: reportData.sales_data ? JSON.parse(reportData.sales_data) : { categories: [], series: [] }
      };
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  },
};
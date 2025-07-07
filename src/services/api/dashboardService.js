import { toast } from 'react-toastify';

export const dashboardService = {
  getStats: async () => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "total_pipeline_value" } },
          { field: { Name: "won_deals" } },
          { field: { Name: "active_deals" } },
          { field: { Name: "conversion_rate" } }
        ],
        orderBy: [{ fieldName: "CreatedOn", sorttype: "DESC" }],
        pagingInfo: { limit: 1, offset: 0 }
      };

      const response = await apperClient.fetchRecords('dashboard_stat', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return {
          totalPipelineValue: 0,
          wonDeals: 0,
          activeDeals: 0,
          conversionRate: 0
        };
      }

      const dashboardData = response.data?.[0];
      if (!dashboardData) {
        return {
          totalPipelineValue: 0,
          wonDeals: 0,
          activeDeals: 0,
          conversionRate: 0
        };
      }

      return {
        totalPipelineValue: dashboardData.total_pipeline_value || 0,
        wonDeals: dashboardData.won_deals || 0,
        activeDeals: dashboardData.active_deals || 0,
        conversionRate: dashboardData.conversion_rate || 0
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },
};
import { toast } from 'react-toastify';

export const pipelineService = {
  getStages: async () => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "order" } },
          { field: { Name: "color" } }
        ],
        orderBy: [{ fieldName: "order", sorttype: "ASC" }]
      };

      const response = await apperClient.fetchRecords('stage', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error('Error fetching stages:', error);
      throw error;
    }
  },
  
  getPipelines: async () => {
    try {
      // For simplicity, return a static pipeline structure
      // In a real application, this would also come from the database
      return [
        {
          Id: 1,
          name: "Sales Pipeline",
          stages: []
        }
      ];
    } catch (error) {
      console.error('Error fetching pipelines:', error);
      throw error;
    }
  },
};
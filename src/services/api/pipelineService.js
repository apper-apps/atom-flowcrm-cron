import { toast } from 'react-toastify';

export const pipelineService = {
getStages: async () => {
    try {
      // Ensure default stages exist before fetching
      await pipelineService.createDefaultStages();
      
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
      // Create new stages if they don't exist
      await pipelineService.createDefaultStages();
      
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

  createDefaultStages: async () => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Define the complete stage structure with new stages
      const stages = [
        { Name: "Lead", order: 1, color: "#6B7280" },
        { Name: "Prospect Qualification", order: 2, color: "#1E40AF" },
        { Name: "Qualified", order: 3, color: "#3B82F6" },
        { Name: "Proposal", order: 4, color: "#F59E0B" },
        { Name: "Negotiation", order: 5, color: "#7C3AED" },
        { Name: "Closed Won", order: 6, color: "#22C55E" },
        { Name: "Closed Lost", order: 7, color: "#EF4444" }
      ];

      // Check if stages already exist
      const existingStages = await pipelineService.getStages();
      
      // Only create stages if none exist or if we're missing the new ones
      const existingStageNames = existingStages.map(stage => stage.Name);
      const missingStages = stages.filter(stage => !existingStageNames.includes(stage.Name));
      
      if (missingStages.length > 0) {
        const params = {
          records: missingStages
        };

        const response = await apperClient.createRecord('stage', params);
        
        if (!response.success) {
          console.error('Error creating stages:', response.message);
          toast.error(response.message);
          return;
        }

        if (response.results) {
          const successfulRecords = response.results.filter(result => result.success);
          const failedRecords = response.results.filter(result => !result.success);
          
          if (failedRecords.length > 0) {
            console.error(`Failed to create ${failedRecords.length} stages:${JSON.stringify(failedRecords)}`);
            failedRecords.forEach(record => {
              record.errors?.forEach(error => {
                toast.error(`${error.fieldLabel}: ${error.message}`);
              });
              if (record.message) toast.error(record.message);
            });
          }
          
          if (successfulRecords.length > 0) {
            toast.success(`Created ${successfulRecords.length} new pipeline stages`);
          }
        }
      }
    } catch (error) {
      console.error('Error creating default stages:', error);
      throw error;
    }
  },
};
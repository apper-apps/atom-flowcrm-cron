import mockPipelines from '@/services/mockData/pipelines.json';

export const pipelineService = {
  getStages: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return mockPipelines.stages;
  },
  
  getPipelines: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return mockPipelines.pipelines;
  },
};
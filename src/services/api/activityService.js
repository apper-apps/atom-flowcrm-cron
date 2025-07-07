import mockActivities from '@/services/mockData/activities.json';

let activitiesData = [...mockActivities];

export const activityService = {
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return activitiesData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  
  getById: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const activity = activitiesData.find(a => a.Id === id);
    if (!activity) throw new Error('Activity not found');
    
    return activity;
  },
  
  getByContactId: async (contactId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return activitiesData
      .filter(activity => activity.contactId === contactId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  
  getByDealId: async (dealId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return activitiesData
      .filter(activity => activity.dealId === dealId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  
  getRecent: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return activitiesData
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);
  },
  
  create: async (activityData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const maxId = Math.max(...activitiesData.map(a => a.Id));
    const newActivity = {
      Id: maxId + 1,
      ...activityData,
      createdAt: new Date().toISOString(),
    };
    
    activitiesData.push(newActivity);
    return newActivity;
  },
  
  update: async (id, updateData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = activitiesData.findIndex(a => a.Id === id);
    if (index === -1) throw new Error('Activity not found');
    
    activitiesData[index] = { ...activitiesData[index], ...updateData };
    return activitiesData[index];
  },
  
  delete: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = activitiesData.findIndex(a => a.Id === id);
    if (index === -1) throw new Error('Activity not found');
    
    activitiesData.splice(index, 1);
    return true;
  },
};
import mockTasks from '@/services/mockData/tasks.json';

let tasksData = [...mockTasks];

export const taskService = {
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return tasksData.map(task => ({
      ...task,
      assigneeName: 'John Doe', // Would come from users table
    }));
  },
  
  getById: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const task = tasksData.find(t => t.Id === id);
    if (!task) throw new Error('Task not found');
    
    return {
      ...task,
      assigneeName: 'John Doe',
    };
  },
  
  create: async (taskData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const maxId = Math.max(...tasksData.map(t => t.Id));
    const newTask = {
      Id: maxId + 1,
      ...taskData,
      createdAt: new Date().toISOString(),
    };
    
    tasksData.push(newTask);
    return newTask;
  },
  
  update: async (id, updateData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = tasksData.findIndex(t => t.Id === id);
    if (index === -1) throw new Error('Task not found');
    
    tasksData[index] = { ...tasksData[index], ...updateData };
    return tasksData[index];
  },
  
  delete: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = tasksData.findIndex(t => t.Id === id);
    if (index === -1) throw new Error('Task not found');
    
    tasksData.splice(index, 1);
    return true;
  },
};
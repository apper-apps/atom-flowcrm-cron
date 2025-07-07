import mockDeals from '@/services/mockData/deals.json';
import mockContacts from '@/services/mockData/contacts.json';
import mockPipelines from '@/services/mockData/pipelines.json';

let dealsData = [...mockDeals];

export const dealService = {
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return dealsData.map(deal => ({
      ...deal,
      contactName: mockContacts.find(c => c.Id === deal.contactId)?.firstName + ' ' + mockContacts.find(c => c.Id === deal.contactId)?.lastName || 'Unknown',
      stageName: mockPipelines.stages.find(s => s.Id === deal.stageId)?.name || 'Unknown',
      ownerName: 'John Doe', // Would come from users table
      hasActivities: Math.random() > 0.5,
      hasTasks: Math.random() > 0.5,
      hasFiles: Math.random() > 0.5,
    }));
  },
  
  getById: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const deal = dealsData.find(d => d.Id === id);
    if (!deal) throw new Error('Deal not found');
    
    const contact = mockContacts.find(c => c.Id === deal.contactId);
    const stage = mockPipelines.stages.find(s => s.Id === deal.stageId);
    
    return {
      ...deal,
      contactName: contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown',
      contactEmail: contact?.email || '',
      contactPhone: contact?.phone || '',
      companyName: contact?.companyName || '',
      stageName: stage?.name || 'Unknown',
      ownerName: 'John Doe',
    };
  },
  
  getByContactId: async (contactId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return dealsData
      .filter(deal => deal.contactId === contactId)
      .map(deal => ({
        ...deal,
        stageName: mockPipelines.stages.find(s => s.Id === deal.stageId)?.name || 'Unknown',
      }));
  },
  
  getRecent: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return dealsData
      .slice(0, 5)
      .map(deal => ({
        ...deal,
        contactName: mockContacts.find(c => c.Id === deal.contactId)?.firstName + ' ' + mockContacts.find(c => c.Id === deal.contactId)?.lastName || 'Unknown',
        stageName: mockPipelines.stages.find(s => s.Id === deal.stageId)?.name || 'Unknown',
      }));
  },
  
  create: async (dealData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const maxId = Math.max(...dealsData.map(d => d.Id));
    const newDeal = {
      Id: maxId + 1,
      ...dealData,
      createdAt: new Date().toISOString(),
    };
    
    dealsData.push(newDeal);
    return newDeal;
  },
  
  update: async (id, updateData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = dealsData.findIndex(d => d.Id === id);
    if (index === -1) throw new Error('Deal not found');
    
    dealsData[index] = { ...dealsData[index], ...updateData };
    return dealsData[index];
  },
  
  delete: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = dealsData.findIndex(d => d.Id === id);
    if (index === -1) throw new Error('Deal not found');
    
    dealsData.splice(index, 1);
    return true;
  },
};
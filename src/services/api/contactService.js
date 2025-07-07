import mockContacts from '@/services/mockData/contacts.json';

let contactsData = [...mockContacts];

export const contactService = {
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return contactsData.map(contact => ({
      ...contact,
      ownerName: 'John Doe', // Would come from users table
      companyName: contact.companyName || null,
    }));
  },
  
  getById: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const contact = contactsData.find(c => c.Id === id);
    if (!contact) throw new Error('Contact not found');
    
    return {
      ...contact,
      ownerName: 'John Doe',
      companyName: contact.companyName || null,
    };
  },
  
  create: async (contactData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const maxId = Math.max(...contactsData.map(c => c.Id));
    const newContact = {
      Id: maxId + 1,
      ...contactData,
      createdAt: new Date().toISOString(),
    };
    
    contactsData.push(newContact);
    return newContact;
  },
  
  update: async (id, updateData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = contactsData.findIndex(c => c.Id === id);
    if (index === -1) throw new Error('Contact not found');
    
    contactsData[index] = { ...contactsData[index], ...updateData };
    return contactsData[index];
  },
  
  delete: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = contactsData.findIndex(c => c.Id === id);
    if (index === -1) throw new Error('Contact not found');
    
    contactsData.splice(index, 1);
    return true;
  },
};
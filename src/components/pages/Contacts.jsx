import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ContactTable from '@/components/organisms/ContactTable';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { contactService } from '@/services/api/contactService';

const Contacts = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const loadContacts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = await contactService.getAll();
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadContacts();
  }, []);
  
  useEffect(() => {
    if (searchQuery) {
const filtered = contacts.filter(contact =>
        contact.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (contact.company_name && contact.company_name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  }, [searchQuery, contacts]);
  
  const handleContactClick = (contact) => {
    navigate(`/contacts/${contact.Id}`);
  };
  
  const handleEditContact = (contact) => {
    navigate(`/contacts/${contact.Id}/edit`);
  };
  
  const handleDeleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.delete(contactId);
        setContacts(contacts.filter(c => c.Id !== contactId));
        toast.success('Contact deleted successfully');
      } catch (err) {
        toast.error('Failed to delete contact');
      }
    }
  };
  
  const handleAddContact = () => {
    navigate('/contacts/new');
  };
  
  if (loading) {
    return <Loading type="table" />;
  }
  
  if (error) {
    return <Error message={error} onRetry={loadContacts} />;
  }
  
  if (contacts.length === 0) {
    return (
      <Empty
        icon="Users"
        title="No contacts yet"
        description="Add your first contact to start building your customer database."
        actionText="Add Contact"
        onAction={handleAddContact}
      />
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600 mt-1">Manage your customer relationships</p>
        </div>
        <Button onClick={handleAddContact}>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Add Contact
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <SearchBar
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-80"
        />
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <ApperIcon name="Filter" className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <ApperIcon name="Download" className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <ContactTable
        contacts={filteredContacts}
        onContactClick={handleContactClick}
        onEditContact={handleEditContact}
        onDeleteContact={handleDeleteContact}
      />
    </motion.div>
  );
};

export default Contacts;
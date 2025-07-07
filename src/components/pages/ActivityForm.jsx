import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import Select from '@/components/atoms/Select';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';
import { activityService } from '@/services/api/activityService';
import { contactService } from '@/services/api/contactService';
import { dealService } from '@/services/api/dealService';

const ActivityForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [deals, setDeals] = useState([]);
const [formData, setFormData] = useState({
    type: 'call',
    subject: '',
    description: '',
    contactId: '',
    dealId: '',
    scheduledDate: '',
    duration: 30,
    outcome: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      const [contactsData, dealsData] = await Promise.all([
        contactService.getAll(),
        dealService.getAll()
      ]);
      
      setContacts(contactsData);
      setDeals(dealsData);
    } catch (error) {
      toast.error('Failed to load form data');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.type) {
      newErrors.type = 'Activity type is required';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.contactId && !formData.dealId) {
      newErrors.contactId = 'Either contact or deal must be selected';
      newErrors.dealId = 'Either contact or deal must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

try {
      setLoading(true);
      const activityData = {
        type: formData.type,
        subject: formData.subject,
        description: formData.description,
        contactId: formData.contactId ? parseInt(formData.contactId) : null,
        dealId: formData.dealId ? parseInt(formData.dealId) : null,
        scheduledDate: formData.scheduledDate,
        duration: parseInt(formData.duration),
        outcome: formData.outcome
      };
      
      const result = await activityService.create(activityData);
      if (result) {
        toast.success('Activity created successfully');
      }
      navigate('/activities');
    } catch (error) {
      toast.error('Failed to create activity');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/activities');
  };

  const activityTypes = [
    { value: 'call', label: 'Phone Call', icon: 'Phone' },
    { value: 'email', label: 'Email', icon: 'Mail' },
    { value: 'meeting', label: 'Meeting', icon: 'Users' },
    { value: 'note', label: 'Note', icon: 'FileText' },
    { value: 'task', label: 'Task', icon: 'CheckSquare' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Activity</h1>
          <p className="text-gray-600 mt-1">Record a new customer interaction</p>
        </div>
        <Button variant="outline" onClick={handleCancel}>
          <ApperIcon name="X" className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="type">Activity Type *</Label>
              <Select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={errors.type ? 'border-red-500' : ''}
              >
                {activityTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="1"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="Enter duration"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Enter activity subject"
              className={errors.subject ? 'border-red-500' : ''}
            />
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter activity description"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contactId">Related Contact</Label>
              <Select
                id="contactId"
                name="contactId"
                value={formData.contactId}
                onChange={handleInputChange}
                className={errors.contactId ? 'border-red-500' : ''}
              >
                <option value="">Select a contact</option>
{contacts.map(contact => (
                  <option key={contact.Id} value={contact.Id}>
                    {contact.first_name} {contact.last_name} {contact.company_name && `(${contact.company_name})`}
                  </option>
                ))}
              </Select>
              {errors.contactId && (
                <p className="text-sm text-red-500">{errors.contactId}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dealId">Related Deal</Label>
              <Select
                id="dealId"
                name="dealId"
                value={formData.dealId}
                onChange={handleInputChange}
                className={errors.dealId ? 'border-red-500' : ''}
              >
                <option value="">Select a deal</option>
{deals.map(deal => (
                  <option key={deal.Id} value={deal.Id}>
                    {deal.title}
                  </option>
                ))}
              </Select>
              {errors.dealId && (
                <p className="text-sm text-red-500">{errors.dealId}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scheduledDate">Scheduled Date/Time</Label>
            <Input
              id="scheduledDate"
              name="scheduledDate"
              type="datetime-local"
              value={formData.scheduledDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="outcome">Outcome</Label>
            <textarea
              id="outcome"
              name="outcome"
              value={formData.outcome}
              onChange={handleInputChange}
              placeholder="Enter activity outcome or results"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                  Create Activity
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default ActivityForm;
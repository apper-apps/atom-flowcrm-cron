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
import { dealService } from '@/services/api/dealService';
import { contactService } from '@/services/api/contactService';
import { pipelineService } from '@/services/api/pipelineService';

const DealForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [stages, setStages] = useState([]);
const [formData, setFormData] = useState({
    title: '',
    value: '',
    contactId: '',
    stageId: '',
    closeDate: '',
    description: '',
    probability: 3
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      const [contactsData, stagesData] = await Promise.all([
        contactService.getAll(),
        pipelineService.getStages()
      ]);
      
      setContacts(contactsData);
      setStages(stagesData);
      
      // Set default stage to first stage
      if (stagesData.length > 0) {
        setFormData(prev => ({
          ...prev,
          stageId: stagesData[0].Id
        }));
      }
    } catch (error) {
      toast.error('Failed to load form data');
    }
  };

const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Deal title is required';
    }
    
    if (!formData.value || formData.value <= 0) {
      newErrors.value = 'Deal value must be greater than 0';
    }
    
    if (!formData.contactId) {
      newErrors.contactId = 'Contact is required';
    }
    
    if (!formData.stageId) {
      newErrors.stageId = 'Stage is required';
    }
    
    if (formData.probability < 0 || formData.probability > 5) {
      newErrors.probability = 'Probability must be between 0 and 5';
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
      const dealData = {
        title: formData.title,
        value: parseFloat(formData.value),
        contactId: parseInt(formData.contactId),
        stageId: parseInt(formData.stageId),
        closeDate: formData.closeDate,
        description: formData.description,
        probability: parseInt(formData.probability)
      };
      
      const result = await dealService.create(dealData);
      if (result) {
        toast.success('Deal created successfully');
      }
      navigate('/deals');
    } catch (error) {
      toast.error('Failed to create deal');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/deals');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Deal</h1>
          <p className="text-gray-600 mt-1">Create a new deal in your pipeline</p>
        </div>
        <Button variant="outline" onClick={handleCancel}>
          <ApperIcon name="X" className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Deal Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter deal title"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="value">Deal Value *</Label>
              <Input
                id="value"
                name="value"
                type="number"
                step="0.01"
                min="0"
                value={formData.value}
                onChange={handleInputChange}
                placeholder="Enter deal value"
                className={errors.value ? 'border-red-500' : ''}
              />
              {errors.value && (
                <p className="text-sm text-red-500">{errors.value}</p>
              )}
            </div>

<div className="space-y-2">
              <Label htmlFor="probability">Probability (0-5)</Label>
              <Input
                id="probability"
                name="probability"
                type="number"
                min="0"
                max="5"
                value={formData.probability}
                onChange={handleInputChange}
                placeholder="Enter probability (0-5)"
                className={errors.probability ? 'border-red-500' : ''}
              />
              {errors.probability && (
                <p className="text-sm text-red-500">{errors.probability}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contactId">Contact *</Label>
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
              <Label htmlFor="stageId">Stage *</Label>
              <Select
                id="stageId"
                name="stageId"
                value={formData.stageId}
                onChange={handleInputChange}
                className={errors.stageId ? 'border-red-500' : ''}
              >
                <option value="">Select a stage</option>
{stages.map(stage => (
                  <option key={stage.Id} value={stage.Id}>
                    {stage.Name}
                  </option>
                ))}
              </Select>
              {errors.stageId && (
                <p className="text-sm text-red-500">{errors.stageId}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="closeDate">Expected Close Date</Label>
            <Input
              id="closeDate"
              name="closeDate"
              type="date"
              value={formData.closeDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter deal description"
              rows="4"
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
                  Create Deal
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default DealForm;
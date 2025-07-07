import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ActivityTimeline from "@/components/organisms/ActivityTimeline";
import ApperIcon from "@/components/ApperIcon";
import { formatDate } from "@/utils/date";
import { formatCurrency } from "@/utils/currency";
import { contactService } from "@/services/api/contactService";
import { dealService } from "@/services/api/dealService";
import { activityService } from "@/services/api/activityService";
const ContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [deals, setDeals] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const loadContactData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [contactData, dealsData, activitiesData] = await Promise.all([
        contactService.getById(parseInt(id)),
        dealService.getByContactId(parseInt(id)),
        activityService.getByContactId(parseInt(id))
      ]);
      
      setContact(contactData);
      setDeals(dealsData);
      setActivities(activitiesData);
    } catch (err) {
      setError('Failed to load contact details');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadContactData();
  }, [id]);
  
  const handleEditContact = () => {
    navigate(`/contacts/${id}/edit`);
  };
  
  const handleDeleteContact = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.delete(parseInt(id));
        toast.success('Contact deleted successfully');
        navigate('/contacts');
      } catch (err) {
        toast.error('Failed to delete contact');
      }
    }
  };
  
  if (loading) {
    return <Loading type="card" />;
  }
  
  if (error || !contact) {
    return <Error message={error} onRetry={loadContactData} />;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/contacts')}
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back to Contacts
          </Button>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {contact.firstName[0]}{contact.lastName[0]}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {contact.firstName} {contact.lastName}
              </h1>
              <p className="text-gray-600 mt-1">{contact.email}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleEditContact}>
            <ApperIcon name="Edit2" className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="danger" onClick={handleDeleteContact}>
            <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-sm text-gray-900">{contact.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <p className="text-sm text-gray-900">{contact.phone || 'Not provided'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <p className="text-sm text-gray-900">{contact.companyName || 'Not provided'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Owner
                </label>
                <p className="text-sm text-gray-900">{contact.ownerName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Created Date
                </label>
                <p className="text-sm text-gray-900">{formatDate(contact.createdAt)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Associated Deals</h2>
            
            {deals.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No deals associated with this contact</p>
            ) : (
              <div className="space-y-4">
                {deals.map((deal) => (
                  <div
                    key={deal.Id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => navigate(`/deals/${deal.Id}`)}
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{deal.title}</h3>
                      <p className="text-sm text-gray-600">{deal.stageName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(deal.value)}
                      </p>
                      <Badge variant="info" size="sm">
                        {deal.probability}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
          
          <ActivityTimeline activities={activities} title="Contact Activities" />
        </div>
        
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <Button size="sm" className="w-full justify-start">
                <ApperIcon name="Phone" className="w-4 h-4 mr-2" />
                Call Contact
              </Button>
              <Button size="sm" className="w-full justify-start">
                <ApperIcon name="Mail" className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button size="sm" className="w-full justify-start">
                <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button size="sm" className="w-full justify-start">
                <ApperIcon name="TrendingUp" className="w-4 h-4 mr-2" />
                Create Deal
              </Button>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Stats</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Deals</span>
                <span className="font-semibold text-gray-900">{deals.length}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Activities</span>
                <span className="font-semibold text-gray-900">{activities.length}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Contact</span>
                <span className="font-semibold text-gray-900">
                  {activities.length > 0 ? formatDate(activities[0].createdAt) : 'Never'}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactDetail;
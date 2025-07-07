import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ActivityTimeline from '@/components/organisms/ActivityTimeline';
import ApperIcon from '@/components/ApperIcon';
import { formatCurrency } from '@/utils/currency';
import { formatDate } from '@/utils/date';
import { dealService } from '@/services/api/dealService';
import { activityService } from '@/services/api/activityService';

const DealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const loadDealData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [dealData, activitiesData] = await Promise.all([
        dealService.getById(parseInt(id)),
        activityService.getByDealId(parseInt(id))
      ]);
      
      setDeal(dealData);
      setActivities(activitiesData);
    } catch (err) {
      setError('Failed to load deal details');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadDealData();
  }, [id]);
  
  const handleEditDeal = () => {
    navigate(`/deals/${id}/edit`);
  };
  
  const handleDeleteDeal = async () => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await dealService.delete(parseInt(id));
        toast.success('Deal deleted successfully');
        navigate('/deals');
      } catch (err) {
        toast.error('Failed to delete deal');
      }
    }
  };
  
  if (loading) {
    return <Loading type="card" />;
  }
  
  if (error || !deal) {
    return <Error message={error} onRetry={loadDealData} />;
  }
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'won':
        return 'success';
      case 'lost':
        return 'danger';
      case 'active':
        return 'info';
      default:
        return 'default';
    }
  };
  
  const getPriorityColor = (probability) => {
    if (probability >= 75) return 'success';
    if (probability >= 50) return 'warning';
    if (probability >= 25) return 'info';
    return 'danger';
  };
  
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
            onClick={() => navigate('/deals')}
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back to Deals
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{deal.title}</h1>
            <p className="text-gray-600 mt-1">Deal Details</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleEditDeal}>
            <ApperIcon name="Edit2" className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="danger" onClick={handleDeleteDeal}>
            <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Deal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deal Value
                </label>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(deal.value)}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Probability
                </label>
                <Badge variant={getPriorityColor(deal.probability)} size="lg">
                  {deal.probability}%
                </Badge>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Badge variant={getStatusColor(deal.status)} size="lg">
                  {deal.status}
                </Badge>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stage
                </label>
                <p className="text-sm text-gray-900">{deal.stageName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Close Date
                </label>
                <p className="text-sm text-gray-900">
                  {formatDate(deal.expectedCloseDate)}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Owner
                </label>
                <p className="text-sm text-gray-900">{deal.ownerName}</p>
              </div>
            </div>
          </Card>
          
          <ActivityTimeline activities={activities} title="Deal Activities" />
        </div>
        
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Contact
                </label>
                <p className="text-sm text-gray-900">{deal.contactName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-sm text-gray-900">{deal.contactEmail}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <p className="text-sm text-gray-900">{deal.contactPhone}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <p className="text-sm text-gray-900">{deal.companyName}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <Button size="sm" className="w-full justify-start">
                <ApperIcon name="Phone" className="w-4 h-4 mr-2" />
                Log Call
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
                <ApperIcon name="FileText" className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default DealDetail;
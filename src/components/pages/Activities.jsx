import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ActivityTimeline from '@/components/organisms/ActivityTimeline';
import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { activityService } from '@/services/api/activityService';
const Activities = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('all');
  const loadActivities = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = await activityService.getAll();
      setActivities(data);
      setFilteredActivities(data);
    } catch (err) {
      setError('Failed to load activities');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadActivities();
  }, []);
  
useEffect(() => {
    if (filterType === 'all') {
      setFilteredActivities(activities);
    } else {
      setFilteredActivities(activities.filter(activity => activity.type === filterType));
    }
  }, [filterType, activities]);
  
const handleAddActivity = () => {
    navigate('/activities/new');
  };
  if (loading) {
    return <Loading type="card" />;
  }
  
  if (error) {
    return <Error message={error} onRetry={loadActivities} />;
  }
  
  if (activities.length === 0) {
    return (
      <Empty
        icon="MessageCircle"
        title="No activities yet"
        description="Start tracking your customer interactions by adding activities."
        actionText="Add Activity"
        onAction={handleAddActivity}
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
          <h1 className="text-3xl font-bold text-gray-900">Activities</h1>
          <p className="text-gray-600 mt-1">Track all your customer interactions</p>
        </div>
        <Button onClick={handleAddActivity}>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Add Activity
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-48"
        >
          <option value="all">All Activities</option>
          <option value="call">Calls</option>
          <option value="email">Emails</option>
          <option value="meeting">Meetings</option>
          <option value="note">Notes</option>
          <option value="task">Tasks</option>
        </Select>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <ApperIcon name="Filter" className="w-4 h-4 mr-2" />
            More Filters
          </Button>
          <Button variant="outline" size="sm">
            <ApperIcon name="Download" className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <ActivityTimeline
        activities={filteredActivities}
        title={`${filterType === 'all' ? 'All' : filterType.charAt(0).toUpperCase() + filterType.slice(1)} Activities`}
      />
    </motion.div>
  );
};

export default Activities;
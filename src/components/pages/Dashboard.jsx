import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardStats from '@/components/organisms/DashboardStats';
import ActivityTimeline from '@/components/organisms/ActivityTimeline';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { formatCurrency } from '@/utils/currency';
import { dashboardService } from '@/services/api/dashboardService';
import { dealService } from '@/services/api/dealService';
import { activityService } from '@/services/api/activityService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [recentDeals, setRecentDeals] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [statsData, dealsData, activitiesData] = await Promise.all([
        dashboardService.getStats(),
        dealService.getRecent(),
        activityService.getRecent()
      ]);
      
      setStats(statsData);
      setRecentDeals(dealsData);
      setRecentActivities(activitiesData);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadDashboardData();
  }, []);
  
  if (loading) {
    return <Loading type="card" />;
  }
  
  if (error) {
    return <Error message={error} onRetry={loadDashboardData} />;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your sales overview.</p>
        </div>
        <Button onClick={() => navigate('/deals')}>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Add Deal
        </Button>
      </div>
      
      <DashboardStats stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Deals</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/deals')}>
              View All
              <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentDeals.map((deal) => (
              <motion.div
                key={deal.Id}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => navigate(`/deals/${deal.Id}`)}
              >
<div className="flex-1">
                  <h3 className="font-medium text-gray-900">{deal.title}</h3>
                  <p className="text-sm text-gray-600">{deal.contact_id?.Name || 'Unknown'}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(deal.value)}
</p>
                  <p className="text-sm text-gray-500">{deal.stage_id?.Name || 'Unknown'}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
        
        <ActivityTimeline activities={recentActivities} />
      </div>
    </motion.div>
  );
};

export default Dashboard;
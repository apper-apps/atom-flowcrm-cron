import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import KanbanBoard from '@/components/organisms/KanbanBoard';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { dealService } from '@/services/api/dealService';
import { pipelineService } from '@/services/api/pipelineService';

const Deals = () => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const loadDealsData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [dealsData, stagesData] = await Promise.all([
        dealService.getAll(),
        pipelineService.getStages()
      ]);
      
      setDeals(dealsData);
      setStages(stagesData);
    } catch (err) {
      setError('Failed to load deals data');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadDealsData();
  }, []);
  
const handleDealMove = async (deal, newStage) => {
    try {
      const updatedDeal = { stageId: newStage.Id };
      await dealService.update(deal.Id, updatedDeal);
      
      setDeals(deals.map(d => d.Id === deal.Id ? { ...d, stage_id: newStage.Id } : d));
      toast.success(`Deal moved to ${newStage.Name}`);
    } catch (err) {
      toast.error('Failed to move deal');
    }
  };
  
  const handleDealClick = (deal) => {
    navigate(`/deals/${deal.Id}`);
  };
  
  const handleAddDeal = () => {
    navigate('/deals/new');
  };
  
  if (loading) {
    return <Loading type="kanban" />;
  }
  
  if (error) {
    return <Error message={error} onRetry={loadDealsData} />;
  }
  
  if (deals.length === 0) {
    return (
      <Empty
        icon="TrendingUp"
        title="No deals yet"
        description="Create your first deal to start tracking your sales pipeline."
        actionText="Add Deal"
        onAction={handleAddDeal}
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
          <h1 className="text-3xl font-bold text-gray-900">Deals Pipeline</h1>
          <p className="text-gray-600 mt-1">Track and manage your sales opportunities</p>
        </div>
        <Button onClick={handleAddDeal}>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Add Deal
        </Button>
      </div>
      
      <KanbanBoard
        deals={deals}
        stages={stages}
        onDealMove={handleDealMove}
        onDealClick={handleDealClick}
        onAddDeal={handleAddDeal}
      />
    </motion.div>
  );
};

export default Deals;
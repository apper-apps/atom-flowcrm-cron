import { motion } from 'framer-motion';
import { formatCurrency } from '@/utils/currency';
import { formatRelativeDate } from '@/utils/date';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const DealCard = ({ deal, onClick, isDragging = false }) => {
  const getPriorityColor = (probability) => {
    if (probability >= 75) return 'success';
    if (probability >= 50) return 'warning';
    if (probability >= 25) return 'info';
    return 'danger';
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`deal-card p-4 cursor-pointer ${isDragging ? 'dragging' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 truncate pr-2">
          {deal.title}
        </h3>
        <Badge variant={getPriorityColor(deal.probability)} size="sm">
          {deal.probability}%
        </Badge>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="flex items-center text-xs text-gray-600">
          <ApperIcon name="DollarSign" className="w-3 h-3 mr-1" />
          {formatCurrency(deal.value)}
        </div>
        
        {deal.contactName && (
          <div className="flex items-center text-xs text-gray-600">
            <ApperIcon name="User" className="w-3 h-3 mr-1" />
            {deal.contactName}
          </div>
        )}
        
        {deal.expectedCloseDate && (
          <div className="flex items-center text-xs text-gray-600">
            <ApperIcon name="Calendar" className="w-3 h-3 mr-1" />
            {formatRelativeDate(deal.expectedCloseDate)}
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-xs text-gray-500">
          <ApperIcon name="User" className="w-3 h-3 mr-1" />
          {deal.ownerName}
        </div>
        
        <div className="flex items-center space-x-1">
          {deal.hasActivities && (
            <ApperIcon name="MessageCircle" className="w-3 h-3 text-gray-400" />
          )}
          {deal.hasTasks && (
            <ApperIcon name="CheckSquare" className="w-3 h-3 text-gray-400" />
          )}
          {deal.hasFiles && (
            <ApperIcon name="Paperclip" className="w-3 h-3 text-gray-400" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DealCard;
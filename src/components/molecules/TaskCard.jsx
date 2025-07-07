import { motion } from 'framer-motion';
import { formatRelativeDate, isOverdue, isDueToday } from '@/utils/date';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';

const TaskCard = ({ task, onComplete, onEdit }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'info';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };
  
  const getDueDateColor = (dueDate) => {
    if (isOverdue(dueDate)) return 'text-red-600';
    if (isDueToday(dueDate)) return 'text-orange-600';
    return 'text-gray-600';
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start space-x-3">
        <button
          onClick={() => onComplete(task.Id)}
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
            task.status === 'completed'
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {task.status === 'completed' && (
            <ApperIcon name="Check" className="w-3 h-3 text-white" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-sm font-semibold ${
              task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            <div className="flex items-center space-x-2">
              <Badge variant={getPriorityColor(task.priority)} size="sm">
                {task.priority}
              </Badge>
              <Badge variant={getStatusColor(task.status)} size="sm">
                {task.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
          
          {task.description && (
            <p className="text-sm text-gray-600 mb-3">
              {task.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              {task.assigneeName && (
                <div className="flex items-center">
                  <ApperIcon name="User" className="w-3 h-3 mr-1" />
                  {task.assigneeName}
                </div>
              )}
              
              {task.dueDate && (
                <div className={`flex items-center ${getDueDateColor(task.dueDate)}`}>
                  <ApperIcon name="Calendar" className="w-3 h-3 mr-1" />
                  {formatRelativeDate(task.dueDate)}
                </div>
              )}
            </div>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(task)}
              className="text-gray-500 hover:text-gray-700"
            >
              <ApperIcon name="Edit2" className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
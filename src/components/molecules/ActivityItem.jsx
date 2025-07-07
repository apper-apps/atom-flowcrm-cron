import { formatRelativeDate } from '@/utils/date';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const ActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'call':
        return 'Phone';
      case 'email':
        return 'Mail';
      case 'meeting':
        return 'Users';
      case 'note':
        return 'FileText';
      case 'task':
        return 'CheckSquare';
      default:
        return 'Circle';
    }
  };
  
  const getActivityColor = (type) => {
    switch (type) {
      case 'call':
        return 'info';
      case 'email':
        return 'success';
      case 'meeting':
        return 'secondary';
      case 'note':
        return 'warning';
      case 'task':
        return 'danger';
      default:
        return 'default';
    }
  };
  
  return (
    <div className={`activity-item type-${activity.type}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Badge variant={getActivityColor(activity.type)} size="sm">
            <ApperIcon name={getActivityIcon(activity.type)} className="w-3 h-3 mr-1" />
            {activity.type}
          </Badge>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {activity.subject}
            </h4>
            <span className="text-xs text-gray-500 flex-shrink-0">
              {formatRelativeDate(activity.createdAt)}
            </span>
          </div>
          {activity.description && (
            <p className="text-sm text-gray-600 mt-1">
              {activity.description}
            </p>
          )}
          {activity.dueDate && (
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <ApperIcon name="Calendar" className="w-3 h-3 mr-1" />
              Due: {formatRelativeDate(activity.dueDate)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
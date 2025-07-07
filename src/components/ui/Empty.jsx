import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  icon = "Inbox",
  title = "No data found",
  description = "There's nothing here yet. Get started by creating your first item.",
  actionText = "Get Started",
  onAction,
  showAction = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      <div className="mb-6 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
        <ApperIcon name={icon} className="w-12 h-12 text-gray-400" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {description}
      </p>
      
      {showAction && onAction && (
        <Button 
          onClick={onAction}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
        >
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          {actionText}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;
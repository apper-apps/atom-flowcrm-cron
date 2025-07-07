import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry,
  title = "Oops! Something went wrong"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      <div className="mb-6 w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
        <ApperIcon name="AlertCircle" className="w-10 h-10 text-red-600" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {message}
      </p>
      
      <div className="flex gap-4">
        {onRetry && (
          <Button 
            onClick={onRetry}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
        
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
          Refresh Page
        </Button>
      </div>
    </motion.div>
  );
};

export default Error;
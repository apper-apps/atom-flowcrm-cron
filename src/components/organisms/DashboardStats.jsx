import { motion } from 'framer-motion';
import { formatCurrency } from '@/utils/currency';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Pipeline Value',
      value: formatCurrency(stats.totalPipelineValue),
      icon: 'TrendingUp',
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Won Deals',
      value: stats.wonDeals,
      icon: 'Trophy',
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Active Deals',
      value: stats.activeDeals,
      icon: 'Target',
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+15%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: 'Zap',
      color: 'from-orange-500 to-red-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '+3%',
      changeColor: 'text-green-600'
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </p>
                <div className="flex items-center">
                  <ApperIcon name="TrendingUp" className={`w-4 h-4 mr-1 ${stat.changeColor}`} />
                  <span className={`text-sm font-medium ${stat.changeColor}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <ApperIcon name={stat.icon} className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
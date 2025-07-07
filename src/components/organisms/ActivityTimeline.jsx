import { motion } from 'framer-motion';
import ActivityItem from '@/components/molecules/ActivityItem';
import Empty from '@/components/ui/Empty';

const ActivityTimeline = ({ activities, title = "Recent Activities" }) => {
  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <Empty
          icon="MessageCircle"
          title="No activities yet"
          description="Activities will appear here as you interact with contacts and deals."
          showAction={false}
        />
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      
      <div className="activity-timeline">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.Id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ActivityItem activity={activity} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;
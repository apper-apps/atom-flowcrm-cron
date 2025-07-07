import { useState } from 'react';
import { motion } from 'framer-motion';
import TaskCard from '@/components/molecules/TaskCard';
import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';
import ApperIcon from '@/components/ApperIcon';
import Empty from '@/components/ui/Empty';

const TaskList = ({ tasks, onCompleteTask, onEditTask, onAddTask }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'pending') return task.status !== 'completed';
    return true;
  });
  
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
  
  if (tasks.length === 0) {
    return (
      <Empty
        icon="CheckSquare"
        title="No tasks yet"
        description="Create your first task to get started with task management."
        actionText="Add Task"
        onAction={onAddTask}
      />
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </Select>
          
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
          </Select>
        </div>
        
        <Button onClick={onAddTask}>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>
      
      {sortedTasks.length === 0 ? (
        <Empty
          icon="Filter"
          title="No tasks match your filter"
          description="Try adjusting your filter to see more tasks."
          showAction={false}
        />
      ) : (
        <div className="space-y-4">
          {sortedTasks.map((task, index) => (
            <motion.div
              key={task.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TaskCard
                task={task}
                onComplete={onCompleteTask}
                onEdit={onEditTask}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
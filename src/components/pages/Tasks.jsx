import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TaskList from '@/components/organisms/TaskList';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { taskService } from '@/services/api/taskService';
const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadTasks();
  }, []);
  
const handleCompleteTask = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      if (!task) return;
      
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      
      await taskService.update(taskId, { status: newStatus });
setTasks(tasks.map(t => t.Id === taskId ? { ...t, status: newStatus } : t));
      
      toast.success(
        newStatus === 'completed' 
          ? 'Task completed!' 
          : 'Task marked as pending'
      );
    } catch (err) {
      toast.error('Failed to update task');
    }
  };
  
  const handleEditTask = (task) => {
    // Navigate to edit task page or open modal
    console.log('Edit task:', task);
    toast.info('Edit task functionality will be implemented');
  };
  
const handleAddTask = () => {
    navigate('/tasks/new');
  };
  if (loading) {
    return <Loading type="card" />;
  }
  
  if (error) {
    return <Error message={error} onRetry={loadTasks} />;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">Manage your to-do items and deadlines</p>
        </div>
        <Button onClick={handleAddTask}>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>
      
      <TaskList
        tasks={tasks}
        onCompleteTask={handleCompleteTask}
        onEditTask={handleEditTask}
        onAddTask={handleAddTask}
      />
    </motion.div>
  );
};

export default Tasks;
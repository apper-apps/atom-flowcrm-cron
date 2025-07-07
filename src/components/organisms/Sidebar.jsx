import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const Sidebar = ({ isOpen, onClose }) => {
  const navigationItems = [
    { name: 'Dashboard', href: '/', icon: 'BarChart3' },
    { name: 'Deals', href: '/deals', icon: 'TrendingUp' },
    { name: 'Contacts', href: '/contacts', icon: 'Users' },
    { name: 'Tasks', href: '/tasks', icon: 'CheckSquare' },
    { name: 'Activities', href: '/activities', icon: 'MessageCircle' },
    { name: 'Reports', href: '/reports', icon: 'PieChart' },
  ];
  
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  };
  
  return (
    <>
      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden",
        isOpen ? "block" : "hidden"
      )}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={sidebarVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-xl"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FlowCRM
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="mt-8 px-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-r-2 border-primary"
                        : "text-gray-700 hover:bg-gray-100"
                    )
                  }
                >
                  <ApperIcon name={item.icon} className="w-5 h-5" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </nav>
        </motion.div>
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r border-gray-200 fixed left-0 top-0 bottom-0">
        <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="Zap" className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            FlowCRM
          </span>
        </div>
        
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-r-2 border-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  )
                }
              >
                <ApperIcon name={item.icon} className="w-5 h-5" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
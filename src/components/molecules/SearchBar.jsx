import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import { cn } from '@/utils/cn';

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search...", 
  className = '',
  value = '',
  onChange 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };
  
  return (
    <motion.form
      onSubmit={handleSubmit}
      className={cn("relative", className)}
      animate={{ scale: isFocused ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <ApperIcon 
          name="Search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
        />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-10 pr-4 py-2 w-full bg-white border-gray-300 focus:border-primary focus:ring-primary/50 rounded-lg shadow-sm"
        />
      </div>
    </motion.form>
  );
};

export default SearchBar;
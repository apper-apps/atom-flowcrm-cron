import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Select = forwardRef(({ 
  children, 
  className = '',
  error = false,
  ...props 
}, ref) => {
  const baseStyles = "block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors duration-200 bg-white";
  
  const errorStyles = "border-red-300 focus:ring-red-500/50 focus:border-red-500";
  
  return (
    <select
      ref={ref}
      className={cn(
        baseStyles,
        error && errorStyles,
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';

export default Select;
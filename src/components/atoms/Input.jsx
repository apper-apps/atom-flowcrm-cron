import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Input = forwardRef(({ 
  type = 'text', 
  className = '',
  error = false,
  ...props 
}, ref) => {
  const baseStyles = "block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors duration-200";
  
  const errorStyles = "border-red-300 focus:ring-red-500/50 focus:border-red-500";
  
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        baseStyles,
        error && errorStyles,
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
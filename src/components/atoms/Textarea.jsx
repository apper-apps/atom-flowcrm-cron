import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Textarea = forwardRef(({ 
  className = '',
  error = false,
  rows = 4,
  ...props 
}, ref) => {
  const baseStyles = "block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors duration-200 resize-vertical";
  
  const errorStyles = "border-red-300 focus:ring-red-500/50 focus:border-red-500";
  
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        baseStyles,
        error && errorStyles,
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
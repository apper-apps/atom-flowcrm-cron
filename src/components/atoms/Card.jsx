import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Card = forwardRef(({ 
  children, 
  className = '',
  hover = false,
  ...props 
}, ref) => {
  const baseStyles = "bg-white border border-gray-200 rounded-lg shadow-sm";
  const hoverStyles = "hover:shadow-md transition-shadow duration-200";
  
  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        hover && hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
import { forwardRef } from 'react';
import Label from '@/components/atoms/Label';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Textarea from '@/components/atoms/Textarea';
import { cn } from '@/utils/cn';

const FormField = forwardRef(({ 
  type = 'text',
  label,
  error,
  required = false,
  className = '',
  children,
  ...props 
}, ref) => {
  const renderInput = () => {
    if (type === 'select') {
      return (
        <Select ref={ref} error={!!error} {...props}>
          {children}
        </Select>
      );
    }
    
    if (type === 'textarea') {
      return (
        <Textarea ref={ref} error={!!error} {...props} />
      );
    }
    
    return (
      <Input ref={ref} type={type} error={!!error} {...props} />
    );
  };
  
  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <Label required={required}>
          {label}
        </Label>
      )}
      {renderInput()}
      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;
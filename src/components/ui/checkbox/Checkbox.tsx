import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className="hidden"
            ref={ref}
            {...props}
            id={props.id || `checkbox-${Math.random().toString(36).substring(2, 9)}`}
          />
          <label
            htmlFor={props.id || `checkbox-${Math.random().toString(36).substring(2, 9)}`}
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded border transition-colors",
              props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
              props.checked
                ? "border-primary-600 bg-primary-600 text-white"
                : "border-gray-300 bg-white",
              className
            )}
          >
            {props.checked && <Check className="h-3 w-3" />}
          </label>
        </div>
        {(label || description) && (
          <div className="ml-3 text-sm">
            {label && (
              <label 
                htmlFor={props.id || `checkbox-${Math.random().toString(36).substring(2, 9)}`} 
                className={cn(
                  "font-medium text-gray-700",
                  props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-gray-500">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export {Checkbox};
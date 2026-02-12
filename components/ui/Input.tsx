'use client';

import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  prefix?: string;
  suffix?: string;
  helperText?: string;
}

export default function Input({
  label,
  prefix,
  suffix,
  helperText,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="space-y-2">
      <label 
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-500 text-lg">{prefix}</span>
          </div>
        )}
        
        <input
          id={inputId}
          className={`
            w-full px-4 py-4 text-lg bg-gray-50 border border-gray-200 rounded-xl
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${prefix ? 'pl-12' : ''}
            ${suffix ? 'pr-12' : ''}
            ${className}
          `}
          {...props}
        />
        
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-gray-500">{suffix}</span>
          </div>
        )}
      </div>
      
      {helperText && (
        <p className="text-xs text-gray-500 mt-1">{helperText}</p>
      )}
    </div>
  );
}

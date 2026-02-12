'use client';

import { ChangeEvent } from 'react';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  formatValue?: (value: number) => string;
  showValue?: boolean;
}

export default function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix = '',
  suffix = '',
  formatValue,
  showValue = true
}: SliderProps) {
  const displayValue = formatValue 
    ? formatValue(value) 
    : `${prefix}${value.toLocaleString()}${suffix}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
        {showValue && (
          <span className="text-lg font-bold text-blue-600">
            {displayValue}
          </span>
        )}
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        style={{
          background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(value - min) / (max - min) * 100}%, #e5e7eb ${(value - min) / (max - min) * 100}%, #e5e7eb 100%)`
        }}
      />
      
      <div className="flex justify-between px-1">
        <span className="text-xs text-gray-500">
          {prefix}{formatValue ? formatValue(min) : min.toLocaleString()}{suffix}
        </span>
        <span className="text-xs text-gray-500">
          {prefix}{formatValue ? formatValue(max) : max.toLocaleString()}{suffix}
        </span>
      </div>
    </div>
  );
}

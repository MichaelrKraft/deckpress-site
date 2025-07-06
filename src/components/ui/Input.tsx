"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helpText, icon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="form-label">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "form-input",
              icon && "pl-10",
              error && "border-red-400/50 focus:ring-red-400/50",
              className
            )}
            {...props}
          />
        </div>
        
        {error && (
          <p className="text-sm text-red-400 flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </p>
        )}
        
        {helpText && !error && (
          <p className="text-sm text-white/60">{helpText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
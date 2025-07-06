"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helpText?: string
  resizable?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helpText, resizable = true, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="form-label">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={cn(
            "form-input min-h-[120px]",
            !resizable && "resize-none",
            error && "border-red-400/50 focus:ring-red-400/50",
            className
          )}
          {...props}
        />
        
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

Textarea.displayName = "Textarea"

export { Textarea }
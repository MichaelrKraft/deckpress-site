"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'rainbow'
  children: React.ReactNode
}

const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    const variants = {
      primary: "bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent",
      secondary: "bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent",
      gold: "bg-gradient-to-r from-yellow-400 via-gold-500 to-yellow-600 bg-clip-text text-transparent",
      rainbow: "bg-gradient-to-r from-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
    }

    return (
      <span
        ref={ref}
        className={cn(
          "font-bold bg-clip-text text-transparent",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

GradientText.displayName = "GradientText"

export { GradientText }
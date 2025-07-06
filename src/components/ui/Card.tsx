"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outlined'
  padding?: 'sm' | 'md' | 'lg'
  hover?: boolean
  children: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass', padding = 'md', hover = false, children, ...props }, ref) => {
    const baseClasses = "rounded-xl transition-all duration-200"
    
    const variants = {
      default: "bg-slate-800 border border-slate-700",
      glass: "glass-card",
      outlined: "border border-white/20 bg-transparent"
    }
    
    const paddings = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8"
    }

    const hoverClasses = hover ? "hover:scale-[1.02] hover:shadow-lg cursor-pointer" : ""

    // Temporarily disable motion animations for compatibility
    // if (hover) {
    //   return (
    //     <motion.div
    //       ref={ref}
    //       className={cn(
    //         baseClasses,
    //         variants[variant],
    //         paddings[padding],
    //         hoverClasses,
    //         className
    //       )}
    //       whileHover={{ scale: 1.02 }}
    //       whileTap={{ scale: 0.98 }}
    //       {...props}
    //     >
    //       {children}
    //     </motion.div>
    //   )
    // }

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          paddings[padding],
          hoverClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = "Card"

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 pb-4", className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardHeader.displayName = "CardHeader"

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight text-white", className)}
      {...props}
    >
      {children}
    </h3>
  )
)

CardTitle.displayName = "CardTitle"

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-white/70", className)}
      {...props}
    >
      {children}
    </p>
  )
)

CardDescription.displayName = "CardDescription"

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("", className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardContent.displayName = "CardContent"

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4", className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
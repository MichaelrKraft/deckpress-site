"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Header } from './Header'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: React.ReactNode
  showHeader?: boolean
  showProgress?: boolean
  currentStep?: number
  totalSteps?: number
  onSave?: () => void
  onPreview?: () => void
  onExport?: () => void
  className?: string
}

export function Layout({
  children,
  showHeader = true,
  showProgress = false,
  currentStep = 1,
  totalSteps = 8,
  onSave,
  onPreview,
  onExport,
  className
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      {showHeader && (
        <Header
          showProgress={showProgress}
          currentStep={currentStep}
          totalSteps={totalSteps}
          onSave={onSave}
          onPreview={onPreview}
          onExport={onExport}
        />
      )}

      {/* Main Content */}
      <main className={cn("relative z-10", className)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}

interface ContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: boolean
  className?: string
}

export function Container({ 
  children, 
  size = 'xl', 
  padding = true, 
  className 
}: ContainerProps) {
  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  }

  return (
    <div className={cn(
      'mx-auto',
      sizes[size],
      padding && 'container-padding',
      className
    )}>
      {children}
    </div>
  )
}

interface SectionProps {
  children: React.ReactNode
  padding?: boolean
  className?: string
}

export function Section({ children, padding = true, className }: SectionProps) {
  return (
    <section className={cn(
      padding && 'section-padding',
      className
    )}>
      {children}
    </section>
  )
}

interface GridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Grid({ children, cols = 1, gap = 'md', className }: GridProps) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-12'
  }

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  }

  return (
    <div className={cn(
      'grid',
      colClasses[cols],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}

interface FlexProps {
  children: React.ReactNode
  direction?: 'row' | 'col'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  gap?: 'sm' | 'md' | 'lg'
  wrap?: boolean
  className?: string
}

export function Flex({ 
  children, 
  direction = 'row', 
  align = 'start',
  justify = 'start',
  gap = 'md',
  wrap = false,
  className 
}: FlexProps) {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col'
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  }

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  }

  return (
    <div className={cn(
      'flex',
      directionClasses[direction],
      alignClasses[align],
      justifyClasses[justify],
      gapClasses[gap],
      wrap && 'flex-wrap',
      className
    )}>
      {children}
    </div>
  )
}
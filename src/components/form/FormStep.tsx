"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface FormStepProps {
  title: string
  description: string
  children: React.ReactNode
  step: number
  totalSteps: number
  isValid?: boolean
  onNext?: () => void
  onPrevious?: () => void
  onSave?: () => void
  nextLabel?: string
  previousLabel?: string
  showSave?: boolean
  loading?: boolean
}

export function FormStep({
  title,
  description,
  children,
  step,
  totalSteps,
  isValid = true,
  onNext,
  onPrevious,
  onSave,
  nextLabel = "Continue",
  previousLabel = "Previous",
  showSave = true,
  loading = false
}: FormStepProps) {
  const isFirstStep = step === 1
  const isLastStep = step === totalSteps

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card padding="lg" className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-gold-400 to-gold-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">
                {step}
              </div>
              <div className="text-sm text-white/60">
                Step {step} of {totalSteps}
              </div>
            </div>
            
            {/* Progress Dots */}
            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors duration-200",
                    i + 1 <= step ? "bg-gold-400" : "bg-white/20"
                  )}
                />
              ))}
            </div>
          </div>
          
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-lg">{description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {children}
          </div>
        </CardContent>

        <CardFooter>
          <div className="flex items-center justify-between w-full">
            <div className="flex space-x-3">
              {!isFirstStep && onPrevious && (
                <Button 
                  variant="outline" 
                  onClick={onPrevious}
                  disabled={loading}
                >
                  {previousLabel}
                </Button>
              )}
            </div>
            
            <div className="flex space-x-3">
              {showSave && onSave && (
                <Button 
                  variant="ghost" 
                  onClick={onSave}
                  disabled={loading}
                >
                  Save Draft
                </Button>
              )}
              
              {onNext && (
                <Button 
                  onClick={onNext}
                  disabled={!isValid || loading}
                  loading={loading}
                >
                  {isLastStep ? "Generate Deck" : nextLabel}
                </Button>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

interface FormSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-white/70">{description}</p>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

interface FormFieldGroupProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3
  className?: string
}

export function FormFieldGroup({ children, columns = 1, className }: FormFieldGroupProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }

  return (
    <div className={cn('grid gap-4', gridClasses[columns], className)}>
      {children}
    </div>
  )
}
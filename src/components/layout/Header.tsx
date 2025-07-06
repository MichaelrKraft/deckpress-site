"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface HeaderProps {
  showProgress?: boolean
  currentStep?: number
  totalSteps?: number
  onSave?: () => void
  onPreview?: () => void
  onExport?: () => void
}

export function Header({ 
  showProgress = false, 
  currentStep = 1, 
  totalSteps = 8,
  onSave,
  onPreview,
  onExport
}: HeaderProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <header className="sticky top-0 z-50 bg-neutral-950 border-b border-white/10">
      <div className="container-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/logo.png"
              alt="DeckPress Logo"
              width={180}
              height={60}
              priority
            />
          </motion.div>

          {/* Progress Indicator */}
          {showProgress && (
            <motion.div 
              className="flex-1 max-w-md mx-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm text-white/70 font-medium">
                  Step {currentStep} of {totalSteps}
                </span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-gold-400 to-gold-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <span className="text-sm text-white/70 font-medium">
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {onSave && (
              <Button variant="ghost" size="sm" onClick={onSave}>
                Save Draft
              </Button>
            )}
            {onPreview && (
              <Button variant="outline" size="sm" onClick={onPreview}>
                Preview
              </Button>
            )}
            {onExport && (
              <Button variant="primary" size="sm" onClick={onExport}>
                Export
              </Button>
            )}
            
            {/* User Menu */}
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <span className="text-white text-sm font-medium">U</span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  )
}

interface ProgressStepProps {
  step: number
  title: string
  isActive: boolean
  isCompleted: boolean
  onClick?: () => void
}

export function ProgressStep({ step, title, isActive, isCompleted, onClick }: ProgressStepProps) {
  return (
    <motion.button
      className={cn(
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-left w-full",
        isActive && "bg-white/10",
        !isActive && "hover:bg-white/5"
      )}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={cn(
          "progress-step",
          isActive && "active",
          isCompleted && "completed"
        )}
      >
        {isCompleted ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          step
        )}
      </div>
      
      <div className="flex-1">
        <h3 className={cn(
          "text-sm font-medium",
          isActive ? "text-white" : "text-white/70"
        )}>
          {title}
        </h3>
      </div>
    </motion.button>
  )
}

interface NavigationSidebarProps {
  steps: Array<{
    id: string
    title: string
    isComplete: boolean
  }>
  currentStep: string
  onStepClick: (stepId: string) => void
}

export function NavigationSidebar({ steps, currentStep, onStepClick }: NavigationSidebarProps) {
  return (
    <motion.aside 
      className="w-64 glass-card h-full"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          Deck Sections
        </h2>
        
        <div className="space-y-2">
          {steps.map((step, index) => (
            <ProgressStep
              key={step.id}
              step={index + 1}
              title={step.title}
              isActive={currentStep === step.id}
              isCompleted={step.isComplete}
              onClick={() => onStepClick(step.id)}
            />
          ))}
        </div>
      </div>
    </motion.aside>
  )
}
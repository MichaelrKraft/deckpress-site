"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import { ValidationResult, ValidationWarning, ValidationSuggestion } from '@/lib/validation'

interface ValidationPanelProps {
  validationResult: ValidationResult
  className?: string
}

export function ValidationPanel({ validationResult, className }: ValidationPanelProps) {
  const { score, warnings, suggestions } = validationResult

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBarColor = (score: number) => {
    if (score >= 90) return 'bg-green-400'
    if (score >= 70) return 'bg-yellow-400'
    return 'bg-red-400'
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Validation Score</CardTitle>
          <div className={cn("text-2xl font-bold", getScoreColor(score))}>
            {Math.round(score)}/100
          </div>
        </div>
        
        {/* Score Bar */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full", getScoreBarColor(score))}
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Warnings */}
          {warnings.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-white/80 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Issues Found
              </h4>
              
              <AnimatePresence>
                <div className="space-y-3">
                  {warnings.map((warning, index) => (
                    <WarningCard key={index} warning={warning} />
                  ))}
                </div>
              </AnimatePresence>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-white/80 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Suggestions
              </h4>
              
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <SuggestionCard key={index} suggestion={suggestion} />
                ))}
              </div>
            </div>
          )}

          {/* Success State */}
          {warnings.length === 0 && suggestions.length === 0 && score >= 90 && (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-green-400 font-semibold mb-1">Excellent Work!</h4>
              <p className="text-white/70 text-sm">This section looks investor-ready</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface WarningCardProps {
  warning: ValidationWarning
}

function WarningCard({ warning }: WarningCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-400/50 bg-red-500/10'
      case 'medium': return 'border-yellow-400/50 bg-yellow-500/10'
      case 'low': return 'border-blue-400/50 bg-blue-500/10'
      default: return 'border-gray-400/50 bg-gray-500/10'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return (
          <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )
      case 'medium':
        return (
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn("p-3 rounded-lg border", getSeverityColor(warning.severity))}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {getSeverityIcon(warning.severity)}
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="text-sm font-medium text-white mb-1">{warning.title}</h5>
          <p className="text-xs text-white/70 mb-2">{warning.description}</p>
          {warning.suggestion && (
            <p className="text-xs text-white/60 italic">💡 {warning.suggestion}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

interface SuggestionCardProps {
  suggestion: ValidationSuggestion
}

function SuggestionCard({ suggestion }: SuggestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 rounded-lg border border-blue-400/30 bg-blue-500/5"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="text-sm font-medium text-white mb-1">{suggestion.title}</h5>
          <p className="text-xs text-white/70 mb-2">{suggestion.description}</p>
          {suggestion.example && (
            <p className="text-xs text-blue-300 italic">📝 Example: {suggestion.example}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface DeckPreviewProps {
  formData: {
    companyName?: string
    tagline?: string
    analogyBrandA?: string
    analogyBrandB?: string
    analogyDescription?: string
    problemStatement?: string
    targetMarket?: string
    marketStats?: Array<{ value: string; label: string; source: string }>
    solutionDescription?: string
    uniqueValueProposition?: string
    features?: Array<{ icon: string; title: string; description: string }>
  }
  currentSection: string
  className?: string
}

export function DeckPreview({ formData, currentSection, className }: DeckPreviewProps) {
  const renderTitleSlide = () => (
    <motion.div
      className="aspect-[16/9] bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg p-8 flex flex-col justify-center items-center text-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gold-400 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 space-y-6">
        {/* Logo Placeholder */}
        <div className="w-16 h-16 bg-gradient-to-r from-gold-400 to-gold-500 rounded-xl flex items-center justify-center mx-auto">
          <span className="text-slate-900 font-bold text-xl">
            {formData.companyName ? formData.companyName.charAt(0).toUpperCase() : 'C'}
          </span>
        </div>

        {/* Company Name */}
        <h1 className="text-4xl font-bold text-white">
          {formData.companyName || 'Your Company Name'}
        </h1>

        {/* Tagline */}
        <p className="text-xl text-white/80">
          {formData.tagline || 'Your company tagline'}
        </p>

        {/* Analogy */}
        {formData.analogyBrandA && formData.analogyBrandB && (
          <div className="mt-8 p-4 glass rounded-lg">
            <p className="text-gold-400 text-lg font-medium">
              {formData.analogyBrandA} + {formData.analogyBrandB}
            </p>
            {formData.analogyDescription && (
              <p className="text-white/70 text-sm mt-2">
                {formData.analogyDescription}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )

  const renderProblemSlide = () => (
    <motion.div
      className="aspect-[16/9] bg-gradient-to-br from-red-900/20 to-slate-950 rounded-lg p-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-white mb-6">The Problem</h2>
        
        <div className="flex-1 space-y-6">
          {formData.problemStatement && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white/90">Problem Statement</h3>
              <p className="text-white/80 leading-relaxed">
                {formData.problemStatement}
              </p>
            </div>
          )}

          {formData.targetMarket && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white/90">Target Market</h3>
              <p className="text-white/80">
                {formData.targetMarket}
              </p>
            </div>
          )}

          {formData.marketStats?.[0]?.value && (
            <div className="mt-auto">
              <div className="glass p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-red-400">
                    {formData.marketStats[0].value}
                  </span>
                  <span className="text-white/80">
                    {formData.marketStats[0].label}
                  </span>
                </div>
                {formData.marketStats[0].source && (
                  <p className="text-sm text-white/60 mt-1">
                    Source: {formData.marketStats[0].source}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )

  const renderSolutionSlide = () => (
    <motion.div
      className="aspect-[16/9] bg-gradient-to-br from-green-900/20 to-slate-950 rounded-lg p-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-white mb-6">The Solution</h2>
        
        <div className="flex-1 space-y-6">
          {formData.solutionDescription && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white/90">Our Solution</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                {formData.solutionDescription}
              </p>
            </div>
          )}

          {formData.uniqueValueProposition && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white/90">Value Proposition</h3>
              <p className="text-white/80 text-sm">
                {formData.uniqueValueProposition}
              </p>
            </div>
          )}

          {formData.features && formData.features.length > 0 && (
            <div className="mt-auto">
              <h3 className="text-lg font-semibold text-white/90 mb-3">Key Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {formData.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="glass p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">{feature.icon}</span>
                      <span className="text-sm font-semibold text-white">
                        {feature.title}
                      </span>
                    </div>
                    <p className="text-xs text-white/70">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )

  const renderSlide = () => {
    switch (currentSection) {
      case 'title':
        return renderTitleSlide()
      case 'problem':
        return renderProblemSlide()
      case 'solution':
        return renderSolutionSlide()
      default:
        return renderTitleSlide()
    }
  }

  return (
    <Card className={cn("p-6", className)}>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Live Preview</h3>
            <div className="text-sm text-white/60">
              {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} Section
            </div>
          </div>
          
          <div className="transform scale-90 origin-top">
            {renderSlide()}
          </div>
          
          <p className="text-xs text-white/50 text-center">
            Preview updates as you fill in the form
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
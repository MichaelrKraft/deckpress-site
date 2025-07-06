"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { SlideContent } from '@/lib/openai'
import { TrendingUp, Target, Globe, Users } from 'lucide-react'
import { AnimatedList } from './AnimatedList'
import { MetricCard } from './MetricCard'
import { ProgressBar } from './ProgressBar'
import { EditableText } from '@/components/ui/EditableText'
import { EditableList } from '@/components/ui/EditableList'

interface MarketSlideTemplateProps {
  slide: SlideContent
  theme: any
  onUpdateSlide?: (updatedSlide: SlideContent) => void
  onAiImprove?: (content: string, field: string) => void
}

export function MarketSlideTemplate({ slide, theme, onUpdateSlide, onAiImprove }: MarketSlideTemplateProps) {
  const { content } = slide

  // Update handlers for slide content
  const updateSlideContent = (field: keyof typeof content, newValue: any) => {
    if (!onUpdateSlide) return
    
    const updatedSlide = {
      ...slide,
      content: {
        ...content,
        [field]: newValue
      }
    }
    onUpdateSlide(updatedSlide)
  }

  const handleTitleChange = (newTitle: string) => {
    if (!onUpdateSlide) return
    
    const updatedSlide = {
      ...slide,
      title: newTitle
    }
    onUpdateSlide(updatedSlide)
  }
  
  return (
    <div className="relative h-full min-h-[600px] bg-gradient-to-br from-blue-900/20 via-slate-900 to-indigo-950/30 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Market indicators */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.3, 1, 0.3],
              opacity: [0.2, 0.6, 0.2],
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 4 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <TrendingUp className="w-5 h-5 text-blue-400/40" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 h-full p-8 flex flex-col">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-blue-500/20 rounded-full border border-blue-500/30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          >
            <Globe className="w-6 h-6 text-blue-400" />
            <span className="text-blue-300 font-semibold text-lg">Market Opportunity</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <EditableText
              content={slide.title}
              onChange={handleTitleChange}
              placeholder="Enter market title..."
              className="text-5xl md:text-6xl font-bold text-white mb-6 text-center"
              variant="h1"
              enableFormatting={true}
              onAiImprove={(content) => onAiImprove?.(content, 'title')}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <EditableText
              content={content.headline}
              onChange={(newContent) => updateSlideContent('headline', newContent)}
              placeholder="Describe the market opportunity..."
              className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed text-center"
              variant="h2"
              multiline={true}
              enableFormatting={true}
              onAiImprove={(content) => onAiImprove?.(content, 'headline')}
            />
          </motion.div>
        </motion.div>

        {/* Market Metrics Grid */}
        {content.metrics && content.metrics.length > 0 && (
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {content.metrics.map((metric, index) => (
              <MetricCard
                key={index}
                label={metric.label}
                value={metric.value}
                context={metric.context}
                color="text-blue-500"
                bgColor="bg-gradient-to-br from-blue-50/10 to-indigo-50/10 backdrop-blur-sm"
                index={index}
                isNumber={/\d/.test(metric.value)}
              />
            ))}
          </motion.div>
        )}

        <div className="flex-1 grid md:grid-cols-2 gap-8 items-start">
          {/* Market Insights */}
          <motion.div
            className="glass-card p-8 rounded-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Target className="w-6 h-6 text-blue-400" />
              Market Insights
            </h3>
            <EditableList
              items={content.bullets || ['Add your first market insight...']}
              onChange={(newBullets) => updateSlideContent('bullets', newBullets)}
              variant="bullet"
              className="space-y-2"
              onAiImprove={(items) => onAiImprove?.(items.join('\n'), 'bullets')}
              maxItems={6}
            />
          </motion.div>

          {/* Market Penetration */}
          <motion.div
            className="glass-card p-8 rounded-2xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-indigo-400" />
              Growth Potential
            </h3>
            
            <div className="space-y-6">
              <ProgressBar
                percentage={85}
                label="Total Addressable Market"
                color="bg-gradient-to-r from-blue-500 to-indigo-600"
                className="text-white/90"
              />
              <ProgressBar
                percentage={45}
                label="Serviceable Addressable Market"
                color="bg-gradient-to-r from-indigo-500 to-purple-600"
                className="text-white/90"
              />
              <ProgressBar
                percentage={12}
                label="Serviceable Obtainable Market"
                color="bg-gradient-to-r from-purple-500 to-pink-600"
                className="text-white/90"
              />
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <p className="text-blue-300 text-sm font-medium">
                📈 Market growing at 25% CAGR
              </p>
            </div>
          </motion.div>
        </div>

        {/* Callout */}
        <motion.div
          className="mt-8 p-6 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl border border-blue-500/30 text-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            viewport={{ once: true }}
          >
            <EditableText
              content={content.callout || 'Add a key market insight or opportunity...'}
              onChange={(newContent) => updateSlideContent('callout', newContent)}
              placeholder="🎯 Add a key market insight or opportunity..."
              className="text-xl font-semibold text-white"
              variant="p"
              multiline={true}
              enableFormatting={true}
              onAiImprove={(content) => onAiImprove?.(content, 'callout')}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
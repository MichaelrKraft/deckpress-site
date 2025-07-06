"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { SlideContent } from '@/lib/openai'
import { Sparkles, ArrowRight } from 'lucide-react'
import { AnimatedList } from './AnimatedList'
import { MetricCard } from './MetricCard'
import { EditableText } from '@/components/ui/EditableText'
import { EditableList } from '@/components/ui/EditableList'

interface DefaultSlideTemplateProps {
  slide: SlideContent
  theme: any
  onUpdateSlide?: (updatedSlide: SlideContent) => void
  onAiImprove?: (content: string, field: string) => void
}

export function DefaultSlideTemplate({ slide, theme, onUpdateSlide, onAiImprove }: DefaultSlideTemplateProps) {
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
  
  // Dynamic colors based on slide type
  const getSlideColors = (type: string) => {
    switch (type) {
      case 'traction':
        return {
          bg: 'from-emerald-900/20 via-slate-900 to-teal-950/30',
          accent: 'emerald-400',
          primaryGradient: 'from-emerald-500/30',
          secondaryGradient: 'to-teal-500/30'
        }
      case 'business-model':
        return {
          bg: 'from-purple-900/20 via-slate-900 to-violet-950/30',
          accent: 'purple-400',
          primaryGradient: 'from-purple-500/30',
          secondaryGradient: 'to-violet-500/30'
        }
      case 'team':
        return {
          bg: 'from-orange-900/20 via-slate-900 to-amber-950/30',
          accent: 'orange-400',
          primaryGradient: 'from-orange-500/30',
          secondaryGradient: 'to-amber-500/30'
        }
      case 'financials':
        return {
          bg: 'from-cyan-900/20 via-slate-900 to-sky-950/30',
          accent: 'cyan-400',
          primaryGradient: 'from-cyan-500/30',
          secondaryGradient: 'to-sky-500/30'
        }
      case 'ask':
        return {
          bg: 'from-rose-900/20 via-slate-900 to-pink-950/30',
          accent: 'rose-400',
          primaryGradient: 'from-rose-500/30',
          secondaryGradient: 'to-pink-500/30'
        }
      default:
        return {
          bg: 'from-slate-900 via-gray-900 to-slate-950',
          accent: 'blue-400',
          primaryGradient: 'from-blue-500/30',
          secondaryGradient: 'to-indigo-500/30'
        }
    }
  }
  
  const colors = getSlideColors(slide.type)
  
  return (
    <div className={`relative h-full min-h-[600px] bg-gradient-to-br ${colors.bg} overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r ${colors.primaryGradient} ${colors.secondaryGradient} rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-r ${colors.secondaryGradient} ${colors.primaryGradient} rounded-full blur-3xl animate-pulse delay-1000`} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r ${colors.primaryGradient} ${colors.secondaryGradient} rounded-full blur-3xl`} />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
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
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles className={`w-4 h-4 text-${colors.accent}/40`} />
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
            <Sparkles className="w-6 h-6 text-blue-400" />
            <span className="text-blue-300 font-semibold text-lg capitalize">
              {slide.type.replace('-', ' ')}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <EditableText
              content={slide.title}
              onChange={handleTitleChange}
              placeholder="Enter slide title..."
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
              placeholder="Enter slide headline..."
              className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed text-center"
              variant="h2"
              multiline={true}
              enableFormatting={true}
              onAiImprove={(content) => onAiImprove?.(content, 'headline')}
            />
          </motion.div>
        </motion.div>

        {/* Content Area */}
        <div className="flex-1">
          {/* Metrics Section */}
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
                  bgColor="bg-gradient-to-br from-blue-50/10 to-blue-100/10 backdrop-blur-sm"
                  index={index}
                  isNumber={/\d/.test(metric.value)}
                />
              ))}
            </motion.div>
          )}

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Bullets Section */}
            <motion.div
              className="glass-card p-8 rounded-2xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <ArrowRight className="w-6 h-6 text-blue-400" />
                Key Points
              </h3>
              <EditableList
                items={content.bullets || ['Add your first bullet point...']}
                onChange={(newBullets) => updateSlideContent('bullets', newBullets)}
                variant="check"
                className="space-y-2"
                onAiImprove={(items) => onAiImprove?.(items.join('\n'), 'bullets')}
                maxItems={8}
              />
            </motion.div>

            {/* Additional Content */}
            <motion.div
              className="glass-card p-8 rounded-2xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-blue-400" />
                Details
              </h3>
              
              <EditableText
                content={content.subheadline || `This section provides essential information about our ${slide.type.replace('-', ' ')} strategy and implementation approach.`}
                onChange={(newContent) => updateSlideContent('subheadline', newContent)}
                placeholder="Add detailed description..."
                className="text-white/80 text-lg leading-relaxed mb-4"
                variant="p"
                multiline={true}
                enableFormatting={true}
                onAiImprove={(content) => onAiImprove?.(content, 'subheadline')}
              />

              <div className="flex items-center gap-2 text-blue-400">
                <ArrowRight className="w-5 h-5" />
                <span className="font-semibold">Strategic Focus</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Callout Section */}
        <motion.div
          className="mt-8 p-6 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl border border-blue-500/30 text-center backdrop-blur-sm"
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
              content={content.callout || 'Add a key insight or callout...'}
              onChange={(newContent) => updateSlideContent('callout', newContent)}
              placeholder="💡 Add a key insight or callout..."
              className="text-xl font-semibold text-white"
              variant="p"
              multiline={true}
              enableFormatting={true}
              onAiImprove={(content) => onAiImprove?.(content, 'callout')}
            />
          </motion.div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          className="mt-6 glass-card p-6 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-blue-400" />
            Next Steps
          </h4>
          <EditableList
            items={content.nextSteps || ['Add your first next step...']}
            onChange={(newSteps) => updateSlideContent('nextSteps', newSteps)}
            variant="number"
            className="space-y-2"
            onAiImprove={(items) => onAiImprove?.(items.join('\n'), 'nextSteps')}
            maxItems={5}
          />
        </motion.div>
      </div>
    </div>
  )
}
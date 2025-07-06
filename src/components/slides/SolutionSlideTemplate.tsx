"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { SlideContent } from '@/lib/openai'
import { CheckCircle, Lightbulb, Rocket, Zap } from 'lucide-react'
import { AnimatedList } from './AnimatedList'
import { MetricCard } from './MetricCard'
import { EditableText } from '@/components/ui/EditableText'
import { EditableList } from '@/components/ui/EditableList'

interface SolutionSlideTemplateProps {
  slide: SlideContent
  theme: any
  onUpdateSlide?: (updatedSlide: SlideContent) => void
  onAiImprove?: (content: string, field: string) => void
}

export function SolutionSlideTemplate({ slide, theme, onUpdateSlide, onAiImprove }: SolutionSlideTemplateProps) {
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
    <div className="relative h-full min-h-[600px] bg-gradient-to-br from-green-900/20 via-slate-900 to-emerald-950/30 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-green-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-emerald-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Success indicators */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.3, 1, 0.3],
              opacity: [0.2, 0.8, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <CheckCircle className="w-4 h-4 text-green-400/40" />
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
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-green-500/20 rounded-full border border-green-500/30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          >
            <Lightbulb className="w-6 h-6 text-green-400" />
            <span className="text-green-300 font-semibold text-lg">Our Solution</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <EditableText
              content={slide.title}
              onChange={handleTitleChange}
              placeholder="Enter solution title..."
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
              placeholder="Describe your solution..."
              className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed text-center"
              variant="h2"
              multiline={true}
              enableFormatting={true}
              onAiImprove={(content) => onAiImprove?.(content, 'headline')}
            />
          </motion.div>
        </motion.div>

        <div className="flex-1 grid md:grid-cols-2 gap-8 items-start">
          {/* Solution Features */}
          <motion.div
            className="glass-card p-8 rounded-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Rocket className="w-6 h-6 text-green-400" />
              Key Features
            </h3>
            <EditableList
              items={content.bullets || ['Describe your first key feature...']}
              onChange={(newBullets) => updateSlideContent('bullets', newBullets)}
              variant="check"
              className="space-y-2"
              onAiImprove={(items) => onAiImprove?.(items.join('\n'), 'bullets')}
              maxItems={6}
            />
          </motion.div>

          {/* Benefits & Metrics */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {content.metrics && content.metrics.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-emerald-400" />
                  Impact Results
                </h3>
                {content.metrics.map((metric, index) => (
                  <MetricCard
                    key={index}
                    label={metric.label}
                    value={metric.value}
                    context={metric.context}
                    color="text-green-500"
                    bgColor="bg-gradient-to-br from-green-50/10 to-emerald-50/10 backdrop-blur-sm"
                    index={index}
                    isNumber={/\d/.test(metric.value)}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-emerald-400" />
                  Why It Works
                </h3>
                <EditableText
                  content={content.subheadline || "Our solution leverages cutting-edge technology to deliver measurable results."}
                  onChange={(newContent) => updateSlideContent('subheadline', newContent)}
                  placeholder="Explain why your solution works..."
                  className="text-white/80 text-lg leading-relaxed mb-4"
                  variant="p"
                  multiline={true}
                  enableFormatting={true}
                  onAiImprove={(content) => onAiImprove?.(content, 'subheadline')}
                />
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Proven & Scalable</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Callout */}
        <motion.div
          className="mt-8 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30 text-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <EditableText
              content={content.callout || 'Add a compelling call-to-action or key benefit...'}
              onChange={(newContent) => updateSlideContent('callout', newContent)}
              placeholder="🚀 Add a compelling call-to-action or key benefit..."
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
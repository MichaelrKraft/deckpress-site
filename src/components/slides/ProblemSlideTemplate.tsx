"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { SlideContent } from '@/lib/openai'
import { AlertTriangle, TrendingDown, Users, DollarSign } from 'lucide-react'
import { AnimatedList } from './AnimatedList'
import { MetricCard } from './MetricCard'
import { EditableText } from '@/components/ui/EditableText'
import { EditableList } from '@/components/ui/EditableList'
import { EditableIcon } from '@/components/ui/EditableIcon'
import { EditableGraphics } from '@/components/ui/EditableGraphics'

interface ProblemSlideTemplateProps {
  slide: SlideContent
  theme: any
  onUpdateSlide?: (updatedSlide: SlideContent) => void
  onAiImprove?: (content: string, field: string) => void
}

export function ProblemSlideTemplate({ slide, theme, onUpdateSlide, onAiImprove }: ProblemSlideTemplateProps) {
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

  // Update handlers for icons and graphics
  const updateSlideIcon = (iconField: string, iconName: string, iconColor?: string, iconSize?: string) => {
    if (!onUpdateSlide) return
    
    const updatedSlide = {
      ...slide,
      content: {
        ...content,
        icons: {
          ...content.icons,
          [iconField]: { name: iconName, color: iconColor, size: iconSize }
        }
      }
    }
    onUpdateSlide(updatedSlide)
  }

  const updateSlideGraphics = (graphicsField: string, graphics: any) => {
    if (!onUpdateSlide) return
    
    const updatedSlide = {
      ...slide,
      content: {
        ...content,
        graphics: {
          ...content.graphics,
          [graphicsField]: graphics
        }
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
    <div className="relative h-full min-h-[600px] bg-gradient-to-br from-red-900/20 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Warning indicators */}
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
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <AlertTriangle className="w-6 h-6 text-red-400/30" />
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
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-red-500/20 rounded-full border border-red-500/30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          >
            <EditableIcon
              iconName={content.icons?.headerIcon?.name || 'AlertTriangle'}
              iconColor={content.icons?.headerIcon?.color || 'text-red-400'}
              iconSize={content.icons?.headerIcon?.size || 'w-6 h-6'}
              onChange={(iconName, iconColor, iconSize) => 
                updateSlideIcon('headerIcon', iconName, iconColor, iconSize)
              }
              onAiImprove={(context) => onAiImprove?.(context, 'headerIcon')}
            />
            <span className="text-red-300 font-semibold text-lg">The Problem</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <EditableText
              content={slide.title}
              onChange={handleTitleChange}
              placeholder="Enter problem title..."
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
              placeholder="Describe the core problem..."
              className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed text-center"
              variant="h2"
              multiline={true}
              enableFormatting={true}
              onAiImprove={(content) => onAiImprove?.(content, 'headline')}
            />
          </motion.div>
        </motion.div>

        <div className="flex-1 grid md:grid-cols-2 gap-8 items-start">
          {/* Problem Points */}
          <motion.div
            className="glass-card p-8 rounded-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <EditableIcon
                iconName={content.icons?.challengesIcon?.name || 'TrendingDown'}
                iconColor={content.icons?.challengesIcon?.color || 'text-red-400'}
                iconSize={content.icons?.challengesIcon?.size || 'w-6 h-6'}
                onChange={(iconName, iconColor, iconSize) => 
                  updateSlideIcon('challengesIcon', iconName, iconColor, iconSize)
                }
                onAiImprove={(context) => onAiImprove?.(context, 'challengesIcon')}
              />
              Key Challenges
            </h3>
            <EditableList
              items={content.bullets || ['Describe the first challenge...']}
              onChange={(newBullets) => updateSlideContent('bullets', newBullets)}
              variant="bullet"
              className="space-y-2"
              onAiImprove={(items) => onAiImprove?.(items.join('\n'), 'bullets')}
              maxItems={6}
            />
          </motion.div>

          {/* Impact Metrics */}
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
                  <EditableIcon
                    iconName={content.icons?.impactIcon?.name || 'DollarSign'}
                    iconColor={content.icons?.impactIcon?.color || 'text-orange-400'}
                    iconSize={content.icons?.impactIcon?.size || 'w-6 h-6'}
                    onChange={(iconName, iconColor, iconSize) => 
                      updateSlideIcon('impactIcon', iconName, iconColor, iconSize)
                    }
                    onAiImprove={(context) => onAiImprove?.(context, 'impactIcon')}
                  />
                  Impact Scale
                </h3>
                {content.metrics.map((metric, index) => (
                  <MetricCard
                    key={index}
                    label={metric.label}
                    value={metric.value}
                    context={metric.context}
                    color="text-red-500"
                    bgColor="bg-gradient-to-br from-red-50/10 to-orange-50/10 backdrop-blur-sm"
                    index={index}
                    isNumber={/\d/.test(metric.value)}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <EditableIcon
                    iconName={content.icons?.affectedIcon?.name || 'Users'}
                    iconColor={content.icons?.affectedIcon?.color || 'text-orange-400'}
                    iconSize={content.icons?.affectedIcon?.size || 'w-6 h-6'}
                    onChange={(iconName, iconColor, iconSize) => 
                      updateSlideIcon('affectedIcon', iconName, iconColor, iconSize)
                    }
                    onAiImprove={(context) => onAiImprove?.(context, 'affectedIcon')}
                  />
                  Who&apos;s Affected
                </h3>
                <EditableText
                  content={content.subheadline || "This problem impacts millions of users and businesses worldwide, creating inefficiencies and missed opportunities across entire industries."}
                  onChange={(newContent) => updateSlideContent('subheadline', newContent)}
                  placeholder="Describe who's affected by this problem..."
                  className="text-white/80 text-lg leading-relaxed"
                  variant="p"
                  multiline={true}
                  enableFormatting={true}
                  onAiImprove={(content) => onAiImprove?.(content, 'subheadline')}
                />
              </div>
            )}
          </motion.div>
        </div>

        {/* Visual Graphics Section */}
        <motion.div
          className="mt-8 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-6 rounded-2xl text-center">
            <EditableGraphics
              graphics={content.graphics?.problemVisualization || {
                type: 'placeholder',
                size: 'w-24 h-24',
                opacity: 0.5
              }}
              onChange={(graphics) => updateSlideGraphics('problemVisualization', graphics)}
              className="mx-auto mb-4"
              onAiImprove={(context) => onAiImprove?.(context, 'problemVisualization')}
            />
            <h4 className="text-white font-semibold mb-2">Problem Visualization</h4>
            <p className="text-white/60 text-sm">Add an image or graphic to illustrate the problem</p>
          </div>

          <div className="glass-card p-6 rounded-2xl text-center">
            <EditableGraphics
              graphics={content.graphics?.impactChart || {
                type: 'placeholder',
                size: 'w-24 h-24',
                opacity: 0.5
              }}
              onChange={(graphics) => updateSlideGraphics('impactChart', graphics)}
              className="mx-auto mb-4"
              onAiImprove={(context) => onAiImprove?.(context, 'impactChart')}
            />
            <h4 className="text-white font-semibold mb-2">Impact Data</h4>
            <p className="text-white/60 text-sm">Upload charts or graphs showing the problem&apos;s impact</p>
          </div>

          <div className="glass-card p-6 rounded-2xl text-center">
            <EditableGraphics
              graphics={content.graphics?.stakeholderImage || {
                type: 'placeholder',
                size: 'w-24 h-24',
                opacity: 0.5
              }}
              onChange={(graphics) => updateSlideGraphics('stakeholderImage', graphics)}
              className="mx-auto mb-4"
              onAiImprove={(context) => onAiImprove?.(context, 'stakeholderImage')}
            />
            <h4 className="text-white font-semibold mb-2">Stakeholders</h4>
            <p className="text-white/60 text-sm">Show who is affected by this problem</p>
          </div>
        </motion.div>

        {/* Callout */}
        <motion.div
          className="mt-8 p-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl border border-red-500/30 text-center backdrop-blur-sm"
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
              content={content.callout || 'Add a key insight about this problem...'}
              onChange={(newContent) => updateSlideContent('callout', newContent)}
              placeholder="💡 Add a key insight about this problem..."
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
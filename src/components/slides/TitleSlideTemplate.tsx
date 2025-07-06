"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { SlideContent } from '@/lib/openai'
import { Sparkles, ArrowRight } from 'lucide-react'
import { EditableText } from '@/components/ui/EditableText'
import { EditableList } from '@/components/ui/EditableList'

interface TitleSlideTemplateProps {
  slide: SlideContent
  theme: any
  onUpdateSlide?: (updatedSlide: SlideContent) => void
  onAiImprove?: (content: string, field: string) => void
}

export function TitleSlideTemplate({ slide, theme, onUpdateSlide, onAiImprove }: TitleSlideTemplateProps) {
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
  
  // Extract company name from title
  const companyName = slide.title || 'Company'
  const companyInitial = companyName.charAt(0).toUpperCase()
  
  return (
    <div className="relative h-full min-h-[600px] bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">
        {/* Company Logo */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-white font-bold text-2xl">{companyInitial}</span>
          </div>
        </motion.div>

        {/* Company Name */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <EditableText
            content={slide.title}
            onChange={handleTitleChange}
            placeholder="Enter company name..."
            className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight text-center"
            variant="h1"
            enableFormatting={true}
            onAiImprove={(content) => onAiImprove?.(content, 'title')}
          />
        </motion.div>

        {/* Headline */}
        <motion.div
          className="mb-8 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <EditableText
            content={content.headline}
            onChange={(newContent) => updateSlideContent('headline', newContent)}
            placeholder="Enter your compelling headline..."
            className="text-2xl md:text-4xl font-semibold text-white/90 leading-relaxed text-center"
            variant="h2"
            multiline={true}
            enableFormatting={true}
            onAiImprove={(content) => onAiImprove?.(content, 'headline')}
          />
        </motion.div>

        {/* Subheadline */}
        <motion.div
          className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <EditableText
            content={content.subheadline || 'Add a compelling subheadline...'}
            onChange={(newContent) => updateSlideContent('subheadline', newContent)}
            placeholder="Enter your subheadline..."
            className="text-xl md:text-2xl text-white/70 leading-relaxed text-center"
            variant="p"
            multiline={true}
            enableFormatting={true}
            onAiImprove={(content) => onAiImprove?.(content, 'subheadline')}
          />
        </motion.div>

        {/* Key Points */}
        {content.bullets && content.bullets.length > 0 && (
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {content.bullets.slice(0, 3).map((bullet, index) => (
              <motion.div
                key={index}
                className="glass-card px-6 py-3 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="flex items-center gap-2 text-white/90">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="font-medium">{bullet}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          className="flex items-center gap-3 text-white/80"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <span className="text-lg font-medium">Transforming the Future</span>
          <ArrowRight className="w-5 h-5" />
        </motion.div>

        {/* Decorative underline */}
        <motion.div
          className="mt-8 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: "300px" }}
          transition={{ duration: 1.5, delay: 1.8, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
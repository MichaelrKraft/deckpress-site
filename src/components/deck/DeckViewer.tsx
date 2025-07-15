"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Share, 
  Edit3,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  MessageSquare,
  Send,
  Brain,
  Loader2,
  X,
  Sparkles,
  LayoutGrid,
  Maximize2,
  Palette
} from 'lucide-react'
import { GeneratedDeck, DECK_THEMES } from '@/lib/deck-generator'
import { SlideContent } from '@/lib/openai'
import { TitleSlideTemplate } from '../slides/TitleSlideTemplate'
import { ProblemSlideTemplate } from '../slides/ProblemSlideTemplate' 
import { SolutionSlideTemplate } from '../slides/SolutionSlideTemplate'
import { MarketSlideTemplate } from '../slides/MarketSlideTemplate'
import { DefaultSlideTemplate } from '../slides/DefaultSlideTemplate'
import { QAChatSlideTemplate } from '../slides/QAChatSlideTemplate'
import { ThemeSwitcher } from '../ui/ThemeSwitcher'

interface DeckViewerProps {
  deck: GeneratedDeck
  onEdit?: (slideId: number) => void
  onExport?: () => void
  onShare?: () => void
  onUpdateSlide?: (slideId: number, updatedSlide: SlideContent) => void
  onThemeChange?: (themeId: string) => void
}

export function DeckViewer({ deck, onEdit, onExport, onShare, onUpdateSlide, onThemeChange }: DeckViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showAiChat, setShowAiChat] = useState(false)
  
  // Debug function to log state changes
  const toggleAiChat = (value: boolean) => {
    console.log('Setting showAiChat to:', value)
    setShowAiChat(value)
  }
  const [aiPrompt, setAiPrompt] = useState('')
  const [isAiProcessing, setIsAiProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'single' | 'overview'>('single')
  const [editMode, setEditMode] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(deck.theme)
  const theme = DECK_THEMES[currentTheme] || DECK_THEMES.modern

  const handlePrevious = () => {
    setCurrentSlide(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentSlide(prev => Math.min(deck.slides.length - 1, prev + 1))
  }

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId)
    if (onThemeChange) {
      onThemeChange(themeId)
    }
  }

  const handleAiImprove = async () => {
    console.log('handleAiImprove called with prompt:', aiPrompt)
    if (!aiPrompt.trim() || !onUpdateSlide) {
      console.log('Early return - no prompt or onUpdateSlide')
      return
    }

    setIsAiProcessing(true)
    setError(null)

    try {
      // Process all slides with the AI improvement
      const updatedSlides = []
      
      for (let i = 0; i < deck.slides.length; i++) {
        const slide = deck.slides[i]
        
        const response = await fetch('/api/improve-slide-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            slide: slide,
            userPrompt: aiPrompt,
            context: deck.context,
            isDeckWide: true
          })
        })

        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || `Failed to improve slide ${i + 1}`)
        }

        updatedSlides.push(data.improvedSlide)
        
        // Update each slide as it's processed
        onUpdateSlide(slide.id, data.improvedSlide)
        
        // Small delay to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      setShowAiChat(false)
      setAiPrompt('')
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to improve deck')
    } finally {
      setIsAiProcessing(false)
    }
  }

  const currentSlideData = deck.slides[currentSlide]

  return (
    <div className="h-full flex flex-col" data-deck-viewer>
      {/* Deck Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-white">{deck.title}</h1>
          <p className="text-white/60">
            {deck.slides.length} slides • {theme.name} theme
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeSwitcher
            currentTheme={currentTheme}
            onThemeChange={handleThemeChange}
            variant="compact"
            className="mr-2"
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setEditMode(!editMode)}
            className={editMode ? 'bg-green-500/20 border-green-400' : ''}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            {editMode ? 'View Mode' : 'Edit Mode'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setViewMode(viewMode === 'single' ? 'overview' : 'single')}
            className={viewMode === 'overview' ? 'bg-blue-500/20 border-blue-400' : ''}
          >
            {viewMode === 'single' ? (
              <>
                <LayoutGrid className="w-4 h-4 mr-2" />
                Overview
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 mr-2" />
                Single View
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => toggleAiChat(!showAiChat)}
            className={showAiChat ? 'bg-purple-500/20 border-purple-400' : ''}
            data-ai-button
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            AI Improve
          </Button>
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {showAiChat && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm">
          <div className="mt-12 w-full max-w-2xl bg-slate-900 border border-white/20 rounded-2xl shadow-2xl p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
                <button 
                  onClick={() => setError(null)}
                  className="ml-2 hover:text-red-300"
                >
                  ×
                </button>
              </div>
            )}
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white">
                AI Deck Improvement - Apply changes across all slides
              </span>
              <button
                onClick={() => setShowAiChat(false)}
                className="ml-auto p-1 hover:bg-white/10 rounded"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Apply changes across the entire deck - e.g., &lsquo;Change all instances of Quick Patent to DeckPress&rsquo; or &lsquo;Make all slides more investor-focused&rsquo;"
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleAiImprove()
                  }
                }}
              />
              <Button
                onClick={handleAiImprove}
                disabled={!aiPrompt.trim() || isAiProcessing}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
              >
                {isAiProcessing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-white/60 mt-2">
              Tell AI how to improve the entire deck. Changes will be applied across all slides. Examples: &ldquo;Change company name to DeckPress&rdquo;, &ldquo;Make all slides more compelling&rdquo;, &ldquo;Add more specific metrics&rdquo;.
            </p>
          </div>
        </div>
      )}

      {viewMode === 'single' ? (
        <div className="flex-1 flex">
          {/* Slide Navigation */}
          <div className="w-80 border-r border-white/10 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Slides</h3>
            
            <div className="space-y-2">
              {deck.slides.map((slide, index) => (
                <motion.div
                  key={slide.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    index === currentSlide 
                      ? 'bg-blue-500/20 border border-blue-400' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded text-blue-400 text-sm flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-sm truncate">
                        {slide.title}
                      </h4>
                      <p className="text-white/60 text-xs truncate">
                        {slide.content.headline}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {slide.type}
                    </Badge>
                    
                    {slide.content.metrics && slide.content.metrics.length > 0 && (
                      <BarChart3 className="w-3 h-3 text-green-400" />
                    )}
                    
                    {slide.content.callout && (
                      <TrendingUp className="w-3 h-3 text-yellow-400" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Slide View */}
          <div className="flex-1 flex flex-col">
            {/* Slide Navigation Controls */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrevious}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <div className="flex items-center gap-4">
                <span className="text-white/70 text-sm">
                  {currentSlide + 1} of {deck.slides.length}
                </span>
                
                <div className="flex items-center gap-1">
                  {deck.slides.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-blue-400' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNext}
                disabled={currentSlide === deck.slides.length - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Slide Content */}
            <div className="flex-1 bg-black p-8 min-h-0 flex flex-col">
              <div className="h-full max-w-6xl mx-auto flex-1 min-h-0 flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex-1 min-h-0 flex flex-col overflow-auto"
                  >
                    <SlideRenderer 
                      slide={currentSlideData} 
                      theme={theme} 
                      onEdit={onEdit} 
                      onOpenAiChat={() => toggleAiChat(true)}
                      onUpdateSlide={(updatedSlide) => onUpdateSlide?.(updatedSlide.id, updatedSlide)}
                      editMode={editMode}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Overview Mode - Continuous Scrolling Presentation */
        <div className="flex-1 overflow-y-auto bg-black">
          <div className="mb-6 p-6 border-b border-white/10 max-w-6xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-2">Presentation Preview</h3>
            <p className="text-white/60">Scroll to see how your presentation will look to viewers</p>
          </div>
          
          {/* Continuous Slides Presentation */}
          <div className="space-y-0 max-w-6xl mx-auto">
            {deck.slides.map((slide, index) => (
              <motion.div
                key={slide.id}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Slide Number Indicator */}
                <div className="absolute top-4 left-4 z-30 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  Slide {index + 1}
                </div>
                
                {/* Full Slide Template */}
                <div className="w-full h-screen">
                  <SlideRenderer 
                    slide={slide} 
                    theme={theme} 
                    onEdit={onEdit}
                    onOpenAiChat={() => toggleAiChat(true)}
                    onUpdateSlide={(updatedSlide) => onUpdateSlide?.(updatedSlide.id, updatedSlide)}
                    isPreview={false}
                    editMode={editMode}
                  />
                </div>
                
                {/* Slide Separator */}
                {index < deck.slides.length - 1 && (
                  <div className="h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Presentation Actions */}
          <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-sm border-t border-white/10 p-4 max-w-6xl mx-auto">
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={onShare}>
                <Share className="w-4 h-4 mr-2" />
                Share Presentation
              </Button>
              <Button variant="outline" onClick={onExport}>
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setViewMode('single')}
                className="bg-blue-500/20 border-blue-400 text-blue-300"
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                Single View
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface SlideRendererProps {
  slide: SlideContent
  theme: any
  onEdit?: (slideId: number) => void
  onOpenAiChat?: () => void
  onUpdateSlide?: (updatedSlide: SlideContent) => void
  isPreview?: boolean
  editMode?: boolean
}

function SlideRenderer({ slide, theme, onEdit, onOpenAiChat, onUpdateSlide, isPreview = false, editMode = false }: SlideRendererProps) {
  // Select the appropriate template based on slide type
  const getSlideTemplate = () => {
    const commonProps = {
      slide,
      theme,
      onUpdateSlide,
      editMode,
      onAiImprove: (content: string, field: string) => {
        // Handle AI improvement for specific fields
        console.log(`AI improve requested for ${field}:`, content)
        // This could trigger a more targeted AI improvement
      }
    }

    switch (slide.type) {
      case 'title':
        return <TitleSlideTemplate {...commonProps} />
      case 'problem':
        return <ProblemSlideTemplate {...commonProps} />
      case 'solution':
        return <SolutionSlideTemplate {...commonProps} />
      case 'market':
        return <MarketSlideTemplate {...commonProps} />
      case 'qa-chat':
        return <QAChatSlideTemplate {...commonProps} />
      default:
        return <DefaultSlideTemplate {...commonProps} />
    }
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-2xl ${isPreview ? 'h-full' : 'h-full min-h-[600px]'}`}>
      {/* AI Helper Button - Only show in full view */}
      {!isPreview && (
        <div className="absolute top-4 right-4 z-50">
          <motion.button
            className="group relative p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              console.log('AI button clicked!');
              if (onOpenAiChat) {
                console.log('Calling onOpenAiChat...');
                onOpenAiChat();
              } else {
                console.log('onOpenAiChat is not defined');
              }
            }}
          >
            <Sparkles className="w-5 h-5 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
            
            {/* Tooltip */}
            <div className="absolute top-full right-0 mt-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-30">
              AI Improve This Slide
            </div>
            
            {/* Floating pulse effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 animate-ping opacity-20" />
          </motion.button>
        </div>
      )}

      {/* Render the appropriate slide template */}
      {getSlideTemplate()}
    </div>
  )
}

export default DeckViewer
"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layout, Container } from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Badge } from '@/components/ui/Badge'
import DeckViewer from '@/components/deck/DeckViewer'
import { pdfExporter } from '@/lib/pdf-export'
import { GeneratedDeck } from '@/lib/deck-generator'
import { PitchDeckOutline } from '@/lib/openai'
import { 
  Sparkles, 
  FileText, 
  Upload, 
  Wand2, 
  ChevronRight,
  ArrowLeft,
  Brain,
  Zap,
  AlertCircle,
  CheckCircle,
  Loader2,
  Edit3,
  Save,
  X,
  MessageSquare,
  Send,
  Target,
  Lightbulb,
  BarChart3,
  Users,
  Rocket,
  TrendingUp,
  DollarSign,
  Award,
  FileStack,
  Settings,
  Eye,
  MoreHorizontal,
  ArrowRight
} from 'lucide-react'
import { GradientButton } from '@/components/ui/gradient-button'
import GuidedInput from '@/components/input/GuidedInput'
import InteractiveOutlineReview from '@/components/outline/InteractiveOutlineReview'

// Gamma-inspired creation modes
const CREATION_MODES = [
  {
    id: 'generate',
    title: 'Generate',
    description: 'AI creates your pitch deck from scratch',
    icon: Wand2,
    popular: true,
    color: 'from-purple-600 to-blue-600'
  },
  {
    id: 'paste',
    title: 'Paste content',
    description: 'Import and enhance existing content',
    icon: FileText,
    popular: false,
    color: 'from-green-600 to-emerald-600'
  },
  {
    id: 'import',
    title: 'Import file',
    description: 'Upload PowerPoint or document',
    icon: Upload,
    popular: false,
    color: 'from-orange-600 to-red-600'
  }
]

// Slide type icon mapping
const SLIDE_TYPE_ICONS = {
  'title': { icon: Rocket, color: 'from-blue-500 to-purple-600', bg: 'bg-blue-500/10' },
  'problem': { icon: Target, color: 'from-slate-300 via-white to-slate-400', bg: 'bg-slate-300/10' },
  'solution': { icon: Lightbulb, color: 'from-yellow-500 to-orange-600', bg: 'bg-yellow-500/10' },
  'market': { icon: BarChart3, color: 'from-green-500 to-emerald-600', bg: 'bg-green-500/10' },
  'product': { icon: Settings, color: 'from-purple-500 to-violet-600', bg: 'bg-purple-500/10' },
  'traction': { icon: TrendingUp, color: 'from-indigo-500 to-blue-600', bg: 'bg-indigo-500/10' },
  'business-model': { icon: DollarSign, color: 'from-green-600 to-emerald-700', bg: 'bg-green-600/10' },
  'team': { icon: Users, color: 'from-cyan-500 to-blue-600', bg: 'bg-cyan-500/10' },
  'financials': { icon: BarChart3, color: 'from-emerald-500 to-green-600', bg: 'bg-emerald-500/10' },
  'ask': { icon: Award, color: 'from-yellow-600 to-orange-600', bg: 'bg-yellow-600/10' },
  'qa-chat': { icon: MessageSquare, color: 'from-purple-500 to-pink-600', bg: 'bg-purple-500/10' },
  'appendix': { icon: FileStack, color: 'from-gray-500 to-slate-600', bg: 'bg-gray-500/10' }
}

const THEMES = [
  { 
    id: 'modern', 
    name: 'Modern', 
    preview: 'Clean and professional',
    gradient: 'from-blue-500 via-purple-500 to-blue-600',
    pattern: 'geometric'
  },
  { 
    id: 'vibrant', 
    name: 'Vibrant', 
    preview: 'Bold and energetic',
    gradient: 'from-red-500 via-pink-500 to-orange-500',
    pattern: 'waves'
  },
  { 
    id: 'minimal', 
    name: 'Minimal', 
    preview: 'Simple and elegant',
    gradient: 'from-gray-400 via-gray-500 to-gray-600',
    pattern: 'clean'
  },
  { 
    id: 'corporate', 
    name: 'Corporate', 
    preview: 'Traditional business',
    gradient: 'from-blue-800 via-indigo-700 to-purple-800',
    pattern: 'structured'
  },
  { 
    id: 'startup', 
    name: 'Startup', 
    preview: 'Tech-focused design',
    gradient: 'from-purple-600 via-violet-500 to-purple-700',
    pattern: 'dynamic'
  },
  { 
    id: 'investor', 
    name: 'Investor', 
    preview: 'Finance-optimized',
    gradient: 'from-green-600 via-emerald-500 to-green-700',
    pattern: 'charts'
  }
]

export default function AIBuilder() {
  const [currentStep, setCurrentStep] = useState('mode')
  const [selectedMode, setSelectedMode] = useState('generate')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedOutline, setGeneratedOutline] = useState<PitchDeckOutline | null>(null)
  const [generatedDeck, setGeneratedDeck] = useState<GeneratedDeck | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [editingSlide, setEditingSlide] = useState<number | null>(null)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedSummary, setEditedSummary] = useState('')
  const [aiChatSlide, setAiChatSlide] = useState<number | null>(null)
  const [aiPrompt, setAiPrompt] = useState('')
  const [isAiProcessing, setIsAiProcessing] = useState(false)
  const [localDeck, setLocalDeck] = useState<GeneratedDeck | null>(null)
  const [showAiReviseModal, setShowAiReviseModal] = useState(false)
  const [reviseSlideId, setReviseSlideId] = useState<number | null>(null)
  const [reviseConversation, setReviseConversation] = useState<Array<{role: 'user' | 'ai', message: string}>>([])
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null)
  
  // Add state for paste and import modes
  const [pastedContent, setPastedContent] = useState('')
  const [importedFile, setImportedFile] = useState<File | null>(null)
  const [isProcessingFile, setIsProcessingFile] = useState(false)
  
  const [formData, setFormData] = useState({
    mode: 'generate',
    topic: '',
    description: '', // Add description field for GuidedInput
    industry: '',
    stage: 'seed', // Add stage field for GuidedInput
    audience: 'investors',
    slideCount: 10,
    selectedTheme: 'modern'
  })

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    switch (currentStep) {
      case 'mode':
        if (selectedMode === 'paste') {
          setCurrentStep('paste')
        } else if (selectedMode === 'import') {
          setCurrentStep('import')
        } else {
          setCurrentStep('topic')
        }
        break
      case 'paste':
        if (pastedContent.trim()) {
          processPastedContent()
        }
        break
      case 'import':
        if (importedFile) {
          processImportedFile()
        }
        break
      case 'topic':
        // Sync description to topic for backward compatibility
        if (formData.description && !formData.topic) {
          updateFormData('topic', formData.description)
        }
        generateOutline()
        break
      case 'outline':
        setCurrentStep('theme')
        break
      case 'theme':
        generateDeck()
        break
    }
  }

  const handlePrevious = () => {
    switch (currentStep) {
      case 'topic':
        setCurrentStep('mode')
        break
      case 'paste':
        setCurrentStep('mode')
        break
      case 'import':
        setCurrentStep('mode')
        break
      case 'outline':
        if (selectedMode === 'generate') {
          setCurrentStep('topic')
        } else {
          setCurrentStep('mode')
        }
        break
      case 'theme':
        setCurrentStep('outline')
        break
      case 'generate':
        setCurrentStep('theme')
        break
      case 'customize':
        setCurrentStep('generate')
        break
    }
  }

  // Add handlers for paste and import modes
  const processPastedContent = async () => {
    if (!pastedContent.trim()) {
      setError('Please paste some content first')
      return
    }

    setError(null)
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/generate-outline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: 'Content from paste',
          industry: formData.industry,
          audience: formData.audience,
          slideCount: formData.slideCount,
          existingContent: pastedContent
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to process pasted content')
      }

      setGeneratedOutline(data.outline)
      setCurrentStep('outline')
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process pasted content')
    } finally {
      setIsGenerating(false)
    }
  }

  const processImportedFile = async () => {
    if (!importedFile) {
      setError('Please select a file first')
      return
    }

    setError(null)
    setIsProcessingFile(true)
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('file', importedFile)
      formDataToSend.append('industry', formData.industry)
      formDataToSend.append('audience', formData.audience)
      formDataToSend.append('slideCount', formData.slideCount.toString())

      const response = await fetch('/api/process-file', {
        method: 'POST',
        body: formDataToSend
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to process imported file')
      }

      setGeneratedOutline(data.outline)
      setCurrentStep('outline')
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process imported file')
    } finally {
      setIsProcessingFile(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImportedFile(file)
    }
  }

  const generateOutline = async () => {
    // Use description field if available, fallback to topic for backward compatibility
    const topicText = formData.description || formData.topic
    
    if (!topicText.trim()) {
      setError('Please describe your startup first')
      return
    }

    setError(null)
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/generate-outline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: topicText, // Use description field name
          topic: topicText, // Keep topic for backward compatibility
          industry: formData.industry,
          audience: formData.audience,
          slideCount: formData.slideCount,
          stage: formData.stage // Include stage for better AI context
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate outline')
      }

      setGeneratedOutline(data.outline)
      setCurrentStep('outline')
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate outline')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateDeck = async () => {
    setError(null)
    setIsGenerating(true)
    setCurrentStep('generate')
    
    try {
      const response = await fetch('/api/generate-deck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: formData.topic,
          industry: formData.industry,
          audience: formData.audience,
          slideCount: formData.slideCount,
          selectedTheme: formData.selectedTheme
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate deck')
      }

      setGeneratedDeck(data.deck)
      setLocalDeck(data.deck)
      setCurrentStep('customize')
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate deck')
      setCurrentStep('theme')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExportPDF = async () => {
    if (!generatedDeck) return
    
    setIsExporting(true)
    try {
      await pdfExporter.downloadDeckAsPDF(generatedDeck)
    } catch (error) {
      setError('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleShare = () => {
    alert('Sharing functionality coming soon!')
  }

  const handleEditSlide = (slideId: number, title: string, summary: string) => {
    setEditingSlide(slideId)
    setEditedTitle(title)
    setEditedSummary(summary)
  }

  const handleSaveEdit = () => {
    if (!generatedOutline || editingSlide === null) return

    const updatedSlides = generatedOutline.slides.map(slide => 
      slide.id === editingSlide 
        ? { ...slide, title: editedTitle, contentSummary: editedSummary }
        : slide
    )

    setGeneratedOutline({
      ...generatedOutline,
      slides: updatedSlides
    })

    setEditingSlide(null)
    setEditedTitle('')
    setEditedSummary('')
  }

  const handleCancelEdit = () => {
    setEditingSlide(null)
    setEditedTitle('')
    setEditedSummary('')
  }

  const handleSectionsChange = (updatedSections: any[]) => {
    if (!generatedOutline) return
    
    setGeneratedOutline({
      ...generatedOutline,
      slides: updatedSections
    })
  }

  const handleAiImprove = async (slideId: number) => {
    if (!generatedOutline) return

    const slide = generatedOutline.slides.find(s => s.id === slideId)
    if (!slide) return

    setIsAiProcessing(true)
    setError(null)

    try {
      const response = await fetch('/api/improve-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slideTitle: slide.title,
          slideContent: slide.contentSummary,
          slideType: slide.type,
          userPrompt: 'Please improve this slide content to be more compelling and investor-friendly',
          context: {
            topic: formData.topic || formData.description,
            industry: formData.industry,
            audience: formData.audience
          }
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to improve content')
      }

      // Update the slide with AI improvements
      const updatedSlides = generatedOutline.slides.map(s => 
        s.id === slideId 
          ? { ...s, title: data.improvedTitle, contentSummary: data.improvedContent }
          : s
      )

      setGeneratedOutline({
        ...generatedOutline,
        slides: updatedSlides
      })

      setAiChatSlide(null)
      setAiPrompt('')
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to improve content')
    } finally {
      setIsAiProcessing(false)
    }
  }

  const handleToggleAiChat = (slideId: number) => {
    if (aiChatSlide === slideId) {
      setAiChatSlide(null)
      setAiPrompt('')
    } else {
      setAiChatSlide(slideId)
      setAiPrompt('')
    }
  }

  const handleUpdateSlide = (slideId: number, updatedSlide: any) => {
    if (!localDeck) return

    const updatedSlides = localDeck.slides.map(slide => 
      slide.id === slideId ? updatedSlide : slide
    )

    const updatedDeck = {
      ...localDeck,
      slides: updatedSlides
    }

    setLocalDeck(updatedDeck)
    setGeneratedDeck(updatedDeck)
  }

  const handleOpenAiRevise = (slideId: number) => {
    const slide = generatedOutline?.slides.find(s => s.id === slideId)
    if (!slide) return

    setReviseSlideId(slideId)
    setReviseConversation([{
      role: 'ai',
      message: `I'm ready to help you improve your "${slide.title}" slide. What would you like me to change or enhance?`
    }])
    setShowAiReviseModal(true)
  }

  const handleAiReviseSubmit = async (message: string) => {
    if (!reviseSlideId || !generatedOutline) return

    const slide = generatedOutline.slides.find(s => s.id === reviseSlideId)
    if (!slide) return

    // Add user message to conversation
    setReviseConversation(prev => [...prev, { role: 'user', message }])
    setIsAiProcessing(true)

    try {
      const response = await fetch('/api/improve-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slideTitle: slide.title,
          slideContent: slide.contentSummary,
          slideType: slide.type,
          userPrompt: message,
          context: {
            topic: formData.topic,
            industry: formData.industry,
            audience: formData.audience
          }
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to improve content')
      }

      // Update the slide with AI improvements
      const updatedSlides = generatedOutline.slides.map(s => 
        s.id === reviseSlideId 
          ? { ...s, title: data.improvedTitle, contentSummary: data.improvedContent }
          : s
      )

      setGeneratedOutline({
        ...generatedOutline,
        slides: updatedSlides
      })

      // Add AI response to conversation
      setReviseConversation(prev => [...prev, {
        role: 'ai',
        message: `I've updated your slide! The title is now "${data.improvedTitle}" and I've enhanced the content based on your request. Would you like me to make any other changes?`
      }])

    } catch (error) {
      setReviseConversation(prev => [...prev, {
        role: 'ai',
        message: 'Sorry, I encountered an error while improving your slide. Please try again.'
      }])
    } finally {
      setIsAiProcessing(false)
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 'mode': return 'Choose Creation Mode'
      case 'topic': return 'Tell us about your startup'
      case 'outline': return 'Review your outline'
      case 'theme': return 'Choose your theme'
      case 'generate': return 'Generating your deck'
      case 'customize': return 'Your pitch deck is ready!'
      default: return 'Create your pitch deck'
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 'mode': return 'How would you like to create your pitch deck?'
      case 'topic': return 'Help our AI understand your business so we can create a pitch deck that stands out.'
      case 'outline': return 'AI has created an outline based on your input'
      case 'theme': return 'Pick a visual style for your presentation'
      case 'generate': return 'AI is creating your professional pitch deck'
      case 'customize': return 'Review, edit, and export your deck'
      default: return ''
    }
  }

  const renderModeSelection = () => (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {getStepTitle()}
        </h1>
        <p className="text-xl text-white/70">
          {getStepDescription()}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {CREATION_MODES.map((mode, index) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                selectedMode === mode.id 
                  ? 'border-blue-400 bg-blue-500/10' 
                  : 'border-white/20 hover:border-white/40'
              }`}
              onClick={() => {
                setSelectedMode(mode.id)
                updateFormData('mode', mode.id)
              }}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${mode.color} flex items-center justify-center`}>
                  <mode.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">{mode.title}</h3>
                  {mode.popular && (
                    <Badge variant="success" className="text-xs">Popular</Badge>
                  )}
                </div>
                
                <p className="text-white/70">{mode.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <GradientButton
          type="button"
          onClick={handleNext}
          disabled={!selectedMode}
          className="w-full md:w-auto text-lg px-12 py-6 shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </GradientButton>
      </div>
    </motion.div>
  )

  const renderTopicInput = () => {
    const handleGuidedInputSubmit = () => {
      // Sync description to topic for backward compatibility
      if (formData.description && !formData.topic) {
        updateFormData('topic', formData.description)
      }
      generateOutline()
    }

    return (
      <motion.div
        className="relative min-h-[90vh] py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Subtle background gradient for depth */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-950 via-slate-900 to-purple-900 opacity-90" />
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-700/20 rounded-full blur-3xl animate-pulse z-0" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-700/20 rounded-full blur-3xl animate-pulse z-0" />

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              Tell us about your startup
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-medium max-w-3xl mx-auto">
              Help our AI understand your business so we can create a pitch deck that stands out.
            </p>
          </div>

          <GuidedInput
            formData={{
              description: formData.description,
              industry: formData.industry,
              stage: formData.stage,
              audience: formData.audience,
              slideCount: formData.slideCount
            }}
            onInputChange={updateFormData}
            onSubmit={handleGuidedInputSubmit}
            isLoading={isGenerating}
            error={error}
          />

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 pt-6 border-t border-white/10 max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              className="px-6 py-3 border-white/20 hover:border-white/40 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Mode Selection
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  const renderOutlineReview = () => {
    if (!generatedOutline) return null

    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Use the new InteractiveOutlineReview component */}
          <InteractiveOutlineReview
            sections={generatedOutline.slides}
            onSectionsChange={handleSectionsChange}
            onAiImprove={handleAiImprove}
            isLoading={isGenerating || isAiProcessing}
          />

          {/* Navigation */}
          <motion.div
            className="flex items-center justify-between max-w-6xl mx-auto px-6 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              className="px-6 py-3 border-white/20 hover:border-white/40 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            
            <Button 
              onClick={handleNext} 
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/25"
            >
              Continue to Themes <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>

        {/* AI Revise Modal */}
        {showAiReviseModal && (
          <AiReviseModal
            isOpen={showAiReviseModal}
            onClose={() => {
              setShowAiReviseModal(false)
              setReviseSlideId(null)
              setReviseConversation([])
            }}
            slide={generatedOutline?.slides.find(s => s.id === reviseSlideId)}
            conversation={reviseConversation}
            onSubmit={handleAiReviseSubmit}
            isProcessing={isAiProcessing}
          />
        )}
      </div>
    )
  }

  const renderThemeSelection = () => (
    <motion.div
      className="max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {getStepTitle()}
        </h1>
        <p className="text-white/70">
          {getStepDescription()}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {THEMES.map((theme, index) => (
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                formData.selectedTheme === theme.id 
                  ? 'border-blue-400 bg-blue-500/10' 
                  : 'border-white/20 hover:border-white/40'
              }`}
              onClick={() => updateFormData('selectedTheme', theme.id)}
            >
              <CardContent className="p-6">
                <div className="w-full h-32 rounded-lg mb-4 relative overflow-hidden group">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-90`} />
                  
                  {/* Pattern Overlay */}
                  <div className="absolute inset-0 opacity-20">
                    {theme.pattern === 'geometric' && (
                      <div className="grid grid-cols-4 gap-1 h-full p-2">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="bg-white/30 rounded-sm" />
                        ))}
                      </div>
                    )}
                    {theme.pattern === 'waves' && (
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,20 Q25,0 50,20 T100,20 L100,100 L0,100 Z" fill="white" fillOpacity="0.3" />
                        <path d="M0,40 Q25,20 50,40 T100,40 L100,100 L0,100 Z" fill="white" fillOpacity="0.2" />
                      </svg>
                    )}
                    {theme.pattern === 'clean' && (
                      <div className="flex flex-col justify-center items-center h-full space-y-2">
                        <div className="w-3/4 h-2 bg-white/40 rounded" />
                        <div className="w-1/2 h-2 bg-white/30 rounded" />
                        <div className="w-2/3 h-2 bg-white/20 rounded" />
                      </div>
                    )}
                    {theme.pattern === 'structured' && (
                      <div className="p-3 h-full">
                        <div className="border-2 border-white/30 h-full rounded flex flex-col">
                          <div className="border-b border-white/20 p-2">
                            <div className="w-1/2 h-1 bg-white/40 rounded" />
                          </div>
                          <div className="flex-1 p-2 space-y-1">
                            <div className="w-full h-1 bg-white/30 rounded" />
                            <div className="w-3/4 h-1 bg-white/20 rounded" />
                          </div>
                        </div>
                      </div>
                    )}
                    {theme.pattern === 'dynamic' && (
                      <div className="relative h-full">
                        <div className="absolute top-2 left-2 w-4 h-4 bg-white/40 rounded-full animate-pulse" />
                        <div className="absolute top-6 right-3 w-3 h-3 bg-white/30 rounded-full animate-pulse delay-300" />
                        <div className="absolute bottom-4 left-1/2 w-6 h-1 bg-white/50 rounded transform -translate-x-1/2" />
                        <div className="absolute bottom-8 left-4 w-8 h-0.5 bg-white/40 rounded" />
                      </div>
                    )}
                    {theme.pattern === 'charts' && (
                      <div className="p-3 h-full flex items-end justify-around">
                        <div className="w-2 bg-white/40 rounded-t" style={{height: '60%'}} />
                        <div className="w-2 bg-white/50 rounded-t" style={{height: '80%'}} />
                        <div className="w-2 bg-white/30 rounded-t" style={{height: '40%'}} />
                        <div className="w-2 bg-white/60 rounded-t" style={{height: '90%'}} />
                        <div className="w-2 bg-white/35 rounded-t" style={{height: '50%'}} />
                      </div>
                    )}
                  </div>
                  
                  {/* Content Preview */}
                  <div className="absolute inset-0 p-3 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="w-16 h-3 bg-white/60 rounded text-xs flex items-center justify-center text-gray-800 font-bold">
                        DECK
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="w-3/4 h-1.5 bg-white/70 rounded" />
                      <div className="w-1/2 h-1 bg-white/50 rounded" />
                    </div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">Preview</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1">{theme.name}</h3>
                <p className="text-white/60 text-sm">{theme.preview}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={isGenerating}
          className="px-8"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating deck...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5 mr-2" /> Generate my deck
            </>
          )}
        </Button>
      </div>
    </motion.div>
  )

  const renderGeneration = () => (
    <motion.div
      className="max-w-3xl mx-auto text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          {getStepTitle()}
        </h1>
        <p className="text-xl text-white/70">
          {getStepDescription()}
        </p>
      </div>

      <Card className="p-12">
        <div className="flex flex-col items-center">
          <motion.div
            className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-6"
            animate={{ rotate: isGenerating ? 360 : 0 }}
            transition={{ duration: 2, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-white mb-4">
            Creating your pitch deck...
          </h3>
          
          <div className="space-y-2 text-white/70 mb-8">
            <p className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Analyzing your business description
            </p>
            <p className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Structuring content for maximum impact
            </p>
            <p className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Applying {THEMES.find(t => t.id === formData.selectedTheme)?.name} theme
            </p>
            <p className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating professional slides
            </p>
          </div>
          
          <div className="w-full max-w-md bg-white/10 rounded-full h-2 mb-4">
            <motion.div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 8, ease: "easeInOut" }}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  )

  const renderCustomization = () => {
    if (!generatedDeck) {
      return (
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-12">
            <div className="text-red-400 mb-4">
              <AlertCircle className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Deck Generation Failed
            </h3>
            <p className="text-white/70 mb-6">
              There was an issue generating your deck. Please try again.
            </p>
            <Button onClick={() => setCurrentStep('theme')}>
              Try Again
            </Button>
          </Card>
        </motion.div>
      )
    }

    return (
      <motion.div
        className="h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <DeckViewer
          deck={localDeck || generatedDeck}
          onExport={handleExportPDF}
          onShare={handleShare}
          onUpdateSlide={handleUpdateSlide}
        />
      </motion.div>
    )
  }

  const renderPasteContent = () => (
    <motion.div
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Paste Your Content
        </h1>
        <p className="text-white/70">
          Paste your existing pitch deck content and we&apos;ll enhance it with AI
        </p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Paste your content here *
            </label>
            <Textarea
              placeholder="Paste your existing pitch deck content, business description, or any text you'd like to enhance..."
              value={pastedContent}
              onChange={(e) => setPastedContent(e.target.value)}
              rows={8}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={!pastedContent.trim() || isGenerating}
              className="px-8"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing content...
                </>
              ) : (
                <>
                  Continue <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )

  const renderImportFile = () => (
    <motion.div
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Import Your File
        </h1>
        <p className="text-white/70">
          Upload a PowerPoint, Word document, or text file to enhance with AI
        </p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Choose a file *
            </label>
            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-white/50" />
              <p className="text-white/70 mb-4">
                Drag and drop a file here, or click to browse
              </p>
              <input
                type="file"
                accept=".ppt,.pptx,.doc,.docx,.txt,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline" className="px-6">
                  Choose File
                </Button>
              </label>
            </div>
            {importedFile && (
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>{importedFile.name} selected</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={!importedFile || isProcessingFile}
              className="px-8"
            >
              {isProcessingFile ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing file...
                </>
              ) : (
                <>
                  Continue <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'mode':
        return renderModeSelection()
      case 'topic':
        return renderTopicInput()
      case 'paste':
        return renderPasteContent()
      case 'import':
        return renderImportFile()
      case 'outline':
        return renderOutlineReview()
      case 'theme':
        return renderThemeSelection()
      case 'generate':
        return renderGeneration()
      case 'customize':
        return renderCustomization()
      default:
        return renderModeSelection()
    }
  }

  return (
    <Layout showHeader={true}>
      <div className="min-h-screen">
        {/* Error Banner */}
        {error && (
          <motion.div
            className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
              <button 
                onClick={() => setError(null)}
                className="ml-4 text-red-400 hover:text-red-300"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 'customize' ? (
          <div className="h-screen">
            <AnimatePresence mode="wait">
              {renderCurrentStep()}
            </AnimatePresence>
          </div>
        ) : (
          <Container className="py-12">
            <AnimatePresence mode="wait">
              {renderCurrentStep()}
            </AnimatePresence>
          </Container>
        )}
      </div>
    </Layout>
  )
}

// AI Revise Modal Component
interface AiReviseModalProps {
  isOpen: boolean
  onClose: () => void
  slide?: any
  conversation: Array<{role: 'user' | 'ai', message: string}>
  onSubmit: (message: string) => void
  isProcessing: boolean
}

function AiReviseModal({ isOpen, onClose, slide, conversation, onSubmit, isProcessing }: AiReviseModalProps) {
  const [message, setMessage] = useState('')

  if (!isOpen || !slide) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSubmit(message.trim())
      setMessage('')
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">AI Revise</h3>
              <p className="text-white/60 text-sm">Improving: &quot;{slide.title}&quot;</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Conversation */}
        <div className="flex-1 p-6 max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {conversation.map((msg, index) => (
              <motion.div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`
                  max-w-[80%] p-4 rounded-2xl
                  ${msg.role === 'user' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                    : 'bg-white/10 text-white border border-white/20'
                  }
                `}>
                  <p className="leading-relaxed">{msg.message}</p>
                </div>
              </motion.div>
            ))}
            
            {isProcessing && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-white/10 border border-white/20 p-4 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-white/70">AI is thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/10">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell AI how to improve this slide..."
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400"
              disabled={isProcessing}
            />
            <button
              type="submit"
              disabled={!message.trim() || isProcessing}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 rounded-xl text-white font-medium transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-xs text-white/60 mt-2">
            Examples: &quot;Make this more compelling&quot;, &quot;Add specific data&quot;, &quot;Simplify for investors&quot;
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
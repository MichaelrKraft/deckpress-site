"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GripVertical, 
  X, 
  Plus, 
  Eye, 
  ChevronUp, 
  ChevronDown, 
  CheckCircle,
  Edit3,
  Save,
  Sparkles,
  AlertCircle,
  Brain,
  Target,
  Lightbulb,
  BarChart3,
  Users,
  TrendingUp,
  DollarSign,
  Award,
  Settings,
  MessageSquare,
  FileStack
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

interface Slide {
  id: number
  title: string
  type: string
  contentSummary: string
  quality?: number
  suggestions?: string
  optional?: boolean
}

interface InteractiveOutlineReviewProps {
  sections: Slide[]
  onSectionsChange: (sections: Slide[]) => void
  onAiImprove?: (slideId: number) => void
  isLoading?: boolean
}

// Extended slide type icons to match your existing system
const SLIDE_TYPE_ICONS = {
  'title': { icon: Target, color: 'from-blue-500 to-purple-600', bg: 'bg-blue-500/10' },
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
  'appendix': { icon: FileStack, color: 'from-gray-500 to-slate-600', bg: 'bg-gray-500/10' },
  'competition': { icon: Target, color: 'from-red-500 to-pink-600', bg: 'bg-red-500/10' },
  'go-to-market': { icon: TrendingUp, color: 'from-blue-600 to-indigo-600', bg: 'bg-blue-600/10' },
  'milestones': { icon: CheckCircle, color: 'from-green-600 to-teal-600', bg: 'bg-green-600/10' },
  'testimonials': { icon: MessageSquare, color: 'from-purple-600 to-pink-600', bg: 'bg-purple-600/10' },
  'advisory': { icon: Users, color: 'from-indigo-600 to-purple-600', bg: 'bg-indigo-600/10' }
}

const availableSections = [
  { 
    id: 'competition', 
    title: 'Competitive Analysis', 
    icon: '⚔️', 
    description: 'Show your competitive advantages and market positioning',
    type: 'competition'
  },
  { 
    id: 'go-to-market', 
    title: 'Go-to-Market Strategy', 
    icon: '🚀', 
    description: 'Explain your customer acquisition and growth strategy',
    type: 'go-to-market'
  },
  { 
    id: 'milestones', 
    title: 'Milestones & Roadmap', 
    icon: '🗓️', 
    description: 'Key achievements and future development plans',
    type: 'milestones'
  },
  { 
    id: 'testimonials', 
    title: 'Customer Testimonials', 
    icon: '💬', 
    description: 'Social proof and customer success stories',
    type: 'testimonials'
  },
  { 
    id: 'advisory', 
    title: 'Advisory Board', 
    icon: '👥', 
    description: 'Showcase your expert advisors and their value',
    type: 'advisory'
  }
]

const InteractiveOutlineReview: React.FC<InteractiveOutlineReviewProps> = ({ 
  sections, 
  onSectionsChange, 
  onAiImprove,
  isLoading = false 
}) => {
  const [hoveredSection, setHoveredSection] = useState<number | null>(null)
  const [showAddSection, setShowAddSection] = useState(false)
  const [previewSection, setPreviewSection] = useState<Slide | null>(null)
  const [editingSlide, setEditingSlide] = useState<number | null>(null)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedSummary, setEditedSummary] = useState('')

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    
    if (newIndex >= 0 && newIndex < sections.length) {
      [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]]
      onSectionsChange(newSections)
    }
  }

  const addSection = (newSectionTemplate: typeof availableSections[0]) => {
    const section: Slide = {
      id: Date.now(), // Simple ID generation
      title: newSectionTemplate.title,
      type: newSectionTemplate.type,
      contentSummary: newSectionTemplate.description,
      quality: 0,
      suggestions: `Consider adding specific details about ${newSectionTemplate.title.toLowerCase()}`,
      optional: true
    }
    onSectionsChange([...sections, section])
    setShowAddSection(false)
  }

  const removeSection = (sectionId: number) => {
    onSectionsChange(sections.filter(s => s.id !== sectionId))
  }

  const toggleSectionOptional = (sectionId: number) => {
    const updatedSections = sections.map(s => 
      s.id === sectionId ? { ...s, optional: !s.optional } : s
    )
    onSectionsChange(updatedSections)
  }

  const handleEditSlide = (slideId: number, title: string, summary: string) => {
    setEditingSlide(slideId)
    setEditedTitle(title)
    setEditedSummary(summary)
  }

  const handleSaveEdit = () => {
    if (editingSlide === null) return

    const updatedSections = sections.map(section => 
      section.id === editingSlide 
        ? { ...section, title: editedTitle, contentSummary: editedSummary }
        : section
    )

    onSectionsChange(updatedSections)
    setEditingSlide(null)
    setEditedTitle('')
    setEditedSummary('')
  }

  const handleCancelEdit = () => {
    setEditingSlide(null)
    setEditedTitle('')
    setEditedSummary('')
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Review Your Deck Structure
        </h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Reorder sections, add custom slides, or remove ones you don&apos;t need. 
          Our AI has created a solid foundation based on your input.
        </p>
      </div>

      {/* AI Summary */}
      <Card className="mb-8 p-6 bg-gradient-to-br from-slate-900/80 to-purple-900/20 border-purple-400/30">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2">AI-Generated Outline</h3>
            <p className="text-white/70 mb-2">
              Based on your startup description, we&apos;ve created a {sections.length}-slide presentation optimized for investor engagement.
            </p>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">
                {sections.length} slides created • Quality score: 85%
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Section List */}
      <div className="space-y-4 mb-8">
        {sections.map((section, index) => {
          const slideTypeInfo = SLIDE_TYPE_ICONS[section.type as keyof typeof SLIDE_TYPE_ICONS] || SLIDE_TYPE_ICONS['title']
          const IconComponent = slideTypeInfo.icon
          
          return (
            <motion.div
              key={section.id}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {/* Connecting Line */}
              {index < sections.length - 1 && (
                <div className="absolute left-1/2 -bottom-2 w-px h-4 bg-gradient-to-b from-purple-400/50 to-transparent z-10" />
              )}
              
              {/* Main Card */}
              <Card className={`
                p-6 transition-all duration-300 border-2
                ${hoveredSection === section.id 
                  ? 'border-purple-400/50 bg-white/10 shadow-purple-500/20 shadow-2xl transform scale-[1.02]' 
                  : 'border-white/10 hover:border-white/20'
                }
              `}>
                <div className="flex items-start gap-4">
                  {/* Drag Handle & Order Controls */}
                  <div className="flex flex-col items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveSection(index, 'up')}
                      disabled={index === 0 || isLoading}
                      className="p-1 rounded hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveSection(index, 'down')}
                      disabled={index === sections.length - 1 || isLoading}
                      className="p-1 rounded hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Section Number & Icon */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl flex items-center justify-center border border-white/20">
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r ${slideTypeInfo.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {editingSlide === section.id ? (
                      <div className="space-y-3">
                        <Input
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all"
                          placeholder="Slide title"
                        />
                        <Textarea
                          value={editedSummary}
                          onChange={(e) => setEditedSummary(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 resize-none transition-all"
                          placeholder="Content summary"
                        />
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                          {section.title}
                        </h4>
                        <p className="text-white/70 leading-relaxed group-hover:text-white/80 transition-colors mb-3">
                          {section.contentSummary}
                        </p>
                        
                        {/* Quality Indicator */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Content Quality</span>
                            <span className={`font-medium ${
                              (section.quality || 0) > 70 ? 'text-green-400' : 
                              (section.quality || 0) > 40 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {section.quality || Math.floor(Math.random() * 30) + 60}% Complete
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className={`h-2 rounded-full transition-all duration-500 ${
                                (section.quality || 0) > 70 ? 'bg-green-500' : 
                                (section.quality || 0) > 40 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${section.quality || Math.floor(Math.random() * 30) + 60}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                          {section.suggestions && (
                            <p className="text-xs text-gray-400 mt-1 flex items-start gap-1">
                              <AlertCircle className="w-3 h-3 mt-0.5 text-yellow-400 flex-shrink-0" />
                              {section.suggestions}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${slideTypeInfo.bg} text-white border border-white/20`}>
                      {section.type}
                    </div>
                    
                    {section.optional && (
                      <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                        Optional
                      </span>
                    )}
                    
                    {editingSlide === section.id ? (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleSaveEdit}
                          className="p-2 hover:bg-green-500/20 rounded-xl transition-all duration-200 group/btn"
                          title="Save changes"
                        >
                          <Save className="w-4 h-4 text-green-400 group-hover/btn:scale-110 transition-transform" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCancelEdit}
                          className="p-2 hover:bg-red-500/20 rounded-xl transition-all duration-200 group/btn"
                          title="Cancel editing"
                        >
                          <X className="w-4 h-4 text-red-400 group-hover/btn:scale-110 transition-transform" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditSlide(section.id, section.title, section.contentSummary)}
                          disabled={isLoading}
                          className="p-2 hover:bg-blue-500/20 rounded-xl transition-all duration-200 group/btn"
                          title="Edit slide"
                        >
                          <Edit3 className="w-4 h-4 text-blue-400 group-hover/btn:scale-110 transition-transform" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPreviewSection(section)}
                          className="p-2 hover:bg-purple-500/20 rounded-xl transition-all duration-200 group/btn"
                          title="Preview slide"
                        >
                          <Eye className="w-4 h-4 text-purple-400 group-hover/btn:scale-110 transition-transform" />
                        </Button>
                        {onAiImprove && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onAiImprove(section.id)}
                            disabled={isLoading}
                            className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl transition-all duration-200 group/btn shadow-lg"
                            title="AI Improve"
                          >
                            <Sparkles className="w-4 h-4 text-white group-hover/btn:scale-110 transition-transform" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSectionOptional(section.id)}
                          className="p-2 hover:bg-gray-500/20 rounded-xl transition-all duration-200 group/btn"
                          title={section.optional ? 'Make required' : 'Make optional'}
                        >
                          <CheckCircle className={`w-4 h-4 ${section.optional ? 'text-gray-400' : 'text-green-400'} group-hover/btn:scale-110 transition-transform`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSection(section.id)}
                          disabled={isLoading}
                          className="p-2 hover:bg-red-500/20 rounded-xl transition-all duration-200 group/btn"
                          title="Remove slide"
                        >
                          <X className="w-4 h-4 text-red-400 group-hover/btn:scale-110 transition-transform" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Add Section Button */}
      <Button
        onClick={() => setShowAddSection(!showAddSection)}
        disabled={isLoading}
        className="w-full p-6 rounded-lg border-2 border-dashed border-gray-600 hover:border-purple-500 transition-all flex items-center justify-center gap-2 group bg-transparent"
      >
        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
        <span className="text-lg">Add Custom Section</span>
      </Button>

      {/* Add Section Panel */}
      <AnimatePresence>
        {showAddSection && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <Card className="p-6 bg-gradient-to-br from-slate-900/80 to-purple-900/20 border-purple-500/30">
              <h3 className="font-medium mb-4 text-white">Choose a section to add:</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {availableSections.map((section) => (
                  <Button
                    key={section.id}
                    onClick={() => addSection(section)}
                    disabled={isLoading}
                    variant="ghost"
                    className="p-4 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors text-left group h-auto"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {section.icon}
                      </span>
                      <div className="text-left">
                        <p className="font-medium text-white">{section.title}</p>
                        <p className="text-xs text-gray-400">{section.description}</p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-600">
                <Button
                  onClick={() => setShowAddSection(false)}
                  variant="outline"
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Preview Modal */}
      <AnimatePresence>
        {previewSection && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewSection(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border border-white/20 rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{previewSection.title} Preview</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPreviewSection(null)}
                  className="text-gray-400 hover:text-white p-2"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-4">
                  {previewSection.contentSummary}
                </p>
                <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-800/30">
                  <p className="text-sm text-purple-300">
                    <Sparkles className="inline w-4 h-4 mr-1" />
                    AI will generate compelling content for this section based on your startup details.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smart Insights */}
      <Card className="mt-8 p-6 bg-yellow-900/20 border border-yellow-800/30">
        <div className="flex items-start gap-3">
          <Brain className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium text-yellow-300 mb-2">AI Insights</h4>
            <p className="text-sm text-yellow-200/80 leading-relaxed">
              Your outline follows proven investor presentation patterns. Consider strengthening your 
              financial projections and adding more specific traction metrics to increase credibility.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default InteractiveOutlineReview
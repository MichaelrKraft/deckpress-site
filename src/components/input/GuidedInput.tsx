"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Lightbulb, 
  ChevronRight, 
  X, 
  Brain,
  Target,
  BarChart3,
  Users,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

interface GuidedInputProps {
  formData: {
    description: string
    industry: string
    stage: string
    audience: string
    slideCount: number
  }
  onInputChange: (field: string, value: any) => void
  onSubmit: () => void
  isLoading?: boolean
  error?: string | null
}

interface Helper {
  title: string
  prompts: string[]
  example: string
  icon: React.ReactNode
}

const GuidedInput: React.FC<GuidedInputProps> = ({ 
  formData, 
  onInputChange, 
  onSubmit,
  isLoading = false,
  error = null
}) => {
  const [activeHelper, setActiveHelper] = useState<string | null>(null)
  const [showExamples, setShowExamples] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const helpers: Record<string, Helper> = {
    problem: {
      title: "Defining Your Problem",
      icon: <Target className="w-5 h-5 text-red-400" />,
      prompts: [
        "Who experiences this problem?",
        "How much does it cost them?",
        "How are they solving it now?",
        "Why do current solutions fail?"
      ],
      example: "Small businesses waste 15 hours/week on manual inventory tracking, costing them $50K annually in lost productivity and stockouts."
    },
    solution: {
      title: "Your Unique Solution",
      icon: <Lightbulb className="w-5 h-5 text-yellow-400" />,
      prompts: [
        "What's your core innovation?",
        "How is it 10x better?",
        "What's your secret sauce?",
        "Why can't others copy it?"
      ],
      example: "AI-powered inventory prediction that reduces stockouts by 85% while cutting inventory costs by 30% through demand forecasting."
    },
    market: {
      title: "Market Opportunity", 
      icon: <BarChart3 className="w-5 h-5 text-green-400" />,
      prompts: [
        "Total addressable market (TAM)?",
        "Serviceable addressable market (SAM)?",
        "What's your beachhead market?",
        "Growth rate of the market?"
      ],
      example: "$12B TAM in SMB inventory management, growing 15% YoY. Starting with 50K retail SMBs in the US ($1.2B SAM)."
    },
    team: {
      title: "Your Team",
      icon: <Users className="w-5 h-5 text-blue-400" />,
      prompts: [
        "What's your relevant experience?",
        "Previous successful exits?",
        "Domain expertise?",
        "Why are you the right team?"
      ],
      example: "Ex-Amazon supply chain engineers with 15+ years experience, previously built and sold inventory software to Oracle for $50M."
    }
  }

  const examplePitches = [
    {
      category: "B2B SaaS",
      title: "Customer Success Automation",
      description: "We help SaaS companies reduce churn by 40% through AI-powered customer success automation that predicts at-risk accounts 30 days before they cancel.",
      industry: "SaaS",
      stage: "seed"
    },
    {
      category: "FinTech",
      title: "SMB Working Capital",
      description: "We enable SMBs to access working capital in 24 hours through our AI underwriting platform that analyzes 500+ data points for instant approval.",
      industry: "FinTech", 
      stage: "series-a"
    },
    {
      category: "HealthTech",
      title: "Remote Patient Monitoring",
      description: "We reduce hospital readmissions by 60% through AI-powered remote monitoring that alerts care teams before patients deteriorate.",
      industry: "HealthTech",
      stage: "seed"
    },
    {
      category: "Climate Tech",
      title: "Carbon Management Platform",
      description: "We help enterprises reduce carbon emissions by 30% through automated tracking and optimization of their entire supply chain footprint.",
      industry: "ClimateTech",
      stage: "series-a"
    }
  ]

  const handleHelperClick = (helperKey: string) => {
    setActiveHelper(activeHelper === helperKey ? null : helperKey)
  }

  const handleUseExample = (helper: Helper) => {
    const currentDescription = formData.description
    const newDescription = currentDescription 
      ? `${currentDescription}\n\n${helper.example}`
      : helper.example
    
    onInputChange('description', newDescription)
    setActiveHelper(null)
    
    // Simulate AI analysis
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 2000)
  }

  const handleUsePitchExample = (pitch: typeof examplePitches[0]) => {
    onInputChange('description', pitch.description)
    onInputChange('industry', pitch.industry)
    onInputChange('stage', pitch.stage)
    setShowExamples(false)
    
    // Simulate AI analysis
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  const isFormValid = formData.description.trim().length > 20 && formData.industry.trim()

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Input Section */}
        <div className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium text-white mb-3">
              What&apos;s your startup about? <span className="text-pink-400">*</span>
            </label>
            <Textarea
              className={`w-full p-4 rounded-lg bg-slate-800/80 border transition-all resize-none ${
                isAnalyzing 
                  ? 'border-purple-500 ring-1 ring-purple-500/50' 
                  : 'border-blue-700/30 focus:border-purple-500'
              } text-white placeholder:text-white/40`}
              rows={5}
              value={formData.description}
              onChange={(e) => onInputChange('description', e.target.value)}
              placeholder="e.g., AI-powered platform that helps wealth managers connect with qualified investors..."
              disabled={isLoading}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-400">
                Tip: Include what you do, who you serve, and your unique value proposition
              </p>
              <span className={`text-xs ${
                formData.description.length > 20 ? 'text-green-400' : 'text-gray-500'
              }`}>
                {formData.description.length}/500
              </span>
            </div>
          </div>

          {/* Helper Buttons */}
          <div className="flex flex-wrap gap-3">
            {Object.entries(helpers).map(([key, helper]) => (
              <Button
                key={key}
                type="button"
                variant="outline"
                onClick={() => handleHelperClick(key)}
                disabled={isLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeHelper === key
                    ? 'bg-purple-600/30 border-purple-600/50'
                    : 'bg-purple-600/20 hover:bg-purple-600/30 border-purple-600/30'
                }`}
              >
                {helper.icon}
                <span className="text-sm">Help me define the {key}</span>
              </Button>
            ))}
          </div>

          {/* Active Helper Panel */}
          <AnimatePresence>
            {activeHelper && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <Card className="p-6 bg-gradient-to-br from-slate-900/80 to-purple-900/20 border-purple-500/30">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      {helpers[activeHelper].icon}
                      <h3 className="text-lg font-semibold text-white">
                        {helpers[activeHelper].title}
                      </h3>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveHelper(null)}
                      className="text-gray-400 hover:text-white p-1"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    {helpers[activeHelper].prompts.map((prompt, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-300">{prompt}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-800/30">
                    <p className="text-sm font-medium mb-2 text-purple-300">Example:</p>
                    <p className="text-sm text-gray-300">{helpers[activeHelper].example}</p>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleUseExample(helpers[activeHelper])}
                    disabled={isLoading}
                    className="mt-4 text-sm text-purple-400 hover:text-purple-300 p-0"
                  >
                    Use this example →
                  </Button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Industry and Stage Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Industry <span className="text-pink-400">*</span>
              </label>
              <Input
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800/80 border border-blue-700/30 text-white placeholder:text-white/40 focus:border-purple-500 transition-all"
                value={formData.industry}
                onChange={(e) => onInputChange('industry', e.target.value)}
                placeholder="e.g., FinTech, HealthTech, SaaS"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Funding Stage
              </label>
              <select
                className="w-full p-3 rounded-lg bg-slate-800/80 border border-blue-700/30 text-white focus:border-purple-500 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                value={formData.stage}
                onChange={(e) => onInputChange('stage', e.target.value)}
                disabled={isLoading}
              >
                <option value="pre-seed">Pre-seed</option>
                <option value="seed">Seed</option>
                <option value="series-a">Series A</option>
                <option value="series-b">Series B+</option>
              </select>
            </div>
          </div>

          {/* Additional Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Target Audience
              </label>
              <select
                className="w-full p-3 rounded-lg bg-slate-800/80 border border-blue-700/30 text-white focus:border-purple-500 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                value={formData.audience}
                onChange={(e) => onInputChange('audience', e.target.value)}
                disabled={isLoading}
              >
                <option value="investors">Investors</option>
                <option value="customers">Customers</option>
                <option value="partners">Partners</option>
                <option value="employees">Employees</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Number of slides
              </label>
              <Input
                type="number"
                min="5"
                max="20"
                className="w-full p-3 rounded-lg bg-slate-800/80 border border-blue-700/30 text-white placeholder:text-white/40 focus:border-purple-500 transition-all"
                value={formData.slideCount}
                onChange={(e) => onInputChange('slideCount', parseInt(e.target.value))}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Quick Examples Section */}
          <div>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowExamples(!showExamples)}
              disabled={isLoading}
              className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-2 p-0"
            >
              {showExamples ? '−' : '+'} Show examples from successful pitches
            </Button>

            <AnimatePresence>
              {showExamples && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {examplePitches.map((pitch, idx) => (
                      <Card key={idx} className="p-4 bg-slate-800/50 border border-gray-700 hover:border-purple-500/50 transition-all cursor-pointer group">
                        <div onClick={() => handleUsePitchExample(pitch)}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-purple-300">{pitch.category}</h4>
                            <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                              {pitch.stage}
                            </span>
                          </div>
                          <h5 className="font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
                            {pitch.title}
                          </h5>
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {pitch.description}
                          </p>
                          <Button
                            type="button"
                            variant="ghost"
                            className="mt-3 text-xs text-purple-400 hover:text-purple-300 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Use this template
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* AI Analysis Indicator */}
          <Card className="p-4 bg-purple-900/20 border border-purple-800/30">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isAnalyzing 
                  ? 'bg-purple-600 animate-pulse' 
                  : formData.description.length > 20 
                    ? 'bg-green-600' 
                    : 'bg-gray-600'
              }`}>
                {isAnalyzing ? (
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                ) : formData.description.length > 20 ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  <Brain className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  {isAnalyzing 
                    ? 'AI is analyzing your input...' 
                    : formData.description.length > 20 
                      ? 'Ready to generate your outline'
                      : 'AI will analyze your input'
                  }
                </p>
                <p className="text-xs text-gray-400">
                  {isAnalyzing 
                    ? 'This helps us create a customized outline' 
                    : 'We\'ll create a customized outline based on your description and industry best practices'
                  }
                </p>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={!isFormValid || isLoading || isAnalyzing}
              className="px-12 py-4 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  Creating Your Deck...
                </>
              ) : (
                <>
                  <Brain className="w-6 h-6 mr-3" />
                  Start Creating Your Deck
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default GuidedInput
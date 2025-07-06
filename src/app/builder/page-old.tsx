"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layout, Container } from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Badge } from '@/components/ui/Badge'
import { GradientText } from '@/components/ui/GradientText'
import { 
  Sparkles, 
  FileText, 
  Upload, 
  Wand2, 
  ChevronRight,
  ArrowLeft,
  Brain,
  Zap,
  Target
} from 'lucide-react'

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

const THEMES = [
  { id: 'modern', name: 'Modern', preview: 'Clean and professional' },
  { id: 'vibrant', name: 'Vibrant', preview: 'Bold and energetic' },
  { id: 'minimal', name: 'Minimal', preview: 'Simple and elegant' },
  { id: 'corporate', name: 'Corporate', preview: 'Traditional business' },
  { id: 'startup', name: 'Startup', preview: 'Tech-focused design' },
  { id: 'investor', name: 'Investor', preview: 'Finance-optimized' }
]

export default function Builder() {
  const [currentStep, setCurrentStep] = useState('mode') // mode, topic, outline, theme, generate, customize
  const [selectedMode, setSelectedMode] = useState('generate')
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    // Mode and topic
    mode: 'generate',
    topic: '',
    industry: '',
    audience: 'investors',
    
    // Content preferences
    slideCount: 10,
    language: 'en',
    tone: 'professional',
    includeImages: true,
    
    // Theme selection
    selectedTheme: 'modern',
    
    // Generated outline
    outline: [],
    
    // Final deck data (populated after generation)
    companyName: '',
    tagline: '',
    sections: []
  })

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    switch (currentStep) {
      case 'mode':
        setCurrentStep('topic')
        break
      case 'topic':
        setCurrentStep('outline')
        break
      case 'outline':
        setCurrentStep('theme')
        break
      case 'theme':
        setCurrentStep('generate')
        break
      case 'generate':
        setCurrentStep('customize')
        break
    }
  }

  const handlePrevious = () => {
    switch (currentStep) {
      case 'topic':
        setCurrentStep('mode')
        break
      case 'outline':
        setCurrentStep('topic')
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

  const handleGenerate = async () => {
    setIsGenerating(true)
    setCurrentStep('generate')
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      setCurrentStep('customize')
    }, 3000)
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 'mode': return 'Choose Creation Mode'
      case 'topic': return 'Tell us about your startup'
      case 'outline': return 'Review your outline'
      case 'theme': return 'Choose your theme'
      case 'generate': return 'Generating your deck'
      case 'customize': return 'Customize your deck'
      default: return 'Create your pitch deck'
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 'mode': return 'How would you like to create your pitch deck?'
      case 'topic': return 'Help our AI understand your business'
      case 'outline': return 'AI has created an outline based on your input'
      case 'theme': return 'Pick a visual style for your presentation'
      case 'generate': return 'AI is creating your professional pitch deck'
      case 'customize': return 'Fine-tune your deck and make it perfect'
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

      <div className="grid md:grid-cols-3 gap-6">
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
                    <Badge variant="success" className="text-xs">
                      Popular
                    </Badge>
                  )}
                </div>
                
                <p className="text-white/70">{mode.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button 
          size="lg" 
          onClick={handleNext}
          disabled={!selectedMode}
          className="px-8 py-4 text-lg"
        >
          Continue <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  )

  const renderTopicInput = () => (
    <motion.div
      className="max-w-3xl mx-auto"
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

      <Card className="p-8">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                What&apos;s your startup about? *
              </label>
              <Textarea
                placeholder="e.g., AI-powered platform that helps wealth managers connect with qualified investors..."
                value={formData.topic}
                onChange={(e) => updateFormData('topic', e.target.value)}
                rows={4}
                className="w-full"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Industry
                </label>
                <Input
                  placeholder="e.g., FinTech, HealthTech, SaaS"
                  value={formData.industry}
                  onChange={(e) => updateFormData('industry', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Target Audience
                </label>
                <select
                  className="w-full px-3 py-2 bg-slate-800 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.audience}
                  onChange={(e) => updateFormData('audience', e.target.value)}
                >
                  <option value="investors">Investors</option>
                  <option value="customers">Customers</option>
                  <option value="partners">Partners</option>
                  <option value="employees">Employees</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Number of slides
                </label>
                <Input
                  type="number"
                  min="5"
                  max="20"
                  value={formData.slideCount}
                  onChange={(e) => updateFormData('slideCount', parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={!formData.topic.trim()}
              className="px-8"
            >
              Continue <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )

  const renderOutlineReview = () => (
    <motion.div
      className="max-w-4xl mx-auto"
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

      <Card className="p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI-Generated Outline</h3>
            <p className="text-white/60 text-sm">Based on your input about: &quot;{formData.topic}&quot;</p>
          </div>
        </div>
        
        <div className="grid gap-4">
          {[
            '1. Company Overview & Vision',
            '2. Problem & Market Opportunity', 
            '3. Solution & Product Demo',
            '4. Market Size & Competition',
            '5. Business Model & Revenue',
            '6. Traction & Key Metrics',
            '7. Team & Advisors',
            '8. Financial Projections',
            '9. Funding Ask & Use of Funds',
            '10. Next Steps & Contact'
          ].slice(0, formData.slideCount).map((section, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold text-sm">
                {index + 1}
              </div>
              <span className="text-white">{section}</span>
            </div>
          ))}
        </div>
      </Card>
      
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        
        <Button onClick={handleNext} className="px-8">
          Looks good <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  )

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
                <div className="w-full h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-white/50 text-sm">Theme Preview</span>
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
        
        <Button onClick={handleGenerate} className="px-8">
          <Wand2 className="w-5 h-5 mr-2" /> Generate my deck
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
            {isGenerating ? 'Creating your pitch deck...' : 'Ready to generate!'}
          </h3>
          
          <div className="space-y-2 text-white/70 mb-8">
            <p>✓ Analyzing your business description</p>
            <p>✓ Structuring content for maximum impact</p>
            <p>✓ Applying {THEMES.find(t => t.id === formData.selectedTheme)?.name} theme</p>
            <p>{isGenerating ? '🔄' : '⏳'} Generating professional slides</p>
          </div>
          
          {isGenerating && (
            <div className="w-full max-w-md bg-white/10 rounded-full h-2 mb-4">
              <motion.div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3 }}
              />
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )

  const renderCustomization = () => (
    <motion.div
      className="max-w-6xl mx-auto"
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

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Slide Navigator */}
        <div>
          <Card className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Your Slides</h3>
            <div className="space-y-2">
              {[
                'Company Overview',
                'Problem & Opportunity', 
                'Solution',
                'Market Size',
                'Business Model',
                'Traction',
                'Team',
                'Financials',
                'Funding Ask',
                'Next Steps'
              ].slice(0, formData.slideCount).map((slide, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                  <div className="w-6 h-6 bg-blue-500/20 rounded text-blue-400 text-xs flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <span className="text-white text-sm">{slide}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Main Editor */}
        <div className="lg:col-span-2">
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Slide 1: Company Overview</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Target className="w-4 h-4 mr-2" /> AI Suggest
                </Button>
                <Button variant="outline" size="sm">
                  Preview
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Company Name
                </label>
                <Input
                  placeholder="DeckPress"
                  value={formData.companyName}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Tagline
                </label>
                <Input
                  placeholder="AI-Powered Pitch Deck Creation"
                  value={formData.tagline}
                  onChange={(e) => updateFormData('tagline', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Problem Statement
                </label>
                <Textarea
                  placeholder="Describe the problem your startup solves..."
                  rows={4}
                />
              </div>
            </div>
          </Card>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous slide
            </Button>
            
            <div className="flex gap-3">
              <Button variant="outline">
                Save draft
              </Button>
              <Button>
                Export deck
              </Button>
            </div>
            
            <Button>
              Next slide <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'mode':
        return renderModeSelection()
      case 'topic':
        return renderTopicInput()
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
        <Container className="py-12">
          <AnimatePresence mode="wait">
            {renderCurrentStep()}
          </AnimatePresence>
        </Container>
      </div>
    </Layout>
  )
}
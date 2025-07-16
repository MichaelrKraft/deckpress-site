"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Star,
  Filter,
  Search,
  ChevronRight,
  Award,
  Building,
  Lightbulb,
  Target
} from 'lucide-react'
import { DeckTemplate } from '@/lib/deck-templates'
import { DECK_TEMPLATES, getTemplatesByFilter, getRecommendedTemplates } from '@/lib/templates'

interface TemplateSelectorProps {
  onTemplateSelect: (template: DeckTemplate) => void
  userContext?: {
    industry?: string
    fundingStage?: string
    experience?: string
  }
}

const INDUSTRY_OPTIONS = [
  'B2B SaaS',
  'Consumer',
  'Healthcare',
  'Fintech',
  'Hardware',
  'AI/ML',
  'Marketplace',
  'E-commerce'
]

const FUNDING_STAGE_OPTIONS = [
  'Pre-seed',
  'Seed',
  'Series A',
  'Series B',
  'Growth'
]

const TARGET_AUDIENCE_OPTIONS = [
  'Investors',
  'VCs',
  'Angels',
  'Demo Day',
  'Customers',
  'Partners'
]

export function TemplateSelector({ onTemplateSelect, userContext }: TemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    industry: [] as string[],
    fundingStage: [] as string[],
    targetAudience: [] as string[],
    difficulty: ''
  })
  const [showFilters, setShowFilters] = useState(false)

  // Get all templates
  const allTemplates = Object.values(DECK_TEMPLATES)
  
  // Get recommended templates
  const recommendedTemplates = userContext ? 
    getRecommendedTemplates(userContext) : 
    allTemplates.slice(0, 2)

  // Filter templates based on search and filters
  const filteredTemplates = getTemplatesByFilter(filters).filter(template =>
    searchQuery === '' || 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.industry.some(ind => ind.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const toggleFilter = (filterType: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: Array.isArray(prev[filterType])
        ? (prev[filterType] as string[]).includes(value)
          ? (prev[filterType] as string[]).filter(item => item !== value)
          : [...(prev[filterType] as string[]), value]
        : value === prev[filterType] ? '' : value
    }))
  }

  const getTemplateIcon = (templateId: string) => {
    switch (templateId) {
      case 'yc-standard':
        return Lightbulb
      case 'sequoia-capital':
        return Building
      case 'b2b-saas':
        return TrendingUp
      case 'product-launch':
        return Star
      case 'marketplace':
        return Users
      case 'ai-ml-startup':
        return Sparkles
      case 'hardware-iot':
        return Award
      case 'social-impact':
        return Target
      default:
        return Target
    }
  }

  const getSuccessColor = (successRate: number) => {
    if (successRate >= 90) return 'text-green-500'
    if (successRate >= 80) return 'text-blue-500'
    return 'text-yellow-500'
  }

  const TemplateCard = ({ template }: { template: DeckTemplate }) => {
    const Icon = getTemplateIcon(template.id)
    
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="h-full"
      >
        <Card 
          className="cursor-pointer transition-all duration-300 hover:border-blue-400 h-full border-white/20 bg-white/5 backdrop-blur-sm"
          onClick={() => onTemplateSelect(template)}
        >
          <CardContent className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{template.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {template.metadata.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {template.fundingStage.join(', ')}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Success rate */}
              <div className="text-right">
                <div className={`text-lg font-bold ${getSuccessColor(template.metadata.successRate)}`}>
                  {template.metadata.successRate}%
                </div>
                <div className="text-xs text-white/60">Success Rate</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/70 text-sm mb-4 flex-1">
              {template.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-white/5 rounded-lg">
              <div className="text-center">
                <div className="text-sm font-semibold text-white">{template.slides.length}</div>
                <div className="text-xs text-white/60">Slides</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-green-400">{template.metadata.averageFundingRaised}</div>
                <div className="text-xs text-white/60">Avg Raised</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-blue-400">{template.industry.length}</div>
                <div className="text-xs text-white/60">Industries</div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {template.industry.slice(0, 3).map(industry => (
                <Badge key={industry} variant="outline" className="text-xs">
                  {industry}
                </Badge>
              ))}
              {template.industry.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{template.industry.length - 3} more
                </Badge>
              )}
            </div>

            {/* Based on */}
            <div className="flex items-center gap-2 text-xs text-white/60 mt-auto">
              <Award className="w-3 h-3" />
              <span>Based on: {template.metadata.basedOn}</span>
            </div>

            {/* Action */}
            <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Use This Template
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Choose Your Template
        </h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Start with a proven template used by successful startups to raise funding
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/40"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 border-white/20 hover:bg-white/10"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/5 rounded-lg p-6 border border-white/10"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {/* Industry Filter */}
                <div>
                  <h4 className="text-white font-medium mb-3">Industry</h4>
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRY_OPTIONS.map(industry => (
                      <Badge
                        key={industry}
                        variant={filters.industry.includes(industry) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleFilter('industry', industry)}
                      >
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Funding Stage Filter */}
                <div>
                  <h4 className="text-white font-medium mb-3">Funding Stage</h4>
                  <div className="flex flex-wrap gap-2">
                    {FUNDING_STAGE_OPTIONS.map(stage => (
                      <Badge
                        key={stage}
                        variant={filters.fundingStage.includes(stage) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleFilter('fundingStage', stage)}
                      >
                        {stage}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Target Audience Filter */}
                <div>
                  <h4 className="text-white font-medium mb-3">Target Audience</h4>
                  <div className="flex flex-wrap gap-2">
                    {TARGET_AUDIENCE_OPTIONS.map(audience => (
                      <Badge
                        key={audience}
                        variant={filters.targetAudience.includes(audience) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleFilter('targetAudience', audience)}
                      >
                        {audience}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Recommended Templates */}
      {recommendedTemplates.length > 0 && searchQuery === '' && Object.values(filters).every(f => Array.isArray(f) ? f.length === 0 : !f) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Recommended for You</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {recommendedTemplates.slice(0, 2).map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </motion.div>
      )}

      {/* All Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">
            {filteredTemplates.length > 0 ? 'All Templates' : 'No templates found'}
          </h2>
          {filteredTemplates.length > 0 && (
            <Badge variant="outline">{filteredTemplates.length} templates</Badge>
          )}
        </div>
        
        {filteredTemplates.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white/40" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No templates found</h3>
            <p className="text-white/60">Try adjusting your search or filters</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
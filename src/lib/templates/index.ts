import { DeckTemplate } from '../deck-templates'
import { YC_STANDARD_TEMPLATE } from './yc-standard'
import { SEQUOIA_CAPITAL_TEMPLATE } from './sequoia-capital'
import { B2B_SAAS_TEMPLATE } from './b2b-saas'
import { PRODUCT_LAUNCH_TEMPLATE } from './product-launch'
import { MARKETPLACE_TEMPLATE } from './marketplace'
import { AI_ML_STARTUP_TEMPLATE } from './ai-ml-startup'
import { HARDWARE_IOT_TEMPLATE } from './hardware-iot'
import { SOCIAL_IMPACT_TEMPLATE } from './social-impact'

// Export all deck templates
export const DECK_TEMPLATES: Record<string, DeckTemplate> = {
  'yc-standard': YC_STANDARD_TEMPLATE,
  'sequoia-capital': SEQUOIA_CAPITAL_TEMPLATE,
  'b2b-saas': B2B_SAAS_TEMPLATE,
  'product-launch': PRODUCT_LAUNCH_TEMPLATE,
  'marketplace': MARKETPLACE_TEMPLATE,
  'ai-ml-startup': AI_ML_STARTUP_TEMPLATE,
  'hardware-iot': HARDWARE_IOT_TEMPLATE,
  'social-impact': SOCIAL_IMPACT_TEMPLATE,
}

// Helper function to get template by ID
export function getTemplate(id: string): DeckTemplate | undefined {
  return DECK_TEMPLATES[id]
}

// Helper function to get templates by criteria
export function getTemplatesByFilter(filter: {
  targetAudience?: string[]
  industry?: string[]
  fundingStage?: string[]
  difficulty?: string
}): DeckTemplate[] {
  return Object.values(DECK_TEMPLATES).filter(template => {
    if (filter.targetAudience?.length && 
        !filter.targetAudience.some(audience => template.targetAudience.includes(audience))) {
      return false
    }
    
    if (filter.industry?.length && 
        !filter.industry.some(industry => template.industry.includes(industry))) {
      return false
    }
    
    if (filter.fundingStage?.length && 
        !filter.fundingStage.some(stage => template.fundingStage.includes(stage))) {
      return false
    }
    
    if (filter.difficulty && template.metadata.difficulty !== filter.difficulty) {
      return false
    }
    
    return true
  })
}

// Get template recommendations based on user input
export function getRecommendedTemplates(userContext: {
  industry?: string
  fundingStage?: string
  experience?: string
}): DeckTemplate[] {
  const templates = Object.values(DECK_TEMPLATES)
  
  // Score templates based on relevance
  const scoredTemplates = templates.map(template => {
    let score = 0
    
    // Industry match
    if (userContext.industry && template.industry.includes(userContext.industry)) {
      score += 3
    }
    
    // Funding stage match
    if (userContext.fundingStage && template.fundingStage.includes(userContext.fundingStage)) {
      score += 3
    }
    
    // Experience level match
    if (userContext.experience) {
      if (userContext.experience === 'beginner' && template.metadata.difficulty === 'beginner') {
        score += 2
      } else if (userContext.experience === 'experienced' && template.metadata.difficulty !== 'beginner') {
        score += 2
      }
    }
    
    // Success rate bonus
    score += template.metadata.successRate / 100
    
    return { template, score }
  })
  
  // Sort by score and return top templates
  return scoredTemplates
    .sort((a, b) => b.score - a.score)
    .map(item => item.template)
}

// Template categories for UI organization
export const TEMPLATE_CATEGORIES = {
  'Popular': ['yc-standard', 'sequoia-capital', 'b2b-saas'],
  'By Stage': {
    'Pre-seed/Seed': ['yc-standard', 'product-launch', 'social-impact'],
    'Seed/Series A': ['b2b-saas', 'marketplace', 'ai-ml-startup', 'hardware-iot'],
    'Series A+': ['sequoia-capital'],
  },
  'By Industry': {
    'B2B SaaS': ['yc-standard', 'sequoia-capital', 'b2b-saas'],
    'Consumer': ['product-launch', 'marketplace'],
    'Technology': ['ai-ml-startup', 'hardware-iot'],
    'Social Impact': ['social-impact'],
    'Platform/Marketplace': ['marketplace']
  }
}

export * from './yc-standard'
export * from './sequoia-capital'
export * from './b2b-saas'
export * from './product-launch'
export * from './marketplace'
export * from './ai-ml-startup'
export * from './hardware-iot'
export * from './social-impact'
/**
 * Validation utilities for pitch deck content based on common mistakes
 */

export interface ValidationResult {
  isValid: boolean
  score: number // 0-100
  warnings: ValidationWarning[]
  suggestions: ValidationSuggestion[]
}

export interface ValidationWarning {
  type: 'red-flag' | 'improvement' | 'missing'
  severity: 'low' | 'medium' | 'high'
  field: string
  title: string
  description: string
  suggestion?: string
}

export interface ValidationSuggestion {
  type: 'content' | 'structure' | 'data'
  title: string
  description: string
  example?: string
}

// Common problematic phrases that indicate red flags
const RED_FLAG_PHRASES = [
  'everyone', 'all businesses', 'huge market', 'no competition',
  'first mover', 'viral marketing', 'build it and they will come',
  'just need', 'conservative estimate', 'billion dollar market'
]

const GENERIC_PHRASES = [
  'experienced team', 'passionate', 'innovative', 'revolutionary',
  'game-changing', 'disruptive', 'cutting-edge', 'world-class'
]

const BUZZWORDS = [
  'ai-powered', 'blockchain', 'machine learning', 'deep learning',
  'big data', 'iot', 'cloud-native', 'next-generation'
]

/**
 * Validate company overview section
 */
export function validateCompanyOverview(data: {
  companyName?: string
  tagline?: string
  analogyBrandA?: string
  analogyBrandB?: string
  analogyDescription?: string
}): ValidationResult {
  const warnings: ValidationWarning[] = []
  const suggestions: ValidationSuggestion[] = []
  let score = 100

  // Check for missing required fields
  if (!data.companyName?.trim()) {
    warnings.push({
      type: 'missing',
      severity: 'high',
      field: 'companyName',
      title: 'Missing Company Name',
      description: 'Company name is required for your pitch deck',
      suggestion: 'Add a clear, memorable company name'
    })
    score -= 30
  }

  if (!data.tagline?.trim()) {
    warnings.push({
      type: 'missing',
      severity: 'medium',
      field: 'tagline',
      title: 'Missing Tagline',
      description: 'A clear tagline helps investors understand your value proposition immediately',
      suggestion: 'Create a one-sentence description of what your company does'
    })
    score -= 15
  }

  // Check tagline for buzzwords
  if (data.tagline) {
    const foundBuzzwords = BUZZWORDS.filter(word => 
      data.tagline!.toLowerCase().includes(word.toLowerCase())
    )
    if (foundBuzzwords.length > 0) {
      warnings.push({
        type: 'red-flag',
        severity: 'medium',
        field: 'tagline',
        title: 'Buzzword Alert',
        description: `Your tagline contains buzzwords: ${foundBuzzwords.join(', ')}`,
        suggestion: 'Replace with specific, concrete benefits your product provides'
      })
      score -= 10
    }
  }

  // Validate analogy
  if (!data.analogyBrandA || !data.analogyBrandB) {
    suggestions.push({
      type: 'structure',
      title: 'Add Company Analogy',
      description: 'Like WealthVP\'s "Match + Shark Tank", analogies help investors instantly understand your concept',
      example: 'Uber + Food = UberEats, or Airbnb + Experiences = Airbnb Experiences'
    })
  }

  // Validate analogy description
  if (data.analogyBrandA && data.analogyBrandB && !data.analogyDescription?.trim()) {
    warnings.push({
      type: 'improvement',
      severity: 'medium',
      field: 'analogyDescription',
      title: 'Incomplete Analogy',
      description: 'Explain how your analogy works to make it clear for investors',
      suggestion: 'Describe how the combination of these two brands represents your business model'
    })
    score -= 10
  }

  return {
    isValid: score >= 70,
    score: Math.max(0, score),
    warnings,
    suggestions
  }
}

/**
 * Validate problem section
 */
export function validateProblem(data: {
  problemStatement?: string
  targetMarket?: string
  marketStats?: Array<{ value: string; label: string; source: string }>
}): ValidationResult {
  const warnings: ValidationWarning[] = []
  const suggestions: ValidationSuggestion[] = []
  let score = 100

  // Check for missing problem statement
  if (!data.problemStatement?.trim()) {
    warnings.push({
      type: 'missing',
      severity: 'high',
      field: 'problemStatement',
      title: 'Missing Problem Statement',
      description: 'You must clearly define the problem your startup solves',
      suggestion: 'Describe the specific pain point your target market experiences'
    })
    score -= 40
  }

  // Check for generic target market
  if (!data.targetMarket?.trim()) {
    warnings.push({
      type: 'missing',
      severity: 'high',
      field: 'targetMarket',
      title: 'Missing Target Market',
      description: 'You must specify who has this problem',
      suggestion: 'Define your target market with specific demographics, not generic terms'
    })
    score -= 30
  } else {
    // Check for red flag phrases in target market
    const foundRedFlags = RED_FLAG_PHRASES.filter(phrase => 
      data.targetMarket!.toLowerCase().includes(phrase.toLowerCase())
    )
    if (foundRedFlags.length > 0) {
      warnings.push({
        type: 'red-flag',
        severity: 'high',
        field: 'targetMarket',
        title: 'Generic Target Market',
        description: `Avoid generic terms: ${foundRedFlags.join(', ')}`,
        suggestion: 'Be specific: "High-net-worth individuals with $1M+ investable assets" not "everyone"'
      })
      score -= 25
    }
  }

  // Check for supporting statistics
  const validStats = data.marketStats?.filter(stat => 
    stat.value?.trim() && stat.label?.trim() && stat.source?.trim()
  ) || []

  if (validStats.length === 0) {
    warnings.push({
      type: 'improvement',
      severity: 'medium',
      field: 'marketStats',
      title: 'No Supporting Data',
      description: 'Back up your problem with credible statistics',
      suggestion: 'Add specific statistics with sources like WealthVP\'s "90% of quality private companies go under" - PitchBook'
    })
    score -= 15
  }

  // Check for weak problem statement
  if (data.problemStatement) {
    const foundGeneric = GENERIC_PHRASES.filter(phrase => 
      data.problemStatement!.toLowerCase().includes(phrase.toLowerCase())
    )
    if (foundGeneric.length > 0) {
      warnings.push({
        type: 'improvement',
        severity: 'low',
        field: 'problemStatement',
        title: 'Generic Language',
        description: `Replace generic phrases with specific details: ${foundGeneric.join(', ')}`,
        suggestion: 'Use concrete examples and specific pain points instead of generic language'
      })
      score -= 5
    }
  }

  return {
    isValid: score >= 70,
    score: Math.max(0, score),
    warnings,
    suggestions
  }
}

/**
 * Get AI-powered content suggestions based on industry and content
 */
export function getAISuggestions(sectionType: string, formData: Record<string, any>): ValidationSuggestion[] {
  const suggestions: ValidationSuggestion[] = []

  switch (sectionType) {
    case 'title':
      if (formData.companyName && !formData.analogyBrandA) {
        suggestions.push({
          type: 'content',
          title: 'Create a Memorable Analogy',
          description: 'Help investors understand your concept instantly',
          example: 'If you\'re in fintech: "Venmo + Investment Management" or "Robinhood + Financial Planning"'
        })
      }
      break

    case 'problem':
      if (formData.targetMarket && formData.targetMarket.length < 50) {
        suggestions.push({
          type: 'content',
          title: 'Be More Specific About Your Market',
          description: 'Investors want to see precise market understanding',
          example: 'Instead of "small businesses", try "restaurants with 10-50 employees struggling with inventory management"'
        })
      }
      break
  }

  return suggestions
}

/**
 * Calculate overall deck score
 */
export function calculateDeckScore(allSections: Record<string, Record<string, any>>): number {
  const sectionScores: number[] = []

  // Title section
  if (allSections.title) {
    const result = validateCompanyOverview(allSections.title)
    sectionScores.push(result.score)
  }

  // Problem section
  if (allSections.problem) {
    const result = validateProblem(allSections.problem)
    sectionScores.push(result.score)
  }

  // Calculate weighted average (add more sections as they're implemented)
  return sectionScores.length > 0 
    ? sectionScores.reduce((sum, score) => sum + score, 0) / sectionScores.length 
    : 0
}
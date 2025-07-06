/**
 * Core types for the Pitch Deck Builder application
 */

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface PitchDeck {
  id: string
  userId: string
  title: string
  description?: string
  sections: DeckSection[]
  settings: DeckSettings
  collaborators: Collaborator[]
  status: 'draft' | 'review' | 'published'
  createdAt: Date
  updatedAt: Date
}

export interface DeckSection {
  id: string
  type: SectionType
  title: string
  content: SectionContent
  order: number
  isComplete: boolean
}

export type SectionType = 
  | 'title'
  | 'problem'
  | 'solution'
  | 'market'
  | 'product'
  | 'traction'
  | 'business-model'
  | 'competition'
  | 'team'
  | 'financials'
  | 'ask'
  | 'appendix'

export interface SectionContent {
  // Title Section
  companyName?: string
  tagline?: string
  logo?: string
  analogy?: {
    brandA: string
    brandB: string
    description: string
  }
  
  // Problem Section
  problemStatement?: string
  targetMarket?: string
  painPoints?: string[]
  marketStats?: Statistic[]
  
  // Solution Section
  solutionDescription?: string
  features?: Feature[]
  uniqueValueProposition?: string
  
  // Market Section
  marketSize?: {
    tam: number
    sam: number
    som: number
  }
  marketTrends?: string[]
  
  // Product Section
  productImages?: string[]
  demoVideo?: string
  techStack?: string[]
  
  // Traction Section
  metrics?: Metric[]
  milestones?: Milestone[]
  userTestimonials?: Testimonial[]
  
  // Business Model Section
  revenueStreams?: RevenueStream[]
  pricing?: PricingTier[]
  
  // Competition Section
  competitors?: Competitor[]
  competitiveAdvantage?: string[]
  
  // Team Section
  teamMembers?: TeamMember[]
  advisors?: Advisor[]
  
  // Financials Section
  financialProjections?: FinancialProjection[]
  keyMetrics?: KeyMetric[]
  
  // Ask Section
  fundingAmount?: number
  useOfFunds?: UseOfFunds[]
  timeline?: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface Statistic {
  value: string
  label: string
  source: string
}

export interface Metric {
  label: string
  value: number
  unit: string
  growth?: number
  period: string
}

export interface Milestone {
  date: Date
  title: string
  description: string
  achieved: boolean
}

export interface Testimonial {
  author: string
  role: string
  company: string
  content: string
  avatar?: string
}

export interface RevenueStream {
  name: string
  description: string
  percentage: number
}

export interface PricingTier {
  name: string
  price: number
  period: 'month' | 'quarter' | 'year'
  features: string[]
  target?: string
}

export interface Competitor {
  name: string
  description: string
  strengths: string[]
  weaknesses: string[]
  funding?: number
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  avatar?: string
  linkedin?: string
  experience: Experience[]
}

export interface Experience {
  company: string
  role: string
  duration: string
  achievements?: string[]
}

export interface Advisor {
  name: string
  role: string
  company: string
  avatar?: string
  linkedin?: string
}

export interface FinancialProjection {
  year: number
  revenue: number
  expenses: number
  profit: number
  users?: number
}

export interface KeyMetric {
  name: string
  value: number
  unit: string
  benchmark?: number
}

export interface UseOfFunds {
  category: string
  amount: number
  percentage: number
  description: string
}

export interface DeckSettings {
  theme: 'dark' | 'light'
  primaryColor: string
  fontFamily: string
  templateId?: string
}

export interface Collaborator {
  userId: string
  name: string
  email: string
  role: 'owner' | 'editor' | 'viewer'
  avatar?: string
  invitedAt: Date
}

export interface Comment {
  id: string
  sectionId: string
  userId: string
  content: string
  position?: {
    x: number
    y: number
  }
  resolved: boolean
  createdAt: Date
  updatedAt: Date
}

export interface FormStep {
  id: string
  title: string
  description: string
  sectionType: SectionType
  fields: FormField[]
  validation?: ValidationRule[]
}

export interface FormField {
  id: string
  label: string
  type: 'text' | 'textarea' | 'number' | 'select' | 'multiselect' | 'file' | 'url' | 'date'
  placeholder?: string
  required: boolean
  options?: SelectOption[]
  validation?: ValidationRule[]
  helpText?: string
  aiSuggestions?: boolean
}

export interface SelectOption {
  value: string
  label: string
}

export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom'
  value?: string | number
  message: string
  customValidator?: (value: string | number) => boolean
}

export interface AIAnalysis {
  sectionId: string
  suggestions: AISuggestion[]
  warnings: AIWarning[]
  score: number
  feedback: string
}

export interface AISuggestion {
  type: 'content' | 'structure' | 'data'
  title: string
  description: string
  implementation?: string
}

export interface AIWarning {
  type: 'red-flag' | 'improvement' | 'validation'
  severity: 'low' | 'medium' | 'high'
  title: string
  description: string
  suggestion?: string
}
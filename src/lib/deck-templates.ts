export interface DesignSystem {
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
    surface: string
    success: string
    warning: string
    error: string
  }
  typography: {
    headingFont: string
    bodyFont: string
    sizes: {
      h1: string
      h2: string
      h3: string
      body: string
      caption: string
    }
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  borderRadius: string
  shadows: {
    sm: string
    md: string
    lg: string
  }
}

export interface EditableComponent {
  id: string
  type: 'text' | 'metric' | 'chart' | 'image' | 'list' | 'callout'
  content: any
  isInlineEditable: boolean
  aiInstructions: string
  placeholder?: string
  formatting?: {
    bold?: boolean
    italic?: boolean
    color?: string
    alignment?: 'left' | 'center' | 'right'
  }
}

export interface PrebuiltSlide {
  id: string
  type: string
  title: string
  layout: 'hero' | 'two-column' | 'metrics' | 'list' | 'image-text' | 'full-screen'
  components: EditableComponent[]
  designElements: {
    backgroundStyle: string
    backgroundImage?: string
    colorOverlay?: string
    layout: {
      padding: string
      maxWidth: string
      alignment: string
    }
  }
  aiModifiable: string[]
  bestPractices: string[]
}

export interface CustomizationPoint {
  id: string
  name: string
  description: string
  type: 'color' | 'layout' | 'content' | 'component'
  options?: string[]
  aiPrompt: string
}

export interface AICapability {
  id: string
  name: string
  description: string
  examples: string[]
  complexity: 'simple' | 'moderate' | 'advanced'
}

export interface DeckTemplate {
  id: string
  name: string
  description: string
  targetAudience: string[]
  industry: string[]
  fundingStage: string[]
  slides: PrebuiltSlide[]
  designSystem: DesignSystem
  sampleContent: {
    companyName: string
    industry: string
    problem: string
    solution: string
    market: string
    traction: string
    team: string
    ask: string
  }
  claudeCodeIntegration: {
    modifiableComponents: string[]
    customizationPoints: CustomizationPoint[]
    aiCapabilities: AICapability[]
  }
  metadata: {
    successRate: number
    averageFundingRaised: string
    basedOn: string
    lastUpdated: string
    difficulty: 'beginner' | 'intermediate' | 'advanced'
  }
}

// Base design systems for templates
export const DESIGN_SYSTEMS: Record<string, DesignSystem> = {
  professional: {
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
      text: '#1f2937',
      background: '#ffffff',
      surface: '#f8fafc',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    typography: {
      headingFont: 'Inter, sans-serif',
      bodyFont: 'Inter, sans-serif',
      sizes: {
        h1: '3rem',
        h2: '2.25rem',
        h3: '1.5rem',
        body: '1rem',
        caption: '0.875rem'
      }
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem'
    },
    borderRadius: '8px',
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    }
  },
  modern: {
    colors: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#a78bfa',
      text: '#111827',
      background: '#ffffff',
      surface: '#f9fafb',
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171'
    },
    typography: {
      headingFont: 'Poppins, sans-serif',
      bodyFont: 'Inter, sans-serif',
      sizes: {
        h1: '3.5rem',
        h2: '2.5rem',
        h3: '1.75rem',
        body: '1.125rem',
        caption: '1rem'
      }
    },
    spacing: {
      xs: '0.75rem',
      sm: '1.25rem',
      md: '2rem',
      lg: '2.5rem',
      xl: '4rem'
    },
    borderRadius: '12px',
    shadows: {
      sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      md: '0 8px 25px -5px rgba(0, 0, 0, 0.1)',
      lg: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    }
  },
  vibrant: {
    colors: {
      primary: '#ec4899',
      secondary: '#be185d',
      accent: '#f472b6',
      text: '#1f2937',
      background: '#fefefe',
      surface: '#fdf2f8',
      success: '#22c55e',
      warning: '#eab308',
      error: '#dc2626'
    },
    typography: {
      headingFont: 'Montserrat, sans-serif',
      bodyFont: 'Open Sans, sans-serif',
      sizes: {
        h1: '4rem',
        h2: '3rem',
        h3: '2rem',
        body: '1.125rem',
        caption: '1rem'
      }
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2.5rem',
      xl: '4rem'
    },
    borderRadius: '16px',
    shadows: {
      sm: '0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      md: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      lg: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    }
  }
}

// Template creation helper
export function createTemplate(
  id: string,
  name: string,
  description: string,
  config: Partial<DeckTemplate>
): DeckTemplate {
  return {
    id,
    name,
    description,
    targetAudience: config.targetAudience || ['investors'],
    industry: config.industry || ['technology'],
    fundingStage: config.fundingStage || ['seed'],
    slides: config.slides || [],
    designSystem: config.designSystem || DESIGN_SYSTEMS.professional,
    sampleContent: config.sampleContent || {
      companyName: 'YourStartup',
      industry: 'Technology',
      problem: 'A significant market problem that needs solving',
      solution: 'Our innovative solution approach',
      market: 'Large addressable market opportunity',
      traction: 'Strong early traction and growth',
      team: 'Experienced team with domain expertise',
      ask: 'Funding amount and use of funds'
    },
    claudeCodeIntegration: config.claudeCodeIntegration || {
      modifiableComponents: ['layout', 'styling', 'content-structure'],
      customizationPoints: [],
      aiCapabilities: []
    },
    metadata: config.metadata || {
      successRate: 85,
      averageFundingRaised: '$2M',
      basedOn: 'Successful portfolio companies',
      lastUpdated: new Date().toISOString(),
      difficulty: 'intermediate'
    }
  }
}
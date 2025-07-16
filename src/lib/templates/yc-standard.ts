import { createTemplate, DESIGN_SYSTEMS, EditableComponent, PrebuiltSlide } from '../deck-templates'

// Helper function to create editable text component
function createTextComponent(
  id: string,
  content: string,
  placeholder: string = '',
  formatting?: any
): EditableComponent {
  return {
    id,
    type: 'text',
    content,
    isInlineEditable: true,
    aiInstructions: `This is editable text that users can modify directly. AI can suggest improvements or complete rewrites based on user requests.`,
    placeholder,
    formatting
  }
}

// Helper function to create metric component
function createMetricComponent(
  id: string,
  label: string,
  value: string,
  context: string = ''
): EditableComponent {
  return {
    id,
    type: 'metric',
    content: { label, value, context },
    isInlineEditable: false,
    aiInstructions: `This is a metric component. Users can modify it through AI commands like 'change the revenue to $2M' or 'add a growth metric'.`,
    placeholder: 'Enter metric value'
  }
}

// Helper function to create list component
function createListComponent(
  id: string,
  items: string[],
  listType: 'bullet' | 'number' | 'check' = 'bullet'
): EditableComponent {
  return {
    id,
    type: 'list',
    content: { items, listType },
    isInlineEditable: false,
    aiInstructions: `This is a list component. Users can modify it through AI commands like 'add three more bullet points about our competitive advantages'.`,
    placeholder: 'Add list item'
  }
}

const ycSlides: PrebuiltSlide[] = [
  // Slide 1: Company Introduction
  {
    id: 'title',
    type: 'title',
    title: 'Company Introduction',
    layout: 'hero',
    components: [
      createTextComponent('company-name', 'YourStartup', 'Company Name', { 
        bold: true, 
        alignment: 'center' 
      }),
      createTextComponent('tagline', 'One-line description of what you do', 'Company tagline', {
        alignment: 'center'
      }),
      createTextComponent('founder-info', 'Founded by [Names] • [Location] • [Year]', 'Founder information', {
        alignment: 'center'
      })
    ],
    designElements: {
      backgroundStyle: 'gradient',
      backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      layout: {
        padding: '4rem',
        maxWidth: '800px',
        alignment: 'center'
      }
    },
    aiModifiable: ['background-style', 'color-scheme', 'layout'],
    bestPractices: [
      'Keep tagline under 10 words',
      'Use strong, active language',
      'Make the problem immediately clear',
      'Include founder credibility signals'
    ]
  },
  
  // Slide 2: Problem
  {
    id: 'problem',
    type: 'problem',
    title: 'Problem',
    layout: 'two-column',
    components: [
      createTextComponent('problem-headline', 'The Problem We\'re Solving', 'Problem headline'),
      createTextComponent('problem-description', 'Describe the specific problem your target customers face today.', 'Detailed problem description'),
      createListComponent('problem-points', [
        'Pain point that costs customers time/money',
        'Current solutions are inadequate because...',
        'This affects X million people/businesses'
      ]),
      createMetricComponent('problem-size', 'Market Impact', '$50B', 'Annual cost of this problem'),
      {
        id: 'problem-story',
        type: 'callout',
        content: 'Tell a brief story about a specific customer experiencing this problem',
        isInlineEditable: true,
        aiInstructions: 'This is a customer story callout. Make it specific and relatable.'
      }
    ],
    designElements: {
      backgroundStyle: 'clean',
      layout: {
        padding: '3rem',
        maxWidth: '1000px',
        alignment: 'left'
      }
    },
    aiModifiable: ['content-structure', 'story-examples', 'metrics'],
    bestPractices: [
      'Use specific, quantifiable problems',
      'Include customer quotes or stories',
      'Show urgency - why solve this now?',
      'Connect to broader market trends'
    ]
  },

  // Slide 3: Solution
  {
    id: 'solution',
    type: 'solution',
    title: 'Solution',
    layout: 'two-column',
    components: [
      createTextComponent('solution-headline', 'Our Solution', 'Solution headline'),
      createTextComponent('solution-description', 'Explain how your product solves the problem uniquely.', 'Solution description'),
      createListComponent('solution-features', [
        'Key feature that directly addresses the problem',
        'Unique approach that competitors don\'t have',
        'Technology/process that makes it better/faster/cheaper'
      ]),
      createMetricComponent('solution-impact', 'Customer Benefit', '10x faster', 'Than current solutions'),
      {
        id: 'solution-demo',
        type: 'callout',
        content: 'Include a simple product demo or screenshot here',
        isInlineEditable: false,
        aiInstructions: 'This should show the product in action. AI can suggest what to include based on the solution type.'
      }
    ],
    designElements: {
      backgroundStyle: 'clean',
      layout: {
        padding: '3rem',
        maxWidth: '1000px',
        alignment: 'left'
      }
    },
    aiModifiable: ['feature-emphasis', 'demo-content', 'benefit-metrics'],
    bestPractices: [
      'Focus on unique value proposition',
      'Show, don\'t just tell',
      'Quantify the improvement',
      'Keep it simple and clear'
    ]
  },

  // Slide 4: Market Size
  {
    id: 'market',
    type: 'market',
    title: 'Market Opportunity',
    layout: 'metrics',
    components: [
      createTextComponent('market-headline', 'Large Market Opportunity', 'Market headline'),
      createMetricComponent('tam', 'TAM', '$100B', 'Total Addressable Market'),
      createMetricComponent('sam', 'SAM', '$10B', 'Serviceable Addressable Market'),
      createMetricComponent('som', 'SOM', '$1B', 'Serviceable Obtainable Market'),
      createTextComponent('market-growth', 'Market is growing X% annually due to trends like...', 'Market growth description'),
      createListComponent('market-drivers', [
        'Key trend driving market growth',
        'Regulatory changes creating opportunity',
        'Technology enablers making solution possible'
      ])
    ],
    designElements: {
      backgroundStyle: 'clean',
      layout: {
        padding: '3rem',
        maxWidth: '1000px',
        alignment: 'center'
      }
    },
    aiModifiable: ['market-sizing', 'growth-projections', 'trend-analysis'],
    bestPractices: [
      'Use credible market research sources',
      'Show bottom-up and top-down calculations',
      'Explain why the market is growing now',
      'Connect market size to your specific opportunity'
    ]
  },

  // Slide 5: Product/Demo
  {
    id: 'product',
    type: 'product',
    title: 'Product Demo',
    layout: 'image-text',
    components: [
      createTextComponent('product-headline', 'Product Overview', 'Product headline'),
      {
        id: 'product-screenshot',
        type: 'image',
        content: { 
          src: '/api/placeholder/600/400',
          alt: 'Product screenshot or demo',
          caption: 'Key product interface or workflow'
        },
        isInlineEditable: false,
        aiInstructions: 'This should show the actual product. AI can suggest what screens to include based on the solution.'
      },
      createListComponent('product-features', [
        'Core feature that solves the main problem',
        'Key workflow that delivers value',
        'Unique capability that differentiates'
      ]),
      createMetricComponent('user-benefit', 'User Impact', '5x faster', 'Time savings for users')
    ],
    designElements: {
      backgroundStyle: 'clean',
      layout: {
        padding: '3rem',
        maxWidth: '1200px',
        alignment: 'left'
      }
    },
    aiModifiable: ['feature-selection', 'demo-flow', 'user-benefits'],
    bestPractices: [
      'Show actual product, not mockups',
      'Focus on key user workflow',
      'Highlight unique features',
      'Make benefits immediately obvious'
    ]
  },

  // Slide 6: Traction
  {
    id: 'traction',
    type: 'traction',
    title: 'Traction',
    layout: 'metrics',
    components: [
      createTextComponent('traction-headline', 'Strong Early Traction', 'Traction headline'),
      createMetricComponent('revenue', 'Revenue', '$50K MRR', 'Monthly recurring revenue'),
      createMetricComponent('customers', 'Customers', '500+', 'Active users/customers'),
      createMetricComponent('growth', 'Growth', '20% MoM', 'Month-over-month growth'),
      createListComponent('traction-highlights', [
        'Key customer wins or partnerships',
        'Product milestones or launches',
        'Team/funding milestones'
      ]),
      {
        id: 'growth-chart',
        type: 'chart',
        content: {
          type: 'line',
          data: 'revenue-growth',
          title: 'Revenue Growth'
        },
        isInlineEditable: false,
        aiInstructions: 'This should show growth trends. AI can suggest chart types and data to highlight.'
      }
    ],
    designElements: {
      backgroundStyle: 'clean',
      layout: {
        padding: '3rem',
        maxWidth: '1000px',
        alignment: 'center'
      }
    },
    aiModifiable: ['metrics-selection', 'chart-type', 'milestone-emphasis'],
    bestPractices: [
      'Show consistent growth trajectory',
      'Include leading and lagging indicators',
      'Highlight key customer wins',
      'Be honest about current stage'
    ]
  },

  // Slide 7: Business Model
  {
    id: 'business-model',
    type: 'business-model',
    title: 'Business Model',
    layout: 'two-column',
    components: [
      createTextComponent('business-headline', 'How We Make Money', 'Business model headline'),
      createTextComponent('revenue-model', 'Primary revenue stream: [Subscription/Transaction/etc.]', 'Revenue model description'),
      createListComponent('revenue-streams', [
        'Primary revenue stream with pricing',
        'Secondary revenue opportunities',
        'Future monetization plans'
      ]),
      createMetricComponent('unit-economics', 'LTV/CAC', '3:1', 'Customer lifetime value to acquisition cost'),
      createMetricComponent('gross-margin', 'Gross Margin', '80%', 'Gross profit margin'),
      {
        id: 'pricing-strategy',
        type: 'callout',
        content: 'Pricing strategy: Why customers will pay this price',
        isInlineEditable: true,
        aiInstructions: 'Explain the pricing rationale and competitive positioning.'
      }
    ],
    designElements: {
      backgroundStyle: 'clean',
      layout: {
        padding: '3rem',
        maxWidth: '1000px',
        alignment: 'left'
      }
    },
    aiModifiable: ['pricing-strategy', 'revenue-projections', 'unit-economics'],
    bestPractices: [
      'Show clear path to profitability',
      'Include unit economics',
      'Compare to industry benchmarks',
      'Explain pricing rationale'
    ]
  },

  // Slide 8: Team
  {
    id: 'team',
    type: 'team',
    title: 'Team',
    layout: 'list',
    components: [
      createTextComponent('team-headline', 'The Team', 'Team headline'),
      createListComponent('team-members', [
        'Founder/CEO: Background and why they\'re perfect for this',
        'Co-founder/CTO: Technical background and achievements',
        'Key team member: Domain expertise and track record'
      ]),
      createListComponent('team-credentials', [
        'Previous company exits or successes',
        'Domain expertise in this market',
        'Technical or business achievements'
      ]),
      {
        id: 'advisors',
        type: 'callout',
        content: 'Notable advisors, investors, or board members',
        isInlineEditable: true,
        aiInstructions: 'Highlight key advisors and their relevance to the business.'
      }
    ],
    designElements: {
      backgroundStyle: 'clean',
      layout: {
        padding: '3rem',
        maxWidth: '1000px',
        alignment: 'left'
      }
    },
    aiModifiable: ['team-positioning', 'credential-emphasis', 'advisor-inclusion'],
    bestPractices: [
      'Show relevant domain expertise',
      'Highlight previous successes',
      'Explain why this team can execute',
      'Include advisors if impressive'
    ]
  },

  // Slide 9: Financials
  {
    id: 'financials',
    type: 'financials',
    title: 'Financial Projections',
    layout: 'metrics',
    components: [
      createTextComponent('financials-headline', '5-Year Financial Projections', 'Financials headline'),
      createMetricComponent('year-1-revenue', 'Year 1', '$500K', 'Revenue projection'),
      createMetricComponent('year-3-revenue', 'Year 3', '$5M', 'Revenue projection'),
      createMetricComponent('year-5-revenue', 'Year 5', '$25M', 'Revenue projection'),
      {
        id: 'assumptions',
        type: 'callout',
        content: 'Key assumptions: Customer acquisition, pricing, market penetration',
        isInlineEditable: true,
        aiInstructions: 'List the key assumptions behind the financial projections.'
      },
      createListComponent('use-of-funds', [
        'Product development and engineering',
        'Sales and marketing',
        'Team expansion'
      ])
    ],
    designElements: {
      backgroundStyle: 'clean',
      layout: {
        padding: '3rem',
        maxWidth: '1000px',
        alignment: 'center'
      }
    },
    aiModifiable: ['projection-timeline', 'assumption-detail', 'fund-allocation'],
    bestPractices: [
      'Be realistic but ambitious',
      'Show clear assumptions',
      'Include sensitivity analysis',
      'Connect to market opportunity'
    ]
  },

  // Slide 10: Funding Ask
  {
    id: 'ask',
    type: 'ask',
    title: 'Funding Ask',
    layout: 'hero',
    components: [
      createTextComponent('ask-headline', 'Raising $2M Series Seed', 'Funding ask headline', {
        bold: true,
        alignment: 'center'
      }),
      createTextComponent('ask-purpose', 'To achieve [specific milestones] over [timeframe]', 'Purpose of funding', {
        alignment: 'center'
      }),
      createListComponent('use-of-funds', [
        '50% - Product development and engineering',
        '30% - Sales and marketing',
        '20% - Team expansion'
      ]),
      createMetricComponent('runway', 'Runway', '18 months', 'How long funding will last'),
      {
        id: 'milestones',
        type: 'callout',
        content: 'Key milestones we\'ll achieve with this funding',
        isInlineEditable: true,
        aiInstructions: 'List specific, measurable milestones that justify the funding amount.'
      }
    ],
    designElements: {
      backgroundStyle: 'gradient',
      backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      layout: {
        padding: '4rem',
        maxWidth: '800px',
        alignment: 'center'
      }
    },
    aiModifiable: ['funding-amount', 'use-of-funds', 'milestone-timeline'],
    bestPractices: [
      'Be specific about amount and use',
      'Show clear milestones',
      'Justify the funding amount',
      'Include timeline to next round'
    ]
  }
]

export const YC_STANDARD_TEMPLATE = createTemplate(
  'yc-standard',
  'Y Combinator Standard',
  'The classic Y Combinator demo day format used by hundreds of successful startups',
  {
    targetAudience: ['investors', 'demo-day'],
    industry: ['technology', 'software', 'hardware'],
    fundingStage: ['pre-seed', 'seed'],
    slides: ycSlides,
    designSystem: DESIGN_SYSTEMS.professional,
    sampleContent: {
      companyName: 'TechStartup',
      industry: 'B2B SaaS',
      problem: 'Small businesses struggle with inefficient manual processes',
      solution: 'AI-powered automation platform for small business workflows',
      market: '$50B SMB software market growing 15% annually',
      traction: '$50K MRR with 500+ customers, 20% month-over-month growth',
      team: 'Former Google engineers with 10+ years enterprise software experience',
      ask: 'Raising $2M seed round to scale product and expand team'
    },
    claudeCodeIntegration: {
      modifiableComponents: ['layout', 'styling', 'content-structure', 'metrics', 'charts'],
      customizationPoints: [
        {
          id: 'industry-focus',
          name: 'Industry Customization',
          description: 'Adapt template for specific industry verticals',
          type: 'content',
          options: ['B2B SaaS', 'Consumer', 'Healthcare', 'Fintech', 'Hardware'],
          aiPrompt: 'Customize this template for the {industry} industry, updating examples, metrics, and language'
        },
        {
          id: 'funding-stage',
          name: 'Funding Stage',
          description: 'Adjust for different funding rounds',
          type: 'content',
          options: ['Pre-seed', 'Seed', 'Series A'],
          aiPrompt: 'Adapt this template for {stage} funding, adjusting metrics, milestones, and investor focus'
        }
      ],
      aiCapabilities: [
        {
          id: 'content-optimization',
          name: 'Content Optimization',
          description: 'AI can optimize content for investor appeal',
          examples: ['Make it more compelling', 'Add specific metrics', 'Improve clarity'],
          complexity: 'simple'
        },
        {
          id: 'industry-adaptation',
          name: 'Industry Adaptation',
          description: 'Customize for specific industry requirements',
          examples: ['Adapt for healthcare compliance', 'Add fintech regulations', 'Include hardware metrics'],
          complexity: 'moderate'
        }
      ]
    },
    metadata: {
      successRate: 92,
      averageFundingRaised: '$3.2M',
      basedOn: 'Y Combinator demo day presentations 2020-2024',
      lastUpdated: new Date().toISOString(),
      difficulty: 'beginner'
    }
  }
)
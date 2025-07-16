import { createTemplate, DESIGN_SYSTEMS, EditableComponent, PrebuiltSlide } from '../deck-templates'

// Helper functions (same as YC template)
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

const sequoiaSlides: PrebuiltSlide[] = [
  // Slide 1: Company Purpose
  {
    id: 'purpose',
    type: 'title',
    title: 'Company Purpose',
    layout: 'hero',
    components: [
      createTextComponent('company-name', 'YourCompany', 'Company Name', { 
        bold: true, 
        alignment: 'center' 
      }),
      createTextComponent('mission', 'We exist to [transform/enable/solve] [specific outcome for specific audience]', 'Company mission statement', {
        alignment: 'center'
      }),
      createTextComponent('vision-statement', 'Our vision: [The world we\'re creating]', 'Vision statement', {
        alignment: 'center'
      })
    ],
    designElements: {
      backgroundStyle: 'clean',
      layout: {
        padding: '4rem',
        maxWidth: '900px',
        alignment: 'center'
      }
    },
    aiModifiable: ['purpose-clarity', 'vision-ambition', 'audience-specificity'],
    bestPractices: [
      'Start with why, not what',
      'Be specific about the change you\'re creating',
      'Connect to larger market trends',
      'Inspire, don\'t just inform'
    ]
  },

  // Slide 2: Problem
  {
    id: 'problem',
    type: 'problem',
    title: 'Problem',
    layout: 'two-column',
    components: [
      createTextComponent('problem-headline', 'The Problem', 'Problem headline'),
      createTextComponent('problem-story', 'Tell a compelling story about the pain your customers feel', 'Customer pain story'),
      createListComponent('problem-evidence', [
        'Quantified evidence of the problem (statistics, studies)',
        'Current inadequate solutions and their limitations',
        'Why this problem is getting worse / more urgent'
      ]),
      createMetricComponent('market-pain', 'Annual Cost', '$100B', 'Cost of this problem to the market'),
      {
        id: 'status-quo',
        type: 'callout',
        content: 'Status quo: Why the current way of doing things is broken',
        isInlineEditable: true,
        aiInstructions: 'Describe the current broken process or solution that customers endure.'
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
    aiModifiable: ['problem-storytelling', 'evidence-strength', 'urgency-creation'],
    bestPractices: [
      'Lead with customer empathy',
      'Use data to prove problem magnitude',
      'Show why the problem is getting worse',
      'Create urgency around solving it now'
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
      createTextComponent('value-prop', 'We help [target customer] achieve [desired outcome] by [unique approach]', 'Value proposition'),
      createListComponent('solution-pillars', [
        'Core capability #1: How it addresses the problem',
        'Core capability #2: Why it\'s better than alternatives',
        'Core capability #3: What makes it defensible'
      ]),
      createTextComponent('magic', 'The "magic": What makes your solution uniquely powerful', 'The magic explanation'),
      {
        id: 'solution-demo',
        type: 'callout',
        content: 'Simple before/after showing the transformation you create',
        isInlineEditable: true,
        aiInstructions: 'Show the clear before/after transformation your solution provides.'
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
    aiModifiable: ['value-prop-clarity', 'differentiation', 'magic-explanation'],
    bestPractices: [
      'Focus on outcomes, not features',
      'Show clear before/after',
      'Explain your unique insight',
      'Make the magic tangible'
    ]
  },

  // Slide 4: Market Opportunity
  {
    id: 'market',
    type: 'market',
    title: 'Market Opportunity',
    layout: 'metrics',
    components: [
      createTextComponent('market-headline', 'Large & Growing Market', 'Market headline'),
      createMetricComponent('market-size', 'Market Size', '$50B', 'Total addressable market'),
      createMetricComponent('growth-rate', 'Growth Rate', '25% CAGR', 'Compound annual growth rate'),
      createTextComponent('market-timing', 'Why now: Key trends making this market ready', 'Market timing explanation'),
      createListComponent('market-drivers', [
        'Technology trend enabling your solution',
        'Regulatory/social change creating demand',
        'Economic factor making status quo unsustainable'
      ]),
      {
        id: 'market-evolution',
        type: 'callout',
        content: 'How this market will evolve and why you\'ll capture value',
        isInlineEditable: true,
        aiInstructions: 'Explain the market evolution and your position to capture value.'
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
    aiModifiable: ['market-sizing', 'timing-narrative', 'trend-analysis'],
    bestPractices: [
      'Show why the market is expanding now',
      'Connect trends to your solution',
      'Be realistic about addressable market',
      'Explain your entry strategy'
    ]
  },

  // Slide 5: Competition & Positioning
  {
    id: 'competition',
    type: 'competition',
    title: 'Competition & Positioning',
    layout: 'two-column',
    components: [
      createTextComponent('competition-headline', 'Competitive Landscape', 'Competition headline'),
      createTextComponent('competition-overview', 'Current competitive landscape and alternatives', 'Competition overview'),
      createListComponent('competitive-advantages', [
        'Unique advantage #1: Technology/approach others can\'t replicate',
        'Unique advantage #2: Market position or data advantage',
        'Unique advantage #3: Team/execution advantage'
      ]),
      {
        id: 'positioning',
        type: 'callout',
        content: 'Our positioning: How we\'re different and why it matters',
        isInlineEditable: true,
        aiInstructions: 'Clearly articulate your unique positioning and competitive moat.'
      },
      createTextComponent('moat', 'Defensibility: How you build a moat over time', 'Competitive moat strategy')
    ],
    designElements: {
      backgroundStyle: 'clean',
      layout: {
        padding: '3rem',
        maxWidth: '1000px',
        alignment: 'left'
      }
    },
    aiModifiable: ['competitive-analysis', 'positioning-clarity', 'moat-strategy'],
    bestPractices: [
      'Acknowledge real competition',
      'Focus on sustainable advantages',
      'Explain network effects or switching costs',
      'Show path to market leadership'
    ]
  },

  // Slide 6: Product
  {
    id: 'product',
    type: 'product',
    title: 'Product',
    layout: 'image-text',
    components: [
      createTextComponent('product-headline', 'Product Overview', 'Product headline'),
      {
        id: 'product-demo',
        type: 'image',
        content: { 
          src: '/api/placeholder/700/400',
          alt: 'Product interface or key workflow',
          caption: 'Key product experience or workflow'
        },
        isInlineEditable: false,
        aiInstructions: 'Show the core product experience or most important workflow.'
      },
      createListComponent('product-highlights', [
        'Core feature that delivers primary value',
        'Key differentiating capability',
        'User experience advantage'
      ]),
      createTextComponent('product-roadmap', 'Product roadmap: Where we\'re heading next', 'Product roadmap overview'),
      {
        id: 'technical-advantage',
        type: 'callout',
        content: 'Technical advantage: What makes your product hard to replicate',
        isInlineEditable: true,
        aiInstructions: 'Explain your technical moat or hard-to-replicate advantage.'
      }
    ],
    designElements: {
      backgroundStyle: 'clean',
      layout: {
        padding: '3rem',
        maxWidth: '1200px',
        alignment: 'left'
      }
    },
    aiModifiable: ['feature-prioritization', 'roadmap-strategy', 'technical-depth'],
    bestPractices: [
      'Show real product, not mockups',
      'Focus on user value, not features',
      'Highlight technical differentiation',
      'Connect to business outcomes'
    ]
  },

  // Slide 7: Revenue Model
  {
    id: 'revenue-model',
    type: 'business-model',
    title: 'Revenue Model',
    layout: 'two-column',
    components: [
      createTextComponent('revenue-headline', 'Business Model', 'Revenue model headline'),
      createTextComponent('revenue-streams', 'Primary revenue model and pricing strategy', 'Revenue streams description'),
      createListComponent('monetization', [
        'Primary revenue stream with pricing rationale',
        'Secondary revenue opportunities',
        'Long-term monetization strategy'
      ]),
      createMetricComponent('unit-economics', 'Unit Economics', 'LTV: CAC = 4:1', 'Customer lifetime value to acquisition cost'),
      createMetricComponent('gross-margin', 'Gross Margins', '85%', 'Gross profit margin'),
      {
        id: 'scalability',
        type: 'callout',
        content: 'Scalability: How revenue grows with scale (network effects, efficiency)',
        isInlineEditable: true,
        aiInstructions: 'Explain how the business model becomes more profitable at scale.'
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
    aiModifiable: ['pricing-strategy', 'scalability-factors', 'margin-improvement'],
    bestPractices: [
      'Show clear path to profitability',
      'Explain pricing power',
      'Demonstrate scalability',
      'Include sensitivity analysis'
    ]
  },

  // Slide 8: Traction
  {
    id: 'traction',
    type: 'traction',
    title: 'Traction',
    layout: 'metrics',
    components: [
      createTextComponent('traction-headline', 'Traction & Momentum', 'Traction headline'),
      createMetricComponent('key-metric-1', 'Revenue', '$100K ARR', 'Annual recurring revenue'),
      createMetricComponent('key-metric-2', 'Customers', '50 Customers', 'Paying customers'),
      createMetricComponent('key-metric-3', 'Growth', '15% MoM', 'Month-over-month growth'),
      createListComponent('traction-highlights', [
        'Key customer wins and success stories',
        'Product milestones and launches',
        'Partnership and distribution wins'
      ]),
      {
        id: 'momentum-story',
        type: 'callout',
        content: 'Momentum: What gives you confidence about future growth',
        isInlineEditable: true,
        aiInstructions: 'Tell the story of building momentum and what indicates accelerating growth.'
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
    aiModifiable: ['metrics-selection', 'growth-story', 'momentum-indicators'],
    bestPractices: [
      'Show metrics that matter for your business',
      'Include leading indicators',
      'Tell the growth story',
      'Show accelerating momentum'
    ]
  },

  // Slide 9: Team
  {
    id: 'team',
    type: 'team',
    title: 'Team',
    layout: 'list',
    components: [
      createTextComponent('team-headline', 'Team', 'Team headline'),
      createListComponent('founding-team', [
        'Founder/CEO: Domain expertise and track record',
        'Co-founder/CTO: Technical background and achievements',
        'Key team members: Relevant experience and accomplishments'
      ]),
      createTextComponent('team-story', 'Why this team: Unique insights and advantages', 'Team story'),
      createListComponent('team-credentials', [
        'Previous exits or significant company building experience',
        'Deep domain expertise in this market',
        'Technical or business execution advantages'
      ]),
      {
        id: 'team-vision',
        type: 'callout',
        content: 'Our vision for building the team: Key hires and organizational strategy',
        isInlineEditable: true,
        aiInstructions: 'Describe your strategy for building a world-class team.'
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
    aiModifiable: ['team-positioning', 'credential-emphasis', 'hiring-strategy'],
    bestPractices: [
      'Show relevant domain expertise',
      'Highlight execution ability',
      'Explain unique team insights',
      'Show vision for scaling team'
    ]
  },

  // Slide 10: Financials & Projections
  {
    id: 'financials',
    type: 'financials',
    title: 'Financial Projections',
    layout: 'metrics',
    components: [
      createTextComponent('financials-headline', 'Financial Model', 'Financials headline'),
      createMetricComponent('revenue-projection', '5-Year Revenue', '$25M', 'Projected revenue in year 5'),
      createMetricComponent('growth-trajectory', 'Revenue CAGR', '150%', 'Compound annual growth rate'),
      createMetricComponent('path-to-profitability', 'Break-even', 'Month 36', 'When you reach profitability'),
      createListComponent('key-assumptions', [
        'Customer acquisition assumptions and growth',
        'Pricing and revenue per customer assumptions',
        'Market penetration and competitive dynamics'
      ]),
      {
        id: 'scenario-analysis',
        type: 'callout',
        content: 'Scenario planning: Base, optimistic, and conservative cases',
        isInlineEditable: true,
        aiInstructions: 'Present multiple scenarios showing range of possible outcomes.'
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
    aiModifiable: ['projection-assumptions', 'scenario-modeling', 'sensitivity-analysis'],
    bestPractices: [
      'Show realistic but ambitious projections',
      'Explain key assumptions clearly',
      'Include sensitivity analysis',
      'Connect to market opportunity'
    ]
  },

  // Slide 11: Funding & Use of Funds
  {
    id: 'funding',
    type: 'ask',
    title: 'Funding Ask',
    layout: 'hero',
    components: [
      createTextComponent('funding-headline', 'Series A: $10M', 'Funding ask headline', {
        bold: true,
        alignment: 'center'
      }),
      createTextComponent('funding-purpose', 'To achieve [specific milestones] and reach [next level]', 'Purpose of funding', {
        alignment: 'center'
      }),
      createListComponent('use-of-funds', [
        '40% - Product development and R&D',
        '40% - Sales and marketing scale-up',
        '20% - Team expansion and operations'
      ]),
      createMetricComponent('runway', 'Runway', '24 months', 'Time to profitability or next round'),
      {
        id: 'milestones',
        type: 'callout',
        content: 'Key milestones: What this funding will accomplish',
        isInlineEditable: true,
        aiInstructions: 'List specific, measurable milestones that justify the funding round.'
      },
      createTextComponent('next-round', 'Path to Series B: $50M valuation based on $10M ARR', 'Next funding round strategy')
    ],
    designElements: {
      backgroundStyle: 'gradient',
      backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
      layout: {
        padding: '4rem',
        maxWidth: '900px',
        alignment: 'center'
      }
    },
    aiModifiable: ['funding-amount', 'milestone-strategy', 'next-round-planning'],
    bestPractices: [
      'Be specific about funding amount and use',
      'Show clear milestones and timeline',
      'Connect to next round strategy',
      'Demonstrate capital efficiency'
    ]
  }
]

export const SEQUOIA_CAPITAL_TEMPLATE = createTemplate(
  'sequoia-capital',
  'Sequoia Capital Pitch',
  'Based on Sequoia Capital\'s recommended pitch structure - the gold standard for Series A fundraising',
  {
    targetAudience: ['investors', 'vcs', 'series-a'],
    industry: ['technology', 'software', 'saas'],
    fundingStage: ['series-a', 'series-b'],
    slides: sequoiaSlides,
    designSystem: DESIGN_SYSTEMS.professional,
    sampleContent: {
      companyName: 'ScaleUp',
      industry: 'B2B SaaS',
      problem: 'Enterprise teams struggle with fragmented workflow tools costing $10K+ per employee annually',
      solution: 'Unified workspace platform that increases team productivity by 40% while reducing tool sprawl',
      market: '$100B enterprise software market growing 20% annually driven by remote work trends',
      traction: '$1M ARR with 50 enterprise customers, 15% month-over-month growth, $150K average contract value',
      team: 'Former Salesforce and Slack executives with deep enterprise software experience and proven exits',
      ask: 'Raising $10M Series A to scale go-to-market and expand product platform'
    },
    claudeCodeIntegration: {
      modifiableComponents: ['layout', 'styling', 'content-structure', 'metrics', 'competitive-analysis'],
      customizationPoints: [
        {
          id: 'funding-stage',
          name: 'Funding Stage Adaptation',
          description: 'Adapt template for Series A vs Series B requirements',
          type: 'content',
          options: ['Series A', 'Series B', 'Growth'],
          aiPrompt: 'Adapt this template for {stage} funding, adjusting metrics, milestones, and investor expectations'
        },
        {
          id: 'market-positioning',
          name: 'Market Position',
          description: 'Customize for market leader vs challenger positioning',
          type: 'content',
          options: ['Market Leader', 'Fast Follower', 'Disruptor'],
          aiPrompt: 'Position this company as a {position} in the market, adjusting competitive analysis and strategy'
        }
      ],
      aiCapabilities: [
        {
          id: 'competitive-analysis',
          name: 'Competitive Analysis',
          description: 'AI can research and analyze competitive landscape',
          examples: ['Analyze top 5 competitors', 'Create positioning map', 'Identify white space'],
          complexity: 'moderate'
        },
        {
          id: 'financial-modeling',
          name: 'Financial Modeling',
          description: 'AI can help build and validate financial projections',
          examples: ['Validate revenue assumptions', 'Build sensitivity analysis', 'Compare to benchmarks'],
          complexity: 'advanced'
        }
      ]
    },
    metadata: {
      successRate: 88,
      averageFundingRaised: '$12M',
      basedOn: 'Sequoia Capital pitch template and portfolio company analysis',
      lastUpdated: new Date().toISOString(),
      difficulty: 'intermediate'
    }
  }
)
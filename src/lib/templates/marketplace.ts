import { createTemplate, DESIGN_SYSTEMS, EditableComponent, PrebuiltSlide } from '../deck-templates'

// Helper functions
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
    aiInstructions: `This is a metric component. Users can modify it through AI commands like 'change the GMV to $500K' or 'add a take rate metric'.`,
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
    aiInstructions: `This is a list component. Users can modify it through AI commands like 'add more supply-side benefits' or 'improve demand-side value props'.`,
    placeholder: 'Add list item'
  }
}

const marketplaceSlides: PrebuiltSlide[] = [
  // Slide 1: Marketplace Vision
  {
    id: 'marketplace-vision',
    type: 'title',
    title: 'Marketplace Vision',
    layout: 'hero',
    components: [
      createTextComponent('marketplace-name', 'MarketplaceName', 'Marketplace Name', { 
        bold: true, 
        alignment: 'center' 
      }),
      createTextComponent('mission', 'Connecting [supply side] with [demand side] to create [value exchange]', 'Marketplace mission statement', {
        alignment: 'center'
      }),
      createTextComponent('vision-statement', 'Building the largest marketplace for [category] globally', 'Vision statement', {
        alignment: 'center'
      }),
      createTextComponent('traction-teaser', 'Currently facilitating $X in monthly GMV with X% month-over-month growth', 'Traction preview', {
        alignment: 'center'
      })
    ],
    designElements: {
      backgroundStyle: 'gradient',
      backgroundImage: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      layout: {
        padding: '4rem',
        maxWidth: '900px',
        alignment: 'center'
      }
    },
    aiModifiable: ['value-proposition', 'market-positioning', 'scale-vision'],
    bestPractices: [
      'Clear two-sided value proposition',
      'Specific market category focus',
      'Ambitious but achievable scale vision',
      'Lead with traction if significant'
    ]
  },

  // Slide 2: Market Inefficiency & Problem
  {
    id: 'market-problem',
    type: 'problem',
    title: 'Market Inefficiency & Problem',
    layout: 'two-column',
    components: [
      createTextComponent('problem-headline', 'Broken Market Dynamics', 'Problem headline'),
      createTextComponent('market-inefficiency', 'Supply and demand sides struggle to find each other, resulting in [specific inefficiencies]', 'Market inefficiency description'),
      createListComponent('supply-side-problems', [
        'Supply side: Limited reach, high acquisition costs, complex pricing',
        'Demand side: Poor discovery, lack of trust, fragmented options',
        'Market friction: No standardization, manual processes, payment issues',
        'Information asymmetry: Pricing opacity, quality uncertainty'
      ]),
      createMetricComponent('market-inefficiency-cost', 'Market Inefficiency', '$50B', 'Annual value lost to friction'),
      createMetricComponent('fragmentation', 'Fragmentation', '80%', 'Of transactions happen offline/informally'),
      {
        id: 'market-pain-story',
        type: 'callout',
        content: 'Both sides lose: Supply can\'t reach demand efficiently, demand can\'t find quality supply',
        isInlineEditable: true,
        aiInstructions: 'Explain how both sides of the market suffer from the current inefficiency.'
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
    aiModifiable: ['market-analysis', 'friction-identification', 'two-sided-pain'],
    bestPractices: [
      'Show both supply and demand side pain',
      'Quantify market inefficiency',
      'Highlight fragmentation opportunity',
      'Connect to trust and discovery problems'
    ]
  },

  // Slide 3: Marketplace Solution & Network Effects
  {
    id: 'marketplace-solution',
    type: 'solution',
    title: 'Marketplace Solution & Network Effects',
    layout: 'two-column',
    components: [
      createTextComponent('solution-headline', 'Two-Sided Platform Solution', 'Solution headline'),
      createTextComponent('platform-value', 'We create value by enabling efficient matching, building trust, and reducing transaction costs', 'Platform value creation'),
      createListComponent('value-creation', [
        'Supply side: Expanded reach, easy onboarding, payment processing',
        'Demand side: Curated selection, reviews/ratings, seamless transactions',
        'Platform benefits: Trust, discovery, standardization, network effects',
        'Unique features: AI matching, quality assurance, dispute resolution'
      ]),
      createMetricComponent('efficiency-gain', 'Efficiency Gain', '70%', 'Reduction in transaction costs'),
      createMetricComponent('reach-expansion', 'Reach Expansion', '10x', 'Increase in addressable market'),
      {
        id: 'network-effects',
        type: 'callout',
        content: 'Network effects: More supply attracts demand, more demand attracts supply, creating virtuous cycle',
        isInlineEditable: true,
        aiInstructions: 'Explain the specific network effects that make the marketplace stronger with scale.'
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
    aiModifiable: ['value-prop-clarity', 'network-effects', 'differentiation'],
    bestPractices: [
      'Clear value for both sides',
      'Explain network effects mechanics',
      'Show unique marketplace features',
      'Quantify efficiency improvements'
    ]
  },

  // Slide 4: Platform & User Experience
  {
    id: 'platform-ux',
    type: 'product',
    title: 'Platform & User Experience',
    layout: 'image-text',
    components: [
      createTextComponent('platform-headline', 'Seamless Two-Sided Experience', 'Platform headline'),
      {
        id: 'platform-interface',
        type: 'image',
        content: { 
          src: '/api/placeholder/800/600',
          alt: 'Marketplace platform showing both supply and demand interfaces',
          caption: 'Unified platform optimized for both supply and demand side users'
        },
        isInlineEditable: false,
        aiInstructions: 'Show both sides of the marketplace platform interface and key workflows.'
      },
      createListComponent('platform-features', [
        'Supply onboarding: Easy signup, profile creation, listing tools',
        'Demand discovery: Smart search, filters, recommendations',
        'Trust & safety: Verification, reviews, secure payments',
        'Mobile-first: Native apps with offline functionality'
      ]),
      createTextComponent('ux-philosophy', 'Built for mobile-first users with marketplace-specific UX patterns and trust mechanisms', 'UX approach'),
      {
        id: 'trust-safety',
        type: 'callout',
        content: 'Trust & Safety: Identity verification, escrow payments, dispute resolution, insurance protection',
        isInlineEditable: true,
        aiInstructions: 'Detail the trust and safety mechanisms that enable marketplace transactions.'
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
    aiModifiable: ['ux-optimization', 'trust-mechanisms', 'mobile-experience'],
    bestPractices: [
      'Show both sides of the platform',
      'Emphasize trust and safety features',
      'Highlight mobile-first design',
      'Include verification and quality assurance'
    ]
  },

  // Slide 5: Unit Economics & Business Model
  {
    id: 'unit-economics',
    type: 'business-model',
    title: 'Unit Economics & Business Model',
    layout: 'two-column',
    components: [
      createTextComponent('business-model-headline', 'Marketplace Business Model', 'Business model headline'),
      createTextComponent('revenue-model', 'Commission-based model with additional revenue streams from premium services', 'Revenue model overview'),
      createListComponent('revenue-streams', [
        'Transaction fees: 8% take rate on gross merchandise value',
        'Premium subscriptions: Enhanced features for power users',
        'Payment processing: Markup on payment processing fees',
        'Advertising: Promoted listings and sponsored placements'
      ]),
      createMetricComponent('take-rate', 'Take Rate', '8%', 'Commission on transactions'),
      createMetricComponent('unit-economics', 'LTV/CAC', '4.2:1', 'Customer lifetime value ratio'),
      createMetricComponent('payback-period', 'Payback Period', '8 months', 'Customer acquisition payback'),
      {
        id: 'economics-scaling',
        type: 'callout',
        content: 'Unit economics improve with scale: Fixed costs decrease, take rates can optimize, network effects increase value',
        isInlineEditable: true,
        aiInstructions: 'Explain how marketplace economics improve as the platform scales.'
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
    aiModifiable: ['revenue-optimization', 'take-rate-strategy', 'scaling-economics'],
    bestPractices: [
      'Show multiple revenue streams',
      'Justify take rate with value provided',
      'Demonstrate improving unit economics',
      'Include marketplace-specific metrics'
    ]
  },

  // Slide 6: Supply & Demand Strategy
  {
    id: 'supply-demand-strategy',
    type: 'market',
    title: 'Supply & Demand Strategy',
    layout: 'two-column',
    components: [
      createTextComponent('strategy-headline', 'Chicken-and-Egg Solution', 'Strategy headline'),
      createTextComponent('bootstrap-strategy', 'Solved chicken-and-egg through [specific approach] to build initial liquidity', 'Bootstrap approach'),
      createListComponent('supply-strategy', [
        'Supply acquisition: Direct outreach, partnerships, referral incentives',
        'Supply quality: Curation, verification, performance management',
        'Supply retention: Fair pricing, easy tools, community building',
        'Supply expansion: Geographic rollout, category expansion'
      ]),
      createListComponent('demand-strategy', [
        'Demand generation: SEO, content marketing, social media',
        'Demand experience: Personalization, recommendations, mobile-first',
        'Demand retention: Loyalty programs, repeat purchase incentives',
        'Demand expansion: Word-of-mouth, referral programs'
      ]),
      createMetricComponent('supply-side', 'Active Suppliers', '2.5K', 'Monthly active suppliers'),
      createMetricComponent('demand-side', 'Active Buyers', '15K', 'Monthly active buyers'),
      {
        id: 'liquidity-strategy',
        type: 'callout',
        content: 'Liquidity strategy: Start hyperlocal, achieve density, then expand geographically',
        isInlineEditable: true,
        aiInstructions: 'Explain the strategy for building marketplace liquidity and network effects.'
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
    aiModifiable: ['bootstrap-strategy', 'expansion-plan', 'liquidity-building'],
    bestPractices: [
      'Address chicken-and-egg problem directly',
      'Show specific supply and demand tactics',
      'Demonstrate balanced growth',
      'Include geographic expansion strategy'
    ]
  },

  // Slide 7: Traction & Marketplace Metrics
  {
    id: 'marketplace-traction',
    type: 'traction',
    title: 'Traction & Marketplace Metrics',
    layout: 'metrics',
    components: [
      createTextComponent('traction-headline', 'Strong Marketplace Traction', 'Traction headline'),
      createMetricComponent('gmv', 'Monthly GMV', '$500K', 'Gross merchandise value'),
      createMetricComponent('transactions', 'Monthly Transactions', '2.8K', 'Completed transactions'),
      createMetricComponent('gmv-growth', 'GMV Growth', '25% MoM', 'Month-over-month GMV growth'),
      createMetricComponent('repeat-rate', 'Repeat Purchase Rate', '35%', 'Customer repeat usage'),
      createListComponent('traction-highlights', [
        'Geographic expansion: Launched in 3 cities, planning 10 more',
        'Supply quality: 4.7/5 average rating, 95% completion rate',
        'Platform efficiency: 40% reduction in transaction time',
        'Network effects: 60% of new users come from referrals'
      ]),
      {
        id: 'marketplace-health',
        type: 'callout',
        content: 'Marketplace health: Balanced supply/demand growth, improving metrics, strong NPS scores',
        isInlineEditable: true,
        aiInstructions: 'Evidence of healthy marketplace dynamics and sustainable growth.'
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
    aiModifiable: ['metrics-emphasis', 'growth-trajectory', 'marketplace-health'],
    bestPractices: [
      'Focus on GMV and transaction volume',
      'Show balanced two-sided growth',
      'Include quality and efficiency metrics',
      'Demonstrate network effects working'
    ]
  },

  // Slide 8: Competition & Market Position
  {
    id: 'competitive-landscape',
    type: 'competition',
    title: 'Competition & Market Position',
    layout: 'two-column',
    components: [
      createTextComponent('competition-headline', 'Competitive Landscape', 'Competition headline'),
      createTextComponent('market-structure', 'We compete with incumbents, direct competitors, and alternative solutions', 'Market positioning'),
      createListComponent('competitive-analysis', [
        'Incumbents: Offline brokers and traditional channels (slow, expensive)',
        'Direct competitors: Other marketplace platforms (different focus/geography)',
        'Alternative solutions: DIY approaches, social media groups',
        'Big tech: Potential entry by Amazon, Google, or Meta'
      ]),
      createListComponent('competitive-advantages', [
        'Network density: Deepest liquidity in our target market',
        'Specialized focus: Purpose-built for this specific use case',
        'Geographic advantage: First-mover in key markets',
        'Technology moat: Proprietary matching algorithms and trust systems'
      ]),
      {
        id: 'defensibility-strategy',
        type: 'callout',
        content: 'Defensibility: Network effects, switching costs, brand trust, and data advantages create strong moats',
        isInlineEditable: true,
        aiInstructions: 'Explain the specific competitive moats and defensibility strategy.'
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
    aiModifiable: ['competitive-positioning', 'differentiation-strategy', 'moat-building'],
    bestPractices: [
      'Acknowledge all competitive threats',
      'Focus on network effects defensibility',
      'Show clear differentiation',
      'Address big tech competition risk'
    ]
  },

  // Slide 9: Expansion & Scale Strategy
  {
    id: 'expansion-strategy',
    type: 'market',
    title: 'Expansion & Scale Strategy',
    layout: 'two-column',
    components: [
      createTextComponent('expansion-headline', 'Path to Scale', 'Expansion headline'),
      createTextComponent('scaling-approach', 'Geographic expansion followed by category expansion to build the super-marketplace', 'Scaling strategy'),
      createListComponent('expansion-phases', [
        'Phase 1: Deepen current markets, achieve category leadership',
        'Phase 2: Expand to 25 major metropolitan areas',
        'Phase 3: International expansion to similar markets',
        'Phase 4: Adjacent category expansion leveraging network'
      ]),
      createMetricComponent('target-markets', 'Addressable Markets', '50+ cities', 'Geographic expansion opportunity'),
      createMetricComponent('category-expansion', 'Adjacent Categories', '5 categories', 'Natural expansion opportunities'),
      createListComponent('scale-advantages', [
        'Network effects: Each new market strengthens the platform',
        'Operational leverage: Technology scales without proportional costs',
        'Brand power: Market leadership creates trust and awareness',
        'Data advantages: Larger dataset improves matching and recommendations'
      ]),
      {
        id: 'super-marketplace-vision',
        type: 'callout',
        content: 'Vision: Become the super-marketplace for [category], processing $1B+ in annual GMV',
        isInlineEditable: true,
        aiInstructions: 'Long-term vision for marketplace dominance and scale.'
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
    aiModifiable: ['expansion-strategy', 'scaling-timeline', 'category-vision'],
    bestPractices: [
      'Clear phased expansion approach',
      'Show network effects scaling',
      'Include international opportunity',
      'Connect to super-marketplace vision'
    ]
  },

  // Slide 10: Funding & Growth Capital
  {
    id: 'growth-funding',
    type: 'ask',
    title: 'Series A Funding',
    layout: 'hero',
    components: [
      createTextComponent('funding-headline', 'Series A: $8M', 'Funding ask headline', {
        bold: true,
        alignment: 'center'
      }),
      createTextComponent('funding-purpose', 'To expand to 10 new markets and reach $5M monthly GMV', 'Purpose of funding', {
        alignment: 'center'
      }),
      createListComponent('use-of-funds', [
        '50% - Geographic expansion: Market entry and local operations',
        '25% - Product development: Mobile apps and marketplace features',
        '15% - Marketing and user acquisition: Supply and demand growth',
        '10% - Team expansion: Key hires in operations and engineering'
      ]),
      createListComponent('growth-milestones', [
        'Q1-Q2: Launch in 5 new metropolitan markets',
        'Q3: Reach $2M monthly GMV with positive unit economics',
        'Q4: Launch in 5 additional markets, achieve $5M monthly GMV',
        'Year 2: International expansion and Series B positioning'
      ]),
      createMetricComponent('runway', 'Runway', '24 months', 'Time to profitability and scale'),
      {
        id: 'series-b-vision',
        type: 'callout',
        content: 'Series B target: $25M at $150M valuation to become the dominant marketplace platform',
        isInlineEditable: true,
        aiInstructions: 'Next funding round strategy and long-term market dominance plan.'
      }
    ],
    designElements: {
      backgroundStyle: 'gradient',
      backgroundImage: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      layout: {
        padding: '4rem',
        maxWidth: '900px',
        alignment: 'center'
      }
    },
    aiModifiable: ['funding-allocation', 'expansion-timeline', 'market-dominance'],
    bestPractices: [
      'Focus on geographic expansion',
      'Show clear path to market leadership',
      'Include specific GMV and market targets',
      'Position for next funding round'
    ]
  }
]

export const MARKETPLACE_TEMPLATE = createTemplate(
  'marketplace',
  'Two-Sided Marketplace',
  'Designed for marketplace platforms connecting supply and demand with focus on network effects, GMV growth, and geographic expansion',
  {
    targetAudience: ['investors', 'vcs', 'marketplace-focused'],
    industry: ['marketplace', 'platform', 'e-commerce', 'sharing-economy'],
    fundingStage: ['seed', 'series-a'],
    slides: marketplaceSlides,
    designSystem: DESIGN_SYSTEMS.modern,
    sampleContent: {
      companyName: 'ConnectMarket',
      industry: 'Two-Sided Marketplace',
      problem: 'Supply and demand sides struggle to find each other efficiently, losing $50B annually to market friction',
      solution: 'AI-powered marketplace platform that creates liquidity through network effects and reduces transaction costs by 70%',
      market: '$200B addressable market with fragmented offline transactions moving online, accelerated by mobile adoption',
      traction: '$500K monthly GMV, 2.8K monthly transactions, 25% MoM growth, expanding to 10 cities',
      team: 'Former Uber, Airbnb, and Amazon marketplace executives with proven track record scaling two-sided platforms',
      ask: 'Raising $8M Series A to expand to 10 new markets and reach $5M monthly GMV'
    },
    claudeCodeIntegration: {
      modifiableComponents: ['layout', 'styling', 'content-structure', 'marketplace-metrics', 'network-effects'],
      customizationPoints: [
        {
          id: 'marketplace-type',
          name: 'Marketplace Category',
          description: 'Customize for different marketplace types',
          type: 'content',
          options: ['Services', 'Goods', 'Digital Products', 'Rental/Sharing', 'B2B'],
          aiPrompt: 'Adapt this template for a {type} marketplace, adjusting metrics, user flows, and business model'
        },
        {
          id: 'geographic-scope',
          name: 'Geographic Strategy',
          description: 'Focus on local vs global marketplace approach',
          type: 'content',
          options: ['Hyperlocal', 'National', 'Global', 'Regional'],
          aiPrompt: 'Optimize this template for {scope} marketplace expansion, adjusting strategy and metrics'
        }
      ],
      aiCapabilities: [
        {
          id: 'network-effects-analysis',
          name: 'Network Effects Analysis',
          description: 'Analyze and optimize marketplace network effects',
          examples: ['Model viral coefficients', 'Design liquidity strategies', 'Plan expansion sequencing'],
          complexity: 'advanced'
        },
        {
          id: 'marketplace-metrics',
          name: 'Marketplace Metrics Optimization',
          description: 'Focus on marketplace-specific KPIs and unit economics',
          examples: ['GMV optimization', 'Take rate strategy', 'Cohort analysis', 'LTV/CAC for both sides'],
          complexity: 'moderate'
        }
      ]
    },
    metadata: {
      successRate: 82,
      averageFundingRaised: '$12M',
      basedOn: 'Successful marketplace companies (Airbnb, Uber, DoorDash early pitch decks)',
      lastUpdated: new Date().toISOString(),
      difficulty: 'intermediate'
    }
  }
)
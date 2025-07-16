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
    aiInstructions: `This is a metric component. Users can modify it through AI commands like 'change the ARR to $5M' or 'add a churn metric'.`,
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
    aiInstructions: `This is a list component. Users can modify it through AI commands like 'add three more features' or 'prioritize by customer value'.`,
    placeholder: 'Add list item'
  }
}

const b2bSaasSlides: PrebuiltSlide[] = [
  // Slide 1: Company & Vision
  {
    id: 'company-vision',
    type: 'title',
    title: 'Company & Vision',
    layout: 'hero',
    components: [
      createTextComponent('company-name', 'SaaSCompany', 'Company Name', { 
        bold: true, 
        alignment: 'center' 
      }),
      createTextComponent('mission', 'Empowering [target customers] to [achieve specific outcome] through intelligent automation', 'Company mission statement', {
        alignment: 'center'
      }),
      createTextComponent('vision-statement', 'Building the future of [industry] operations', 'Vision statement', {
        alignment: 'center'
      }),
      createTextComponent('founded', 'Founded 2023 • San Francisco • Series A Ready', 'Company details', {
        alignment: 'center'
      })
    ],
    designElements: {
      backgroundStyle: 'gradient',
      backgroundImage: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
      layout: {
        padding: '4rem',
        maxWidth: '900px',
        alignment: 'center'
      }
    },
    aiModifiable: ['mission-clarity', 'vision-scope', 'positioning'],
    bestPractices: [
      'Clear value proposition in mission',
      'Ambitious but achievable vision',
      'Industry-specific language',
      'Convey enterprise credibility'
    ]
  },

  // Slide 2: Problem & Market Pain
  {
    id: 'problem',
    type: 'problem',
    title: 'Problem & Market Pain',
    layout: 'two-column',
    components: [
      createTextComponent('problem-headline', 'Enterprise Challenge', 'Problem headline'),
      createTextComponent('problem-story', 'Enterprise teams lose 40% of productivity due to fragmented tools and manual processes', 'Customer pain story'),
      createListComponent('problem-breakdown', [
        'Data scattered across 12+ disconnected systems',
        'Manual reporting takes 20+ hours per month per team',
        'Lack of real-time visibility into operations',
        'Compliance and audit trails are fragmented'
      ]),
      createMetricComponent('market-inefficiency', 'Productivity Loss', '40%', 'Average enterprise productivity loss'),
      createMetricComponent('cost-impact', 'Annual Cost', '$2.1M', 'Per 1000-employee company'),
      {
        id: 'customer-quote',
        type: 'callout',
        content: '"We\'re drowning in tools but starving for insights" - VP Operations, Fortune 500',
        isInlineEditable: true,
        aiInstructions: 'Customer quote highlighting the pain point.'
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
    aiModifiable: ['pain-quantification', 'industry-specifics', 'urgency-factors'],
    bestPractices: [
      'Quantify the business impact',
      'Use enterprise language and metrics',
      'Include specific customer examples',
      'Show growing complexity trend'
    ]
  },

  // Slide 3: Solution & Platform
  {
    id: 'solution',
    type: 'solution',
    title: 'Solution & Platform',
    layout: 'two-column',
    components: [
      createTextComponent('solution-headline', 'Unified Intelligence Platform', 'Solution headline'),
      createTextComponent('value-prop', 'AI-powered platform that unifies enterprise data, automates workflows, and delivers real-time insights', 'Value proposition'),
      createListComponent('core-capabilities', [
        'Universal data connector: 200+ enterprise integrations',
        'Intelligent workflow automation with natural language',
        'Real-time analytics and predictive insights',
        'Enterprise-grade security and compliance'
      ]),
      createMetricComponent('efficiency-gain', 'Efficiency Gain', '60%', 'Average productivity improvement'),
      createMetricComponent('time-savings', 'Time Savings', '30 hrs/month', 'Per knowledge worker'),
      {
        id: 'platform-architecture',
        type: 'callout',
        content: 'Built on modern microservices with enterprise APIs, SOC2 compliant',
        isInlineEditable: true,
        aiInstructions: 'Technical architecture and enterprise requirements.'
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
    aiModifiable: ['platform-positioning', 'technical-depth', 'enterprise-features'],
    bestPractices: [
      'Emphasize platform approach over point solution',
      'Highlight enterprise-grade capabilities',
      'Show measurable business outcomes',
      'Include technical credibility signals'
    ]
  },

  // Slide 4: Product Demo & Architecture
  {
    id: 'product-demo',
    type: 'product',
    title: 'Product Demo & Architecture',
    layout: 'image-text',
    components: [
      createTextComponent('demo-headline', 'Platform Overview', 'Demo headline'),
      {
        id: 'platform-screenshot',
        type: 'image',
        content: { 
          src: '/api/placeholder/800/500',
          alt: 'Platform dashboard showing unified data view',
          caption: 'Unified dashboard with real-time insights across all business functions'
        },
        isInlineEditable: false,
        aiInstructions: 'Show the main platform interface with key enterprise features.'
      },
      createListComponent('key-features', [
        'Drag-and-drop workflow builder',
        'Real-time collaboration and notifications',
        'Advanced analytics with custom dashboards',
        'API-first architecture for enterprise integration'
      ]),
      createTextComponent('technical-advantage', 'Built on cloud-native architecture with AI/ML at the core', 'Technical differentiation'),
      {
        id: 'enterprise-ready',
        type: 'callout',
        content: 'Enterprise-ready: SSO, RBAC, audit logs, 99.9% uptime SLA',
        isInlineEditable: true,
        aiInstructions: 'Enterprise readiness and compliance features.'
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
    aiModifiable: ['demo-focus', 'technical-depth', 'enterprise-emphasis'],
    bestPractices: [
      'Show real product, not mockups',
      'Emphasize enterprise scalability',
      'Highlight unique technical advantages',
      'Include compliance and security'
    ]
  },

  // Slide 5: Business Model & Pricing
  {
    id: 'business-model',
    type: 'business-model',
    title: 'Business Model & Pricing',
    layout: 'two-column',
    components: [
      createTextComponent('model-headline', 'SaaS Business Model', 'Business model headline'),
      createTextComponent('pricing-strategy', 'Tiered SaaS pricing based on users and data volume with enterprise custom pricing', 'Pricing approach'),
      createListComponent('pricing-tiers', [
        'Starter: $50/user/month - Up to 100 users',
        'Professional: $150/user/month - Up to 1000 users',
        'Enterprise: Custom pricing - Unlimited users + dedicated support'
      ]),
      createMetricComponent('average-acv', 'Average ACV', '$180K', 'Annual contract value'),
      createMetricComponent('gross-margin', 'Gross Margin', '88%', 'Industry-leading margins'),
      createMetricComponent('ndr', 'Net Dollar Retention', '125%', 'Annual expansion rate'),
      {
        id: 'unit-economics',
        type: 'callout',
        content: 'Strong unit economics: LTV/CAC = 5.2x, Payback period = 14 months',
        isInlineEditable: true,
        aiInstructions: 'Unit economics and SaaS metrics that matter for enterprise B2B.'
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
    aiModifiable: ['pricing-optimization', 'saas-metrics', 'expansion-strategy'],
    bestPractices: [
      'Show clear pricing rationale',
      'Include key SaaS metrics',
      'Demonstrate expansion revenue',
      'Compare to industry benchmarks'
    ]
  },

  // Slide 6: Go-to-Market & Sales
  {
    id: 'go-to-market',
    type: 'market',
    title: 'Go-to-Market & Sales Strategy',
    layout: 'two-column',
    components: [
      createTextComponent('gtm-headline', 'Enterprise Sales Strategy', 'GTM headline'),
      createTextComponent('target-customers', 'Mid-market to enterprise companies (500-10K employees) in tech, finance, and healthcare', 'Target customer definition'),
      createListComponent('sales-channels', [
        'Direct enterprise sales team (6-month sales cycle)',
        'Channel partnerships with system integrators',
        'Inbound marketing through content and events',
        'Strategic partnerships with complementary platforms'
      ]),
      createMetricComponent('sales-cycle', 'Sales Cycle', '6 months', 'Average enterprise deal'),
      createMetricComponent('win-rate', 'Win Rate', '35%', 'Qualified opportunity to close'),
      createListComponent('gtm-milestones', [
        'Q1: Launch enterprise sales team (5 AEs)',
        'Q2: Establish channel partner program',
        'Q3: Expand to Europe with regional team',
        'Q4: Launch marketplace and self-serve tier'
      ]),
      {
        id: 'sales-strategy',
        type: 'callout',
        content: 'Land and expand strategy: Start with departmental use case, expand company-wide',
        isInlineEditable: true,
        aiInstructions: 'Sales strategy and expansion approach for enterprise customers.'
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
    aiModifiable: ['customer-segmentation', 'channel-strategy', 'expansion-approach'],
    bestPractices: [
      'Clear ideal customer profile',
      'Proven enterprise sales metrics',
      'Multi-channel approach',
      'Land and expand strategy'
    ]
  },

  // Slide 7: Traction & Customer Success
  {
    id: 'traction',
    type: 'traction',
    title: 'Traction & Customer Success',
    layout: 'metrics',
    components: [
      createTextComponent('traction-headline', 'Strong Enterprise Traction', 'Traction headline'),
      createMetricComponent('arr', 'ARR', '$3.2M', 'Annual recurring revenue'),
      createMetricComponent('customers', 'Enterprise Customers', '24', 'Paying enterprise accounts'),
      createMetricComponent('growth-rate', 'ARR Growth', '15% MoM', 'Month-over-month ARR growth'),
      createMetricComponent('churn', 'Logo Churn', '<5%', 'Annual customer churn rate'),
      createListComponent('customer-logos', [
        'Fortune 500 technology company (8-figure deal)',
        'Major financial services firm (compliance use case)',
        'Healthcare system (operational efficiency)',
        'Growing list of mid-market success stories'
      ]),
      {
        id: 'customer-success',
        type: 'callout',
        content: 'Customer Success: 40% average productivity gain, 95% customer satisfaction, multiple case studies',
        isInlineEditable: true,
        aiInstructions: 'Customer success metrics and outcomes that validate product-market fit.'
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
    aiModifiable: ['metrics-emphasis', 'customer-stories', 'success-validation'],
    bestPractices: [
      'Show enterprise-grade traction',
      'Include customer success metrics',
      'Highlight notable customer wins',
      'Demonstrate low churn and expansion'
    ]
  },

  // Slide 8: Competition & Differentiation
  {
    id: 'competition',
    type: 'competition',
    title: 'Competition & Differentiation',
    layout: 'two-column',
    components: [
      createTextComponent('competition-headline', 'Competitive Landscape', 'Competition headline'),
      createTextComponent('market-position', 'We compete with legacy enterprise software, modern point solutions, and internal build decisions', 'Market positioning'),
      createListComponent('key-competitors', [
        'Legacy: Salesforce, Microsoft (complex, expensive, rigid)',
        'Modern: Notion, Airtable (not enterprise-grade)',
        'Point solutions: Zapier, Workato (limited scope)',
        'Build internally: Resource intensive, maintenance burden'
      ]),
      createListComponent('competitive-advantages', [
        'Enterprise-native: Built for large organizations from day one',
        'AI-first: Intelligent automation vs manual configuration',
        'Platform approach: Unified vs fragmented solutions',
        'Speed to value: Weeks not months to see ROI'
      ]),
      {
        id: 'moat-strategy',
        type: 'callout',
        content: 'Defensibility: Network effects from data, switching costs, continuous AI improvement',
        isInlineEditable: true,
        aiInstructions: 'Competitive moat and defensibility strategy for enterprise market.'
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
    aiModifiable: ['competitive-positioning', 'differentiation-clarity', 'moat-strength'],
    bestPractices: [
      'Acknowledge real competition honestly',
      'Focus on sustainable advantages',
      'Show clear differentiation',
      'Explain long-term defensibility'
    ]
  },

  // Slide 9: Financial Projections
  {
    id: 'financials',
    type: 'financials',
    title: 'Financial Projections',
    layout: 'metrics',
    components: [
      createTextComponent('financials-headline', 'SaaS Financial Model', 'Financials headline'),
      createMetricComponent('current-arr', 'Current ARR', '$3.2M', 'Current annual recurring revenue'),
      createMetricComponent('year-2-arr', 'Year 2 ARR', '$12M', 'Projected ARR'),
      createMetricComponent('year-3-arr', 'Year 3 ARR', '$35M', 'Projected ARR'),
      createMetricComponent('year-5-arr', 'Year 5 ARR', '$120M', 'Long-term projection'),
      createListComponent('key-assumptions', [
        'Customer acquisition: 3-4 new enterprise deals per month',
        'Average ACV growth: $180K to $300K over 3 years',
        'Net dollar retention: 125% (expansion + upsells)',
        'Sales team scaling: 2x reps annually, $1.2M quota per rep'
      ]),
      {
        id: 'path-to-profitability',
        type: 'callout',
        content: 'Path to profitability: Break-even at $25M ARR (Month 28), 25% EBITDA margins at scale',
        isInlineEditable: true,
        aiInstructions: 'Clear path to profitability with SaaS economics.'
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
    aiModifiable: ['growth-assumptions', 'profitability-timeline', 'saas-metrics'],
    bestPractices: [
      'Show realistic SaaS growth trajectory',
      'Include key assumption drivers',
      'Clear path to profitability',
      'Industry benchmark comparisons'
    ]
  },

  // Slide 10: Funding & Use of Capital
  {
    id: 'funding',
    type: 'ask',
    title: 'Series A Funding',
    layout: 'hero',
    components: [
      createTextComponent('funding-headline', 'Series A: $15M', 'Funding ask headline', {
        bold: true,
        alignment: 'center'
      }),
      createTextComponent('funding-purpose', 'To scale go-to-market and reach $25M ARR in 24 months', 'Purpose of funding', {
        alignment: 'center'
      }),
      createListComponent('use-of-funds', [
        '50% - Sales & Marketing: Scale enterprise sales team to 20 AEs',
        '30% - Product Development: AI/ML capabilities and enterprise features',
        '15% - International Expansion: European market entry',
        '5% - Working Capital: Operations and infrastructure'
      ]),
      createMetricComponent('runway', 'Runway', '30 months', 'Time to profitability'),
      createMetricComponent('series-b', 'Series B Target', '$50M at $200M', 'Next round positioning'),
      {
        id: 'key-milestones',
        type: 'callout',
        content: 'Key milestones: $25M ARR, 150+ enterprise customers, profitable unit economics, Series B ready',
        isInlineEditable: true,
        aiInstructions: 'Specific milestones that justify the Series A investment.'
      }
    ],
    designElements: {
      backgroundStyle: 'gradient',
      backgroundImage: 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
      layout: {
        padding: '4rem',
        maxWidth: '900px',
        alignment: 'center'
      }
    },
    aiModifiable: ['funding-amount', 'milestone-strategy', 'capital-efficiency'],
    bestPractices: [
      'Justify funding amount with clear plan',
      'Show path to next funding milestone',
      'Demonstrate capital efficiency',
      'Include specific growth targets'
    ]
  }
]

export const B2B_SAAS_TEMPLATE = createTemplate(
  'b2b-saas',
  'B2B SaaS Platform',
  'Optimized for enterprise software companies raising Series A/B with focus on ARR, customer success, and enterprise sales',
  {
    targetAudience: ['investors', 'vcs', 'enterprise-focused'],
    industry: ['b2b-saas', 'enterprise-software', 'technology'],
    fundingStage: ['series-a', 'series-b'],
    slides: b2bSaasSlides,
    designSystem: DESIGN_SYSTEMS.professional,
    sampleContent: {
      companyName: 'EnterpriseAI',
      industry: 'B2B SaaS',
      problem: 'Enterprise teams lose 40% productivity due to fragmented tools and manual processes',
      solution: 'AI-powered unified platform that automates workflows and delivers real-time insights',
      market: '$240B enterprise software market growing 12% annually driven by digital transformation',
      traction: '$3.2M ARR with 24 enterprise customers, 15% month-over-month growth, $180K average ACV',
      team: 'Former enterprise software executives from Salesforce, Workday, and ServiceNow',
      ask: 'Raising $15M Series A to scale go-to-market and reach $25M ARR'
    },
    claudeCodeIntegration: {
      modifiableComponents: ['layout', 'styling', 'content-structure', 'metrics', 'saas-kpis'],
      customizationPoints: [
        {
          id: 'enterprise-focus',
          name: 'Enterprise vs SMB Focus',
          description: 'Adapt messaging for enterprise vs small business target market',
          type: 'content',
          options: ['Enterprise (1000+ employees)', 'Mid-market (100-1000)', 'SMB (<100)'],
          aiPrompt: 'Adapt this template for {segment} customers, adjusting metrics, sales process, and positioning'
        },
        {
          id: 'saas-metrics',
          name: 'SaaS Metrics Emphasis',
          description: 'Highlight different SaaS metrics based on company stage',
          type: 'content',
          options: ['Early stage (ARR growth)', 'Growth stage (Efficiency)', 'Scale stage (Profitability)'],
          aiPrompt: 'Emphasize {stage} SaaS metrics throughout the presentation'
        }
      ],
      aiCapabilities: [
        {
          id: 'saas-benchmarking',
          name: 'SaaS Benchmarking',
          description: 'Compare metrics to industry SaaS benchmarks',
          examples: ['Compare ARR growth to similar companies', 'Benchmark unit economics', 'Analyze churn rates'],
          complexity: 'moderate'
        },
        {
          id: 'enterprise-positioning',
          name: 'Enterprise Positioning',
          description: 'Optimize positioning for enterprise buyers and investors',
          examples: ['Emphasize enterprise readiness', 'Highlight compliance features', 'Focus on ROI and efficiency'],
          complexity: 'moderate'
        }
      ]
    },
    metadata: {
      successRate: 85,
      averageFundingRaised: '$18M',
      basedOn: 'Successful B2B SaaS Series A companies (Notion, Airtable, Monday.com)',
      lastUpdated: new Date().toISOString(),
      difficulty: 'intermediate'
    }
  }
)
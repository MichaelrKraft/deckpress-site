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
    aiInstructions: `This is a metric component. Users can modify it through AI commands like 'change the accuracy to 95%' or 'add a latency metric'.`,
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
    aiInstructions: `This is a list component. Users can modify it through AI commands like 'add more technical advantages' or 'emphasize AI capabilities'.`,
    placeholder: 'Add list item'
  }
}

const aiMlSlides: PrebuiltSlide[] = [
  // Slide 1: AI Vision & Mission
  {
    id: 'ai-vision',
    type: 'title',
    title: 'AI Vision & Mission',
    layout: 'hero',
    components: [
      createTextComponent('company-name', 'AI Company', 'Company Name', { 
        bold: true, 
        alignment: 'center' 
      }),
      createTextComponent('ai-mission', 'Using AI to [transform/automate/optimize] [specific domain] for [target users]', 'AI mission statement', {
        alignment: 'center'
      }),
      createTextComponent('ai-vision', 'Building the AI platform that [future state achievement]', 'Vision statement', {
        alignment: 'center'
      }),
      createTextComponent('tech-foundation', 'Powered by [specific AI technology] • [Data advantage] • [Performance metric]', 'Technical foundation', {
        alignment: 'center'
      })
    ],
    designElements: {
      backgroundStyle: 'gradient',
      backgroundImage: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      layout: {
        padding: '4rem',
        maxWidth: '900px',
        alignment: 'center'
      }
    },
    aiModifiable: ['ai-positioning', 'technical-focus', 'vision-scope'],
    bestPractices: [
      'Clear AI application domain',
      'Specific transformation promise',
      'Technical credibility signals',
      'Measurable impact vision'
    ]
  },

  // Slide 2: Problem & Current Limitations
  {
    id: 'ai-problem',
    type: 'problem',
    title: 'Problem & Current Limitations',
    layout: 'two-column',
    components: [
      createTextComponent('problem-headline', 'AI/Automation Gap', 'Problem headline'),
      createTextComponent('current-state', 'Current solutions require manual processes that are slow, error-prone, and don\'t scale', 'Current state description'),
      createListComponent('technical-limitations', [
        'Manual processes: 80% of [domain] work still done manually',
        'Accuracy limitations: Current automation only 60% accurate',
        'Scale constraints: Human bottlenecks prevent growth',
        'Data silos: Information fragmented across systems'
      ]),
      createMetricComponent('inefficiency-cost', 'Annual Cost', '$100B', 'Cost of current inefficiencies'),
      createMetricComponent('error-rate', 'Error Rate', '15%', 'Human error in manual processes'),
      {
        id: 'ai-opportunity',
        type: 'callout',
        content: 'AI opportunity: Recent breakthroughs make automated solutions feasible for the first time',
        isInlineEditable: true,
        aiInstructions: 'Explain why AI can now solve this problem when it couldn\'t before.'
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
    aiModifiable: ['technical-problem-framing', 'ai-timing', 'scalability-issues'],
    bestPractices: [
      'Focus on technical limitations',
      'Show scale and accuracy problems',
      'Explain why AI is the solution now',
      'Quantify the inefficiency cost'
    ]
  },

  // Slide 3: AI Solution & Technology
  {
    id: 'ai-solution',
    type: 'solution',
    title: 'AI Solution & Technology',
    layout: 'two-column',
    components: [
      createTextComponent('solution-headline', 'AI-Powered Solution', 'Solution headline'),
      createTextComponent('ai-approach', 'Our AI system combines [ML techniques] to achieve [specific capability] with [performance level] accuracy', 'AI approach description'),
      createListComponent('technical-stack', [
        'Core AI: [Deep learning/LLMs/Computer vision] trained on [data type]',
        'Data pipeline: Automated ingestion, cleaning, and feature engineering',
        'Model architecture: [Specific architecture] optimized for [use case]',
        'Deployment: Edge/cloud hybrid with real-time inference'
      ]),
      createMetricComponent('accuracy-improvement', 'Accuracy', '95%', 'vs 60% current solutions'),
      createMetricComponent('speed-improvement', 'Speed', '100x faster', 'Than manual processes'),
      {
        id: 'technical-breakthrough',
        type: 'callout',
        content: 'Technical breakthrough: Novel [approach/algorithm] achieves state-of-the-art performance',
        isInlineEditable: true,
        aiInstructions: 'Explain the key technical innovation or breakthrough that enables superior performance.'
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
    aiModifiable: ['technical-depth', 'ai-architecture', 'performance-metrics'],
    bestPractices: [
      'Specific AI/ML techniques mentioned',
      'Clear performance improvements',
      'Technical differentiation explained',
      'Real-world deployment considerations'
    ]
  },

  // Slide 4: AI Model & Performance
  {
    id: 'ai-performance',
    type: 'product',
    title: 'AI Model & Performance',
    layout: 'image-text',
    components: [
      createTextComponent('performance-headline', 'AI Performance Metrics', 'Performance headline'),
      {
        id: 'model-architecture',
        type: 'image',
        content: { 
          src: '/api/placeholder/800/500',
          alt: 'AI model architecture and performance dashboard',
          caption: 'Model architecture and real-time performance monitoring'
        },
        isInlineEditable: false,
        aiInstructions: 'Show the AI model architecture, training pipeline, or performance dashboard.'
      },
      createListComponent('performance-metrics', [
        'Model accuracy: 95% on standard benchmarks, 98% on domain-specific tasks',
        'Inference speed: <100ms latency for real-time applications',
        'Training efficiency: 10x faster training with custom optimization',
        'Continuous learning: Model improves automatically with new data'
      ]),
      createTextComponent('data-advantage', 'Proprietary dataset: [X million] labeled examples create sustainable competitive advantage', 'Data moat'),
      {
        id: 'technical-moats',
        type: 'callout',
        content: 'Technical moats: Proprietary data, custom algorithms, specialized infrastructure',
        isInlineEditable: true,
        aiInstructions: 'Explain the technical advantages that are difficult for competitors to replicate.'
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
    aiModifiable: ['performance-benchmarks', 'technical-moats', 'data-strategy'],
    bestPractices: [
      'Include specific performance benchmarks',
      'Show real model performance data',
      'Explain technical competitive advantages',
      'Highlight proprietary data or algorithms'
    ]
  },

  // Slide 5: Market & AI Adoption
  {
    id: 'ai-market',
    type: 'market',
    title: 'Market & AI Adoption',
    layout: 'metrics',
    components: [
      createTextComponent('market-headline', 'AI Market Opportunity', 'Market headline'),
      createMetricComponent('ai-market-size', 'AI Market', '$150B', 'By 2030 for vertical AI solutions'),
      createMetricComponent('domain-market', 'Domain Market', '$25B', 'Addressable market in target domain'),
      createMetricComponent('adoption-rate', 'AI Adoption', '35% CAGR', 'Enterprise AI adoption growth'),
      createTextComponent('adoption-drivers', 'AI adoption accelerated by digital transformation, labor shortages, and competitive pressure', 'Market timing'),
      createListComponent('market-trends', [
        'Enterprise AI spending: $85B annually and growing 40% YoY',
        'Automation mandate: 70% of companies prioritizing AI/automation',
        'Talent shortage: 2M unfilled positions driving automation need',
        'Regulatory support: Government incentives for AI adoption'
      ]),
      {
        id: 'ai-timing',
        type: 'callout',
        content: 'Perfect timing: AI maturity meets market readiness for enterprise adoption',
        isInlineEditable: true,
        aiInstructions: 'Explain why now is the perfect time for AI adoption in this domain.'
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
    aiModifiable: ['market-sizing', 'adoption-trends', 'timing-factors'],
    bestPractices: [
      'Show AI-specific market data',
      'Include domain-specific opportunity',
      'Highlight adoption acceleration trends',
      'Connect to broader digital transformation'
    ]
  },

  // Slide 6: Product & Integration
  {
    id: 'ai-product',
    type: 'product',
    title: 'Product & Integration',
    layout: 'two-column',
    components: [
      createTextComponent('product-headline', 'AI Platform & APIs', 'Product headline'),
      createTextComponent('product-overview', 'Enterprise-ready AI platform with APIs, SDKs, and no-code interfaces for easy integration', 'Product overview'),
      createListComponent('product-features', [
        'API-first: RESTful APIs and GraphQL for seamless integration',
        'No-code interface: Business users can configure without engineering',
        'Enterprise features: SSO, audit logs, role-based access control',
        'Deployment options: Cloud, on-premise, or hybrid configurations'
      ]),
      createMetricComponent('integration-time', 'Integration Time', '2 weeks', 'Average enterprise deployment'),
      createMetricComponent('api-performance', 'API Latency', '<50ms', '99th percentile response time'),
      createListComponent('ai-capabilities', [
        'Real-time inference: Process requests in real-time with high throughput',
        'Batch processing: Handle large-scale data processing jobs',
        'Model versioning: A/B test models and rollback capabilities',
        'Monitoring: Real-time performance and accuracy monitoring'
      ]),
      {
        id: 'enterprise-readiness',
        type: 'callout',
        content: 'Enterprise-ready: SOC2 compliance, 99.9% uptime SLA, 24/7 support',
        isInlineEditable: true,
        aiInstructions: 'Enterprise readiness features and compliance requirements.'
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
    aiModifiable: ['product-positioning', 'enterprise-features', 'integration-strategy'],
    bestPractices: [
      'Show API-first architecture',
      'Emphasize enterprise integration capabilities',
      'Include compliance and security features',
      'Highlight deployment flexibility'
    ]
  },

  // Slide 7: Traction & AI Performance
  {
    id: 'ai-traction',
    type: 'traction',
    title: 'Traction & AI Performance',
    layout: 'metrics',
    components: [
      createTextComponent('traction-headline', 'Strong AI Performance & Adoption', 'Traction headline'),
      createMetricComponent('enterprise-customers', 'Enterprise Customers', '12', 'Fortune 1000 customers'),
      createMetricComponent('api-calls', 'Monthly API Calls', '50M+', 'Production API usage'),
      createMetricComponent('model-accuracy', 'Production Accuracy', '97%', 'Live model performance'),
      createMetricComponent('cost-savings', 'Customer Savings', '$2.5M', 'Average annual savings per customer'),
      createListComponent('customer-results', [
        'Customer A: 85% reduction in manual processing time',
        'Customer B: 40% improvement in accuracy over previous solution',
        'Customer C: $5M annual cost savings from automation',
        'Customer D: 10x faster processing with same quality'
      ]),
      {
        id: 'ai-validation',
        type: 'callout',
        content: 'AI validation: Models performing at 97% accuracy in production, exceeding customer expectations',
        isInlineEditable: true,
        aiInstructions: 'Evidence that the AI is working well in real customer environments.'
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
    aiModifiable: ['performance-validation', 'customer-outcomes', 'ai-metrics'],
    bestPractices: [
      'Show AI performance in production',
      'Include customer success metrics',
      'Demonstrate real business impact',
      'Highlight enterprise customer validation'
    ]
  },

  // Slide 8: AI Team & Expertise
  {
    id: 'ai-team',
    type: 'team',
    title: 'AI Team & Expertise',
    layout: 'list',
    components: [
      createTextComponent('team-headline', 'World-Class AI Team', 'Team headline'),
      createListComponent('founding-team', [
        'CEO: Former [Big Tech] AI Research Director, PhD in ML, 50+ publications',
        'CTO: Ex-[AI Company] Principal Engineer, built production ML systems at scale',
        'Head of AI: Former [Research Lab] scientist, expert in [specific AI domain]'
      ]),
      createListComponent('team-credentials', [
        'Technical expertise: 15+ AI/ML PhDs, 100+ years combined experience',
        'Research impact: 200+ publications, 10,000+ citations in top-tier venues',
        'Industry experience: Built AI systems serving billions of users',
        'Domain knowledge: Deep expertise in [specific vertical/application]'
      ]),
      createListComponent('advisors-investors', [
        'Technical advisors: AI pioneers from [Stanford/MIT/OpenAI/etc.]',
        'Industry advisors: Former executives from target customer segments',
        'Investors: Leading AI-focused VCs and strategic corporate investors',
        'Academic partnerships: Collaborations with top research universities'
      ]),
      {
        id: 'hiring-strategy',
        type: 'callout',
        content: 'Hiring strategy: Attracting top 1% AI talent through research culture and equity upside',
        isInlineEditable: true,
        aiInstructions: 'Strategy for building and scaling the AI team with top talent.'
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
    aiModifiable: ['team-positioning', 'research-credentials', 'talent-strategy'],
    bestPractices: [
      'Highlight AI/ML expertise specifically',
      'Include research credentials and publications',
      'Show industry experience at scale',
      'Demonstrate ability to attract top talent'
    ]
  },

  // Slide 9: AI Roadmap & R&D
  {
    id: 'ai-roadmap',
    type: 'product',
    title: 'AI Roadmap & R&D',
    layout: 'two-column',
    components: [
      createTextComponent('roadmap-headline', 'AI Development Roadmap', 'Roadmap headline'),
      createTextComponent('research-strategy', 'Continuous R&D investment to maintain technical leadership and expand AI capabilities', 'R&D strategy'),
      createListComponent('technical-roadmap', [
        'Q1-Q2: Multimodal AI capabilities (text, image, audio processing)',
        'Q3: Real-time learning and adaptation in production',
        'Q4: Edge AI deployment for low-latency applications',
        'Year 2: Generative AI features and automated content creation'
      ]),
      createListComponent('research-priorities', [
        'Model efficiency: Reducing inference costs by 10x through optimization',
        'Accuracy improvements: Pushing accuracy from 97% to 99.5%',
        'New modalities: Expanding beyond current data types',
        'Automated ML: Self-improving models that require less human oversight'
      ]),
      createMetricComponent('rd-investment', 'R&D Investment', '40%', 'Of total funding allocated to research'),
      {
        id: 'technical-vision',
        type: 'callout',
        content: 'Technical vision: Building AGI-level capabilities for specific domain applications',
        isInlineEditable: true,
        aiInstructions: 'Long-term technical vision and breakthrough potential.'
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
    aiModifiable: ['technical-roadmap', 'research-priorities', 'innovation-timeline'],
    bestPractices: [
      'Show specific technical milestones',
      'Include breakthrough research potential',
      'Demonstrate continued innovation capability',
      'Connect R&D to business value'
    ]
  },

  // Slide 10: AI Scaling & Investment
  {
    id: 'ai-scaling',
    type: 'ask',
    title: 'Series A: AI Scaling',
    layout: 'hero',
    components: [
      createTextComponent('funding-headline', 'Series A: $20M', 'Funding ask headline', {
        bold: true,
        alignment: 'center'
      }),
      createTextComponent('funding-purpose', 'To scale AI infrastructure, expand research team, and accelerate enterprise adoption', 'Purpose of funding', {
        alignment: 'center'
      }),
      createListComponent('use-of-funds', [
        '50% - R&D and AI team expansion: 25 additional AI engineers and researchers',
        '25% - Infrastructure: GPU clusters, data storage, and enterprise deployment',
        '15% - Sales and marketing: Enterprise customer acquisition',
        '10% - Operations: Compliance, security, and customer success'
      ]),
      createListComponent('scaling-milestones', [
        'Year 1: 100+ enterprise customers, $10M ARR, breakthrough model v2.0',
        'Year 2: International expansion, $30M ARR, industry-leading accuracy',
        'Year 3: Platform ecosystem, $75M ARR, Series B positioning',
        'Long-term: Category-defining AI platform with $100M+ ARR'
      ]),
      createMetricComponent('runway', 'Runway', '30 months', 'To profitability and scale'),
      {
        id: 'ai-leadership-vision',
        type: 'callout',
        content: 'Vision: Become the leading AI platform for [domain], processing [scale] and serving [customer base]',
        isInlineEditable: true,
        aiInstructions: 'Long-term vision for AI market leadership and impact.'
      }
    ],
    designElements: {
      backgroundStyle: 'gradient',
      backgroundImage: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      layout: {
        padding: '4rem',
        maxWidth: '900px',
        alignment: 'center'
      }
    },
    aiModifiable: ['funding-allocation', 'scaling-strategy', 'ai-leadership'],
    bestPractices: [
      'Heavy focus on R&D and talent',
      'Include infrastructure scaling costs',
      'Show path to AI market leadership',
      'Demonstrate technical milestone achievements'
    ]
  }
]

export const AI_ML_STARTUP_TEMPLATE = createTemplate(
  'ai-ml-startup',
  'AI/ML Startup',
  'Specialized for artificial intelligence and machine learning companies with focus on technical depth, model performance, and AI market dynamics',
  {
    targetAudience: ['investors', 'vcs', 'ai-focused', 'technical'],
    industry: ['artificial-intelligence', 'machine-learning', 'technology', 'automation'],
    fundingStage: ['seed', 'series-a'],
    slides: aiMlSlides,
    designSystem: DESIGN_SYSTEMS.modern,
    sampleContent: {
      companyName: 'AITech',
      industry: 'AI/ML',
      problem: 'Manual processes in [domain] are 60% accurate and can\'t scale, costing enterprises $100B annually',
      solution: 'AI platform achieving 97% accuracy with 100x speed improvement through breakthrough ML architecture',
      market: '$150B AI market growing 35% annually driven by enterprise digital transformation and automation needs',
      traction: '12 Fortune 1000 customers, 50M+ monthly API calls, 97% production accuracy, $2.5M average customer savings',
      team: 'World-class AI team: 15+ PhDs, 200+ publications, former Google/OpenAI/Stanford researchers',
      ask: 'Raising $20M Series A to scale AI infrastructure and expand research team for market leadership'
    },
    claudeCodeIntegration: {
      modifiableComponents: ['layout', 'styling', 'content-structure', 'ai-metrics', 'technical-depth'],
      customizationPoints: [
        {
          id: 'ai-application',
          name: 'AI Application Domain',
          description: 'Customize for different AI application areas',
          type: 'content',
          options: ['Computer Vision', 'NLP/LLMs', 'Predictive Analytics', 'Robotics', 'Autonomous Systems'],
          aiPrompt: 'Adapt this template for {domain} AI applications, adjusting technical details and use cases'
        },
        {
          id: 'deployment-model',
          name: 'AI Deployment Model',
          description: 'Focus on different AI deployment strategies',
          type: 'content',
          options: ['API/SaaS', 'On-premise', 'Edge AI', 'Embedded Systems'],
          aiPrompt: 'Optimize this template for {deployment} AI deployment, adjusting architecture and business model'
        }
      ],
      aiCapabilities: [
        {
          id: 'technical-validation',
          name: 'Technical Validation',
          description: 'Validate AI technical claims and benchmarks',
          examples: ['Verify model performance claims', 'Compare to state-of-the-art', 'Validate technical approach'],
          complexity: 'advanced'
        },
        {
          id: 'ai-market-analysis',
          name: 'AI Market Analysis',
          description: 'Analyze AI market trends and competitive landscape',
          examples: ['AI adoption trends', 'Competitive model comparison', 'Technology roadmap analysis'],
          complexity: 'moderate'
        }
      ]
    },
    metadata: {
      successRate: 75,
      averageFundingRaised: '$22M',
      basedOn: 'Successful AI companies (OpenAI, Anthropic, Scale AI early presentations)',
      lastUpdated: new Date().toISOString(),
      difficulty: 'advanced'
    }
  }
)
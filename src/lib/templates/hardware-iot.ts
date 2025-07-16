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
    aiInstructions: `This is a metric component. Users can modify it through AI commands like 'change the battery life to 10 days' or 'add a manufacturing cost metric'.`,
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
    aiInstructions: `This is a list component. Users can modify it through AI commands like 'add more hardware specifications' or 'emphasize IoT connectivity features'.`,
    placeholder: 'Add list item'
  }
}

const hardwareIoTSlides: PrebuiltSlide[] = [
  // Slide 1: Hardware Vision & Innovation
  {
    id: 'hardware-vision',
    type: 'title',
    title: 'Hardware Vision & Innovation',
    layout: 'hero',
    components: [
      createTextComponent('product-name', 'HardwareTech', 'Product Name', { 
        bold: true, 
        alignment: 'center' 
      }),
      createTextComponent('innovation-statement', 'Next-generation [device category] that [revolutionary capability] for [target market]', 'Innovation statement', {
        alignment: 'center'
      }),
      createTextComponent('technology-foundation', 'Powered by [breakthrough technology] • [performance metric] • [unique advantage]', 'Technology foundation', {
        alignment: 'center'
      }),
      createTextComponent('development-stage', 'Prototype proven • Manufacturing ready • Launch Q[X] 20XX', 'Development stage', {
        alignment: 'center'
      })
    ],
    designElements: {
      backgroundStyle: 'gradient',
      backgroundImage: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      layout: {
        padding: '4rem',
        maxWidth: '900px',
        alignment: 'center'
      }
    },
    aiModifiable: ['innovation-positioning', 'technology-emphasis', 'market-focus'],
    bestPractices: [
      'Clear hardware innovation promise',
      'Specific performance advantages',
      'Manufacturing readiness signals',
      'Ambitious but achievable timeline'
    ]
  },

  // Slide 2: Market Problem & Hardware Limitations
  {
    id: 'hardware-problem',
    type: 'problem',
    title: 'Market Problem & Hardware Limitations',
    layout: 'two-column',
    components: [
      createTextComponent('problem-headline', 'Hardware Constraints & Market Gap', 'Problem headline'),
      createTextComponent('current-limitations', 'Existing hardware solutions are limited by [technical constraints] preventing [desired outcomes]', 'Current limitations'),
      createListComponent('hardware-problems', [
        'Performance limitations: Current devices can\'t achieve [specific capability]',
        'Power consumption: Battery life insufficient for real-world usage',
        'Cost barriers: Existing solutions too expensive for mass adoption',
        'Integration challenges: Incompatible with modern ecosystems'
      ]),
      createMetricComponent('market-size', 'Hardware Market', '$85B', 'Global addressable market'),
      createMetricComponent('replacement-cycle', 'Replacement Need', '150M units', 'Annual device replacement market'),
      {
        id: 'technology-readiness',
        type: 'callout',
        content: 'Technology timing: Recent semiconductor advances make breakthrough solutions feasible',
        isInlineEditable: true,
        aiInstructions: 'Explain why breakthrough hardware solutions are now possible due to technology advances.'
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
    aiModifiable: ['technical-constraints', 'market-timing', 'hardware-gaps'],
    bestPractices: [
      'Focus on technical performance gaps',
      'Show market size and replacement cycles',
      'Explain technology readiness timing',
      'Connect hardware limits to user needs'
    ]
  },

  // Slide 3: Hardware Solution & Innovation
  {
    id: 'hardware-solution',
    type: 'solution',
    title: 'Hardware Solution & Innovation',
    layout: 'two-column',
    components: [
      createTextComponent('solution-headline', 'Breakthrough Hardware Platform', 'Solution headline'),
      createTextComponent('innovation-breakthrough', 'Our device achieves [performance improvement] through [proprietary technology] innovation', 'Innovation breakthrough'),
      createListComponent('technical-innovations', [
        'Proprietary chip design: Custom silicon optimized for [specific function]',
        'Advanced materials: [Specific materials] enabling [performance benefits]',
        'Novel architecture: [Technical approach] achieving [improvement metrics]',
        'IoT integration: Seamless connectivity with [platforms/ecosystems]'
      ]),
      createMetricComponent('performance-improvement', 'Performance', '10x better', 'Than existing solutions'),
      createMetricComponent('power-efficiency', 'Power Efficiency', '5x longer', 'Battery life improvement'),
      {
        id: 'technical-differentiation',
        type: 'callout',
        content: 'Technical differentiation: [Specific innovation] creates 3-5 year technology lead',
        isInlineEditable: true,
        aiInstructions: 'Explain the core technical innovation that creates competitive advantage.'
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
    aiModifiable: ['technical-innovation', 'performance-metrics', 'competitive-advantage'],
    bestPractices: [
      'Specific technical innovations explained',
      'Quantified performance improvements',
      'Proprietary technology emphasis',
      'Clear competitive moat creation'
    ]
  },

  // Slide 4: Product Demo & Specifications
  {
    id: 'product-demo',
    type: 'product',
    title: 'Product Demo & Specifications',
    layout: 'image-text',
    components: [
      createTextComponent('demo-headline', 'Product Demonstration', 'Demo headline'),
      {
        id: 'product-images',
        type: 'image',
        content: { 
          src: '/api/placeholder/800/600',
          alt: 'Hardware product demonstration and technical specifications',
          caption: 'Working prototype demonstrating key capabilities and form factor'
        },
        isInlineEditable: false,
        aiInstructions: 'Show the actual hardware prototype, technical specifications, and key features.'
      },
      createListComponent('technical-specs', [
        'Dimensions: [Size] • Weight: [Weight] • Materials: [Premium materials]',
        'Performance: [Key metrics] • Connectivity: [Wireless standards]',
        'Power: [Battery specs] • Sensors: [Sensor array] • Processing: [Chip specs]',
        'Software: [OS/Platform] • APIs: [Developer tools] • Updates: [OTA capability]'
      ]),
      createTextComponent('manufacturing-readiness', 'Manufacturing partner secured, tooling complete, ready for production scale', 'Manufacturing status'),
      {
        id: 'prototype-validation',
        type: 'callout',
        content: 'Prototype validation: [X] units tested, [success metrics], regulatory approvals in progress',
        isInlineEditable: true,
        aiInstructions: 'Evidence that the hardware prototype works and has been validated.'
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
    aiModifiable: ['specification-emphasis', 'manufacturing-readiness', 'validation-results'],
    bestPractices: [
      'Show real working prototype',
      'Include detailed technical specifications',
      'Demonstrate manufacturing readiness',
      'Provide validation and testing results'
    ]
  },

  // Slide 5: Manufacturing & Supply Chain
  {
    id: 'manufacturing',
    type: 'business-model',
    title: 'Manufacturing & Supply Chain',
    layout: 'two-column',
    components: [
      createTextComponent('manufacturing-headline', 'Scalable Manufacturing Strategy', 'Manufacturing headline'),
      createTextComponent('manufacturing-approach', 'Proven manufacturing partner with capacity for [volume] units annually', 'Manufacturing strategy'),
      createListComponent('supply-chain', [
        'Manufacturing partner: [Tier-1 partner] with [relevant experience]',
        'Component sourcing: Diversified supplier base, 6-month inventory buffer',
        'Quality control: [Standards] certification, automated testing pipeline',
        'Logistics: Global distribution network, direct-to-consumer fulfillment'
      ]),
      createMetricComponent('manufacturing-cost', 'Unit Cost', '$75', 'At 100K units/year scale'),
      createMetricComponent('gross-margin', 'Gross Margin', '65%', 'Target retail pricing margin'),
      createMetricComponent('production-capacity', 'Max Capacity', '1M units/year', 'Manufacturing partner capability'),
      {
        id: 'scaling-strategy',
        type: 'callout',
        content: 'Scaling strategy: Start 10K units/quarter, scale to 100K+ units/quarter by year 2',
        isInlineEditable: true,
        aiInstructions: 'Manufacturing scaling plan and volume ramp strategy.'
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
    aiModifiable: ['manufacturing-strategy', 'cost-structure', 'scaling-plan'],
    bestPractices: [
      'Proven manufacturing partnerships',
      'Clear cost structure and margins',
      'Scalable production capacity',
      'Risk mitigation strategies'
    ]
  },

  // Slide 6: Go-to-Market & Distribution
  {
    id: 'hardware-gtm',
    type: 'market',
    title: 'Go-to-Market & Distribution',
    layout: 'two-column',
    components: [
      createTextComponent('gtm-headline', 'Multi-Channel Distribution Strategy', 'GTM headline'),
      createTextComponent('market-approach', 'Hardware-focused go-to-market with direct-to-consumer and retail partnerships', 'Market approach'),
      createListComponent('distribution-channels', [
        'Direct-to-consumer: E-commerce platform with premium branding',
        'Retail partnerships: [Target retailers] for mass market distribution',
        'B2B sales: Enterprise customers for specialized applications',
        'Channel partners: System integrators and value-added resellers'
      ]),
      createListComponent('marketing-strategy', [
        'Product launch: Crowdfunding campaign to build community and pre-orders',
        'Content marketing: Technical demos, influencer partnerships',
        'Trade shows: Industry events and technology conferences',
        'PR strategy: Technology media and industry publications'
      ]),
      createMetricComponent('launch-target', 'Launch Goal', '5K units', 'First 6 months sales target'),
      createMetricComponent('retail-margin', 'Retail Margin', '40%', 'Channel partner margins'),
      {
        id: 'ecosystem-strategy',
        type: 'callout',
        content: 'Ecosystem strategy: Platform approach with developer APIs and third-party integrations',
        isInlineEditable: true,
        aiInstructions: 'How the hardware becomes part of a larger ecosystem or platform.'
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
    aiModifiable: ['distribution-strategy', 'channel-mix', 'ecosystem-approach'],
    bestPractices: [
      'Multiple distribution channels',
      'Hardware-specific marketing tactics',
      'Retail partnership strategy',
      'Platform and ecosystem thinking'
    ]
  },

  // Slide 7: Hardware Traction & Validation
  {
    id: 'hardware-traction',
    type: 'traction',
    title: 'Hardware Traction & Validation',
    layout: 'metrics',
    components: [
      createTextComponent('traction-headline', 'Strong Hardware Validation', 'Traction headline'),
      createMetricComponent('prototypes-built', 'Prototypes Built', '500+', 'Working prototype units'),
      createMetricComponent('beta-customers', 'Beta Customers', '25', 'Design partners and early adopters'),
      createMetricComponent('pre-orders', 'Pre-Orders', '$2M', 'Committed customer demand'),
      createMetricComponent('manufacturing-locked', 'Production Ready', '100%', 'Manufacturing and tooling complete'),
      createListComponent('validation-highlights', [
        'Product validation: 500+ hours of field testing, 95% user satisfaction',
        'Technical validation: All performance targets achieved or exceeded',
        'Manufacturing validation: Production tooling complete, quality certified',
        'Market validation: $2M in pre-orders from 1,200+ customers'
      ]),
      {
        id: 'regulatory-status',
        type: 'callout',
        content: 'Regulatory status: FCC/CE approvals obtained, additional certifications in progress',
        isInlineEditable: true,
        aiInstructions: 'Regulatory approvals and compliance status for market launch.'
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
    aiModifiable: ['validation-metrics', 'customer-feedback', 'regulatory-progress'],
    bestPractices: [
      'Show working prototypes and testing',
      'Include customer validation and demand',
      'Demonstrate manufacturing readiness',
      'Highlight regulatory compliance progress'
    ]
  },

  // Slide 8: Competition & Technology Moats
  {
    id: 'hardware-competition',
    type: 'competition',
    title: 'Competition & Technology Moats',
    layout: 'two-column',
    components: [
      createTextComponent('competition-headline', 'Competitive Landscape & Moats', 'Competition headline'),
      createTextComponent('competitive-position', 'We compete with legacy hardware manufacturers and emerging tech companies', 'Competitive positioning'),
      createListComponent('competitive-analysis', [
        'Legacy players: Established but limited by old architecture and high costs',
        'Tech companies: Strong software but weak hardware execution',
        'Startups: Similar vision but lacking technical breakthroughs',
        'Adjacent markets: Companies that could expand into our space'
      ]),
      createListComponent('technology-moats', [
        'Proprietary technology: [X] patents filed, trade secrets in manufacturing',
        'Performance advantage: 3-5 year technology lead difficult to replicate',
        'Manufacturing scale: Exclusive partnerships and optimized processes',
        'Data network effects: Device data improves platform value'
      ]),
      {
        id: 'ip-strategy',
        type: 'callout',
        content: 'IP strategy: 15+ patents filed, trademark protection, manufacturing know-how as trade secrets',
        isInlineEditable: true,
        aiInstructions: 'Intellectual property strategy and protection mechanisms.'
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
    aiModifiable: ['competitive-differentiation', 'ip-protection', 'moat-sustainability'],
    bestPractices: [
      'Acknowledge all competitive threats',
      'Highlight proprietary technology advantages',
      'Show patent and IP protection',
      'Explain sustainable competitive moats'
    ]
  },

  // Slide 9: Financial Model & Hardware Economics
  {
    id: 'hardware-financials',
    type: 'financials',
    title: 'Financial Model & Hardware Economics',
    layout: 'metrics',
    components: [
      createTextComponent('financials-headline', 'Hardware Business Model', 'Financials headline'),
      createMetricComponent('unit-price', 'Retail Price', '$299', 'Target consumer pricing'),
      createMetricComponent('unit-cost', 'Manufacturing Cost', '$105', 'Fully loaded unit cost'),
      createMetricComponent('gross-margin-target', 'Gross Margin', '65%', 'Target gross profit margin'),
      createMetricComponent('break-even-volume', 'Break-even', '50K units', 'Annual volume for profitability'),
      createListComponent('revenue-projections', [
        'Year 1: 25K units, $7.5M revenue, break-even by Q4',
        'Year 2: 100K units, $30M revenue, 20% EBITDA margins',
        'Year 3: 250K units, $75M revenue, international expansion',
        'Year 5: 1M+ units, $300M+ revenue, market leadership'
      ]),
      {
        id: 'hardware-economics',
        type: 'callout',
        content: 'Hardware economics: High initial investment, but strong margins and scalability at volume',
        isInlineEditable: true,
        aiInstructions: 'Explanation of hardware business model economics and scaling dynamics.'
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
    aiModifiable: ['pricing-strategy', 'volume-projections', 'margin-improvement'],
    bestPractices: [
      'Clear unit economics and pricing',
      'Realistic volume projections',
      'Path to profitability shown',
      'Hardware-specific financial metrics'
    ]
  },

  // Slide 10: Hardware Funding & Production Scale
  {
    id: 'hardware-funding',
    type: 'ask',
    title: 'Series A: Production Scale',
    layout: 'hero',
    components: [
      createTextComponent('funding-headline', 'Series A: $12M', 'Funding ask headline', {
        bold: true,
        alignment: 'center'
      }),
      createTextComponent('funding-purpose', 'To fund initial production, inventory, and market launch for 100K units in year 1', 'Purpose of funding', {
        alignment: 'center'
      }),
      createListComponent('use-of-funds', [
        '60% - Manufacturing and inventory: Initial production run and component buffer',
        '20% - Product development: Next-generation features and platform expansion',
        '15% - Marketing and sales: Go-to-market execution and channel development',
        '5% - Working capital: Operations, regulatory, and team expansion'
      ]),
      createListComponent('hardware-milestones', [
        'Q1: Complete Series A, finalize manufacturing agreements',
        'Q2: Begin production, launch direct-to-consumer sales',
        'Q3: Retail partnerships, reach 25K units sold',
        'Q4: Break-even, prepare Series B for international expansion'
      ]),
      createMetricComponent('runway', 'Runway', '24 months', 'To profitability and growth'),
      {
        id: 'hardware-vision-scale',
        type: 'callout',
        content: 'Vision: Become the market-leading hardware platform with 1M+ devices deployed globally',
        isInlineEditable: true,
        aiInstructions: 'Long-term vision for hardware market leadership and ecosystem scale.'
      }
    ],
    designElements: {
      backgroundStyle: 'gradient',
      backgroundImage: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      layout: {
        padding: '4rem',
        maxWidth: '900px',
        alignment: 'center'
      }
    },
    aiModifiable: ['funding-allocation', 'production-timeline', 'hardware-scaling'],
    bestPractices: [
      'Heavy focus on manufacturing and inventory',
      'Hardware-specific milestone timeline',
      'Clear path to production scale',
      'Vision for market leadership'
    ]
  }
]

export const HARDWARE_IOT_TEMPLATE = createTemplate(
  'hardware-iot',
  'Hardware & IoT',
  'Optimized for physical product companies building hardware devices, IoT platforms, or embedded systems with manufacturing and distribution focus',
  {
    targetAudience: ['investors', 'vcs', 'hardware-focused'],
    industry: ['hardware', 'iot', 'consumer-electronics', 'industrial'],
    fundingStage: ['seed', 'series-a'],
    slides: hardwareIoTSlides,
    designSystem: DESIGN_SYSTEMS.professional,
    sampleContent: {
      companyName: 'HardwareIoT',
      industry: 'Hardware & IoT',
      problem: 'Existing hardware solutions limited by performance constraints, power consumption, and high costs preventing mass adoption',
      solution: 'Breakthrough hardware platform achieving 10x performance improvement through proprietary chip design and advanced materials',
      market: '$85B global hardware market with 150M annual device replacement cycle driven by IoT and smart device adoption',
      traction: '500+ prototypes built, 25 beta customers, $2M pre-orders, manufacturing ready with regulatory approvals',
      team: 'Hardware veterans from Apple, Tesla, and Qualcomm with 50+ years combined experience in product development',
      ask: 'Raising $12M Series A to fund production scale, inventory, and market launch for 100K units'
    },
    claudeCodeIntegration: {
      modifiableComponents: ['layout', 'styling', 'content-structure', 'hardware-specs', 'manufacturing-details'],
      customizationPoints: [
        {
          id: 'hardware-category',
          name: 'Hardware Category',
          description: 'Customize for different types of hardware products',
          type: 'content',
          options: ['Consumer Electronics', 'Industrial IoT', 'Medical Devices', 'Automotive', 'Smart Home'],
          aiPrompt: 'Adapt this template for {category} hardware, adjusting specifications, regulations, and market dynamics'
        },
        {
          id: 'production-stage',
          name: 'Production Readiness',
          description: 'Adjust for different stages of hardware development',
          type: 'content',
          options: ['Prototype', 'Pilot Production', 'Manufacturing Ready', 'In Production'],
          aiPrompt: 'Customize this template for {stage} readiness, adjusting milestones and funding needs'
        }
      ],
      aiCapabilities: [
        {
          id: 'manufacturing-analysis',
          name: 'Manufacturing Strategy',
          description: 'Analyze manufacturing approach and supply chain',
          examples: ['Optimize production costs', 'Evaluate manufacturing partners', 'Supply chain risk assessment'],
          complexity: 'moderate'
        },
        {
          id: 'hardware-validation',
          name: 'Technical Validation',
          description: 'Validate hardware specifications and performance claims',
          examples: ['Performance benchmark verification', 'Component cost analysis', 'Regulatory requirement check'],
          complexity: 'advanced'
        }
      ]
    },
    metadata: {
      successRate: 70,
      averageFundingRaised: '$15M',
      basedOn: 'Successful hardware companies (Nest, Ring, Peloton early presentations)',
      lastUpdated: new Date().toISOString(),
      difficulty: 'advanced'
    }
  }
)
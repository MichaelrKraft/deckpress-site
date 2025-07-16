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
    aiInstructions: `This is a metric component. Users can modify it through AI commands like 'change the impact to 1M people' or 'add an environmental metric'.`,
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
    aiInstructions: `This is a list component. Users can modify it through AI commands like 'add more social impact outcomes' or 'emphasize sustainability benefits'.`,
    placeholder: 'Add list item'
  }
}

const socialImpactSlides: PrebuiltSlide[] = [
  // Slide 1: Mission & Social Vision
  {
    id: 'social-mission',
    type: 'title',
    title: 'Mission & Social Vision',
    layout: 'hero',
    components: [
      createTextComponent('organization-name', 'Social Venture', 'Organization Name', { 
        bold: true, 
        alignment: 'center' 
      }),
      createTextComponent('mission-statement', 'Creating lasting change by [addressing social problem] for [target population] through [innovative approach]', 'Mission statement', {
        alignment: 'center'
      }),
      createTextComponent('vision-statement', 'A world where [aspirational future state] is reality for everyone', 'Vision statement', {
        alignment: 'center'
      }),
      createTextComponent('impact-preview', 'Currently serving [X] people in [Y] communities with [Z]% measurable impact', 'Impact preview', {
        alignment: 'center'
      })
    ],
    designElements: {
      backgroundStyle: 'gradient',
      backgroundImage: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      layout: {
        padding: '4rem',
        maxWidth: '900px',
        alignment: 'center'
      }
    },
    aiModifiable: ['mission-clarity', 'vision-ambition', 'impact-focus'],
    bestPractices: [
      'Clear social problem and solution',
      'Specific target population identified',
      'Measurable impact metrics included',
      'Inspirational but achievable vision'
    ]
  },

  // Slide 2: Social Problem & Systemic Issues
  {
    id: 'social-problem',
    type: 'problem',
    title: 'Social Problem & Systemic Issues',
    layout: 'two-column',
    components: [
      createTextComponent('problem-headline', 'Critical Social Challenge', 'Problem headline'),
      createTextComponent('problem-context', '[Target population] faces [specific challenge] that affects [scale] and perpetuates [systemic issues]', 'Problem context'),
      createListComponent('problem-dimensions', [
        'Scale: [X million] people affected globally, growing by [Y]% annually',
        'Severity: [Specific impacts] on health, education, economic opportunity',
        'Systemic barriers: [Root causes] that prevent existing solutions from working',
        'Urgency: [Time-sensitive factors] making immediate action critical'
      ]),
      createMetricComponent('people-affected', 'People Affected', '50M globally', 'Scale of the social problem'),
      createMetricComponent('economic-impact', 'Economic Cost', '$25B annually', 'Economic impact of the problem'),
      {
        id: 'human-impact-story',
        type: 'callout',
        content: 'Human impact: "[Specific story about how this problem affects real people\'s lives]"',
        isInlineEditable: true,
        aiInstructions: 'Personal story that illustrates the human cost of this social problem.'
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
    aiModifiable: ['problem-framing', 'human-impact', 'systemic-analysis'],
    bestPractices: [
      'Ground in human stories and experiences',
      'Show scale and growing urgency',
      'Identify systemic root causes',
      'Connect to broader social issues'
    ]
  },

  // Slide 3: Innovative Solution & Theory of Change
  {
    id: 'social-solution',
    type: 'solution',
    title: 'Innovative Solution & Theory of Change',
    layout: 'two-column',
    components: [
      createTextComponent('solution-headline', 'Innovative Social Solution', 'Solution headline'),
      createTextComponent('theory-of-change', 'We create change by [intervention] → [immediate outcome] → [intermediate outcome] → [long-term impact]', 'Theory of change'),
      createListComponent('solution-approach', [
        'Direct intervention: [Specific program/product] serving [target population]',
        'Technology leverage: [Tech platform] enabling scale and efficiency',
        'Community engagement: [Participatory approach] ensuring local ownership',
        'Systems change: [Policy/advocacy] addressing root causes'
      ]),
      createMetricComponent('impact-potential', 'Impact Potential', '1M+ lives', 'People we can reach at scale'),
      createMetricComponent('cost-effectiveness', 'Cost per Impact', '$50/person', 'Cost to create lasting change'),
      {
        id: 'innovation-factor',
        type: 'callout',
        content: 'Innovation factor: [Specific innovation] that makes our approach 10x more effective',
        isInlineEditable: true,
        aiInstructions: 'Explain the key innovation that makes this solution more effective than existing approaches.'
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
    aiModifiable: ['theory-of-change', 'innovation-emphasis', 'scaling-approach'],
    bestPractices: [
      'Clear theory of change logic',
      'Evidence-based intervention design',
      'Technology for scale and efficiency',
      'Community-centered approach'
    ]
  },

  // Slide 4: Program Model & Implementation
  {
    id: 'program-model',
    type: 'product',
    title: 'Program Model & Implementation',
    layout: 'image-text',
    components: [
      createTextComponent('model-headline', 'Program Implementation', 'Model headline'),
      {
        id: 'program-visual',
        type: 'image',
        content: { 
          src: '/api/placeholder/800/600',
          alt: 'Program implementation model and participant journey',
          caption: 'End-to-end program model showing participant journey and outcomes'
        },
        isInlineEditable: false,
        aiInstructions: 'Show the program model, participant journey, or implementation framework.'
      },
      createListComponent('implementation-components', [
        'Participant recruitment: [Community-based approach] ensuring representative reach',
        'Service delivery: [Program design] with [frequency] touchpoints over [duration]',
        'Technology platform: [Digital tools] for delivery, tracking, and communication',
        'Outcome measurement: [Evaluation framework] with [frequency] data collection'
      ]),
      createTextComponent('evidence-base', 'Built on [research foundation] with [pilot results] validation from [test sites]', 'Evidence base'),
      {
        id: 'scalability-design',
        type: 'callout',
        content: 'Designed for scale: Standardized model can be replicated across diverse communities',
        isInlineEditable: true,
        aiInstructions: 'Explain how the program model is designed for scalability and replication.'
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
    aiModifiable: ['program-design', 'evidence-base', 'scalability-factors'],
    bestPractices: [
      'Clear program logic and flow',
      'Evidence-based design decisions',
      'Technology enabling scale',
      'Rigorous outcome measurement'
    ]
  },

  // Slide 5: Impact Measurement & Evidence
  {
    id: 'impact-measurement',
    type: 'traction',
    title: 'Impact Measurement & Evidence',
    layout: 'metrics',
    components: [
      createTextComponent('impact-headline', 'Measured Social Impact', 'Impact headline'),
      createMetricComponent('participants-served', 'Participants Served', '5,000', 'People directly impacted'),
      createMetricComponent('outcome-improvement', 'Outcome Improvement', '75%', 'Participants achieving target outcome'),
      createMetricComponent('cost-per-participant', 'Cost Efficiency', '$150/person', 'Cost per participant served'),
      createMetricComponent('retention-rate', 'Program Retention', '85%', 'Participants completing program'),
      createListComponent('impact-evidence', [
        'Primary outcomes: [X]% improvement in [key indicator] compared to control group',
        'Secondary outcomes: [Y]% increase in [related benefits] sustained over [timeframe]',
        'Longitudinal tracking: [Z]% of participants maintain gains at [follow-up period]',
        'Community impact: [Broader community changes] documented in [impact area]'
      ]),
      {
        id: 'evaluation-rigor',
        type: 'callout',
        content: 'Evaluation rigor: [RCT/Quasi-experimental] design with [external evaluator] validation',
        isInlineEditable: true,
        aiInstructions: 'Description of the evaluation methodology and external validation.'
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
    aiModifiable: ['impact-metrics', 'evidence-rigor', 'outcome-validation'],
    bestPractices: [
      'Rigorous impact measurement methodology',
      'Control groups and longitudinal tracking',
      'Cost-effectiveness analysis',
      'Third-party validation when possible'
    ]
  },

  // Slide 6: Sustainability & Business Model
  {
    id: 'sustainability-model',
    type: 'business-model',
    title: 'Sustainability & Business Model',
    layout: 'two-column',
    components: [
      createTextComponent('sustainability-headline', 'Financial Sustainability Model', 'Sustainability headline'),
      createTextComponent('business-model', 'Diversified revenue model combining [earned revenue], [grants], and [partnerships] for long-term sustainability', 'Business model overview'),
      createListComponent('revenue-streams', [
        'Earned revenue: [Product/service sales] generating [X]% of budget',
        'Grant funding: [Foundation/government] grants for [Y]% of operations',
        'Fee-for-service: [Contract services] to [institutional clients]',
        'Social enterprise: [Business arm] creating sustainable income stream'
      ]),
      createMetricComponent('earned-revenue', 'Earned Revenue', '40%', 'Percentage of budget from earned income'),
      createMetricComponent('cost-per-outcome', 'Cost per Outcome', '$75', 'Cost to achieve one positive outcome'),
      createMetricComponent('break-even-timeline', 'Break-even', 'Year 4', 'When earned revenue covers core costs'),
      {
        id: 'sustainability-strategy',
        type: 'callout',
        content: 'Sustainability strategy: Build to 60% earned revenue by year 5 while maintaining mission focus',
        isInlineEditable: true,
        aiInstructions: 'Long-term financial sustainability plan and revenue diversification strategy.'
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
    aiModifiable: ['revenue-diversification', 'sustainability-timeline', 'mission-balance'],
    bestPractices: [
      'Diversified funding sources',
      'Path to financial sustainability',
      'Earned revenue component',
      'Mission-business model alignment'
    ]
  },

  // Slide 7: Scale Strategy & Systems Change
  {
    id: 'scale-strategy',
    type: 'market',
    title: 'Scale Strategy & Systems Change',
    layout: 'two-column',
    components: [
      createTextComponent('scale-headline', 'Scaling for Systems Change', 'Scale headline'),
      createTextComponent('scaling-approach', 'Multi-pronged scaling strategy combining direct service expansion, replication, and policy influence', 'Scaling strategy'),
      createListComponent('scaling-pathways', [
        'Direct scaling: Expand to [X] additional communities over [Y] years',
        'Replication: License model to [partner organizations] in [Z] regions',
        'Policy influence: Advocate for [systemic changes] at [policy levels]',
        'Knowledge sharing: Open-source tools and best practices for field adoption'
      ]),
      createListComponent('systems-change', [
        'Individual level: [Personal outcomes] for participants and families',
        'Community level: [Community changes] and local capacity building',
        'Institutional level: [Organizational changes] in partner institutions',
        'Policy level: [Policy changes] creating structural improvements'
      ]),
      createMetricComponent('scale-target', 'Scale Target', '100K people', 'People reached by year 5'),
      createMetricComponent('replication-sites', 'Replication Sites', '25 locations', 'Partner organizations by year 3'),
      {
        id: 'systems-impact',
        type: 'callout',
        content: 'Systems impact: Creating lasting change that continues beyond our direct involvement',
        isInlineEditable: true,
        aiInstructions: 'Explanation of how the work creates lasting systems-level change.'
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
    aiModifiable: ['scaling-pathways', 'systems-thinking', 'replication-strategy'],
    bestPractices: [
      'Multiple pathways to scale',
      'Systems change at multiple levels',
      'Replication and knowledge sharing',
      'Policy and advocacy strategy'
    ]
  },

  // Slide 8: Team & Community Partnerships
  {
    id: 'team-partnerships',
    type: 'team',
    title: 'Team & Community Partnerships',
    layout: 'list',
    components: [
      createTextComponent('team-headline', 'Mission-Driven Team & Partners', 'Team headline'),
      createListComponent('leadership-team', [
        'Executive Director: [Background] with [X] years in [relevant field]',
        'Program Director: [Community connection] and [expertise] in [program area]',
        'Impact Director: [Research background] in [evaluation methodology]'
      ]),
      createListComponent('community-partnerships', [
        'Community partners: [Local organizations] providing grassroots connection',
        'Academic partners: [Universities] for research and evaluation support',
        'Corporate partners: [Companies] providing [resources/expertise/funding]',
        'Government partnerships: [Agencies] for policy alignment and systems change'
      ]),
      createListComponent('advisory-structure', [
        'Community Advisory Board: [Local leaders] ensuring community voice',
        'Expert Advisory Board: [Subject matter experts] guiding program development',
        'Participant Alumni: [Former participants] providing ongoing input and leadership',
        'Board of Directors: [Governance expertise] with [relevant backgrounds]'
      ]),
      {
        id: 'community-leadership',
        type: 'callout',
        content: 'Community leadership: [X]% of leadership positions held by people from communities we serve',
        isInlineEditable: true,
        aiInstructions: 'Emphasis on community leadership and representation in governance.'
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
    aiModifiable: ['community-connection', 'partnership-strategy', 'leadership-diversity'],
    bestPractices: [
      'Community-rooted leadership',
      'Diverse partnership ecosystem',
      'Participant voice in governance',
      'Academic and research partnerships'
    ]
  },

  // Slide 9: Long-term Vision & Legacy
  {
    id: 'long-term-vision',
    type: 'market',
    title: 'Long-term Vision & Legacy',
    layout: 'metrics',
    components: [
      createTextComponent('vision-headline', '10-Year Impact Vision', 'Vision headline'),
      createMetricComponent('people-impacted', 'Lives Transformed', '1M+', 'People directly impacted over 10 years'),
      createMetricComponent('communities-served', 'Communities Reached', '500+', 'Communities with active programs'),
      createMetricComponent('systems-changed', 'Systems Changed', '10 states', 'Policy and institutional changes'),
      createMetricComponent('field-influence', 'Field Impact', '1,000+', 'Organizations adopting our model'),
      createListComponent('legacy-outcomes', [
        'Field transformation: Our model becomes standard practice in [sector]',
        'Policy change: [Specific policy changes] adopted at [scale]',
        'Community ownership: [X]% of sites fully community-led and sustainable',
        'Knowledge contribution: [Research contributions] advancing [field]'
      ]),
      {
        id: 'sustainable-impact',
        type: 'callout',
        content: 'Sustainable impact: Creating change that outlasts our organization and continues to grow',
        isInlineEditable: true,
        aiInstructions: 'Vision for creating lasting, self-sustaining change that continues beyond the organization.'
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
    aiModifiable: ['vision-scope', 'legacy-planning', 'field-transformation'],
    bestPractices: [
      'Ambitious but achievable 10-year vision',
      'Focus on lasting systems change',
      'Field-wide transformation goals',
      'Self-sustaining impact model'
    ]
  },

  // Slide 10: Funding & Investment in Change
  {
    id: 'social-funding',
    type: 'ask',
    title: 'Investment in Social Change',
    layout: 'hero',
    components: [
      createTextComponent('funding-headline', 'Series A: $5M', 'Funding ask headline', {
        bold: true,
        alignment: 'center'
      }),
      createTextComponent('funding-purpose', 'To scale impact to 50,000 people and establish sustainable operations across 10 communities', 'Purpose of funding', {
        alignment: 'center'
      }),
      createListComponent('use-of-funds', [
        '50% - Program scaling: Direct service expansion and community partnerships',
        '25% - Technology and infrastructure: Platform development and data systems',
        '15% - Research and evaluation: Impact measurement and evidence building',
        '10% - Organizational development: Systems, compliance, and sustainability planning'
      ]),
      createListComponent('impact-milestones', [
        'Year 1: Serve 15,000 participants across 5 new communities',
        'Year 2: Achieve 75% positive outcomes with 85% cost efficiency',
        'Year 3: Launch replication program with 5 partner organizations',
        'Year 4: Reach financial sustainability through diversified revenue'
      ]),
      createMetricComponent('cost-per-life', 'Cost per Life Changed', '$100', 'Investment per transformed life'),
      {
        id: 'investor-impact',
        type: 'callout',
        content: 'Investor impact: Join us in creating measurable, lasting change for [target population]',
        isInlineEditable: true,
        aiInstructions: 'Call to action for investors to join the mission and create social impact.'
      }
    ],
    designElements: {
      backgroundStyle: 'gradient',
      backgroundImage: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      layout: {
        padding: '4rem',
        maxWidth: '900px',
        alignment: 'center'
      }
    },
    aiModifiable: ['funding-strategy', 'impact-promise', 'investor-engagement'],
    bestPractices: [
      'Clear cost per impact calculation',
      'Specific scaling milestones',
      'Path to sustainability included',
      'Compelling mission-driven ask'
    ]
  }
]

export const SOCIAL_IMPACT_TEMPLATE = createTemplate(
  'social-impact',
  'Social Impact Venture',
  'Designed for social enterprises, nonprofits, and impact-driven organizations with focus on measurable social outcomes and sustainable change',
  {
    targetAudience: ['impact-investors', 'foundations', 'social-investors'],
    industry: ['social-impact', 'nonprofit', 'social-enterprise', 'sustainability'],
    fundingStage: ['seed', 'growth'],
    slides: socialImpactSlides,
    designSystem: DESIGN_SYSTEMS.vibrant,
    sampleContent: {
      companyName: 'SocialChange',
      industry: 'Social Impact',
      problem: '50M people globally lack access to [critical service], perpetuating cycles of poverty and limiting economic opportunity',
      solution: 'Evidence-based program using technology and community partnerships to deliver [service] with 75% success rate',
      market: 'Serving underserved communities with $25B annual funding from foundations, government, and impact investors',
      traction: '5,000 participants served, 75% positive outcomes, $150 cost per person, 85% program retention',
      team: 'Mission-driven team with deep community connections, research expertise, and proven track record in social change',
      ask: 'Raising $5M to scale impact to 50,000 people and establish sustainable operations across 10 communities'
    },
    claudeCodeIntegration: {
      modifiableComponents: ['layout', 'styling', 'content-structure', 'impact-metrics', 'theory-of-change'],
      customizationPoints: [
        {
          id: 'impact-area',
          name: 'Social Impact Focus',
          description: 'Customize for different social impact domains',
          type: 'content',
          options: ['Education', 'Healthcare', 'Economic Opportunity', 'Environment', 'Housing', 'Criminal Justice'],
          aiPrompt: 'Adapt this template for {area} social impact, adjusting metrics, outcomes, and stakeholders'
        },
        {
          id: 'organization-type',
          name: 'Organization Structure',
          description: 'Adapt for different organizational models',
          type: 'content',
          options: ['Nonprofit', 'Social Enterprise', 'B-Corp', 'For-Profit Impact'],
          aiPrompt: 'Customize this template for a {type} organization, adjusting business model and sustainability approach'
        }
      ],
      aiCapabilities: [
        {
          id: 'impact-measurement',
          name: 'Impact Measurement Design',
          description: 'Design rigorous impact measurement frameworks',
          examples: ['Theory of change development', 'Outcome indicator selection', 'Evaluation methodology'],
          complexity: 'moderate'
        },
        {
          id: 'sustainability-planning',
          name: 'Financial Sustainability',
          description: 'Develop sustainable funding and revenue models',
          examples: ['Revenue diversification strategy', 'Earned income models', 'Grant strategy optimization'],
          complexity: 'moderate'
        }
      ]
    },
    metadata: {
      successRate: 88,
      averageFundingRaised: '$3.5M',
      basedOn: 'Successful social ventures (Grameen, Teach for America, charity: water)',
      lastUpdated: new Date().toISOString(),
      difficulty: 'intermediate'
    }
  }
)
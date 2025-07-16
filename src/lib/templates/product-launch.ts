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
    aiInstructions: `This is a metric component. Users can modify it through AI commands like 'change the downloads to 100K' or 'add a engagement metric'.`,
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
    aiInstructions: `This is a list component. Users can modify it through AI commands like 'add more user benefits' or 'emphasize viral features'.`,
    placeholder: 'Add list item'
  }
}

const productLaunchSlides: PrebuiltSlide[] = [
  // Slide 1: Product Vision
  {
    id: 'product-vision',
    type: 'title',
    title: 'Product Vision',
    layout: 'hero',
    components: [
      createTextComponent('product-name', 'ProductName', 'Product Name', { 
        bold: true, 
        alignment: 'center' 
      }),
      createTextComponent('tagline', 'The [category] that [unique value] for [target users]', 'Product tagline', {
        alignment: 'center'
      }),
      createTextComponent('launch-timeline', 'Launching [Quarter Year] • Available on [Platforms]', 'Launch details', {
        alignment: 'center'
      })
    ],
    designElements: {
      backgroundStyle: 'gradient',
      backgroundImage: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      layout: {
        padding: '4rem',
        maxWidth: '900px',
        alignment: 'center'
      }
    },
    aiModifiable: ['tagline-clarity', 'positioning', 'launch-timing'],
    bestPractices: [
      'Clear category definition',
      'Memorable and shareable tagline',
      'Specific launch timeline',
      'Platform strategy alignment'
    ]
  },

  // Slide 2: User Problem & Pain Points
  {
    id: 'user-problem',
    type: 'problem',
    title: 'User Problem & Pain Points',
    layout: 'two-column',
    components: [
      createTextComponent('problem-headline', 'The User Challenge', 'Problem headline'),
      createTextComponent('user-story', 'Users struggle with [specific daily friction] that costs them [time/money/frustration]', 'User pain story'),
      createListComponent('pain-points', [
        'Daily friction point that wastes user time',
        'Existing solutions are too complex/expensive',
        'No mobile-first solution exists',
        'Social sharing and discovery is broken'
      ]),
      createMetricComponent('market-validation', 'Users Affected', '500M+', 'People experiencing this problem'),
      createMetricComponent('time-wasted', 'Time Lost', '2 hrs/day', 'Average time lost to this problem'),
      {
        id: 'user-quote',
        type: 'callout',
        content: '"I wish there was an easier way to..." - Target User Research',
        isInlineEditable: true,
        aiInstructions: 'Real user quote from research highlighting the core frustration.'
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
    aiModifiable: ['user-empathy', 'pain-quantification', 'research-validation'],
    bestPractices: [
      'Focus on user emotions and daily experience',
      'Include real user research quotes',
      'Show widespread problem scope',
      'Connect to behavioral trends'
    ]
  },

  // Slide 3: Product Solution & Magic
  {
    id: 'product-solution',
    type: 'solution',
    title: 'Product Solution & Magic',
    layout: 'two-column',
    components: [
      createTextComponent('solution-headline', 'Our Solution', 'Solution headline'),
      createTextComponent('product-magic', 'We make [complex task] as simple as [familiar action] through [unique approach]', 'Product magic explanation'),
      createListComponent('core-features', [
        'One-tap solution to the main problem',
        'AI-powered personalization and recommendations',
        'Social features that create network effects',
        'Cross-platform sync and accessibility'
      ]),
      createMetricComponent('user-benefit', 'Time Saved', '90%', 'Reduction in time to complete task'),
      createMetricComponent('simplicity', 'Steps Reduced', '10 to 1', 'Workflow simplification'),
      {
        id: 'aha-moment',
        type: 'callout',
        content: 'The "aha moment": When users first [key action] and see [magical result]',
        isInlineEditable: true,
        aiInstructions: 'Describe the moment users understand the product value.'
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
    aiModifiable: ['magic-explanation', 'feature-prioritization', 'user-journey'],
    bestPractices: [
      'Focus on the magical user experience',
      'Show dramatic simplification',
      'Highlight unique approach or technology',
      'Make benefits immediately obvious'
    ]
  },

  // Slide 4: Product Demo & User Experience
  {
    id: 'product-demo',
    type: 'product',
    title: 'Product Demo & User Experience',
    layout: 'image-text',
    components: [
      createTextComponent('demo-headline', 'Product Experience', 'Demo headline'),
      {
        id: 'product-interface',
        type: 'image',
        content: { 
          src: '/api/placeholder/800/600',
          alt: 'Product interface showing key user workflow',
          caption: 'Intuitive interface designed for mobile-first users'
        },
        isInlineEditable: false,
        aiInstructions: 'Show the actual product interface highlighting the key user workflow.'
      },
      createListComponent('ux-highlights', [
        'Intuitive onboarding: Users productive in under 30 seconds',
        'Smart defaults: AI learns user preferences automatically',
        'Social features: Easy sharing and collaboration',
        'Offline support: Works everywhere, syncs when connected'
      ]),
      createTextComponent('design-philosophy', 'Designed for Gen Z/Millennial users who expect mobile-first, social, and instant experiences', 'Design approach'),
      {
        id: 'user-feedback',
        type: 'callout',
        content: 'Early user feedback: "This is exactly what I\'ve been waiting for" - 4.8/5 stars',
        isInlineEditable: true,
        aiInstructions: 'Real user feedback and ratings from beta testing or early launch.'
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
    aiModifiable: ['ux-emphasis', 'user-feedback', 'design-highlights'],
    bestPractices: [
      'Show real product, not wireframes',
      'Emphasize mobile-first design',
      'Include user feedback and ratings',
      'Highlight social and viral features'
    ]
  },

  // Slide 5: Market Opportunity & Timing
  {
    id: 'market-timing',
    type: 'market',
    title: 'Market Opportunity & Timing',
    layout: 'metrics',
    components: [
      createTextComponent('market-headline', 'Perfect Market Timing', 'Market headline'),
      createMetricComponent('market-size', 'Market Size', '$50B', 'Total addressable market'),
      createMetricComponent('growth-rate', 'Growth Rate', '30% YoY', 'Market growth rate'),
      createMetricComponent('mobile-adoption', 'Mobile Usage', '85%', 'Mobile-first user behavior'),
      createTextComponent('timing-factors', 'Market timing driven by remote work, mobile-first behavior, and social commerce trends', 'Why now explanation'),
      createListComponent('market-drivers', [
        'Mobile-first generation entering peak spending years',
        'Shift to social discovery and viral sharing',
        'Increased demand for instant, simple solutions',
        'Creator economy and social commerce growth'
      ]),
      {
        id: 'competitive-timing',
        type: 'callout',
        content: 'First-mover advantage: No direct competitor has solved this for mobile-native users',
        isInlineEditable: true,
        aiInstructions: 'Explain the competitive timing and first-mover advantages.'
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
    aiModifiable: ['timing-narrative', 'market-trends', 'competitive-positioning'],
    bestPractices: [
      'Connect to generational behavior shifts',
      'Show accelerating trends',
      'Highlight mobile-first opportunity',
      'Explain first-mover advantages'
    ]
  },

  // Slide 6: Go-to-Market & User Acquisition
  {
    id: 'go-to-market',
    type: 'market',
    title: 'Go-to-Market & User Acquisition',
    layout: 'two-column',
    components: [
      createTextComponent('gtm-headline', 'Viral Growth Strategy', 'GTM headline'),
      createTextComponent('acquisition-strategy', 'Product-led growth with viral mechanics and social media marketing', 'User acquisition approach'),
      createListComponent('acquisition-channels', [
        'Product virality: Built-in sharing drives 40% of new users',
        'Social media: TikTok, Instagram, Twitter organic content',
        'Influencer partnerships: Micro-influencers in target verticals',
        'App store optimization: Featured placement strategy'
      ]),
      createMetricComponent('viral-coefficient', 'Viral Coefficient', '1.3', 'Users invited per active user'),
      createMetricComponent('cac', 'Customer Acquisition Cost', '$2.50', 'Blended CAC across channels'),
      createListComponent('growth-tactics', [
        'Launch: Product Hunt, social media buzz campaign',
        'Month 1-3: Influencer partnerships and PR',
        'Month 4-6: Paid acquisition and optimization',
        'Month 7+: International expansion and platform partnerships'
      ]),
      {
        id: 'virality-mechanics',
        type: 'callout',
        content: 'Viral mechanics: Users naturally share because [specific reason] creates social currency',
        isInlineEditable: true,
        aiInstructions: 'Explain why users will naturally share and promote the product.'
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
    aiModifiable: ['viral-strategy', 'channel-mix', 'growth-tactics'],
    bestPractices: [
      'Emphasize built-in viral mechanics',
      'Show low-cost acquisition strategy',
      'Include social proof elements',
      'Plan for scale and international expansion'
    ]
  },

  // Slide 7: Traction & Early Success
  {
    id: 'traction',
    type: 'traction',
    title: 'Traction & Early Success',
    layout: 'metrics',
    components: [
      createTextComponent('traction-headline', 'Strong Early Momentum', 'Traction headline'),
      createMetricComponent('users', 'Total Users', '50K+', 'Registered users'),
      createMetricComponent('dau', 'Daily Active Users', '15K', 'Daily engaged users'),
      createMetricComponent('retention', 'Day 7 Retention', '45%', 'User retention rate'),
      createMetricComponent('app-rating', 'App Store Rating', '4.8/5', 'User satisfaction'),
      createListComponent('traction-highlights', [
        'Product Hunt #1 Product of the Day',
        'Featured by Apple in "New Apps We Love"',
        'Viral TikTok campaign reached 2M+ views',
        'Waitlist grew 500% after initial PR coverage'
      ]),
      {
        id: 'user-love',
        type: 'callout',
        content: 'User love: 92% would recommend to friends, 78% use daily, growing organically',
        isInlineEditable: true,
        aiInstructions: 'Evidence of strong product-market fit and user engagement.'
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
    aiModifiable: ['metrics-emphasis', 'social-proof', 'viral-success'],
    bestPractices: [
      'Show engagement, not just downloads',
      'Include social proof and press coverage',
      'Highlight organic growth and virality',
      'Demonstrate strong retention metrics'
    ]
  },

  // Slide 8: Monetization & Business Model
  {
    id: 'monetization',
    type: 'business-model',
    title: 'Monetization & Business Model',
    layout: 'two-column',
    components: [
      createTextComponent('monetization-headline', 'Freemium Business Model', 'Monetization headline'),
      createTextComponent('model-overview', 'Free tier drives adoption, premium features and social features drive conversion', 'Business model overview'),
      createListComponent('revenue-streams', [
        'Premium subscriptions: $9.99/month for advanced features',
        'Creator monetization: Revenue share on paid content',
        'Brand partnerships: Sponsored content and collaborations',
        'Marketplace: Commission on user-generated content sales'
      ]),
      createMetricComponent('conversion-rate', 'Free-to-Paid', '8%', 'Conversion rate to premium'),
      createMetricComponent('arpu', 'ARPU', '$15/month', 'Average revenue per user'),
      createMetricComponent('ltv-cac', 'LTV/CAC', '4:1', 'Customer lifetime value ratio'),
      {
        id: 'monetization-timing',
        type: 'callout',
        content: 'Monetization strategy: Build user base first, layer in revenue streams as engagement grows',
        isInlineEditable: true,
        aiInstructions: 'Explain the timing and strategy for monetization rollout.'
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
    aiModifiable: ['model-optimization', 'revenue-mix', 'conversion-strategy'],
    bestPractices: [
      'Show clear path from free to paid',
      'Multiple revenue stream potential',
      'Creator economy integration',
      'Sustainable unit economics'
    ]
  },

  // Slide 9: Competition & Differentiation
  {
    id: 'competition',
    type: 'competition',
    title: 'Competition & Differentiation',
    layout: 'two-column',
    components: [
      createTextComponent('competition-headline', 'Competitive Landscape', 'Competition headline'),
      createTextComponent('market-position', 'We compete with legacy desktop apps, general social platforms, and DIY solutions', 'Market positioning'),
      createListComponent('competitors', [
        'Legacy tools: Desktop-focused, not mobile-native, complex UX',
        'Social platforms: General purpose, not specialized for our use case',
        'DIY solutions: Time-consuming, no social features',
        'Other startups: Either too complex or too simple'
      ]),
      createListComponent('key-differentiators', [
        'Mobile-first: Built for smartphone-native generation',
        'Social by design: Viral sharing and collaboration built-in',
        'AI-powered: Smart automation and personalization',
        'Creator-friendly: Built for the creator economy'
      ]),
      {
        id: 'network-effects',
        type: 'callout',
        content: 'Defensibility: Network effects, user-generated content, and viral growth create strong moats',
        isInlineEditable: true,
        aiInstructions: 'Explain how the product becomes more valuable with more users.'
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
    aiModifiable: ['competitive-analysis', 'differentiation-clarity', 'moat-building'],
    bestPractices: [
      'Acknowledge real alternatives honestly',
      'Focus on mobile-first advantage',
      'Highlight network effects potential',
      'Show path to category leadership'
    ]
  },

  // Slide 10: Launch Plan & Funding
  {
    id: 'launch-funding',
    type: 'ask',
    title: 'Launch Plan & Funding',
    layout: 'hero',
    components: [
      createTextComponent('funding-headline', 'Seed Round: $3M', 'Funding ask headline', {
        bold: true,
        alignment: 'center'
      }),
      createTextComponent('funding-purpose', 'To launch globally and reach 1M users in 12 months', 'Purpose of funding', {
        alignment: 'center'
      }),
      createListComponent('use-of-funds', [
        '40% - Product development and AI features',
        '35% - Marketing and user acquisition',
        '15% - Team expansion (engineering and design)',
        '10% - Operations and infrastructure'
      ]),
      createListComponent('launch-milestones', [
        'Q1: Public launch and app store featuring',
        'Q2: 100K users and first viral marketing campaigns',
        'Q3: International expansion and creator partnerships',
        'Q4: 1M users and Series A positioning'
      ]),
      createMetricComponent('runway', 'Runway', '18 months', 'Time to profitability or next round'),
      {
        id: 'vision-scale',
        type: 'callout',
        content: 'Vision: Become the go-to platform for [category] with 100M+ global users',
        isInlineEditable: true,
        aiInstructions: 'Long-term vision for market leadership and scale.'
      }
    ],
    designElements: {
      backgroundStyle: 'gradient',
      backgroundImage: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      layout: {
        padding: '4rem',
        maxWidth: '900px',
        alignment: 'center'
      }
    },
    aiModifiable: ['funding-strategy', 'launch-timeline', 'scale-vision'],
    bestPractices: [
      'Clear launch and growth milestones',
      'Focus on user acquisition and engagement',
      'Show path to viral growth',
      'Position for next funding round'
    ]
  }
]

export const PRODUCT_LAUNCH_TEMPLATE = createTemplate(
  'product-launch',
  'Consumer Product Launch',
  'Perfect for mobile apps, consumer products, and viral platforms targeting Gen Z/Millennial users with social features',
  {
    targetAudience: ['investors', 'angels', 'product-launch'],
    industry: ['consumer', 'mobile', 'social', 'creator-economy'],
    fundingStage: ['pre-seed', 'seed'],
    slides: productLaunchSlides,
    designSystem: DESIGN_SYSTEMS.vibrant,
    sampleContent: {
      companyName: 'ViralApp',
      industry: 'Consumer Mobile',
      problem: 'Mobile users waste 2+ hours daily on fragmented tools without social sharing built-in',
      solution: 'AI-powered mobile app that simplifies [workflow] with viral social features and one-tap actions',
      market: '$50B consumer mobile market growing 30% annually driven by Gen Z mobile-first behavior',
      traction: '50K users, 15K DAU, 4.8/5 app rating, 45% week-1 retention, featured by Apple',
      team: 'Former TikTok and Instagram product managers with viral growth expertise',
      ask: 'Raising $3M seed to launch globally and reach 1M users in 12 months'
    },
    claudeCodeIntegration: {
      modifiableComponents: ['layout', 'styling', 'content-structure', 'viral-mechanics', 'user-metrics'],
      customizationPoints: [
        {
          id: 'user-demographic',
          name: 'Target User Demographic',
          description: 'Customize for different age groups and user behaviors',
          type: 'content',
          options: ['Gen Z (16-24)', 'Millennials (25-35)', 'Families (Parents)', 'Professionals (Working)'],
          aiPrompt: 'Adapt this template for {demographic} users, adjusting language, features, and metrics'
        },
        {
          id: 'monetization-focus',
          name: 'Monetization Strategy',
          description: 'Emphasize different revenue models',
          type: 'content',
          options: ['Freemium SaaS', 'Creator Economy', 'Social Commerce', 'Advertising'],
          aiPrompt: 'Focus the monetization strategy on {model}, adjusting business model and metrics'
        }
      ],
      aiCapabilities: [
        {
          id: 'viral-optimization',
          name: 'Viral Growth Optimization',
          description: 'Optimize viral mechanics and social features',
          examples: ['Improve sharing incentives', 'Design viral loops', 'Social proof elements'],
          complexity: 'moderate'
        },
        {
          id: 'user-experience-focus',
          name: 'UX/UI Emphasis',
          description: 'Highlight user experience and design',
          examples: ['Mobile-first design patterns', 'Onboarding optimization', 'Engagement features'],
          complexity: 'simple'
        }
      ]
    },
    metadata: {
      successRate: 78,
      averageFundingRaised: '$2.8M',
      basedOn: 'Successful consumer product launches (TikTok, BeReal, Clubhouse early decks)',
      lastUpdated: new Date().toISOString(),
      difficulty: 'beginner'
    }
  }
)
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export interface PitchDeckOutline {
  slides: SlideOutline[]
  totalSlides: number
}

export interface SlideOutline {
  id: number
  title: string
  type: SlideType
  contentSummary: string
}

export type SlideType = 
  | 'title'
  | 'problem'
  | 'solution'
  | 'market'
  | 'product'
  | 'traction'
  | 'business-model'
  | 'team'
  | 'financials'
  | 'ask'
  | 'qa-chat'
  | 'appendix'
  | 'video'
  | 'intro-video'

export interface SlideContent {
  id: number
  title: string
  type: SlideType
  content: {
    headline: string
    subheadline?: string
    bullets: string[]
    featureCards?: Array<{
      id: string
      icon: string
      iconColor?: string
      title: string
      description: string
      isHighlighted?: boolean
    }>
    metrics?: Array<{
      label: string
      value: string
      context?: string
    }>
    callout?: string
    nextSteps?: string[]
    icons?: Record<string, {
      name: string
      color?: string
      size?: string
    }>
    graphics?: Record<string, {
      type: 'image' | 'shape' | 'placeholder'
      src?: string
      alt?: string
      shape?: string
      color?: string
      size?: string
      opacity?: number
      rotation?: number
      borderRadius?: string
      filter?: string
    }>
    video?: {
      url?: string
      blob?: Blob
      thumbnail?: string
      duration?: number
      title?: string
      description?: string
    }
  }
}

export interface StartupContext {
  topic: string
  industry: string
  audience: string
  slideCount: number
  companyName?: string
  stage?: string
  existingContent?: string
}

class OpenAIService {
  public async callOpenAI(prompt: string, maxTokens: number = 2000): Promise<string> {
    // Demo mode fallback when no real API key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'demo_key_for_testing') {
      console.log('Demo mode: Using fallback content generation')
      return this.generateDemoContent(prompt)
    }

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert pitch deck consultant who has helped hundreds of startups raise funding. You create compelling, investor-focused content that follows proven pitch deck best practices.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      })

      return response.choices[0]?.message?.content || ''
    } catch (error) {
      console.error('OpenAI API Error:', error)
      // Fallback to demo content on API failure
      return this.generateDemoContent(prompt)
    }
  }

  private generateDemoContent(prompt: string): string {
    // Simple demo content generation based on prompt keywords
    if (prompt.includes('outline')) {
      return `{
        "slides": [
          {
            "id": 1,
            "title": "Company Overview",
            "type": "title",
            "contentSummary": "Introduction to your startup and vision"
          },
          {
            "id": 2,
            "title": "Problem & Opportunity",
            "type": "problem",
            "contentSummary": "Market problem and opportunity size"
          },
          {
            "id": 3,
            "title": "Our Solution",
            "type": "solution",
            "contentSummary": "Product overview and unique value proposition"
          },
          {
            "id": 4,
            "title": "Market Analysis",
            "type": "market",
            "contentSummary": "Target market and competitive landscape"
          },
          {
            "id": 5,
            "title": "Product Demo",
            "type": "product",
            "contentSummary": "Key features and user experience"
          },
          {
            "id": 6,
            "title": "Traction & Growth",
            "type": "traction",
            "contentSummary": "Current metrics and growth trajectory"
          },
          {
            "id": 7,
            "title": "Business Model",
            "type": "business-model",
            "contentSummary": "Revenue model and unit economics"
          },
          {
            "id": 8,
            "title": "Team",
            "type": "team",
            "contentSummary": "Core team and key advisors"
          },
          {
            "id": 9,
            "title": "Financial Projections",
            "type": "financials",
            "contentSummary": "Revenue projections and key metrics"
          },
          {
            "id": 10,
            "title": "Funding Ask",
            "type": "ask",
            "contentSummary": "Investment amount and use of funds"
          }
        ],
        "totalSlides": 10
      }`
    }

    if (prompt.includes('slide content')) {
      return `{
        "id": 1,
        "title": "Revolutionary AI Platform",
        "type": "title",
        "content": {
          "headline": "Transforming the Future with AI Innovation",
          "subheadline": "Next-generation technology for tomorrow's challenges",
          "bullets": [
            "Cutting-edge AI technology that delivers real results",
            "Proven solution addressing critical market needs",
            "Scalable platform built for rapid growth"
          ],
          "metrics": [
            {"label": "Market Size", "value": "$50B", "context": "Total addressable market"},
            {"label": "Growth Rate", "value": "300%", "context": "Year-over-year growth"},
            {"label": "User Satisfaction", "value": "95%", "context": "Customer satisfaction score"}
          ],
          "callout": "Join the AI revolution and transform your industry",
          "nextSteps": [
            "Massive market opportunity ready for disruption",
            "Strong technology foundation for sustainable growth"
          ]
        }
      }`
    }

    // Always return valid JSON for any other prompt
    return `{
      "error": "Demo mode active",
      "message": "This is demo content. Please provide a valid OpenAI API key for full functionality.",
      "prompt": "${prompt.substring(0, 100)}..."
    }`
  }

  async generateOutline(context: StartupContext): Promise<PitchDeckOutline> {
    const existingContentSection = context.existingContent 
      ? `\n\nExisting Content to Enhance:\n${context.existingContent}\n\nPlease analyze this existing content and create an enhanced outline that builds upon it while following pitch deck best practices.`
      : ''

    const prompt = `
Create a ${context.slideCount}-slide pitch deck outline for a ${context.industry} startup.

Business Description: ${context.topic}
Target Audience: ${context.audience}
Slide Count: ${context.slideCount}${existingContentSection}

Generate a JSON response with this exact structure:
{
  "slides": [
    {
      "id": 1,
      "title": "Slide Title",
      "type": "title|problem|solution|market|product|traction|business-model|team|financials|ask",
      "contentSummary": "Brief description of what this slide covers"
    }
  ],
  "totalSlides": ${context.slideCount}
}

Focus on investor priorities:
1. Problem & Market Opportunity
2. Solution & Product
3. Traction & Business Model
4. Team & Financials
5. Funding Ask

Make slide titles compelling and specific to this business.${context.existingContent ? ' Incorporate and enhance the existing content provided.' : ''}`

    const response = await this.callOpenAI(prompt, 1500)
    
    try {
      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response')
      }
      
      const outline = JSON.parse(jsonMatch[0]) as PitchDeckOutline
      
      // Validate structure
      if (!outline.slides || !Array.isArray(outline.slides)) {
        throw new Error('Invalid outline structure')
      }
      
      return outline
    } catch (error) {
      console.error('Failed to parse outline:', error)
      // Fallback to default outline
      return this.getDefaultOutline(context.slideCount)
    }
  }

  async generateSlideContent(
    slideOutline: SlideOutline, 
    context: StartupContext,
    previousSlides?: SlideContent[]
  ): Promise<SlideContent> {
    const previousContext = previousSlides?.length 
      ? `\n\nPrevious slides context:\n${previousSlides.map(slide => 
          `${slide.title}: ${slide.content.headline}`
        ).join('\n')}` 
      : ''

    // Special handling for Q&A chat slide
    if (slideOutline.type === 'qa-chat') {
      return {
        id: slideOutline.id,
        title: slideOutline.title,
        type: slideOutline.type,
        content: {
          headline: 'Interactive Q&A Session',
          subheadline: 'Real-time questions and answers with investors',
          bullets: [
            'Live chat interface for investor questions',
            'Real-time responses from the presentation team',
            'Recorded Q&A session for follow-up',
            'Direct engagement with potential investors'
          ],
          callout: 'This is your opportunity to address investor concerns and showcase your expertise',
          nextSteps: [
            'Prepare for common investor questions',
            'Have key metrics and data ready',
            'Be ready to elaborate on any slide content'
          ]
        }
      }
    }

    const prompt = `
Generate content for this pitch deck slide:

Slide: ${slideOutline.title} (Type: ${slideOutline.type})
Business: ${context.topic}
Industry: ${context.industry}
Audience: ${context.audience}${previousContext}

Create compelling, investor-focused content. Return JSON with this exact structure:
{
  "id": ${slideOutline.id},
  "title": "${slideOutline.title}",
  "type": "${slideOutline.type}",
  "content": {
    "headline": "Compelling main headline",
    "subheadline": "Optional supporting subheadline",
    "bullets": ["3-5 key bullet points", "that support the headline", "and drive the narrative"],
    "metrics": [{"label": "Metric name", "value": "$123M", "context": "Brief context"}],
    "callout": "Key insight or quote that reinforces the message",
    "nextSteps": ["What this means", "for investors"]
  }
}

Guidelines by slide type:
- Title: Company name, tagline, funding ask
- Problem: Specific pain points, market stats, urgency
- Solution: Unique value prop, key features, differentiation
- Market: TAM/SAM/SOM, growth trends, opportunity size
- Product: Demo screenshots, features, user benefits
- Traction: Revenue, users, partnerships, growth metrics
- Business Model: Revenue streams, unit economics, scalability
- Team: Key members, experience, advisors
- Financials: Projections, key metrics, assumptions
- Ask: Funding amount, use of funds, milestones

Make it specific to ${context.industry} and ${context.audience}. Use real-sounding metrics and examples.`

    const response = await this.callOpenAI(prompt, 2000)
    
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response')
      }
      
      const content = JSON.parse(jsonMatch[0]) as SlideContent
      
      // Validate required fields
      if (!content.content?.headline || !content.content?.bullets) {
        throw new Error('Missing required content fields')
      }
      
      return content
    } catch (error) {
      console.error('Failed to parse slide content:', error)
      // Fallback to basic content
      return this.getDefaultSlideContent(slideOutline, context)
    }
  }

  async generateFullDeck(context: StartupContext): Promise<SlideContent[]> {
    try {
      // Generate outline first
      const outline = await this.generateOutline(context)
      
      // Generate content for each slide
      const slides: SlideContent[] = []
      
      for (const slideOutline of outline.slides) {
        const slideContent = await this.generateSlideContent(
          slideOutline, 
          context, 
          slides
        )
        slides.push(slideContent)
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      
      return slides
    } catch (error) {
      console.error('Failed to generate full deck:', error)
      throw error
    }
  }

  private getDefaultOutline(slideCount: number): PitchDeckOutline {
    const defaultSlides: SlideOutline[] = [
      { id: 1, title: 'Company Overview', type: 'title', contentSummary: 'Company name, tagline, and mission' },
      { id: 2, title: 'The Problem', type: 'problem', contentSummary: 'Market pain points and opportunity' },
      { id: 3, title: 'Our Solution', type: 'solution', contentSummary: 'Product overview and value proposition' },
      { id: 4, title: 'Market Opportunity', type: 'market', contentSummary: 'Market size and growth potential' },
      { id: 5, title: 'Product Demo', type: 'product', contentSummary: 'Key features and user experience' },
      { id: 6, title: 'Traction', type: 'traction', contentSummary: 'Growth metrics and achievements' },
      { id: 7, title: 'Business Model', type: 'business-model', contentSummary: 'Revenue model and unit economics' },
      { id: 8, title: 'Team', type: 'team', contentSummary: 'Key team members and advisors' },
      { id: 9, title: 'Financial Projections', type: 'financials', contentSummary: 'Revenue projections and key metrics' },
      { id: 10, title: 'Funding Ask', type: 'ask', contentSummary: 'Investment amount and use of funds' },
      { id: 11, title: 'Q&A Session', type: 'qa-chat', contentSummary: 'Interactive Q&A with investors' }
    ]

    // Always include Q&A slide at the end if we have enough slides
    const slides = slideCount >= 11 ? defaultSlides : defaultSlides.slice(0, slideCount)
    
    return {
      slides,
      totalSlides: slides.length
    }
  }

  private getDefaultSlideContent(slideOutline: SlideOutline, context: StartupContext): SlideContent {
    return {
      id: slideOutline.id,
      title: slideOutline.title,
      type: slideOutline.type,
      content: {
        headline: `${slideOutline.title} for ${context.topic}`,
        bullets: [
          'Key point about this section',
          'Supporting detail with context',
          'Important insight for investors'
        ],
        callout: 'This is why it matters for your business'
      }
    }
  }

  async improveSuggestion(
    currentContent: string,
    slideType: SlideType,
    context: StartupContext
  ): Promise<string> {
    const prompt = `
Improve this ${slideType} slide content for a ${context.industry} startup:

Current content: ${currentContent}

Business context: ${context.topic}

Provide a specific, actionable improvement suggestion that will:
1. Make it more compelling to investors
2. Add credibility with specific details
3. Improve clarity and impact

Return only the suggestion text, not JSON.`

    return await this.callOpenAI(prompt, 500)
  }

  async improveSlideContent(
    slideTitle: string,
    slideContent: string,
    slideType: SlideType,
    userPrompt: string,
    context: StartupContext
  ): Promise<{ improvedTitle: string; improvedContent: string }> {
    const prompt = `
You are an expert pitch deck consultant. Improve this slide based on the user's request.

SLIDE DETAILS:
- Title: "${slideTitle}"
- Content: "${slideContent}"
- Type: ${slideType}
- Business Context: ${context.topic}
- Industry: ${context.industry}
- Target Audience: ${context.audience}

USER REQUEST:
"${userPrompt}"

Please improve this slide based on the user's request. Focus on making it more compelling, clear, and tailored to ${context.audience}.

Return only a JSON object with these fields:
{
  "improvedTitle": "The improved slide title",
  "improvedContent": "The improved content summary"
}

Make sure the improvements are specific and actionable while maintaining the slide's core purpose.`

    const response = await this.callOpenAI(prompt, 1000)
    
    try {
      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response')
      }
      
      const improved = JSON.parse(jsonMatch[0])
      
      // Validate structure
      if (!improved.improvedTitle || !improved.improvedContent) {
        throw new Error('Invalid improvement structure')
      }
      
      return {
        improvedTitle: improved.improvedTitle,
        improvedContent: improved.improvedContent
      }
    } catch (error) {
      console.error('Failed to parse improvement:', error)
      // Fallback to original content with minor improvements
      return {
        improvedTitle: slideTitle,
        improvedContent: `${slideContent} (Enhanced based on your request: ${userPrompt})`
      }
    }
  }

  async improveFullSlideContent(
    slide: SlideContent,
    userPrompt: string,
    context: StartupContext
  ): Promise<SlideContent> {
    const prompt = `
You are an expert pitch deck consultant. Improve this entire slide based on the user's request.

CURRENT SLIDE:
- Title: "${slide.title}"
- Type: ${slide.type}
- Headline: "${slide.content.headline}"
- Subheadline: "${slide.content.subheadline || 'None'}"
- Bullets: ${JSON.stringify(slide.content.bullets)}
- Metrics: ${JSON.stringify(slide.content.metrics || [])}
- Callout: "${slide.content.callout || 'None'}"
- Next Steps: ${JSON.stringify(slide.content.nextSteps || [])}

BUSINESS CONTEXT:
- Topic: ${context.topic}
- Industry: ${context.industry}
- Audience: ${context.audience}

USER REQUEST:
"${userPrompt}"

Please improve this slide based on the user's request. Focus on making it more compelling, clear, and tailored to ${context.audience}.

${slide.type === 'market' ? `
For market analysis slides, include:
- Specific market size data (TAM, SAM, SOM)
- Growth rates and trends
- Key market drivers
- Competitive landscape insights
- Market segmentation
- Regulatory considerations
` : ''}

Return a JSON object with this structure:
{
  "id": ${slide.id},
  "title": "Improved slide title",
  "type": "${slide.type}",
  "content": {
    "headline": "Main headline for the slide",
    "subheadline": "Optional subheadline",
    "bullets": ["Bullet point 1", "Bullet point 2", "Bullet point 3"],
    "metrics": [{"label": "Metric Name", "value": "$100B", "context": "Additional context"}],
    "callout": "Important callout message",
    "nextSteps": ["Next step 1", "Next step 2"]
  }
}

Make the improvements specific, actionable, and professional. Include real data when possible.`

    const response = await this.callOpenAI(prompt, 2000)
    
    try {
      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response')
      }
      
      const improvedSlide = JSON.parse(jsonMatch[0]) as SlideContent
      
      // Validate structure
      if (!improvedSlide.title || !improvedSlide.content) {
        throw new Error('Invalid slide structure')
      }
      
      return improvedSlide
    } catch (error) {
      console.error('Failed to parse improved slide:', error)
      // Fallback to original slide with minor improvements
      return {
        ...slide,
        title: `${slide.title} (Enhanced)`,
        content: {
          ...slide.content,
          headline: `${slide.content.headline} (Improved based on: ${userPrompt})`
        }
      }
    }
  }
}

export const openaiService = new OpenAIService()
export default openaiService
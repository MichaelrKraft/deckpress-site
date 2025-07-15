import { NextRequest, NextResponse } from 'next/server'
import { openaiService } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { startupDescription } = await request.json()
    
    if (!startupDescription || !startupDescription.trim()) {
      return NextResponse.json(
        { error: 'Startup description is required' },
        { status: 400 }
      )
    }

    // Generate AI questions with real answers based on startup description
    const questions = await generateAIQuestions(startupDescription.trim())

    return NextResponse.json({ 
      success: true, 
      questions 
    })

  } catch (error) {
    console.error('Generate questions error:', error)
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to generate questions'

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

async function generateAIQuestions(startupDescription: string) {
  const prompt = `
Based on this startup description, generate 5 essential pitch deck questions and provide intelligent AI-generated answers for each.

Startup Description: "${startupDescription}"

Create questions that would help build a compelling pitch deck. For each question, provide a thoughtful answer based on the startup description provided.

Return a JSON array with this structure:
[
  {
    "id": "problem",
    "question": "What specific problem does your startup solve?",
    "aiAnswer": "A detailed, intelligent answer based on the startup description"
  },
  {
    "id": "solution", 
    "question": "How does your solution uniquely solve this problem?",
    "aiAnswer": "A detailed, intelligent answer based on the startup description"
  }
]

Make sure the AI answers are:
1. Specific and detailed based on the startup description
2. Compelling and investor-focused
3. Realistic and credible
4. 2-3 sentences long
5. Directly related to the startup described

Focus on these 5 key areas:
1. Problem identification
2. Solution approach
3. Target market
4. Business model/revenue
5. Funding ask/goals
`

  try {
    // Use the existing OpenAI service
    const response = await openaiService['callOpenAI'](prompt, 2000)
    
    // Extract JSON from response
    const jsonMatch = response.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      throw new Error('No valid JSON array found in response')
    }
    
    const questions = JSON.parse(jsonMatch[0])
    
    // Validate structure
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('Invalid questions structure')
    }
    
    return questions
  } catch (error) {
    console.error('Failed to generate AI questions:', error)
    // Fallback to demo questions with smart content based on startup description
    return generateFallbackQuestions(startupDescription)
  }
}

function generateFallbackQuestions(startupDescription: string) {
  // Analyze startup description for key themes
  const description = startupDescription.toLowerCase()
  const isAI = description.includes('ai') || description.includes('artificial intelligence') || description.includes('machine learning')
  const isTech = description.includes('tech') || description.includes('software') || description.includes('app') || description.includes('platform')
  const isEcommerce = description.includes('ecommerce') || description.includes('e-commerce') || description.includes('marketplace') || description.includes('retail')
  const isB2B = description.includes('b2b') || description.includes('business') || description.includes('enterprise') || description.includes('companies')
  
  let problemContext = "inefficiencies in the current market"
  let solutionContext = "innovative technology platform"
  let marketContext = "growing digital market"
  
  if (isAI) {
    problemContext = "manual processes that could be automated with AI"
    solutionContext = "AI-powered automation platform"
    marketContext = "rapidly expanding AI market"
  } else if (isTech) {
    problemContext = "outdated technology solutions"
    solutionContext = "modern software platform"
    marketContext = "digital transformation market"
  } else if (isEcommerce) {
    problemContext = "fragmented online shopping experience"
    solutionContext = "streamlined e-commerce platform"
    marketContext = "growing online retail market"
  }
  
  const targetAudience = isB2B ? "businesses and enterprises" : "consumers and end-users"
  
  return [
    {
      id: "problem",
      question: "What specific problem does your startup solve?",
      aiAnswer: `Based on your description, your startup addresses ${problemContext} by providing a more efficient and effective solution. This problem affects many ${targetAudience} who currently struggle with existing alternatives, creating a significant market opportunity.`
    },
    {
      id: "solution", 
      question: "How does your solution uniquely solve this problem?",
      aiAnswer: `Your startup offers a ${solutionContext} that directly addresses these pain points through innovative features and superior user experience. The unique approach differentiates you from competitors and provides clear value to your target market.`
    },
    {
      id: "market",
      question: "Who is your target market and how large is it?",
      aiAnswer: `Your primary target market consists of ${targetAudience} operating in the ${marketContext}. This represents a substantial addressable market with strong growth potential, driven by increasing demand for better solutions in this space.`
    },
    {
      id: "business-model",
      question: "How will you make money?",
      aiAnswer: `Your revenue model is built around ${isB2B ? 'subscription-based recurring revenue from business clients' : 'a combination of subscription fees, transaction fees, and premium features'}, providing predictable income streams while scaling efficiently with customer growth.`
    },
    {
      id: "ask",
      question: "What are you asking for from investors?",
      aiAnswer: `You are seeking funding to accelerate product development, expand market reach, and scale operations. The investment will primarily go toward enhancing your technology platform, growing the team, and executing go-to-market strategies to capture market share.`
    }
  ]
}
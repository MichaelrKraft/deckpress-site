import { NextRequest, NextResponse } from 'next/server'
import { openaiService, SlideType, StartupContext } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { slideTitle, slideContent, slideType, userPrompt, context } = body
    
    if (!slideTitle || !slideContent || !userPrompt) {
      return NextResponse.json(
        { error: 'Missing required fields: slideTitle, slideContent, userPrompt' },
        { status: 400 }
      )
    }

    // Generate improved content using AI
    const improved = await openaiService.improveSlideContent(
      slideTitle,
      slideContent,
      slideType as SlideType,
      userPrompt,
      context as StartupContext
    )

    return NextResponse.json(improved)

  } catch (error) {
    console.error('Improve content error:', error)
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to improve content'

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
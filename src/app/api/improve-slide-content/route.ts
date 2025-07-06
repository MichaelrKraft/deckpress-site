import { NextRequest, NextResponse } from 'next/server'
import { openaiService, SlideContent, StartupContext } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { slide, userPrompt, context, isDeckWide = false } = await request.json()
    
    if (!slide || !userPrompt) {
      return NextResponse.json(
        { error: 'Missing required fields: slide, userPrompt' },
        { status: 400 }
      )
    }

    // Modify the prompt for deck-wide improvements
    let modifiedPrompt = userPrompt
    if (isDeckWide) {
      modifiedPrompt = `DECK-WIDE IMPROVEMENT: ${userPrompt}

This change should be applied consistently across the entire presentation. Consider how this change affects the overall narrative and flow of the deck.

Current slide context: ${slide.title} (${slide.type})

Apply the requested changes while maintaining the slide's specific purpose and ensuring consistency with the overall deck theme.`
    }

    // Generate improved slide content using AI
    const improvedSlide = await openaiService.improveFullSlideContent(
      slide as SlideContent,
      modifiedPrompt,
      context as StartupContext
    )

    return NextResponse.json({ improvedSlide })

  } catch (error) {
    console.error('Improve slide content error:', error)
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to improve slide content'

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
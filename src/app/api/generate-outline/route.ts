import { NextRequest, NextResponse } from 'next/server'
import { openaiService, StartupContext } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields - support both new (description) and old (topic) field names
    const { topic, description, industry, audience, slideCount, existingContent } = body
    const startupDescription = description || topic // Use description if available, fallback to topic
    
    if (!startupDescription || !audience || !slideCount) {
      return NextResponse.json(
        { error: 'Missing required fields: description/topic, audience, slideCount' },
        { status: 400 }
      )
    }

    // Validate slideCount
    if (slideCount < 5 || slideCount > 20) {
      return NextResponse.json(
        { error: 'Slide count must be between 5 and 20' },
        { status: 400 }
      )
    }

    const context: StartupContext = {
      topic: startupDescription.trim(),
      industry: industry?.trim() || '',
      audience,
      slideCount: parseInt(slideCount),
      existingContent: existingContent?.trim() || undefined
    }

    // Generate outline using OpenAI
    const outline = await openaiService.generateOutline(context)

    return NextResponse.json({ 
      success: true, 
      outline,
      context 
    })

  } catch (error) {
    console.error('Generate outline error:', error)
    
    // Return appropriate error message
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to generate outline'

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
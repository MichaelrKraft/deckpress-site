import { NextRequest, NextResponse } from 'next/server'
import { openaiService, StartupContext } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { topic, industry, audience, slideCount, selectedTheme } = body
    
    if (!topic || !industry || !audience || !slideCount) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields: topic, industry, audience, slideCount' 
        },
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const context: StartupContext = {
      topic: topic.trim(),
      industry: industry.trim(),
      audience,
      slideCount: parseInt(slideCount)
    }

    // Generate full deck using OpenAI
    const slides = await openaiService.generateFullDeck(context)

    // Add theme and metadata
    const deckData = {
      id: `deck_${Date.now()}`,
      title: `${context.industry} Pitch Deck`,
      theme: selectedTheme || 'modern',
      createdAt: new Date().toISOString(),
      slides,
      context
    }

    return NextResponse.json({ 
      success: true, 
      deck: deckData
    })

  } catch (error) {
    console.error('Generate deck error:', error)
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to generate deck'

    return NextResponse.json(
      { 
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
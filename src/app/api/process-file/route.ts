import { NextRequest, NextResponse } from 'next/server'
import { PitchDeckOutline } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const industry = formData.get('industry') as string
    const audience = formData.get('audience') as string
    const slideCount = parseInt(formData.get('slideCount') as string) || 10

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Check file type
    const allowedTypes = [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/pdf'
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload PowerPoint, Word, PDF, or text files.' },
        { status: 400 }
      )
    }

    // For now, we'll simulate file processing
    // In a real implementation, you would:
    // 1. Parse PowerPoint files using a library like pptxjs
    // 2. Parse Word documents using mammoth.js
    // 3. Parse PDFs using pdf-parse
    // 4. Extract text content and structure

    const fileContent = await extractFileContent(file)
    
    // Generate outline from file content
    const outline = await generateOutlineFromContent(fileContent, {
      industry,
      audience,
      slideCount
    })

    return NextResponse.json({ outline })

  } catch (error) {
    console.error('Error processing file:', error)
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    )
  }
}

async function extractFileContent(file: File): Promise<string> {
  // This is a simplified implementation
  // In production, you would use appropriate libraries for each file type
  
  if (file.type === 'text/plain') {
    return await file.text()
  }
  
  // For other file types, we'll return a placeholder
  // In a real implementation, you would parse the actual file content
  return `Content extracted from ${file.name}. This is a placeholder for the actual file content that would be parsed from the uploaded ${file.type} file.`
}

async function generateOutlineFromContent(
  content: string, 
  options: { industry: string; audience: string; slideCount: number }
): Promise<PitchDeckOutline> {
  // Use the existing generate-outline API logic
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4000'}/api/generate-outline`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      topic: 'Content from uploaded file',
      industry: options.industry,
      audience: options.audience,
      slideCount: options.slideCount,
      existingContent: content
    })
  })

  if (!response.ok) {
    throw new Error('Failed to generate outline from file content')
  }

  const data = await response.json()
  return data.outline
} 
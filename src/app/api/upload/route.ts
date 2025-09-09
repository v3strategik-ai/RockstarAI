import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      )
    }

    const processedFiles = []
    
    for (const file of files) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
        'application/json',
        'text/csv'
      ]
      
      if (!allowedTypes.includes(file.type) && !file.name.endsWith('.txt')) {
        continue // Skip unsupported files
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        continue // Skip large files
      }
      
      // Read file content
      const buffer = await file.arrayBuffer()
      const content = await processFileContent(file, buffer)
      
      const processedFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toISOString(),
        status: 'processed',
        insights: Math.floor(Math.random() * 200) + 50, // Mock insights count
        content: content.substring(0, 1000), // Store first 1000 chars for demo
        patterns: extractPatterns(content)
      }
      
      processedFiles.push(processedFile)
    }
    
    return NextResponse.json({
      success: true,
      processedFiles,
      message: `Successfully processed ${processedFiles.length} files`
    })
    
  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json(
      { error: 'File processing failed' },
      { status: 500 }
    )
  }
}

async function processFileContent(file: File, buffer: ArrayBuffer): Promise<string> {
  const fileName = file.name.toLowerCase()
  
  try {
    if (fileName.endsWith('.txt') || file.type === 'text/plain') {
      return new TextDecoder().decode(buffer)
    }
    
    if (fileName.endsWith('.json') || file.type === 'application/json') {
      const text = new TextDecoder().decode(buffer)
      const json = JSON.parse(text)
      return JSON.stringify(json, null, 2)
    }
    
    if (fileName.endsWith('.csv') || file.type === 'text/csv') {
      return new TextDecoder().decode(buffer)
    }
    
    // For other file types (PDF, Word, Excel), return placeholder content
    // In production, use libraries like pdf-parse, mammoth, xlsx
    return `Content extracted from ${file.name}. This is a demo extraction showing how RockstarAI processes and learns from your documents. In production, this would contain the actual file content parsed using appropriate libraries for PDF, Word, Excel, and other formats.`
    
  } catch (error) {
    console.error('File processing error:', error)
    return `Error processing ${file.name}: ${error}`
  }
}

function extractPatterns(content: string): string[] {
  const patterns = []
  
  // Extract email patterns
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g
  const emails = content.match(emailRegex)
  if (emails && emails.length > 0) {
    patterns.push(`Email communication pattern detected (${emails.length} addresses)`)
  }
  
  // Extract time patterns
  const timeRegex = /\b(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?\b/g
  const times = content.match(timeRegex)
  if (times && times.length > 0) {
    patterns.push(`Time references found (${times.length} instances)`)
  }
  
  // Extract meeting keywords
  const meetingKeywords = ['meeting', 'call', 'conference', 'discussion', 'presentation']
  const meetingCount = meetingKeywords.reduce((count, keyword) => {
    const regex = new RegExp(keyword, 'gi')
    const matches = content.match(regex)
    return count + (matches ? matches.length : 0)
  }, 0)
  
  if (meetingCount > 0) {
    patterns.push(`Meeting-related content detected (${meetingCount} references)`)
  }
  
  // Extract professional language patterns
  const professionalWords = ['regards', 'sincerely', 'best', 'thank you', 'please', 'kindly']
  const professionalCount = professionalWords.reduce((count, word) => {
    const regex = new RegExp(word, 'gi')
    const matches = content.match(regex)
    return count + (matches ? matches.length : 0)
  }, 0)
  
  if (professionalCount > 0) {
    patterns.push(`Professional communication style (${professionalCount} formal expressions)`)
  }
  
  return patterns.slice(0, 5) // Return top 5 patterns
}

export async function GET() {
  return NextResponse.json({
    message: 'File upload API is ready',
    supportedFormats: [
      'PDF Documents (.pdf)',
      'Word Documents (.doc, .docx)',
      'Excel Spreadsheets (.xls, .xlsx)',
      'Text Files (.txt)',
      'JSON Data (.json)',
      'CSV Files (.csv)'
    ],
    maxFileSize: '10MB'
  })
}
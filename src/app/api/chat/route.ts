import { NextRequest, NextResponse } from 'next/server'
import { WebSocketServer, WebSocket } from 'ws'

// Store active connections by room
const rooms = new Map<string, Set<WebSocket>>()

// Create WebSocket server
let wss: WebSocketServer | null = null

if (!wss) {
  wss = new WebSocketServer({ noServer: true })
  
  wss.on('connection', (ws: WebSocket, request: any) => {
    const url = new URL(request.url, 'http://localhost')
    const roomId = url.searchParams.get('room') || 'default-room'
    
    // Add to room
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set())
    }
    rooms.get(roomId)!.add(ws)
    
    console.log(`Client connected to room: ${roomId}`)
    
    // Send welcome message
    ws.send(JSON.stringify({
      type: 'system',
      message: 'Connected to Q&A session',
      roomId,
      timestamp: new Date().toISOString()
    }))
    
    ws.on('message', (data: any) => {
      try {
        const message = JSON.parse(data.toString())
        
        // Broadcast to all clients in the room
        const room = rooms.get(roomId)
        if (room) {
          room.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                ...message,
                timestamp: new Date().toISOString()
              }))
            }
          })
        }
      } catch (error: any) {
        console.error('Error parsing message:', error)
      }
    })
    
    ws.on('close', () => {
      // Remove from room
      const room = rooms.get(roomId)
      if (room) {
        room.delete(ws)
        if (room.size === 0) {
          rooms.delete(roomId)
        }
      }
      console.log(`Client disconnected from room: ${roomId}`)
    })
    
    ws.on('error', (error: any) => {
      console.error('WebSocket error:', error)
    })
  })
}

export async function GET(request: NextRequest) {
  // This endpoint is used to upgrade the connection to WebSocket
  return NextResponse.json({ message: 'WebSocket endpoint' })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { roomId, message, sender } = body
    
    // Broadcast message to room
    const room = rooms.get(roomId)
    if (room) {
      const messageData = {
        type: 'chat',
        message,
        sender,
        timestamp: new Date().toISOString()
      }
      
      room.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(messageData))
        }
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
} 
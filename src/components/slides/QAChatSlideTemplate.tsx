"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { SlideContent } from '@/lib/openai'
import { MessageCircle, Send, User, Users, Mic, MicOff, Video, VideoOff } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'presenter' | 'investor'
  timestamp: Date
  isTyping?: boolean
}

interface QAChatSlideTemplateProps {
  slide: SlideContent
  theme: any
  isPresenter?: boolean
  roomId?: string
  onUpdateSlide?: (updatedSlide: SlideContent) => void
  onAiImprove?: (content: string, field: string) => void
}

export function QAChatSlideTemplate({ 
  slide, 
  theme, 
  isPresenter = false, 
  roomId = 'default-room',
  onUpdateSlide,
  onAiImprove
}: QAChatSlideTemplateProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to the Q&A session! Feel free to ask any questions about our presentation.',
      sender: 'presenter',
      timestamp: new Date()
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Simulate real-time connection (for demo purposes)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnected(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: isPresenter ? 'presenter' : 'investor',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Simulate response from other participants
    if (isPresenter) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: 'typing-' + Date.now(),
          text: 'Typing...',
          sender: 'investor',
          timestamp: new Date(),
          isTyping: true
        }])
        
        // Remove typing indicator and add response
        setTimeout(() => {
          setMessages(prev => prev.filter(msg => !msg.isTyping))
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: 'Great question! Let me elaborate on that point...',
            sender: 'investor',
            timestamp: new Date()
          }])
        }, 2000)
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
  }

  return (
    <div className="relative h-full min-h-[600px] bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <motion.div
          className="p-6 border-b border-white/10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300 font-semibold">Live Q&A</span>
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Users className="w-4 h-4" />
                <span>Room: {roomId}</span>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className={`p-2 rounded-full transition-colors ${
                  isMuted ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleVideo}
                className={`p-2 rounded-full transition-colors ${
                  !isVideoOn ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.sender === 'presenter' ? 'justify-start' : 'justify-end'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`flex items-start gap-3 max-w-[70%] ${
                message.sender === 'presenter' ? 'flex-row' : 'flex-row-reverse'
              }`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'presenter' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-purple-500 text-white'
                }`}>
                  <User className="w-4 h-4" />
                </div>
                <div className={`px-4 py-3 rounded-2xl ${
                  message.sender === 'presenter'
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'bg-blue-500/20 text-white border border-blue-500/30'
                }`}>
                  {message.isTyping ? (
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-medium mb-1">
                        {message.sender === 'presenter' ? 'Presenter' : 'Investor'}
                      </p>
                      <p className="text-white/90">{message.text}</p>
                      <p className="text-xs text-white/50 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <motion.div
          className="p-6 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isPresenter ? "Type your response..." : "Ask a question..."}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="p-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-2xl transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center gap-4 mt-4 text-sm text-white/70">
            <span>Quick actions:</span>
            <button
              onClick={() => setNewMessage("Can you elaborate on your revenue model?")}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              Revenue Model
            </button>
            <button
              onClick={() => setNewMessage("What's your competitive advantage?")}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              Competitive Advantage
            </button>
            <button
              onClick={() => setNewMessage("How do you plan to scale?")}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              Scaling Plans
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 
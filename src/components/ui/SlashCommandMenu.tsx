"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Type, 
  Image, 
  BarChart3, 
  ListChecks, 
  Quote,
  Video,
  LinkIcon,
  PlusCircle,
  Sparkles,
  Brain,
  Users,
  TrendingUp,
  Target,
  DollarSign,
  Lightbulb,
  Camera,
  PlayCircle
} from 'lucide-react'

interface SlashCommand {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  category: string
  keywords: string[]
  action: () => void
}

interface SlashCommandMenuProps {
  isOpen: boolean
  onClose: () => void
  onCommand: (command: SlashCommand) => void
  position: { x: number; y: number }
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function SlashCommandMenu({ 
  isOpen, 
  onClose, 
  onCommand, 
  position, 
  searchQuery, 
  onSearchChange 
}: SlashCommandMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)

  const commands: SlashCommand[] = [
    // Content Types
    {
      id: 'heading',
      title: 'Heading',
      description: 'Add a section heading',
      icon: Type,
      category: 'Content',
      keywords: ['heading', 'title', 'h1', 'h2', 'text'],
      action: () => {}
    },
    {
      id: 'text',
      title: 'Text Block',
      description: 'Add a paragraph of text',
      icon: Type,
      category: 'Content',
      keywords: ['text', 'paragraph', 'content', 'body'],
      action: () => {}
    },
    {
      id: 'bullet-list',
      title: 'Bullet List',
      description: 'Create a bulleted list',
      icon: ListChecks,
      category: 'Content',
      keywords: ['list', 'bullets', 'items', 'points'],
      action: () => {}
    },
    {
      id: 'quote',
      title: 'Quote',
      description: 'Add a highlighted quote',
      icon: Quote,
      category: 'Content',
      keywords: ['quote', 'callout', 'highlight', 'testimonial'],
      action: () => {}
    },
    
    // Media
    {
      id: 'image',
      title: 'Image',
      description: 'Insert an image',
      icon: Image,
      category: 'Media',
      keywords: ['image', 'photo', 'picture', 'visual'],
      action: () => {}
    },
    {
      id: 'video',
      title: 'Video',
      description: 'Embed a video',
      icon: Video,
      category: 'Media',
      keywords: ['video', 'embed', 'youtube', 'vimeo'],
      action: () => {}
    },
    {
      id: 'record-video',
      title: 'Record Video',
      description: 'Record a personal introduction video',
      icon: Camera,
      category: 'Media',
      keywords: ['record', 'camera', 'intro', 'introduction', 'loom'],
      action: () => {}
    },
    {
      id: 'intro-video',
      title: 'Introduction Video',
      description: 'Add a founder introduction video slide',
      icon: PlayCircle,
      category: 'Media',
      keywords: ['introduction', 'founder', 'personal', 'video', 'intro'],
      action: () => {}
    },
    
    // Data & Charts
    {
      id: 'chart',
      title: 'Chart',
      description: 'Add a data visualization',
      icon: BarChart3,
      category: 'Data',
      keywords: ['chart', 'graph', 'data', 'visualization'],
      action: () => {}
    },
    {
      id: 'metrics',
      title: 'Metrics',
      description: 'Display key metrics',
      icon: TrendingUp,
      category: 'Data',
      keywords: ['metrics', 'kpi', 'numbers', 'stats'],
      action: () => {}
    },
    
    // Business Templates
    {
      id: 'problem',
      title: 'Problem Statement',
      description: 'Define the problem you\'re solving',
      icon: Target,
      category: 'Business',
      keywords: ['problem', 'pain', 'challenge', 'issue'],
      action: () => {}
    },
    {
      id: 'solution',
      title: 'Solution',
      description: 'Present your solution',
      icon: Lightbulb,
      category: 'Business',
      keywords: ['solution', 'approach', 'method', 'answer'],
      action: () => {}
    },
    {
      id: 'market',
      title: 'Market Analysis',
      description: 'Show market size and opportunity',
      icon: Users,
      category: 'Business',
      keywords: ['market', 'tam', 'opportunity', 'size'],
      action: () => {}
    },
    {
      id: 'business-model',
      title: 'Business Model',
      description: 'Explain how you make money',
      icon: DollarSign,
      category: 'Business',
      keywords: ['business', 'model', 'revenue', 'monetization'],
      action: () => {}
    },
    
    // AI Actions
    {
      id: 'ai-improve',
      title: 'AI Improve',
      description: 'Let AI enhance this content',
      icon: Sparkles,
      category: 'AI',
      keywords: ['ai', 'improve', 'enhance', 'optimize'],
      action: () => {}
    },
    {
      id: 'ai-generate',
      title: 'AI Generate',
      description: 'Generate new content with AI',
      icon: Brain,
      category: 'AI',
      keywords: ['ai', 'generate', 'create', 'write'],
      action: () => {}
    }
  ]

  const filteredCommands = commands.filter(command => 
    command.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    command.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    command.keywords.some(keyword => 
      keyword.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = []
    }
    acc[command.category].push(command)
    return acc
  }, {} as Record<string, SlashCommand[]>)

  useEffect(() => {
    setSelectedIndex(0)
  }, [searchQuery])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (filteredCommands[selectedIndex]) {
            onCommand(filteredCommands[selectedIndex])
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredCommands, onCommand, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="fixed z-50 w-80 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/50 overflow-hidden"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translateY(-50%)'
        }}
      >
        {/* Search Input */}
        <div className="p-3 border-b border-gray-200/50">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center text-gray-400">
              /
            </div>
            <input
              type="text"
              placeholder="Search commands..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-500 border-none outline-none"
              autoFocus
            />
          </div>
        </div>

        {/* Commands List */}
        <div className="max-h-96 overflow-y-auto">
          {Object.entries(groupedCommands).map(([category, commands]) => (
            <div key={category} className="p-2">
              <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
                {category}
              </div>
              {commands.map((command, index) => {
                const globalIndex = filteredCommands.indexOf(command)
                const isSelected = globalIndex === selectedIndex
                
                return (
                  <motion.button
                    key={command.id}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${
                      isSelected 
                        ? 'bg-purple-50 text-purple-900' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => onCommand(command)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <command.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{command.title}</div>
                      <div className="text-xs text-gray-500">{command.description}</div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200/50 bg-gray-50/50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>↑↓ to navigate</span>
            <span>Enter to select</span>
            <span>Esc to close</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
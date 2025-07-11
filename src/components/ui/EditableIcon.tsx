"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  AlertTriangle, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target, 
  Lightbulb, 
  Settings, 
  TrendingUp,
  Award,
  BarChart3,
  CheckCircle,
  Sparkles,
  Edit3,
  Palette
} from 'lucide-react'

// Icon mapping for easy selection
const ICON_OPTIONS = {
  'AlertTriangle': AlertTriangle,
  'TrendingDown': TrendingDown,
  'Users': Users,
  'DollarSign': DollarSign,
  'Target': Target,
  'Lightbulb': Lightbulb,
  'Settings': Settings,
  'TrendingUp': TrendingUp,
  'Award': Award,
  'BarChart3': BarChart3,
  'CheckCircle': CheckCircle,
  'Sparkles': Sparkles,
} as const

const COLOR_OPTIONS = [
  'text-red-400',
  'text-orange-400', 
  'text-yellow-400',
  'text-green-400',
  'text-blue-400',
  'text-purple-400',
  'text-pink-400',
  'text-indigo-400',
  'text-cyan-400',
  'text-white'
]

const SIZE_OPTIONS = [
  'w-4 h-4',
  'w-5 h-5', 
  'w-6 h-6',
  'w-8 h-8',
  'w-10 h-10',
  'w-12 h-12'
]

interface EditableIconProps {
  iconName: string
  iconColor?: string
  iconSize?: string
  onChange?: (iconName: string, iconColor: string, iconSize: string) => void
  onAiImprove?: (context: string) => void
  className?: string
  editable?: boolean
}

export function EditableIcon({ 
  iconName, 
  iconColor = 'text-white', 
  iconSize = 'w-6 h-6',
  onChange,
  onAiImprove,
  className = '',
  editable = true
}: EditableIconProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const IconComponent = ICON_OPTIONS[iconName as keyof typeof ICON_OPTIONS] || AlertTriangle

  const handleIconChange = (newIconName: string) => {
    onChange?.(newIconName, iconColor, iconSize)
    setIsEditing(false)
  }

  const handleColorChange = (newColor: string) => {
    onChange?.(iconName, newColor, iconSize)
  }

  const handleSizeChange = (newSize: string) => {
    onChange?.(iconName, iconColor, newSize)
  }

  const handleAiImprove = () => {
    const context = `Current icon: ${iconName}, color: ${iconColor}, size: ${iconSize}`
    onAiImprove?.(context)
  }

  if (!editable) {
    return <IconComponent className={`${iconColor} ${iconSize} ${className}`} />
  }

  return (
    <div 
      className={`relative inline-block group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Icon */}
      <motion.div
        className="relative cursor-pointer"
        whileHover={{ scale: 1.1 }}
        onClick={() => editable && setIsEditing(!isEditing)}
      >
        <IconComponent className={`${iconColor} ${iconSize} transition-all duration-200`} />
        
        {/* Edit Indicator */}
        {editable && isHovered && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Edit3 className="w-2 h-2 text-white" />
          </motion.div>
        )}
      </motion.div>

      {/* Editing Panel */}
      {isEditing && (
        <motion.div
          className="absolute top-full left-0 mt-2 bg-slate-900/95 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-2xl z-50 min-w-64"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
        >
          {/* Icon Selection */}
          <div className="mb-4">
            <h4 className="text-white text-sm font-medium mb-2">Choose Icon</h4>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(ICON_OPTIONS).map(([name, Icon]) => (
                <button
                  key={name}
                  onClick={() => handleIconChange(name)}
                  className={`p-2 rounded-lg border transition-all duration-200 ${
                    iconName === name 
                      ? 'border-blue-400 bg-blue-500/20' 
                      : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${iconColor}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-4">
            <h4 className="text-white text-sm font-medium mb-2">Color</h4>
            <div className="grid grid-cols-5 gap-2">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                    iconColor === color 
                      ? 'border-white scale-110' 
                      : 'border-white/20 hover:border-white/60'
                  }`}
                >
                  <div className={`w-full h-full rounded-full ${color.replace('text-', 'bg-')}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-4">
            <h4 className="text-white text-sm font-medium mb-2">Size</h4>
            <div className="grid grid-cols-3 gap-2">
              {SIZE_OPTIONS.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`p-2 rounded-lg border text-center transition-all duration-200 ${
                    iconSize === size 
                      ? 'border-blue-400 bg-blue-500/20' 
                      : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                  }`}
                >
                  <IconComponent className={`${iconColor} ${size} mx-auto`} />
                </button>
              ))}
            </div>
          </div>

          {/* AI Improve Button */}
          {onAiImprove && (
            <button
              onClick={handleAiImprove}
              className="w-full px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              AI Improve
            </button>
          )}

          {/* Close Button */}
          <button
            onClick={() => setIsEditing(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all duration-200"
          >
            ×
          </button>
        </motion.div>
      )}
    </div>
  )
}
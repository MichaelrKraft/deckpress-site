"use client"

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, 
  Image as ImageIcon, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Edit3,
  Sparkles,
  X,
  Download,
  Trash2
} from 'lucide-react'

interface GraphicsData {
  type: 'image' | 'chart' | 'placeholder' | 'shape'
  src?: string
  alt?: string
  size?: string
  opacity?: number
  data?: any
  shape?: string
  color?: string
  rotation?: number
  borderRadius?: string
  filter?: string
}

interface EditableGraphicsProps {
  graphics: GraphicsData
  onChange?: (graphics: GraphicsData) => void
  onAiImprove?: (context: string) => void
  className?: string
  editable?: boolean
}

export function EditableGraphics({ 
  graphics, 
  onChange,
  onAiImprove,
  className = '',
  editable = true
}: EditableGraphicsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB')
      return
    }

    setUploadError(null)

    // Create object URL for preview
    const reader = new FileReader()
    reader.onload = (e) => {
      const newGraphics: GraphicsData = {
        type: 'image',
        src: e.target?.result as string,
        alt: file.name,
        size: graphics.size || 'w-24 h-24',
        opacity: graphics.opacity || 1
      }
      onChange?.(newGraphics)
      setIsEditing(false)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveGraphic = () => {
    const newGraphics: GraphicsData = {
      type: 'placeholder',
      size: graphics.size || 'w-24 h-24',
      opacity: 0.5
    }
    onChange?.(newGraphics)
    setIsEditing(false)
  }

  const handleSizeChange = (newSize: string) => {
    onChange?.({
      ...graphics,
      size: newSize
    })
  }

  const handleOpacityChange = (newOpacity: number) => {
    onChange?.({
      ...graphics,
      opacity: newOpacity
    })
  }

  const handleAiImprove = () => {
    const context = `Current graphics: type=${graphics.type}, size=${graphics.size}, has content=${!!graphics.src}`
    onAiImprove?.(context)
  }

  const renderGraphic = () => {
    const sizeClass = graphics.size || 'w-24 h-24'
    const opacityStyle = { opacity: graphics.opacity || 1 }

    switch (graphics.type) {
      case 'image':
        return graphics.src ? (
          <img 
            src={graphics.src} 
            alt={graphics.alt || 'Uploaded image'} 
            className={`${sizeClass} object-cover rounded-lg`}
            style={opacityStyle}
          />
        ) : (
          <div className={`${sizeClass} bg-white/10 rounded-lg flex items-center justify-center`} style={opacityStyle}>
            <ImageIcon className="w-8 h-8 text-white/50" />
          </div>
        )
      
      case 'chart':
        return (
          <div className={`${sizeClass} bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-white/20`} style={opacityStyle}>
            <BarChart3 className="w-8 h-8 text-white/70" />
          </div>
        )
      
      case 'shape':
        return (
          <div className={`${sizeClass} bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-white/20`} style={opacityStyle}>
            <div className="w-8 h-8 bg-white/30 rounded-full" />
          </div>
        )
      
      case 'placeholder':
      default:
        return (
          <div className={`${sizeClass} bg-white/5 border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center gap-2`} style={opacityStyle}>
            <Upload className="w-6 h-6 text-white/50" />
            <span className="text-xs text-white/50 text-center px-1">Add graphic</span>
          </div>
        )
    }
  }

  if (!editable) {
    return <div className={className}>{renderGraphic()}</div>
  }

  return (
    <div 
      className={`relative inline-block group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Graphic */}
      <motion.div
        className="relative cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onClick={() => editable && setIsEditing(!isEditing)}
      >
        {renderGraphic()}
        
        {/* Edit Indicator */}
        {editable && isHovered && (
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Edit3 className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </motion.div>

      {/* Editing Panel */}
      {isEditing && (
        <motion.div
          className="absolute top-full left-0 mt-2 bg-slate-900/95 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-2xl z-50 min-w-72"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
        >
          {/* Upload Section */}
          <div className="mb-4">
            <h4 className="text-white text-sm font-medium mb-2">Upload Graphic</h4>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-3 border-2 border-dashed border-white/20 rounded-lg hover:border-white/40 transition-all duration-200 flex flex-col items-center gap-2"
            >
              <Upload className="w-5 h-5 text-white/60" />
              <span className="text-white/60 text-sm">Click to upload image</span>
              <span className="text-white/40 text-xs">PNG, JPG, GIF up to 5MB</span>
            </button>
            {uploadError && (
              <p className="text-red-400 text-xs mt-1">{uploadError}</p>
            )}
          </div>

          {/* Size Selection */}
          <div className="mb-4">
            <h4 className="text-white text-sm font-medium mb-2">Size</h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Small', value: 'w-16 h-16' },
                { label: 'Medium', value: 'w-24 h-24' },
                { label: 'Large', value: 'w-32 h-32' },
                { label: 'XL', value: 'w-40 h-40' },
                { label: 'Full', value: 'w-full h-48' },
                { label: 'Square', value: 'w-48 h-48' }
              ].map((size) => (
                <button
                  key={size.value}
                  onClick={() => handleSizeChange(size.value)}
                  className={`p-2 rounded-lg border text-center transition-all duration-200 ${
                    graphics.size === size.value 
                      ? 'border-blue-400 bg-blue-500/20' 
                      : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                  }`}
                >
                  <span className="text-white text-xs">{size.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Opacity Control */}
          <div className="mb-4">
            <h4 className="text-white text-sm font-medium mb-2">Opacity</h4>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={graphics.opacity || 1}
              onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/60 mt-1">
              <span>10%</span>
              <span>{Math.round((graphics.opacity || 1) * 100)}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {graphics.type !== 'placeholder' && (
              <button
                onClick={handleRemoveGraphic}
                className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            )}
            
            {onAiImprove && (
              <button
                onClick={handleAiImprove}
                className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                AI Improve
              </button>
            )}
          </div>

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
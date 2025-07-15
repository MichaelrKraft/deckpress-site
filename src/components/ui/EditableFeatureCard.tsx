"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Trash2, GripVertical, Sparkles, ChevronDown, ChevronUp,
  CheckCircle, Star, Zap, Rocket, Target, Award, Shield, Lightbulb,
  Gauge, Users, TrendingUp, Clock, DollarSign, Globe, Heart,
  ThumbsUp, Briefcase, Settings, Cpu, Database, Lock
} from 'lucide-react'

export interface FeatureCard {
  id: string
  icon: string
  iconColor?: string
  title: string
  description: string
  isHighlighted?: boolean
}

interface EditableFeatureCardProps {
  features: FeatureCard[]
  onChange: (features: FeatureCard[]) => void
  onAiImprove?: (features: FeatureCard[]) => void
  maxFeatures?: number
  variant?: 'card' | 'inline' | 'compact'
  className?: string
}

// Available icons for feature cards
const FEATURE_ICONS = {
  CheckCircle, Star, Zap, Rocket, Target, Award, Shield, Lightbulb,
  Gauge, Users, TrendingUp, Clock, DollarSign, Globe, Heart,
  ThumbsUp, Briefcase, Settings, Cpu, Database, Lock
}

const ICON_COLORS = [
  'text-blue-400', 'text-green-400', 'text-purple-400', 'text-orange-400',
  'text-red-400', 'text-cyan-400', 'text-yellow-400', 'text-pink-400',
  'text-indigo-400', 'text-emerald-400', 'text-amber-400', 'text-rose-400'
]

export function EditableFeatureCard({ 
  features, 
  onChange, 
  onAiImprove, 
  maxFeatures = 6,
  variant = 'card',
  className = ''
}: EditableFeatureCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingFeature, setEditingFeature] = useState<string | null>(null)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [showIconPicker, setShowIconPicker] = useState<string | null>(null)

  // Generate unique ID for new features
  const generateId = () => `feature_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Add new feature
  const addFeature = () => {
    if (features.length >= maxFeatures) return

    const newFeature: FeatureCard = {
      id: generateId(),
      icon: 'Star',
      iconColor: ICON_COLORS[features.length % ICON_COLORS.length],
      title: 'New Feature',
      description: 'Describe this feature...'
    }

    onChange([...features, newFeature])
    setEditingFeature(newFeature.id)
  }

  // Remove feature
  const removeFeature = (id: string) => {
    onChange(features.filter(f => f.id !== id))
  }

  // Update feature
  const updateFeature = (id: string, updates: Partial<FeatureCard>) => {
    onChange(features.map(f => 
      f.id === id ? { ...f, ...updates } : f
    ))
  }

  // Reorder features
  const reorderFeatures = (fromIndex: number, toIndex: number) => {
    const newFeatures = [...features]
    const [removed] = newFeatures.splice(fromIndex, 1)
    newFeatures.splice(toIndex, 0, removed)
    onChange(newFeatures)
  }

  // Handle drag and drop
  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== index) {
      reorderFeatures(draggedIndex, index)
      setDraggedIndex(index)
    }
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  // Get icon component
  const getIconComponent = (iconName: string) => {
    return FEATURE_ICONS[iconName as keyof typeof FEATURE_ICONS] || Star
  }

  // Handle AI improvement
  const handleAiImprove = () => {
    if (onAiImprove) {
      onAiImprove(features)
    }
  }

  const containerClasses = {
    card: 'grid grid-cols-1 md:grid-cols-2 gap-4',
    inline: 'space-y-3',
    compact: 'grid grid-cols-1 gap-2'
  }

  const featureClasses = {
    card: 'glass-card p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300',
    inline: 'flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300',
    compact: 'flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300'
  }

  return (
    <div className={`relative ${className}`}>
      {/* AI Improve Button */}
      {onAiImprove && (
        <motion.button
          onClick={handleAiImprove}
          className="absolute -top-2 -right-2 z-10 p-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-full border border-purple-500/30 transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
        </motion.button>
      )}

      <div className={containerClasses[variant]}>
        <AnimatePresence>
          {features.map((feature, index) => {
            const IconComponent = getIconComponent(feature.icon)
            const isEditing = editingFeature === feature.id

            return (
              <motion.div
                key={feature.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`${featureClasses[variant]} group relative`}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
              >
                {/* Drag Handle */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-60 transition-opacity cursor-move">
                  <GripVertical className="w-4 h-4 text-white/60" />
                </div>

                {/* Remove Button */}
                {features.length > 1 && (
                  <button
                    onClick={() => removeFeature(feature.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                )}

                <div className={variant === 'card' ? 'text-center' : 'flex-1'}>
                  {/* Icon */}
                  <div className={`${variant === 'card' ? 'mx-auto mb-4' : 'mb-2'} relative`}>
                    <button
                      onClick={() => setShowIconPicker(showIconPicker === feature.id ? null : feature.id)}
                      className="relative group/icon"
                    >
                      <div className={`${variant === 'compact' ? 'w-8 h-8' : 'w-12 h-12'} bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300`}>
                        <IconComponent className={`${variant === 'compact' ? 'w-4 h-4' : 'w-6 h-6'} ${feature.iconColor || 'text-blue-400'}`} />
                      </div>
                      <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover/icon:opacity-100 transition-opacity flex items-center justify-center">
                        <Settings className="w-3 h-3 text-white/60" />
                      </div>
                    </button>

                    {/* Icon Picker */}
                    <AnimatePresence>
                      {showIconPicker === feature.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute z-50 top-full mt-2 left-1/2 transform -translate-x-1/2 bg-slate-800/95 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-2xl"
                        >
                          <div className="grid grid-cols-6 gap-2 mb-3">
                            {Object.keys(FEATURE_ICONS).map(iconName => {
                              const Icon = FEATURE_ICONS[iconName as keyof typeof FEATURE_ICONS]
                              return (
                                <button
                                  key={iconName}
                                  onClick={() => {
                                    updateFeature(feature.id, { icon: iconName })
                                    setShowIconPicker(null)
                                  }}
                                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                  <Icon className={`w-4 h-4 ${feature.iconColor || 'text-blue-400'}`} />
                                </button>
                              )
                            })}
                          </div>
                          <div className="grid grid-cols-6 gap-1">
                            {ICON_COLORS.map(color => (
                              <button
                                key={color}
                                onClick={() => {
                                  updateFeature(feature.id, { iconColor: color })
                                  setShowIconPicker(null)
                                }}
                                className={`w-6 h-6 rounded-full border-2 ${color.replace('text-', 'bg-').replace('-400', '-500')} ${feature.iconColor === color ? 'border-white' : 'border-white/20'}`}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Title */}
                  <div className="mb-2">
                    {isEditing ? (
                      <input
                        value={feature.title}
                        onChange={(e) => updateFeature(feature.id, { title: e.target.value })}
                        onBlur={() => setEditingFeature(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') setEditingFeature(null)
                          if (e.key === 'Escape') setEditingFeature(null)
                        }}
                        autoFocus
                        className="w-full bg-transparent border-b border-white/30 focus:border-white/60 outline-none text-white font-semibold text-center"
                      />
                    ) : (
                      <h4
                        onClick={() => setEditingFeature(feature.id)}
                        className={`${variant === 'compact' ? 'text-sm' : 'text-lg'} font-semibold text-white cursor-pointer hover:text-white/80 transition-colors`}
                      >
                        {feature.title}
                      </h4>
                    )}
                  </div>

                  {/* Description */}
                  {variant !== 'compact' && (
                    <div>
                      {isEditing ? (
                        <textarea
                          value={feature.description}
                          onChange={(e) => updateFeature(feature.id, { description: e.target.value })}
                          onBlur={() => setEditingFeature(null)}
                          className="w-full bg-transparent border border-white/20 rounded-lg p-2 focus:border-white/40 outline-none text-white/80 text-sm resize-none"
                          rows={2}
                        />
                      ) : (
                        <p
                          onClick={() => setEditingFeature(feature.id)}
                          className="text-white/70 text-sm cursor-pointer hover:text-white/90 transition-colors leading-relaxed"
                        >
                          {feature.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Add Feature Button */}
        {features.length < maxFeatures && (
          <motion.button
            onClick={addFeature}
            className={`${featureClasses[variant]} border-dashed border-white/30 hover:border-white/50 flex items-center justify-center group`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <Plus className="w-8 h-8 text-white/40 group-hover:text-white/60 mx-auto mb-2" />
              <span className="text-white/60 group-hover:text-white/80 text-sm">Add Feature</span>
            </div>
          </motion.button>
        )}
      </div>

      {/* Feature Count */}
      <div className="mt-4 text-center">
        <span className="text-xs text-white/40">
          {features.length} of {maxFeatures} features
        </span>
      </div>
    </div>
  )
}
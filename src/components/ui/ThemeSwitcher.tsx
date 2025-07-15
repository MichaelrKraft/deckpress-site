"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Palette, ChevronDown, Check, Sparkles, Zap, 
  Monitor, Terminal, Grid3x3, Brush, Layers
} from 'lucide-react'
import { DECK_THEMES, DeckTheme } from '@/lib/deck-generator'

interface ThemeSwitcherProps {
  currentTheme: string
  onThemeChange: (themeId: string) => void
  variant?: 'dropdown' | 'grid' | 'compact'
  className?: string
}

const THEME_ICONS = {
  modern: Monitor,
  vibrant: Sparkles,
  minimal: Grid3x3,
  corporate: Layers,
  startup: Zap,
  investor: Brush,
  neonCyberpunk: Terminal,
  glassMorphism: Layers,
  gradientMesh: Brush,
  retroTerminal: Terminal,
  brutalistModern: Grid3x3
}

export function ThemeSwitcher({ 
  currentTheme, 
  onThemeChange, 
  variant = 'dropdown',
  className = '' 
}: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [previewTheme, setPreviewTheme] = useState<string | null>(null)

  const themes = Object.values(DECK_THEMES)
  const currentThemeData = DECK_THEMES[currentTheme] || DECK_THEMES.modern

  const handleThemeSelect = (themeId: string) => {
    onThemeChange(themeId)
    setIsOpen(false)
    setPreviewTheme(null)
  }

  const getThemePreview = (theme: DeckTheme) => {
    return (
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: theme.colors.primary }}
          />
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: theme.colors.secondary }}
          />
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: theme.colors.accent }}
          />
        </div>
        <span className="text-sm font-medium text-white">{theme.name}</span>
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
        {themes.map((theme) => {
          const IconComponent = THEME_ICONS[theme.id as keyof typeof THEME_ICONS] || Palette
          const isSelected = currentTheme === theme.id
          
          return (
            <motion.button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                isSelected 
                  ? 'border-white/40 bg-white/10' 
                  : 'border-white/10 hover:border-white/20 hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <IconComponent className="w-6 h-6 text-white/80" />
                </div>
                
                <div className="flex justify-center gap-1 mb-2">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: theme.colors.secondary }}
                  />
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                </div>
                
                <h3 className="text-sm font-medium text-white">{theme.name}</h3>
                <p className="text-xs text-white/60 mt-1">
                  {theme.id.includes('neon') ? 'Futuristic' :
                   theme.id.includes('glass') ? 'Modern' :
                   theme.id.includes('gradient') ? 'Colorful' :
                   theme.id.includes('retro') ? 'Vintage' :
                   theme.id.includes('brutalist') ? 'Bold' :
                   'Professional'}
                </p>
              </div>
            </motion.button>
          )
        })}
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`flex gap-2 ${className}`}>
        {themes.map((theme) => {
          const isSelected = currentTheme === theme.id
          
          return (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              className={`relative w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                isSelected 
                  ? 'border-white/60 scale-110' 
                  : 'border-white/20 hover:border-white/40 hover:scale-105'
              }`}
              style={{ 
                background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)` 
              }}
              title={theme.name}
            >
              {isSelected && (
                <Check className="w-3 h-3 text-white" />
              )}
            </button>
          )
        })}
      </div>
    )
  }

  // Default dropdown variant
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg transition-all duration-300 min-w-[200px]"
      >
        <Palette className="w-4 h-4 text-white/80" />
        {getThemePreview(currentThemeData)}
        <ChevronDown className={`w-4 h-4 text-white/60 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full mt-2 left-0 right-0 bg-slate-800/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl z-50 py-2"
          >
            {themes.map((theme) => {
              const IconComponent = THEME_ICONS[theme.id as keyof typeof THEME_ICONS] || Palette
              const isSelected = currentTheme === theme.id
              
              return (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  onMouseEnter={() => setPreviewTheme(theme.id)}
                  onMouseLeave={() => setPreviewTheme(null)}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-all duration-200 ${
                    isSelected ? 'bg-white/10' : ''
                  }`}
                >
                  <IconComponent className="w-4 h-4 text-white/80" />
                  {getThemePreview(theme)}
                  {isSelected && <Check className="w-4 h-4 text-green-400 ml-auto" />}
                </button>
              )
            })}
            
            <div className="border-t border-white/10 mt-2 pt-2 px-4">
              <p className="text-xs text-white/60">
                {themes.length} themes available • Changes apply instantly
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Preview Tooltip */}
      <AnimatePresence>
        {previewTheme && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute left-full top-0 ml-2 p-3 bg-slate-900/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl z-50"
          >
            <div className="text-xs text-white/80">
              Preview: <span className="font-medium">{DECK_THEMES[previewTheme].name}</span>
            </div>
            <div className="flex gap-1 mt-1">
              <div 
                className="w-4 h-4 rounded" 
                style={{ backgroundColor: DECK_THEMES[previewTheme].colors.primary }}
              />
              <div 
                className="w-4 h-4 rounded" 
                style={{ backgroundColor: DECK_THEMES[previewTheme].colors.secondary }}
              />
              <div 
                className="w-4 h-4 rounded" 
                style={{ backgroundColor: DECK_THEMES[previewTheme].colors.accent }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
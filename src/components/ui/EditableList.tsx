"use client"

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, GripVertical, Sparkles } from 'lucide-react'
import { EditableText } from './EditableText'

interface EditableListProps {
  items: string[]
  onChange: (items: string[]) => void
  variant?: 'bullet' | 'number' | 'check'
  className?: string
  onAiImprove?: (items: string[]) => void
  maxItems?: number
}

export function EditableList({
  items,
  onChange,
  variant = 'bullet',
  className = "",
  onAiImprove,
  maxItems = 10
}: EditableListProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleItemChange = useCallback((index: number, newContent: string) => {
    const newItems = [...items]
    newItems[index] = newContent
    onChange(newItems)
  }, [items, onChange])

  const handleAddItem = useCallback(() => {
    if (items.length < maxItems) {
      onChange([...items, ''])
    }
  }, [items, onChange, maxItems])

  const handleRemoveItem = useCallback((index: number) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index)
      onChange(newItems)
    }
  }, [items, onChange])

  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    
    if (draggedIndex === null || draggedIndex === dropIndex) return

    const newItems = [...items]
    const [draggedItem] = newItems.splice(draggedIndex, 1)
    newItems.splice(dropIndex, 0, draggedItem)
    
    onChange(newItems)
    setDraggedIndex(null)
  }, [draggedIndex, items, onChange])

  const handleAiClick = useCallback(() => {
    if (onAiImprove) {
      onAiImprove(items)
    }
  }, [onAiImprove, items])

  const getIcon = (index: number) => {
    switch (variant) {
      case 'number':
        return (
          <span className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-sm font-bold">
            {index + 1}
          </span>
        )
      case 'check':
        return (
          <div className="w-6 h-6 bg-green-500/20 rounded border-2 border-green-400/50 flex items-center justify-center">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
          </div>
        )
      default:
        return (
          <div className="w-2 h-2 bg-blue-400 rounded-full mt-3" />
        )
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* AI Improve Button */}
      {onAiImprove && (
        <div className="flex justify-end mb-2">
          <motion.button
            onClick={handleAiClick}
            className="group flex items-center gap-2 px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg border border-purple-500/30 text-purple-300 hover:text-purple-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI Improve List</span>
          </motion.button>
        </div>
      )}

      {/* List Items */}
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`group flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors ${
              draggedIndex === index ? 'opacity-50' : ''
            }`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {/* Drag Handle */}
            <div className="opacity-0 group-hover:opacity-50 transition-opacity cursor-grab active:cursor-grabbing pt-2">
              <GripVertical className="w-4 h-4 text-white/50" />
            </div>

            {/* List Icon/Number */}
            <div className="flex-shrink-0 mt-1">
              {getIcon(index)}
            </div>

            {/* Editable Content */}
            <div className="flex-1">
              <EditableText
                content={item}
                onChange={(newContent) => handleItemChange(index, newContent)}
                placeholder="Enter list item..."
                className="text-white/90 leading-relaxed"
                multiline={true}
                enableFormatting={true}
                variant="p"
              />
            </div>

            {/* Remove Button */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <motion.button
                onClick={() => handleRemoveItem(index)}
                disabled={items.length <= 1}
                className="p-1 hover:bg-red-500/20 rounded text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add Item Button */}
      {items.length < maxItems && (
        <motion.button
          onClick={handleAddItem}
          className="group flex items-center gap-3 p-2 w-full rounded-lg border-2 border-dashed border-white/20 hover:border-white/40 transition-colors text-white/60 hover:text-white/80"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="opacity-0 transition-opacity">
            <GripVertical className="w-4 h-4" />
          </div>
          
          <div className="flex-shrink-0">
            <Plus className="w-5 h-5 text-blue-400" />
          </div>
          
          <span className="text-sm font-medium">Add item...</span>
        </motion.button>
      )}

      {/* Items Counter */}
      <div className="text-xs text-white/50 text-center">
        {items.length} of {maxItems} items
      </div>
    </div>
  )
}
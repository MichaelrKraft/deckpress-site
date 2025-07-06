"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Link,
  List,
  ListOrdered,
  Sparkles,
  Check,
  X
} from 'lucide-react'

interface EditableTextProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
  multiline?: boolean
  enableFormatting?: boolean
  variant?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  onAiImprove?: (content: string) => void
}

export function EditableText({
  content,
  onChange,
  placeholder = "Click to edit...",
  className = "",
  multiline = false,
  enableFormatting = true,
  variant = 'p',
  onAiImprove
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [showToolbar, setShowToolbar] = useState(false)
  const [localContent, setLocalContent] = useState(content)
  const editableRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)

  // Update local content when prop changes
  useEffect(() => {
    setLocalContent(content)
  }, [content])

  const handleClick = useCallback(() => {
    if (!isEditing) {
      setIsEditing(true)
      setShowToolbar(enableFormatting)
      setTimeout(() => {
        if (editableRef.current) {
          editableRef.current.focus()
          // Place cursor at end
          const range = document.createRange()
          const selection = window.getSelection()
          range.selectNodeContents(editableRef.current)
          range.collapse(false)
          selection?.removeAllRanges()
          selection?.addRange(range)
        }
      }, 0)
    }
  }, [isEditing, enableFormatting])

  const handleBlur = useCallback((e: React.FocusEvent) => {
    // Don't blur if clicking on toolbar
    if (toolbarRef.current?.contains(e.relatedTarget as Node)) {
      return
    }
    
    setIsEditing(false)
    setShowToolbar(false)
    
    const newContent = editableRef.current?.innerHTML || ''
    if (newContent !== content) {
      onChange(newContent)
    }
  }, [content, onChange])

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value)
    editableRef.current?.focus()
  }, [])

  const handleInput = useCallback(() => {
    const newContent = editableRef.current?.innerHTML || ''
    setLocalContent(newContent)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Save on Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      setIsEditing(false)
      setShowToolbar(false)
      const newContent = editableRef.current?.innerHTML || ''
      onChange(newContent)
      return
    }

    // Escape to cancel
    if (e.key === 'Escape') {
      e.preventDefault()
      setIsEditing(false)
      setShowToolbar(false)
      if (editableRef.current) {
        editableRef.current.innerHTML = content
      }
      return
    }

    // Prevent new lines in single-line mode
    if (!multiline && e.key === 'Enter') {
      e.preventDefault()
      return
    }

    // Keyboard shortcuts for formatting
    if ((e.ctrlKey || e.metaKey) && enableFormatting) {
      switch (e.key) {
        case 'b':
          e.preventDefault()
          execCommand('bold')
          break
        case 'i':
          e.preventDefault()
          execCommand('italic')
          break
        case 'u':
          e.preventDefault()
          execCommand('underline')
          break
      }
    }
  }, [content, onChange, multiline, enableFormatting, execCommand])

  const handleFormatCommand = useCallback((command: string, value?: string) => {
    execCommand(command, value)
    const newContent = editableRef.current?.innerHTML || ''
    setLocalContent(newContent)
  }, [execCommand])

  const handleAiClick = useCallback(() => {
    if (onAiImprove && localContent) {
      onAiImprove(localContent)
    }
  }, [onAiImprove, localContent])

  return (
    <div className="relative group">
      {/* Editable Content */}
      <div
        ref={editableRef}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onClick={handleClick}
        onBlur={handleBlur}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: localContent || '' }}
        className={`
          ${className}
          ${isEditing 
            ? 'outline-none ring-2 ring-blue-400/50 bg-white/5 rounded-lg px-2 py-1' 
            : 'hover:bg-white/5 hover:rounded-lg hover:px-2 hover:py-1 transition-all cursor-pointer'
          }
          ${!localContent && !isEditing ? 'text-white/50' : ''}
        `}
        data-placeholder={!localContent && !isEditing ? placeholder : undefined}
        style={{
          minHeight: isEditing ? '1.5em' : undefined,
        }}
      />

      {/* Hover Indicators */}
      {!isEditing && (
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
          {onAiImprove && (
            <motion.button
              onClick={handleAiClick}
              className="p-1 bg-purple-500/80 hover:bg-purple-500 rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-3 h-3 text-white" />
            </motion.button>
          )}
        </div>
      )}

      {/* Formatting Toolbar */}
      <AnimatePresence>
        {showToolbar && isEditing && enableFormatting && (
          <motion.div
            ref={toolbarRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-14 left-0 z-50 bg-slate-800 border border-white/20 rounded-lg shadow-xl p-2 flex items-center gap-1"
          >
            {/* Text Formatting */}
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleFormatCommand('bold')}
              className="p-2 hover:bg-white/10 rounded text-white/70 hover:text-white"
              title="Bold (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </button>
            
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleFormatCommand('italic')}
              className="p-2 hover:bg-white/10 rounded text-white/70 hover:text-white"
              title="Italic (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </button>
            
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleFormatCommand('underline')}
              className="p-2 hover:bg-white/10 rounded text-white/70 hover:text-white"
              title="Underline (Ctrl+U)"
            >
              <Underline className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-white/20 mx-1" />

            {/* Alignment */}
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleFormatCommand('justifyLeft')}
              className="p-2 hover:bg-white/10 rounded text-white/70 hover:text-white"
              title="Align Left"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleFormatCommand('justifyCenter')}
              className="p-2 hover:bg-white/10 rounded text-white/70 hover:text-white"
              title="Align Center"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleFormatCommand('justifyRight')}
              className="p-2 hover:bg-white/10 rounded text-white/70 hover:text-white"
              title="Align Right"
            >
              <AlignRight className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-white/20 mx-1" />

            {/* Lists */}
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleFormatCommand('insertUnorderedList')}
              className="p-2 hover:bg-white/10 rounded text-white/70 hover:text-white"
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>
            
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleFormatCommand('insertOrderedList')}
              className="p-2 hover:bg-white/10 rounded text-white/70 hover:text-white"
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-white/20 mx-1" />

            {/* AI Improve */}
            {onAiImprove && (
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleAiClick}
                className="p-2 hover:bg-purple-500/20 rounded text-purple-400 hover:text-purple-300"
                title="AI Improve"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            )}

            {/* Save/Cancel */}
            <div className="w-px h-6 bg-white/20 mx-1" />
            
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setIsEditing(false)
                setShowToolbar(false)
                const newContent = editableRef.current?.innerHTML || ''
                onChange(newContent)
              }}
              className="p-2 hover:bg-green-500/20 rounded text-green-400 hover:text-green-300"
              title="Save (Ctrl+Enter)"
            >
              <Check className="w-4 h-4" />
            </button>
            
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setIsEditing(false)
                setShowToolbar(false)
                if (editableRef.current) {
                  editableRef.current.innerHTML = content
                }
                setLocalContent(content)
              }}
              className="p-2 hover:bg-red-500/20 rounded text-red-400 hover:text-red-300"
              title="Cancel (Escape)"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Placeholder styling */}
      <style jsx>{`
        [data-placeholder]:empty::before {
          content: attr(data-placeholder);
          color: rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}
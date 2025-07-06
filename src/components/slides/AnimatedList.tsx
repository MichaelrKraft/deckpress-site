"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react'

interface AnimatedListProps {
  items: string[]
  variant?: 'check' | 'arrow' | 'sparkle' | 'number'
  staggerDelay?: number
  className?: string
  itemClassName?: string
  iconColor?: string
}

export function AnimatedList({ 
  items, 
  variant = 'check',
  staggerDelay = 0.1,
  className = '',
  itemClassName = '',
  iconColor = 'text-green-500'
}: AnimatedListProps) {
  
  const getIcon = (index: number) => {
    switch (variant) {
      case 'check':
        return <CheckCircle className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
      case 'arrow':
        return <ArrowRight className={`w-4 h-4 ${iconColor} flex-shrink-0`} />
      case 'sparkle':
        return <Sparkles className={`w-4 h-4 ${iconColor} flex-shrink-0`} />
      case 'number':
        return (
          <div className={`w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0`}>
            <span className="text-white text-xs font-bold">{index + 1}</span>
          </div>
        )
      default:
        return <CheckCircle className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
    }
  }

  return (
    <ul className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <motion.li
          key={index}
          className={`flex items-start gap-3 ${itemClassName}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * staggerDelay,
            type: "spring",
            stiffness: 100
          }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: index * staggerDelay + 0.2,
              type: "spring",
              stiffness: 200
            }}
            viewport={{ once: true }}
          >
            {getIcon(index)}
          </motion.div>
          <span className="text-gray-700 leading-relaxed font-medium">
            {item}
          </span>
        </motion.li>
      ))}
    </ul>
  )
}
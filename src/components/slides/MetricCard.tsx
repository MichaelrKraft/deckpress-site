"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedCounter } from './AnimatedCounter'

interface MetricCardProps {
  label: string
  value: string
  context?: string
  color?: string
  bgColor?: string
  index?: number
  isNumber?: boolean
}

export function MetricCard({ 
  label, 
  value, 
  context,
  color = 'text-blue-600',
  bgColor = 'bg-gradient-to-br from-blue-50 to-purple-50',
  index = 0,
  isNumber = false
}: MetricCardProps) {
  
  // Extract number from value if it's a number
  const numericValue = isNumber ? parseInt(value.replace(/[^0-9]/g, '')) : 0
  const suffix = isNumber ? value.replace(/[0-9]/g, '') : ''

  return (
    <motion.div
      className={`${bgColor} p-6 rounded-2xl shadow-lg border border-white/20 relative overflow-hidden group hover:shadow-xl transition-all duration-300`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ scale: 1.02, y: -5 }}
      viewport={{ once: true }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-10 translate-x-10" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-8 -translate-x-8" />
      
      <div className="relative z-10">
        <div className="text-center">
          {/* Value */}
          <div className={`text-4xl font-bold mb-2 ${color}`}>
            {isNumber ? (
              <AnimatedCounter 
                from={0} 
                to={numericValue} 
                suffix={suffix}
                duration={1.5}
                color={color}
              />
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                {value}
              </motion.span>
            )}
          </div>
          
          {/* Label */}
          <motion.div
            className="text-lg font-semibold text-gray-700 mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
            viewport={{ once: true }}
          >
            {label}
          </motion.div>
          
          {/* Context */}
          {context && (
            <motion.p
              className="text-sm text-gray-600 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
              viewport={{ once: true }}
            >
              {context}
            </motion.p>
          )}
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderRadius: 'inherit' }}
      />
    </motion.div>
  )
}
"use client"

import React from 'react'
import { motion, useInView } from 'framer-motion'

interface ProgressBarProps {
  percentage: number
  label?: string
  color?: string
  height?: string
  className?: string
}

export function ProgressBar({ 
  percentage, 
  label, 
  color = 'bg-gradient-to-r from-blue-500 to-purple-600',
  height = 'h-3',
  className = ''
}: ProgressBarProps) {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div className={`w-full ${className}`} ref={ref}>
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-medium text-gray-700">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
        <motion.div
          className={`${height} ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  )
}
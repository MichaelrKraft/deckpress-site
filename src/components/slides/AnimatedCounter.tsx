"use client"

import React, { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  color?: string
}

export function AnimatedCounter({ 
  from, 
  to, 
  duration = 2, 
  suffix = '', 
  prefix = '',
  className = '',
  color = 'text-gray-900'
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      const increment = (to - from) / (duration * 60) // 60fps
      let currentCount = from
      
      const timer = setInterval(() => {
        currentCount += increment
        if (currentCount >= to) {
          setCount(to)
          clearInterval(timer)
        } else {
          setCount(Math.floor(currentCount))
        }
      }, 1000 / 60)

      return () => clearInterval(timer)
    }
  }, [inView, from, to, duration])

  return (
    <motion.span
      ref={ref}
      className={`${className} ${color} font-bold`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  )
}
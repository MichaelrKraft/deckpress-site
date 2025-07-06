"use client"

import React, { useEffect, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function AnimatedCounter({ 
  from, 
  to, 
  duration = 2, 
  suffix = '', 
  prefix = '',
  className = ''
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const controls = useAnimation()
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
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  )
}
"use client"

import React, { useEffect, useState, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export const AnimatedCounter = React.memo(function AnimatedCounter({ 
  from, 
  to, 
  duration = 2, 
  suffix = '', 
  prefix = '',
  className = ''
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const animationRef = useRef<number>()

  useEffect(() => {
    if (inView) {
      const startTime = Date.now()
      const startValue = from
      const totalChange = to - from
      const animationDuration = duration * 1000

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / animationDuration, 1)
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = startValue + (totalChange * easeOutQuart)
        
        setCount(Math.floor(currentValue))
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          setCount(to)
        }
      }
      
      animationRef.current = requestAnimationFrame(animate)
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
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
})

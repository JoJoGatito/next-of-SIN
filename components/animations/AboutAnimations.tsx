'use client'

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { ReactNode, useRef, useEffect, useState } from 'react'

// Animated section wrapper with fade-in and slide-up effect
export function AnimatedSection({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Floating decorative shapes
export function FloatingShape({ 
  className = "",
  size = 100,
  color = "orange",
  delay = 0 
}: {
  className?: string
  size?: number
  color?: string
  delay?: number
}) {
  const colorMap: Record<string, string> = {
    orange: 'rgb(255, 138, 0)',
    yellow: 'rgb(255, 214, 0)',
    red: 'rgb(255, 61, 0)'
  }
  
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.4, 0.7, 0.4],
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colorMap[color] || colorMap.orange} 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(30px)',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  )
}

// Parallax scroll effect component
export function ParallaxText({ 
  children, 
  baseVelocity = 100 
}: {
  children: string
  baseVelocity?: number
}) {
  const baseX = useSpring(0, { stiffness: 100, damping: 30 })
  const { scrollY } = useScroll()
  const scrollVelocity = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
  })
  
  const velocityFactor = useTransform(scrollVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })
  
  const x = useTransform(baseX, (v) => `${v}%`)

  useEffect(() => {
    const unsubscribe = velocityFactor.on("change", (latest) => {
      baseX.set(baseX.get() + latest * baseVelocity / 1000)
    })
    return unsubscribe
  }, [baseX, baseVelocity, velocityFactor])

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div className="inline-block" style={{ x }}>
        <span className="text-6xl md:text-8xl font-bold opacity-10">
          {children} • {children} • {children} • {children} •
        </span>
      </motion.div>
    </div>
  )
}

// Animated counter for statistics
export function CountUp({ 
  end, 
  suffix = "",
  prefix = "",
  duration = 2 
}: {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime
      const progress = Math.min(elapsedTime / (duration * 1000), 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(end * easeOutQuart)
      
      setCount(currentCount)
      
      if (progress >= 1) {
        clearInterval(timer)
        setCount(end)
      }
    }, 16) // ~60fps

    return () => clearInterval(timer)
  }, [end, duration, isInView])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

// Staggered children animation
export function StaggeredContainer({ 
  children,
  className = ""
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredItem({ 
  children,
  className = ""
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut"
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Morphing blob shape
export function MorphingBlob({ 
  className = "",
  color = "orange"
}: {
  className?: string
  color?: string
}) {
  const colorMap: Record<string, string> = {
    orange: 'rgb(255, 138, 0)',
    yellow: 'rgb(255, 214, 0)',
    red: 'rgb(255, 61, 0)'
  }
  
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
        rotate: [0, 360],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        background: `linear-gradient(135deg, ${colorMap[color] || colorMap.orange}, ${colorMap.yellow})`,
        filter: 'blur(30px)',
        opacity: 0.5,
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  )
}

// Reveal on scroll with custom animation
export function RevealOnScroll({ 
  children,
  animation = "fadeUp"
}: {
  children: ReactNode
  animation?: "fadeUp" | "fadeLeft" | "fadeRight" | "scale" | "rotate"
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const animations = {
    fadeUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    fadeLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 }
    },
    fadeRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    rotate: {
      hidden: { opacity: 0, rotate: -10 },
      visible: { opacity: 1, rotate: 0 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animations[animation]}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
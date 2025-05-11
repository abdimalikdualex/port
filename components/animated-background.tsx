"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Shape {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  color: string
  delay: number
}

export default function AnimatedBackground() {
  const [shapes, setShapes] = useState<Shape[]>([])

  useEffect(() => {
    // Generate random shapes
    const colors = [
      "rgba(99, 102, 241, 0.15)", // indigo
      "rgba(139, 92, 246, 0.15)", // purple
      "rgba(236, 72, 153, 0.15)", // pink
      "rgba(59, 130, 246, 0.15)", // blue
    ]

    const newShapes = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 80 + 40,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
    }))

    setShapes(newShapes)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full opacity-70"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            backgroundColor: shape.color,
            width: shape.size,
            height: shape.size,
          }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: [0, 1, 0.9, 1],
            rotate: [0, shape.rotation],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  )
}

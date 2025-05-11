"use client"

import { motion } from "framer-motion"

interface WaveDividerProps {
  flip?: boolean
  color?: string
}

export default function WaveDivider({ flip = false, color = "white" }: WaveDividerProps) {
  return (
    <div className={`relative w-full h-24 ${flip ? "transform rotate-180" : ""}`}>
      <motion.div
        className="absolute w-full h-full"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-full"
          preserveAspectRatio="none"
          fill={color}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          />
        </svg>
      </motion.div>
    </div>
  )
}

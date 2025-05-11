"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import FloatingElement from "./floating-element"

export default function EnhancedHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-white opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white opacity-5"
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: 1,
          }}
        />
      </div>

      <div className="container relative z-10 px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              Master Languages & IT Skills
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="max-w-lg text-lg text-indigo-100 md:text-xl"
            >
              Premium English, Kiswahili, and IT courses taught by industry experts. Learn at your own pace and advance
              your career.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
            >
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-indigo-50 hover:scale-105 transition-transform"
                asChild
              >
                <Link href="/courses">Browse Courses</Link>
              </Button>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-primary"
              >
                Sign Up Now
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 z-10 rounded-xl" />
            <Image
              src="/placeholder.svg?height=800&width=1200"
              alt="Students learning online"
              fill
              className="object-cover"
              priority
            />

            {/* Floating elements */}
            <FloatingElement className="absolute top-10 right-10 z-20" delay={0.5} duration={3}>
              <motion.div
                className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                    <span className="text-white font-bold">A+</span>
                  </div>
                  <div className="text-indigo-900 text-sm font-medium">Top Rated Courses</div>
                </div>
              </motion.div>
            </FloatingElement>

            <FloatingElement className="absolute bottom-10 left-10 z-20" delay={1} duration={4}>
              <motion.div
                className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold">24/7</span>
                  </div>
                  <div className="text-indigo-900 text-sm font-medium">Learn Anytime</div>
                </div>
              </motion.div>
            </FloatingElement>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              className="absolute bottom-4 right-4 bg-white text-indigo-900 rounded-full p-3 shadow-lg z-20"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

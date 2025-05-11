"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Globe, Laptop } from "lucide-react"
import FeaturedCourses from "@/components/featured-courses"
import Testimonials from "@/components/testimonials"
import AnimatedCounter from "@/components/animated-counter"
import AnimatedBackground from "@/components/animated-background"
import ParticleAnimation from "@/components/particle-animation"
import EnhancedHeroSection from "@/components/enhanced-hero-section"
import WaveDivider from "@/components/wave-divider"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50">
      <AnimatedBackground />
      <ParticleAnimation />
      <EnhancedHeroSection />

      <main className="flex-1">
        <WaveDivider color="#f5f3ff" />
        <section className="container px-4 py-12 mx-auto md:py-24">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight text-indigo-900 sm:text-4xl md:text-5xl"
            >
              Specialized Courses for Your Success
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-[700px] text-indigo-700 md:text-xl"
            >
              Our platform offers high-quality language and IT courses taught by industry experts. Advance your career
              with our comprehensive learning materials.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-3 mb-4 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-indigo-900">Language Courses</h3>
              <p className="text-indigo-700">
                English and Kiswahili courses for all levels, from beginner to advanced.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-3 mb-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-500">
                <Laptop className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-indigo-900">IT & Design Courses</h3>
              <p className="text-indigo-700">Web design, graphic design, video editing, and computer packages.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-3 mb-4 rounded-full bg-gradient-to-r from-orange-400 to-pink-500">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-indigo-900">Digital Marketing</h3>
              <p className="text-indigo-700">Online marketing, dropshipping, and other digital business skills.</p>
            </motion.div>
          </div>
        </section>

        <WaveDivider flip={true} color="#f5f3ff" />
        <section className="py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">
                  <AnimatedCounter value={20} duration={2} />+
                </div>
                <p className="text-indigo-100">Courses</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">
                  <AnimatedCounter value={1200} duration={2} />+
                </div>
                <p className="text-indigo-100">Students</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">
                  <AnimatedCounter value={300} duration={2} />+
                </div>
                <p className="text-indigo-100">Video Lessons</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">
                  <AnimatedCounter value={95} duration={2} />%
                </div>
                <p className="text-indigo-100">Satisfaction Rate</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-b from-purple-50 to-white">
          <div className="container px-4 mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-12 text-3xl font-bold tracking-tight text-center text-indigo-900 sm:text-4xl"
            >
              Featured Courses
            </motion.h2>
            <FeaturedCourses />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex justify-center mt-12"
            >
              <Button
                asChild
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              >
                <Link href="/courses">
                  View All Courses <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="container px-4 py-12 mx-auto md:py-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-3xl font-bold tracking-tight text-center text-indigo-900 sm:text-4xl"
          >
            What Our Students Say
          </motion.h2>
          <Testimonials />
        </section>
      </main>
    </div>
  )
}

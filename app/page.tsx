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
import WaveDivider from "@/components/wave-divider"
import AIAnimatedVideo from "@/components/ai-animated-video"
import ChatSupport from "@/components/chat-support"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50">
      <AnimatedBackground />
      <ParticleAnimation />

      <header className="container px-4 pt-8 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold text-indigo-900">Express Academy</div>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/courses">Courses</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </div>

        <div className="mb-12">
          <AIAnimatedVideo />
        </div>
      </header>

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

      <footer className="bg-indigo-900 text-white py-12">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Express Academy</h3>
              <p className="text-indigo-200">
                Premium learning platform for English, Kiswahili, IT, and professional courses.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/courses" className="text-indigo-200 hover:text-white">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-indigo-200 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-indigo-200 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-indigo-200 hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-indigo-200 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-indigo-200 hover:text-white">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-indigo-200 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-indigo-200 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact Us</h4>
              <p className="text-indigo-200 mb-2">Email: info@expressacademy.com</p>
              <p className="text-indigo-200 mb-2">Phone: +254 123 456 789</p>
              <div className="flex gap-4 mt-4">
                <Link href="#" className="text-indigo-200 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-indigo-200 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-indigo-200 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-indigo-800 text-center text-indigo-300">
            <p>&copy; {new Date().getFullYear()} Express Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ChatSupport />
    </div>
  )
}

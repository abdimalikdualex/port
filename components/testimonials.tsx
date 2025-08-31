"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Software Developer",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "The Web Design Masterclass by ABDULMALIK OMAR DUALE helped me transition from a junior to a senior developer. The content is well-structured and the instructor is very knowledgeable.",
    rating: 5,
  },
  {
    id: 2,
    name: "Emily Chen",
    role: "Marketing Specialist",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "I've taken several digital marketing courses taught by ABDULMALIK OMAR DUALE and they've all been excellent. The practical examples and case studies were particularly helpful.",
    rating: 5,
  },
  {
    id: 3,
    name: "David Wilson",
    role: "English Teacher",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Mr. Abdijabar's Advanced English course was comprehensive and well-paced. I was able to apply what I learned immediately in my teaching career.",
    rating: 4,
  },
]

export default function Testimonials() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
        >
          <Card className="h-full border-purple-200 hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="mb-4 italic text-indigo-700">{testimonial.content}</p>
            </CardContent>
            <CardFooter className="flex items-center space-x-4 border-t pt-4">
              <div className="relative w-12 h-12 overflow-hidden rounded-full">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-indigo-900">{testimonial.name}</h4>
                <p className="text-sm text-indigo-600">{testimonial.role}</p>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

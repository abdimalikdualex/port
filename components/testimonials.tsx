"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Abdirahman Hassan",
    role: "Software Developer",
    avatar: "/placeholder.svg?height=100&width=100",
    flag: "/placeholder.svg?height=24&width=36&text=🇸🇴",
    content:
      "Koorsadan Naqshadeynta Websaydhka ee uu dhigayo ABDULMALIK OMAR DUALE waxay iga caawisay inaan ka guuro horumarinta junior ilaa senior. Waxyaabaha la baro waa kuwo si fiican loo habeeyay, macallinkuna waa aqoon yahay.",
    rating: 5,
  },
  {
    id: 2,
    name: "Faadumo Ahmed",
    role: "Marketing Specialist",
    avatar: "/placeholder.svg?height=100&width=100",
    flag: "/placeholder.svg?height=24&width=36&text=🇸🇴",
    content:
      "Waxaan qaatay dhowr koorsadood oo suuq-geyn dhijitaal ah oo uu dhigayo ABDULMALIK OMAR DUALE, dhammaan waxay ahaayeen kuwo heer sare ah. Tusaalooyinka dhab ah iyo daraasadaha kiisaska ayaa gaar ahaan waxtar lahayd.",
    rating: 5,
  },
  {
    id: 3,
    name: "David Wilson",
    role: "English Teacher",
    avatar: "/placeholder.svg?height=100&width=100",
    flag: "/placeholder.svg?height=24&width=36&text=🇬🇧",
    content:
      "Mr. Abdijabar's Advanced English course was comprehensive and well-paced. I was able to apply what I learned immediately in my teaching career.",
    rating: 4,
  },
  {
    id: 4,
    name: "Hodan Mohamed",
    role: "Digital Artist",
    avatar: "/placeholder.svg?height=100&width=100",
    flag: "/placeholder.svg?height=24&width=36&text=🇸🇴",
    content:
      "Koorsada Farshaxanka Dhijitaalka ah ee uu bixiyo ABDULMALIK waxay si weyn u horumarisay xirfadahayga. Casharada waxay ahaayeen kuwo cad oo si fiican loo sharxay, taasoo ka dhigtay waxbarashada mid xiiso leh.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.6,
            delay: index * 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            y: -8,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Card className="h-full border-purple-200 hover:border-purple-300 transition-all duration-300">
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
              <div className="relative">
                <motion.div
                  className="relative w-12 h-12 overflow-hidden rounded-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                {testimonial.flag && (
                  <div className="absolute -bottom-1 -right-1 rounded-full overflow-hidden border-2 border-white">
                    <Image
                      src={testimonial.flag || "/placeholder.svg"}
                      alt="Flag"
                      width={16}
                      height={16}
                      className="w-6 h-6 object-cover"
                    />
                  </div>
                )}
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

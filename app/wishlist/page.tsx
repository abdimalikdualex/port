"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Trash2, ShoppingCart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "@/hooks/use-toast"

interface WishlistItem {
  id: number
  title: string
  image: string
  price: number
  instructor: string
}

export default function WishlistPage() {
  const router = useRouter()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load wishlist from localStorage
    const storedWishlist = localStorage.getItem("wishlist")
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist))
    }
    setIsLoading(false)
  }, [])

  const removeFromWishlist = (id: number) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id)
    setWishlistItems(updatedWishlist)
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))

    toast({
      title: "Removed from wishlist",
      description: "The course has been removed from your wishlist",
    })
  }

  const handleEnroll = (item: WishlistItem) => {
    // Store course info for payment page
    localStorage.setItem("enrollCourse", JSON.stringify(item))
    // Redirect to payment page
    router.push("/payment")
  }

  if (isLoading) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-indigo-700">Loading your wishlist...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 mb-6 text-indigo-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-medium">Your wishlist is empty</h2>
            <p className="mb-6 text-muted-foreground">Browse our courses and add your favorites to the wishlist</p>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="relative h-48">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 rounded-full bg-white/80 text-red-500 hover:bg-white hover:text-red-600"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                    <CardHeader>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">Instructor: {item.instructor}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold text-indigo-700">${item.price}</div>
                    </CardContent>
                    <CardFooter className="flex justify-between gap-4">
                      <Button variant="outline" asChild className="flex-1">
                        <Link href={`/courses/${item.id}`}>View Details</Link>
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                        onClick={() => handleEnroll(item)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Enroll Now
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  )
}

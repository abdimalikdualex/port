"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LockOpenIcon as LockClosedIcon } from "lucide-react"

interface VideoPlayerProps {
  onClose: () => void
  isPremium?: boolean
}

export default function VideoPlayer({ onClose, isPremium = false }: VideoPlayerProps) {
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate checking if user has paid for the course
  useEffect(() => {
    const checkAccess = async () => {
      // In a real app, you would check if the user has paid for the course
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setHasAccess(isPremium)
      setIsLoading(false)
    }

    checkAccess()
  }, [isPremium])

  if (isLoading) {
    return (
      <div className="relative w-full aspect-video bg-muted flex items-center justify-center">
        <div className="text-center">Loading video player...</div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="relative w-full aspect-video bg-muted">
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-10" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <Alert className="max-w-md">
            <LockClosedIcon className="h-5 w-5" />
            <AlertTitle>Premium Content</AlertTitle>
            <AlertDescription>
              This video is only available to students who have purchased this course.
            </AlertDescription>
          </Alert>
          <Button className="mt-6">Purchase Course</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-video bg-black">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>

      <video className="w-full h-full" controls poster="/placeholder.svg?height=720&width=1280">
        <source src="https://example.com/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

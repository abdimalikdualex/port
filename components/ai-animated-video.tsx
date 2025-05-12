"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export default function AIAnimatedVideo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleLoadedData = () => setIsLoaded(true)

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("loadeddata", handleLoadedData)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("loadeddata", handleLoadedData)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(!isMuted)
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster="/placeholder.svg?height=720&width=1280"
        playsInline
        loop
      >
        <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col items-center justify-center p-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4 drop-shadow-lg">
          Welcome to Express Academy
        </h2>
        <p className="text-lg md:text-xl text-white text-center max-w-2xl mb-8 drop-shadow-md">
          Unlock your potential with our premium courses taught by industry experts
        </p>

        <div className="flex gap-4">
          <Button
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={() => (window.location.href = "/courses")}
          >
            Explore Courses
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-white/20 text-white border-white hover:bg-white/30"
            onClick={() => (window.location.href = "/auth/signup")}
          >
            Join Now
          </Button>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  )
}

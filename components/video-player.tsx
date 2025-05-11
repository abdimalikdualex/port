"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, X, Maximize, Minimize, Lock } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { hasAccessToCourse } from "@/lib/payment-service"

interface VideoPlayerProps {
  onClose?: () => void
  videoUrl?: string
  courseId?: string | number
  previewOnly?: boolean
  lessonTitle?: string
}

export default function VideoPlayer({
  onClose,
  videoUrl,
  courseId,
  previewOnly = false,
  lessonTitle = "Lesson",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [hasAccess, setHasAccess] = useState(previewOnly)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  // Default video if none provided
  const defaultVideo = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

  useEffect(() => {
    // Check if user has access to this video
    const checkAccess = async () => {
      setIsLoading(true)

      // If this is a preview, allow access
      if (previewOnly) {
        setHasAccess(true)
        setIsLoading(false)
        return
      }

      // If courseId is provided, check if user has purchased the course
      if (courseId) {
        const hasPurchased = hasAccessToCourse(courseId)
        setHasAccess(hasPurchased)
      } else {
        // No courseId provided, default to no access
        setHasAccess(false)
      }

      setIsLoading(false)
    }

    checkAccess()
  }, [courseId, previewOnly])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
        togglePlay()
      } else if (e.code === "ArrowRight") {
        skip(10)
      } else if (e.code === "ArrowLeft") {
        skip(-10)
      } else if (e.code === "KeyM") {
        toggleMute()
      } else if (e.code === "KeyF") {
        toggleFullscreen()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const togglePlay = () => {
    if (!hasAccess && !previewOnly) return

    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    if (!hasAccess && !previewOnly) return

    const video = videoRef.current
    if (!video) return

    video.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0]
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume || 1
      setIsMuted(false)
    } else {
      video.volume = 0
      setIsMuted(true)
    }
  }

  const skip = (seconds: number) => {
    if (!hasAccess && !previewOnly) return

    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds))
  }

  const toggleFullscreen = () => {
    if (!hasAccess && !previewOnly) return

    if (!playerRef.current) return

    if (!isFullscreen) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen()
      }
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
      setIsFullscreen(false)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handleMouseMove = () => {
    setShowControls(true)

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  const handleEnrollNow = () => {
    if (courseId) {
      // Store course ID in localStorage to redirect back after payment
      localStorage.setItem("pendingCourseId", courseId.toString())
      router.push(`/courses/${courseId}`)
    }
  }

  if (isLoading) {
    return (
      <div className="relative w-full aspect-video bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-indigo-700">Loading video player...</p>
        </div>
      </div>
    )
  }

  if (!hasAccess && !previewOnly) {
    return (
      <div className="relative w-full aspect-video bg-muted">
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-10" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <Alert className="max-w-md bg-white/90 backdrop-blur-sm border-indigo-200">
            <Lock className="h-5 w-5 text-indigo-500" />
            <AlertTitle className="text-indigo-800">Premium Content</AlertTitle>
            <AlertDescription className="text-gray-700">
              This video is only available to students who have purchased this course. Purchase the course to get full
              access to all lessons.
            </AlertDescription>
          </Alert>
          <Button
            className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            onClick={handleEnrollNow}
          >
            Enroll Now
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={playerRef}
      className="relative w-full aspect-video bg-black rounded-md overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video ref={videoRef} src={videoUrl || defaultVideo} className="w-full h-full" onClick={togglePlay} playsInline />

      {/* Play/Pause overlay button (shown when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
          <div className="bg-black/30 rounded-full p-4">
            <Play className="h-12 w-12 text-white" />
          </div>
        </div>
      )}

      {/* Preview badge */}
      {previewOnly && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-indigo-600 text-white">Preview</Badge>
        </div>
      )}

      {/* Lesson title */}
      {lessonTitle && (
        <div className="absolute top-2 left-2 z-10 ml-20">
          <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">{lessonTitle}</span>
        </div>
      )}

      {/* Video controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          {/* Progress bar */}
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Play/Pause button */}
              <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/20">
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              {/* Volume control */}
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/20">
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                <div className="w-20 hidden sm:block">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    min={0}
                    max={1}
                    step={0.1}
                    onValueChange={handleVolumeChange}
                  />
                </div>
              </div>

              {/* Time display */}
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Fullscreen button */}
              <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </Button>

              {/* Close button (if provided) */}
              {onClose && (
                <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

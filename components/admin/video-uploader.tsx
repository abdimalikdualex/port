"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, X, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface VideoUploaderProps {
  setIsUploading: (isUploading: boolean) => void
  onUploadComplete?: (videoUrl: string) => void
}

export default function VideoUploader({ setIsUploading, onUploadComplete }: VideoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [isUploaded, setIsUploaded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type.startsWith("video/")) {
        handleFileUpload(droppedFile)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a video file (MP4, WebM, or Ogg)",
          variant: "destructive",
        })
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0])
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = (file: File) => {
    setFile(file)
    setIsUploading(true)
    setIsUploaded(false)
    setUploadProgress(0)

    // In a real implementation, you would use FormData and fetch to upload the file
    // For this demo, we'll simulate the upload process
    const simulateUpload = () => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 10
        if (progress > 100) progress = 100

        setUploadProgress(Math.floor(progress))

        if (progress === 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsUploading(false)
            setIsUploaded(true)

            // Generate a fake video URL - in a real app, this would come from your backend
            const fakeVideoUrl = URL.createObjectURL(file)
            if (onUploadComplete) {
              onUploadComplete(fakeVideoUrl)
            }

            toast({
              title: "Upload complete",
              description: "Your video has been uploaded successfully",
            })
          }, 500)
        }
      }, 300)
    }

    simulateUpload()
  }

  const cancelUpload = () => {
    setFile(null)
    setUploadProgress(0)
    setIsUploading(false)
    setIsUploaded(false)
  }

  return (
    <div className="w-full">
      {!file ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            <button
              type="button"
              onClick={handleButtonClick}
              className="text-indigo-600 hover:text-indigo-500 focus:outline-none"
            >
              Upload a video
            </button>
            <span> or drag and drop</span>
          </h3>
          <p className="mt-1 text-xs text-gray-500">MP4, WebM, or Ogg up to 500MB</p>
          <input
            ref={fileInputRef}
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            accept="video/*"
            onChange={handleFileChange}
          />
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-indigo-100 flex items-center justify-center mr-3">
                {isUploaded ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <Upload className="h-5 w-5 text-indigo-600" />
                )}
              </div>
              <div className="overflow-hidden">
                <p className="font-medium truncate" style={{ maxWidth: "200px" }}>
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={cancelUpload}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <Progress value={uploadProgress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{uploadProgress}% uploaded</span>
              <span>{isUploaded ? "Complete" : uploadProgress === 100 ? "Processing..." : "Uploading..."}</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

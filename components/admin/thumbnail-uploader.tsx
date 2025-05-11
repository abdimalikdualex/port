"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ImageIcon, X, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ThumbnailUploaderProps {
  onUploadComplete?: (thumbnailUrl: string) => void
  currentThumbnail?: string
}

export default function ThumbnailUploader({ onUploadComplete, currentThumbnail }: ThumbnailUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentThumbnail || null)
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
      if (droppedFile.type.startsWith("image/")) {
        handleFileUpload(droppedFile)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPEG, PNG, etc.)",
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

    // Create a preview URL for the image
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress > 100) progress = 100

      setUploadProgress(Math.floor(progress))

      if (progress === 100) {
        clearInterval(interval)
        setTimeout(() => {
          setIsUploading(false)
          setIsUploaded(true)

          if (onUploadComplete) {
            onUploadComplete(objectUrl)
          }

          toast({
            title: "Upload complete",
            description: "Your thumbnail has been uploaded successfully",
          })
        }, 500)
      }
    }, 200)
  }

  const cancelUpload = () => {
    if (previewUrl && !currentThumbnail) {
      URL.revokeObjectURL(previewUrl)
    }
    setFile(null)
    setPreviewUrl(currentThumbnail || null)
    setUploadProgress(0)
    setIsUploading(false)
    setIsUploaded(false)
  }

  return (
    <div className="w-full">
      {!file && !previewUrl ? (
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
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            <button
              type="button"
              onClick={handleButtonClick}
              className="text-indigo-600 hover:text-indigo-500 focus:outline-none"
            >
              Upload a thumbnail
            </button>
            <span> or drag and drop</span>
          </h3>
          <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
          <input
            ref={fileInputRef}
            id="thumbnail-upload"
            name="thumbnail-upload"
            type="file"
            className="sr-only"
            accept="image/*"
            onChange={handleFileChange}
          />
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border rounded-lg p-4">
          {previewUrl && (
            <div className="mb-4 relative aspect-video rounded-md overflow-hidden">
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Thumbnail preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {file && (
            <>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-md bg-indigo-100 flex items-center justify-center mr-3">
                    {isUploaded ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-indigo-600" />
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

              {isUploading && (
                <div className="space-y-2">
                  <Progress value={uploadProgress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{uploadProgress}% uploaded</span>
                    <span>{isUploaded ? "Complete" : uploadProgress === 100 ? "Processing..." : "Uploading..."}</span>
                  </div>
                </div>
              )}
            </>
          )}

          {!file && previewUrl && (
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Current thumbnail</p>
              <Button variant="outline" size="sm" onClick={handleButtonClick}>
                Change thumbnail
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

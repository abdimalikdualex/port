"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Upload, X, Check, Film } from "lucide-react"

interface VideoUploadFormProps {
  onSuccess: (data: { title: string; course: string }) => void
}

export default function VideoUploadForm({ onSuccess }: VideoUploadFormProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [isUploaded, setIsUploaded] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    description: "",
    isPublic: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, course: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isPublic: checked }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      simulateUpload(selectedFile)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type.startsWith("video/")) {
        setFile(droppedFile)
        simulateUpload(droppedFile)
      } else {
        alert("Please upload a video file")
      }
    }
  }

  const simulateUpload = (file: File) => {
    setIsUploading(true)
    setIsUploaded(false)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 5
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setIsUploaded(true)
          return 100
        }
        return newProgress
      })
    }, 300)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isUploaded) {
      alert("Please wait for the video to finish uploading")
      return
    }

    if (!formData.title || !formData.course) {
      alert("Please fill in all required fields")
      return
    }

    // Submit the form
    onSuccess({ title: formData.title, course: formData.course })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${isUploading || isUploaded ? "border-indigo-200 bg-indigo-50/50" : "border-gray-300"}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {!file ? (
          <>
            <Film className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              <label htmlFor="file-upload" className="relative cursor-pointer text-indigo-600 hover:text-indigo-500">
                <span>Upload a video</span>
                <Input id="file-upload" type="file" accept="video/*" className="sr-only" onChange={handleFileChange} />
              </label>
              <span> or drag and drop</span>
            </h3>
            <p className="mt-1 text-xs text-gray-500">MP4, WebM, or Ogg up to 500MB</p>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
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
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFile(null)
                  setUploadProgress(0)
                  setIsUploading(false)
                  setIsUploaded(false)
                }}
              >
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
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter video title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="course">Course *</Label>
          <Select value={formData.course} onValueChange={handleSelectChange} required>
            <SelectTrigger>
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Web Design Masterclass">Web Design Masterclass</SelectItem>
              <SelectItem value="Advanced English">Advanced English</SelectItem>
              <SelectItem value="Kiswahili for Beginners">Kiswahili for Beginners</SelectItem>
              <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter video description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="isPublic" checked={formData.isPublic} onCheckedChange={handleCheckboxChange} />
          <Label htmlFor="isPublic" className="text-sm font-normal">
            Make this video public immediately
          </Label>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isUploading || !isUploaded}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        >
          Add Video
        </Button>
      </div>
    </form>
  )
}

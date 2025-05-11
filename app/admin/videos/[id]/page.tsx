"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Film, Eye, Clock, Calendar, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import ThumbnailUploader from "@/components/admin/thumbnail-uploader"
import VideoPlayer from "@/components/video-player"

// Mock data for a single video
const getMockVideo = (id: string) => ({
  id: Number.parseInt(id),
  title: `Video ${id}`,
  description: "This is a detailed description of the video content and what students will learn.",
  course: "Web Design Masterclass",
  duration: "12:34",
  date: "Mar 5, 2023",
  thumbnail: "/placeholder.svg?height=180&width=320",
  videoUrl: null,
  status: "published",
  isPublic: true,
  tags: ["web design", "html", "css"],
  views: 245,
  completionRate: 68,
})

export default function VideoEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [video, setVideo] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("details")
  const [newTag, setNewTag] = useState("")
  const [showVideoPreview, setShowVideoPreview] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch the video data from your API
    const fetchVideo = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setVideo(getMockVideo(params.id))
      } catch (error) {
        console.error("Error fetching video:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideo()
  }, [params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setVideo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setVideo((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setVideo((prev) => ({ ...prev, isPublic: checked }))
  }

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTag.trim() && !video.tags.includes(newTag.trim().toLowerCase())) {
      setVideo((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim().toLowerCase()] }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setVideo((prev) => ({ ...prev, tags: prev.tags.filter((tag: string) => tag !== tagToRemove) }))
  }

  const handleThumbnailUpload = (thumbnailUrl: string) => {
    setVideo((prev) => ({ ...prev, thumbnail: thumbnailUrl }))
  }

  const handleVideoUpload = (videoUrl: string) => {
    setVideo((prev) => ({ ...prev, videoUrl: videoUrl }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      // Simulate API call to save changes
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success message or notification would go here
      alert("Video updated successfully!")
      router.push("/admin/videos")
    } catch (error) {
      console.error("Error saving video:", error)
      alert("Failed to update video. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Film className="mx-auto h-12 w-12 text-gray-400 animate-pulse" />
          <h3 className="mt-2 text-lg font-medium">Loading video...</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin/videos")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-indigo-900">Edit Video</h1>
            <p className="text-lg text-indigo-700">Update video details and settings</p>
          </div>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        >
          {isSaving ? "Saving..." : "Save Changes"}
          {!isSaving && <Save className="ml-2 h-4 w-4" />}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Video Details</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 mt-6">
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Edit the title, description, and other details of your video.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={video.title}
                      onChange={handleInputChange}
                      placeholder="Enter video title"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={video.description}
                      onChange={handleInputChange}
                      placeholder="Enter video description"
                      rows={4}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="course">Course</Label>
                    <Select value={video.course} onValueChange={(value) => handleSelectChange("course", value)}>
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
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={video.duration}
                      onChange={handleInputChange}
                      placeholder="HH:MM:SS"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {video.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <form onSubmit={handleAddTag} className="flex gap-2">
                      <Input placeholder="Add a tag" value={newTag} onChange={(e) => setNewTag(e.target.value)} />
                      <Button type="submit" variant="outline" size="sm">
                        Add
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle>Thumbnail</CardTitle>
                  <CardDescription>Upload or change the video thumbnail.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ThumbnailUploader currentThumbnail={video.thumbnail} onUploadComplete={handleThumbnailUpload} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-6">
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle>Visibility Settings</CardTitle>
                  <CardDescription>Control who can see this video.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="isPublic" checked={video.isPublic} onCheckedChange={handleCheckboxChange} />
                    <Label htmlFor="isPublic" className="text-sm font-normal">
                      Make this video public
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    When a video is public, it will be visible to all enrolled students. Private videos are only visible
                    to admins.
                  </p>

                  <div className="grid gap-2 mt-4">
                    <Label htmlFor="status">Status</Label>
                    <Select value={video.status} onValueChange={(value) => handleSelectChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>Additional video configuration options.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="order">Display Order</Label>
                    <Input id="order" name="order" type="number" placeholder="Enter display order" defaultValue="1" />
                    <p className="text-xs text-muted-foreground">
                      Controls the order in which videos appear in the course. Lower numbers appear first.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="space-y-6 mt-6">
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle>Video Preview</CardTitle>
                  <CardDescription>Preview how your video will appear to students.</CardDescription>
                </CardHeader>
                <CardContent>
                  {video.videoUrl && showVideoPreview ? (
                    <div className="aspect-video bg-black rounded-md overflow-hidden">
                      <VideoPlayer videoUrl={video.videoUrl} onClose={() => setShowVideoPreview(false)} />
                    </div>
                  ) : (
                    <div className="aspect-video bg-black rounded-md flex items-center justify-center">
                      <div className="text-white text-center">
                        <Film className="mx-auto h-12 w-12 mb-2" />
                        <p>{video.videoUrl ? "Click 'Test Playback' to preview" : "No video uploaded yet"}</p>
                        <p className="text-sm text-gray-400 mt-2">
                          {video.videoUrl ? "Video is ready to play" : "Upload a video file first"}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" disabled={!video.videoUrl} onClick={() => setShowVideoPreview(true)}>
                    Test Playback
                  </Button>
                  <Button variant="outline">View as Student</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle>Video Statistics</CardTitle>
              <CardDescription>Performance metrics for this video</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100">
                  <Eye className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="font-medium">{video.views}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100">
                  <Clock className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="font-medium">{video.completionRate}%</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100">
                  <Calendar className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Upload Date</p>
                  <p className="font-medium">{video.date}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-orange-100">
                  <Tag className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    className={
                      video.status === "published"
                        ? "bg-green-100 text-green-800"
                        : video.status === "draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }
                  >
                    {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowVideoPreview(true)}
                disabled={!video.videoUrl}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview Video
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Film className="h-4 w-4 mr-2" />
                Replace Video File
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600">
                Delete Video
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

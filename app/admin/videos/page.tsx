"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Film, MoreVertical, Plus, Search, Eye } from "lucide-react"
import VideoUploadForm from "@/components/admin/video-upload-form"

// Mock data for videos
const mockVideos = [
  {
    id: 1,
    title: "Introduction to Web Design",
    course: "Web Design Masterclass",
    duration: "12:34",
    date: "Mar 5, 2023",
    thumbnail: "/placeholder.svg?height=180&width=320",
    status: "published",
    views: 245,
  },
  {
    id: 2,
    title: "HTML Fundamentals",
    course: "Web Design Masterclass",
    duration: "18:22",
    date: "Mar 6, 2023",
    thumbnail: "/placeholder.svg?height=180&width=320",
    status: "published",
    views: 189,
  },
  {
    id: 3,
    title: "CSS Styling Basics",
    course: "Web Design Masterclass",
    duration: "22:15",
    date: "Mar 7, 2023",
    thumbnail: "/placeholder.svg?height=180&width=320",
    status: "published",
    views: 156,
  },
  {
    id: 4,
    title: "Responsive Design Principles",
    course: "Web Design Masterclass",
    duration: "25:40",
    date: "Mar 8, 2023",
    thumbnail: "/placeholder.svg?height=180&width=320",
    status: "draft",
    views: 0,
  },
  {
    id: 5,
    title: "JavaScript for Beginners",
    course: "Web Design Masterclass",
    duration: "30:12",
    date: "Mar 9, 2023",
    thumbnail: "/placeholder.svg?height=180&width=320",
    status: "processing",
    views: 0,
  },
  {
    id: 6,
    title: "Advanced English Grammar",
    course: "Advanced English",
    duration: "45:18",
    date: "Mar 10, 2023",
    thumbnail: "/placeholder.svg?height=180&width=320",
    status: "published",
    views: 132,
  },
  {
    id: 7,
    title: "Business English Communication",
    course: "Advanced English",
    duration: "38:22",
    date: "Mar 11, 2023",
    thumbnail: "/placeholder.svg?height=180&width=320",
    status: "published",
    views: 98,
  },
  {
    id: 8,
    title: "Kiswahili Greetings and Introductions",
    course: "Kiswahili for Beginners",
    duration: "15:45",
    date: "Mar 12, 2023",
    thumbnail: "/placeholder.svg?height=180&width=320",
    status: "published",
    views: 76,
  },
]

export default function VideosPage() {
  const [videos, setVideos] = useState(mockVideos)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [videoToDelete, setVideoToDelete] = useState<number | null>(null)

  // Get unique courses for filter
  const courses = ["all", ...new Set(videos.map((video) => video.course))]

  // Filter videos based on active tab, search query, and course filter
  const filteredVideos = videos
    .filter((video) => activeTab === "all" || video.status === activeTab)
    .filter(
      (video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.course.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((video) => courseFilter === "all" || video.course === courseFilter)

  const handleDeleteVideo = (id: number) => {
    setVideoToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (videoToDelete) {
      setVideos(videos.filter((video) => video.id !== videoToDelete))
      setIsDeleteDialogOpen(false)
      setVideoToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-indigo-900">Video Management</h1>
          <p className="text-lg text-indigo-700">Upload and manage your course videos</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              <Plus className="mr-2 h-4 w-4" /> Upload New Video
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Upload New Video</DialogTitle>
            </DialogHeader>
            <VideoUploadForm
              onSuccess={(newVideo) => {
                setVideos([
                  {
                    id: videos.length + 1,
                    title: newVideo.title,
                    course: newVideo.course,
                    duration: "00:00",
                    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                    thumbnail: "/placeholder.svg?height=180&width=320",
                    status: "processing",
                    views: 0,
                  },
                  ...videos,
                ])
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course === "all" ? "All Courses" : course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search videos..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card className="border-purple-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="text-indigo-900">Course Videos</CardTitle>
              <CardDescription>
                {filteredVideos.length} video{filteredVideos.length !== 1 ? "s" : ""} found
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" /> Preview Mode
              </Button>
              <Button variant="outline" size="sm">
                Bulk Actions
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 border rounded-lg hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="relative w-full sm:w-48 aspect-video rounded-md overflow-hidden bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <Film className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h4 className="font-medium truncate">{video.title}</h4>
                          <p className="text-sm text-muted-foreground">Course: {video.course}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-muted-foreground">Duration: {video.duration}</span>
                            <span className="text-xs text-muted-foreground">Added: {video.date}</span>
                            <Badge
                              className={
                                video.status === "published"
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : video.status === "draft"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                              }
                            >
                              {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                            </Badge>
                            {video.status === "published" && (
                              <span className="text-xs flex items-center gap-1">
                                <Eye className="h-3 w-3" /> {video.views} views
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/videos/${video.id}`}>
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Preview</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteVideo(video.id)}>
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Film className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium">No videos found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery ? "Try a different search term" : "Upload your first video to get started"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Video</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this video? This action cannot be undone.</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

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
import { ArrowLeft, Save, BookOpen, DollarSign, Users, Film, Eye, Plus } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// Exchange rate (1 USD to KSH)
const exchangeRate = 130

// Mock data for a single course
const getMockCourse = (id: string) => ({
  id: Number.parseInt(id),
  title: `Course ${id}`,
  description: "This is a detailed description of the course content and what students will learn.",
  thumbnail: "/placeholder.svg?height=400&width=600",
  price: 94.99,
  category: "IT",
  instructor: "ABDULMALIK OMAR DUALE",
  level: "All Levels",
  status: "published",
  enrollments: 45,
  videos: 12,
  isPublished: true,
  completionRate: 68,
  rating: 4.7,
  revenue: 4275.55,
})

export default function CourseEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [course, setCourse] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("details")
  const [kshPrice, setKshPrice] = useState<number>(0)

  useEffect(() => {
    // In a real app, you would fetch the course data from your API
    const fetchCourse = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        const courseData = getMockCourse(params.id)
        setCourse(courseData)
        setKshPrice(Math.round(courseData.price * exchangeRate))
      } catch (error) {
        console.error("Error fetching course:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourse()
  }, [params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCourse((prev) => ({ ...prev, [name]: value }))

    // Update KSH price when USD price changes
    if (name === "price") {
      const numValue = Number.parseFloat(value) || 0
      setKshPrice(Math.round(numValue * exchangeRate))
    }
  }

  const handleSelectChange = (field: string, value: string) => {
    setCourse((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setCourse((prev) => ({ ...prev, isPublished: checked }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      // Simulate API call to save changes
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success message or notification would go here
      alert("Course updated successfully!")
      router.push("/admin/courses")
    } catch (error) {
      console.error("Error saving course:", error)
      alert("Failed to update course. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 animate-pulse" />
          <h3 className="mt-2 text-lg font-medium">Loading course...</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin/courses")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-indigo-900">Edit Course</h1>
            <p className="text-lg text-indigo-700">Update course details and settings</p>
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Course Details</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 mt-6">
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Edit the title, description, and other details of your course.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={course.title}
                      onChange={handleInputChange}
                      placeholder="Enter course title"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={course.description}
                      onChange={handleInputChange}
                      placeholder="Enter course description"
                      rows={4}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={course.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Kiswahili">Kiswahili</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="instructor">Instructor</Label>
                    <Select
                      value={course.instructor}
                      onValueChange={(value) => handleSelectChange("instructor", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select instructor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ABDULMALIK OMAR DUALE">ABDULMALIK OMAR DUALE</SelectItem>
                        <SelectItem value="Mr. Abdijabar">Mr. Abdijabar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="level">Level</Label>
                    <Select value={course.level} onValueChange={(value) => handleSelectChange("level", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="All Levels">All Levels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle>Thumbnail</CardTitle>
                  <CardDescription>Upload or change the course thumbnail.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="relative w-48 aspect-video rounded-md overflow-hidden bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <BookOpen className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <Button variant="outline" className="mb-2">
                        Upload New Thumbnail
                      </Button>
                      <p className="text-xs text-muted-foreground">Recommended size: 1280x720px (16:9)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6 mt-6">
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle>Course Pricing</CardTitle>
                  <CardDescription>
                    Set the price for your course in USD. KSH price will be calculated automatically.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price">Price (USD)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={course.price}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="kshPrice">Price (KSH)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">KSH</span>
                        <Input id="kshPrice" value={kshPrice} readOnly className="pl-12 bg-gray-50" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        KSH price is calculated automatically based on the exchange rate of 1 USD = {exchangeRate} KSH
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium mb-2">Pricing Options</h3>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="discountEnabled" />
                        <Label htmlFor="discountEnabled" className="text-sm font-normal">
                          Enable discount
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="subscriptionEnabled" />
                        <Label htmlFor="subscriptionEnabled" className="text-sm font-normal">
                          Enable subscription pricing
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Pricing"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6 mt-6">
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                  <CardDescription>Manage videos and other content for this course.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button
                      onClick={() => router.push(`/admin/courses/${params.id}/videos`)}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                    >
                      <Film className="mr-2 h-4 w-4" /> Manage Course Videos
                    </Button>

                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Current Content</h3>
                      <p className="text-sm text-muted-foreground mb-4">This course has {course.videos} videos</p>

                      <div className="space-y-2">
                        {Array.from({ length: Math.min(3, course.videos) }).map((_, i) => (
                          <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center mr-2">
                                <span className="text-xs font-medium">{i + 1}</span>
                              </div>
                              <span>Video {i + 1}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </div>
                        ))}

                        {course.videos > 3 && (
                          <div className="text-center text-sm text-muted-foreground">
                            + {course.videos - 3} more videos
                          </div>
                        )}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" /> Add New Section
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-6">
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle>Course Settings</CardTitle>
                  <CardDescription>Configure course visibility and other settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="isPublished" checked={course.isPublished} onCheckedChange={handleCheckboxChange} />
                    <Label htmlFor="isPublished" className="text-sm font-normal">
                      Publish this course
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    When a course is published, it will be visible to all users on the platform. Unpublished courses are
                    only visible to admins.
                  </p>

                  <div className="grid gap-2 mt-4">
                    <Label htmlFor="status">Status</Label>
                    <Select value={course.status} onValueChange={(value) => handleSelectChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Settings"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle>Course Statistics</CardTitle>
              <CardDescription>Performance metrics for this course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Total Enrollments</p>
                  <p className="font-medium">{course.enrollments}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="font-medium">${course.revenue.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">KSH {Math.round(course.revenue * exchangeRate)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-yellow-100">
                  <Eye className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{course.completionRate}%</p>
                    <Progress value={course.completionRate} className="h-2 flex-1" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100">
                  <Film className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Total Videos</p>
                  <p className="font-medium">{course.videos}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/courses/${course.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Course
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/admin/courses/${course.id}/videos`}>
                  <Film className="h-4 w-4 mr-2" />
                  Manage Videos
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600">
                Delete Course
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

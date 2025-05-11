"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Exchange rate (1 USD to KSH)
const exchangeRate = 130

interface CourseFormProps {
  onSuccess: (data: {
    title: string
    description: string
    price: string
    category: string
    instructor: string
    level: string
  }) => void
}

export default function CourseForm({ onSuccess }: CourseFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    instructor: "",
    level: "",
    isPublished: false,
  })
  const [kshPrice, setKshPrice] = useState<number>(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Update KSH price when USD price changes
    if (name === "price") {
      const numValue = Number.parseFloat(value) || 0
      setKshPrice(Math.round(numValue * exchangeRate))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isPublished: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !formData.instructor ||
      !formData.level
    ) {
      alert("Please fill in all required fields")
      return
    }

    onSuccess({
      title: formData.title,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      instructor: formData.instructor,
      level: formData.level,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Course Title *</Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter course title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter course description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="price">Price (USD) *</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter course price"
              value={formData.price}
              onChange={handleInputChange}
              className="pl-8"
              required
            />
          </div>
          {formData.price && <p className="text-xs text-muted-foreground">KSH {kshPrice}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)} required>
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
          <Label htmlFor="instructor">Instructor *</Label>
          <Select
            value={formData.instructor}
            onValueChange={(value) => handleSelectChange("instructor", value)}
            required
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
          <Label htmlFor="level">Level *</Label>
          <Select value={formData.level} onValueChange={(value) => handleSelectChange("level", value)} required>
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

        <div className="flex items-center space-x-2">
          <Checkbox id="isPublished" checked={formData.isPublished} onCheckedChange={handleCheckboxChange} />
          <Label htmlFor="isPublished" className="text-sm font-normal">
            Publish this course immediately
          </Label>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        >
          Create Course
        </Button>
      </div>
    </form>
  )
}

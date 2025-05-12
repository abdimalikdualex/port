"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X } from "lucide-react"
import { motion } from "framer-motion"

const categories = [
  "All Categories",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Design",
  "Marketing",
  "Business",
  "Language",
  "IT & Software",
]

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced", "Expert"]

export default function AdvancedSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "All Categories")
  const [level, setLevel] = useState(searchParams.get("level") || "All Levels")
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number.parseInt(searchParams.get("minPrice") || "0"),
    Number.parseInt(searchParams.get("maxPrice") || "200"),
  ])
  const [showFilters, setShowFilters] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    setIsSearching(true)

    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (category !== "All Categories") params.set("category", category)
    if (level !== "All Levels") params.set("level", level)
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    router.push(`/search?${params.toString()}`)

    setTimeout(() => {
      setIsSearching(false)
    }, 500)
  }

  const clearFilters = () => {
    setQuery("")
    setCategory("All Categories")
    setLevel("All Levels")
    setPriceRange([0, 200])
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search for courses..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-indigo-100 text-indigo-700" : ""}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button onClick={handleSearch} disabled={isSearching} className="bg-indigo-600 hover:bg-indigo-700">
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Category</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Level</label>
                    <Select value={level} onValueChange={setLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((lvl) => (
                          <SelectItem key={lvl} value={lvl}>
                            {lvl}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Slider
                      value={priceRange}
                      min={0}
                      max={200}
                      step={5}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm" onClick={clearFilters} className="flex items-center gap-1">
                    <X className="h-3 w-3" />
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

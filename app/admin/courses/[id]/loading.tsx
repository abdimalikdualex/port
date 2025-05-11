import { BookOpen } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <BookOpen className="mx-auto h-12 w-12 text-gray-400 animate-pulse" />
        <h3 className="mt-2 text-lg font-medium">Loading course...</h3>
      </div>
    </div>
  )
}

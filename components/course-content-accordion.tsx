"use client"

import { useState } from "react"
import { File, Play, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import VideoPlayer from "@/components/video-player"
import type { Section } from "@/lib/data/videos"
import type { Video } from "@/lib/data/videos"
import type { Material } from "@/lib/data/materials"

interface CourseContentAccordionProps {
  sections: Section[]
  getVideosBySectionId: (sectionId: string) => Video[]
  getMaterialsBySectionId: (sectionId: string) => Material[]
}

export default function CourseContentAccordion({
  sections,
  getVideosBySectionId,
  getMaterialsBySectionId,
}: CourseContentAccordionProps) {
  const [openVideo, setOpenVideo] = useState<Video | null>(null)

  const handleOpenVideo = (video: Video) => {
    if (video.isPreview) {
      setOpenVideo(video)
    } else {
      // Check if user has purchased the course
      // For now, just show a preview message
      setOpenVideo(video)
    }
  }

  const handleCloseVideo = () => {
    setOpenVideo(null)
  }

  return (
    <>
      <Accordion type="multiple" className="w-full">
        {sections.map((section) => {
          const videos = getVideosBySectionId(section.id)
          const materials = getMaterialsBySectionId(section.id)
          const totalItems = videos.length + materials.length
          const totalDuration = videos.reduce((acc, video) => {
            const [minutes, seconds] = video.duration.split(":").map(Number)
            return acc + minutes * 60 + seconds
          }, 0)

          const hours = Math.floor(totalDuration / 3600)
          const minutes = Math.floor((totalDuration % 3600) / 60)
          const formattedDuration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`

          return (
            <AccordionItem key={section.id} value={section.id} className="border-b">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                  <div className="font-medium">{section.title}</div>
                  <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                    {totalItems} {totalItems === 1 ? "item" : "items"} • {formattedDuration}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <ul className="space-y-2">
                  {videos.map((video) => (
                    <li key={video.id} className="py-2 border-b last:border-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0 mr-2 h-8 w-8 rounded-full"
                            onClick={() => handleOpenVideo(video)}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <div>
                            <div className="font-medium">{video.title}</div>
                            <div className="text-sm text-gray-500">{video.duration}</div>
                          </div>
                        </div>
                        {video.isPreview ? (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Preview</span>
                        ) : (
                          <Lock className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </li>
                  ))}

                  {materials.map((material) => (
                    <li key={material.id} className="py-2 border-b last:border-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Button variant="ghost" size="sm" className="p-0 mr-2 h-8 w-8 rounded-full" disabled>
                            <File className="h-4 w-4" />
                          </Button>
                          <div>
                            <div className="font-medium">{material.title}</div>
                            <div className="text-sm text-gray-500">
                              {material.fileType} • {material.fileSize}
                            </div>
                          </div>
                        </div>
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>

      <Dialog open={!!openVideo} onOpenChange={(open) => !open && handleCloseVideo()}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-4">
            <DialogTitle>{openVideo?.title}</DialogTitle>
          </DialogHeader>
          {openVideo && (
            <VideoPlayer
              videoUrl={openVideo.videoUrl}
              courseId={openVideo.courseId}
              previewOnly={openVideo.isPreview}
              lessonTitle={openVideo.title}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

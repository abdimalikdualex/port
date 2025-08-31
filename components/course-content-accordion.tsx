import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Lock, Play } from "lucide-react"

// Mock data for course content - customized for a web design course
const courseContent = [
  {
    id: 1,
    title: "Introduction to Web Design",
    lectures: [
      { id: 1, title: "Welcome to the Course", duration: "5:20", isPreview: true },
      { id: 2, title: "Course Overview", duration: "8:15", isPreview: true },
      { id: 3, title: "Setting Up Your Design Environment", duration: "12:40", isPreview: false },
    ],
    totalDuration: "26:15",
  },
  {
    id: 2,
    title: "HTML & CSS Fundamentals",
    lectures: [
      { id: 4, title: "HTML Document Structure", duration: "10:30", isPreview: false },
      { id: 5, title: "Working with Text Elements", duration: "14:20", isPreview: false },
      { id: 6, title: "CSS Styling Basics", duration: "11:15", isPreview: false },
      { id: 7, title: "Responsive Design Principles", duration: "18:45", isPreview: false },
    ],
    totalDuration: "54:50",
  },
  {
    id: 3,
    title: "Modern Design Principles",
    lectures: [
      { id: 8, title: "Color Theory for Web", duration: "15:10", isPreview: false },
      { id: 9, title: "Typography Best Practices", duration: "12:30", isPreview: false },
      { id: 10, title: "Layout and Composition", duration: "20:15", isPreview: false },
      { id: 11, title: "User Experience Fundamentals", duration: "18:40", isPreview: false },
      { id: 12, title: "Designing for Mobile First", duration: "22:05", isPreview: false },
    ],
    totalDuration: "88:40",
  },
]

export default function CourseContentAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {courseContent.map((section) => (
        <AccordionItem key={section.id} value={`section-${section.id}`}>
          <AccordionTrigger className="hover:no-underline">
            <div className="flex flex-col items-start text-left sm:flex-row sm:items-center sm:justify-between sm:w-full">
              <span>{section.title}</span>
              <span className="text-sm text-muted-foreground">
                {section.lectures.length} lectures • {section.totalDuration}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2">
              {section.lectures.map((lecture) => (
                <li key={lecture.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center">
                    {lecture.isPreview ? (
                      <Button variant="ghost" size="sm" className="mr-2 h-8 w-8 p-0">
                        <Play className="h-4 w-4" />
                        <span className="sr-only">Play preview</span>
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center mr-2 h-8 w-8">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                    <span className={lecture.isPreview ? "" : "text-muted-foreground"}>{lecture.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{lecture.duration}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

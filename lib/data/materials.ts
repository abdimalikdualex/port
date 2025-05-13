export interface Material {
  id: string
  courseId: string
  title: string
  description: string
  fileUrl: string
  fileType: string
  fileSize: string
  sectionId: string
  position: number
}

export const materials: Material[] = [
  // Web Design Masterclass
  {
    id: "m1",
    courseId: "1",
    title: "HTML5 Cheat Sheet",
    description: "A comprehensive reference guide for HTML5 tags and attributes.",
    fileUrl: "#",
    fileType: "PDF",
    fileSize: "2.4 MB",
    sectionId: "s2",
    position: 1,
  },
  {
    id: "m2",
    courseId: "1",
    title: "CSS3 Reference Guide",
    description: "Complete reference for CSS3 properties and values.",
    fileUrl: "#",
    fileType: "PDF",
    fileSize: "3.1 MB",
    sectionId: "s3",
    position: 1,
  },
  {
    id: "m3",
    courseId: "1",
    title: "Web Design Project Files",
    description: "Starter files for the course projects.",
    fileUrl: "#",
    fileType: "ZIP",
    fileSize: "15.8 MB",
    sectionId: "s1",
    position: 1,
  },

  // Advanced English Communication
  {
    id: "m4",
    courseId: "2",
    title: "Business Email Templates",
    description: "Ready-to-use templates for common business email scenarios.",
    fileUrl: "#",
    fileType: "DOCX",
    fileSize: "1.2 MB",
    sectionId: "s5",
    position: 1,
  },
  {
    id: "m5",
    courseId: "2",
    title: "Presentation Slides",
    description: "Slide templates for effective business presentations.",
    fileUrl: "#",
    fileType: "PPTX",
    fileSize: "5.7 MB",
    sectionId: "s4",
    position: 1,
  },

  // Kiswahili for Beginners
  {
    id: "m6",
    courseId: "3",
    title: "Kiswahili Vocabulary List",
    description: "Essential vocabulary words and phrases for beginners.",
    fileUrl: "#",
    fileType: "PDF",
    fileSize: "1.8 MB",
    sectionId: "s6",
    position: 1,
  },
  {
    id: "m7",
    courseId: "3",
    title: "Pronunciation Guide",
    description: "Audio guide for proper Kiswahili pronunciation.",
    fileUrl: "#",
    fileType: "MP3",
    fileSize: "24.5 MB",
    sectionId: "s6",
    position: 2,
  },
]

export function getMaterialsForCourse(courseId: string): Material[] {
  return materials.filter((material) => material.courseId === courseId)
}

export function getMaterialsBySectionId(sectionId: string): Material[] {
  return materials.filter((material) => material.sectionId === sectionId).sort((a, b) => a.position - b.position)
}

export function getMaterialById(materialId: string): Material | undefined {
  return materials.find((material) => material.id === materialId)
}

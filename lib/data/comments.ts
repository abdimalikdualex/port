export interface Comment {
  id: string
  courseId: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  date: string
  likes: number
  userLiked: boolean
  replies?: Comment[]
}

export const comments: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      courseId: "1",
      userId: "user1",
      userName: "Ahmed Hassan",
      userAvatar: "/placeholder.svg?height=40&width=40",
      content:
        "This course is excellent! The instructor explains everything clearly and the exercises are very helpful.",
      date: "2 days ago",
      likes: 12,
      userLiked: false,
    },
    {
      id: "c2",
      courseId: "1",
      userId: "user2",
      userName: "Fatima Omar",
      userAvatar: "/placeholder.svg?height=40&width=40",
      content: "I've learned so much from this course. The HTML and CSS sections are particularly well-structured.",
      date: "1 week ago",
      likes: 8,
      userLiked: false,
    },
    {
      id: "c3",
      courseId: "1",
      userId: "user3",
      userName: "John Smith",
      userAvatar: "/placeholder.svg?height=40&width=40",
      content:
        "Great course for beginners! I had no prior experience with web design and now I feel confident building my own websites.",
      date: "2 weeks ago",
      likes: 15,
      userLiked: false,
    },
  ],
  "2": [
    {
      id: "c4",
      courseId: "2",
      userId: "user4",
      userName: "Maria Rodriguez",
      userAvatar: "/placeholder.svg?height=40&width=40",
      content:
        "This English course has helped me improve my business communication skills significantly. Highly recommended!",
      date: "3 days ago",
      likes: 9,
      userLiked: false,
    },
    {
      id: "c5",
      courseId: "2",
      userId: "user5",
      userName: "Hiroshi Tanaka",
      userAvatar: "/placeholder.svg?height=40&width=40",
      content:
        "The email writing section was particularly useful for my daily work. Thank you for the practical examples.",
      date: "1 week ago",
      likes: 7,
      userLiked: false,
    },
  ],
  "3": [
    {
      id: "c6",
      courseId: "3",
      userId: "user6",
      userName: "Emily Johnson",
      userAvatar: "/placeholder.svg?height=40&width=40",
      content:
        "I've always wanted to learn Kiswahili and this course made it accessible and fun. The pronunciation guides are excellent!",
      date: "5 days ago",
      likes: 11,
      userLiked: false,
    },
    {
      id: "c7",
      courseId: "3",
      userId: "user7",
      userName: "David Wilson",
      userAvatar: "/placeholder.svg?height=40&width=40",
      content: "Great introduction to Kiswahili! I can now have basic conversations when I travel to East Africa.",
      date: "2 weeks ago",
      likes: 6,
      userLiked: false,
    },
  ],
}

export function getCommentsForCourse(courseId: string): Comment[] {
  return comments[courseId] || []
}

export function addComment(courseId: string, comment: Omit<Comment, "id">): Comment {
  const newComment = {
    ...comment,
    id: `c${Date.now()}`,
  }

  if (!comments[courseId]) {
    comments[courseId] = []
  }

  comments[courseId].unshift(newComment)
  return newComment
}

export function likeComment(commentId: string, courseId: string): boolean {
  const courseComments = comments[courseId]
  if (!courseComments) return false

  const comment = courseComments.find((c) => c.id === commentId)
  if (!comment) return false

  if (comment.userLiked) {
    comment.likes -= 1
    comment.userLiked = false
  } else {
    comment.likes += 1
    comment.userLiked = true
  }

  return true
}

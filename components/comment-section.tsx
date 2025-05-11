"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, Flag, MoreVertical, Send } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "@/hooks/use-toast"

interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  date: string
  likes: number
  userLiked: boolean
  replies?: Comment[]
}

export default function CommentSection({ courseId }: { courseId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const userInfo = localStorage.getItem("userInfo")
    setIsLoggedIn(!!userInfo)

    // Load comments from localStorage
    const storedComments = localStorage.getItem(`comments-${courseId}`)
    if (storedComments) {
      setComments(JSON.parse(storedComments))
    } else {
      // Mock data for initial comments
      const initialComments: Comment[] = [
        {
          id: "1",
          userId: "user1",
          userName: "Ahmed Hassan",
          userAvatar: "/placeholder.svg?height=40&width=40",
          content:
            "Waxaan aad ugu faraxsanahay koorsooyinka. Waxay ii fududeeyeen inaan barto xirfado cusub oo muhiim ah.",
          date: "2 days ago",
          likes: 12,
          userLiked: false,
        },
        {
          id: "2",
          userId: "user2",
          userName: "Fatima Omar",
          userAvatar: "/placeholder.svg?height=40&width=40",
          content: "Macallinka waa mid aad u wanaagsan. Waxaan bartay waxyaabo badan oo aan horay u aqoon.",
          date: "1 week ago",
          likes: 8,
          userLiked: false,
        },
        {
          id: "3",
          userId: "user3",
          userName: "John Smith",
          userAvatar: "/placeholder.svg?height=40&width=40",
          content:
            "This course is excellent! The instructor explains everything clearly and the exercises are very helpful.",
          date: "2 weeks ago",
          likes: 15,
          userLiked: false,
        },
      ]
      setComments(initialComments)
      localStorage.setItem(`comments-${courseId}`, JSON.stringify(initialComments))
    }
  }, [courseId])

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    if (!isLoggedIn) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to post a comment",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || '{"name": "Guest User", "avatar": ""}')

      const newCommentObj: Comment = {
        id: Date.now().toString(),
        userId: "currentUser",
        userName: userInfo.name,
        userAvatar: userInfo.avatar || "/placeholder.svg?height=40&width=40",
        content: newComment,
        date: "Just now",
        likes: 0,
        userLiked: false,
      }

      const updatedComments = [newCommentObj, ...comments]
      setComments(updatedComments)
      localStorage.setItem(`comments-${courseId}`, JSON.stringify(updatedComments))
      setNewComment("")
      setIsSubmitting(false)

      toast({
        title: "Comment posted",
        description: "Your comment has been posted successfully",
      })
    }, 1000)
  }

  const handleLikeComment = (commentId: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to like a comment",
        variant: "destructive",
      })
      return
    }

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.userLiked ? comment.likes - 1 : comment.likes + 1,
          userLiked: !comment.userLiked,
        }
      }
      return comment
    })

    setComments(updatedComments)
    localStorage.setItem(`comments-${courseId}`, JSON.stringify(updatedComments))
  }

  const handleReportComment = (commentId: string) => {
    toast({
      title: "Comment reported",
      description: "Thank you for reporting this comment. We will review it shortly.",
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Student Comments</h3>

      <div className="p-4 border rounded-lg bg-gray-50">
        <Textarea
          placeholder={isLoggedIn ? "Share your thoughts about this course..." : "Please log in to comment"}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-3 min-h-[100px]"
          disabled={!isLoggedIn || isSubmitting}
        />
        <div className="flex justify-end">
          <Button
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || !isLoggedIn || isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {isSubmitting ? (
              <>Posting...</>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Post Comment
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">{comments.length} Comments</h4>
        </div>

        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 border rounded-lg bg-white"
            >
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.userAvatar || "/placeholder.svg"} alt={comment.userName} />
                  <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">{comment.userName}</h5>
                      <p className="text-sm text-muted-foreground">{comment.date}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleReportComment(comment.id)}>
                          <Flag className="mr-2 h-4 w-4" />
                          <span>Report</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="mt-2">{comment.content}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex items-center gap-1 text-sm ${comment.userLiked ? "text-indigo-600" : ""}`}
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      <ThumbsUp className={`h-4 w-4 ${comment.userLiked ? "fill-indigo-600 text-indigo-600" : ""}`} />
                      <span>{comment.likes}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

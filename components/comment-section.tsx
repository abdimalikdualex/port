"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, Flag, MoreVertical, Send } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "@/hooks/use-toast"
import { getCommentsForCourse, addComment, likeComment } from "@/lib/data/comments"
import type { Comment } from "@/lib/data/comments"

export default function CommentSection({ courseId }: { courseId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const storedUserInfo = localStorage.getItem("userInfo")
    if (storedUserInfo) {
      setIsLoggedIn(true)
      setUserInfo(JSON.parse(storedUserInfo))
    }

    // Load comments
    const courseComments = getCommentsForCourse(courseId)
    setComments(courseComments)
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
      const newCommentObj = addComment(courseId, {
        courseId,
        userId: userInfo?.id || "guest",
        userName: userInfo?.name || "Guest User",
        userAvatar: userInfo?.avatar || "/placeholder.svg?height=40&width=40",
        content: newComment,
        date: "Just now",
        likes: 0,
        userLiked: false,
      })

      setComments([newCommentObj, ...comments])
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

    const success = likeComment(commentId, courseId)
    if (success) {
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
    }
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

"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Minimize, Maximize } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "@/hooks/use-toast"

interface Message {
  id: string
  content: string
  isFromAdmin: boolean
  createdAt: Date
}

interface ChatSupportProps {
  userId?: string
  userName?: string
}

export default function ChatSupport({ userId, userName }: ChatSupportProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [chatId, setChatId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          content: "Welcome to Express Academy support! How can we help you today?",
          isFromAdmin: true,
          createdAt: new Date(),
        },
      ])
    }
  }, [messages.length])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Load existing chat if available
  useEffect(() => {
    if (userId) {
      const loadChat = async () => {
        try {
          const response = await fetch(`/api/support-chat?userId=${userId}`)
          if (response.ok) {
            const data = await response.json()
            if (data.chat) {
              setChatId(data.chat.id)
              setMessages(data.chat.messages)
            }
          }
        } catch (error) {
          console.error("Failed to load chat:", error)
        }
      }

      loadChat()
    }
  }, [userId])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    if (!userId) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to use the chat support",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Optimistically add message to UI
    const tempId = Date.now().toString()
    const newMessage = {
      id: tempId,
      content: message,
      isFromAdmin: false,
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage("")

    try {
      const response = await fetch("/api/support-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
          chatId,
          userId,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setChatId(data.chatId)

        // Add automated response after a short delay
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              content: "Thanks for your message! Our team will get back to you soon.",
              isFromAdmin: true,
              createdAt: new Date(),
            },
          ])
        }, 1000)
      } else {
        toast({
          title: "Failed to send message",
          description: "Please try again later",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to send message:", error)
      toast({
        title: "Failed to send message",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={() => {
          setIsOpen(true)
          setIsMinimized(false)
        }}
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 p-0 bg-indigo-600 hover:bg-indigo-700 shadow-lg z-50"
        aria-label="Open chat support"
        style={{ display: isOpen ? "none" : "flex" }}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={
              isMinimized
                ? { opacity: 1, y: 0, scale: 0.9, height: "auto" }
                : { opacity: 1, y: 0, scale: 1, height: "auto" }
            }
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50 w-80 md:w-96"
          >
            <Card className="border-indigo-200 shadow-lg overflow-hidden">
              <CardHeader className="py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">Express Academy Support</CardTitle>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={() => setIsMinimized(!isMinimized)}
                    >
                      {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {!isMinimized && (
                <>
                  <CardContent className="p-4 h-80 overflow-y-auto bg-gray-50">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.isFromAdmin ? "justify-start" : "justify-end"}`}>
                          <div
                            className={`flex gap-2 max-w-[80%] ${msg.isFromAdmin ? "flex-row" : "flex-row-reverse"}`}
                          >
                            {msg.isFromAdmin && (
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Support" />
                                <AvatarFallback className="bg-indigo-600 text-white">EA</AvatarFallback>
                              </Avatar>
                            )}
                            <div
                              className={`rounded-lg p-3 ${
                                msg.isFromAdmin ? "bg-white border border-gray-200" : "bg-indigo-600 text-white"
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                              <p className="text-xs mt-1 opacity-70">
                                {new Date(msg.createdAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 border-t">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleSendMessage()
                      }}
                      className="flex w-full gap-2"
                    >
                      <Input
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1"
                        disabled={isLoading}
                      />
                      <Button
                        type="submit"
                        size="icon"
                        disabled={!message.trim() || isLoading}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardFooter>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

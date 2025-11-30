"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Trash2 } from "lucide-react"

interface Message {
  id: string
  sender: string
  senderRole: string
  subject: string
  preview: string
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
}

const mockMessages: Message[] = [
  {
    id: "msg1",
    sender: "John Doe",
    senderRole: "Student",
    subject: "Issue with course access",
    preview: "I'm unable to access the JavaScript course materials...",
    timestamp: "10 minutes ago",
    read: false,
    priority: "high",
  },
  {
    id: "msg2",
    sender: "Sarah Johnson",
    senderRole: "Instructor",
    subject: "Course approval request",
    preview: "I've submitted a new course for approval...",
    timestamp: "1 hour ago",
    read: false,
    priority: "medium",
  },
  {
    id: "msg3",
    sender: "Mike Davis",
    senderRole: "Student",
    subject: "Certificate request",
    preview: "Could you please issue my certificate for Web Design?...",
    timestamp: "2 hours ago",
    read: true,
    priority: "low",
  },
]

export default function MessagesPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [reply, setReply] = useState("")

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
      return
    }
  }, [router])

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((m) => m.id !== messageId))
  }

  const handleSendReply = () => {
    if (!reply.trim() || !selectedMessage) return
    setReply("")
    // In a real app, this would save the reply to the database
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Messages & Support</h1>
        <p className="text-slate-600 mt-1">Manage user messages and support tickets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Messages ({messages.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedMessage?.id === message.id
                      ? "bg-indigo-100 border-2 border-indigo-500"
                      : "bg-white border hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-semibold text-sm">{message.sender}</p>
                    <Badge
                      className={
                        message.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : message.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }
                    >
                      {message.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{message.subject}</p>
                  <p className="text-xs text-slate-500 truncate">{message.preview}</p>
                  <p className="text-xs text-slate-400 mt-2">{message.timestamp}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Message Detail & Reply */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedMessage.subject}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-sm text-slate-600">{selectedMessage.sender}</p>
                      <Badge variant="outline">{selectedMessage.senderRole}</Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-slate-700">{selectedMessage.preview}</p>
                  <p className="text-xs text-slate-500 mt-3">{selectedMessage.timestamp}</p>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">Your Reply</label>
                  <textarea
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={5}
                    placeholder="Type your reply message..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <Button onClick={handleSendReply} className="w-full bg-indigo-600 hover:bg-indigo-700">
                    <Send className="w-4 h-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-md h-full flex items-center justify-center min-h-96">
              <CardContent className="text-center">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">Select a message to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

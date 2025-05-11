"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, DollarSign, Film, Users } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$26,550",
    subValue: "KSH 3,451,500",
    icon: DollarSign,
    color: "from-green-400 to-emerald-500",
    increase: "+12.5%",
  },
  {
    title: "Total Students",
    value: "1,245",
    subValue: "125 this month",
    icon: Users,
    color: "from-blue-400 to-indigo-500",
    increase: "+8.2%",
  },
  {
    title: "Active Courses",
    value: "24",
    subValue: "3 new this month",
    icon: BookOpen,
    color: "from-purple-400 to-pink-500",
    increase: "+4.5%",
  },
  {
    title: "Total Videos",
    value: "342",
    subValue: "18 new this month",
    icon: Film,
    color: "from-orange-400 to-red-500",
    increase: "+5.3%",
  },
]

export default function AdminStatCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
        >
          <Card className="overflow-hidden border-purple-200">
            <div
              className="h-1 bg-gradient-to-r w-full"
              style={{
                backgroundImage: `linear-gradient(to right, ${stat.color.split(" ")[1]}, ${stat.color.split(" ")[3]})`,
              }}
            />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="mt-1 text-2xl font-bold">{stat.value}</h3>
                  <p className="text-xs text-muted-foreground">{stat.subValue}</p>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="mt-4 text-sm font-medium text-green-600">{stat.increase} from last month</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

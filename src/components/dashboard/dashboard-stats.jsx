'use client'

import { useAuthStore } from '@/store/auth-store'
import { useTaskStore } from '@/store/task-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Timer
} from 'lucide-react'
import { formatTime } from '@/lib/utils'

export function DashboardStats() {
  const { user } = useAuthStore()
  const { getTaskStats } = useTaskStore()
  
  const stats = getTaskStats(user?.role, user?.id)

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: CheckCircle,
      color: 'text-blue-500'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      color: 'text-yellow-500'
    },
    {
      title: 'High Priority',
      value: stats.highPriority,
      icon: AlertTriangle,
      color: 'text-red-500'
    },
    {
      title: 'Time Spent',
      value: formatTime(stats.totalTimeSpent),
      icon: Timer,
      color: 'text-green-500'
    }
  ]

  if (user?.role === 'manager') {
    statCards.push({
      title: 'Pending Approval',
      value: stats.pendingApproval,
      icon: Users,
      color: 'text-orange-500'
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
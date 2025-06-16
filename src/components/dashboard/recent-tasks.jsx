'use client'

import { useAuthStore } from '@/store/auth-store'
import { useTaskStore } from '@/store/task-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate, getPriorityColor, getStatusColor } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function RecentTasks() {
  const { user } = useAuthStore()
  const { getFilteredTasks } = useTaskStore()
  
  const tasks = getFilteredTasks(user?.role, user?.id)
    .slice(0, 6) 

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Tasks</CardTitle>
        <Link href="/tasks">
          <Button variant="ghost" size="sm">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No tasks found
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium truncate">{task.title}</h4>
                  <Badge
                    variant="secondary"
                    className={`${getPriorityColor(task.priority)} text-white text-xs`}
                  >
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(task.status)} text-white border-none`}
                  >
                    {task.status.replace('-', ' ')}
                  </Badge>
                  <span>•</span>
                  <span>{formatDate(task.updatedAt)}</span>
                </div>
              </div>
              <Link href={`/tasks/${task.id}`}>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { useTaskStore } from '@/store/task-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDate, formatTime, getPriorityColor, getStatusColor } from '@/lib/utils'
import { 
  Calendar, 
  Clock, 
  MoreVertical, 
  Edit, 
  Trash2, 
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react'

export function TaskCard({ task }) {
  const router = useRouter()
  const { user } = useAuthStore()
  const { deleteTask, updateTask, requestApproval, approveTask, reopenTask } = useTaskStore()
  const [isLoading, setIsLoading] = useState(false)

  const canEdit = user?.role === 'developer' && task.assigneeId === user?.id
  const canApprove = user?.role === 'manager' && task.status === 'pending-approval'
  const canRequestApproval = user?.role === 'developer' && 
    task.assigneeId === user?.id && 
    ['in-progress', 'testing'].includes(task.status)

  const handleEdit = () => {
    router.push(`/tasks/${task.id}`)
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      setIsLoading(true)
      deleteTask(task.id)
      setIsLoading(false)
    }
  }

  const handleRequestApproval = async () => {
    setIsLoading(true)
    requestApproval(task.id)
    setIsLoading(false)
  }

  const handleApprove = async () => {
    setIsLoading(true)
    approveTask(task.id)
    setIsLoading(false)
  }

  const handleReopen = async () => {
    setIsLoading(true)
    reopenTask(task.id)
    setIsLoading(false)
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate mb-2">
              {task.title}
            </CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="secondary"
                className={`${getPriorityColor(task.priority)} text-white text-xs`}
              >
                {task.priority}
              </Badge>
              <Badge
                variant="outline"
                className={`${getStatusColor(task.status)} text-white border-none text-xs`}
              >
                {task.status.replace('-', ' ')}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {task.type}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/tasks/${task.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {canEdit && (
                <>
                  <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </>
              )}
              {canRequestApproval && (
                <DropdownMenuItem onClick={handleRequestApproval}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Request Approval
                </DropdownMenuItem>
              )}
              {canApprove && (
                <>
                  <DropdownMenuItem onClick={handleApprove}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleReopen}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Reopen
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {task.description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Due: {formatDate(task.dueDate)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Time: {formatTime(task.timeSpent)}</span>
          </div>
          
          {user?.role === 'manager' && (
            <div className="text-muted-foreground">
              <span>Assignee: {task.assignee}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
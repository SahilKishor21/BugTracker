'use client'

import { useParams, useRouter } from 'next/navigation'
import { AuthGuard } from '@/components/auth/auth-guard'
import { useTaskStore } from '@/store/task-store'
import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TimeTracker } from '@/components/tasks/time-tracker'
import { formatDate, getPriorityColor, getStatusColor } from '@/lib/utils'
import { ArrowLeft, Edit, CheckCircle, XCircle } from 'lucide-react'

export default function TaskDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuthStore()
  const { tasks, requestApproval, approveTask, reopenTask } = useTaskStore()
  
  const task = tasks.find(t => t.id === params.id)

  if (!task) {
    return (
      <AuthGuard>
        <div className="main-container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Task Not Found</h1>
            <Button onClick={() => router.push('/tasks')}>
              Back to Tasks
            </Button>
          </div>
        </div>
      </AuthGuard>
    )
  }

  const canEdit = user?.role === 'developer' && task.assigneeId === user?.id
  const canApprove = user?.role === 'manager' && task.status === 'pending-approval'
  const canRequestApproval = user?.role === 'developer' && 
    task.assigneeId === user?.id && 
    ['in-progress', 'testing'].includes(task.status)

  return (
    <AuthGuard>
        <div className=' bg-muted/50'>
      <div className="main-container py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{task.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Badge
                  variant="secondary"
                  className={`${getPriorityColor(task.priority)} text-white`}
                >
                  {task.priority} priority
                </Badge>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(task.status)} text-white border-none`}
                >
                  {task.status.replace('-', ' ')}
                </Badge>
                <Badge variant="outline">
                  {task.type}
                </Badge>
              </div>
            </div>
            
            <div className="flex gap-2">
              {canEdit && (
                <Button onClick={() => router.push(`/tasks/${task.id}/edit`)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
              {canRequestApproval && (
                <Button onClick={() => requestApproval(task.id)}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Request Approval
                </Button>
              )}
              {canApprove && (
                <>
                  <Button onClick={() => approveTask(task.id)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="outline" onClick={() => reopenTask(task.id)}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Reopen
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{task.description}</p>
              </CardContent>
            </Card>

            <TimeTracker task={task} />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Assignee</div>
                  <div>{task.assignee}</div>
                </div>
                
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Creator</div>
                  <div>{task.creator}</div>
                </div>
                
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Created</div>
                  <div>{formatDate(task.createdAt)}</div>
                </div>
                
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Last Updated</div>
                  <div>{formatDate(task.updatedAt)}</div>
                </div>
                
                <div>
                  <div className="font-medium text-sm text-muted-foreground">Due Date</div>
                  <div>{formatDate(task.dueDate)}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </AuthGuard>
  )
}
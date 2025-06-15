'use client'

import { useParams } from 'next/navigation'
import { AuthGuard } from '@/components/auth/auth-guard'
import { TaskForm } from '@/components/tasks/task-form'

export default function EditTaskPage() {
  const params = useParams()

  return (
    <AuthGuard>
      <div className=' bg-muted/50'>
        <div className="main-container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Edit Task</h1>
            <p className="text-muted-foreground">
              Update the task details below
            </p>
          </div>

          <TaskForm taskId={params.id} />
        </div>
      </div>
    </AuthGuard>
  )
}
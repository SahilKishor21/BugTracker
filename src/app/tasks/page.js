'use client'

import { AuthGuard } from '@/components/auth/auth-guard'
import { TaskList } from '@/components/tasks/task-list'
import { TaskFilters } from '@/components/tasks/task-filters'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'

export default function TasksPage() {
  const router = useRouter()
  const { user } = useAuthStore()

  return (
    <AuthGuard>
        <div className="bg-muted/50">
      <div className="main-container py-8">
        <div className="flex-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Tasks & Bugs</h1>
            <p className="text-muted-foreground">
              Manage and track your {user?.role === 'manager' ? 'team\'s' : ''} tasks and bugs
            </p>
          </div>
          {user?.role === 'developer' && (
            <Button onClick={() => router.push('/tasks/new')}>
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          )}
        </div>

        <div className="space-y-6">
          <TaskFilters />
          <TaskList />
        </div>
      </div>
        </div>
    </AuthGuard>
  )
}
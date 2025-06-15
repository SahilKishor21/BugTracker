'use client'

import { useAuthStore } from '@/store/auth-store'
import { useTaskStore } from '@/store/task-store'
import { TaskCard } from './task-card'

export function TaskList() {
  const { user } = useAuthStore()
  const { getFilteredTasks } = useTaskStore()
  
  const tasks = getFilteredTasks(user?.role, user?.id)

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12  rounded-lg">
        <p className="text-muted-foreground text-lg mb-4">
          No tasks found matching your criteria
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}
import { useTaskStore } from '@/store/task-store'
import { useAuth } from './use-auth'

export function useTasks() {
  const { user } = useAuth()
  const {
    tasks,
    filters,
    createTask,
    updateTask,
    deleteTask,
    getFilteredTasks,
    getTaskStats,
    setFilters,
    clearFilters,
    addTimeEntry,
    requestApproval,
    approveTask,
    reopenTask
  } = useTaskStore()

  const filteredTasks = getFilteredTasks(user?.role, user?.id)
  const stats = getTaskStats(user?.role, user?.id)

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    stats,
    filters,
    createTask,
    updateTask,
    deleteTask,
    setFilters,
    clearFilters,
    addTimeEntry,
    requestApproval,
    approveTask,
    reopenTask
  }
}
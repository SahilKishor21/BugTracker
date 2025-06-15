import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function formatTime(minutes) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

export function getPriorityColor(priority) {
  switch (priority) {
    case 'high':
      return 'bg-red-500'
    case 'medium':
      return 'bg-yellow-500'
    case 'low':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

export function getStatusColor(status) {
  switch (status) {
    case 'open':
      return 'bg-blue-500'
    case 'in-progress':
      return 'bg-yellow-500'
    case 'testing':
      return 'bg-purple-500'
    case 'closed':
      return 'bg-green-500'
    case 'pending-approval':
      return 'bg-orange-500'
    default:
      return 'bg-gray-500'
  }
}
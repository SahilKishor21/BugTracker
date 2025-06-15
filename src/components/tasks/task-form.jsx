'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { useTaskStore } from '@/store/task-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PRIORITIES, STATUSES, TASK_TYPES, MOCK_USERS } from '@/lib/constants'
import { Loader2 } from 'lucide-react'

export function TaskForm({ taskId = null }) {
  const router = useRouter()
  const { user } = useAuthStore()
  const { tasks, createTask, updateTask } = useTaskStore()
  const [isLoading, setIsLoading] = useState(false)
  
  const existingTask = taskId ? tasks.find(t => t.id === taskId) : null
  const isEditing = !!existingTask

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'bug',
    priority: 'medium',
    status: 'open',
    assigneeId: '',
    dueDate: '',
  })

  const [originalFormData, setOriginalFormData] = useState(null)

  useEffect(() => {
    if (existingTask) {
      const taskFormData = {
        title: existingTask.title || '',
        description: existingTask.description || '',
        type: existingTask.type || 'bug',
        priority: existingTask.priority || 'medium',
        status: existingTask.status || 'open',
        assigneeId: existingTask.assigneeId || '',
        dueDate: existingTask.dueDate ? new Date(existingTask.dueDate).toISOString().split('T')[0] : '',
      }
      
      console.log('Setting form data from existing task:', taskFormData)
      setFormData(taskFormData)
      setOriginalFormData(taskFormData) // Store original for comparison
    }
  }, [existingTask])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing && originalFormData) {
        // Find only the fields that actually changed
        const changedFields = {}
        
        Object.keys(formData).forEach(key => {
          if (formData[key] !== originalFormData[key]) {
            console.log(`Field ${key} changed from "${originalFormData[key]}" to "${formData[key]}"`)
            
            if (key === 'dueDate') {
              changedFields[key] = new Date(formData[key])
            } else if (key === 'assigneeId') {
              // If assignee changed, also update assignee name
              changedFields[key] = formData[key]
              const assignee = MOCK_USERS.find(u => u.id === formData[key])
              changedFields.assignee = assignee?.name || ''
            } else {
              changedFields[key] = formData[key]
            }
          }
        })

        console.log('Changed fields to update:', changedFields)

        // Only call updateTask if there are actual changes
        if (Object.keys(changedFields).length > 0) {
          updateTask(taskId, changedFields)
        } else {
          console.log('No changes detected, skipping update')
        }
      } else {
        // For new tasks, create with all fields
        const assignee = MOCK_USERS.find(u => u.id === formData.assigneeId)
        
        const taskData = {
          ...formData,
          assignee: assignee?.name || '',
          creator: user?.name || '',
          creatorId: user?.id || '',
          dueDate: new Date(formData.dueDate),
        }
        createTask(taskData)
      }
      
      router.push('/tasks')
    } catch (error) {
      console.error('Error saving task:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field, value) => {
    console.log(`Form field ${field} changed to:`, value)
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const developers = MOCK_USERS.filter(u => u.role === 'developer')

  // Don't render form until we have original data for editing
  if (isEditing && !originalFormData) {
    return <div>Loading...</div>
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {isEditing ? 'Edit Task' : 'Create New Task'}
        </CardTitle>
        {isEditing && (
          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>Current values:</strong></p>
            <p>Type: {originalFormData?.type}, Priority: {originalFormData?.priority}, Status: {originalFormData?.status}</p>
            <p>Assignee ID: {originalFormData?.assigneeId}</p>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Enter task description"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority *</Label>
              <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isEditing && (
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Assignee *</Label>
              <Select value={formData.assigneeId} onValueChange={(value) => handleChange('assigneeId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {developers.map((dev) => (
                    <SelectItem key={dev.id} value={dev.id}>
                      {dev.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Update Task' : 'Create Task'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
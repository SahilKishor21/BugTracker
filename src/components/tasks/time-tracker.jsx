'use client'

import { useState } from 'react'
import { useTaskStore } from '@/store/task-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatTime, formatDate } from '@/lib/utils'
import { Clock, Plus } from 'lucide-react'

export function TimeTracker({ task }) {
  const { addTimeEntry } = useTaskStore()
  const [isAdding, setIsAdding] = useState(false)
  const [timeData, setTimeData] = useState({
    hours: '',
    minutes: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const hours = parseInt(timeData.hours || 0)
    const minutes = parseInt(timeData.minutes || 0)
    const totalMinutes = hours * 60 + minutes
    
    console.log('Submitting time entry:', { hours, minutes, totalMinutes, description: timeData.description, date: timeData.date })
    
    if (totalMinutes > 0) {
      addTimeEntry(task.id, {
        date: timeData.date,
        minutes: totalMinutes,
        description: timeData.description || 'Time entry'
      })
      
      // Reset form
      setTimeData({
        hours: '',
        minutes: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      })
      setIsAdding(false)
      
      console.log('Time entry added successfully')
    } else {
      alert('Please enter hours or minutes greater than 0')
    }
  }

  const handleCancel = () => {
    setTimeData({
      hours: '',
      minutes: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    })
    setIsAdding(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Time Tracking
        </CardTitle>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-sm">
            Total: {formatTime(task.timeSpent || 0)}
          </Badge>
          <Button size="sm" onClick={() => setIsAdding(!isAdding)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Time
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isAdding && (
          <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={timeData.date}
                  onChange={(e) => setTimeData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hours">Hours</Label>
                <Input
                  id="hours"
                  type="number"
                  min="0"
                  max="23"
                  value={timeData.hours}
                  onChange={(e) => setTimeData(prev => ({ ...prev, hours: e.target.value }))}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="minutes">Minutes</Label>
                <Input
                  id="minutes"
                  type="number"
                  min="0"
                  max="59"
                  value={timeData.minutes}
                  onChange={(e) => setTimeData(prev => ({ ...prev, minutes: e.target.value }))}
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={timeData.description}
                onChange={(e) => setTimeData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="What did you work on?"
                rows={2}
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit">Add Time Entry</Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          <h4 className="font-medium">Time Entries ({task.timeEntries?.length || 0})</h4>
          {!task.timeEntries || task.timeEntries.length === 0 ? (
            <p className="text-muted-foreground text-sm">No time entries yet</p>
          ) : (
            <div className="space-y-2">
              {task.timeEntries.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="font-medium">{formatTime(entry.minutes)}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(entry.date)}
                      </div>
                    </div>
                    {entry.description && (
                      <div className="text-sm mt-1 text-muted-foreground">{entry.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
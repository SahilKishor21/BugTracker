'use client'

import { useAuthStore } from '@/store/auth-store'
import { useTaskStore } from '@/store/task-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

export function TaskChart() {
  const { user } = useAuthStore()
  const { getChartData } = useTaskStore()
  
  const chartData = getChartData(user?.role, user?.id)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Trends (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tasks" fill="#8884d8" name="Total Tasks" />
            <Bar dataKey="completed" fill="#82ca9d" name="Completed" />
            <Bar dataKey="inProgress" fill="#ffc658" name="In Progress" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
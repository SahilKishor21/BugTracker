import { create } from 'zustand'
import { MOCK_TASKS } from '@/lib/mock-data'
import { generateId } from '@/lib/utils'

export const useTaskStore = create((set, get) => ({
  tasks: MOCK_TASKS,
  filters: {
    status: '',
    priority: '',
    assignee: '',
    type: '',
    search: ''
  },
  sortBy: 'createdAt',
  sortOrder: 'desc',

  // Task CRUD operations
  createTask: (taskData) => {
    const newTask = {
      ...taskData,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      timeSpent: 0,
      timeEntries: []
    }
    set(state => ({
      tasks: [...state.tasks, newTask]
    }))
    return newTask
  },

 updateTask: (taskId, updates) => {
  set(state => {
    console.log('updateTask called with:', { taskId, updates })
    
    const taskIndex = state.tasks.findIndex(task => task.id === taskId)
    if (taskIndex === -1) {
      console.error('Task not found:', taskId)
      return state
    }
    
    const existingTask = state.tasks[taskIndex]
    console.log('Existing task:', existingTask)

    
    const updatedTask = {
      ...existingTask,  
      ...updates,       
      id: existingTask.id,  
      updatedAt: new Date() 
    }
    
    console.log('Updated task:', updatedTask)
    
    const newTasks = [...state.tasks]
    newTasks[taskIndex] = updatedTask
    
    return { tasks: newTasks }
  })
},

  deleteTask: (taskId) => {
    set(state => ({
      tasks: state.tasks.filter(task => task.id !== taskId)
    }))
  },

  getFilteredTasks: (userRole, userId) => {
  const { tasks, filters, sortBy, sortOrder } = get()
  
  console.log('getFilteredTasks called with:', { userRole, userId })
  console.log('All tasks:', tasks)
  
  let filteredTasks = tasks.filter(task => {
    // Role-based filtering
    if (userRole === 'developer') {
      console.log('Checking task for developer:', { taskId: task.id, taskAssigneeId: task.assigneeId, userId })
      if (task.assigneeId !== userId) {
        console.log('Task filtered out - assigneeId mismatch')
        return false
      }
    }
    
    // Apply other filters...
    if (filters.status && task.status !== filters.status) return false
    if (filters.priority && task.priority !== filters.priority) return false
    if (filters.type && task.type !== filters.type) return false
    if (filters.assignee && task.assigneeId !== filters.assignee) return false
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !task.description.toLowerCase().includes(filters.search.toLowerCase())) return false
    
    return true
  })

  console.log('Filtered tasks:', filteredTasks)
  
  // Apply sorting...
  filteredTasks.sort((a, b) => {
    let aValue = a[sortBy]
    let bValue = b[sortBy]
    
    if (sortBy === 'createdAt' || sortBy === 'updatedAt' || sortBy === 'dueDate') {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return filteredTasks
},

  // Time tracking
addTimeEntry: (taskId, timeEntry) => {
  console.log('addTimeEntry called with:', { taskId, timeEntry })
  
  set(state => {
    const taskIndex = state.tasks.findIndex(task => task.id === taskId)
    if (taskIndex === -1) {
      console.error('Task not found for time entry:', taskId)
      return state
    }

    const existingTask = state.tasks[taskIndex]
    const updatedTask = {
      ...existingTask,
      timeEntries: [...(existingTask.timeEntries || []), timeEntry],
      timeSpent: (existingTask.timeSpent || 0) + timeEntry.minutes,
      updatedAt: new Date()
    }

    console.log('Task updated with time entry:', updatedTask)

    const newTasks = [...state.tasks]
    newTasks[taskIndex] = updatedTask

    return { tasks: newTasks }
  })
},

  // Status management
  requestApproval: (taskId) => {
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === taskId
          ? { ...task, status: 'pending-approval', updatedAt: new Date() }
          : task
      )
    }))
  },

  approveTask: (taskId) => {
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === taskId
          ? { ...task, status: 'closed', updatedAt: new Date() }
          : task
      )
    }))
  },

  reopenTask: (taskId) => {
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === taskId
          ? { ...task, status: 'open', updatedAt: new Date() }
          : task
      )
    }))
  },

  // Filtering and sorting
  setFilters: (filters) => {
    set(state => ({
      filters: { ...state.filters, ...filters }
    }))
  },

  setSorting: (sortBy, sortOrder) => {
    set({ sortBy, sortOrder })
  },

  clearFilters: () => {
    set({
      filters: {
        status: '',
        priority: '',
        assignee: '',
        type: '',
        search: ''
      }
    })
  },

  // Getters
  getFilteredTasks: (userRole, userId) => {
    const { tasks, filters, sortBy, sortOrder } = get()
    
    let filteredTasks = tasks.filter(task => {
      // Role-based filtering
      if (userRole === 'developer') {
        // Developers see only their tasks
        if (task.assigneeId !== userId) return false
      }
      
      // Apply filters
      if (filters.status && task.status !== filters.status) return false
      if (filters.priority && task.priority !== filters.priority) return false
      if (filters.type && task.type !== filters.type) return false
      if (filters.assignee && task.assigneeId !== filters.assignee) return false
      if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !task.description.toLowerCase().includes(filters.search.toLowerCase())) return false
      
      return true
    })

    // Apply sorting
    filteredTasks.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (sortBy === 'createdAt' || sortBy === 'updatedAt' || sortBy === 'dueDate') {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filteredTasks
  },

  getTaskStats: (userRole, userId) => {
    const { tasks } = get()
    
    let userTasks = tasks
    if (userRole === 'developer') {
      userTasks = tasks.filter(task => task.assigneeId === userId)
    }

    return {
      total: userTasks.length,
      open: userTasks.filter(task => task.status === 'open').length,
      inProgress: userTasks.filter(task => task.status === 'in-progress').length,
      testing: userTasks.filter(task => task.status === 'testing').length,
      pendingApproval: userTasks.filter(task => task.status === 'pending-approval').length,
      closed: userTasks.filter(task => task.status === 'closed').length,
      highPriority: userTasks.filter(task => task.priority === 'high').length,
      totalTimeSpent: userTasks.reduce((total, task) => total + task.timeSpent, 0)
    }
  },

  getChartData: (userRole, userId) => {
  const { tasks } = get()
  
  let userTasks = tasks
  if (userRole === 'developer') {
    userTasks = tasks.filter(task => task.assigneeId === userId)
  }

  console.log('Chart data - userTasks:', userTasks)

  if (userTasks.length === 0) {
    const last7Days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      last7Days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        tasks: 0,
        completed: 0,
        inProgress: 0
      })
    }
    return last7Days
  }

  const last7Days = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    const dayData = {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      tasks: 0,
      completed: 0,
      inProgress: 0
    }

    if (i === 6) {
      dayData.tasks = Math.min(2, userTasks.length)
      dayData.inProgress = Math.min(1, userTasks.filter(t => t.status === 'in-progress').length)
      dayData.completed = Math.min(1, userTasks.filter(t => t.status === 'closed').length)
    } else if (i === 4) { 
      dayData.tasks = Math.min(3, userTasks.length)
      dayData.inProgress = Math.min(2, userTasks.filter(t => t.status === 'in-progress').length)
      dayData.completed = Math.min(1, userTasks.filter(t => t.status === 'closed').length)
    } else if (i === 2) { 
      dayData.tasks = Math.min(2, userTasks.length)
      dayData.inProgress = Math.min(1, userTasks.filter(t => t.status === 'in-progress').length)
      dayData.completed = Math.min(1, userTasks.filter(t => t.status === 'closed').length)
    } else if (i === 0) { 
      dayData.tasks = Math.min(1, userTasks.length)
      dayData.inProgress = Math.min(1, userTasks.filter(t => t.status === 'in-progress').length)
      dayData.completed = 0
    }

    last7Days.push(dayData)
  }

  console.log('Chart data generated:', last7Days)
  return last7Days
},
}))
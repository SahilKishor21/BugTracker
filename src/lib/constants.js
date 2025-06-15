export const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
]

export const STATUSES = [
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'testing', label: 'Testing' },
  { value: 'pending-approval', label: 'Pending Approval' },
  { value: 'closed', label: 'Closed' }
]

export const TASK_TYPES = [
  { value: 'bug', label: 'Bug' },
  { value: 'feature', label: 'Feature' },
  { value: 'enhancement', label: 'Enhancement' },
  { value: 'task', label: 'Task' }
]

export const MOCK_USERS = [
  {
    id: '1',
    email: 'dev@example.com',
    password: 'dev123',
    name: 'John Developer',
    role: 'developer'
  },
  {
    id: '2',
    email: 'manager@example.com',
    password: 'manager123',
    name: 'Jane Manager',
    role: 'manager'
  },
  {
    id: '3',
    email: 'dev2@example.com',
    password: 'dev123',
    name: 'Alice Developer',
    role: 'developer'
  }
]

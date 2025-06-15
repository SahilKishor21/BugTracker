import { generateId } from './utils'
export const MOCK_TASKS = [
  {
    id: '1',
    title: 'Fix login authentication bug',
    description: 'Users are unable to login with correct credentials. The authentication service seems to be rejecting valid tokens.',
    type: 'bug',
    priority: 'high',
    status: 'in-progress',
    assignee: 'John Developer',
    assigneeId: '1',
    creator: 'Jane Manager',
    creatorId: '2',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16'),
    dueDate: new Date('2024-01-20'),
    timeSpent: 120, // minutes
    timeEntries: [
      { date: '2024-01-15', minutes: 60, description: 'Initial investigation' },
      { date: '2024-01-16', minutes: 60, description: 'Debugging authentication flow' }
    ]
  },
  {
    id: '2',
    title: 'Implement dark mode toggle',
    description: 'Add a dark mode toggle to the application header that persists user preference.',
    type: 'feature',
    priority: 'medium',
    status: 'testing',
    assignee: 'Alice Developer',
    assigneeId: '3',
    creator: 'Jane Manager',
    creatorId: '2',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-17'),
    dueDate: new Date('2024-01-25'),
    timeSpent: 240,
    timeEntries: [
      { date: '2024-01-10', minutes: 120, description: 'Research and planning' },
      { date: '2024-01-15', minutes: 120, description: 'Implementation' }
    ]
  },
  {
    id: '3',
    title: 'Database performance optimization',
    description: 'Optimize slow queries in the tasks dashboard. Current load time is over 3 seconds.',
    type: 'enhancement',
    priority: 'high',
    status: 'pending-approval',
    assignee: 'John Developer',
    assigneeId: '1',
    creator: 'John Developer',
    creatorId: '1',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-18'),
    dueDate: new Date('2024-01-22'),
    timeSpent: 180,
    timeEntries: [
      { date: '2024-01-12', minutes: 90, description: 'Query analysis' },
      { date: '2024-01-17', minutes: 90, description: 'Index optimization' }
    ]
  },
  {
    id: '4',
    title: 'Update user profile page',
    description: 'Add ability to update user avatar and contact information.',
    type: 'task',
    priority: 'low',
    status: 'open',
    assignee: 'Alice Developer',
    assigneeId: '3',
    creator: 'Jane Manager',
    creatorId: '2',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
    dueDate: new Date('2024-02-01'),
    timeSpent: 0,
    timeEntries: []
  },
  {
    id: '5',
    title: 'API rate limiting implementation',
    description: 'Implement rate limiting to prevent API abuse and ensure fair usage.',
    type: 'enhancement',
    priority: 'medium',
    status: 'closed',
    assignee: 'John Developer',
    assigneeId: '1',
    creator: 'Jane Manager',
    creatorId: '2',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-14'),
    dueDate: new Date('2024-01-15'),
    timeSpent: 300,
    timeEntries: [
      { date: '2024-01-05', minutes: 120, description: 'Planning and research' },
      { date: '2024-01-08', minutes: 120, description: 'Implementation' },
      { date: '2024-01-12', minutes: 60, description: 'Testing and documentation' }
      ]
    }
  ];
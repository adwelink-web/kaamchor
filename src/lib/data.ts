import type { User, Task, Helper } from '@/lib/types';

export const mockUsers: User[] = [
  { id: 'user-1', name: 'Alice Johnson', email: 'alice@example.com', avatarUrl: 'https://picsum.photos/seed/avatar1/100/100', location: 'San Francisco, CA' },
  { id: 'user-2', name: 'Bob Williams', email: 'bob@example.com', avatarUrl: 'https://picsum.photos/seed/avatar2/100/100', location: 'New York, NY' },
  { id: 'user-3', name: 'Charlie Brown', email: 'charlie@example.com', avatarUrl: 'https://picsum.photos/seed/avatar3/100/100', location: 'Austin, TX' },
  { id: 'user-4', name: 'Diana Prince', email: 'diana@example.com', avatarUrl: 'https://picsum.photos/seed/avatar4/100/100', location: 'Chicago, IL' },
];

export const mockHelpers: Helper[] = [
  { id: 'helper-1', name: 'Bob Williams', avatarUrl: 'https://picsum.photos/seed/avatar2/100/100', location: 'New York, NY', skills: ['Plumbing', 'Electrical'], rating: 4.8, pastWork: 'Fixed leaky faucets and installed new light fixtures for several clients.' },
  { id: 'helper-2', name: 'Charlie Brown', avatarUrl: 'https://picsum.photos/seed/avatar3/100/100', location: 'Austin, TX', skills: ['Gardening', 'Landscaping'], rating: 4.9, pastWork: 'Designed and maintained gardens, including planting, weeding, and lawn care.' },
  { id: 'helper-3', name: 'Diana Prince', avatarUrl: 'https://picsum.photos/seed/avatar4/100/100', location: 'Chicago, IL', skills: ['Personal Shopping', 'Delivery'], rating: 4.7, pastWork: 'Completed grocery shopping and package deliveries efficiently.' },
  { id: 'helper-4', name: 'Ethan Hunt', avatarUrl: 'https://picsum.photos/seed/avatar5/100/100', location: 'New York, NY', skills: ['Moving', 'Furniture Assembly'], rating: 4.6, pastWork: 'Helped with apartment moves and assembled various types of furniture.' },
];

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Fix a leaky kitchen faucet',
    description: 'The faucet in my kitchen is constantly dripping. It needs to be repaired or replaced.',
    category: 'home',
    location: 'New York, NY',
    price: 75,
    status: 'Posted',
    requesterId: 'user-1',
    createdAt: new Date(2023, 10, 15),
  },
  {
    id: 'task-2',
    title: 'Assemble a new bookshelf',
    description: 'I have a new IKEA bookshelf that needs to be assembled. All tools are provided.',
    category: 'home',
    location: 'Austin, TX',
    price: 50,
    status: 'Accepted',
    requesterId: 'user-2',
    helperId: 'helper-4',
    createdAt: new Date(2023, 10, 14),
  },
  {
    id: 'task-3',
    title: 'Weekly grocery shopping',
    description: 'Need someone to do my weekly grocery shopping. List will be provided.',
    category: 'shopping',
    location: 'Chicago, IL',
    price: 30,
    status: 'Completed',
    requesterId: 'user-4',
    helperId: 'helper-3',
    createdAt: new Date(2023, 10, 10),
  },
  {
    id: 'task-4',
    title: 'Garden weeding and cleanup',
    description: 'My garden is overgrown with weeds and needs a thorough cleanup.',
    category: 'gardening',
    location: 'Austin, TX',
    price: 100,
    status: 'Posted',
    requesterId: 'user-1',
    createdAt: new Date(2023, 10, 16),
  },
    {
    id: 'task-5',
    title: 'Ride to the airport',
    description: 'Need a ride to JFK airport on Saturday morning.',
    category: 'transport',
    location: 'New York, NY',
    price: 40,
    status: 'Posted',
    requesterId: 'user-3',
    createdAt: new Date(2023, 10, 17),
  },
];

export const getCurrentUser = (): User => mockUsers[0];

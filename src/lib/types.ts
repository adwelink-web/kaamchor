export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  location: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  price: number;
  status: 'Posted' | 'Accepted' | 'In Progress' | 'Completed';
  requesterId: string;
  helperId?: string;
  createdAt: Date;
  imageUrl?: string;
};

export type Helper = {
  id: string;
  name: string;
  avatarUrl: string;
  location: string;
  skills: string[];
  rating: number;
  pastWork: string;
};

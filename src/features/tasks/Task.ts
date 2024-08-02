export interface Task {
    id: string;
    title: string;
    description?: string;
    deadline?: string;
    status: 'Pending' | 'Completed' | 'Overdue' | 'Removed';
  }
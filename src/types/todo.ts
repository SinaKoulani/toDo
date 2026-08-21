export interface Todo {
  id: string;
  listId: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface TodoList {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export type TaskStatus = 'TODO' | 'DONE'

export interface Task {
  id: number
  title: string
  description: string
  status: TaskStatus
}

export interface CreateTaskPayload {
  title: string
  description: string
  status: TaskStatus
}

export interface UpdateTaskPayload {
  title?: string
  description?: string
  status?: TaskStatus
}
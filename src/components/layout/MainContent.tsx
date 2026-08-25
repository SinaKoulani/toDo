import type { Task } from '../../types/todo'
import TodoForm from '../todos/TodoForm'
import TodoList from '../todos/TodoList'

type MainContentProps = {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  onCreateTask: (title: string, description: string) => void
  onToggleTask: (task: Task) => void
  onEditTask: (taskId: number, title: string) => void
  onDeleteTask: (taskId: number) => void
}

function MainContent({
  tasks,
  isLoading,
  error,
  onCreateTask,
  onToggleTask,
  onEditTask,
  onDeleteTask,
}: MainContentProps) {
  return (
    <div className="mx-auto max-w-2xl p-6">
      {error && (
        <p className="mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <TodoForm onCreateTask={onCreateTask} />

      {isLoading ? (
        <p className="text-sm text-[var(--color-text-muted)]">Loading tasks...</p>
      ) : (
        <TodoList
          tasks={tasks}
          onToggleTask={onToggleTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      )}
    </div>
  )
}

export default MainContent
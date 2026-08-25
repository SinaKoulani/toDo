import type { Task } from '../../types/todo'
import TodoItem from './TodoItem'

type TodoListProps = {
  tasks: Task[]
  onToggleTask: (task: Task) => void
  onEditTask: (taskId: number, title: string) => void
  onDeleteTask: (taskId: number) => void
}

function TodoList({ tasks, onToggleTask, onEditTask, onDeleteTask }: TodoListProps) {
  const sortedTasks = [...tasks].sort((a, b) => a.id - b.id)
  const activeTasks = sortedTasks.filter((task) => task.status !== 'DONE')
  const completedTasks = sortedTasks.filter((task) => task.status === 'DONE')

  if (tasks.length === 0) {
    return (
      <p className="text-sm text-[var(--color-text-muted)]">
        No todos yet. Add one above.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2">
        {activeTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onToggleTask={onToggleTask}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </ul>

      {completedTasks.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-[var(--color-text-muted)]">
            Completed
          </h3>
          <ul className="flex flex-col gap-2">
            {completedTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onToggleTask={onToggleTask}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TodoList
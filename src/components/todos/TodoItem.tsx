import { useState, type KeyboardEvent } from 'react'
import type { Task } from '../../types/todo'

type TodoItemProps = {
  task: Task
  onToggleTask: (task: Task) => void
  onEditTask: (taskId: number, title: string) => void
  onDeleteTask: (taskId: number) => void
}

function TodoItem({ task, onToggleTask, onEditTask, onDeleteTask }: TodoItemProps) {
  const isCompleted = task.status === 'DONE'

  const [isEditing, setIsEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(task.title)

  const commitEdit = () => {
    const trimmedTitle = draftTitle.trim()

    if (trimmedTitle) {
      onEditTask(task.id, trimmedTitle)
    }

    setIsEditing(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      commitEdit()
    }

    if (event.key === 'Escape') {
      setDraftTitle(task.title)
      setIsEditing(false)
    }
  }

  return (
    <li
      className={`flex items-start gap-3 rounded-lg border p-3 ${
        isCompleted
          ? 'border-[var(--color-border)] bg-[var(--color-completed-surface)]'
          : 'border-[var(--color-primary)] bg-[var(--color-surface)]'
      }`}
    >
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => onToggleTask(task)}
        className="mt-1 size-4 accent-[var(--color-primary)]"
      />

      <div className="flex flex-1 flex-col gap-0.5">
        {isEditing ? (
          <input
            type="text"
            value={draftTitle}
            autoFocus
            onChange={(event) => setDraftTitle(event.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleKeyDown}
            className="rounded border border-[var(--color-primary)] bg-[var(--color-background)] px-1 text-sm text-[var(--color-text)] outline-none"
          />
        ) : (
          <span
            onDoubleClick={() => !isCompleted && setIsEditing(true)}
            className={`text-sm font-semibold ${
              isCompleted
                ? 'text-[var(--color-completed)] line-through'
                : 'cursor-text text-[var(--color-text)]'
            }`}
          >
            {task.title}
          </span>
        )}

        {task.description && (
          <span
            className={`text-sm ${
              isCompleted
                ? 'text-[var(--color-completed)] line-through'
                : 'text-[var(--color-text-muted)]'
            }`}
          >
            {task.description}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDeleteTask(task.id)}
        aria-label="Delete todo"
        className="text-[var(--color-text-muted)] hover:text-red-500"
      >
        ✕
      </button>
    </li>
  )
}

export default TodoItem
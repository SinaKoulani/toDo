import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Todo } from '../../types/todo'

type TodoItemProps = {
  todo: Todo
  onToggleTodo: (todoId: string) => void
  onDeleteTodo: (todoId: string) => void
}

function TodoItem({ todo, onToggleTodo, onDeleteTodo }: TodoItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: todo.id, disabled: todo.completed })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-3 rounded-lg border p-3 ${
        todo.completed
          ? 'border-[var(--color-border)] bg-[var(--color-completed-surface)]'
          : 'border-[var(--color-primary)] bg-[var(--color-surface)]'
      }`}
    >
      {!todo.completed && (
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
          className="mt-1 cursor-grab text-[var(--color-text-muted)] active:cursor-grabbing"
        >
          ⠿
        </button>
      )}

      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleTodo(todo.id)}
        className="mt-1 size-4 accent-[var(--color-primary)]"
      />

      <div className="flex flex-1 flex-col gap-0.5">
        <span
          className={`text-sm font-semibold ${
            todo.completed
              ? 'text-[var(--color-completed)] line-through'
              : 'text-[var(--color-text)]'
          }`}
        >
          {todo.title}
        </span>

        {todo.description && (
          <span
            className={`text-sm ${
              todo.completed
                ? 'text-[var(--color-completed)] line-through'
                : 'text-[var(--color-text-muted)]'
            }`}
          >
            {todo.description}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDeleteTodo(todo.id)}
        aria-label="Delete todo"
        className="text-[var(--color-text-muted)] hover:text-red-500"
      >
        ✕
      </button>
    </li>
  )
}

export default TodoItem
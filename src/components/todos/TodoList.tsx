import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import type { Todo } from '../../types/todo'
import TodoItem from './TodoItem'

type TodoListProps = {
  todos: Todo[]
  onToggleTodo: (todoId: string) => void
  onDeleteTodo: (todoId: string) => void
  onReorderTodos: (listId: string, orderedTodoIds: string[]) => void
}

function TodoList({ todos, onToggleTodo, onDeleteTodo, onReorderTodos }: TodoListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const sortedTodos = [...todos].sort((a, b) => a.order - b.order)
  const activeTodos = sortedTodos.filter((todo) => !todo.completed)
  const completedTodos = sortedTodos.filter((todo) => todo.completed)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = activeTodos.findIndex((todo) => todo.id === active.id)
    const newIndex = activeTodos.findIndex((todo) => todo.id === over.id)

    if (oldIndex === -1 || newIndex === -1) {
      return
    }

    const reordered = [...activeTodos]
    const [movedTodo] = reordered.splice(oldIndex, 1)
    reordered.splice(newIndex, 0, movedTodo)

    onReorderTodos(
      movedTodo.listId,
      reordered.map((todo) => todo.id),
    )
  }

  if (todos.length === 0) {
    return (
      <p className="text-sm text-[var(--color-text-muted)]">
        No todos yet. Add one above.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={activeTodos.map((todo) => todo.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="flex flex-col gap-2">
            {activeTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleTodo={onToggleTodo}
                onDeleteTodo={onDeleteTodo}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      {completedTodos.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-[var(--color-text-muted)]">
            Completed
          </h3>
          <ul className="flex flex-col gap-2">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleTodo={onToggleTodo}
                onDeleteTodo={onDeleteTodo}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TodoList
import type { Todo } from '../../types/todo'
import TodoForm from '../todos/TodoForm'
import TodoList from '../todos/TodoList'

type MainContentProps = {
  todos: Todo[]
  activeListId: string | null
  onCreateTodo: (title: string, description: string) => void
  onToggleTodo: (todoId: string) => void
  onDeleteTodo: (todoId: string) => void
  onReorderTodos: (listId: string, orderedTodoIds: string[]) => void
}

function MainContent({
  todos,
  activeListId,
  onCreateTodo,
  onToggleTodo,
  onDeleteTodo,
  onReorderTodos,
}: MainContentProps) {
  if (!activeListId) {
    return (
      <div className="flex flex-1 items-center justify-center text-[var(--color-text-muted)]">
        Select or create a list to get started
      </div>
    )
  }

  return (
    <div className="flex-1 p-6">
      <TodoForm onCreateTodo={onCreateTodo} />
      <TodoList
        todos={todos}
        onToggleTodo={onToggleTodo}
        onDeleteTodo={onDeleteTodo}
        onReorderTodos={onReorderTodos}
      />
    </div>
  )
}

export default MainContent
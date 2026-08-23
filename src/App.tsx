import './App.css'
import { useEffect, useState } from 'react'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import MainContent from './components/layout/MainContent'
import type { Todo, TodoList } from './types/todo'
import type { Theme } from './types/theme'

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  const [lists, setLists] = useState<TodoList[]>([])
  const [activeListId, setActiveListId] = useState<string | null>(null)
  const [todos, setTodos] = useState<Todo[]>([])

  const handleToggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'light' ? 'dark' : 'light',
    )
  }

  const handleSelectList = (listId: string) => {
    setActiveListId(listId)
  }

  const handleCreateList = (name: string) => {
    const now = new Date().toISOString()

    const newList: TodoList = {
      id: crypto.randomUUID(),
      name,
      createdAt: now,
      updatedAt: now,
    }

    setLists((currentLists) => [...currentLists, newList])
    setActiveListId(newList.id)
  }

  const handleEditList = (listId: string, name: string) => {
    setLists((currentLists) =>
      currentLists.map((list) =>
        list.id === listId
          ? { ...list, name, updatedAt: new Date().toISOString() }
          : list,
      ),
    )
  }

  const handleDeleteList = (listId: string) => {
    setLists((currentLists) => currentLists.filter((list) => list.id !== listId))
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.listId !== listId))

    if (activeListId === listId) {
      setActiveListId(null)
    }
  }

  const handleCreateTodo = (title: string, description: string) => {
    if (!activeListId) {
      return
    }

    const now = new Date().toISOString()
    const todosInList = todos.filter((todo) => todo.listId === activeListId)
    const highestOrder = todosInList.reduce(
      (max, todo) => Math.max(max, todo.order),
      -1,
    )

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      listId: activeListId,
      title,
      description,
      completed: false,
      order: highestOrder + 1,
      createdAt: now,
      updatedAt: now,
    }

    setTodos((currentTodos) => [...currentTodos, newTodo])
  }

  const handleToggleTodo = (todoId: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo,
      ),
    )
  }

  const handleDeleteTodo = (todoId: string) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== todoId))
  }

  const handleReorderTodos = (listId: string, orderedTodoIds: string[]) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => {
        if (todo.listId !== listId) {
          return todo
        }

        const newOrder = orderedTodoIds.indexOf(todo.id)
        return newOrder === -1 ? todo : { ...todo, order: newOrder }
      }),
    )
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <Header theme={theme} onToggleTheme={handleToggleTheme} />

      <div className="flex min-h-[calc(100vh-73px)]">
        <Sidebar
          lists={lists}
          activeListId={activeListId}
          onSelectList={handleSelectList}
          onCreateList={handleCreateList}
          onEditList={handleEditList}
          onDeleteList={handleDeleteList}
        />

        <MainContent
          todos={todos.filter((todo) => todo.listId === activeListId)}
          activeListId={activeListId}
          onCreateTodo={handleCreateTodo}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
          onReorderTodos={handleReorderTodos}
        />
      </div>
    </main>
  )
}

export default App
import './App.css'
import { useEffect, useState } from 'react'
import Header from './components/layout/Header'
import MainContent from './components/layout/MainContent'
import { createTask, deleteTask, getTasks, updateTask } from './api/tasks'
import type { Task } from './types/todo'
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

  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleToggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'light' ? 'dark' : 'light',
    )
  }

  const handleCreateTask = async (title: string, description: string) => {
    try {
      const newTask = await createTask({ title, description, status: 'TODO' })
      setTasks((currentTasks) => [...currentTasks, newTask])
    } catch {
      setError('Could not create the task. Please try again.')
    }
  }

  const handleToggleTask = async (task: Task) => {
    const newStatus = task.status === 'TODO' ? 'DONE' : 'TODO'

    try {
      const updatedTask = await updateTask(task.id, { status: newStatus })
      setTasks((currentTasks) =>
        currentTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
      )
    } catch {
      setError('Could not update the task. Please try again.')
    }
  }

  const handleEditTask = async (taskId: number, title: string) => {
    try {
      const updatedTask = await updateTask(taskId, { title })
      setTasks((currentTasks) =>
        currentTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
      )
    } catch {
      setError('Could not update the task. Please try again.')
    }
  }

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId)
      setTasks((currentTasks) => currentTasks.filter((t) => t.id !== taskId))
    } catch {
      setError('Could not delete the task. Please try again.')
    }
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    getTasks()
      .then((fetchedTasks) => setTasks(fetchedTasks))
      .catch(() => setError('Could not load tasks. Is the backend running?'))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <Header theme={theme} onToggleTheme={handleToggleTheme} />

      <MainContent
        tasks={tasks}
        isLoading={isLoading}
        error={error}
        onCreateTask={handleCreateTask}
        onToggleTask={handleToggleTask}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
    </main>
  )
}

export default App
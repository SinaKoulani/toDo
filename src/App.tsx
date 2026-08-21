import './App.css'
import { useEffect, useState } from 'react'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import MainContent from './components/layout/MainContent'
import type { Theme } from './types/theme'
import type { TodoList } from './types/list'

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

  const handleToggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'light' ? 'dark' : 'light',
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
        <Sidebar />

        <MainContent />
      </div>
    </main>
  )
}

export default App
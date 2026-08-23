import type { Theme } from '../../types/theme'

type HeaderProps = {
  theme: Theme
  onToggleTheme: () => void
}

function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4">
      <h1 className="text-xl font-bold text-[var(--color-text)]">Todo App</h1>

      <button
        type="button"
        onClick={onToggleTheme}
        className="rounded-md border border-[var(--color-border)] px-3 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-background)]"
      >
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
    </header>
  )
}

export default Header
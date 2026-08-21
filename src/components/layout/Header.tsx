import type { Theme } from '../../types/theme'

type HeaderProps = {
  theme: Theme
  onToggleTheme: () => void
}

function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header>
      <h1>Todo App</h1>

      <button type="button" onClick={onToggleTheme}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
    </header>
  )
}

export default Header
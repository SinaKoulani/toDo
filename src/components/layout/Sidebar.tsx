import ListForm from '../lists/ListForm'
import type { TodoList } from '../../types/list'

type SidebarProps = {
  lists: TodoList[]
  activeListId: string | null
  onSelectList: (listId: string) => void
  onCreateList: (name: string) => void
}

function Sidebar({
  lists,
  activeListId,
  onSelectList,
  onCreateList,
}: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-muted)]">
        My Lists
      </h2>

      <ListForm onCreateList={onCreateList} />

      <nav className="flex flex-col gap-1">
        {lists.map((list) => {
          const isActive = list.id === activeListId

          return (
            <button
              key={list.id}
              type="button"
              onClick={() => onSelectList(list.id)}
              className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                isActive
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-text)] hover:bg-[var(--color-background)]'
              }`}
            >
              {list.name}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar

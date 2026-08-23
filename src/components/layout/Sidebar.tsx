import ListForm from '../lists/ListForm'
import ListItem from '../lists/ListItem'
import type { TodoList } from '../../types/todo'

type SidebarProps = {
  lists: TodoList[]
  activeListId: string | null
  onSelectList: (listId: string) => void
  onCreateList: (name: string) => void
  onEditList: (listId: string, name: string) => void
  onDeleteList: (listId: string) => void
}

function Sidebar({
  lists,
  activeListId,
  onSelectList,
  onCreateList,
  onEditList,
  onDeleteList,
}: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-muted)]">
        My Lists
      </h2>

      <ListForm onCreateList={onCreateList} />

      <nav className="flex flex-col gap-1">
        {lists.map((list) => (
          <ListItem
            key={list.id}
            list={list}
            isActive={list.id === activeListId}
            onSelectList={onSelectList}
            onEditList={onEditList}
            onDeleteList={onDeleteList}
          />
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
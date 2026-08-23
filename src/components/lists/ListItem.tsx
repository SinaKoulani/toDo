import { useState, type KeyboardEvent } from 'react'
import type { TodoList } from '../../types/todo'

type ListItemProps = {
  list: TodoList
  isActive: boolean
  onSelectList: (listId: string) => void
  onEditList: (listId: string, name: string) => void
  onDeleteList: (listId: string) => void
}

function ListItem({
  list,
  isActive,
  onSelectList,
  onEditList,
  onDeleteList,
}: ListItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftName, setDraftName] = useState(list.name)

  const commitEdit = () => {
    const trimmedName = draftName.trim()

    if (trimmedName) {
      onEditList(list.id, trimmedName)
    }

    setIsEditing(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      commitEdit()
    }

    if (event.key === 'Escape') {
      setDraftName(list.name)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <input
        type="text"
        value={draftName}
        autoFocus
        onChange={(event) => setDraftName(event.target.value)}
        onBlur={commitEdit}
        onKeyDown={handleKeyDown}
        className="w-full rounded-md border border-[var(--color-primary)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text)] outline-none"
      />
    )
  }

  return (
    <div
      className={`group flex items-center rounded-md ${
        isActive ? 'bg-[var(--color-primary)]' : 'hover:bg-[var(--color-background)]'
      }`}
    >
      <button
        type="button"
        onClick={() => onSelectList(list.id)}
        onDoubleClick={() => setIsEditing(true)}
        className={`flex-1 truncate px-3 py-2 text-left text-sm ${
          isActive ? 'text-white' : 'text-[var(--color-text)]'
        }`}
      >
        {list.name}
      </button>

      <button
        type="button"
        onClick={() => onDeleteList(list.id)}
        aria-label="Delete list"
        className={`px-2 opacity-0 group-hover:opacity-100 ${
          isActive ? 'text-white' : 'text-[var(--color-text-muted)]'
        }`}
      >
        ✕
      </button>
    </div>
  )
}

export default ListItem
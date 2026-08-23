import { useState, type FormEvent } from 'react'

type TodoFormProps = {
  onCreateTodo: (title: string, description: string) => void
}

function TodoForm({ onCreateTodo }: TodoFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const trimmedTitle = title.trim()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!trimmedTitle) {
      return
    }

    onCreateTodo(trimmedTitle, description.trim())
    setTitle('')
    setDescription('')
  }

  return (
    <form className="mb-6 flex flex-col gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Todo title"
        className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-medium text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-primary)]"
      />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description (optional)"
        rows={2}
        className="w-full resize-none rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-muted)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-primary)]"
      />
      <button
        type="submit"
        disabled={!trimmedTitle}
        className="self-start rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Add todo
      </button>
    </form>
  )
}

export default TodoForm
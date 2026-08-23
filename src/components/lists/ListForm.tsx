import { useState, type FormEvent } from 'react'

type ListFormProps = {
  onCreateList: (name: string) => void
}

function ListForm({ onCreateList }: ListFormProps) {
  const [name, setName] = useState('')
  const trimmedName = name.trim()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!trimmedName) {
      return
    }

    onCreateList(trimmedName)
    setName('')
  }

  return (
    <form className="mb-4 flex flex-col gap-2" onSubmit={handleSubmit}>
      <label
        className="text-sm text-[var(--color-text)]"
        htmlFor="new-list-name"
      >
        List name
      </label>
      <input
        id="new-list-name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="List name"
        className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-primary)]"
      />
      <button
        type="submit"
        disabled={!trimmedName}
        className="rounded-md bg-[var(--color-primary)] px-3 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Add list
      </button>
    </form>
  )
}

export default ListForm

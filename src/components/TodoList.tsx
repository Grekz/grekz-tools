import { For, createSignal } from 'solid-js'
import { v4 as uuidv4 } from 'uuid'

type ITodoItem = {
  id: string
  text: string
  done: boolean
}

const TodoList = () => {
  const [items, setItems] = createSignal<ITodoItem[]>([{ id: uuidv4(), text: 'Random item', done: false }])
  const [newItem, setNewItem] = createSignal<string>('')

  const markAsDone = (id: string) => {
    setItems(items().map((x) => (x.id === id ? { ...x, done: !x.done } : x)))
  }
  return (
    <div>
      <h1>Done items:</h1>
      <ul title="done-items-list">
        <For each={items().filter((x) => x.done)}>
          {(x) => (
            <li style={{ 'list-style': 'none' }}>
              <input id={x.id} type="checkbox" checked={x.done} onClick={() => markAsDone(x.id)} />
              <label for={x.id} style={{ 'text-decoration': x.done ? 'line-through' : 'none' }}>
                {x.text}
              </label>
            </li>
          )}
        </For>
      </ul>
      <br />
      <h1>Todo items:</h1>
      <ul title="todo-items-list">
        <For each={items().filter((x) => !x.done)}>
          {(x) => (
            <li style={{ 'list-style': 'none' }}>
              <input id={x.id} type="checkbox" checked={x.done} onClick={() => markAsDone(x.id)} />
              <label for={x.id} style={{ 'text-decoration': x.done ? 'line-through' : 'none' }}>
                {x.text}
              </label>
            </li>
          )}
        </For>
      </ul>
      <br />
      <form>
        <input
          placeholder="Enter your item!"
          value={newItem()}
          onChange={(e) => {
            setNewItem(e.target.value)
          }}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            if (newItem().trim().length > 0) {
              setItems([...items(), { id: uuidv4(), text: newItem(), done: false }])
              setNewItem('')
            }
          }}
        >
          Add item
        </button>
      </form>
    </div>
  )
}
export default TodoList

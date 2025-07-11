import { useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [input, setInput] = useState("")
  const [editId, setEditId] = useState(null)

  const addOrUpdateTodo = (e) => {
    e.preventDefault();

    if (input.trim() === "") return alert("No spaces allowed");

    if (editId) {
      // update existing todo
      setData(
        data.map((item) =>
          item.id === editId ? { ...item, text: input } : item
        )
      );
      setEditId(null)
    } else {
      // add new todo
      const newData = {
        id: Date.now(),
        text: input,
        completed: false,
      };
      setData([...data, newData])
    }

    setInput("")
  }

  const toggle = (id) => {
    setData(
      data.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const deleteData = (id) => {
    setData(data.filter((item) => item.id !== id))

    // If you delete the task that's being edited, cancel editing
    if (editId === id) {
      setEditId(null)
      setInput("")
    }
  }

  const editTodo = (item) => {
    setEditId(item.id)
    setInput(item.text)
  }

  return (
    <>
      <div className='app'>
        <h1>TODO</h1>
        <form onSubmit={addOrUpdateTodo}>
          <input
            type='text'
            placeholder='Add or edit task'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type='submit'>{editId ? "Update" : "Add"}</button>
        </form>

        {data.length === 0 ? (
          <p>No task available</p>
        ) : (
          data.map((item) => (
            <div className='todo-item' key={item.id}>
              <input
                type='checkbox'
                checked={item.completed}
                onChange={() => toggle(item.id)}
              />
              <span className={item.completed ? "completed" : ""}>
                {item.text}
              </span>
              <button onClick={() => editTodo(item)}>✏️</button>
              <button onClick={() => deleteData(item.id)}>🗑️</button>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default App

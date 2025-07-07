import { useState } from 'react'
import './App.css'

function App() {

const [data , setData]=useState([])
const [input,setInput]=useState("")

const addTodo=(e)=>{
    e.preventDefault();
    if(input.trim()==="")return alert("no spaces allowed");

    const newData = {
      id:Date.now(),
      text:input,
      completed:false,
    };
    setData([...data,newData])
    setInput("")

};

const Toggle=(id)=>{
    setData(data.map(item=>{
      return item.id === id ?{...item, completed: !item.completed}:item
    }))
}

const deleteData=(id)=>{
  setData(data.filter((data)=>{
    return  data.id !== id
  }))
}
  return (
    <>
     <div className='app'>
      <h1>TODO</h1>
      <form onSubmit={addTodo}>
        <input type='text' placeholder='add task' value={input} onChange={(e)=>setInput(e.target.value)}/>
        <button type='submit'>Add</button>
      </form>

      {data.length===0 ? (
        <p>No task avilable</p>
      ): (
        data.map((data)=>{
          return(
          <div className='todo-item' key={data.id}>
            <input type='checkbox' checked={data.completed} onChange={()=>Toggle(data.id)} />
            <span className={data.completed ? "completed" : " "}>{data.text}</span>
            <button onClick={()=>deleteData(data.id)}>🗑️</button>
          </div>

        )})
      )}

     </div>
    </>
  )
}

export default App

import './style.scss'
import { useState } from 'react'

function App() {
  const [todos, addTodos]=useState([])
  const [todo, setTodo]=useState('')
  const addToDo = () =>{
    if(todo.trim()!=""){
    addTodos([...todos, {id:Date.now(), todo: todo, status:false}])
    setTodo('')
     }
  }
  const makeTodo = (e) =>{
    setTodo(e.target.value)
  }
  const changeStatus = (id) =>{
    const updatedTodos = todos.map(todo=>
      todo.id==id? {...todo, status:!todo.status}:todo
    )
    addTodos(updatedTodos)
  }

  const changeAll=()=>{
    const updatedTodos=todos.map(todo=>({
      ...todo,status:true
    }))
    addTodos(updatedTodos)
  }

  

  const removeTodo = (id) =>{
    const updatedTodos = todos.filter(todo=>todo.id!=id)
    addTodos(updatedTodos)
  }
  const editTodo = (todo,id) =>{
    const updatedTodos = todos.filter(todo=>
      todo.id!=id
    )
    addTodos(updatedTodos)
    setTodo(todo)
  }

  return(
    <div className="main">
      <div className="todoBox">
        <div className="todoHeading">
          To-Do List
        </div>
        <div className="todoAdd">
          <input value={todo} type="text" onChange={makeTodo}/>
          <i onClick={addToDo} class="bi bi-plus-circle"></i>
          <i onClick={changeAll} class="bi bi-check-all"></i>

        </div>
        <div className="todosMain">
          <div className="todos">
            <div className="todoCat">
              <div  className="todoPending">
                Pending Tasks:  {todos.filter(t => !t.status).length}
              </div>
             
            </div>
           <div className="allTodos">
  {todos.slice().reverse().map(todo => (
    <div
  key={todo.id}
  className="todoList"
  style={{
    textDecoration: todo.status ? "line-through" : "none",
  }}
>

      <div className="todoDesc">
        <p>{todo.todo}</p>
      </div>

      <div className="todoAction">
        {/* toggle complete */}
        <i
          className="bi bi-check-circle-fill doneTodo"
          onClick={() => changeStatus(todo.id)}
        ></i>

        {/* edit */}
        <i
          className="bi bi-pencil-fill"
          onClick={() => editTodo(todo.todo, todo.id)}
        ></i>

        {/* delete */}
        <i
          className="bi bi-x-circle-fill cancelTodo"
          onClick={() => {
            if (confirm("Do you want delete?")) removeTodo(todo.id);
          }}
        ></i>
      </div>
    </div>
  ))}
</div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default App
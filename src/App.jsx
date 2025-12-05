import './style.css'
import { useState } from 'react'
import Swal from 'sweetalert2'

function App() {
  const [todos, addTodos]=useState([])
  const [todo, setTodo]=useState('')


  const addToDo = () =>{
    if(todo.trim()=="")return false
     let check=todos.some((val)=>val.todo==todo)
     if(check)return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Did not allow duplicate Task!",
    });
        addTodos([...todos, {id:Date.now(), todo: todo, status:false}])
    setTodo('')

    const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
Toast.fire({
  icon: "success",
  title: "Task Added successfully"
});
      }
    //
  
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
      ...todo,status:!todo.status
    }))
    addTodos(updatedTodos)
        const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Marked successfully"
    });
  }


  const removeTodo = (id) =>{
    const updatedTodos = todos.filter(todo=>todo.id!=id)
    addTodos(updatedTodos)
  }

   const removeALL=()=>{
    addTodos([])
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

          {todos.length!==0&&(
            <>
             <i onClick={changeAll} class="bi bi-check-all"></i>
          <i className="bi bi-x-octagon" 
          onClick={()=>{
            // if(confirm("Do you want delete all?"))removeALL()
          Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            removeALL()
            Swal.fire({
              title: "Deleted!",
              text: "Your Task has been deleted.",
              icon: "success"
            });
          }
        });
          }} ></i>
          </> 
          )}
         

        </div>
        <div className="todosMain">
          <div className="todos">
            <div className="todoCat">
              <div  className="todoPending">
                Pending Tasks:  {todos.filter(t => !t.status).length}
              </div>
             
            </div>
           <div className="allTodos">
  {[...todos]
    .sort((a, b) => Number(b.status) - Number(a.status)) 
    .reverse() 
    .map(todo => (
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
        
          <i
            className="bi bi-check-circle-fill doneTodo"
            onClick={() => changeStatus(todo.id)}
            
            
          ></i>

          
          <i
            className="bi bi-pencil-fill"
            onClick={() => editTodo(todo.todo, todo.id)}
          ></i>

        
          <i
            className="bi bi-x-circle-fill cancelTodo"
            onClick={() => {
              // if (confirm("Do you want delete?")) removeTodo(todo.id);
              Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!"
            }).then((result) => {
              if (result.isConfirmed) {
                removeTodo(todo.id)
                Swal.fire({
                  title: "Deleted!",
                  text: "Your Task has been deleted.",
                  icon: "success"
                });
              }
            }); 
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

import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

 

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, iscompleted:false}])
    setTodo("")
    console.log(todos)
    saveToLS();
  };

  const handleEdit = (e,id) => {
   let t = todos.filter(i=>i.id===id)
   setTodo(t[0].todo)
   let newTodos = todos.filter(item=>{
    return item.id !== id;
  })
  setTodos(newTodos);
  saveToLS();

  };

  const handleDelete = (e,id) => {
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    })
    setTodos(newTodos);
    saveToLS();

  };

  const handleChange  = (e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e)=>{
    let id= e.target.name
    let index = todos.findIndex(item=>{
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos);
    saveToLS();

  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-orange-100 min-h-[80vh]">
        <div className="addtodo my-5">
          <h2 className="text-lg font-bold">Add To-Do</h2>
          <input onChange={handleChange} value={todo} type="text" id="in" className="w-1/2" />
          <button
            onClick={handleAdd}
            className="bg-orange-400 rounded-md p-2 py-1 mx-6 text-white text-sm hover:font-bold"
          >
            Add
          </button>
        </div>
        <h2 className="text-lg font-bold">Your ToDos</h2>
        <div className="todos">
          {todos.length===0 && <div className="my-2">No Todos to display</div>}
          {todos.map(item=>{

          return <div key={item.id} className="todo flex w-1/4 my-2 justify-between">
            <div className="flex gap-5">
            <input onChange={handleCheckbox} type="checkbox" value={item.iscompleted} name={item.id} id="" />
            <div className={item.iscompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
            <button onClick={(e)=>{handleEdit(e,item.id)}}className="bg-orange-400 rounded-md p-2 py-1 mx-1 text-white text-sm hover:font-bold">
              Edit
            </button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className="bg-orange-400 rounded-md p-2 py-1 mx-1 text-white text-sm hover:font-bold">
              Delete
            </button>
            </div>
          </div>
                    })}

        </div>
      </div>
    </>
  );
}

export default App;

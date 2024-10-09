import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if(todostring){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = ()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
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
      <div className="md:container md:mx-auto my-5 m-1 rounded-xl p-5 md:w-1/2
     bg-orange-200 min-h-[80vh]">
      <h1 className="font-bold text-xl text-center">TaskIt - Manage your tasks</h1>
        <div className="addtodo flex flex-col gap-2 my-5">
          <h2 className="text-lg font-bold">Add To-Do</h2>
          <input onChange={handleChange} value={todo} type="text" id="in" className="w-full p-1 px-3 rounded-xl" />
          <button
            onClick={handleAdd} disabled={todo.length<=3}
            className="bg-orange-400 disabled:bg-orange-300 rounded-md p-2 py-1 mx-6  text-white text-sm hover:font-bold"
          >
            Add
          </button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="" />Show Finished
        <h2 className="text-lg font-bold">Your ToDos</h2>
        <div className="todos w-full">
          {todos.length===0 && <div className="my-2">No Todos to display</div>}
          {todos.map(item=>{

          return (showFinished || !item.iscompleted) && <div key={item.id} className="todo flex  my-2 justify-between">
            <div className="flex gap-5">
            <input onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} name={item.id} id="" />
            <div className={item.iscompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
            <button onClick={(e)=>{handleEdit(e,item.id)}}className="bg-orange-400 rounded-md p-2 py-1 mx-1 text-white text-sm hover:font-bold">
              <FaEdit/>
            </button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className="bg-orange-400 rounded-md p-2 py-1 mx-1 text-white text-sm hover:font-bold">
              <AiFillDelete/>
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

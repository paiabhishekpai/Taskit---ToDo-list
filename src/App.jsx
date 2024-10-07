import { useState } from "react";
import Navbar from "./components/navbar";
function App() {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto my-5 rounded-xl p-5 bg-blue-100">
    <h1 className="text-xl font-bold">Your ToDos</h1>
          <div className="todos">
           <div className="todo">

           </div>
          </div>
        </div>
    </>
  )
}

export default App;

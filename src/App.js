import React, {useState, useEffect} from "react";
import TodosList,{InputForm} from "./TodosList";
import ClearAlldata from "./ClearAlldata";
import './App.css';

// function App() {
  const App = () => {
    const initialState = JSON.parse(localStorage.getItem("todos")) || []; 
    const[input, setInput] = useState("");
    const[todos, setTodos] = useState(initialState);
    const[editTodo, setEditTodo] = useState(null);
    let [search, setSearch] = useState("");
    
    useEffect(() =>{
      localStorage.setItem("todos", JSON.stringify(todos));
    })

    let handleSearch = (e) => {
      setSearch(e.target.value.toLowerCase());
      // setSearch(e.target.value);
    }

  return (
    <div className="mainApp">
      <div className="App">
        <header className="App-header">
          <p>To do list</p>          
        </header>    
        <InputForm input={input} setInput={setInput} todos={todos} setTodos={setTodos} editTodo={editTodo} setEditTodo={setEditTodo}/>
        <hr/>
{/* This part is for displaying output in todo List */}
        <div id="output">
          <h3> Show todo list</h3>
{/* This for set searching letters */}
          <div className="search-form">
              <input name="search" className="form-control" type="text" onChange={handleSearch} placeholder="Search todo..."/>
          </div>
{/* this for listing after searching */}
          <hr/>   
          <TodosList todos={todos} search={search} setTodos={setTodos} setEditTodo={setEditTodo}/>
          <hr/>
{/* this part for clear all the data in the todo list */}
          <ClearAlldata/>
          
        </div>
      </div>
    </div>
  );
}

export default App;
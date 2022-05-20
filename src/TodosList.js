import React, {useEffect} from 'react';
import {v4 as uuidv4} from "uuid";

let InputForm = ({input, setInput, todos, setTodos, editTodo, setEditTodo}) => {
    const updateTodo = (title, id, completed) =>{
        const newTodo = todos.map((todo) =>
            todo.id === id ? {title, id, completed} : todo
        );
        setTodos(newTodo);
        setEditTodo("");
    };

    useEffect(() =>{
        if(editTodo){
            setInput(editTodo.title);
        } else{
            setInput("")
        }
    }, [setInput, editTodo]);

    const onInputChange = (event) =>{
        setInput(event.target.value);
    };

    const onFormSubmit = (event) =>{
        event.preventDefault();
        if(!editTodo){
            setTodos([...todos, {id: uuidv4(), title: input, completed:false}]);
            setInput(""); 
        } else{
            updateTodo(input, editTodo.id, editTodo.completed)
        }
    };

    return (
        <div>
            {/* <h1>test </h1> */}
        <form onSubmit={onFormSubmit}>
            <input type="text" name="inputTitle" placeholder="Enter a Todo..." className="form-control" 
            value={input}
            required
            onChange={onInputChange}/>
            <button className="btn btn-danger" type="submit"> {editTodo ? "Change the task" : "Add to the list"}</button>
        </form>
        </div>
    );
};
export {InputForm};

let TodosList = ({todos, search, setTodos, setEditTodo}) =>{
    const handleComplete = (todo) =>{
        setTodos(
            todos.map((item) =>{
                if(item.id === todo.id){
                    return{...item, completed: !item.completed}
                }
                return item;
            })
        );
    };

    const handleEdit = ({id}) =>{
        const findTodo = todos.find((todo) => todo.id === id);
        setEditTodo(findTodo);
    };
    const handleDelete = ({ id }) =>{
        setTodos(todos.filter((todo) => todo.id !== id));
    };
    return (
    <div> 
        {todos.filter(s => s.title.toLowerCase().includes(search)).map((todo) => (
        <li className="list-todos" key={todo.id}>
            <input type="text" value={todo.title} 
            className={`list-text ${todo.completed ? "complete" : ""}`}
            onChange={(event) => event.preventDefault()}
            />
            <div>
                <button className="button-edit task-button" onClick={() => handleEdit(todo)}>
                    <i className ="fa fa-edit"></i>
                </button>         
                <button className="button-complete task-button" onClick={() => handleComplete(todo)}>
                    <i className ="fa fa-check-circle"></i>
                </button>
                <button className="button-delete task-button" onClick={() => handleDelete(todo)}>
                    <i className ="fa fa-trash"></i>
                </button>
            </div>
        </li>
        ))}
    </div>
    );  
};

export default TodosList;

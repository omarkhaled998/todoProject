import React ,{useState} from "react";
import AddCircleIcon from '@material-ui/icons/AddCircle';

var empty = true;

function InputArea(props){
    const [todo , setTodo] = useState("");


    function handlechange(event){
        const {value} = event.target
        empty = value.length===0
        setTodo(value);
    }
    return(
        <div className="form">
        <input className="Outline"
        onChange={handlechange} 
        value = {todo}
        type="text" />
        <button className="btnAdd"
        onClick={()=>{
            setTodo("");
            empty = todo.length===0
            props.addToList(todo,empty);
            
        }}>
        
        <AddCircleIcon/>
        </button>
        </div>
    )
}

export default InputArea;
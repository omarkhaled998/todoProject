import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt } from '@fortawesome/free-regular-svg-icons'



function ToDoItem(props){
    const [clicked , setClicked] = useState(false);
  
    

    function crossItem(id){
        props.editItem(id)
        setClicked(!clicked);
    }

    
    return(
        // style={{textDecoration: clicked? "line-through":null}}
        //&#10687; 
    <div className="listPosition" >
         <li className="listItemli" onMouseDown={()=>crossItem(props.id)} > <span className="dot"></span> {props.text} 
        </li>
        <button className="Delete" onClick = {()=>props.deleted(props.id,props.text)}><FontAwesomeIcon icon={faTrashAlt} /></button>
        
    </div>
    )
}

export default ToDoItem;
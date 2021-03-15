import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt } from '@fortawesome/free-regular-svg-icons'



function TodoList(props) {
  const list = props.list;
  const date = props.date;

  var count=0;

  return (
    <div id={props.id} className="previousList">
      <div id={props.id} className="heading">
        <p id={props.id} className="previousHeading">{date}</p>
        <button className="Delete" onClick = {()=>props.deleteTodo(props.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
      </div>
      <div id={props.id}>
        <ul id={props.id}>
          {list.map((elem) => count<=2 && <li className="previousTodos" id={props.id} key={count++}>{elem.length>=10? elem.substring(0,10)+"...":elem}</li> )}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;

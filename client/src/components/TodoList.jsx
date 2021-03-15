import React from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";
import SaveButton from './SaveButton';
import NewListButton from './NewListButton';

function TodoList({todos,setTodos, saveClicked , setSaveClicked,currentList,setCurrentlist,userID}) {

  var count = 0;



  function handleSaveClick(){
    if(!saveClicked){
      setTodos(
        (previous)=>[...previous,currentList])
        fetch(("/user/"+userID) , {
          method: "POST",
          headers: {'Content-type': 'application/json'},
          })
          .then((result) => {return result})
          .then(res=>res)
          .catch(alert => alert)

    }
    else{
      setTodos(
        (previous)=>
          previous.filter(elem=>elem._id!==currentList._id))
          fetch(("/user/"+userID) , {
            method: "DELETE",
            headers: {'Content-type': 'application/json'},
            })
            .then((result) => {return result})
            .then(res=>res)
            .catch(alert => alert)
    }
    setSaveClicked(!saveClicked);

  }


  function addToList(todo,empty){
    if(!empty){
      setCurrentlist((prev)=>{
        return{...prev, list:[...currentList.list,todo]}
      })
      fetch(("/list/"+currentList._id) , {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({text : todo})
        })
        .then((result) => {return result})
        .then(res=>res)
        .catch(alert => alert)

      if(saveClicked){
        fetch(("/user/"+userID+"/todos") , {
          method: "GET",
          headers: {'Content-type': 'application/json'},
          })
          .then((result) => {return result.json()})
          .then(res=> setTodos(res))
          .catch(alert => alert)
      }
      
    }
    
    
  }

 
  function deleteItem(id,text){
     setCurrentlist((prev)=>{
       return{
          ...prev, 
          list: currentList.list.filter((item,index)=>index!==id)
        }
      })
      fetch(("/list/"+currentList._id+"/item") , {
        method: "DELETE",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({text : text})
        })
        .then((result) => {return result})
        .then(res=>res)
        .catch(alert => alert)
      
        if(saveClicked){
          fetch(("/user/"+userID+"/todos") , {
            method: "GET",
            headers: {'Content-type': 'application/json'},
            })
            .then((result) => {return result.json()})
            .then(res=> setTodos(res))
            .catch(alert => alert)
        }
     
  }

  function editItem(id){
    setCurrentlist((prev)=>{
      return{
         ...prev, 
         list: currentList.list.map(
           (item,index)=>{
            if(index===id){
              fetch(("/list/"+currentList._id+"/item") , {
                method: "PATCH",
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({text : item})
                })
                .then((result) => {return result})
                .then(res=>res)
                .catch(alert => alert)
              if(item.includes("  ✔"))
                return item = item.replace("  ✔","")
              else
                  return item = item +"  ✔"
              
            }
            return item
          })
        }
          
     })
    
 }

  function newList(){
    setSaveClicked(false);
    fetch(("/user/"+userID+"/add") , {
      method: "PATCH",
      headers: {'Content-type': 'application/json'},
      })
      .then((result) => {return result.json()})
      .then(res=> setCurrentlist(res))
      .catch(alert => alert)
   
  }






  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
        <InputArea addToList={addToList}/>
      <div>
        <ol>
          {currentList.list.map(elem => {
            return <ToDoItem key={count} id={count++} text={elem} deleted ={deleteItem} editItem={editItem}/> 
             })}
        </ol>
      </div>
      <div >
        <div onClick={()=>{handleSaveClick()}} className="SavebuttonPosition"><SaveButton clicked={saveClicked} /></div>
        <div onClick={newList} className="NewbuttonPosition"><NewListButton /></div>
      </div>
    </div>
  );
}

export default TodoList;

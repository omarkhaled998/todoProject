import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';    
import ListTodos from './ListTodos';
import ViewList from './ViewList';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  gridList: {
    width: 500,
    height: 450,
    margin :0 ,
    padding :0,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CSSGrid({todos,setTodos,setSaveClicked,currentList,userID}) {
  const classes = useStyles();

    const [open,setOpen] = useState(false);
    const [list,setList] = useState([]);



    function deleteTodo(id){
      todos.forEach((todo)=>{
        if(todo._id===currentList._id)
          setSaveClicked(false)
      });
      setTodos((previous)=>
      previous.filter(elem=>elem._id!==id))
      fetch(("/user/"+userID+"/"+id) , {
        method: "DELETE",
        headers: {'Content-type': 'application/json'},
        })
        .then((result) => {return result})
        .then(res=>res)
        .catch(alert => alert)
    }
    
    function ShowDialog(event){
        const listID = event.target.id;
        setList((todos.filter(list => list._id===listID))[0]);
        setOpen(true)
    }

    function closeDialog(){
        setOpen(false);
    }
  
  return (
    <div>
        <ViewList todo={list} show={open} hide={closeDialog}/>
        <div className="ScrollStyle previousBorder">
          <div  className="item_direction">
            <h3 className="heading">Saved ToDos</h3>
            <div onClick={ShowDialog} className={classes.container}>
              {todos.map(todo=>
              <div key={todo._id}  style={{ gridColumnEnd: 'span 6' }}>
                  <ListTodos  id={todo._id} className={classes.paper} list={todo.list} date={todo.date} deleteTodo={deleteTodo}/>
              </div>
              )}
              <Divider className={classes.divider} />
            </div>
          </div>
        </div>
    </div>


  );
}

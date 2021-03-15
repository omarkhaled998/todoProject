import React, {useState} from 'react';
import TodoList from  "../../components/TodoList";
import Time from "../../components/Time";
import NavBar from "../../components/navBar";
import Weather from "../../components/weather";
import TodoGrid from "../../components/TodoGrid";
import  { Redirect } from 'react-router-dom'

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 4),
  },
  submit2: {
    margin: theme.spacing(1, 0, 1),
  },
  gap: {
    margin: theme.spacing(4, 0, 0),
  },
}));


function App(props){
const classes = useStyles();
const [todos ,setTodos]= useState([]);
const [currentList ,setCurrentlist]= useState();
const [userData ,setUserdata]= useState([]);
const [logged ,setLogged]= useState(false);

const [updated ,setUpdated]= useState(false);

///save todo button
const [saveClicked,setSaveClicked] = useState(false);




  function updateUser(){
    
      fetch(("/user/"+props.location.state.data._id) , {
        method: "GET",
        headers: {'Content-type': 'application/json'},
        })
        .then((result) => {return result.json()})
        .then(res=>
          {setUserdata(res);
            setTodos(res.todos)
            setCurrentlist(res.currentList)
            res.todos.forEach((todo)=>{
              if(todo._id===res.currentList._id)
                setSaveClicked(true)
            });
            setUpdated(true);
          })
        .catch(alert => alert)
        
  }

    if(props.location.state && !logged){
        updateUser()
        setLogged(true);
    }
      if(logged){
        if(!updated){
          return(
            <div>
                <h1>Loading..</h1>
            </div>
          )
        }
        return (
          <div>
          <NavBar motivationCount= {userData.motivationCount} userID = {userData._id} username={userData.username}/>
            <div className={classes.form}>
            <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={6}>

               <Grid item lg={3}  md={5} sm={5} xs={9}>
                  <div className="split">
                    <Grid item xs={6}>
                      <Time />
                    </Grid>
                    <Grid xs={6} item className={classes.gap}>
                      <Weather city={userData.city} userID = {userData._id}/>
                    </Grid>
                  </div>
                </Grid>

                <Grid item lg={3}  md={4} sm={6} xs={9} className={classes.gap}>
                  <TodoList todos={todos} setTodos={setTodos} currentList={currentList} setCurrentlist={setCurrentlist} 
                                saveClicked={saveClicked} setSaveClicked={setSaveClicked} userID = {userData._id}/>
                </Grid>
              
                <Grid item lg={4} md={5} sm={8} xs={12}>
                  <div className="listTodos">
                    <TodoGrid todos={todos} setTodos={setTodos} currentList={currentList} setSaveClicked={setSaveClicked} userID = {userData._id} />
                  </div>
                </Grid>
            </Grid>
            </div>
          </div>
      )
    }
    else{
      return <Redirect to={{
        pathname: '/login',
        }}/>
    }
    
}

export default App;